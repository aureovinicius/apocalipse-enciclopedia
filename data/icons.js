/* Ícones (emojis) usados junto aos títulos e cards.
   Centralizados para reuso em capítulos, temáticos, artigos e tradições. */
(function () {
  window.APOC = window.APOC || {};

  // Um emoji temático por capítulo (1..22)
  window.APOC.chapterIcons = {
    1: '🕯️', 2: '✉️', 3: '✉️', 4: '👑', 5: '🐑', 6: '🐎', 7: '🛡️', 8: '🎺',
    9: '🦗', 10: '📖', 11: '👬', 12: '☀️', 13: '👹', 14: '🌾', 15: '🎶', 16: '🏺',
    17: '🍷', 18: '🏚️', 19: '💒', 20: '⚖️', 21: '🏙️', 22: '🌳'
  };

  // Um emoji por artigo temático (por slug)
  window.APOC.themeIcons = {
    'sete-igrejas': '⛪',
    'sete-selos': '📜',
    'besta-sete-cabecas': '🐉'
  };

  // Um emoji por tradição (por id)
  window.APOC.traditionIcons = {
    catolica: '⛪',
    ortodoxa: '☦️',
    luterana: '🌹',
    reformada: '✝️',
    metodista: '🔥',
    evangelica: '📖',
    pentecostal: '🕊️',
    adventista: '📅',
    testemunhas: '🗼',
    sud: '🌟',
    espirita: '🔮',
    'esc-preterista': '🏛️',
    'esc-historicista': '📜',
    'esc-futurista': '🔭',
    'esc-idealista': '💡',
    'esc-dispensacionalista': '🗂️'
  };

  window.APOC.iconForChapter = function (id) { return window.APOC.chapterIcons[id] || '📖'; };
  window.APOC.iconForTheme = function (slug) { return window.APOC.themeIcons[slug] || '💡'; };
  window.APOC.iconForTradition = function (id) { return window.APOC.traditionIcons[id] || '✦'; };
})();
