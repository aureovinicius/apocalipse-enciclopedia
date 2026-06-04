/* ==========================================================================
   radar.js — gráfico de radar (Chart.js) comparando o perfil hermenêutico
   das tradições. Inclui seletor, salvar PNG e compartilhar via URL.
   APOC.buildRadar(mountEl, traditionIds, { shareKey, toast })
   ========================================================================== */
(function () {
  'use strict';
  var APOC = window.APOC, el = APOC.ui.el;

  function hexToRgba(hex, a) {
    var h = hex.replace('#', '');
    if (h.length === 3) h = h.split('').map(function (c) { return c + c; }).join('');
    var n = parseInt(h, 16);
    return 'rgba(' + ((n >> 16) & 255) + ',' + ((n >> 8) & 255) + ',' + (n & 255) + ',' + a + ')';
  }

  function readShare(key) {
    var m = new RegExp('[#&]r_' + key + '=([^&]*)').exec(location.hash);
    return m ? decodeURIComponent(m[1]).split(',').filter(Boolean) : null;
  }
  function writeShare(key, ids) {
    var others = location.hash.replace(/^#/, '').split('&').filter(function (p) { return p && p.indexOf('r_' + key + '=') !== 0; });
    others.push('r_' + key + '=' + ids.join(','));
    history.replaceState(null, '', '#' + others.join('&'));
  }

  APOC.buildRadar = function (mount, traditionIds, opts) {
    opts = opts || {};
    var key = opts.shareKey || 'global';
    var toast = opts.toast || function (m) { try { console.log(m); } catch (e) {} };

    var methods = APOC.methods;
    var labels = methods.map(function (m) { return m.name; });
    var pool = traditionIds.map(APOC.traditionById).filter(Boolean);

    // remove duplicatas mantendo ordem
    var seen = {}; pool = pool.filter(function (t) { if (seen[t.id]) return false; seen[t.id] = 1; return true; });

    var initial = readShare(key);
    var selected = {};
    if (initial && initial.length) {
      pool.forEach(function (t) { selected[t.id] = initial.indexOf(t.id) >= 0; });
    } else {
      pool.forEach(function (t, i) { selected[t.id] = i < 4; }); // primeiras 4 por padrão
    }

    var layout = el('div', { class: 'radar-layout' });
    var canvasWrap = el('div', { class: 'radar-canvas-wrap', style: 'height:480px' });
    var canvas = el('canvas', { width: 520, height: 520, 'aria-label': 'Gráfico de radar comparando tradições' });
    canvasWrap.appendChild(canvas);

    var controls = el('div', { class: 'radar-controls' });
    controls.appendChild(el('h4', { text: 'Tradições no gráfico' }));

    var picker = el('div', { class: 'radar-picker' });
    pool.forEach(function (t) {
      var cb = el('input', { type: 'checkbox' });
      cb.checked = !!selected[t.id];
      cb.addEventListener('change', function () { selected[t.id] = cb.checked; update(); });
      picker.appendChild(el('label', { class: 'radar-check' }, [
        cb, el('span', { class: 'radar-swatch', style: 'background:' + t.color }), el('span', { text: t.name })
      ]));
    });
    controls.appendChild(picker);

    var selAll = el('button', { class: 'btn', type: 'button', onclick: function () { setAll(true); } }, ['Todas']);
    var selNone = el('button', { class: 'btn', type: 'button', onclick: function () { setAll(false); } }, ['Nenhuma']);
    var savePng = el('button', { class: 'btn btn-gold', type: 'button', onclick: doSave }, [el('span', { html: '&#128190;' }), 'Salvar PNG']);
    var share = el('button', { class: 'btn btn-bordo', type: 'button', onclick: doShare }, [el('span', { html: '&#128279;' }), 'Compartilhar']);
    controls.appendChild(el('div', { class: 'radar-actions' }, [selAll, selNone]));
    controls.appendChild(el('div', { class: 'radar-actions' }, [savePng, share]));

    layout.appendChild(canvasWrap);
    layout.appendChild(controls);
    mount.appendChild(layout);

    function setAll(v) {
      pool.forEach(function (t) { selected[t.id] = v; });
      picker.querySelectorAll('input').forEach(function (cb, i) { cb.checked = v; });
      update();
    }

    function datasets() {
      return pool.filter(function (t) { return selected[t.id]; }).map(function (t) {
        return {
          label: t.name,
          data: methods.map(function (m) { return (t.scores && t.scores[m.id]) || 0; }),
          borderColor: t.color,
          backgroundColor: hexToRgba(t.color, 0.14),
          borderWidth: 2,
          pointBackgroundColor: t.color,
          pointRadius: 3
        };
      });
    }

    var chart = new Chart(canvas.getContext('2d'), {
      type: 'radar',
      data: { labels: labels, datasets: datasets() },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'bottom', labels: { color: '#c9bb9c', font: { family: 'Playfair Display', size: 12 } } },
          tooltip: { callbacks: { label: function (c) { return c.dataset.label + ': ' + c.formattedValue + '/5'; } } }
        },
        scales: {
          r: {
            min: 0, max: 5, ticks: { stepSize: 1, color: '#9a8c70', backdropColor: 'transparent', showLabelBackdrop: false },
            grid: { color: 'rgba(200,162,74,.18)' },
            angleLines: { color: 'rgba(200,162,74,.22)' },
            pointLabels: { color: '#e9ddc4', font: { family: 'Playfair Display', size: 12 } }
          }
        }
      }
    });

    function render() {
      chart.data.datasets = datasets();
      chart.update();
    }
    function update() {
      render();
      var ids = pool.filter(function (t) { return selected[t.id]; }).map(function (t) { return t.id; });
      writeShare(key, ids);
    }

    function doSave() {
      var url = chart.toBase64Image('image/png', 1);
      var a = document.createElement('a');
      a.href = url; a.download = 'apocalipse-radar-' + key + '.png';
      document.body.appendChild(a); a.click(); a.remove();
      toast('Imagem salva.');
    }

    function doShare() {
      var ids = pool.filter(function (t) { return selected[t.id]; }).map(function (t) { return t.id; });
      writeShare(key, ids);
      var link = location.href;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(link).then(function () { toast('Link da comparação copiado!'); }, function () { prompt('Copie o link:', link); });
      } else { prompt('Copie o link:', link); }
    }

    render(); // render inicial sem escrever no histórico/URL
    return chart;
  };
})();
