---
title: Quantika AI Language
layout: default
---

# 🌌 Quantika — Lenguaje con IA educativa

<link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@500&family=Share+Tech+Mono&display=swap" rel="stylesheet">
<style>
:root {
  --bg: #0A0014;
  --fg: #E0E0FF;
  --accent: #9A4DFF;
  --accent2: #00E5FF;
  --ok: #00FF88;
}
body { background: var(--bg); color: var(--fg); }
h1, h2, h3 { font-family: 'Orbitron', sans-serif; letter-spacing: .5px; }
code, pre, .mono { font-family: 'Share Tech Mono', monospace; }

.player-card {
  max-width: 860px; margin: 24px auto; padding: 18px 18px 22px;
  border: 1px solid rgba(154,77,255,.35);
  background: linear-gradient(180deg, rgba(154,77,255,.08), rgba(0,229,255,.06));
  border-radius: 16px;
  box-shadow: 0 8px 30px rgba(0,0,0,.35);
}
.player-header {
  display: flex; align-items: center; gap: 12px; margin-bottom: 10px;
}
.badge {
  display:inline-block; padding: 6px 10px; border-radius: 999px;
  background: rgba(0,229,255,.15); border:1px solid rgba(0,229,255,.35); color: var(--fg);
  font-size: 12px; text-transform: uppercase; letter-spacing: .8px;
}
.player-title { font-size: 20px; margin: 0; }
.player-body { display: grid; grid-template-columns: 200px 1fr; gap: 16px; align-items:center; }
.thumb {
  position: relative; width: 200px; height: 120px; border-radius: 12px;
  background: radial-gradient(60% 60% at 50% 40%, rgba(154,77,255,.7), rgba(10,0,20,1));
  display:flex; align-items:center; justify-content:center; overflow:hidden;
  border:1px solid rgba(154,77,255,.35);
}
.thumb::after {
  content:""; position:absolute; inset:-1px;
  background: conic-gradient(from 90deg, rgba(154,77,255,.15), rgba(0,229,255,.15), transparent 40%);
  filter: blur(10px);
}
.play {
  width: 0; height: 0; border-left: 22px solid var(--ok);
  border-top: 14px solid transparent; border-bottom: 14px solid transparent;
  z-index:2;
}
.meta { font-size: 13px; opacity: .9; }
video { width: 100%; border-radius: 12px; outline: none; border:1px solid rgba(154,77,255,.35); }
hr { border: none; border-top: 1px solid rgba(154,77,255,.3); margin: 28px 0; }
a { color: var(--accent2); }
.kit { display:flex; gap:12px; align-items:center; flex-wrap:wrap; }
.kit img { max-height: 56px; border-radius: 8px; border:1px solid rgba(154,77,255,.35); }
</style>

<div class="player-card">
  <div class="player-header">
    <span class="badge">demo</span>
    <h3 class="player-title">Ejecución de Quantika</h3>
  </div>
  <div class="player-body">
    <div class="thumb">
      <div class="play"></div>
    </div>
    <div class="meta">
      <p>Video corto mostrando <span class="mono">print</span>, <span class="mono">let</span> y comandos de IA (<span class="mono">ai.classify</span>).</p>
      <p>Si no se reproduce, abre el enlace directo del video más abajo.</p>
    </div>
  </div>
  <div style="margin-top:14px">
    <video controls>
      <source src="assets/quantika-demo.mp4" type="video/mp4">
      Tu navegador no soporta el video.
    </video>
  </div>
</div>

<hr/>

## 🎨 Kit visual
<div class="kit">
  <img src="assets/quantika-logo.gif" alt="logo animado">
  <img src="assets/palette.png" alt="paleta de colores">
</div>

<hr/>

## 🧪 Ejemplo rápido
```qk
print "Hola Quantika!"
let nombre = "Viviana"
print "Bienvenida, {nombre}"
labels = ["positivo","negativo","neutro"]
ai.classify text: "este servicio es excelente", labels: labels -> sentimiento
print "Sentimiento: {sentimiento}"
```

---

ℹ️ Consejo: si editas este archivo en GitHub, los cambios se publican automáticamente en tu GitHub Pages.
