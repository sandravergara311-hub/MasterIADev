const raiz = document.documentElement;

function aplicarTema(tema) {
  if (tema === "noche") raiz.dataset.tema = "noche";
  else delete raiz.dataset.tema;
  localStorage.setItem("tema", tema);
}

function aplicarTamano(px) {
  raiz.style.setProperty("--tamano", px + "rem");
  localStorage.setItem("tamano", String(px));
}

const temaGuardado = localStorage.getItem("tema");
if (temaGuardado) aplicarTema(temaGuardado);

const tamanoGuardado = Number(localStorage.getItem("tamano"));
if (tamanoGuardado) aplicarTamano(tamanoGuardado);

document.querySelectorAll("[data-tema-boton]").forEach((boton) => {
  boton.addEventListener("click", () => {
    const noche = raiz.dataset.tema === "noche";
    aplicarTema(noche ? "dia" : "noche");
    boton.textContent = noche ? "Noche" : "Día";
  });
  if (raiz.dataset.tema === "noche") boton.textContent = "Día";
});

document.querySelectorAll("[data-letra]").forEach((boton) => {
  boton.addEventListener("click", () => {
    const actual = Number(getComputedStyle(raiz).getPropertyValue("--tamano").replace("rem", "")) || 1.125;
    const delta = boton.dataset.letra === "mas" ? 0.08 : -0.08;
    const siguiente = Math.min(1.45, Math.max(0.95, Math.round((actual + delta) * 100) / 100));
    aplicarTamano(siguiente);
  });
});

const menu = document.querySelector("[data-menu]");
const indice = document.querySelector(".indice");
if (menu && indice) {
  menu.addEventListener("click", () => indice.classList.toggle("abierto"));
}

const barra = document.querySelector(".barra > span");
if (barra) {
  const medir = () => {
    const alto = document.documentElement.scrollHeight - window.innerHeight;
    const avance = alto > 0 ? (window.scrollY / alto) * 100 : 0;
    barra.style.width = avance + "%";
  };
  medir();
  document.addEventListener("scroll", medir, { passive: true });
}

document.querySelectorAll("pre").forEach((bloque) => {
  const boton = document.createElement("button");
  boton.type = "button";
  boton.className = "copiar";
  boton.textContent = "Copiar";
  boton.addEventListener("click", async () => {
    const codigo = bloque.querySelector("code");
    const texto = codigo ? codigo.innerText : bloque.innerText;
    try {
      await navigator.clipboard.writeText(texto);
      boton.textContent = "Listo";
    } catch {
      boton.textContent = "No se pudo";
    }
    setTimeout(() => {
      boton.textContent = "Copiar";
    }, 1400);
  });
  bloque.appendChild(boton);
});

