# Contexto do projeto — handoff

> Documento narrativo para retomar o projeto (ou iniciar projetos relacionados) em uma nova
> conversa com o Claude. Resume **o que foi feito, por quê e como continuar**. As convenções
> técnicas/editoriais resumidas estão em `CLAUDE.md`.

## O que é
Uma **enciclopédia web multi-livros** que compara, capítulo a capítulo, as interpretações de
~16 tradições teológicas, e um **canal de YouTube** baseado nesses artigos. Já contém dois livros:
**Apocalipse** (22 capítulos + 3 temáticos) e **Daniel** (12 capítulos), e foi estruturada para
**acrescentar outros livros e temas bíblicos** com o mesmo padrão.

> Atualização: o site foi convertido para o formato **multi-livros** (registro em `data/books.js`,
> dados em `data/<livro>/…`, rotas `?livro=<slug>&cap=N`, home como vitrine de livros) e **Daniel**
> foi adicionado seguindo todas as diretrizes (16 interpretações com fontes + versos + introdução +
> ênfase adventista por capítulo). Detalhes técnicos em `CLAUDE.md`.

- Repositório: https://github.com/aureovinicius/apocalipse-enciclopedia (público)
- Site no ar: https://aureovinicius.github.io/apocalipse-enciclopedia/
- Projeto local: `/Users/aureovinicius/claude/apocalipse`

## Decisões principais (e o porquê)
- **Site estático sem build** (HTML/CSS/JS puro), conteúdo em arquivos `.js` que se registram em
  `window.APOC` — escolhido para abrir até via `file://` e hospedar fácil (GitHub Pages / HostGator).
- **Design "Manuscrito Iluminado Moderno"**: pergaminho escuro, ouro e bordô, Playfair Display +
  Source Serif 4, capitulares e emojis — para um ar solene e acadêmico.
- **Conteúdo**: 22 capítulos + 3 artigos temáticos ("As Sete Igrejas", "Os Sete Selos", "A Besta
  com Sete Cabeças"), cada um com **16 interpretações** pesquisadas e com **fontes citadas**
  (pesquisa web). Total ~400 interpretações.
- Cada artigo tem, **acima das abas**: versículo(s) em destaque + uma **introdução neutra** com o
  panorama das interpretações + um **destaque com a leitura adventista do sétimo dia** (defendida
  pelas ideias do texto). Idem nos 3 temáticos.
- **Exploração dos dados**: cards expansíveis por tradição com **filtro por método**, **tabela
  comparativa** ordenável, **busca** e **tags**, botão **Imprimir/Salvar PDF**.
- Havia um **gráfico de radar**; foi **removido** a pedido (Chart.js também), preservando todo o
  resto.

## Estado atual (feito)
- Site completo e publicado; navegação por capítulos (grade de números) e temáticos; home com
  busca e nuvem de tags; página "Comparar" (tabela global); página "Sobre".
- Conteúdo dos 22 capítulos + 3 temáticos preenchido e validado.
- **Materiais do canal** (na pasta `roteiros-videos/`, **fora do git**):
  - 25 **roteiros** de narração (22 capítulos + 3 temáticos) — `roteiros-videos/*.txt`.
  - **Versões TTS** dos 22 capítulos (sem dígitos, p/ ElevenLabs) — `roteiros-videos/narracao-tts/`.
  - **Descrições de YouTube** dos 22 capítulos, com CTA para o artigo — `roteiros-videos/descricoes-youtube/`.

## Estratégia dos vídeos (importante)
- Público-alvo **majoritariamente não adventista**. Por isso o roteiro: **abre neutro** (não revela
  a vertente), passa rápido pelas interpretações **mais distintas** (agrupando as parecidas) e
  **fecha** com a leitura adventista — **revelada só perto do fim (~85%)** e sustentada **pelas
  ideias/evidências**, não pelo rótulo. Evitar clichês repetidos entre os vídeos.
- Ferramentas escolhidas: **narração** via **ElevenLabs** (TTS). Para vídeo cinematográfico, o
  recomendado seria Veo (Gemini) ou Sora (ChatGPT) — mas a decisão atual é gerar **apenas a narração**.
- Custo estimado (ElevenLabs, 1 caractere = 1 crédito): ~60 mil caracteres para os 10 primeiros
  capítulos; os 22 somam ~129 mil. Cabe no plano Creator (mês a mês) ou num plano maior de uma vez.

## Pendências / próximos passos sugeridos
- (Opcional) Gerar **TTS e descrições** também para os **3 artigos temáticos**.
- (Opcional) **TTS dos demais capítulos** conforme for produzindo os vídeos.
- **Nome do canal** (ainda a decidir) — favoritos sugeridos: *Lâmpada e Pergaminho*, *À Luz das
  Escrituras*, *Letra Iluminada*, *O Escriba Fiel*. Verificar disponibilidade de @handle e domínio.
- **Expansão para outros livros**: planejar a estrutura "guarda-chuva" (registro de livros, seções
  na home), reaproveitando tema visual, modelo de dados e regras editoriais.

## Como referenciar isto numa nova conversa
1. Aponte o Claude para a pasta `/Users/aureovinicius/claude/apocalipse` ou para o repositório no
   GitHub.
2. Peça para ler **`CLAUDE.md`** (convenções) e **este arquivo** (histórico/decisões).
3. Para preferências válidas em todos os projetos (tom, estética), use a memória do Claude Code
   (atalho `#` ou `/memory`).
