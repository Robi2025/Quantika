---
title: Quantika AI Language
layout: default
---

# 🌌 Quantika — Lenguaje de Programación con IA Educativa

![Language](https://img.shields.io/badge/language-Quantika-9A4DFF?style=for-the-badge&logo=github)
![License](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)
![Status](https://img.shields.io/badge/status-experimental-orange?style=for-the-badge)

---

## 🚀 ¿Qué es Quantika?

**Quantika** es un lenguaje inventado que mezcla una sintaxis minimalista con funciones integradas de *IA educativa*.  
Su objetivo es **enseñar y experimentar** cómo se diseña un lenguaje de programación desde cero.

- Sintaxis inspirada en lenguajes simples.  
- Funciones integradas de clasificación, generación de texto y similitud.  
- Hecho en Python puro, sin dependencias externas.  
- Abierto y extensible.  

---

## 📝 Ejemplo rápido

```qk
print "Hola Quantika!"
let nombre = "Viviana"
print "Bienvenida, {nombre}"

labels = ["positivo","negativo","neutro"]
ai.classify text: "este servicio es excelente", labels: labels -> sentimiento
print "Sentimiento: {sentimiento}"
```

---

## ⚙️ Instalación

```bash
git clone https://github.com/TU_USUARIO/Quantika-AI-Lang.git
cd Quantika-AI-Lang
python quantika.py run examples/hello.qk
```

---

## 🤖 Funciones de IA

- `ai.classify` → clasifica texto con reglas simples.  
- `ai.generate` → genera respuestas según la intención.  
- `ai.similarity` → mide similitud entre frases (0–1).  
- `memory.store` y `memory.recall` → memoria temporal.  

---

## 🌟 Roadmap

- [ ] Expresiones numéricas  
- [ ] Funciones definidas por el usuario  
- [ ] Librería estándar (archivos, HTTP)  
- [ ] Integración opcional con modelos reales  

---

💙 Proyecto creado por **ti**. Publicado bajo licencia MIT.  
