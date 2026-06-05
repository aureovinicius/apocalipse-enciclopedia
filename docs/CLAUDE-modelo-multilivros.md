# Modelo de CLAUDE.md — versão multi-livros (guarda-chuva)

> Modelo para quando o projeto evoluir de "só Apocalipse" para uma **enciclopédia de vários
> livros e temas bíblicos**. Copie este conteúdo para o `CLAUDE.md` do projeto-guarda-chuva e
> ajuste. Mantém o mesmo modelo de dados, design e regras editoriais já validados no Apocalipse.

## Visão geral
Enciclopédia web que compara, por capítulo/tema, como ~16 tradições teológicas interpretam
**vários livros da Bíblia**, e um canal de YouTube derivado. PT-BR. Mesmos padrões do projeto
Apocalipse (ver o repositório original como referência).

## Princípio de design técnico (inalterado)
- **Estático, sem build.** Dados em `.js` que se registram em `window.APOC` (sem `fetch`).
- Roda com `python3 -m http.server`; deploy via GitHub Pages.

## Estrutura de dados sugerida para múltiplos livros
Introduzir um **registro de livros** e namespacear os dados por livro:

```
data/
  traditions.js          # global (reutilizado por todos os livros)
  methods.js             # global
  icons.js               # global + ícones por livro
  books.js               # window.APOC.books = [{ slug, name, chapters: N, order, blurb, icon }]
  apocalipse/
    chapters/cap-1..22.js
    themes/<slug>.js
  <novo-livro>/
    chapters/cap-1..N.js
    themes/<slug>.js
  search-index.js        # inclui o campo `book` em cada entrada
```

Schema de cada capítulo passa a incluir `book`:
```js
window.APOC.register('chapter', {
  book: 'apocalipse', id, slug, title, summary, tags,
  verses: [{ ref, text }], intro, adventistEmphasis,
  status, interpretations: [{ tradition, method, stance, text, sources }]
});
```
Rotas com o livro no parâmetro: `artigo.html?livro=<slug>&cap=N`, `tema.html?livro=<slug>&slug=...`.

## Navegação (guarda-chuva)
- **Home**: vitrine dos livros (cards por livro) + busca global + nuvem de tags global.
- **Por livro**: uma página/seção com a grade de capítulos daquele livro (reutiliza o componente
  da grade numérica) e a lista de temáticos do livro.
- **Comparar** e **Sobre**: globais, como hoje.
- A busca (`busca.html`) e as tags passam a abranger todos os livros (filtro opcional por livro).

## O que se mantém igual (não reinventar)
- **16 tradições** e **5 métodos** (ids e cores) — `data/traditions.js` / `data/methods.js`.
- **Design "Manuscrito Iluminado Moderno"** (ouro/bordô, Playfair + Source Serif, emojis).
- **Duas formas de explorar**: cards por tradição + filtro por método; tabela comparativa.
  (Sem radar.) Busca, tags, botão Imprimir/PDF.
- **Regras editoriais**: introdução neutra + ênfase adventista pelas ideias; fontes reais;
  versículos da Almeida (domínio público).
- **Materiais do canal** (roteiros/TTS/descrições) na pasta `roteiros-videos/`, **fora do git**,
  com a mesma estratégia (abertura neutra → interpretações distintas → fechamento adventista
  revelado só no fim).

## Migração a partir do projeto atual (resumo)
1. Mover `data/chapters` e `data/themes` para `data/apocalipse/…` e adicionar `book: 'apocalipse'`.
2. Criar `data/books.js` com o registro de livros.
3. Generalizar `article.js`/grades para ler o parâmetro `livro`.
4. Transformar a home em vitrine de livros; manter `comparar.html`/`sobre.html` globais.
5. Atualizar `search-index.js` com o campo `book`.

## Git
- Commitar só quando pedido; `roteiros-videos/` ignorado.
- Rodapé: `Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>`.
