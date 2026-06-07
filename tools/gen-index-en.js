/* Gera data/search-index.en.js (metadados em inglês: title/summary dos arquivos
   traduzidos; tags mantidas em PT) a partir do índice PT e dos arquivos data/<livro>/en/.
   Rode: node tools/gen-index-en.js */
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');

globalThis.window = { APOC: { _cap: [], register: function (type, obj) { this._cap.push({ type: type, obj: obj }); } } };

require(path.join(ROOT, 'data', 'search-index.js')); // popula window.APOC.index (PT)
const ptIndex = window.APOC.index || [];

function loadEn(file) {
  window.APOC._cap = [];
  delete require.cache[require.resolve(file)];
  require(file);
  return window.APOC._cap[0] ? window.APOC._cap[0].obj : null;
}

const out = ptIndex.map(function (e) {
  var enFile = e.type === 'chapter'
    ? path.join(ROOT, 'data', e.book, 'en', 'cap-' + e.id + '.js')
    : path.join(ROOT, 'data', e.book, 'en', 'themes', e.slug + '.js');
  var en = null;
  try { if (fs.existsSync(enFile)) en = loadEn(enFile); } catch (err) { console.error('erro em', enFile, err.message); }
  return {
    book: e.book, type: e.type, id: e.id, slug: e.slug,
    title: (en && en.title) || e.title,
    summary: (en && en.summary) || e.summary,
    tags: e.tags
  };
});

var body = out.map(function (e) { return '    ' + JSON.stringify(e); }).join(',\n');
var content = '/* Índice (metadados) em inglês — gerado por tools/gen-index-en.js.\n   Títulos/resumos em inglês; tags mantidas em português (para a busca/nuvem global). */\n(function () {\n  window.APOC = window.APOC || {};\n  window.APOC.index_en = [\n' + body + '\n  ];\n})();\n';
fs.writeFileSync(path.join(ROOT, 'data', 'search-index.en.js'), content);
console.log('search-index.en.js gerado com ' + out.length + ' entradas');
