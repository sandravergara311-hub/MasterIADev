import fs from "node:fs";
import path from "node:path";
import { Marked } from "marked";

const claro = path.resolve("g:/Cursos/AI4Devs/MasterIADev/claro");
const salida = path.join(claro, "html");

const marked = new Marked({ gfm: true, breaks: false });
marked.use({
  renderer: {
    link({ href, title, text }) {
      const externo = /^https?:/i.test(href);
      const titulo = title ? ` title="${escapar(title)}"` : "";
      const extra = externo ? ` target="_blank" rel="noopener"` : "";
      return `<a href="${escapar(href)}"${titulo}${extra}>${text}</a>`;
    },
  },
});

function escapar(texto) {
  return String(texto)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function slug(texto) {
  const base = texto
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return base || "seccion";
}

function tipoDe(titulo) {
  const t = titulo
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLowerCase();
  if (t.startsWith("en una frase")) return "frase";
  if (t.startsWith("palabras")) return "palabras";
  if (t.startsWith("caso real")) return "caso";
  if (t.startsWith("preguntas")) return "preguntas";
  if (t.startsWith("que hacer") || t.startsWith("la tarea") || t.startsWith("como se entrega")) return "accion";
  if (t.startsWith("el desarrollo")) return "desarrollo";
  return "tema";
}

function textoPlano(html) {
  return html.replace(/<[^>]+>/g, "").replaceAll("&amp;", "&").replaceAll("&lt;", "<").replaceAll("&gt;", ">").replaceAll("&quot;", '"');
}

function envolver(html) {
  const usados = new Map();
  const partes = html.split(/(?=<h2>)/);
  return partes
    .map((parte) => {
      if (!parte.startsWith("<h2>")) return parte;
      const coincidencia = parte.match(/^<h2>([\s\S]*?)<\/h2>/);
      const tituloHtml = coincidencia ? coincidencia[1] : "seccion";
      const titulo = textoPlano(tituloHtml);
      let id = slug(titulo);
      const veces = usados.get(id) ?? 0;
      usados.set(id, veces + 1);
      if (veces > 0) id = `${id}-${veces + 1}`;
      const cuerpo = parte.replace("<h2>", `<h2 id="${id}">`);
      return `<section class="bloque bloque-${tipoDe(titulo)}">${cuerpo}</section>`;
    })
    .join("\n");
}

function aHtml(markdown) {
  let html = marked.parse(markdown);
  html = html.replaceAll("<table>", '<div class="tabla"><table>');
  html = html.replaceAll("</table>", "</table></div>");
  html = html.replaceAll("<p>Texto original:", '<p class="origen">Texto original:');
  html = html.replaceAll("<p>Siguiente lección:", '<p class="siguiente">Siguiente lección:');
  html = html.replaceAll("<p>Siguiente en el original:", '<p class="siguiente">Siguiente en el original:');
  return envolver(html);
}

function tituloDe(markdown, archivo) {
  const linea = markdown.match(/^#\s+(.+)$/m);
  return linea ? linea[1].trim() : archivo;
}

function fraseDe(markdown) {
  const bloque = markdown.match(/## En una frase\s+([\s\S]*?)(?:\n## |\s*$)/);
  if (!bloque) return "";
  const linea = bloque[1]
    .split("\n")
    .map((l) => l.trim())
    .find((l) => l && !l.startsWith("#"));
  return linea ? linea.replace(/[*_`]/g, "") : "";
}

function nombreCorto(titulo) {
  const partes = titulo.split(" — ");
  return partes.length > 1 ? partes.slice(1).join(" — ") : titulo;
}

function listar() {
  const modulos = fs
    .readdirSync(claro, { withFileTypes: true })
    .filter((entrada) => entrada.isDirectory() && /^modulo-\d+$/.test(entrada.name))
    .map((entrada) => Number(entrada.name.slice("modulo-".length)))
    .sort((a, b) => a - b);

  return modulos.map((numero) => {
    const carpeta = path.join(claro, `modulo-${numero}`);
    const lecciones = fs
      .readdirSync(carpeta)
      .filter((nombre) => /^\d+\.md$/.test(nombre))
      .map((nombre) => Number(nombre.replace(".md", "")))
      .sort((a, b) => a - b)
      .map((n) => {
        const markdown = fs.readFileSync(path.join(carpeta, `${n}.md`), "utf8");
        const titulo = tituloDe(markdown, `${n}.md`);
        return { n, titulo, corto: nombreCorto(titulo), markdown, frase: n === 1 ? fraseDe(markdown) : "" };
      });
    return { numero, lecciones };
  });
}

function indiceHtml(modulos, actual) {
  return modulos
    .map((modulo) => {
      const abierto = actual && actual.modulo === modulo.numero ? " open" : "";
      const items = modulo.lecciones
        .map((leccion) => {
          const href = actual
            ? `${actual.modulo === modulo.numero ? "" : `../modulo-${modulo.numero}/`}${leccion.n}.html`
            : `modulo-${modulo.numero}/${leccion.n}.html`;
          const clase = actual && actual.modulo === modulo.numero && actual.n === leccion.n ? ' class="actual"' : "";
          return `<li><a href="${href}"${clase}>${leccion.n}. ${escapar(leccion.corto)}</a></li>`;
        })
        .join("");
      return `<details${abierto}><summary>Módulo ${modulo.numero}</summary><ol>${items}</ol></details>`;
    })
    .join("\n");
}

function pagina({ titulo, cuerpo, indice, anterior, siguiente, css }) {
  const paso = `<nav class="paso" aria-label="Lecciones vecinas">
    ${anterior ? `<a href="${anterior.href}">← ${escapar(anterior.texto)}</a>` : "<span></span>"}
    ${siguiente ? `<a class="siguiente-paso" href="${siguiente.href}">${escapar(siguiente.texto)} →</a>` : ""}
  </nav>`;

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapar(titulo)}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,560&family=Source+Sans+3:wght@400;600;700&family=Source+Serif+4:opsz,wght@8..60,460;8..60,620&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="${css}">
</head>
<body>
  <div class="barra" aria-hidden="true"><span></span></div>
  <header class="techo">
    <button class="icono menu" type="button" data-menu>Lecciones</button>
    <a class="marca" href="${css.startsWith("..") ? "../index.html" : "index.html"}">En claro</a>
    <span class="aqui-titulo">${escapar(titulo)}</span>
    <div class="acciones">
      <button class="icono" type="button" data-letra="menos" aria-label="Texto más chico">A−</button>
      <button class="icono" type="button" data-letra="mas" aria-label="Texto más grande">A+</button>
      <button class="icono" type="button" data-tema-boton>Noche</button>
    </div>
  </header>
  <div class="marco">
    <nav class="indice" aria-label="Módulos">${indice}</nav>
    <div class="lectura">
      <article>${cuerpo}</article>
      ${paso}
    </div>
  </div>
  <script src="${css.replace("estilos.css", "app.js")}"></script>
</body>
</html>
`;
}

function portada(modulos) {
  const tarjetas = modulos
    .map((modulo) => {
      const frase = modulo.lecciones[0]?.frase ?? "";
      const items = modulo.lecciones
        .map(
          (leccion) =>
            `<li><a href="modulo-${modulo.numero}/${leccion.n}.html">${leccion.n}. ${escapar(leccion.corto)}</a></li>`,
        )
        .join("");
      return `<section class="modulo">
        <h2>Módulo ${modulo.numero}</h2>
        ${frase ? `<p class="frase">${escapar(frase)}</p>` : ""}
        <ol>${items}</ol>
      </section>`;
    })
    .join("\n");

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Lecciones en claro</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,560&family=Source+Sans+3:wght@400;600;700&family=Source+Serif+4:opsz,wght@8..60,460;8..60,620&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="estilos.css">
</head>
<body>
  <header class="techo">
    <a class="marca" href="index.html">En claro</a>
    <span class="aqui-titulo">Las lecciones, para leer</span>
    <div class="acciones">
      <button class="icono" type="button" data-letra="menos" aria-label="Texto más chico">A−</button>
      <button class="icono" type="button" data-letra="mas" aria-label="Texto más grande">A+</button>
      <button class="icono" type="button" data-tema-boton>Noche</button>
    </div>
  </header>
  <main class="portada">
    <h1>Lecciones en claro</h1>
    <p>Las mismas lecciones del máster, en español claro y con un caso real por módulo. Busca un tema o entra por el módulo.</p>
    <input id="buscar" class="buscar" type="search" placeholder="Buscar una lección o un caso" aria-label="Buscar lecciones">
    <div class="modulos">${tarjetas}</div>
  </main>
  <script src="app.js"></script>
</body>
</html>
`;
}

const modulos = listar();
const planas = modulos.flatMap((modulo) =>
  modulo.lecciones.map((leccion) => ({ modulo: modulo.numero, ...leccion })),
);

fs.mkdirSync(salida, { recursive: true });
fs.writeFileSync(path.join(salida, "index.html"), portada(modulos), "utf8");

for (let i = 0; i < planas.length; i += 1) {
  const actual = planas[i];
  const anterior = planas[i - 1];
  const siguiente = planas[i + 1];
  const carpeta = path.join(salida, `modulo-${actual.modulo}`);
  fs.mkdirSync(carpeta, { recursive: true });
  const hrefDe = (otra) => {
    if (!otra) return null;
    const mismo = otra.modulo === actual.modulo;
    return {
      href: mismo ? `${otra.n}.html` : `../modulo-${otra.modulo}/${otra.n}.html`,
      texto: `Módulo ${otra.modulo} · ${otra.n}`,
    };
  };
  const html = pagina({
    titulo: actual.titulo,
    cuerpo: aHtml(actual.markdown),
    indice: indiceHtml(modulos, actual),
    anterior: hrefDe(anterior),
    siguiente: hrefDe(siguiente),
    css: "../estilos.css",
  });
  fs.writeFileSync(path.join(carpeta, `${actual.n}.html`), html, "utf8");
}

console.log(`Listas ${planas.length} lecciones en ${salida}`);
