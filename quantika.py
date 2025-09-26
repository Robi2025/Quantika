#!/usr/bin/env python3
"""
Quantika — tiny AI‑flavored toy language
Run: python quantika.py run examples/hello.qk
"""
import sys, re, math, json, os
from collections import defaultdict, Counter

class QKErr(Exception):
    pass

def tokenize_list(s):
    # Parse ["a","b"] or [1,2] into list of strings/numbers
    s = s.strip()
    if not (s.startswith('[') and s.endswith(']')):
        raise QKErr(f"Lista inválida: {s}")
    inner = s[1:-1].strip()
    if not inner:
        return []
    parts = []
    buf, in_str = "", False
    i = 0
    while i < len(inner):
        c = inner[i]
        if c == '"' and (i == 0 or inner[i-1] != '\\'):
            in_str = not in_str
            buf += c
        elif c == ',' and not in_str:
            parts.append(buf.strip()); buf = ""
        else:
            buf += c
        i += 1
    if buf.strip():
        parts.append(buf.strip())
    # Convert each part
    out = []
    for p in parts:
        p = p.strip()
        if p.startswith('"') and p.endswith('"'):
            out.append(p[1:-1].replace('\\"','"'))
        else:
            try:
                out.append(float(p)) if '.' in p else out.append(int(p))
            except:
                out.append(p)
    return out

def is_string_literal(s):
    s = s.strip()
    return s.startswith('"') and s.endswith('"')

def interp_str(s, env):
    # Replace {var} with value from env
    def repl(m):
        key = m.group(1).strip()
        return str(env.get(key, "{"+key+"}"))
    return re.sub(r'\{([^}]+)\}', repl, s)

def to_words(text):
    return re.findall(r'[a-záéíóúñü]+', text.lower())

def bag_of_words(text):
    words = to_words(text)
    return Counter(words)

def cosine(a, b):
    # a,b are Counters
    common = set(a.keys()) & set(b.keys())
    num = sum(a[w]*b[w] for w in common)
    den = math.sqrt(sum(v*v for v in a.values())) * math.sqrt(sum(v*v for v in b.values()))
    return 0.0 if den == 0 else num/den

class SimpleAI:
    POS = {'excelente','bueno','genial','perfecto','feliz','gracias','rápido','maravilloso','mejor'}
    NEG = {'malo','pésimo','horrible','lento','caro','triste','queja','problema','peor'}
    NEU = {'ok','neutro','normal','promedio'}

    TEMPLATES = [
        ("ahorrar energía", "Instala temporizadores, usa iluminación LED y apaga equipos en stand‑by. Define metas por área y mide kWh mensuales."),
        ("seguridad condominio", "Refuerza accesos peatonales, señaliza pasillos y define protocolo de incidentes. Capacita a conserjes y registra eventos."),
        ("perros", "Mantén accesos despejados: no jugar con perros en horario laboral, agua y sombra en zonas designadas, y comunica con carteles."),
        ("minería", "Coordina muestreo y barrido, registra stock por lote y programa inventario mensual. Asegura EPP y checklists de seguridad.")
    ]

    @classmethod
    def classify(cls, text, labels):
        words = set(to_words(text))
        score = {'positivo':0, 'negativo':0, 'neutro':0}
        score['positivo'] += len(words & cls.POS)
        score['negativo'] += len(words & cls.NEG)
        score['neutro']   += len(words & cls.NEU)
        # Si hay etiquetas custom, intenta mapping
        normalized_labels = [str(l).lower() for l in labels]
        # Elegimos mejor entre etiquetas disponibles
        best_default = max(score.items(), key=lambda x: x[1])[0]
        return best_default if best_default in normalized_labels else (normalized_labels[0] if normalized_labels else best_default)

    @classmethod
    def generate(cls, prompt):
        p = prompt.lower()
        for key, resp in cls.TEMPLATES:
            if key in p:
                return resp
        # fallback: eco con consejo genérico
        return f"Considera dividir el problema en pasos, medir resultados y mejorar iterativamente: “{prompt}”."

    @classmethod
    def similarity(cls, a, b):
        return cosine(bag_of_words(a), bag_of_words(b))

