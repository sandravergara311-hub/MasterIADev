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
