# CLAUDE.md — Convenções do projeto

> Carregado automaticamente pelo Claude Code. Resume as convenções técnicas e
> editoriais. Para o histórico narrativo das decisões, veja `CONTEXTO-DO-PROJETO.md`.

## Visão geral
Enciclopédia web que compara, **capítulo a capítulo**, como ~16 tradições teológicas
interpretam o livro do **Apocalipse**. Idioma: **português do Brasil**. O projeto deve
crescer no futuro para **outros livros e temas bíblicos** (ver "Expansão").

- Repositório: `https://github.com/aureovinicius/apocalipse-enciclopedia`
- Site publicado (GitHub Pages): `https://aureovinicius.github.io/apocalipse-enciclopedia/`

## Stack e como rodar
- **Site estático, sem build** — HTML/CSS/JS puro. NÃO introduzir framework/bundler sem pedido.
- Os dados são arquivos `.js` que se registram em `window.APOC` (NÃO usar `fetch`/JSON), para
  funcionar também via `file://`.
- Rodar localmente: `python3 -m http.server 8765` e abrir `http://localhost:8765/index.html`
  (config de preview em `.claude/launch.json`).
- Deploy: push na branch `main` → GitHub Pages republica sozinho.

## Estrutura
- Páginas: `index.html` (home: busca + nuvem de tags), `capitulos.html` (grade dos 22 números),
  `artigo.html?cap=N`, `tematicos.html`, `tema.html?slug=...`, `busca.html` (`?q=` / `?tag=`),
  `comparar.html` (tabela comparativa global), `sobre.html`.
- `assets/js/`: `app.js` (núcleo/registro/menu/nuvem de tags), `article.js` (cards+filtro e tabela),
  `search.js` (busca client-side).
- `assets/css/`: `styles.css` (tema) e `print.css` (impressão/PDF).
- `data/`: `traditions.js`, `methods.js`, `icons.js`, `search-index.js`,
  `chapters/cap-1..22.js`, `themes/*.js`.
- `tools/gen-skeletons.js`: gera esqueletos de capítulos/temas (não sobrescreve quem já tem conteúdo).

## Modelo de dados
Capítulo (`data/chapters/cap-N.js`):
```js
window.APOC.register('chapter', {
  id, slug, title, summary, tags: [...],
  verses: [{ ref, text }],          // versículo(s) em destaque (Almeida, domínio público)
  intro: '…',                       // síntese NEUTRA do panorama interpretativo (\n\n entre parágrafos)
  adventistEmphasis: '…',           // ênfase defendendo a leitura adventista (ver regras editoriais)
  status: 'complete',               // ou 'skeleton'
  interpretations: [
    { tradition, method, stance, text, sources: [{ title, url }] }
    // ... uma por tradição, na mesma ordem/ids do cap-1
  ]
});
```
Tema (`data/themes/<slug>.js`): igual, mas `register('theme', {...})` com `slug` e `chapters: [..]`
(em vez de `id`). Ao criar artigo novo, atualizar também `data/search-index.js`.

- **16 tradições** (ids): `catolica, ortodoxa, luterana, reformada, metodista, evangelica,
  pentecostal, adventista, testemunhas, sud, espirita, esc-preterista, esc-historicista,
  esc-futurista, esc-idealista, esc-dispensacionalista`.
- **5 métodos** (ids = eixos): `preterista, historicista, futurista, idealista, dispensacionalista`.
- Ícones (emoji) por capítulo/tema/tradição em `data/icons.js`.

## Design — "Manuscrito Iluminado Moderno"
- Fundo pergaminho escuro; acentos **ouro** (`--gold #c8a24a`) e **bordô** (`--bordo #7b2230`).
- Tipografia: **Playfair Display** (títulos) + **Source Serif 4** (corpo).
- Detalhes: capitulares douradas, numerais romanos, emojis junto a marca/menu/títulos/cards.

## Funcionalidades (manter)
Cards expansíveis por tradição + **filtro por método**, **tabela comparativa** ordenável,
**busca** e **tags**, botão **Imprimir/Salvar PDF**. (O gráfico de **radar foi removido** —
não reintroduzir sem pedido.)

## Regras editoriais (conteúdo)
- Tom **comparativo e neutro** nos cards e na `intro`; descreve cada posição sem atacá-la.
- **Fontes reais e verificáveis** por interpretação (domínios oficiais de cada tradição). NUNCA
  inventar URLs.
- Versículos: usar tradução em **domínio público** (João Ferreira de Almeida, ACF/ARC).
- `adventistEmphasis`: defende a leitura adventista do sétimo dia **pelas ideias/evidências do
  texto**, com respeito às demais; renderizado num destaque rotulado.

## Materiais do canal de YouTube (em `roteiros-videos/`, IGNORADO pelo git)
- `roteiros-videos/apocalipse-NN.txt`: roteiro de narração. Estrutura: **abertura neutra**
  (sem revelar a vertente) → passagem pelas interpretações **mais distintas** → fechamento com a
  leitura adventista, **revelada só perto do fim (~85%)** e argumentada pelas ideias. Evitar clichês
  repetidos entre vídeos. Esclarecer símbolos (ex.: o Cordeiro = Cristo).
- `roteiros-videos/narracao-tts/`: mesma narração otimizada para TTS (ElevenLabs) — **sem nenhum
  dígito**; números/datas por extenso, "d.C." → "depois de Cristo".
- `roteiros-videos/descricoes-youtube/`: descrição breve por vídeo, com CTA para
  `…/artigo.html?cap=N`.

## Expansão futura (outros livros/temas)
Manter os mesmos padrões. Sugestão ao expandir: introduzir um conceito de "livro" (ex.:
`data/<livro>/chapters/…` e um registro de livros) e um menu/guarda-chuva na home, preservando
tema visual, modelo de dados e regras editoriais acima.

## Git
- Commitar/empurrar só quando pedido. A pasta `roteiros-videos/` é ignorada (não versionar).
- Rodapé de commit: `Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>`.
