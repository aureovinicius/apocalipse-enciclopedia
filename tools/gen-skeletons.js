/* Gera esqueletos dos arquivos de dados (capítulos e temáticos) a partir dos
   metadados. Rode com: node tools/gen-skeletons.js
   NÃO sobrescreve arquivos que já tenham interpretações (status !== 'skeleton'). */
const fs = require('fs');
const path = require('path');

const CH = [
  [1, 'A visão do Filho do Homem', 'O prólogo, a saudação às sete igrejas e a visão inaugural de Cristo glorificado entre os sete candeeiros.', ['cristofania', 'alfa e ômega', 'sete igrejas', 'filho do homem', 'patmos', 'candeeiros']],
  [2, 'Cartas a Éfeso, Esmirna, Pérgamo e Tiatira', 'As quatro primeiras das sete cartas: elogios, repreensões e promessas aos vencedores.', ['sete igrejas', 'éfeso', 'esmirna', 'pérgamo', 'tiatira', 'cartas']],
  [3, 'Cartas a Sardes, Filadélfia e Laodiceia', 'As três cartas finais às igrejas, incluindo a célebre advertência à mornidão de Laodiceia.', ['sete igrejas', 'sardes', 'filadélfia', 'laodiceia', 'cartas', 'mornidão']],
  [4, 'O trono celestial', 'A porta aberta no céu, o trono, os vinte e quatro anciãos e os quatro seres viventes em adoração.', ['trono', 'adoração', '24 anciãos', 'quatro seres viventes', 'céu']],
  [5, 'O Cordeiro e o livro selado', 'Quem é digno de abrir o livro de sete selos? Apenas o Cordeiro que foi morto.', ['cordeiro', 'livro selado', 'sete selos', 'dignidade', 'redenção']],
  [6, 'A abertura dos seis primeiros selos', 'Os quatro cavaleiros, o clamor dos mártires sob o altar e o grande terremoto da ira do Cordeiro.', ['selos', 'cavaleiros do apocalipse', 'mártires', 'ira do cordeiro']],
  [7, 'Os 144 mil e a grande multidão', 'O selamento dos 144 mil das tribos de Israel e a multidão incontável vinda de toda nação.', ['144 mil', 'grande multidão', 'selados', 'tribos de israel', 'remanescente']],
  [8, 'O sétimo selo e as primeiras trombetas', 'O silêncio no céu, o incenso das orações e as quatro primeiras trombetas de juízo.', ['sétimo selo', 'trombetas', 'incenso', 'juízos']],
  [9, 'A quinta e a sexta trombetas', 'Os gafanhotos do abismo sob Abadom e os exércitos liberados junto ao rio Eufrates.', ['trombetas', 'gafanhotos', 'abismo', 'abadom', 'exército']],
  [10, 'O anjo e o livrinho', 'O anjo forte, os sete trovões selados e o livrinho doce e amargo que João devora.', ['anjo forte', 'livrinho', 'sete trovões', 'profecia']],
  [11, 'As duas testemunhas e a sétima trombeta', 'A medição do templo, o ministério e morte das duas testemunhas e o reino que se torna do Senhor.', ['duas testemunhas', 'templo', 'sétima trombeta', 'reino']],
  [12, 'A mulher, o dragão e o menino', 'O grande sinal da mulher, o dragão vermelho, a guerra no céu e a fuga ao deserto.', ['mulher', 'dragão', 'menino', 'miguel', 'deserto']],
  [13, 'As duas bestas', 'A besta do mar, a besta da terra, a marca e o enigmático número 666.', ['besta', '666', 'falso profeta', 'marca da besta', 'anticristo']],
  [14, 'O Cordeiro no monte Sião e as ceifas', 'Os 144 mil com o Cordeiro, os anjos do evangelho eterno e as duas ceifas da terra.', ['cordeiro', 'monte sião', '144 mil', 'evangelho eterno', 'ceifa', 'vindima']],
  [15, 'Os sete anjos com as últimas pragas', 'O mar de vidro, o cântico de Moisés e do Cordeiro e a preparação das sete taças.', ['sete anjos', 'últimas pragas', 'mar de vidro', 'cântico de moisés']],
  [16, 'As sete taças da ira', 'O derramamento das sete taças, a secagem do Eufrates e a batalha do Armagedom.', ['sete taças', 'ira', 'armagedom', 'eufrates']],
  [17, 'A grande prostituta e a besta', 'A mulher sobre a besta escarlate, a Babilônia, as sete colinas e os dez chifres.', ['prostituta', 'babilônia', 'besta sete cabeças', 'sete colinas', 'dez chifres']],
  [18, 'A queda da Babilônia', 'O anúncio da ruína de Babilônia e os lamentos dos reis, mercadores e marinheiros.', ['babilônia', 'queda', 'mercadores', 'juízo', 'lamento']],
  [19, 'As bodas do Cordeiro e o Cavaleiro fiel', 'Os aleluias celestiais, as bodas do Cordeiro e a vinda do Cavaleiro Fiel e Verdadeiro.', ['bodas do cordeiro', 'aleluia', 'cavaleiro fiel e verdadeiro', 'verbo de deus']],
  [20, 'O milênio e o juízo final', 'A prisão de Satanás, o reinado de mil anos, Gogue e Magogue e o juízo do grande trono branco.', ['milênio', 'gogue e magogue', 'primeira ressurreição', 'juízo final', 'lago de fogo']],
  [21, 'O novo céu e a Nova Jerusalém', 'Um novo céu e uma nova terra, e a descida da Nova Jerusalém, a noiva do Cordeiro.', ['novo céu', 'nova terra', 'nova jerusalém', 'noiva', 'sem mais morte']],
  [22, 'O rio da vida e a vinda de Cristo', 'O rio e a árvore da vida, as últimas advertências e a promessa: "Venho sem demora".', ['rio da vida', 'árvore da vida', 'maranata', 'vinda de cristo', 'ômega']]
];

