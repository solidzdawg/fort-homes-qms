// charts.js — lightweight initialization for the interactive dashboard
(() => {
  // Default/sample data — build will optionally replace this with manifest-driven values
  let classification = {
    labels: ['SOP', 'WI', 'FORM', 'MANUAL'],
    values: [10, 20, 5, 1]
  };

  // Try to read a build-time manifest if available (manifest.json in dist or HTML root)
  (async () => {
    try {
      // Candidate manifest locations relative to the served asset
      const candidates = ['./manifest.json', '../manifest.json', '/manifest.json'];
      for (const c of candidates) {
        try {
          const r = await fetch(c, { cache: 'no-store' });
          if (!r.ok) continue;
          const m = await r.json();
          if (m && m.counts) {
            classification = {
              labels: ['SOP', 'WI', 'FORM', 'MANUAL'],
              values: [
                m.counts.sops || 0,
                m.counts.wis || 0,
                m.counts.forms || 0,
                m.counts.manuals || 0
              ]
            };
            // Set KPI
            document.getElementById('kpi-doccount').textContent =
              classification.values.reduce((a, b) => a + b, 0);
            break;
          }
        } catch (err) {
          // try next candidate
        }
      }
    } catch (err) {
      // Use defaults if manifest not found
      document.getElementById('kpi-doccount').textContent =
        classification.values.reduce((a, b) => a + b, 0);
    }
    initCharts();
  })();

  function initCharts() {
    const el = document.getElementById('docClassificationChart');
    if (!el) return;
    const ctx = el.getContext('2d');
    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: classification.labels,
        datasets: [{
          data: classification.values,
          backgroundColor: ['#0ea5a4','#4f46e5','#f59e0b','#ef4444'],
          hoverOffset: 6,
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'bottom' },
          tooltip: { callbacks: { label: ctx => `${ctx.label}: ${ctx.formattedValue}` } }
        }
      }
    });
  }

  // Export helper
  window.downloadChart = (canvasId, filename = 'chart.png') => {
    const c = document.getElementById(canvasId);
    if (!c) return;
    const link = document.createElement('a');
    link.download = filename;
    link.href = c.toDataURL('image/png');
    link.click();
  };
})();