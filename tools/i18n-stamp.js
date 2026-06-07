/* Marca os arquivos traduzidos existentes com srcHash = hash do conteúdo PT atual,
   indicando "esta tradução corresponde a esta versão do fonte".
   Uso:
     node tools/i18n-stamp.js                 -> carimba TODOS (use no baseline ou após
                                                 retraduzir tudo que estava pendente)
     node tools/i18n-stamp.js <livro> <chave> -> só um artigo (ex.: apocalipse cap-1 | daniel themes/...)
   Rode SEMPRE após (re)traduzir um artigo, para marcá-lo como atualizado. */
const C = require('./i18n-common');
var onlyBook = process.argv[2] || null;
var onlyKey = process.argv[3] || null;

var idx = C.ptIndex();
var stamped = 0;
idx.forEach(function (e) {
  if (onlyBook && e.book !== onlyBook) return;
  if (onlyKey && C.label(e).split('/').slice(1).join('/') !== onlyKey.replace(/^.*?\//, '') && ('cap-' + e.id) !== onlyKey && ('themes/' + e.slug) !== onlyKey) return;
  var h = C.transHash(C.loadObj(C.ptPath(e)));
  C.LANGS.forEach(function (lang) {
    var tf = C.trPath(e, lang);
    if (!C.fs.existsSync(tf)) return;
    var txt = C.fs.readFileSync(tf, 'utf8');
    if (/srcHash:\s*'[^']*'/.test(txt)) {
      txt = txt.replace(/srcHash:\s*'[^']*'/, "srcHash: '" + h + "'");
    } else {
      txt = txt.replace(new RegExp("(lang:\\s*'" + lang + "',)"), "$1 srcHash: '" + h + "',");
    }
    C.fs.writeFileSync(tf, txt);
    stamped++;
  });
});
console.log('Carimbados ' + stamped + ' arquivo(s) traduzido(s).');
