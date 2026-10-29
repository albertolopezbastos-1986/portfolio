# Alberto Lopez Bastos — Portfolio

Portfolio estático en español e inglés, con modo claro y oscuro. Sin dependencias de compilación.

## Desarrollo local

Requiere Node.js 18 o superior. No hace falta instalar dependencias.

```sh
cd shopify-portfolio
npm run dev
```

Abrir http://localhost:5173. Si clonaste el repo directamente, ejecutá el comando desde la carpeta que contiene `package.json`.

- `npm run dev`: servidor local; recargá el navegador para ver cambios.
- `npm start`: iniciar el servidor local.
- `npm run preview`: previsualizar el sitio estático.
- `npm run check`: comprobar la sintaxis de JavaScript.

Podés cambiar el puerto con `PORT=3000 npm run dev` (Linux/macOS/WSL) o `$env:PORT=3000; npm run dev` (PowerShell). Para acceder desde otros dispositivos en tu red, usá `HOST=0.0.0.0 npm run dev` y abrí la IP de tu equipo con el puerto elegido.

Detener el servidor con `Ctrl+C`.

## Contenido

- `dist/index.html`: estructura y metadatos.
- `dist/style.css`: estilos responsive y variables de ambos temas.
- `dist/app.js`: traducciones, proyectos, filtros y preferencias locales.
- `dist/assets`: imágenes de las marcas proporcionadas.

La lista contiene las 35 URLs únicas provistas por Alberto. Las tarjetas enlazan a las tiendas en una pestaña nueva. El contacto dirige al LinkedIn proporcionado. No se incluyen métricas, cargos, antigüedad ni tareas específicas por proyecto sin confirmar.

Las imágenes pertenecen a sus respectivas marcas. La tipografía DM Sans y Manrope se carga desde Google Fonts, con alternativas sans-serif locales.

La publicación inicial de Sites es privada. La configuración está en `.openai/hosting.json`.
