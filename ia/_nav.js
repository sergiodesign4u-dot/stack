/* Registry of detail-IA nodes. One entry per node page, read by ia/structure.html.
   A new node page is registered here with ONE row and becomes a chip in the hub the same
   moment - no re-syncing of neighbours and no "we will assemble the navigation at the end".
   Its own namespace: the roadmap sidebar of every page is rendered by the root /_nav.js,
   and a local window.NAV would silently take its place. */

window.IA_NAV = [
  {
    group: 'Глобальні елементи',
    note: 'Успадковуються кожною сторінкою продукту.',
    nodes: [
      { node: '0.0', name: 'Головна',              file: 'home.html',           scope: 'MVP' },
      { node: '0.1', name: 'Хедер і мега-меню',    file: 'navigation.html',     scope: 'MVP' },
      { node: '0.2', name: 'Футер',                file: 'footer.html',         scope: 'MVP' },
      { node: 'S',   name: 'Системні та глобальні', file: 'system.html',        scope: 'MVP' }
    ]
  },
  {
    group: 'Структура',
    note: 'Не сторінки, а джерела, з яких сторінки збираються.',
    nodes: [
      { node: '2.x', name: 'Каталог · таксономія',  file: 'catalog.html',        scope: 'MVP' },
      { node: '2.x', name: 'Матриця категорій',     file: 'category-matrix.html', scope: 'MVP' },
      { node: '-'  ,   name: 'SEO-методика',          file: 'seo.html',            scope: 'MVP' }
    ]
  },
  {
    group: 'Сторінки',
    note: 'Посторінкова специфікація: блоки, стани, мобілка, A-E SEO.',
    nodes: [
      { node: '1.x', name: 'Авторизація',           file: 'auth.html',           scope: 'MVP' },
      { node: '2.0', name: 'Каталог · хаб',         file: 'catalog-page.html',   scope: 'MVP' },
      { node: '2.1', name: 'Категорія · лістинг',   file: 'category.html',       scope: 'MVP' },
      { node: '2.4', name: 'Бренди',                file: 'brands.html',         scope: 'MVP' },
      { node: '2.5', name: 'Пошук',                 file: 'search.html',         scope: 'MVP' },
      { node: '3.0', name: 'Картка товару',         file: 'product.html',        scope: 'MVP' },
      { node: '4.x', name: 'Квіз · гід за ціллю',   file: 'quiz.html',           scope: 'ПОТІМ' },
      { node: '5.x', name: 'Кабінет тренера',       file: 'coach.html',          scope: 'MVP' },
      { node: '6.x', name: 'Кошик і оформлення',    file: 'cart.html',           scope: 'MVP' },
      { node: '7.x', name: 'Акаунт покупця',        file: 'account.html',        scope: 'MVP' },
      { node: '8.x', name: 'Контент та інфо',       file: 'content.html',        scope: 'MVP' }
    ]
  }
];
