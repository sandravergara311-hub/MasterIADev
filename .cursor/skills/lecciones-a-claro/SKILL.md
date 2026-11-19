---
name: lecciones-a-claro
description: >-
  Rewrites Master IA 4 Devs lessons from original/ into claro/ in very plain
  Latin American Spanish, so a person with no computing, AI, or agent
  background can follow every fact. One real-world case per module. Use when
  the user asks to pasar lecciones a claro, reescribir un módulo, generar la
  versión clara, or when new lesson files appear under original/.
---

# De original a claro

Pasa lecciones de `original/` a `claro/` sin copiar el texto del máster. El resultado lo tiene que entender una persona sin conocimientos de informática, de inteligencia artificial ni de agentes.

## Cuándo correrla

- El usuario nombra un módulo: trabaja solo ese.
- No nombra ninguno: toma cada `original/modulo-*/*.md` que no tenga el mismo archivo en `claro/`.
- No reescribas un archivo de `claro/` que ya existe, salvo que pidan rehacerlo.

## Pasos

1. Lista los `.md` del módulo en `original/`, en orden numérico (`1.md`, `2.md`, …).
2. Léelos todos antes de escribir. El caso real tiene que aguantar el módulo entero.
3. Elige un caso nuevo. No reutilices Clínica Norte, Inmobiliaria Calle, Taller Rueda, Biblioteca del Barrio, Farmacia Sol, Diario La Esquina, Colegio Los Álamos, Cowork La Mesa, Aseguradora del Valle ni Bicicletas del Parque. Un oficio cotidiano, las mismas personas en todas las lecciones del módulo.
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

## Para quién se escribe

La versión clara la lee alguien que no trabaja con computadoras, con inteligencia artificial ni con agentes. Tiene que poder seguir la lección entera.

Eso no autoriza a quitar nada. Cada número, fecha, comando, cita, mensaje de error, regla y comprobación del original sigue en el archivo. Se puede decir más despacio. No se puede saltar un paso, un ejemplo ni un ejercicio.

No des por sabido qué es una tabla, una consulta, un agente, una migración, un modelo, un repositorio o cualquier otra palabra del oficio. La primera vez, dilo en palabras de todos los días y deja el nombre técnico al lado, porque esa persona lo va a ver en la clase y en los comandos.

Si una comparación de la vida diaria ayuda a ver la idea, úsala en la misma frase. La comparación no reemplaza el dato.

Si el original da por hecho un conocimiento, dilo tal cual (el módulo no enseña eso desde cero) y aun así explica las palabras que hacen falta para seguir esta lección.

## Concreto y sin repetir

Explica lo que esa lección enseña, con el ejemplo y el dato. No des una segunda vuelta a la misma idea.

- Define cada palabra una sola vez, en la frase donde aparece por primera vez. No abras un glosario y luego repitas esas definiciones en el caso, en el desarrollo y en el cierre.
- El caso son dos o tres frases: qué salió mal y qué cambia al aplicar la idea. No vuelvas a contar el ejemplo dentro del desarrollo.
- En el desarrollo van el número, el comando, la cita, el error y la comprobación. Al lado, una frase que diga para qué sirve. Si la frase solo reformula el dato, no la pongas.
- «Qué te llevas» o «Qué hacer» es la lista de acciones. No es un resumen de la lección.
- Si una sección del original solo repite lo ya dicho, no la copies. Si trae un dato nuevo, quédate con el dato.
- Concreto no significa más técnico. El lenguaje sigue siendo el de alguien que no sabe de informática, de inteligencia artificial ni de agentes.

## Cómo se escribe

- Español de Latinoamérica, de tú. Frases cortas. Una idea por oración. Si una idea tiene tres partes, sepáralas en tres oraciones.
- La primera vez que aparezca un término del curso, dilo en palabras simples al lado. Ejemplo: un harness es la configuración que rodea al agente. Un agente es un asistente de la computadora: le escribes lo que quieres y él propone o hace el trabajo.
- "Clase en vivo", no "directo". "Pedido" junto a prompt. "Computadora", no "ordenador". "Falla", no "avería". "Encargado del edificio", no "portero".
- No uses: vale, vosotros, coger, chuleta, mutua, enchufar, currar, móvil, a ojo, se apañe.
- El caso ocurre en un trabajo reconocible (clínica, inmobiliaria, taller, colegio). Los números y las reglas salen de la lección, no de un adorno.
- Si una palabra del original es de España y cambia el sentido en algún país, cámbiala.

## Antes de dar por lista una lección

- El archivo de `claro` tiene el mismo nombre que el de `original`.
- Se entiende sin haber leído el original y sin saber de informática, de inteligencia artificial ni de agentes.
- No se perdió ningún dato, comando, cita, error ni comprobación del original.
- Ninguna explicación se repite en dos secciones.
- El caso es el del módulo, no uno nuevo en cada lección.
- Comandos, ramas y fechas coinciden con el original.
- No quedó una captura sin explicar.
