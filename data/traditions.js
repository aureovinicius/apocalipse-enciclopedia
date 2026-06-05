/* Tradições / escolas cobertas pela enciclopédia.
   `scores`: tendência (0–5) de cada tradição em relação a cada eixo hermenêutico
   (preterista, historicista, futurista, idealista, dispensacionalista).
   Usado pela tabela comparativa global. */
(function () {
  window.APOC = window.APOC || {};
  window.APOC.traditions = [
    { id: 'catolica', name: 'Católica Romana', color: '#c8a24a', family: 'Denominação',
      blurb: 'Magistério, amilenismo agostiniano, leitura largamente simbólica e cristocêntrica.',
      scores: { preterista: 2, historicista: 2, futurista: 1, idealista: 4, dispensacionalista: 0 } },

    { id: 'ortodoxa', name: 'Ortodoxa Oriental', color: '#b08d57', family: 'Denominação',
      blurb: 'Leitura litúrgica e espiritual; cautela histórica com o livro; ênfase na vitória de Cristo.',
      scores: { preterista: 1, historicista: 1, futurista: 1, idealista: 5, dispensacionalista: 0 } },

    { id: 'luterana', name: 'Luterana', color: '#9c2b2b', family: 'Denominação',
      blurb: 'Tradição historicista clássica (papado como anticristo em Lutero), hoje plural.',
      scores: { preterista: 1, historicista: 3, futurista: 1, idealista: 3, dispensacionalista: 0 } },

    { id: 'reformada', name: 'Calvinista / Reformada', color: '#7b2230', family: 'Denominação',
      blurb: 'Amilenismo e pós-milenismo; preterismo parcial frequente; forte ênfase simbólica.',
      scores: { preterista: 3, historicista: 2, futurista: 1, idealista: 4, dispensacionalista: 0 } },

    { id: 'metodista', name: 'Metodista', color: '#a85a3a', family: 'Denominação',
      blurb: 'Herança wesleyana; leitura devocional e moral; pluralidade escatológica.',
      scores: { preterista: 1, historicista: 2, futurista: 2, idealista: 3, dispensacionalista: 1 } },

    { id: 'evangelica', name: 'Protestante Evangélica', color: '#c2703d', family: 'Denominação',
      blurb: 'Amplo espectro evangélico; predomínio futurista popular e pré-milenista.',
      scores: { preterista: 1, historicista: 1, futurista: 4, idealista: 2, dispensacionalista: 2 } },

    { id: 'pentecostal', name: 'Pentecostal', color: '#d98c00', family: 'Denominação',
      blurb: 'Pré-milenismo, arrebatamento e ênfase no Espírito e na iminência da Vinda.',
      scores: { preterista: 0, historicista: 1, futurista: 5, idealista: 1, dispensacionalista: 3 } },

    { id: 'adventista', name: 'Adventista do Sétimo Dia', color: '#2e6b5e', family: 'Denominação',
      blurb: 'Historicismo clássico; juízo investigativo; centralidade do sábado e do remanescente.',
      scores: { preterista: 0, historicista: 5, futurista: 2, idealista: 1, dispensacionalista: 0 } },

    { id: 'testemunhas', name: 'Testemunhas de Jeová', color: '#4a6fa5', family: 'Denominação',
      blurb: 'Cronologia própria (1914), reino de Jeová, 144 mil e grande multidão.',
      scores: { preterista: 0, historicista: 3, futurista: 3, idealista: 1, dispensacionalista: 0 } },

    { id: 'sud', name: 'SUD / Mórmon', color: '#3f7fa0', family: 'Denominação',
      blurb: 'Restauração dos últimos dias; leitura literal-futurista e revelação moderna.',
      scores: { preterista: 0, historicista: 1, futurista: 4, idealista: 1, dispensacionalista: 1 } },

    { id: 'espirita', name: 'Espírita (Kardecista)', color: '#6a8caf', family: 'Movimento',
      blurb: 'Leitura moral e alegórica; evolução do espírito; rejeição do juízo eterno literal.',
      scores: { preterista: 1, historicista: 1, futurista: 1, idealista: 5, dispensacionalista: 0 } },

    /* Escolas hermenêuticas como "tradições" próprias (úteis na comparação) */
    { id: 'esc-preterista', name: 'Escola Preterista', color: '#8a9a5b', family: 'Escola',
      blurb: 'Cumprimento no primeiro século; Roma/Nero e a queda de Jerusalém.',
      scores: { preterista: 5, historicista: 1, futurista: 0, idealista: 1, dispensacionalista: 0 } },

    { id: 'esc-historicista', name: 'Escola Historicista', color: '#c08552', family: 'Escola',
      blurb: 'Profecia contínua da história da Igreja até o fim.',
      scores: { preterista: 1, historicista: 5, futurista: 1, idealista: 1, dispensacionalista: 0 } },

    { id: 'esc-futurista', name: 'Escola Futurista', color: '#9c2b2b', family: 'Escola',
      blurb: 'Visões a partir de Ap 4 ainda por cumprir, ligadas à Segunda Vinda.',
      scores: { preterista: 0, historicista: 1, futurista: 5, idealista: 1, dispensacionalista: 2 } },

    { id: 'esc-idealista', name: 'Escola Idealista', color: '#5b7b8a', family: 'Escola',
      blurb: 'Símbolo atemporal do conflito entre o bem e o mal.',
      scores: { preterista: 1, historicista: 1, futurista: 1, idealista: 5, dispensacionalista: 0 } },

    { id: 'esc-dispensacionalista', name: 'Escola Dispensacionalista', color: '#9a6a8a', family: 'Escola',
      blurb: 'Israel/Igreja distintos; arrebatamento, tribulação de sete anos, milênio literal.',
      scores: { preterista: 0, historicista: 0, futurista: 4, idealista: 0, dispensacionalista: 5 } }
  ];

  window.APOC.traditionById = function (id) {
    return (window.APOC.traditions || []).filter(function (t) { return t.id === id; })[0] || null;
  };
})();
