# Módulo 7 · Resumen de la clase en vivo

Texto original: `original/modulo-7/Transcripcion`  
Video: [Sesión 7 — AI For Polyrepo Projects](https://vimeo.com/1243984051/044f179c08)

La transcripción que hay en el repositorio es solo el cierre. Empieza en el minuto 1:53 y dura cerca de un minuto. Esto es todo lo que ese archivo alcanza a contar.

## En una frase

En un polirepo, un sistema repartido en varios repositorios, no basta con que hoy haya salido bien. Hace falta un mecanismo que lo ejecute y deje evidencia.

## Palabras que vas a escuchar

- **Polirepo.** El código del mismo sistema vive en varios repositorios. Cada uno tiene su propio historial.
- **Alcance (scope).** El trozo exacto que le pediste a la herramienta. No es todo el comportamiento.
- **Capacidad (capability).** El comportamiento completo del que hablas. Puede ser más grande que el alcance que pediste.
- **Gobierno.** Poder señalar qué mecanismo hace cumplir una regla. Si no puedes señalarlo, tienes una expectativa, no un control.
- **Evidencia.** Algo que puedes mostrar de que ese mecanismo corrió. No es la sensación de que esta vez funcionó.

## Tres demos, la misma historia

El cierre junta tres pruebas. La historia es la misma. Cambian los artefactos.

**1. Bloquear al agente no es gobernar el bloqueo.**

El agente podía editar. En la grabación se oye «Cloud». En la clase lo bloquearon. Eso no significa que hubiera un gobierno de ese bloqueo. Que hoy no pueda editar no prueba que el bloqueo esté bajo control.

**2. Verde en un repositorio puede romper otro.**

El productor, las pruebas y el build estaban en verde. Aun así, el sistema perdió un dato. El verde que aparecía en un repositorio generó un error en otro repositorio que en ese momento no se tocó. Un resultado verde no avisa del daño que se fue a otro lado.

**3. Cumplir el alcance no completa la capacidad.**

OpenSpec pudo completar exactamente el alcance que le dieron. La capacidad de la que hablaban seguía incompleta. Hizo el trozo pedido. No cubrió el comportamiento entero.

## La pregunta para llevarse

Cuando trabajes en un polirepo, pregúntate esto:

¿Esto se cumple porque existe un mecanismo que lo ejecuta y deja evidencia, o porque hoy el sistema tuvo la suerte de leer, inferir o conservar algo?

A veces hay suerte y el sistema sí lo lee. Puede que ahí no falle. Si no puedes señalar el mecanismo, el alcance o la evidencia, todavía no tienes gobierno. Tienes una expectativa.

Lo que hay que tener claro en un polirepo son tres cosas: mecanismos, gobierno y evidencia.

## Cómo cerró

La clase se pasó ocho minutos. Quedó una pregunta de Emma. La respuesta iba por el chat, no en la sesión.
