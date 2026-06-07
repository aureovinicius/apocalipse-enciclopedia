/* ==========================================================================
   search.js — busca client-side sobre APOC.index (título, resumo, tags,
   tradições) e filtro por tag. Renderiza em #search-root.
   ========================================================================== */
(function () {
  'use strict';
  var APOC = window.APOC, el = APOC.ui.el, getParam = APOC.ui.getParam, slug = APOC.ui.slugifyTag;
  function t(k, p) { return APOC.t ? APOC.t(k, p) : k; }

  function norm(s) { return (s || '').toString().toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, ''); }

  function bookName(a) { return APOC.bookName ? APOC.bookName(a.book) : (a.book || ''); }
  function articleHref(a) {
    var b = a.book || 'apocalipse';
    return a.type === 'theme' ? 'tema.html?livro=' + b + '&slug=' + a.slug : 'artigo.html?livro=' + b + '&cap=' + a.id;
  }
  function typeLabel(a) {
    var bn = bookName(a);
    return a.type === 'theme' ? (bn ? bn + ' · ' + t('rtype_theme') : t('rtype_theme')) : (bn ? bn + ' ' + a.id : a.id);
  }

  function matchQuery(a, q) {
    if (!q) return true;
    var hay = norm([a.title, a.summary, bookName(a), (a.tags || []).join(' '), (a.traditions || []).join(' ')].join(' '));
    return q.split(/\s+/).filter(Boolean).every(function (term) { return hay.indexOf(norm(term)) >= 0; });
  }
  function matchTag(a, tag) {
    if (!tag) return true;
    return (a.tags || []).some(function (t) { return norm(t) === norm(tag); });
  }

  function renderResult(a) {
    var card = el('a', { class: 'result', href: articleHref(a) }, [
      el('span', { class: 'rtype', text: typeLabel(a) }),
      el('h3', { text: a.title }),
      a.summary ? el('p', { text: a.summary }) : null,
      el('div', { class: 'tags' }, (a.tags || []).slice(0, 8).map(function (tg) {
        return el('span', { class: 'tag-chip', style: 'font-size:.76rem;padding:3px 9px', text: APOC.tagLabel ? APOC.tagLabel(tg) : tg });
      }))
    ]);
    return card;
  }

  document.addEventListener('DOMContentLoaded', function () {
    var root = document.getElementById('search-root');
    if (!root) return;

    var q = getParam('q') || '';
    var tag = getParam('tag') || '';
    var index = APOC.getIndex ? APOC.getIndex() : (APOC.index || []);

    // Caixa de busca da própria página
    var input = el('input', { type: 'search', placeholder: t('search_ph'), value: q, 'aria-label': t('search_btn') });
    var form = el('form', { class: 'searchbox', onsubmit: function (e) { e.preventDefault(); var v = encodeURIComponent(input.value.trim()); location.search = '?q=' + v; } }, [
      input, el('button', { type: 'submit', text: t('search_btn') })
    ]);
    root.appendChild(el('div', { class: 'container', style: 'margin-bottom:24px' }, [form]));

    if (tag) {
      root.appendChild(el('div', { class: 'container active-filter' }, [
        el('span', { class: 'pill', html: t('search_tag') + ' <strong>' + (APOC.tagLabel ? APOC.tagLabel(tag) : tag) + '</strong> &nbsp;<a href="busca.html" title="×">&times;</a>' })
      ]));
    }

    var results = index.filter(function (a) { return matchQuery(a, q) && matchTag(a, tag); });
    // ordena: por livro (ordem do registro), depois capítulos por número e temáticos
    results.sort(function (a, b) {
      var oa = ((APOC.bookBySlug && APOC.bookBySlug(a.book)) || {}).order || 99;
      var ob = ((APOC.bookBySlug && APOC.bookBySlug(b.book)) || {}).order || 99;
      if (oa !== ob) return oa - ob;
      if (a.type !== b.type) return a.type === 'chapter' ? -1 : 1;
      return (a.id || 0) - (b.id || 0) || (a.title || '').localeCompare(b.title || '');
    });

    var countText = t('search_count', { n: results.length }) + (q ? ' ' + t('search_for', { q: q }) : '');
    var head = el('div', { class: 'container', style: 'margin-bottom:14px' }, [
      el('p', { class: 'muted', text: countText })
    ]);
    root.appendChild(head);

    var wrap = el('div', { class: 'container' });
    if (!results.length) {
      wrap.appendChild(el('div', { class: 'notice', text: t('search_none') }));
    } else {
      var list = el('div', { class: 'result-list' });
      results.forEach(function (a) { list.appendChild(renderResult(a)); });
      wrap.appendChild(list);
    }
    root.appendChild(wrap);
  });
})();
