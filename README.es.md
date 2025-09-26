# 🌌 Quantika — un mini lenguaje con IA educativa

![Language](https://img.shields.io/badge/language-Quantika-9A4DFF?style=for-the-badge&logo=github)
![License](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)
![Status](https://img.shields.io/badge/status-experimental-orange?style=for-the-badge)

---

## 🚀 Página Oficial
👉 [Ver página de Quantika](https://robi2025.github.io/Quantika/)

---

## 🎬 Video Demo
[▶️ Ver demo](assets/quantika-demo.mp4)

---

## 🎨 Identidad Visual
- ![Paleta](assets/palette.png)
- Logo animado:  
  ![Logo Quantika](assets/quantika-logo.gif)

---

## Ejemplo rápido
```qk
print "Hola Quantika!"
let nombre = "Viviana"
print "Bienvenida, {nombre}"
labels = ["positivo","negativo","neutro"]
ai.classify text: "este servicio es excelente", labels: labels -> sentimiento
print "Sentimiento: {sentimiento}"
```

---

## Cómo ejecutar
```bash
python quantika.py run examples/hello.qk
python quantika.py run examples/ai_demo.qk
```
