"""tools/key-alpha.py - give a white-background PNG the alpha channel it never had.

WHY THIS EXISTS. Five illustrations in design/ are RGB with no transparency,
drawn on white, and seven CSS rules carried `mix-blend-mode: multiply` to hide
that white. Multiply is the one blend that makes white vanish against a LIGHT
plate; against a dark one it multiplies the whole drawing down to the plate's
own darkness, so the bear became a silhouette and the product photograph went
black. The white was never a colour decision - it was a missing channel, and a
missing channel is fixed in the asset.

THREE RULES, and each one is here because the naive version of it failed on a
real file:

  1. THE BACKGROUND IS FOUND BY A FLOOD FILL FROM THE BORDER, not by «every
     white pixel». A global key punches the highlight out of an eye and the
     shine off a bottle, because those are white too and they are INSIDE the
     drawing.

  2. AN ENCLOSED POCKET IS STILL BACKGROUND. The first version stopped at rule
     1 and left 16402 opaque near-white pixels in the mascot: a 117x196 pocket
     between the legs and a 26x150 strip between the arm and the body, both
     sealed off from the border by the drawing itself. On a light page they were
     invisible; on a dark one they were a white gash down his side, which is how
     the owner found them. A pocket is separated from a highlight by MEASUREMENT
     rather than by hope - big and flat and near-pure-white is background, small
     is a highlight - and both counts are printed so the split can be checked
     instead of trusted.

  3. THE RIM IS FOUND BY CONNECTIVITY, NOT BY A RADIUS. Anti-aliased edge pixels
     are blends of the art with white, so they take a = 255 - min(r,g,b) with the
     colour un-multiplied back out of white - the exact inverse of what
     compositing onto white did. A fixed 3px band was the first version and it
     left the drop shadows behind: a shadow baked for a white page is 20 to 60
     pixels wide, so it stayed opaque and read as a pale smear under every
     mascot on the dark page. The band now GROWS from the background through
     anything lighter than SOFT, which is where the drawing's own silhouette
     stops it - and the formula is self-limiting anyway, since a dark pixel that
     did get reached keeps a=225 and stays where it is.

Python and not .mjs like everything else in here, because this decodes and
encodes PNG by hand: the repository has no image library and this is an asset
tool run by whoever changes an asset, not a check run by every step.

    python3 tools/key-alpha.py <in.png> <out.png>
    python3 tools/key-alpha.py --check [dir]     every PNG in the tree, and whether it has alpha
"""
import zlib, struct, sys
from collections import deque

FLOOD = 230        # a pixel this bright, reachable from the border, is background
POCKET_MIN = 40    # px: smaller enclosed regions are the drawing's own highlights
POCKET_WHITE = 248 # ...and a pocket has to be near-pure white on average
SOFT = 150         # the rim grows through anything lighter than this


