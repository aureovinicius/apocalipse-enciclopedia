/* Registro dos livros da enciclopédia (projeto multi-livros). */
(function () {
  window.APOC = window.APOC || {};
  window.APOC.books = [
    {
      slug: 'apocalipse', name: 'Apocalipse', chapters: 22, icon: '📖', order: 1,
      blurb: 'As visões de João — o Cordeiro, os selos, as bestas e a Nova Jerusalém — lidas por mais de quinze tradições.'
    },
    {
      slug: 'daniel', name: 'Daniel', chapters: 12, icon: '🦁', order: 2,
      blurb: 'Sonhos, reinos e profecias — a estátua, as quatro bestas, as setenta semanas — comparados entre as tradições.'
    }
  ];
  window.APOC.bookBySlug = function (slug) {
    return (window.APOC.books || []).filter(function (b) { return b.slug === slug; })[0] || null;
  };
})();
