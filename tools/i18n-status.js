/* Relatório de tradução: aponta, por idioma, os artigos FALTANDO ou DESATUALIZADOS
   (quando o conteúdo PT mudou depois da última tradução).
   Uso: node tools/i18n-status.js
   Sai com código 1 se houver pendências (útil em CI). */
const C = require('./i18n-common');

var idx = C.ptIndex();
var missing = [], stale = [], fresh = 0;

idx.forEach(function (e) {
  var h = C.transHash(C.loadObj(C.ptPath(e)));
  C.LANGS.forEach(function (lang) {
    var tf = C.trPath(e, lang);
    if (!C.fs.existsSync(tf)) { missing.push(lang + '  ' + C.label(e)); return; }
    var o = C.loadObj(tf);
    if (!o || o.srcHash !== h) { stale.push(lang + '  ' + C.label(e)); return; }
    fresh++;
  });
});

function block(title, arr) {
  if (!arr.length) return '';
  return '\n### ' + title + ' (' + arr.length + ')\n' + arr.sort().map(function (s) { return '- ' + s; }).join('\n') + '\n';
}

var out = '## Status das traduções (PT → ' + C.LANGS.join('/').toUpperCase() + ')\n';
out += '\n- Em dia: **' + fresh + '**  ·  Faltando: **' + missing.length + '**  ·  Desatualizadas: **' + stale.length + '**\n';
out += block('Faltando (sem arquivo de tradução)', missing);
out += block('Desatualizadas (PT mudou após traduzir)', stale);
if (!missing.length && !stale.length) out += '\n✅ Todas as traduções estão em dia.\n';
else out += '\nGere/atualize os arquivos pendentes e rode `node tools/i18n-stamp.js` (ou peça ao Claude para traduzir).\n';

console.log(out);
process.exit(missing.length || stale.length ? 1 : 0);
