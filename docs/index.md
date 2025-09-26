---
title: Quantika AI Language
layout: default
---

<!-- Theme + Accent selector -->
<style>
:root {
  --bg: #0A0014; --fg: #E0E0FF; --muted:#BFC3FF;
  --accent: #9A4DFF;   /* morado */
  --accent2: #00E5FF;  /* cian */
  --ok:#00FF88;        /* verde */
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
  background: linear-gradient(90deg, var(--accent), var(--accent2));
  color:#0A0014; text-decoration:none; font-weight:800; letter-spacing:.2px;
  border:1px solid rgba(224,224,255,.35);
  box-shadow:0 8px 24px rgba(0,0,0,.25);
}
.card {
  border: 1px solid var(--border); border-radius: 14px; padding: 12px;
  background: var(--card);
}
.topbar { display:flex; align-items:center; justify-content:space-between; gap:12px; flex-wrap:wrap; }
.controls { display:flex; gap:10px; align-items:center; }
select, button {
  background: var(--card); color: var(--fg); border:1px solid var(--border);
  border-radius: 10px; padding:6px 10px; cursor:pointer;
}
.badge { display:inline-block; padding:6px 10px; border-radius:999px;
  background: rgba(0,229,255,.15); border:1px solid rgba(0,229,255,.35); font-size:12px;
}
</style>

<div class="topbar">
  <h1>🌌 Quantika — Lenguaje con IA educativa</h1>
  <div class="controls">
    <button id="themeToggle">🌙 Dark</button>
    <label for="accentSel">🎨 Acento:</label>
    <select id="accentSel">
      <option value="quantika">Quantika (morado + cian)</option>
      <option value="neon-green">Neón verde</option>
      <option value="sunset">Sunset (rosa + naranja)</option>
      <option value="ice">Hielo (azules)</option>
    </select>
  </div>
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
// Theme + accent with localStorage
(function(){
  const THEME_KEY = "quantika.theme";
  const ACCENT_KEY = "quantika.accent";
  const root = document.documentElement;
  const btn = document.getElementById("themeToggle");
  const sel = document.getElementById("accentSel");

  function applyTheme(theme){
    if (theme === "light") { root.setAttribute("data-theme", "light"); btn.textContent = "🌞 Light"; }
    else { root.removeAttribute("data-theme"); btn.textContent = "🌙 Dark"; }
  }
  function applyAccent(mode){
    // default (Quantika): morado + cian
    let a1 = "#9A4DFF", a2 = "#00E5FF", ok = "#00FF88";
    if (mode === "neon-green") { a1 = "#00FF88"; a2 = "#00E5FF"; ok = "#9A4DFF"; }
    if (mode === "sunset")     { a1 = "#FF6EA8"; a2 = "#FF9E44"; ok = "#00E5FF"; }
    if (mode === "ice")        { a1 = "#9AD0FF"; a2 = "#4BC0FF"; ok = "#00FFCC"; }
    root.style.setProperty("--accent", a1);
    root.style.setProperty("--accent2", a2);
    root.style.setProperty("--ok", ok);
  }

  const savedTheme = localStorage.getItem(THEME_KEY) || "dark";
  const savedAccent = localStorage.getItem(ACCENT_KEY) || "quantika";
  applyTheme(savedTheme); applyAccent(savedAccent); sel.value = savedAccent;

  btn.addEventListener("click", () => {
    const next = (root.getAttribute("data-theme") === "light") ? "dark" : "light";
    localStorage.setItem(THEME_KEY, next); applyTheme(next);
  });
  sel.addEventListener("change", () => {
    localStorage.setItem(ACCENT_KEY, sel.value); applyAccent(sel.value);
  });
})();
</script>
