# Juego romántico de relacionar palabras 💗

## Archivos
- `index.html` → estructura de la página.
- `styles.css` → diseño y animaciones.
- `script.js` → palabras, lógica del juego y carta.

## Cómo personalizarlo

Abre `script.js`.

### 1. Cambiar las parejas
Busca:

```js
const pairs = [
```

Y cambia los textos de `left` y `right`.

Ejemplo:

```js
{ id: 1, left: "Primera palabra", right: "Su pareja correcta" },
```

Cada `id` debe ser diferente y debe existir una sola vez en cada pareja.

Puedes agregar o quitar parejas.

### 2. Cambiar la carta
Busca:

```js
const letterData = {
```

Y modifica `title`, `body` y `signature`.

## Cómo probarla
Abre `index.html` con tu navegador.

## Cómo compartirla con un QR
Un archivo HTML abierto desde tu computadora NO sirve como enlace para otra persona. Primero debes publicar la carpeta en un servicio de alojamiento estático, por ejemplo GitHub Pages, Netlify o Vercel.

Cuando tengas la URL pública, puedes crear un QR que apunte a esa URL.

Una opción sencilla es generar el QR con cualquier generador de códigos QR introduciendo tu enlace.

También puedo ayudarte a dejarla publicada en GitHub Pages y preparar el enlace/QR cuando tengas el nombre que quieras para la página.