const TH = [
  ['sete-igrejas', 'As Sete Igrejas', 'Estudo das cartas às sete igrejas da Ásia (Apocalipse 2–3) e suas leituras locais, históricas e simbólicas.', ['sete igrejas', 'éfeso', 'esmirna', 'pérgamo', 'tiatira', 'sardes', 'filadélfia', 'laodiceia', 'cartas'], [2, 3]],
  ['sete-selos', 'Os Sete Selos', 'A abertura do livro selado e os cavaleiros, mártires e selados (Apocalipse 5–7) através das tradições.', ['sete selos', 'cordeiro', 'cavaleiros do apocalipse', '144 mil', 'mártires'], [5, 6, 7]],
  ['besta-sete-cabecas', 'A Besta com Sete Cabeças', 'A besta escarlate, a prostituta e os símbolos de poder do Apocalipse 17 nas diferentes interpretações.', ['besta', 'sete cabeças', 'babilônia', 'prostituta', 'dez chifres', 'anticristo'], [17]]
];

function hasContent(file) {
  if (!fs.existsSync(file)) return false;
  const s = fs.readFileSync(file, 'utf8');
  return !/status:\s*'skeleton'/.test(s) && /interpretations:\s*\[\s*\{/.test(s);
}

function writeChapter([id, name, summary, tags]) {
  const file = path.join(__dirname, '..', 'data', 'chapters', `cap-${id}.js`);
  if (hasContent(file)) { console.log('mantido (já tem conteúdo):', file); return; }
  const out =
`/* Apocalipse ${id} — esqueleto. Substituir interpretations[] pelo conteúdo pesquisado. */
window.APOC.register('chapter', {
  id: ${id},
  slug: 'capitulo-${id}',
  title: 'Apocalipse ${id} — ${name.replace(/'/g, "\\'")}',
  summary: '${summary.replace(/'/g, "\\'")}',
  tags: ${JSON.stringify(tags)},
  status: 'skeleton',
  interpretations: []
});
`;
  fs.writeFileSync(file, out);
  console.log('gerado:', file);
}

function writeTheme([slug, title, summary, tags, chapters]) {
  const file = path.join(__dirname, '..', 'data', 'themes', `${slug}.js`);
  if (hasContent(file)) { console.log('mantido (já tem conteúdo):', file); return; }
  const out =
`/* Tema "${title}" — esqueleto. Substituir interpretations[] pelo conteúdo pesquisado. */
window.APOC.register('theme', {
  slug: '${slug}',
  title: '${title.replace(/'/g, "\\'")}',
  summary: '${summary.replace(/'/g, "\\'")}',
  tags: ${JSON.stringify(tags)},
  chapters: ${JSON.stringify(chapters)},
  status: 'skeleton',
  interpretations: []
});
`;
  fs.writeFileSync(file, out);
  console.log('gerado:', file);
}

CH.forEach(writeChapter);
TH.forEach(writeTheme);
console.log('Concluído.');
