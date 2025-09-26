# Quantika — a tiny AI-flavored toy language

**Quantika** is a tiny, beginner-friendly programming language invented for learning and demos.
It mixes super simple syntax with a few *AI-like* built-ins implemented in pure Python (no external deps).  
Perfect to publish on GitHub as your very own language experiment. ✨

> Note: The “AI” functions are educational: they use basic techniques (bag of words, rules, cosine similarity) to run anywhere without heavy models.

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

## Features

- Minimal syntax (`let`, `print`, lists, comments).
- Built-in “AI” commands: classify, generate, similarity, memory store/recall.
- Educational, no dependencies.

---

Made with 💙 by **you**. Open-source MIT.

---

👉 [![View Official Page](https://img.shields.io/badge/🌐_View%20Official%20Page-Quantika-9A4DFF?style=for-the-badge)](https://robi2025.github.io/Quantika/)

---
