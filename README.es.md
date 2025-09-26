![Language](https://img.shields.io/badge/language-Quantika-9A4DFF?style=for-the-badge&logo=github)
![License](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)
![Status](https://img.shields.io/badge/status-experimental-orange?style=for-the-badge)

# Quantika — un mini lenguaje con IA educativa

**Quantika** es un lenguaje de programación inventado, sencillo y amigable para aprender y hacer demostraciones.  
Combina una sintaxis súper simple con algunas funciones *tipo IA* integradas en Python puro (sin dependencias externas).  
Perfecto para publicarlo en GitHub como tu propio experimento de lenguaje. ✨

> Nota: Las funciones de “IA” son educativas: usan técnicas básicas (bolsa de palabras, reglas y similitud coseno) para correr en cualquier computador sin instalar modelos pesados.

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

## ⚙️ Instalación

Requiere **Python 3.9+**. No necesita librerías externas.

---

## 🤖 Funciones integradas de “IA”

- `ai.classify` → Clasificación de texto con reglas.  
- `ai.generate` → Respuesta a prompts con plantillas.  
- `ai.similarity` → Similitud coseno 0..1.  
- `memory.store` / `memory.recall` → Guardar y recuperar memoria.

---

💙 Hecho con cariño por **ti**.  
¡Mejora Quantika y compártelo con el mundo!
