/* ==========================================================================
   article.js — renderiza um artigo (capítulo ou temático) com duas
   formas de explorar: cards expansíveis (+filtro) e tabela comparativa.
   A página define window.ARTICLE_TYPE = 'chapter' | 'theme'.
   ========================================================================== */
(function () {
  'use strict';
  var APOC = window.APOC, el = APOC.ui.el, getParam = APOC.ui.getParam, slug = APOC.ui.slugifyTag;
  function t(k, p) { return APOC.t ? APOC.t(k, p) : k; }
  function bookNameOf(slugId) { return APOC.bookName ? APOC.bookName(slugId) : slugId; }

  function methodMeta(id) { return APOC.methodById(id) || { id: id, name: id, color: '#999' }; }
  function tradMeta(id) { return APOC.traditionById(id) || { id: id, name: id, color: '#999' }; }
  function initials(name) {
    return name.split(/[\s/]+/).filter(Boolean).slice(0, 2).map(function (w) { return w[0]; }).join('').toUpperCase();
  }

  /* ---------- Cabeçalho do artigo ---------- */
  function renderHead(mount, data, type) {
    var bookName = bookNameOf(data.book);

    var kicker = type === 'chapter'
      ? t('kicker_chapter', { book: bookName, n: data.id, roman: APOC.ui.roman(data.id) })
      : t('kicker_theme', { book: bookName });

    var tags = el('div', { class: 'article-tags' }, (data.tags || []).map(function (tg) {
      return el('a', { class: 'tag-chip', href: 'busca.html?tag=' + slug(tg), text: tg });
    }));

    var printBtn = el('button', { class: 'btn btn-gold', type: 'button', onclick: function () { window.print(); } },
      [el('span', { html: '&#128424;' }), t('article_print')]);

    var backHref = (type === 'chapter' ? 'capitulos.html?livro=' : 'tematicos.html?livro=') + data.book;
    var backLbl = type === 'chapter' ? t('back_chapters', { book: bookName }) : t('back_themes', { book: bookName });

    var headIcon = type === 'chapter'
      ? (APOC.iconForChapter ? APOC.iconForChapter(data.book, data.id) : '')
      : (APOC.iconForTheme ? APOC.iconForTheme(data.book, data.slug) : '');

    mount.appendChild(el('div', { class: 'container article-head' }, [
      el('div', { class: 'crumbs', html: '<a href="' + backHref + '">' + backLbl + '</a>' }),
      el('p', { class: 'kicker', text: kicker }),
      el('h1', {}, [
        headIcon ? el('span', { class: 'title-ico', text: headIcon }) : null,
        document.createTextNode((headIcon ? ' ' : '') + data.title)
      ]),
      data.summary ? el('p', { class: 'summary', text: data.summary }) : null,
      type === 'theme' && data.chapters ? el('p', { class: 'muted', html: t('based_on') + ' ' + data.chapters.map(function (c) { return '<a href="artigo.html?livro=' + data.book + '&cap=' + c + '">' + bookName + ' ' + c + '</a>'; }).join(', ') }) : null,
      tags,
      el('div', { class: 'article-meta' }, [printBtn])
    ]));
  }

  function splitParas(s) { return String(s).split(/\n\n+/).map(function (p) { return p.trim(); }).filter(Boolean); }

  /* ---------- Introdução: versos em destaque + síntese + ênfase adventista ---------- */
  function buildIntro(mount, data) {
    var hasVerses = data.verses && data.verses.length;
    if (!hasVerses && !data.intro && !data.adventistEmphasis) return;

    var wrap = el('div', { class: 'container intro-wrap' });

    if (hasVerses) {
      var ep = el('blockquote', { class: 'epigraph' });
      data.verses.forEach(function (v) {
        ep.appendChild(el('p', { class: 'epigraph-text', text: '“' + v.text + '”' }));
        if (v.ref) ep.appendChild(el('p', { class: 'epigraph-ref', text: '— ' + v.ref }));
      });
      wrap.appendChild(ep);
    }

    if (data.intro) {
      var body = el('div', { class: 'intro-body' });
      body.appendChild(el('p', { class: 'intro-eyebrow', text: t('intro_eyebrow') }));
      splitParas(data.intro).forEach(function (p) { body.appendChild(el('p', { text: p })); });
      wrap.appendChild(body);
    }

    if (data.adventistEmphasis) {
      var box = el('div', { class: 'adventist-emphasis' });
      box.appendChild(el('h3', { class: 'ae-title' }, [
        el('span', { class: 'ae-ico', text: '📅' }),
        document.createTextNode(' ' + t('adventist_title'))
      ]));
      splitParas(data.adventistEmphasis).forEach(function (p) { box.appendChild(el('p', { text: p })); });
      wrap.appendChild(box);
    }

    mount.appendChild(wrap);
  }

  function skeletonNotice() {
    return el('div', { class: 'container' }, [
      el('div', { class: 'skeleton-flag' }, [el('span', { html: '&#9998; ' }), document.createTextNode(t('skeleton'))])
    ]);
  }

  /* Aviso: conteúdo ainda em português quando o idioma é outro */
  function contentNote(mount) {
    if (APOC.lang && APOC.lang !== 'pt' && t('content_note')) {
      mount.appendChild(el('div', { class: 'container', style: 'margin-top:14px' }, [
        el('div', { class: 'notice', style: 'margin:0', text: t('content_note') })
      ]));
    }
  }

  /* ---------- Painel 1: Cards expansíveis + filtro por método ---------- */
  function buildCardsPanel(interps) {
    var panel = el('div', { class: 'explore-panel panel-cards is-active' });
    panel.appendChild(el('p', { class: 'explore-section-title', text: t('article_cards_title') }));

    var methodsUsed = {};
    interps.forEach(function (i) { methodsUsed[i.method] = true; });

    var active = {}; // método -> ligado?
    Object.keys(methodsUsed).forEach(function (m) { active[m] = true; });

    var list = el('div', { class: 'interp-list' });
    var cards = interps.map(function (i) {
      var tr = tradMeta(i.tradition), m = methodMeta(i.method);
      var body = el('div', { class: 'interp-body' }, [
        el('p', { class: 'first-letter', text: i.text || '' })
      ]);
      if (i.sources && i.sources.length) {
        body.appendChild(el('div', { class: 'sources' }, [
          el('h4', { text: t('article_sources') }),
          el('ol', {}, i.sources.map(function (s) {
            return el('li', {}, [s.url ? el('a', { href: s.url, target: '_blank', rel: 'noopener', text: s.title || s.url }) : el('span', { text: s.title })]);
          }))
        ]));
      }
      var emblemIcon = APOC.iconForTradition ? APOC.iconForTradition(i.tradition) : initials(tr.name);
      var card = el('div', { class: 'interp', 'data-method': i.method }, [
        el('button', { class: 'interp-summary', type: 'button', onclick: function () { card.classList.toggle('is-open'); } }, [
          el('span', { class: 'interp-emblem', style: 'background:' + tr.color, text: emblemIcon }),
          el('span', { class: 'interp-titles' }, [
            el('span', { class: 'interp-name', text: tr.name }),
            el('span', { class: 'interp-method', html: '<span class="mtag">' + m.name + '</span>' + (tr.family ? ' · ' + tr.family : '') })
          ]),
          el('span', { class: 'interp-chev', html: '&#9656;' })
        ]),
        body
      ]);
      return card;
    });
    cards.forEach(function (c) { list.appendChild(c); });

    function applyFilter() {
      cards.forEach(function (c) {
        c.classList.toggle('is-hidden', !active[c.getAttribute('data-method')]);
      });
    }

    var filter = el('div', { class: 'method-filter' }, APOC.methods.filter(function (m) { return methodsUsed[m.id]; }).map(function (m) {
      var pill = el('button', { class: 'method-pill', type: 'button', title: m.desc, onclick: function () {
        active[m.id] = !active[m.id];
        pill.classList.toggle('is-off', !active[m.id]);
        applyFilter();
      } }, [el('span', { class: 'dot', style: 'background:' + m.color }), m.name]);
      return pill;
    }));

    panel.appendChild(filter);
    panel.appendChild(list);
    return panel;
  }

  /* ---------- Painel 2: Tabela comparativa ---------- */
  function buildTablePanel(interps) {
    var panel = el('div', { class: 'explore-panel panel-table' });
    panel.appendChild(el('p', { class: 'explore-section-title', text: t('article_table_title') }));

    var rows = interps.map(function (i) {
      var tr = tradMeta(i.tradition), m = methodMeta(i.method);
      return { trad: tr.name, family: tr.family || '', method: m.name, mcolor: m.color, stance: i.stance || '—' };
    });

    var headers = [['trad', t('th_trad')], ['family', t('th_family')], ['method', t('th_method')], ['stance', t('th_stance')]];
    var sortState = { key: null, dir: 1 };
    var tbody = el('tbody');

    function draw() {
      tbody.innerHTML = '';
      var data = rows.slice();
      if (sortState.key) data.sort(function (a, b) { return a[sortState.key].localeCompare(b[sortState.key]) * sortState.dir; });
      data.forEach(function (r) {
        tbody.appendChild(el('tr', {}, [
          el('td', { class: 'trad', text: r.trad }),
          el('td', { text: r.family }),
          el('td', {}, [el('span', { class: 'badge', style: 'background:' + r.mcolor, text: r.method })]),
          el('td', { text: r.stance })
        ]));
      });
    }

    var thead = el('thead', {}, [el('tr', {}, headers.map(function (h) {
      return el('th', { onclick: function () {
        if (sortState.key === h[0]) sortState.dir *= -1; else { sortState.key = h[0]; sortState.dir = 1; }
        draw();
      }, html: h[1] + ' <span class="muted">&#8597;</span>' });
    }))]);

    draw();
    panel.appendChild(el('div', { class: 'table-wrap' }, [el('table', { class: 'compare' }, [thead, tbody])]));
    panel.appendChild(el('p', { class: 'muted', style: 'margin-top:10px;font-size:.85rem', text: t('article_table_hint') }));
    return panel;
  }

  /* ---------- Abas ---------- */
  function buildExplore(mount, data, type) {
    var interps = (data.interpretations || []).filter(function (i) { return i && i.tradition; });
    var wrap = el('div', { class: 'container section' });

    if (!interps.length || data.status === 'skeleton') {
      mount.appendChild(skeletonNotice());
    }
    if (!interps.length) { mount.appendChild(wrap); return; }

    var panels = {
      cards: buildCardsPanel(interps),
      table: buildTablePanel(interps)
    };

    var tabsDef = [['cards', '&#9707; ' + t('tab_cards')], ['table', '&#9783; ' + t('tab_table')]];
    var tabBtns = {};
    var tabs = el('div', { class: 'explore-tabs' }, tabsDef.map(function (d) {
      var b = el('button', { class: 'explore-tab' + (d[0] === 'cards' ? ' is-active' : ''), type: 'button', html: d[1], onclick: function () {
        Object.keys(panels).forEach(function (k) { panels[k].classList.remove('is-active'); tabBtns[k].classList.remove('is-active'); });
        panels[d[0]].classList.add('is-active'); b.classList.add('is-active');
      } });
      tabBtns[d[0]] = b;
      return b;
    }));

    wrap.appendChild(tabs);
    wrap.appendChild(panels.cards);
    wrap.appendChild(panels.table);
    mount.appendChild(wrap);
  }

  /* ---------- Navegação prev/next (capítulos) ---------- */
  function buildChapterNav(mount, book, id, total) {
    var nav = el('div', { class: 'container' }, [el('div', { class: 'article-nav' }, [
      id > 1 ? el('a', { href: 'artigo.html?livro=' + book + '&cap=' + (id - 1), text: t('nav_prev', { n: id - 1 }) }) : el('span'),
      el('a', { href: 'capitulos.html?livro=' + book, html: t('nav_index') + ' &#10070;' }),
      id < total ? el('a', { href: 'artigo.html?livro=' + book + '&cap=' + (id + 1), text: t('nav_next', { n: id + 1 }) }) : el('span')
    ])]);
    mount.appendChild(nav);
  }

  /* ---------- Boot ---------- */
  function notFound(mount, msg) {
    mount.appendChild(el('div', { class: 'container section' }, [
      el('div', { class: 'notice', html: msg })
    ]));
  }

  document.addEventListener('DOMContentLoaded', function () {
    var type = window.ARTICLE_TYPE || 'chapter';
    var mount = document.getElementById('article-root');
    if (!mount) return;

    var book = getParam('livro') || 'apocalipse';
    var bk = APOC.bookBySlug ? APOC.bookBySlug(book) : null;
    if (!bk) { notFound(mount, 'Livro não encontrado. <a href="index.html">Voltar ao início</a>.'); return; }
    var total = bk.chapters;

    if (type === 'chapter') {
      var id = parseInt(getParam('cap'), 10);
      if (!id || id < 1 || id > total) { notFound(mount, 'Capítulo inválido. <a href="capitulos.html?livro=' + book + '">Ver índice de capítulos</a>.'); return; }
      APOC._loadingBook = book;
      APOC.ui.loadScript('data/' + book + '/chapters/cap-' + id + '.js', function (ok) {
        var data = APOC.getChapter(book, id);
        if (!ok || !data) { notFound(mount, 'Não foi possível carregar o capítulo ' + id + '.'); return; }
        renderHead(mount, data, 'chapter');
        contentNote(mount);
        buildIntro(mount, data);
        buildExplore(mount, data, 'chapter');
        buildChapterNav(mount, book, id, total);
        document.title = data.title + ' — Profecias';
      });
    } else {
      var s = getParam('slug');
      if (!s) { notFound(mount, 'Tema não especificado. <a href="tematicos.html?livro=' + book + '">Ver temáticos</a>.'); return; }
      APOC._loadingBook = book;
      APOC.ui.loadScript('data/' + book + '/themes/' + s + '.js', function (ok) {
        var data = APOC.getTheme(book, s);
        if (!ok || !data) { notFound(mount, 'Não foi possível carregar o tema solicitado.'); return; }
        renderHead(mount, data, 'theme');
        contentNote(mount);
        buildIntro(mount, data);
        buildExplore(mount, data, 'theme');
        mount.appendChild(el('div', { class: 'container' }, [el('div', { class: 'article-nav' }, [
          el('a', { href: 'tematicos.html?livro=' + book, text: t('back_themes', { book: bookNameOf(book) }) }),
          el('a', { href: 'capitulos.html?livro=' + book, html: t('nav_livros') + ' &#10070;' })
        ])]));
        document.title = data.title + ' — Profecias';
      });
    }
  });
})();
