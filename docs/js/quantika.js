/* Quantika interpreter (browser) — tiny, educational */
(() => {
  const $ = (sel) => document.querySelector(sel);
  const out = $("#output");
  const editor = $("#editor");
  const runBtn = $("#runBtn");
  const shareBtn = $("#shareBtn");
  const dlBtn = $("#downloadBtn");
  const examples = $("#examples");
  const gauge = $("#sentGauge");

  // Autosave + share
  const LS_KEY = "quantika.editor";
  const exampleHello = `print "Hola Quantika!"
let nombre = "Viviana"
print "Bienvenida, {nombre}"`;

  const exampleAI = `# Clasificación simple
labels = ["positivo","negativo","neutro"]
ai.classify text: "este servicio es excelente", labels: labels -> sentimiento
print "Sentimiento: {sentimiento}"

# Generación
ai.generate prompt: "Consejo para ahorrar energía en el condominio" -> idea
print "Idea: {idea}"

# Similitud
ai.similarity a: "perro en pasillo de acceso", b: "mascota en entrada peatonal" -> sim
print "Similitud: {sim}"`;

  function encodeToHash(s) {
    return btoa(unescape(encodeURIComponent(s)));
  }
  function decodeFromHash(h) {
    try { return decodeURIComponent(escape(atob(h))); } catch { return null; }
  }

  // load from hash or localstorage
  const hash = location.hash.replace(/^#/, "");
  if (hash) {
    const dec = decodeFromHash(hash);
    if (dec) editor.value = dec;
  } else {
    editor.value = localStorage.getItem(LS_KEY) || exampleAI;
  }
  editor.addEventListener("input", () => {
    localStorage.setItem(LS_KEY, editor.value);
  });

  // share
  shareBtn.addEventListener("click", () => {
    const url = `${location.origin}${location.pathname}#${encodeToHash(editor.value)}`;
    navigator.clipboard.writeText(url).then(() => {
      notify("Enlace copiado ✅");
      history.replaceState(null, "", "#" + encodeToHash(editor.value));
    });
  });

  // download
  dlBtn.addEventListener("click", () => {
    const blob = new Blob([editor.value], {type: "text/plain"});
    const url = URL.createObjectURL(blob);
    dlBtn.href = url;
    setTimeout(() => URL.revokeObjectURL(url), 3000);
  });

  // examples
  examples.addEventListener("change", () => {
    if (examples.value === "hello") editor.value = exampleHello;
    if (examples.value === "ai") editor.value = exampleAI;
    editor.dispatchEvent(new Event("input"));
  });

  // run
  runBtn.addEventListener("click", runProgram);
  window.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") { runProgram(); }
  });

  function notify(msg) {
    const s = $("#status");
    s.textContent = msg;
    setTimeout(() => s.textContent = "Auto-guardado en tu navegador ✓", 1500);
  }

  // ---------------- Interpreter ----------------
  class QKErr extends Error {}
  class Quantika {
    constructor() { this.env = {}; this.memory = {}; this.lines = []; }
    getValue(token) {
      token = token.trim();
      if (token.startsWith('"') && token.endsWith('"')) return token.slice(1, -1);
      if (token.startsWith("[") && token.endsWith("]")) {
        const inner = token.slice(1, -1).trim();
        if (!inner) return [];
        // naive split on commas not inside quotes
        const parts = []; let buf = ""; let inStr = false;
        for (let i=0;i<inner.length;i++) {
          const c = inner[i];
          if (c === '"' && inner[i-1] !== "\\") inStr = !inStr;
          if (c === "," && !inStr) { parts.push(buf.trim()); buf=""; }
          else buf += c;
        }
        if (buf.trim()) parts.push(buf.trim());
        return parts.map(p => {
          p = p.trim();
          if (p.startsWith('"') && p.endsWith('"')) return p.slice(1,-1).replace('\\"','"');
          if (!isNaN(Number(p))) return Number(p);
          return p;
        });
      }
      if (!isNaN(Number(token))) return Number(token);
      if (token in this.env) return this.env[token];
      throw new QKErr(`Variable desconocida o literal inválido: ${token}`);
    }
    setVar(name, val) { this.env[name]=val; }
    print(val) { out.textContent += (typeof val === "string" ? interpolate(val, this.env) : String(val)) + "\n"; }
    execLine(raw) {
      const line = raw.trim();
      if (!line || line.startsWith("#")) return;

      // print
      if (line.startsWith("print ")) {
        const expr = line.slice("print ".length);
        const v = this.getValue(expr);
        this.print(v);
        return;
      }
      // let
      if (line.startsWith("let ")) {
        const m = line.match(/^let\s+([A-Za-z_]\w*)\s*=\s*(.+)$/);
        if (!m) throw new QKErr("Sintaxis let inválida: " + line);
        const [, name, expr] = m;
        const v = this.getValue(expr);
        this.setVar(name, v);
        return;
      }
      // arrow capture
      let target = null, base = line;
      if (line.includes("->")) { [base, target] = line.split("->"); base = base.trim(); target = target.trim(); }

      // ai.classify
      if (base.startsWith("ai.classify")) {
        const m = base.match(/^ai\.classify\s+text:\s*(.+?),\s*labels:\s*(.+)$/);
        if (!m) throw new QKErr("Sintaxis ai.classify inválida.");
        const text = this.getValue(m[1]);
        const labels = this.getValue(m[2]);
        const res = SimpleAI.classify(text, labels);
        if (target) this.setVar(target, res); else this.print(res);
        // update gauge if standard labels
        const score = sentimentScore(text);
        gauge.style.width = Math.max(0, Math.min(1, score))*100 + "%";
        return;
      }
      // ai.generate
      if (base.startsWith("ai.generate")) {
        const m = base.match(/^ai\.generate\s+prompt:\s*(.+)$/);
        if (!m) throw new QKErr("Sintaxis ai.generate inválida.");
        const prompt = this.getValue(m[1]);
        const res = SimpleAI.generate(prompt);
        if (target) this.setVar(target, res); else this.print(res);
        return;
      }
      // ai.similarity
      if (base.startsWith("ai.similarity")) {
        const m = base.match(/^ai\.similarity\s+a:\s*(.+?),\s*b:\s*(.+)$/);
        if (!m) throw new QKErr("Sintaxis ai.similarity inválida.");
        const a = this.getValue(m[1]), b = this.getValue(m[2]);
        const res = round4(SimpleAI.similarity(a,b));
        if (target) this.setVar(target, res); else this.print(res);
        return;
      }
      // memory.store
      if (base.startsWith("memory.store")) {
        const m = base.match(/^memory\.store\s+key:\s*(.+?),\s*value:\s*(.+)$/);
        if (!m) throw new QKErr("Sintaxis memory.store inválida.");
        const k = this.getValue(m[1]), v = this.getValue(m[2]);
        window.__quantika_mem = window.__quantika_mem || {};
        window.__quantika_mem[String(k)] = v;
        return;
      }
      // memory.recall
      if (base.startsWith("memory.recall")) {
        const m = base.match(/^memory\.recall\s+key:\s*(.+)$/);
        if (!m) throw new QKErr("Sintaxis memory.recall inválida.");
        const k = this.getValue(m[1]);
        const val = (window.__quantika_mem||{})[String(k)];
        if (target) this.setVar(target, val); else this.print(val);
        return;
      }

      throw new QKErr("Instrucción no reconocida: " + raw);
    }
    run(program) {
      out.textContent = "";
      gauge.style.width = "0%";
      const lines = program.split(/\r?\n/);
      for (let i=0;i<lines.length;i++) {
        const raw = lines[i];
        try { this.execLine(raw); }
        catch (e) { this.print(`[Línea ${i+1}] ${e.message}`); break; }
      }
    }
  }

  // Helpers
  function interpolate(str, env) { return str.replace(/\{([^}]+)\}/g, (_,k)=> String(env[k.trim()] ?? `{${k}}`)); }
  function words(s){ return (s.toLowerCase().match(/[a-záéíóúñü]+/g)||[]); }
  function bag(s){ const b={}; for(const w of words(s)) b[w]=(b[w]||0)+1; return b; }
  function cosine(a,b){ const ka=Object.keys(a), kb=Object.keys(b), k=ka.filter(x=>kb.includes(x)); 
    let num=0,da=0,db=0; for(const w of k) num += a[w]*b[w]; for(const w of ka) da += a[w]*a[w]; for(const w of kb) db += b[w]*b[w];
    return (da && db) ? (num / (Math.sqrt(da)*Math.sqrt(db))) : 0;
  }
  function round4(x){ return Math.round(x*10000)/10000; }

  const POS = new Set(["excelente","bueno","genial","perfecto","feliz","gracias","rápido","maravilloso","mejor"]);
  const NEG = new Set(["malo","pésimo","horrible","lento","caro","triste","queja","problema","peor"]);
  const NEU = new Set(["ok","neutro","normal","promedio"]);

  const SimpleAI = {
    classify(text, labels){
      const w = new Set(words(text));
      const score = { "positivo":0, "negativo":0, "neutro":0 };
      for (const x of w){ if (POS.has(x)) score["positivo"]++; if (NEG.has(x)) score["negativo"]++; if (NEU.has(x)) score["neutro"]++; }
      const normalized = labels.map(l=> String(l).toLowerCase());
      let best = "neutro"; let bestv = -1;
      for (const k of Object.keys(score)){ if (score[k] > bestv){ best=k; bestv=score[k]; } }
      return normalized.includes(best) ? best : (normalized[0] || best);
    },
    generate(prompt){
      const p = String(prompt||"").toLowerCase();
      const rules = [
        ["ahorrar energía", "Instala temporizadores, usa iluminación LED y apaga equipos en stand-by. Define metas por área y mide kWh mensuales."],
        ["seguridad condominio", "Refuerza accesos peatonales, señaliza pasillos y define protocolo de incidentes. Capacita a conserjes y registra eventos."],
        ["perros", "Mantén accesos despejados: zonas designadas, agua/sombra, cartelería clara. Coordina con vecinos y horarios."],
        ["minería", "Muestreo y barrido, stock por lote, inventario mensual. EPP obligatorio y checklists de seguridad."]
      ];
      for (const [k,resp] of rules){ if (p.includes(k)) return resp; }
      return `Considera dividir el problema en pasos, medir resultados y mejorar iterativamente: “${prompt}”.`;
    },
    similarity(a,b){
      return cosine(bag(String(a||"")), bag(String(b||"")));
    }
  };

  function sentimentScore(text){
    const w = new Set(words(text));
    let pos=0,neg=0; for (const x of w){ if (POS.has(x)) pos++; if (NEG.has(x)) neg++; }
    const total = pos+neg; return total ? pos/total : 0;
  }

  function runProgram(){
    const qk = new Quantika();
    qk.run(editor.value);
  }
})();
