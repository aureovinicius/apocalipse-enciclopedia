# CLAUDE.md — Convenções do projeto

> Carregado automaticamente pelo Claude Code. Resume as convenções técnicas e
> editoriais. Para o histórico narrativo das decisões, veja `CONTEXTO-DO-PROJETO.md`.

## Visão geral
Enciclopédia web **multi-livros** que compara, **capítulo a capítulo**, como ~16 tradições
teológicas interpretam livros bíblicos. Idioma: **português do Brasil**. Livros já publicados:
**Apocalipse** (22 capítulos + 3 temáticos) e **Daniel** (12 capítulos). Novos livros seguem o
mesmo padrão (ver "Expansão" e `docs/CLAUDE-modelo-multilivros.md`).

- Repositório: `https://github.com/aureovinicius/apocalipse-enciclopedia`
- Site publicado (GitHub Pages): `https://aureovinicius.github.io/apocalipse-enciclopedia/`

## Stack e como rodar
- **Site estático, sem build** — HTML/CSS/JS puro. NÃO introduzir framework/bundler sem pedido.
- Os dados são arquivos `.js` que se registram em `window.APOC` (NÃO usar `fetch`/JSON), para
  funcionar também via `file://`.
- Rodar localmente: `python3 -m http.server 8765` e abrir `http://localhost:8765/index.html`
  (config de preview em `.claude/launch.json`).
- Deploy: push na branch `main` → GitHub Pages republica sozinho.

## Estrutura (multi-livros)
- Páginas: `index.html` (home: **vitrine de livros** + busca + nuvem de tags global),
  `capitulos.html?livro=<slug>` (grade de capítulos do livro), `artigo.html?livro=<slug>&cap=N`,
  `tematicos.html?livro=<slug>`, `tema.html?livro=<slug>&slug=...`, `busca.html` (`?q=` / `?tag=`,
  global a todos os livros), `sobre.html`.
  (Rotas sem `?livro=` assumem `apocalipse`, mantendo compatibilidade.)
- `assets/js/`: `app.js` (núcleo/registro por livro/menu/nuvem de tags), `article.js`
  (roteamento por livro, cards+filtro e tabela), `search.js` (busca client-side).
- `assets/css/`: `styles.css` (tema) e `print.css` (impressão/PDF).
- `data/`: globais → `books.js` (registro de livros), `traditions.js`, `methods.js`, `icons.js`
  (ícones por livro), `search-index.js` (cada entrada tem `book`).
- `data/<livro>/chapters/cap-N.js` e `data/<livro>/themes/<slug>.js` — ex.: `data/apocalipse/...`,
  `data/daniel/...`.
- `tools/`: `gen-skeletons.js` (Apocalipse) e `gen-daniel-skeletons.js` — geram esqueletos
  (não sobrescrevem quem já tem conteúdo).

O registro lê o livro de `obj.book` ou de `APOC._loadingBook` (definido pelo carregador antes de
injetar o script). Dados ficam em `APOC.chapters[livro][id]` / `APOC.themes[livro][slug]`
(use `APOC.getChapter(livro,id)` / `APOC.getTheme(livro,slug)`).

## Modelo de dados
Capítulo (`data/<livro>/chapters/cap-N.js`):
```js
window.APOC.register('chapter', {
  book: 'apocalipse',               // ou 'daniel', etc.
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
Tema (`data/<livro>/themes/<slug>.js`): igual, mas `register('theme', {...})` com `slug` e
`chapters: [..]`. Ao criar artigo novo: registrar o livro em `data/books.js`, os ícones em
`data/icons.js` e a entrada (com `book`) em `data/search-index.js`.

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

## Internacionalização (i18n)
Seletor de idiomas (bandeiras) no cabeçalho: **pt** (padrão), **en**, **es**, **ja**. Dicionário da
INTERFACE em `data/i18n.js` (`APOC.t(chave, {params})`, `APOC.bookName/bookBlurb`, `APOC.setLang`).
Idioma escolhido fica em `localStorage` (`profecias_lang`); `?lang=xx` força. Textos estáticos usam
`data-i18n` / `data-i18n-ph`; textos dinâmicos usam `APOC.t`. Nomes de tradições/métodos/famílias
localizados via `APOC.tradName/methodName/familyName`.

**Conteúdo dos artigos traduzido nos 4 idiomas** (PT/EN/ES/JA): cada tradução fica em
`data/<livro>/<lang>/cap-N.js` (e `…/<lang>/themes/<slug>.js`), com `lang` no objeto. O loader em
`article.js` tenta o idioma atual e cai no PT (mostrando `content_note`) se faltar. Versículos por
idioma de domínio público: PT=Almeida, EN=KJV, ES=Reina-Valera, JA=文語訳. As `tags` ficam em PT em
todos os idiomas (para a busca/nuvem global); rótulos traduzidos em `data/tags-i18n.js` via
`APOC.tagLabel`. Metadados das grades/busca por idioma em `data/search-index.<lang>.js`
(gerado por `tools/gen-index-lang.js <lang>`). Nomes de tradições/métodos/famílias e descrições
da página Sobre vivem no i18n (`APOC.tradName/methodName/familyName/methodDesc/tradBlurb`).

### Manter as traduções em dia (automação)
Cada arquivo traduzido guarda `srcHash` = hash do conteúdo PT de origem. Fluxo ao editar/incluir PT:
1. `node tools/i18n-status.js` — lista o que está **faltando** ou **desatualizado** (a GitHub Action
   `.github/workflows/i18n-check.yml` roda isso a cada push e mostra no resumo do job).
2. (Re)traduzir os artigos pendentes para EN/ES/JA (tarefa do Claude — mantém qualidade e os
   versículos de domínio público corretos).
3. `node tools/i18n-stamp.js [livro] [chave]` — marca o(s) artigo(s) como atualizados (grava o novo
   `srcHash`). Sem argumentos, carimba todos (use só no baseline ou após retraduzir tudo).
4. `node tools/gen-index-lang.js <lang>` — regenera os índices dos idiomas afetados.
> A tradução em si NÃO é automática de propósito: conteúdo doutrinário + versículos exigem revisão.
> Para tornar a tradução também automática (via API), bastaria um script chamando um modelo + chave.

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
- **Commitar e empurrar automaticamente** após cada mudança concluída, sem precisar pedir
  (preferência do autor). A pasta `roteiros-videos/` é ignorada (não versionar).
- Rodapé de commit: `Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>`.
