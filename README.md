# Apocalipse — Enciclopédia das interpretações

Site estático (HTML/CSS/JS puro, sem build) que compara, capítulo a capítulo, como
~16 tradições teológicas interpretam o livro do Apocalipse. Tema visual **Manuscrito
Iluminado Moderno** (fundo pergaminho escuro, ouro e bordô, Playfair Display + Source Serif 4).

## Como abrir

Por causa do carregamento dinâmico dos dados, abra com um servidor local (recomendado):

```bash
cd apocalipse
python3 -m http.server 8765
# abra http://localhost:8765/index.html
```

Também funciona abrindo `index.html` diretamente (`file://`), pois os dados são
arquivos `.js` que se registram em `window.APOC` (sem `fetch`).

## Estrutura

- `index.html` — home com título "Apocalipse", caixa de pesquisa e nuvem de tags.
- `capitulos.html` — grade com os 22 números → `artigo.html?cap=N`.
- `tematicos.html` — cards dos artigos temáticos → `tema.html?slug=...`.
- `artigo.html` / `tema.html` — template de artigo (capítulo / temático).
- `busca.html` — busca por texto (`?q=`) e filtro por tag (`?tag=`).
- `comparar.html` — radar global + tabela comparativa das tradições.
- `sobre.html` — metodologia, glossário das escolas e tradições.
- `assets/css/` — `styles.css` (tema) e `print.css` (impressão/PDF).
- `assets/js/` — `app.js` (núcleo/menu), `article.js` (cards+filtro, tabela, radar),
  `search.js` (busca), `radar.js` (Chart.js).
- `assets/lib/chart.umd.min.js` — Chart.js vendorizado (offline).
- `data/` — `traditions.js`, `methods.js`, `search-index.js`,
  `chapters/cap-1..22.js`, `themes/*.js`.

## Cada artigo oferece três formas de explorar

1. **Cards por tradição** (expansíveis) com **filtro por método hermenêutico**.
2. **Tabela comparativa** (tradição × método × postura-chave), ordenável.
3. **Gráfico de radar** interativo — selecione tradições, **Salve PNG** ou **Compartilhe**
   o link (a seleção é codificada no `#hash`).

Há ainda um botão **Imprimir / Salvar PDF** em cada artigo (`window.print()` + `print.css`).

## Adicionar / editar conteúdo

Cada capítulo é um arquivo em `data/chapters/cap-N.js` que chama
`window.APOC.register('chapter', { id, slug, title, summary, tags, status, interpretations })`.
Cada interpretação: `{ tradition, method, stance, text, sources:[{title,url}] }`, onde
`tradition` é um id de `data/traditions.js` e `method` um id de `data/methods.js`.

Para regenerar esqueletos vazios (não sobrescreve arquivos com conteúdo):

```bash
node tools/gen-skeletons.js
```

Ao criar um novo artigo, acrescente também a entrada correspondente em
`data/search-index.js` (usado pela busca, nuvem de tags e grades).

## Nota sobre o conteúdo

As interpretações sintetizam fontes representativas de cada tradição, citadas em cada
card. Tradições internamente plurais são apresentadas em suas posições mais difundidas.
O caráter é informativo e comparativo, sem tomar partido.
