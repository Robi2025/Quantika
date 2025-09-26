---
title: Quantika AI Language
layout: default
---

<style>
:root {
  --bg: #0A0014; --fg: #E0E0FF;
  --accent: #9A4DFF; --accent2: #00E5FF; --ok:#00FF88;
  --card: rgba(255,255,255,0.04); --border: rgba(154,77,255,.35);
}
html, body { background: var(--bg); color: var(--fg); }
h1, h2, h3, p, a, li, code, pre, small { color: var(--fg); }
.btn {
  display:inline-block; padding:10px 16px; border-radius:12px;
  background: linear-gradient(90deg, var(--accent), var(--accent2));
  color:#0A0014; text-decoration:none; font-weight:800; letter-spacing:.2px;
  border:1px solid rgba(224,224,255,.35);
  box-shadow:0 8px 24px rgba(0,0,0,.25);
}
.controls { display:flex; gap:10px; align-items:center; flex-wrap:wrap; margin-bottom:12px }
.card { border: 1px solid var(--border); border-radius: 14px; padding: 12px; background: var(--card); margin-bottom:16px }
.badge { display:inline-block; padding:6px 10px; border-radius:999px; background: rgba(0,229,255,.15); border:1px solid rgba(0,229,255,.35); font-size:12px; }

/* Presentation mode */
body.present .hide-when-present { display: none !important; }
body.present .widen { max-width: 96% !important; margin: 0 auto !important; }
body.present video { width: 100% !important; max-height: 78vh; }
body.present .controls { justify-content: space-between; }
.container { max-width: 980px; margin: 0 auto; }
</style>

<div class="container">
  <h1>🌌 Quantika — Lenguaje con IA educativa</h1>

  <div class="controls">
    <a class="btn" href="./playground.html" target="_blank">⚡ Abrir Playground</a>
    <button id="presentBtn" class="btn" style="background:linear-gradient(90deg,#00FF88,#00E5FF)">🎤 Modo Presentación</button>
    <a class="btn hide-when-present" href="assets/quantika-demo.mp4" download>⬇️ Descargar demo</a>
  </div>

  <div class="card widen">
    <h3><span class="badge">demo</span> Video (incrustado)</h3>
    <video controls>
      <source src="assets/quantika-demo.mp4" type="video/mp4">
      Tu navegador no soporta el tag de video.
    </video>
    <p class="hide-when-present" style="margin-top:8px">Sugerencia: usa el video como intro y luego cambia a la pestaña del Playground para el live-coding.</p>
  </div>

  <div class="card hide-when-present">
    <h3>🎨 Kit visual</h3>
    <div style="display:flex; gap:12px; align-items:center; flex-wrap:wrap">
      <img src="assets/quantika-logo.gif" alt="logo animado" style="max-height:56px; border-radius:8px; border:1px solid var(--border)">
      <img src="assets/palette.png" alt="paleta de colores" style="max-height:56px; border-radius:8px; border:1px solid var(--border)">
    </div>
  </div>

  <div class="card hide-when-present">
    <h3>🧪 Ejemplo</h3>
<pre><code>print "Hola Quantika!"
let nombre = "Viviana"
print "Bienvenida, {nombre}"</code></pre>
  </div>
</div>

<script>
// Toggle Presentation Mode (persists in localStorage)
(function(){
  const KEY = "quantika.presentation";
  const btn = document.getElementById("presentBtn");
  function apply(on){
    if(on){
      document.body.classList.add("present");
      btn.textContent = "⤺ Salir de Presentación";
      btn.style.background = "linear-gradient(90deg,#FF6EA8,#FF9E44)";
    } else {
      document.body.classList.remove("present");
      btn.textContent = "🎤 Modo Presentación";
      btn.style.background = "linear-gradient(90deg,#00FF88,#00E5FF)";
    }
  }
  const saved = localStorage.getItem(KEY) === "1";
  apply(saved);
  btn.addEventListener("click", () => {
    const next = !document.body.classList.contains("present");
    localStorage.setItem(KEY, next ? "1" : "0");
    apply(next);
  });
})();
</script>
