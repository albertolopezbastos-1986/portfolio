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

## Publicar en GitHub Pages

El workflow `.github/workflows/deploy-pages.yml` valida JavaScript y publica únicamente `dist/`. Se ejecuta con cada push a `main` y también de forma manual. No requiere instalar dependencias, configurar secretos ni ejecutar el servidor local en GitHub.

### Configuración inicial en GitHub

1. Abrir el repositorio que contiene este código en GitHub. Si usás GitHub Free, el repositorio debe ser público para usar Pages.
2. Entrar en **Settings → Pages**.
3. En **Build and deployment → Source**, seleccionar **GitHub Actions**. No elegir una rama ni la carpeta `/docs`.
4. Entrar en **Actions → Deploy portfolio to GitHub Pages**. Si GitHub pide habilitar Actions para el repositorio, habilitarlo.
5. Seleccionar **Run workflow**, elegir **main** y confirmar **Run workflow**. El archivo del workflow debe estar subido a esa rama para que aparezca.
6. Esperar a que el job `deploy` termine en verde. Abrir el enlace del environment **github-pages** o volver a **Settings → Pages → Visit site**.

La dirección habitual es `https://USUARIO.github.io/portfolio/`. Usar el enlace devuelto por GitHub como dirección definitiva. Los assets usan rutas relativas para funcionar dentro de `/portfolio/` y también en un dominio propio.

### Actualizaciones

Editar los archivos de `dist/`, hacer commit y push a `main`. GitHub Actions publica la nueva versión automáticamente.

### Si falla

- **No aparece el workflow:** comprobar que `.github/workflows/deploy-pages.yml` está en `main` en GitHub.
- **Pages no configurado o error 404 en Configure GitHub Pages:** seleccionar **GitHub Actions** en **Settings → Pages** y volver a ejecutar el workflow.
- **Actions deshabilitado o bloqueado:** revisar **Settings → Actions → General** y permitir las acciones oficiales usadas por el workflow, si las políticas de la cuenta lo permiten.
- **Deployment pendiente de aprobación:** revisar el environment **github-pages** y aprobar el despliegue desde la ejecución de Actions si tiene revisores configurados.

Documentación oficial: https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site

## Publicar desde la terminal o desde este chat

Después de editar el sitio, ejecutar desde la carpeta del proyecto:

```sh
npm run deploy -- -m "Describe el cambio"
```

El comando valida JavaScript, exige estar en `main`, prepara los archivos del sitio, crea un commit cuando hay cambios y hace push a `origin/main`. Si falla el push, el commit queda local y podés reintentar el mismo comando. No hace force push ni mezcla ramas automáticamente. Usa el alias y la clave SSH configurados en el repositorio.

Los archivos que publica son `dist/`, `scripts/`, `.github/`, `package.json`, `package-lock.json`, `README.md` y `.gitignore` cuando existen. No agrega archivos externos a esa lista. Si ya hay archivos de otras rutas preparados en Git, pide revisarlos antes de continuar.

Para comprobar sin crear commits ni subir nada:

```sh
npm run deploy:check
```

También podés pedir en este chat: **“Aplicá estos cambios y publicalos en GitHub Pages”**. El flujo es el mismo: validar, commit y push. El push inicia el workflow de GitHub Actions; la publicación queda confirmada cuando el job de Pages termina en verde. Estado: https://github.com/albertolopezbastos-1986/portfolio/actions

La primera configuración de **Settings → Pages → Source → GitHub Actions** sigue siendo necesaria una sola vez.
