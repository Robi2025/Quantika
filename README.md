# 🌌 Quantika — a tiny AI-flavored toy language

![Language](https://img.shields.io/badge/language-Quantika-9A4DFF?style=for-the-badge&logo=github)
![License](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)
![Status](https://img.shields.io/badge/status-experimental-orange?style=for-the-badge)

---

## 🚀 Official Website
👉 [Visit Quantika Website](https://robi2025.github.io/Quantika/)

---

## 🎨 Visual Identity
Quantika comes with its own visual identity kit!

- ![Palette](assets/palette.png)
- Animated logo:  
  ![Quantika Logo](assets/quantika-logo.gif)

---

## 🎬 Demo Video
Here is a short demo of Quantika execution:  

https://github.com/robi2025/Quantika/raw/main/assets/quantika-demo.mp4

*(Tip: open link to view video, GitHub doesn’t autoplay mp4 inline)*

---

## Quick Example

**`examples/hello.qk`**
```qk
print "Hola Quantika!"
let nombre = "Viviana"
print "Bienvenida, {nombre}"
```

**`examples/ai_demo.qk`**
```qk
labels = ["positivo","negativo","neutro"]
ai.classify text: "este servicio es excelente", labels: labels -> sentimiento
print "Sentimiento: {sentimiento}"

ai.generate prompt: "Consejo para ahorrar energía en el condominio" -> idea
print "Idea: {idea}"

ai.similarity a: "perro en pasillo de acceso", b: "mascota en entrada peatonal" -> sim
print "Similitud: {sim}"
```

Run:
```bash
python quantika.py run examples/hello.qk
python quantika.py run examples/ai_demo.qk
```

---

💙 Made with love by **you**. MIT License.
