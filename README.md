# Quantika — a tiny AI‑flavored toy language

**Quantika** is a tiny, beginner‑friendly programming language invented for learning and demos.
It mixes super simple syntax with a few *AI‑like* built‑ins implemented in pure Python (no external deps).  
Perfect to publish on GitHub as your very own language experiment. ✨

> Nota: Las funciones de “IA” aquí son educativas: usan técnicas simples (bolsa de palabras,
> reglas y similitud coseno) para correr en cualquier equipo sin instalar modelos.

## Ejemplo rápido

**`examples/hello.qk`**
```qk
print "Hola Quantika!"
let nombre = "Viviana"
print "Bienvenida, {nombre}"
```

**`examples/ai_demo.qk`**
```qk
# Clasificar con reglas simples
labels = ["positivo","negativo","neutro"]
ai.classify text: "este servicio es excelente", labels: labels -> sentimiento
print "Sentimiento: {sentimiento}"

# Generar respuesta tipo chatbot (reglas/plantillas)
ai.generate prompt: "Consejo para ahorrar energía en el condominio" -> idea
print "Idea: {idea}"

# Medir similitud (coseno bolsa‑de‑palabras)
ai.similarity a: "perro en pasillo de acceso", b: "mascota en entrada peatonal" -> sim
print "Similitud: {sim}"
```

Ejecuta ambos:
```bash
python quantika.py run examples/hello.qk
python quantika.py run examples/ai_demo.qk
```

## Instalación

Requiere **Python 3.9+**. Sin dependencias externas.

```bash
git clone https://github.com/TU_USUARIO/Quantika-AI-Lang.git
cd Quantika-AI-Lang
python quantika.py run examples/hello.qk
```

## Sintaxis del lenguaje

- `let nombre = "texto"` define variables (números o strings).
- `print "Hola {nombre}"` imprime con *string interpolation*.
- Comentarios empiezan con `#`.
- Listas: `labels = ["a","b","c"]`.
- Asignación por flecha: `... -> variable` captura el resultado de una instrucción.

### Built‑ins “AI”

- `ai.classify text: "...", labels: ["a","b"] -> etiqueta`  
  Reglas y palabras clave conocen algunos sinónimos comunes en español.
- `ai.generate prompt: "..." -> texto`  
  Responde con plantillas seleccionadas por intención (muy básico).
- `ai.similarity a: "...", b: "..." -> score`  
  Retorna un float 0..1 (coseno de bolsa‑de‑palabras normalizada).
- `memory.store key: "k", value: "v"` y `memory.recall key: "k" -> v`  
  Memoria efímera en ejecución.

## Diseñado para GitHub

- Proyecto simple y claro para *commitear* de inmediato.
- Incluye logo SVG, MIT License, Contributing y ejemplos.
- Código bien comentado para que puedas extender el lenguaje.

## Roadmap (ideas)
- [ ] Variables numéricas en expresiones (`let x = 2 + 3*5`)
- [ ] Funciones definidas por el usuario
- [ ] STD lib con archivos y HTTP
- [ ] Backend opcional con modelos reales

---

Hecho con cariño por **tú** 💙 (este repo es tuyo). ¡Sube mejoras y comparte!