const articulo = document.querySelector("article");
if (articulo && "speechSynthesis" in window) {
  const caja = document.createElement("div");
  caja.className = "escuchar";
  caja.innerHTML = `<button type="button" data-escuchar-ir>Escuchar</button>
    <button type="button" data-escuchar-parar hidden>Detener</button>
    <label>Desde
      <select data-escuchar-desde aria-label="Desde dónde empezar">
        <option value="0">Desde el inicio</option>
      </select>
    </label>
    <label>Voz
      <select data-escuchar-voz aria-label="Tipo de voz"></select>
    </label>
    <label>Velocidad
      <select data-escuchar-ritmo aria-label="Velocidad de la lectura">
        <option value="0.9">0.9×</option>
        <option value="1" selected>1×</option>
        <option value="1.2">1.2×</option>
        <option value="1.4">1.4×</option>
        <option value="1.6">1.6×</option>
        <option value="1.8">1.8×</option>
        <option value="2">2×</option>
      </select>
    </label>`;
  const lectura = articulo.closest(".lectura") || articulo.parentElement;
  lectura.insertBefore(caja, lectura.firstChild);

  const ir = caja.querySelector("[data-escuchar-ir]");
  const parar = caja.querySelector("[data-escuchar-parar]");
  const desde = caja.querySelector("[data-escuchar-desde]");
  const vozSelect = caja.querySelector("[data-escuchar-voz]");
  const ritmo = caja.querySelector("[data-escuchar-ritmo]");
  const ritmoGuardado = { "1.15": "1.2" }[localStorage.getItem("ritmo")] || localStorage.getItem("ritmo");
  if (ritmoGuardado && [...ritmo.options].some((opcion) => opcion.value === ritmoGuardado)) {
    ritmo.value = ritmoGuardado;
  }

  let frases = [];
  let indice = 0;
  let estado = "quieto";
  let generacion = 0;

  function lugarDe(item) {
    const lang = item.lang.toLowerCase();
    if (lang.startsWith("es-mx")) return "Latinoamérica";
    const mapa = { "es-es": "España", "es-co": "Colombia", "es-ar": "Argentina", "es-us": "Estados Unidos", "es-419": "Latinoamérica" };
    return mapa[lang] || item.lang;
  }

  function nombreDeVoz(item) {
    const nombre = item.name.replace(/^Microsoft\s+/i, "").replace(/\s+-\s+Spanish.*$/i, "").trim();
    return `${nombre} · ${lugarDe(item)}`;
  }

  function esLatina(item) {
    const lang = item.lang.toLowerCase();
    return lang.startsWith("es-mx") || lang.startsWith("es-co") || lang.startsWith("es-419") || /sabina|dalia|salome/i.test(item.name);
  }

  function puntaje(item) {
    let nota = 0;
    if (esLatina(item)) nota += 20;
    if (/sabina|dalia|salome/i.test(item.name)) nota += 10;
    if (/pablo|raul|jorge/i.test(item.name)) nota -= 5;
    return nota;
  }

  function vocesEnEspanol() {
    return speechSynthesis
      .getVoices()
      .filter((item) => item.lang.toLowerCase().startsWith("es"))
      .sort((a, b) => puntaje(b) - puntaje(a) || nombreDeVoz(a).localeCompare(nombreDeVoz(b), "es"));
  }

  function llenarVoces() {
    const voces = vocesEnEspanol();
    const guardada = localStorage.getItem("voz");
    const actual = vozSelect.value;
    vozSelect.replaceChildren();
    if (!voces.length) {
      const opcion = document.createElement("option");
      opcion.value = "";
      opcion.textContent = "Voz del navegador";
      vozSelect.appendChild(opcion);
      return;
    }
    for (const item of voces) {
      const opcion = document.createElement("option");
      opcion.value = item.voiceURI;
      opcion.textContent = nombreDeVoz(item);
      vozSelect.appendChild(opcion);
    }
    const latina = voces.find((item) => esLatina(item) && /sabina|dalia|salome/i.test(item.name)) || voces.find(esLatina);
    const preferida = [actual, guardada, latina?.voiceURI].find((valor) => voces.some((item) => item.voiceURI === valor));
    vozSelect.value = preferida || voces[0].voiceURI;
  }

  function vozElegida() {
    return vocesEnEspanol().find((item) => item.voiceURI === vozSelect.value) || vocesEnEspanol()[0] || null;
  }

  function pintar() {
    ir.textContent = estado === "leyendo" ? "Pausar" : estado === "pausa" ? "Seguir" : "Escuchar";
    parar.hidden = estado === "quieto";
    caja.dataset.estado = estado;
  }

  function partir(texto) {
    return texto
      .split(/(?<=[.!?…])\s+|\n+/)
      .map((parte) => parte.trim())
      .filter((parte) => parte.length > 1);
  }

  function preparar() {
    const bloques = "h1,h2,h3,p,li,blockquote,td";
    const lista = [];
    const puntos = [{ etiqueta: "Desde el inicio", indice: 0 }];
    articulo.querySelectorAll(bloques).forEach((nodo) => {
      if (nodo.closest("pre") || nodo.querySelector(bloques)) return;
      const texto = nodo.innerText.replace(/\s+/g, " ").trim();
      const partes = partir(texto);
      if (!partes.length) return;
      if (/^H[1-3]$/.test(nodo.tagName) && lista.length > 0) {
        const etiqueta = texto.length > 72 ? `${texto.slice(0, 69)}…` : texto;
        puntos.push({ etiqueta, indice: lista.length });
      }
      lista.push(...partes);
    });
    return { frases: lista, puntos };
  }

  function cargarLeccion() {
    const preparado = preparar();
    frases = preparado.frases;
    desde.replaceChildren();
    for (const punto of preparado.puntos) {
      const opcion = document.createElement("option");
      opcion.value = String(punto.indice);
      opcion.textContent = punto.etiqueta;
      desde.appendChild(opcion);
    }
  }

  function hablarSiguiente() {
    if (estado !== "leyendo" || indice >= frases.length) {
      if (indice >= frases.length) detener();
      return;
    }
    const marca = generacion;
    const voz = vozElegida();
    const frase = new SpeechSynthesisUtterance(frases[indice]);
    frase.lang = voz?.lang || "es-MX";
    if (voz) frase.voice = voz;
    frase.rate = Number(ritmo.value);
    const avanzar = () => {
      if (marca !== generacion || estado !== "leyendo") return;
      indice += 1;
      hablarSiguiente();
    };
    frase.onend = avanzar;
    frase.onerror = () => {
      if (marca !== generacion) return;
      if (estado === "leyendo") detener();
    };
    speechSynthesis.speak(frase);
  }

  function empezar() {
    if (!frases.length) cargarLeccion();
    if (!frases.length) return;
    if (estado === "quieto") indice = Number(desde.value) || 0;
    estado = "leyendo";
    pintar();
    hablarSiguiente();
  }

  function pausar() {
    estado = "pausa";
    generacion += 1;
    speechSynthesis.cancel();
    pintar();
  }

  function saltarAqui() {
    indice = Number(desde.value) || 0;
    if (estado !== "leyendo") return;
    generacion += 1;
    speechSynthesis.cancel();
    hablarSiguiente();
  }

  function detener() {
    estado = "quieto";
    indice = Number(desde.value) || 0;
    generacion += 1;
    speechSynthesis.cancel();
    pintar();
  }

  ir.addEventListener("click", () => {
    if (estado === "leyendo") pausar();
    else empezar();
  });
  parar.addEventListener("click", detener);
  desde.addEventListener("change", saltarAqui);
  vozSelect.addEventListener("change", () => {
    localStorage.setItem("voz", vozSelect.value);
    if (estado === "leyendo") {
      generacion += 1;
      speechSynthesis.cancel();
      hablarSiguiente();
    }
  });
  ritmo.addEventListener("change", () => {
    localStorage.setItem("ritmo", ritmo.value);
    if (estado === "leyendo") {
      generacion += 1;
      speechSynthesis.cancel();
      hablarSiguiente();
    }
  });
  speechSynthesis.addEventListener("voiceschanged", llenarVoces);
  window.addEventListener("pagehide", detener);
  cargarLeccion();
  llenarVoces();
  pintar();
}

const buscar = document.querySelector("#buscar");
if (buscar) {
  const tarjetas = [...document.querySelectorAll(".modulo")];
  buscar.addEventListener("input", () => {
    const q = buscar.value.trim().toLowerCase();
    tarjetas.forEach((tarjeta) => {
      const texto = tarjeta.textContent.toLowerCase();
      tarjeta.classList.toggle("oculto", q.length > 0 && !texto.includes(q));
    });
  });
}
