---
title: Quantika — Tron Ares (Playground + Demos)
layout: default
---

<link href="./tron.css" rel="stylesheet">

<style>
/* Light/Dark + Accent selector integrated */
:root {
  --bg: #05060d; --fg: #E6F7FF; --muted:#8ad7ff;
  --accent:#00E5FF; --accent2:#00FF88; --ok:#00FF88;
}
:root[data-theme="light"] {
  --bg:#F8F8FF; --fg:#181826; --muted:#3a3a55;
}
.togglebar { display:flex; gap:10px; align-items:center; justify-content:flex-end; margin:8px 0 14px; flex-wrap:wrap }
select, button {
  background: rgba(255,255,255,.06); color: var(--fg); border:1px solid rgba(0,229,255,.35);
  border-radius: 10px; padding:6px 10px; cursor:pointer;
}
.hide-when-present { }
body.present .hide-when-present { display:none !important; }
body.present .hero video { width: 100% !important; max-height: 78vh; }
</style>

<div class="togglebar">
  <button id="themeToggle">🌙 Dark</button>
  <label for="accentSel">🎨 Acento:</label>
  <select id="accentSel">
    <option value="tron">Tron (cian + verde)</option>
    <option value="quantika">Quantika (morado + cian)</option>
    <option value="sunset">Sunset (rosa + naranja)</option>
    <option value="ice">Hielo (azules)</option>
  </select>
  <button id="presentBtn">🎤 Modo Presentación</button>
</div>

<div class="tron-hero hero">
  <img src="./assets/tron-banner.svg" alt="Tron Ares Banner" style="width:100%; border-radius:12px">
  <p style="margin:10px 0">
    <a class="tron-btn" href="./playground.html">⚡ Abrir Playground</a>
    <a class="tron-btn" href="assets/quantika-demo.mp4" download style="margin-left:8px">⬇ Descargar Demo (MP4)</a>
  </p>
  <video controls class="hide-when-present" style="width:100%">
    <source src="assets/quantika-demo.mp4" type="video/mp4">
    Tu navegador no soporta el tag de video.
  </video>
</div>

<hr/>

<div class="tron-panel hide-when-present">
  <h2>🎨 Kit visual</h2>
  <div style="display:flex; gap:12px; align-items:center; flex-wrap:wrap">
    <img src="assets/quantika-logo.gif" alt="logo animado" style="max-height:56px; border-radius:8px; border:1px solid rgba(0,229,255,.35)">
    <img src="assets/palette.png" alt="paleta de colores" style="max-height:56px; border-radius:8px; border:1px solid rgba(0,229,255,.35)">
  </div>
</div>

<hr/>

<div class="tron-panel hide-when-present">
<h3>🧪 Ejemplo</h3>
<pre><code>print "Hola Quantika!"
let nombre = "Viviana"
print "Bienvenida, {nombre}"</code></pre>
</div>

<script>
// Theme + accent + presentation
(function(){
  const THEME_KEY="q.theme", ACCENT_KEY="q.accent", PRES_KEY="q.present";
  const root=document.documentElement, body=document.body;
  const tbtn=document.getElementById("themeToggle");
  const abtn=document.getElementById("accentSel");
  const pbtn=document.getElementById("presentBtn");

  function applyTheme(theme){
    if (theme==="light") { root.setAttribute("data-theme","light"); tbtn.textContent="🌞 Light"; }
    else { root.removeAttribute("data-theme"); tbtn.textContent="🌙 Dark"; }
  }
  function applyAccent(mode){
    // Defaults Tron
    let a1="#00E5FF", a2="#00FF88", ok="#00FF88";
    if(mode==="quantika"){ a1="#9A4DFF"; a2="#00E5FF"; ok="#00FF88"; }
    if(mode==="sunset"){ a1="#FF6EA8"; a2="#FF9E44"; ok="#00E5FF"; }
    if(mode==="ice"){ a1="#9AD0FF"; a2="#4BC0FF"; ok="#00FFCC"; }
    document.documentElement.style.setProperty("--accent", a1);
    document.documentElement.style.setProperty("--accent2", a2);
    document.documentElement.style.setProperty("--ok", ok);
  }
  function applyPresent(on){
    if(on){ body.classList.add("present"); pbtn.textContent="⤺ Salir de Presentación"; }
    else { body.classList.remove("present"); pbtn.textContent="🎤 Modo Presentación"; }
  }

  const savedTheme=localStorage.getItem(THEME_KEY)||"dark";
  const savedAccent=localStorage.getItem(ACCENT_KEY)||"tron";
  const savedPresent=localStorage.getItem(PRES_KEY)==="1";
  applyTheme(savedTheme); applyAccent(savedAccent); applyPresent(savedPresent);
  abtn.value=savedAccent;

  tbtn.addEventListener("click",()=>{
    const next=(root.getAttribute("data-theme")==="light")?"dark":"light";
    localStorage.setItem(THEME_KEY,next); applyTheme(next);
  });
  abtn.addEventListener("change",()=>{
    localStorage.setItem(ACCENT_KEY,abtn.value); applyAccent(abtn.value);
  });
  pbtn.addEventListener("click",()=>{
    const on=!document.body.classList.contains("present");
    localStorage.setItem(PRES_KEY, on ? "1":"0"); applyPresent(on);
  });
})();
</script>
