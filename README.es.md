# 🌌 Quantika — un mini lenguaje con IA educativa

![Language](https://img.shields.io/badge/language-Quantika-9A4DFF?style=for-the-badge&logo=github)
![License](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)
![Status](https://img.shields.io/badge/status-experimental-orange?style=for-the-badge)

---

## 🚀 Página Oficial
👉 [Ver página de Quantika](https://robi2025.github.io/Quantika/)

---

## 🎨 Identidad Visual
Quantika incluye su propio kit visual:  

- ![Paleta](assets/palette.png)  
- Logo animado:  
  ![Logo Quantika](assets/quantika-logo.gif)

---

## 🎬 Video Demo
Aquí un trailer mostrando la ejecución de Quantika:  

https://github.com/robi2025/Quantika/raw/main/assets/quantika-demo.mp4

*(Consejo: abre el link para ver el video, GitHub no reproduce mp4 en línea)*

---

## 🚀 Ejemplo rápido

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

Ejecuta ambos:
```bash
python quantika.py run examples/hello.qk
python quantika.py run examples/ai_demo.qk
```

---

💙 Hecho con cariño por **ti**. Licencia MIT.
