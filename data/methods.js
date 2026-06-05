/* Métodos hermenêuticos — eixos da comparação e valores do filtro.
   Cada interpretação de um artigo aponta para um destes (campo `method`). */
(function () {
  window.APOC = window.APOC || {};
  window.APOC.methods = [
    {
      id: 'preterista',
      name: 'Preterista',
      color: '#8a9a5b',
      desc: 'Lê o Apocalipse como referente, sobretudo, a eventos do primeiro século (Roma/Jerusalém, perseguição de Nero ou queda de Jerusalém em 70 d.C.).'
    },
    {
      id: 'historicista',
      name: 'Historicista',
      color: '#c08552',
      desc: 'Vê no livro um panorama profético contínuo da história da Igreja, do primeiro século até o fim dos tempos.'
    },
    {
      id: 'futurista',
      name: 'Futurista',
      color: '#7b2230',
      desc: 'Situa a maior parte das visões (especialmente a partir de Ap 4) em eventos ainda futuros, ligados à Segunda Vinda.'
    },
    {
      id: 'idealista',
      name: 'Idealista / Espiritual',
      color: '#5b7b8a',
      desc: 'Entende o Apocalipse como retrato simbólico e atemporal do conflito entre o bem e o mal, sem cronologia histórica fixa.'
    },
    {
      id: 'dispensacionalista',
      name: 'Dispensacionalista',
      color: '#9a6a8a',
      desc: 'Variante futurista que distingue Israel e Igreja, com arrebatamento, Grande Tribulação de sete anos e milênio literal.'
    }
  ];

  window.APOC.methodById = function (id) {
    return (window.APOC.methods || []).filter(function (m) { return m.id === id; })[0] || null;
  };
})();