class Quantika:
    def __init__(self):
        self.env = {}
        self.memory = {}

    def set_var(self, name, value):
        self.env[name] = value

    def get_value(self, token):
        token = token.strip()
        if is_string_literal(token):
            return token[1:-1]
        if token.startswith('[') and token.endswith(']'):
            return tokenize_list(token)
        # number?
        try:
            return float(token) if '.' in token else int(token)
        except:
            # variable
            if token in self.env:
                return self.env[token]
            raise QKErr(f"Variable desconocida o literal inválida: {token}")

    def exec_line(self, raw):
        line = raw.strip()
        if not line or line.startswith('#'):
            return None

        # print "..." or print "Hello {name}"
        if line.startswith("print "):
            expr = line[len("print "):].strip()
            val = self.get_value(expr)
            if isinstance(val, str):
                out = interp_str(val, self.env)
            else:
                out = str(val)
            print(out)
            return None

        # let name = value
        if line.startswith("let "):
            m = re.match(r'let\s+([A-Za-z_]\w*)\s*=\s*(.+)$', line)
            if not m:
                raise QKErr(f"Sintaxis let inválida: {line}")
            name, expr = m.group(1), m.group(2)
            val = self.get_value(expr)
            self.set_var(name, val)
            return None

        # assignment capture: ... -> var
        target = None
        if "->" in line:
            base, target = line.split("->", 1)
            line = base.strip()
            target = target.strip()

        # ai.classify text: "...", labels: ["a","b"]
        if line.startswith("ai.classify"):
            m = re.match(r'ai\.classify\s+text:\s*(.+?),\s*labels:\s*(.+)$', line)
            if not m:
                raise QKErr("Sintaxis ai.classify inválida.")
            text_expr, labels_expr = m.group(1), m.group(2)
            text = self.get_value(text_expr)
            labels = self.get_value(labels_expr)
            res = SimpleAI.classify(text, labels)
            if target:
                self.set_var(target, res)
            else:
                print(res)
            return None

        # ai.generate prompt: "..."
        if line.startswith("ai.generate"):
            m = re.match(r'ai\.generate\s+prompt:\s*(.+)$', line)
            if not m:
                raise QKErr("Sintaxis ai.generate inválida.")
            prompt_expr = m.group(1)
            prompt = self.get_value(prompt_expr)
            res = SimpleAI.generate(prompt)
            if target:
                self.set_var(target, res)
            else:
                print(res)
            return None

        # ai.similarity a: "...", b: "..."
        if line.startswith("ai.similarity"):
            m = re.match(r'ai\.similarity\s+a:\s*(.+?),\s*b:\s*(.+)$', line)
            if not m:
                raise QKErr("Sintaxis ai.similarity inválida.")
            a_expr, b_expr = m.group(1), m.group(2)
            a, b = self.get_value(a_expr), self.get_value(b_expr)
            res = round(SimpleAI.similarity(a,b), 4)
            if target:
                self.set_var(target, res)
            else:
                print(res)
            return None

        # memory.store key: "k", value: "v"
        if line.startswith("memory.store"):
            m = re.match(r'memory\.store\s+key:\s*(.+?),\s*value:\s*(.+)$', line)
            if not m:
                raise QKErr("Sintaxis memory.store inválida.")
            k_expr, v_expr = m.group(1), m.group(2)
            k, v = self.get_value(k_expr), self.get_value(v_expr)
            self.memory[str(k)] = v
            return None

        # memory.recall key: "k"
        if line.startswith("memory.recall"):
            m = re.match(r'memory\.recall\s+key:\s*(.+)$', line)
            if not m:
                raise QKErr("Sintaxis memory.recall inválida.")
            k_expr = m.group(1)
            k = self.get_value(k_expr)
            val = self.memory.get(str(k), None)
            if target:
                self.set_var(target, val)
            else:
                print(val)
            return None

        raise QKErr(f"Instrucción no reconocida: {raw}")

    def run_file(self, path):
        with open(path, 'r', encoding='utf-8') as f:
            for ln, raw in enumerate(f, 1):
                try:
                    self.exec_line(raw)
                except QKErr as e:
                    raise QKErr(f"[Línea {ln}] {e}")

def main(argv):
    if len(argv) < 3 or argv[1] != "run":
        print("Uso: python quantika.py run <archivo.qk>")
        sys.exit(1)
    qk = Quantika()
    qk.run_file(argv[2])

if __name__ == "__main__":
    main(sys.argv)
