/* ==========================================================================
   Apocalipse — núcleo compartilhado (registro de dados, helpers, navegação)
   Funciona via file:// (sem fetch): os dados são scripts .js que se registram
   em window.APOC.
   ========================================================================== */
(function () {
  'use strict';

  window.APOC = window.APOC || {};
  var APOC = window.APOC;
  APOC.chapters = APOC.chapters || {}; // { livro: { id: obj } }
  APOC.themes = APOC.themes || {};     // { livro: { slug: obj } }

  /* Registro chamado pelos arquivos de dados em data/<livro>/.
     O livro vem do próprio objeto (campo `book`) ou de APOC._loadingBook,
     definido pelo carregador antes de injetar o script. */
  APOC.register = function (type, obj) {
    var book = obj.book || APOC._loadingBook || 'apocalipse';
    obj.book = book;
    if (type === 'chapter') { (APOC.chapters[book] = APOC.chapters[book] || {})[obj.id] = obj; }
    else if (type === 'theme') { (APOC.themes[book] = APOC.themes[book] || {})[obj.slug] = obj; }
  };
  APOC.getChapter = function (book, id) { return (APOC.chapters[book] || {})[id] || null; };
  APOC.getTheme = function (book, slug) { return (APOC.themes[book] || {})[slug] || null; };

  /* ---------- Helpers de DOM ---------- */
  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        if (k === 'class') node.className = attrs[k];
        else if (k === 'html') node.innerHTML = attrs[k];
        else if (k === 'text') node.textContent = attrs[k];
        else if (k.slice(0, 2) === 'on' && typeof attrs[k] === 'function')
          node.addEventListener(k.slice(2).toLowerCase(), attrs[k]);
        else if (attrs[k] != null) node.setAttribute(k, attrs[k]);
      });
    }
    (children || []).forEach(function (c) {
      if (c == null) return;
      node.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
    });
    return node;
  }

  function getParam(name) {
    var m = new RegExp('[?&]' + name + '=([^&]*)').exec(location.search);
    return m ? decodeURIComponent(m[1].replace(/\+/g, ' ')) : null;
  }

  /* Carrega um script dinamicamente (para os dados de um artigo específico) */
  function loadScript(src, cb) {
    var s = document.createElement('script');
    s.src = src;
    s.onload = function () { cb && cb(true); };
    s.onerror = function () { cb && cb(false); };
    document.head.appendChild(s);
  }

  /* Numeral romano (1..22) para enfeite */
  function roman(n) {
    var map = [[10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']];
    var out = '';
    map.forEach(function (p) { while (n >= p[0]) { out += p[1]; n -= p[0]; } });
    return out;
  }

  function slugifyTag(t) { return encodeURIComponent(String(t).toLowerCase().trim()); }

  /* ---------- Cabeçalho / Rodapé compartilhados ---------- */
  var NAV = [
    { href: 'index.html', label: 'Início', icon: '🏠' },
    { href: 'index.html#livros', label: 'Livros', icon: '📚' },
    { href: 'comparar.html', label: 'Comparar', icon: '📊' },
    { href: 'sobre.html', label: 'Sobre', icon: '📜' }
  ];

  function buildHeader() {
    var mount = document.getElementById('site-header');
    if (!mount) return;
    var here = location.pathname.split('/').pop() || 'index.html';

    var links = NAV.map(function (item) {
      var a = el('a', { href: item.href, class: 'nav-link' }, [
        el('span', { class: 'nav-ico', text: item.icon }),
        document.createTextNode(' ' + item.label)
      ]);
      if (item.href === here) a.classList.add('is-active');
      return a;
    });

    var nav = el('nav', { class: 'site-nav', 'aria-label': 'Navegação principal' }, links);
    var brand = el('a', { href: 'index.html', class: 'brand', 'aria-label': 'Apocalipse — início' }, [
      el('span', { class: 'brand-ornament', text: '📖' }),
      el('span', { class: 'brand-name', text: 'Apocalipse' })
    ]);

    var toggle = el('button', {
      class: 'nav-toggle', 'aria-label': 'Abrir menu', type: 'button',
      onclick: function () { nav.classList.toggle('is-open'); }
    }, [el('span', { html: '&#9776;' })]);

    mount.appendChild(el('div', { class: 'header-inner' }, [brand, toggle, nav]));
  }

  function buildFooter() {
    var mount = document.getElementById('site-footer');
    if (!mount) return;
    mount.appendChild(el('div', { class: 'footer-inner' }, [
      el('p', { class: 'footer-rule', html: '&#10070; &nbsp; &#10070; &nbsp; &#10070;' }),
      el('p', { text: 'Apocalipse — enciclopédia comparada das interpretações teológicas do livro do Apocalipse.' }),
      el('p', { class: 'footer-fine', text: 'Conteúdo de caráter informativo e comparativo. As fontes de cada interpretação são citadas em cada artigo.' })
    ]));
  }

  /* ---------- Nuvem de tags (agregada do índice) ---------- */
  function allArticles() {
    return (APOC.index || []).slice();
  }

  function tagCounts() {
    var counts = {};
    allArticles().forEach(function (a) {
      (a.tags || []).forEach(function (t) {
        counts[t] = (counts[t] || 0) + 1;
      });
    });
    return counts;
  }

  function buildTagCloud(mountId) {
    var mount = document.getElementById(mountId);
    if (!mount) return;
    var counts = tagCounts();
    // exibe apenas tags que aparecem em pelo menos duas páginas
    var tags = Object.keys(counts).filter(function (t) { return counts[t] >= 2; })
      .sort(function (a, b) { return counts[b] - counts[a] || a.localeCompare(b); });
    if (!tags.length) { mount.appendChild(el('p', { class: 'muted', text: 'As tags aparecerão conforme os artigos forem publicados.' })); return; }
    var max = counts[tags[0]] || 1;
    tags.forEach(function (t) {
      var weight = 0.85 + (counts[t] / max) * 0.9; // 0.85em .. 1.75em
      mount.appendChild(el('a', {
        href: 'busca.html?tag=' + slugifyTag(t),
        class: 'tag-chip',
        style: 'font-size:' + weight.toFixed(2) + 'em',
        text: t
      }));
    });
  }

  /* expõe helpers */
  APOC.ui = { el: el, getParam: getParam, loadScript: loadScript, roman: roman, slugifyTag: slugifyTag, allArticles: allArticles };

  document.addEventListener('DOMContentLoaded', function () {
    buildHeader();
    buildFooter();
    buildTagCloud('tag-cloud');
  });
})();
