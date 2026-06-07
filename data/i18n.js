/* Internacionalização da INTERFACE (chrome) do site.
   Idiomas: pt (padrão), en, es, ja. O conteúdo dos artigos é traduzido à parte. */
(function () {
  window.APOC = window.APOC || {};

  var STR = {
    pt: {
      lang_name: 'Português',
      nav_inicio: 'Início', nav_livros: 'Livros', nav_sobre: 'Sobre',
      hero_subtitle: 'As Escrituras proféticas — Apocalipse, Daniel e mais — lidas por mais de quinze tradições, capítulo a capítulo.',
      search_ph: 'Buscar capítulos, temas ou tradições…', search_btn: 'Buscar',
      books_eyebrow: 'Escolha um livro', books_title: 'Livros da Bíblia',
      books_desc: 'Cada livro tem seus capítulos analisados lado a lado por mais de quinze tradições, com fontes citadas.',
      tags_eyebrow: 'Navegue por assunto', tags_title: 'Nuvem de tags',
      tags_desc: 'Clique em um tema para encontrar todos os artigos relacionados, de qualquer livro.',
      footer_line: 'Profecias — enciclopédia comparada das interpretações das profecias bíblicas.',
      footer_fine: 'Conteúdo de caráter informativo e comparativo. As fontes de cada interpretação são citadas em cada artigo.',
      n_chapters: '{n} capítulos',
      grid_eyebrow: 'O livro inteiro', grid_head: '{book} — {n} capítulos',
      grid_desc: 'Escolha um número para abrir o artigo comparativo daquele capítulo.',
      grid_themes_btn: 'Artigos temáticos de {book}',
      themes_eyebrow: 'Grandes temas', themes_head: 'Temáticos de {book}',
      themes_desc: 'Estudos que cruzam vários capítulos, com a mesma análise comparada por tradição.',
      themes_empty: 'Ainda não há artigos temáticos para {book}.',
      article_print: 'Imprimir / Salvar PDF', article_sources: 'Fontes',
      article_cards_title: 'Interpretações por tradição', article_table_title: 'Tabela comparativa',
      article_table_hint: 'Clique nos títulos das colunas para ordenar.',
      tab_cards: 'Cards', tab_table: 'Tabela',
      intro_eyebrow: 'O panorama das interpretações',
      adventist_title: 'Em destaque: a leitura adventista do sétimo dia',
      skeleton: 'Em pesquisa. As interpretações deste artigo, com fontes citadas, estão sendo redigidas e serão publicadas em breve.',
      kicker_chapter: '{book} · Capítulo {n} · {roman}', kicker_theme: '{book} · Artigo Temático',
      back_chapters: '← Capítulos de {book}', back_themes: '← Temáticos de {book}',
      based_on: 'Baseado em', nav_index: 'Índice',
      nav_prev: '← Capítulo {n}', nav_next: 'Capítulo {n} →',
      th_trad: 'Tradição', th_family: 'Família', th_method: 'Método', th_stance: 'Postura-chave',
      search_eyebrow: 'Pesquisa', search_title: 'Buscar na enciclopédia',
      search_count: '{n} resultado(s)', search_for: 'para “{q}”', search_none: 'Nada encontrado. Tente outros termos ou navegue pelos capítulos.',
      search_tag: 'Tag:', rtype_theme: 'Temático',
      content_note: '',
      about_eyebrow: 'Sobre o projeto', about_title: 'As Escrituras, lidas por muitas vozes',
      about_lead: 'Esta enciclopédia reúne, capítulo a capítulo, como diferentes tradições cristãs e movimentos religiosos interpretam as profecias bíblicas. O objetivo é informativo e comparativo: apresentar cada leitura com fidelidade e indicar as fontes, sem tomar partido.',
      about_methods_h: 'Os métodos hermenêuticos',
      about_methods_p: 'Grandes “lentes” historicamente usadas para ler as profecias — incluindo o dispensacionalismo, uma variante futurista moderna muito influente. Elas também são os eixos usados na tabela comparativa.',
      about_trads_h: 'Tradições cobertas', about_trads_p: 'Denominações, igrejas e movimentos cujas leituras aparecem nos artigos.',
      about_read_h: 'Como ler cada artigo', about_read_p: 'Cada capítulo oferece duas formas de explorar os dados:',
      about_read_li1: 'Cards por tradição — clique para expandir e ler a interpretação com suas fontes; filtre pelos métodos hermenêuticos.',
      about_read_li2: 'Tabela comparativa — veja, de relance, o método e a postura-chave de cada tradição; ordene as colunas.',
      about_print_p: 'Todo artigo traz um botão Imprimir / Salvar PDF que gera uma versão limpa e impressa do estudo.',
      about_notice: 'As interpretações sintetizam fontes de cada tradição (documentos eclesiais, comentários e publicações oficiais ou representativas), citadas em cada card. Tradições internamente plurais são apresentadas em suas posições mais difundidas, sem pretender esgotá-las.'
    },
    en: {
      lang_name: 'English',
      nav_inicio: 'Home', nav_livros: 'Books', nav_sobre: 'About',
      hero_subtitle: 'The prophetic Scriptures — Revelation, Daniel and more — read by over fifteen traditions, chapter by chapter.',
      search_ph: 'Search chapters, topics or traditions…', search_btn: 'Search',
      books_eyebrow: 'Choose a book', books_title: 'Books of the Bible',
      books_desc: 'Each book has its chapters analyzed side by side by more than fifteen traditions, with cited sources.',
      tags_eyebrow: 'Browse by topic', tags_title: 'Tag cloud',
      tags_desc: 'Click a topic to find all related articles, from any book.',
      footer_line: 'Profecias — a comparative encyclopedia of the interpretations of biblical prophecy.',
      footer_fine: 'Informative and comparative content. The sources of each interpretation are cited in each article.',
      n_chapters: '{n} chapters',
      grid_eyebrow: 'The whole book', grid_head: '{book} — {n} chapters',
      grid_desc: 'Choose a number to open the comparative article for that chapter.',
      grid_themes_btn: 'Thematic articles of {book}',
      themes_eyebrow: 'Major themes', themes_head: 'Themes of {book}',
      themes_desc: 'Studies that span several chapters, with the same comparison by tradition.',
      themes_empty: 'There are no thematic articles for {book} yet.',
      article_print: 'Print / Save PDF', article_sources: 'Sources',
      article_cards_title: 'Interpretations by tradition', article_table_title: 'Comparative table',
      article_table_hint: 'Click the column headers to sort.',
      tab_cards: 'Cards', tab_table: 'Table',
      intro_eyebrow: 'The landscape of interpretations',
      adventist_title: 'In focus: the Seventh-day Adventist reading',
      skeleton: 'In research. The interpretations for this article, with cited sources, are being written and will be published soon.',
      kicker_chapter: '{book} · Chapter {n} · {roman}', kicker_theme: '{book} · Thematic Article',
      back_chapters: '← Chapters of {book}', back_themes: '← Themes of {book}',
      based_on: 'Based on', nav_index: 'Index',
      nav_prev: '← Chapter {n}', nav_next: 'Chapter {n} →',
      th_trad: 'Tradition', th_family: 'Family', th_method: 'Method', th_stance: 'Key stance',
      search_eyebrow: 'Search', search_title: 'Search the encyclopedia',
      search_count: '{n} result(s)', search_for: 'for “{q}”', search_none: 'Nothing found. Try other terms or browse the chapters.',
      search_tag: 'Tag:', rtype_theme: 'Thematic',
      content_note: 'Note: the article text below is currently shown in Portuguese — the translation is in progress.',
      about_eyebrow: 'About the project', about_title: 'The Scriptures, read by many voices',
      about_lead: 'This encyclopedia gathers, chapter by chapter, how different Christian traditions and religious movements interpret the biblical prophecies. The aim is informative and comparative: to present each reading faithfully and cite the sources, without taking sides.',
      about_methods_h: 'The hermeneutical methods',
      about_methods_p: 'Major “lenses” historically used to read prophecy — including dispensationalism, a very influential modern futurist variant. They are also the axes used in the comparative table.',
      about_trads_h: 'Traditions covered', about_trads_p: 'Denominations, churches and movements whose readings appear in the articles.',
      about_read_h: 'How to read each article', about_read_p: 'Each chapter offers two ways to explore the data:',
      about_read_li1: 'Cards by tradition — click to expand and read the interpretation with its sources; filter by hermeneutical method.',
      about_read_li2: 'Comparative table — see at a glance each tradition’s method and key stance; sort the columns.',
      about_print_p: 'Every article has a Print / Save PDF button that produces a clean, printable version of the study.',
      about_notice: 'The interpretations summarize sources from each tradition (church documents, commentaries and official or representative publications), cited in each card. Internally diverse traditions are presented in their most widespread positions, without claiming to be exhaustive.'
    },
    es: {
      lang_name: 'Español',
      nav_inicio: 'Inicio', nav_livros: 'Libros', nav_sobre: 'Acerca de',
      hero_subtitle: 'Las Escrituras proféticas — Apocalipsis, Daniel y más — leídas por más de quince tradiciones, capítulo a capítulo.',
      search_ph: 'Buscar capítulos, temas o tradiciones…', search_btn: 'Buscar',
      books_eyebrow: 'Elige un libro', books_title: 'Libros de la Biblia',
      books_desc: 'Cada libro tiene sus capítulos analizados lado a lado por más de quince tradiciones, con fuentes citadas.',
      tags_eyebrow: 'Navega por tema', tags_title: 'Nube de etiquetas',
      tags_desc: 'Haz clic en un tema para encontrar todos los artículos relacionados, de cualquier libro.',
      footer_line: 'Profecias — enciclopedia comparada de las interpretaciones de las profecías bíblicas.',
      footer_fine: 'Contenido de carácter informativo y comparativo. Las fuentes de cada interpretación se citan en cada artículo.',
      n_chapters: '{n} capítulos',
      grid_eyebrow: 'El libro completo', grid_head: '{book} — {n} capítulos',
      grid_desc: 'Elige un número para abrir el artículo comparativo de ese capítulo.',
      grid_themes_btn: 'Artículos temáticos de {book}',
      themes_eyebrow: 'Grandes temas', themes_head: 'Temáticos de {book}',
      themes_desc: 'Estudios que cruzan varios capítulos, con el mismo análisis comparado por tradición.',
      themes_empty: 'Todavía no hay artículos temáticos para {book}.',
      article_print: 'Imprimir / Guardar PDF', article_sources: 'Fuentes',
      article_cards_title: 'Interpretaciones por tradición', article_table_title: 'Tabla comparativa',
      article_table_hint: 'Haz clic en los títulos de las columnas para ordenar.',
      tab_cards: 'Tarjetas', tab_table: 'Tabla',
      intro_eyebrow: 'El panorama de las interpretaciones',
      adventist_title: 'En foco: la lectura adventista del séptimo día',
      skeleton: 'En investigación. Las interpretaciones de este artículo, con fuentes citadas, se están redactando y se publicarán pronto.',
      kicker_chapter: '{book} · Capítulo {n} · {roman}', kicker_theme: '{book} · Artículo Temático',
      back_chapters: '← Capítulos de {book}', back_themes: '← Temáticos de {book}',
      based_on: 'Basado en', nav_index: 'Índice',
      nav_prev: '← Capítulo {n}', nav_next: 'Capítulo {n} →',
      th_trad: 'Tradición', th_family: 'Familia', th_method: 'Método', th_stance: 'Postura clave',
      search_eyebrow: 'Búsqueda', search_title: 'Buscar en la enciclopedia',
      search_count: '{n} resultado(s)', search_for: 'para «{q}»', search_none: 'No se encontró nada. Prueba otros términos o explora los capítulos.',
      search_tag: 'Etiqueta:', rtype_theme: 'Temático',
      content_note: 'Nota: el texto del artículo a continuación se muestra por ahora en portugués — la traducción está en curso.',
      about_eyebrow: 'Acerca del proyecto', about_title: 'Las Escrituras, leídas por muchas voces',
      about_lead: 'Esta enciclopedia reúne, capítulo a capítulo, cómo distintas tradiciones cristianas y movimientos religiosos interpretan las profecías bíblicas. El objetivo es informativo y comparativo: presentar cada lectura con fidelidad e indicar las fuentes, sin tomar partido.',
      about_methods_h: 'Los métodos hermenéuticos',
      about_methods_p: 'Grandes “lentes” usadas históricamente para leer las profecías — incluido el dispensacionalismo, una variante futurista moderna muy influyente. También son los ejes de la tabla comparativa.',
      about_trads_h: 'Tradiciones cubiertas', about_trads_p: 'Denominaciones, iglesias y movimientos cuyas lecturas aparecen en los artículos.',
      about_read_h: 'Cómo leer cada artículo', about_read_p: 'Cada capítulo ofrece dos formas de explorar los datos:',
      about_read_li1: 'Tarjetas por tradición — haz clic para expandir y leer la interpretación con sus fuentes; filtra por método hermenéutico.',
      about_read_li2: 'Tabla comparativa — ve de un vistazo el método y la postura clave de cada tradición; ordena las columnas.',
      about_print_p: 'Cada artículo tiene un botón Imprimir / Guardar PDF que genera una versión limpia e imprimible del estudio.',
      about_notice: 'Las interpretaciones resumen fuentes de cada tradición (documentos eclesiales, comentarios y publicaciones oficiales o representativas), citadas en cada tarjeta. Las tradiciones internamente plurales se presentan en sus posiciones más difundidas, sin pretender agotarlas.'
    },
    ja: {
      lang_name: '日本語',
      nav_inicio: 'ホーム', nav_livros: '書物', nav_sobre: '概要',
      hero_subtitle: '預言の書 — ヨハネの黙示録、ダニエル書など — を十五以上の伝統が章ごとに読み解きます。',
      search_ph: '章・テーマ・伝統を検索…', search_btn: '検索',
      books_eyebrow: '書物を選ぶ', books_title: '聖書の書物',
      books_desc: '各書物の章を、十五以上の伝統が出典付きで並べて分析します。',
      tags_eyebrow: 'テーマで探す', tags_title: 'タグクラウド',
      tags_desc: 'テーマをクリックすると、すべての書物の関連記事が見つかります。',
      footer_line: 'Profecias — 聖書の預言の解釈を比較する百科事典。',
      footer_fine: '情報提供および比較を目的とした内容です。各解釈の出典は各記事に明記されています。',
      n_chapters: '全{n}章',
      grid_eyebrow: '書物全体', grid_head: '{book} — 全{n}章',
      grid_desc: '番号を選ぶと、その章の比較記事が開きます。',
      grid_themes_btn: '「{book}」のテーマ別記事',
      themes_eyebrow: '主要テーマ', themes_head: '「{book}」のテーマ',
      themes_desc: '複数の章にまたがる研究を、同じ伝統別の比較で扱います。',
      themes_empty: '「{book}」のテーマ別記事はまだありません。',
      article_print: '印刷 / PDF保存', article_sources: '出典',
      article_cards_title: '伝統別の解釈', article_table_title: '比較表',
      article_table_hint: '列の見出しをクリックすると並び替えできます。',
      tab_cards: 'カード', tab_table: '表',
      intro_eyebrow: '解釈の全体像',
      adventist_title: '注目:セブンスデー・アドベンチストの解釈',
      skeleton: '調査中です。出典付きの解釈を執筆中で、まもなく公開されます。',
      kicker_chapter: '{book}・第{n}章・{roman}', kicker_theme: '{book}・テーマ別記事',
      back_chapters: '← 「{book}」の章へ', back_themes: '← 「{book}」のテーマへ',
      based_on: '対象の章:', nav_index: '目次',
      nav_prev: '← 第{n}章', nav_next: '第{n}章 →',
      th_trad: '伝統', th_family: '区分', th_method: '方法', th_stance: '要点',
      search_eyebrow: '検索', search_title: '百科事典を検索',
      search_count: '{n}件の結果', search_for: '「{q}」', search_none: '見つかりませんでした。別のキーワードを試すか、章を閲覧してください。',
      search_tag: 'タグ:', rtype_theme: 'テーマ',
      content_note: '注:以下の記事本文は現在ポルトガル語で表示されます。翻訳は進行中です。',
      about_eyebrow: 'プロジェクトについて', about_title: '多くの声が読む聖書',
      about_lead: 'この百科事典は、さまざまなキリスト教の伝統や宗教運動が聖書の預言をどう解釈するかを章ごとにまとめます。目的は情報提供と比較です。各解釈を忠実に紹介し、出典を示し、立場を取りません。',
      about_methods_h: '解釈の方法',
      about_methods_p: '預言を読むために歴史的に用いられてきた主要な「視点」 — 影響力の大きい現代の未来主義の一派、ディスペンセーション主義を含みます。比較表の軸でもあります。',
      about_trads_h: '扱う伝統', about_trads_p: '記事に解釈が登場する教派・教会・運動。',
      about_read_h: '各記事の読み方', about_read_p: '各章には、データを見る二つの方法があります:',
      about_read_li1: '伝統別カード — クリックして展開し、出典付きの解釈を読む。方法で絞り込めます。',
      about_read_li2: '比較表 — 各伝統の方法と要点をひと目で確認。列を並び替えられます。',
      about_print_p: '各記事には「印刷 / PDF保存」ボタンがあり、整った印刷用の版を作成します。',
      about_notice: '各解釈は、各伝統の出典(教会文書、注解、公式または代表的な出版物)を要約し、各カードに明記します。内部的に多様な伝統については、最も広く見られる立場を紹介し、網羅を意図しません。'
    }
  };

  // Nomes e blurbs dos livros, localizados
  var BOOKS = {
    apocalipse: {
      name: { pt: 'Apocalipse', en: 'Revelation', es: 'Apocalipsis', ja: 'ヨハネの黙示録' },
      blurb: {
        pt: 'As visões de João — o Cordeiro, os selos, as bestas e a Nova Jerusalém — lidas por mais de quinze tradições.',
        en: 'John’s visions — the Lamb, the seals, the beasts and the New Jerusalem — read by more than fifteen traditions.',
        es: 'Las visiones de Juan — el Cordero, los sellos, las bestias y la Nueva Jerusalén — leídas por más de quince tradiciones.',
        ja: 'ヨハネの幻 — 子羊、封印、獣、新しいエルサレム — を十五以上の伝統が読み解きます。'
      }
    },
    daniel: {
      name: { pt: 'Daniel', en: 'Daniel', es: 'Daniel', ja: 'ダニエル書' },
      blurb: {
        pt: 'Sonhos, reinos e profecias — a estátua, as quatro bestas, as setenta semanas — comparados entre as tradições.',
        en: 'Dreams, kingdoms and prophecies — the statue, the four beasts, the seventy weeks — compared across traditions.',
        es: 'Sueños, reinos y profecías — la estatua, las cuatro bestias, las setenta semanas — comparados entre las tradiciones.',
        ja: '夢、諸国、預言 — 像、四つの獣、七十週 — を諸伝統の間で比較します。'
      }
    }
  };

  var LANGS = [
    { code: 'pt', flag: '🇧🇷', label: 'Português (Brasil)' },
    { code: 'en', flag: '🇺🇸', label: 'English (US)' },
    { code: 'es', flag: '🇪🇸', label: 'Español' },
    { code: 'ja', flag: '🇯🇵', label: '日本語' }
  ];

  var SUPPORTED = ['pt', 'en', 'es', 'ja'];

  function detectLang() {
    var fromUrl = (new RegExp('[?&]lang=([^&]*)').exec(location.search) || [])[1];
    if (fromUrl && SUPPORTED.indexOf(fromUrl) >= 0) { try { localStorage.setItem('profecias_lang', fromUrl); } catch (e) {} return fromUrl; }
    var saved; try { saved = localStorage.getItem('profecias_lang'); } catch (e) {}
    if (saved && SUPPORTED.indexOf(saved) >= 0) return saved;
    return 'pt';
  }

  APOC.langs = LANGS;
  APOC.lang = detectLang();

  APOC.t = function (key, params) {
    var dict = STR[APOC.lang] || STR.pt;
    var s = (key in dict) ? dict[key] : (STR.pt[key] != null ? STR.pt[key] : key);
    if (params) Object.keys(params).forEach(function (k) { s = s.replace(new RegExp('\\{' + k + '\\}', 'g'), params[k]); });
    return s;
  };

  APOC.bookName = function (slug) {
    var b = BOOKS[slug]; return (b && (b.name[APOC.lang] || b.name.pt)) || slug;
  };
  APOC.bookBlurb = function (slug) {
    var b = BOOKS[slug]; return (b && (b.blurb[APOC.lang] || b.blurb.pt)) || '';
  };

  APOC.setLang = function (l) {
    if (SUPPORTED.indexOf(l) < 0) return;
    try { localStorage.setItem('profecias_lang', l); } catch (e) {}
    // remove ?lang= da URL para não fixar e recarrega mantendo cap/livro/slug/tag/q
    var url = location.href.replace(/([?&])lang=[^&]*(&|$)/, function (m, p1, p2) { return p2 ? p1 : ''; }).replace(/[?&]$/, '');
    location.href = url;
  };
})();
