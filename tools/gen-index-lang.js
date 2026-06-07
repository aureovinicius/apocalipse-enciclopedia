/* Gera data/search-index.<lang>.js (title/summary do idioma; tags em PT).
   Uso: node tools/gen-index-lang.js <lang>   (ex.: en, es, ja) */
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');
const lang = process.argv[2];
if (!lang) { console.error('Informe o idioma: node tools/gen-index-lang.js <lang>'); process.exit(1); }

globalThis.window = { APOC: { _cap: [], register: function (type, obj) { this._cap.push({ type: type, obj: obj }); } } };
require(path.join(ROOT, 'data', 'search-index.js'));
const ptIndex = window.APOC.index || [];

function loadLang(file) {
  window.APOC._cap = [];
  delete require.cache[require.resolve(file)];
  require(file);
  return window.APOC._cap[0] ? window.APOC._cap[0].obj : null;
}

let found = 0;
const out = ptIndex.map(function (e) {
  var f = e.type === 'chapter'
    ? path.join(ROOT, 'data', e.book, lang, 'cap-' + e.id + '.js')
    : path.join(ROOT, 'data', e.book, lang, 'themes', e.slug + '.js');
  var obj = null;
  try { if (fs.existsSync(f)) { obj = loadLang(f); found++; } } catch (err) { console.error('erro em', f, err.message); }
  return { book: e.book, type: e.type, id: e.id, slug: e.slug, title: (obj && obj.title) || e.title, summary: (obj && obj.summary) || e.summary, tags: e.tags };
});

var body = out.map(function (e) { return '    ' + JSON.stringify(e); }).join(',\n');
var content = '/* Índice (metadados) em ' + lang + ' — gerado por tools/gen-index-lang.js. Títulos/resumos no idioma; tags em PT. */\n(function () {\n  window.APOC = window.APOC || {};\n  window.APOC.index_' + lang + ' = [\n' + body + '\n  ];\n})();\n';
fs.writeFileSync(path.join(ROOT, 'data', 'search-index.' + lang + '.js'), content);
console.log('search-index.' + lang + '.js: ' + out.length + ' entradas (' + found + ' traduzidas).');
