/* Ícones (emojis) usados junto aos títulos e cards — organizados por livro. */
(function () {
  window.APOC = window.APOC || {};

  // Emoji temático por capítulo, agrupado por livro
  window.APOC.chapterIcons = {
    apocalipse: {
      1: '🕯️', 2: '✉️', 3: '✉️', 4: '👑', 5: '🐑', 6: '🐎', 7: '🛡️', 8: '🎺',
      9: '🦗', 10: '📖', 11: '👬', 12: '☀️', 13: '👹', 14: '🌾', 15: '🎶', 16: '🏺',
      17: '🍷', 18: '🏚️', 19: '💒', 20: '⚖️', 21: '🏙️', 22: '🌳'
    },
    daniel: {
      1: '🥗', 2: '🗿', 3: '🔥', 4: '🌳', 5: '✍️', 6: '🦁',
      7: '🐾', 8: '🐏', 9: '🙏', 10: '🌊', 11: '⚔️', 12: '⏳'
    }
  };

  // Emoji por artigo temático, agrupado por livro (slug do tema)
  window.APOC.themeIcons = {
    apocalipse: {
      'sete-igrejas': '⛪',
      'sete-selos': '📜',
      'besta-sete-cabecas': '🐉'
    },
    daniel: {}
  };

  // Emoji por tradição (global, igual para todos os livros)
  window.APOC.traditionIcons = {
    catolica: '⛪', ortodoxa: '☦️', luterana: '🌹', reformada: '✝️', metodista: '🔥',
    evangelica: '📖', pentecostal: '🕊️', adventista: '📅', testemunhas: '🗼', sud: '🌟',
    espirita: '🔮', 'esc-preterista': '🏛️', 'esc-historicista': '📜', 'esc-futurista': '🔭',
    'esc-idealista': '💡', 'esc-dispensacionalista': '🗂️'
  };

  window.APOC.iconForChapter = function (book, id) {
    var b = window.APOC.chapterIcons[book] || {};
    return b[id] || '📖';
  };
  window.APOC.iconForTheme = function (book, slug) {
    var b = window.APOC.themeIcons[book] || {};
    return b[slug] || '💡';
  };
  window.APOC.iconForTradition = function (id) { return window.APOC.traditionIcons[id] || '✦'; };
})();