def read_png(path):
    d = open(path, 'rb').read()
    pos, idat, ct = 8, b'', None
    while pos < len(d):
        ln = struct.unpack('>I', d[pos:pos+4])[0]
        typ = d[pos+4:pos+8]
        if typ == b'IHDR':
            w, h = struct.unpack('>II', d[pos+8:pos+16])
            depth, ct = d[pos+16], d[pos+17]
        if typ == b'IDAT':
            idat += d[pos+8:pos+8+ln]
        pos += 12 + ln
    if depth != 8 or ct not in (2, 6):
        raise SystemExit('only 8-bit RGB / RGBA: got depth %s type %s' % (depth, ct))
    ch = 3 if ct == 2 else 4
    raw = zlib.decompress(idat)
    stride = w * ch
    rows, prev, i = [], bytearray(stride), 0
    for _ in range(h):
        f = raw[i]; i += 1
        line = bytearray(raw[i:i+stride]); i += stride
        for x in range(stride):
            a = line[x-ch] if x >= ch else 0
            b = prev[x]
            c = prev[x-ch] if x >= ch else 0
            if f == 1: line[x] = (line[x] + a) & 255
            elif f == 2: line[x] = (line[x] + b) & 255
            elif f == 3: line[x] = (line[x] + (a + b) // 2) & 255
            elif f == 4:
                p = a + b - c
                pa, pb, pc = abs(p-a), abs(p-b), abs(p-c)
                pr = a if (pa <= pb and pa <= pc) else (b if pb <= pc else c)
                line[x] = (line[x] + pr) & 255
        rows.append(line); prev = line
    return w, h, ch, rows


def write_rgba(path, w, h, px):
    raw = bytearray()
    for y in range(h):
        raw.append(0)
        raw += px[y*w*4:(y+1)*w*4]
    def chunk(t, data):
        c = t + data
        return struct.pack('>I', len(data)) + c + struct.pack('>I', zlib.crc32(c) & 0xffffffff)
    out = b'\x89PNG\r\n\x1a\n'
    out += chunk(b'IHDR', struct.pack('>IIBBBBB', w, h, 8, 6, 0, 0, 0))
    out += chunk(b'IDAT', zlib.compress(bytes(raw), 9))
    out += chunk(b'IEND', b'')
    open(path, 'wb').write(out)


def key(src, dst):
    w, h, ch, rows = read_png(src)

    def mn(x, y):
        r = rows[y]; j = x * ch
        return min(r[j], r[j+1], r[j+2])

    # ---- rule 1: the background, from the border
    bg = bytearray(w * h)
    q = deque()
    def push(x, y):
        if not bg[y*w+x] and mn(x, y) >= FLOOD:
            bg[y*w+x] = 1; q.append((x, y))
    for x in range(w):
        push(x, 0); push(x, h-1)
    for y in range(h):
        push(0, y); push(w-1, y)
    while q:
        x, y = q.popleft()
        for dx, dy in ((1,0),(-1,0),(0,1),(0,-1)):
            nx, ny = x+dx, y+dy
            if 0 <= nx < w and 0 <= ny < h: push(nx, ny)
    from_border = sum(bg)

    # ---- rule 2: the pockets the drawing sealed off
    seen = bytearray(w * h)
    pockets = kept = pocket_px = kept_px = 0
    for y0 in range(h):
        for x0 in range(w):
            i0 = y0*w + x0
            if bg[i0] or seen[i0] or mn(x0, y0) < FLOOD: continue
            qq = deque([(x0, y0)]); seen[i0] = 1; px = []; tot = 0
            while qq:
                x, y = qq.popleft(); px.append((x, y)); tot += mn(x, y)
                for dx, dy in ((1,0),(-1,0),(0,1),(0,-1)):
                    nx, ny = x+dx, y+dy
                    k = ny*w + nx
                    if 0 <= nx < w and 0 <= ny < h and not seen[k] and not bg[k] and mn(nx, ny) >= FLOOD:
                        seen[k] = 1; qq.append((nx, ny))
            if len(px) >= POCKET_MIN and tot / len(px) >= POCKET_WHITE:
                pockets += 1; pocket_px += len(px)
                for x, y in px: bg[y*w+x] = 1
            else:
                kept += 1; kept_px += len(px)

    # ---- rule 3: the rim, grown from the background through the pale
    band = bytearray(w * h)
    q = deque()
    for y in range(h):
        for x in range(w):
            if not bg[y*w+x]: continue
            for dx, dy in ((1,0),(-1,0),(0,1),(0,-1)):
                nx, ny = x+dx, y+dy
                k = ny*w + nx
                if 0 <= nx < w and 0 <= ny < h and not bg[k] and not band[k] and mn(nx, ny) >= SOFT:
                    band[k] = 1; q.append((nx, ny))
    while q:
        x, y = q.popleft()
        for dx, dy in ((1,0),(-1,0),(0,1),(0,-1)):
            nx, ny = x+dx, y+dy
            k = ny*w + nx
            if 0 <= nx < w and 0 <= ny < h and not bg[k] and not band[k] and mn(nx, ny) >= SOFT:
                band[k] = 1; q.append((nx, ny))

    out = bytearray(w * h * 4)
    soft = 0
    for y in range(h):
        r = rows[y]
        for x in range(w):
            i = (y*w + x) * 4; j = x * ch
            R, G, B = r[j], r[j+1], r[j+2]
            if bg[y*w+x]:
                out[i:i+4] = bytes((255, 255, 255, 0)); continue
            a = 255
            if band[y*w+x]:
                a = 255 - min(R, G, B)
                if a == 0:
                    R = G = B = 255
                elif a < 255:
                    soft += 1
                    R, G, B = (min(255, max(0, round((v - (255 - a)) * 255 / a))) for v in (R, G, B))
            out[i:i+4] = bytes((R, G, B, a))

    write_rgba(dst, w, h, out)
    print('%-32s %dx%d  прозорих %.1f%% (%d від краю + %d у %d кишенях)  '
          "м'який рант %d  збережено %d плям / %d px усередині малюнка"
          % (src.split('/')[-1], w, h, 100*sum(bg)/(w*h), from_border, pocket_px, pockets,
             soft, kept, kept_px))


def check(root):
    """12.10 - THE TRANSFORM EXISTED AND THE CHECK DID NOT, and that cost two
    assets and three screens. This file says of itself that it is «an asset tool
    run by whoever changes an asset, not a check run by every step» - which was
    a true description and a hole. Two mascots shipped as PNG colour type 2, no
    alpha at all, and on a dark page `border-radius: 50%` turned the baked white
    background into an opaque disc brighter than the accent button beside it.
    Nothing in tools/ asked. A browser instrument sees a picture and is right to;
    a source instrument never opens a PNG. A critique agent found one of the two
    by looking at a dark screenshot, which is the failure mode this folder exists
    to end.

    The question is one byte: IHDR colour type. 0 and 2 carry no alpha channel.
    An illustration composited on white and then placed on a dark ground is the
    defect; a photograph that fills its own box is not - so the verdict names the
    file and the caller decides, and the count is printed either way.
    """
    import os
    # A picture only needs alpha if something shows THROUGH it. Two whole folders
    # do not qualify, and each says why and carries its count - an exemption that
    # covers nothing fails as loudly as an unasked file.
    EXEMPT = {
        'kit/screens': 'full-page screenshots: the picture IS the page, and there is no ground behind it',
        'concept/assets': 'reference plates on the concept stand, which theme.mjs already declares outside the system by kind',
    }
    hits = {k: 0 for k in EXEMPT}
    bad, seen, excused = [], 0, 0
    for d, _, fs in os.walk(root):
        if '/.git' in d or 'node_modules' in d:
            continue
        for f in sorted(fs):
            if not f.endswith('.png'):
                continue
            p = os.path.join(d, f)
            h = open(p, 'rb').read(33)
            if h[:8] != b'\x89PNG\r\n\x1a\n':
                continue
            seen += 1
            rel = os.path.relpath(p, root)
            w, ht = struct.unpack('>II', h[16:24])
            ct = h[25]
            if ct not in (0, 2):
                continue
            ex = next((k for k in EXEMPT if rel.startswith(k + os.sep)), None)
            if ex:
                hits[ex] += 1
                excused += 1
                continue
            bad.append((rel, w, ht, ct, os.path.getsize(p)))
    print('PNG у дереві: %d  ·  БЕЗ АЛЬФА-КАНАЛУ: %d  ·  звільнено за родом: %d' % (seen, len(bad), excused))
    for rel, w, ht, ct, sz in bad:
        print('  %-44s %dx%d  colour type %d  %dKB' % (rel, w, ht, ct, sz // 1024))
    for k, why in EXEMPT.items():
        print('  виняток %-16s %d файлів - %s%s' % (k, hits[k], why,
              '' if hits[k] else '   <<< ВИНЯТОК НІЧОГО НЕ ПОКРИВАЄ, його треба зняти'))
    if bad:
        print('\n  Малюнок, скомпонований на білому, стає непрозорою плямою на темній темі.')
        print('  Лікується цим самим файлом: python3 tools/key-alpha.py <in.png> <out.png>')
    return 1 if bad or not all(hits.values()) else 0


if __name__ == '__main__':
    if '--check' in sys.argv:
        root = sys.argv[sys.argv.index('--check') + 1] if len(sys.argv) > sys.argv.index('--check') + 1 else 'design'
        sys.exit(check(root))
    key(sys.argv[1], sys.argv[2])
