---
name: lecciones-a-claro
description: >-
  Rewrites Master IA 4 Devs lessons from original/ into claro/ in plain Latin
  American Spanish, with one real-world case per module. Use when the user
  asks to pasar lecciones a claro, reescribir un módulo, generar la versión
  clara, or when new lesson files appear under original/.
---

# De original a claro

Pasa lecciones de `original/` a `claro/` sin copiar el texto del máster. El resultado se lee como si se lo explicaras a un colega en Latinoamérica.

## Cuándo correrla

- El usuario nombra un módulo: trabaja solo ese.
- No nombra ninguno: toma cada `original/modulo-*/*.md` que no tenga el mismo archivo en `claro/`.
- No reescribas un archivo de `claro/` que ya existe, salvo que pidan rehacerlo.

## Pasos

1. Lista los `.md` del módulo en `original/`, en orden numérico (`1.md`, `2.md`, …).
2. Léelos todos antes de escribir. El caso real tiene que aguantar el módulo entero.
3. Elige un caso nuevo. No reutilices Clínica Norte (módulo 1) ni Inmobiliaria Calle (módulo 2). Un oficio cotidiano, las mismas personas en todas las lecciones del módulo.
4. Escribe `claro/modulo-N/X.md` con el mismo número. Una lección por archivo.
5. Si el original está vacío, no inventes la lección. Deja solo el título, la ruta del original y una frase: el archivo original está vacío.
6. Al terminar, di qué archivos creaste y cuál es el caso del módulo.

## Qué se conserva y qué no

Conserva, con el sentido exacto, lo que la persona tiene que hacer: fechas límite, comandos, ramas, nombres de repo, listas de verificación y fichas de hechos. Puedes explicar alrededor. No cambies el comando ni la fecha.

No copies la prosa, los rankings ni las capturas. Si el original muestra una imagen, pasa esa idea a frases o a una tabla.

No agregues lecciones que el original no trae. No cortes una lección obligatoria por ser larga: se puede decir más corto, no se puede omitir el ejercicio.

## Plantilla

```markdown
# Módulo N · Lección X — Título en palabras simples

Texto original: `original/modulo-N/X.md`
Obligatoria o opcional, en una línea. Si hay fecha límite, va aquí.

## En una frase

Una o dos oraciones. Qué tiene que entender alguien que solo lee este bloque.

## Palabras que vas a escuchar

Solo si el original suelta términos. Una línea por término: la palabra y qué significa en la práctica. Si no hace falta, omite esta sección.

## Caso real: nombre corto

La misma historia del módulo, aplicada a esta lección. Primero qué sale mal sin la idea. Después qué cambia al aplicarla.

## El desarrollo

Las ideas del original, en el mismo orden. Frases cortas. Una idea por párrafo.

## Qué hacer

Lista corta, solo si la lección deja una acción. En un ejercicio, aquí van los comandos y la entrega.

## Preguntas frecuentes

Solo las que el original ya responde. La respuesta, directa.

Siguiente lección: una frase de qué viene.
```

Omite las secciones que la lección no necesita. Un ejercicio largo usa "La tarea" y "Cómo se entrega" en lugar de "Qué hacer".

## Cómo se escribe

- Español de Latinoamérica, de tú. Frases cortas. Una idea por oración.
- La primera vez que aparezca un término del curso, dilo en palabras simples al lado. Ejemplo: un harness es la configuración que rodea al agente.
- "Clase en vivo", no "directo". "Pedido" junto a prompt. "Computadora", no "ordenador". "Falla", no "avería". "Encargado del edificio", no "portero".
- No uses: vale, vosotros, coger, chuleta, mutua, enchufar, currar, móvil, a ojo, se apañe.
- El caso ocurre en un trabajo reconocible (clínica, inmobiliaria, taller, colegio). Los números y las reglas salen de la lección, no de un adorno.
- Si una palabra del original es de España y cambia el sentido en algún país, cámbiala.

## Antes de dar por lista una lección

- El archivo de `claro` tiene el mismo nombre que el de `original`.
- Se entiende sin haber leído el original.
- El caso es el del módulo, no uno nuevo en cada lección.
- Comandos, ramas y fechas coinciden con el original.
- No quedó una captura sin explicar.
