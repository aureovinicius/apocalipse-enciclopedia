/* Gera esqueletos dos capítulos de Daniel em data/daniel/chapters/.
   Rode: node tools/gen-daniel-skeletons.js  (não sobrescreve quem já tem conteúdo) */
const fs = require('fs');
const path = require('path');

const CH = [
  [1, 'Fiéis na corte da Babilônia', 'Daniel e seus três amigos recusam as iguarias do rei; a prova de dez dias confirma a fidelidade deles.', ['daniel', 'babilônia', 'prova de dez dias', 'fidelidade', 'dieta', 'corte']],
  [2, 'O sonho da grande estátua', 'Nabucodonosor sonha com uma estátua de metais e a pedra que a destrói e enche a terra: os reinos da história.', ['estátua', 'nabucodonosor', 'reinos', 'pedra', 'sonho', 'profecia']],
  [3, 'A fornalha ardente', 'Sadraque, Mesaque e Abede-Nego recusam adorar a estátua de ouro e são livrados da fornalha pelo quarto homem.', ['fornalha', 'estátua de ouro', 'três jovens', 'adoração', 'livramento', 'quarto homem']],
  [4, 'O sonho da árvore e a humilhação de Nabucodonosor', 'A árvore cortada, os sete tempos de loucura do rei e o reconhecimento de que o Altíssimo domina.', ['árvore', 'nabucodonosor', 'sete tempos', 'soberania', 'humildade', 'loucura']],
  [5, 'A escrita na parede e a queda de Babilônia', 'O banquete de Belsazar, as palavras Mene, Mene, Tequel, Parsim e a queda do império naquela noite.', ['belsazar', 'escrita na parede', 'mene tequel', 'queda da babilônia', 'medos e persas', 'banquete']],
  [6, 'Daniel na cova dos leões', 'O decreto de Dario, a oração fiel de Daniel e o livramento na cova dos leões.', ['cova dos leões', 'dario', 'oração', 'decreto', 'livramento', 'fidelidade']],
  [7, 'As quatro bestas e o Filho do Homem', 'Quatro animais que surgem do mar, o chifre pequeno, o juízo do Ancião de Dias e o reino do Filho do Homem.', ['quatro bestas', 'chifre pequeno', 'filho do homem', 'ancião de dias', 'juízo', 'reinos']],
  [8, 'O carneiro, o bode e as 2.300 tardes e manhãs', 'A visão do carneiro e do bode, o chifre pequeno e as 2.300 tardes e manhãs até a purificação do santuário.', ['carneiro', 'bode', 'chifre pequeno', '2300 tardes e manhãs', 'santuário', 'médo-persa e grécia']],
  [9, 'A oração de Daniel e as setenta semanas', 'A oração de confissão de Daniel e a profecia das setenta semanas, com a vinda do Messias.', ['setenta semanas', 'oração', 'messias', 'profecia', 'jerusalém', 'ungido']],
  [10, 'A visão junto ao rio Tigre', 'O homem vestido de linho, o conflito espiritual e Miguel, o grande príncipe, junto ao rio Hidéquel.', ['rio tigre', 'homem de linho', 'miguel', 'conflito', 'visão', 'príncipe']],
  [11, 'Os reis do Norte e do Sul', 'A longa profecia dos conflitos entre os reis do Norte e do Sul e a ascensão de um poder soberbo.', ['rei do norte', 'rei do sul', 'guerras', 'profecia', 'persa e grécia', 'rei vil']],
  [12, 'O tempo do fim e a ressurreição', 'Miguel se levanta, o livro é selado, a ressurreição dos que dormem e os 1.290 e 1.335 dias.', ['tempo do fim', 'ressurreição', 'miguel', 'livro selado', '1290 e 1335 dias', 'sabedoria']]
];

const dir = path.join(__dirname, '..', 'data', 'daniel', 'chapters');
fs.mkdirSync(dir, { recursive: true });

function hasContent(file) {
  if (!fs.existsSync(file)) return false;
  const s = fs.readFileSync(file, 'utf8');
  return !/status:\s*'skeleton'/.test(s) && /interpretations:\s*\[\s*\{/.test(s);
}

CH.forEach(function (c) {
  const file = path.join(dir, 'cap-' + c[0] + '.js');
  if (hasContent(file)) { console.log('mantido (já tem conteúdo):', file); return; }
  const out =
`/* Daniel ${c[0]} — esqueleto. Substituir interpretations[] pelo conteúdo pesquisado. */
window.APOC.register('chapter', {
  book: 'daniel',
  id: ${c[0]},
  slug: 'capitulo-${c[0]}',
  title: 'Daniel ${c[0]} — ${c[1].replace(/'/g, "\\'")}',
  summary: '${c[2].replace(/'/g, "\\'")}',
  tags: ${JSON.stringify(c[3])},
  status: 'skeleton',
  interpretations: []
});
`;
  fs.writeFileSync(file, out);
  console.log('gerado:', file);
});
console.log('Concluído.');
