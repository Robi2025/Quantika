---
title: Quantika AI Language
layout: default
---

<!-- Theme toggle styles -->
<style>
:root {
  --bg: #0A0014; --fg: #E0E0FF; --muted:#BFC3FF;
  --accent: #9A4DFF; --accent2: #00E5FF; --ok:#00FF88;
  --card: rgba(255,255,255,0.04); --border: rgba(154,77,255,.35);
}
:root[data-theme="light"] {
  --bg: #F8F8FF; --fg: #181826; --muted:#3a3a55;
  --card: #ffffff; --border: rgba(25,25,45,.2);
}

html, body { background: var(--bg); color: var(--fg); }
h1, h2, h3 { font-family: 'Arial', sans-serif; letter-spacing: .3px; }
p, a, li, code, pre, small { color: var(--fg); }
.btn {
  display:inline-block; padding:10px 16px; border-radius:12px;
  background: linear-gradient(90deg, rgba(154,77,255,.95), rgba(0,229,255,.95));
  color:#0A0014; text-decoration:none; font-weight:800; letter-spacing:.2px;
  border:1px solid rgba(224,224,255,.35);
  box-shadow:0 8px 24px rgba(0,0,0,.25);
}
.card {
  border: 1px solid var(--border); border-radius: 14px; padding: 12px;
  background: var(--card);
}
.badge { display:inline-block; padding:6px 10px; border-radius:999px;
  background: rgba(0,229,255,.15); border:1px solid rgba(0,229,255,.35); font-size:12px;
}
.topbar { display:flex; align-items:center; justify-content:space-between; gap:12px; }
.toggle {
  cursor:pointer; border:1px solid var(--border); border-radius: 999px; padding:6px 10px;
  background: var(--card);
}
</style>

<div class="topbar">
  <h1>🌌 Quantika — Lenguaje con IA educativa</h1>
  <button id="themeToggle" class="toggle">🌙 Dark</button>
</div>

<p style="margin:12px 0 18px">
  <a href="./playground.html" class="btn">⚡ Abrir Playground (100% Browser)</a>
</p>

<div class="card">
  <h3><span class="badge">demo</span> Demo (video incrustado)</h3>
  <video width="720" controls>
    <source src="assets/quantika-demo.mp4" type="video/mp4">
    Tu navegador no soporta el tag de video.
  </video>
  <div style="margin-top:12px">
    <a class="btn" href="assets/quantika-demo.mp4" download>⬇️ Descargar demo (MP4)</a>
  </div>
</div>

<hr/>

<div class="card">
  <h3>🎨 Kit visual</h3>
  <div style="display:flex; gap:12px; align-items:center; flex-wrap:wrap">
    <img src="assets/quantika-logo.gif" alt="logo animado" style="max-height:56px; border-radius:8px; border:1px solid var(--border)">
    <img src="assets/palette.png" alt="paleta de colores" style="max-height:56px; border-radius:8px; border:1px solid var(--border)">
  </div>
</div>

<hr/>

<div class="card">
<h3>🧪 Ejemplo</h3>
<pre><code>print "Hola Quantika!"
let nombre = "Viviana"
print "Bienvenida, {nombre}"</code></pre>
</div>

<script>
// Theme toggle with localStorage
(function(){
  const KEY = "quantika.theme";
  const root = document.documentElement;
  function apply(theme){
    if (theme === "light") {
      root.setAttribute("data-theme", "light");
      document.getElementById("themeToggle").textContent = "🌞 Light";
    } else {
      root.removeAttribute("data-theme");
      document.getElementById("themeToggle").textContent = "🌙 Dark";
    }
  }
  const saved = localStorage.getItem(KEY) || "dark";
  apply(saved);
  document.getElementById("themeToggle").addEventListener("click", () => {
    const next = (root.getAttribute("data-theme") === "light") ? "dark" : "light";
    localStorage.setItem(KEY, next);
    apply(next);
  });
})();
</script>
