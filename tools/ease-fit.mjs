/* tools/ease-fit.mjs - WHERE THE THREE CURVES OF `tokens.css` CAME FROM

   Not a check: a DERIVATION, and it lives here so the four numbers in each
   `cubic-bezier()` can be re-solved instead of trusted. Stage 11 step 1 took
   the character of the movement from a reference (the `gsap-core` skill of
   `greensock/gsap-skills`, table C of `design/kit/docs/motion.md`), and a reference is allowed to name a curve
   FAMILY and never a duration. The family it named is `power_.out` - «sharp
   start, long settle» - and the same file says its CustomEase «can use
   cubic-bezier values (as used in CSS cubic-bezier())» without listing any. So
   the numbers are fitted to the family's own function here.

   WHY NOT JUST WRITE THE FAMOUS ONES. Because «easeOutCubic is
   cubic-bezier(0.33, 1, 0.68, 1)» is a number recalled from a table, and a
   recalled number is an invented number that happens to be close. This script
   makes it a measured one: the fit below reproduces `1-(1-t)^3` to 0.19% of
   maximum error, and that figure stands in the token's own comment.

   WRONG VERSION 1: THE COARSE PASS STARTED ALREADY NARROWED. It seeded the
   search at [.5,.5,.5,.5] and only ever looked +-0.2 around it, so it returned
   the best point inside its own window and reported it as the answer - shapes
   with x1 > x2 at 7.24% error, which is not a fit, it is a local minimum with a
   straight face. The first pass now sweeps the whole [0,1] range.

   node tools/ease-fit.mjs

   Fit a CSS cubic-bezier(x1,y1,x2,y2) to a target easing function.
   The reference (gsap-core SKILL.md) names a FAMILY - power_.out - and states
   that CustomEase "can use cubic-bezier values (as used in CSS cubic-bezier())".
   It does not hand over the four numbers, so they are SOLVED here rather than
   recalled: a number recalled from a table is the same as a number invented. */
const bezX = (t, x1, x2) => 3*(1-t)**2*t*x1 + 3*(1-t)*t*t*x2 + t**3;
const bezY = (t, y1, y2) => 3*(1-t)**2*t*y1 + 3*(1-t)*t*t*y2 + t**3;
const solveT = (x, x1, x2) => { let lo=0, hi=1, t=x;
  for (let i=0;i<60;i++){ const v=bezX(t,x1,x2); if (v<x) lo=t; else hi=t; t=(lo+hi)/2; } return t; };
const err = (p, f, N=200) => { let e=0;
  for (let i=0;i<=N;i++){ const x=i/N; const t=solveT(x,p[0],p[2]); e=Math.max(e, Math.abs(bezY(t,p[1],p[3]) - f(x))); } return e; };

const TARGETS = {
  /* power1.inOut, the symmetric one: most transitions inside a component */
  standard: x => x < .5 ? 2*x*x : 1 - 2*(1-x)**2,
  /* power2.out - sharp start, long settle. Table C, moment M1 (the panel) */
  enter:    x => 1 - (1-x)**3,
  /* the mirror: leaves slowly, accelerates away */
  exit:     x => x**3,
};

const round = n => Math.round(n*100)/100;
for (const [name, f] of Object.entries(TARGETS)) {
  /* FULL range first - a coarse pass that starts already narrowed around the
     middle finds the best point inside its own window and calls it the answer.
     The first version did exactly that and returned x1 > x2 shapes with a 7%
     error, which is not a fit, it is a local minimum with a straight face. */
  let best = null, lo = [0,0,0,0], hi = [1,1,1,1], step = 0.1;
  for (let pass=0; pass<5; pass++) {
    best = null;
    for (let a=lo[0]; a<=hi[0]+1e-9; a+=step)
    for (let b=lo[1]; b<=hi[1]+1e-9; b+=step)
    for (let cc=lo[2]; cc<=hi[2]+1e-9; cc+=step)
    for (let d=lo[3]; d<=hi[3]+1e-9; d+=step) {
      const p=[a,b,cc,d], e=err(p,f,60);
      if (!best || e<best.e) best={p,e};
    }
    lo = best.p.map(v => Math.max(0, v-step)); hi = best.p.map(v => Math.min(1, v+step));
    step /= 4;
  }
  const p = best.p.map(round);
  console.log(`${name.padEnd(9)} cubic-bezier(${p.join(', ')})   макс. похибка ${(err(p,f)*100).toFixed(2)}%`);
}
