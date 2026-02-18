# Simian Website

Sitio web corporativo de [Simian](https://simian.com.co), construido con **Eleventy (11ty)** y **Sass**, desplegado en **Firebase Hosting**.

## Stack

- **[Eleventy 3.x](https://www.11ty.dev/)** — Static Site Generator con plantillas Nunjucks (`.njk`)
- **[Sass](https://sass-lang.com/)** — Compilado directamente por Eleventy via extensión personalizada
- **[Firebase Hosting](https://firebase.google.com/docs/hosting)** — Deploy y CDN de producción
- **Google Analytics** — Seguimiento via GA4 (`G-50YE9GPTJM`)

## Estructura del proyecto

```
sim-website/
├── src/                          # Fuente principal (input de Eleventy)
│   ├── _includes/
│   │   ├── layouts/
│   │   │   └── base.njk          # Layout base HTML con head, header y footer
│   │   ├── molecules/
│   │   │   ├── card-portafolio.njk
│   │   │   └── card-solucion.njk
│   │   └── partials/
│   │       ├── header.njk
│   │       └── footer.njk
│   ├── assets/
│   │   ├── scss/                 # Estilos por página + partials compartidos
│   │   │   ├── _base.scss
│   │   │   ├── _variables.scss
│   │   │   ├── _functions.scss
│   │   │   ├── molecules/
│   │   │   ├── organisms/
│   │   │   ├── home.scss
│   │   │   ├── servicios.scss
│   │   │   ├── portafolio.scss
│   │   │   ├── conocenos.scss
│   │   │   ├── contacto.scss
│   │   │   └── ...
│   │   ├── js/
│   │   │   └── general.js        # JS general del sitio
│   │   ├── img/                  # Imágenes organizadas por sección
│   │   └── fonts/
│   │       └── icofont/          # Icon font
│   ├── index.njk                 # Home
│   ├── servicios.njk
│   ├── portafolio.njk
│   ├── conocenos.njk
│   ├── contacto.njk
│   ├── diseno-centrado-en-el-usuario.njk
│   ├── estrategia-producto-consultoria.njk
│   ├── app-externado.njk         # Caso de estudio
│   ├── salud-total.njk           # Caso de estudio
│   ├── noticiero-90-minutos.njk  # Caso de estudio
│   ├── privacy-policy.njk
│   └── cookies.njk
├── public/                       # Output generado por Eleventy (no commitear)
├── eleventy.config.js            # Configuración de Eleventy + compilación Sass
├── firebase.json                 # Configuración de Firebase Hosting
├── package.json
└── .nvmrc                        # Versión de Node recomendada
```

## Instalación

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Iniciar servidor de desarrollo** (con hot reload):
   ```bash
   npm start
   ```

3. **Generar build de producción:**
   ```bash
   npm run build
   ```

   El output se genera en la carpeta `public/`.

## Scripts disponibles

| Comando | Descripción |
|---|---|
| `npm start` | Servidor local con `eleventy --serve` y watch |
| `npm run build` | Build estática en `public/` |

## Cómo funciona el build

Eleventy está configurado en `eleventy.config.js` con las siguientes características:

- **Input:** `src/` → **Output:** `public/`
- **Sass:** Los archivos `.scss` (sin prefijo `_`) se compilan a `public/assets/css/<nombre>.css` automáticamente vía extensión personalizada de Eleventy.
- **Passthrough copy:** `js`, `img` y `fonts` se copian directamente a `public/assets/`.
- En modo `build`, la carpeta `public/` se limpia antes de generar.

## Páginas

| Ruta | Plantilla |
|---|---|
| `/` | `index.njk` |
| `/servicios/` | `servicios.njk` |
| `/portafolio/` | `portafolio.njk` |
| `/conocenos/` | `conocenos.njk` |
| `/contacto/` | `contacto.njk` |
| `/diseno-centrado-en-el-usuario/` | `diseno-centrado-en-el-usuario.njk` |
| `/estrategia-producto-consultoria/` | `estrategia-producto-consultoria.njk` |
| `/app-externado/` | `app-externado.njk` |
| `/salud-total/` | `salud-total.njk` |
| `/noticiero-90-minutos/` | `noticiero-90-minutos.njk` |
| `/privacy-policy/` | `privacy-policy.njk` |
| `/cookies/` | `cookies.njk` |

## Deploy

El sitio se despliega en Firebase Hosting. La carpeta `public/` es el directorio público configurado en `firebase.json`.

```bash
# Instalar Firebase CLI si no está instalado
npm install -g firebase-tools

# Deploy manual
firebase deploy
```

## Tipografías

- **Vollkorn** (400, 600, 700) — Títulos
- **Source Sans Pro** (300, 400, 600, 700) — Cuerpo de texto
- **IcoFont** — Icon font local

## Fuentes de datos (Front Matter)

Las páginas usan Front Matter en YAML para pasar datos a las plantillas. Ejemplo en `index.njk`:

```yaml
---
layout: layouts/base.njk
css: home
title: "Simian: Desarrollo web, WordPress y automatizaciones con IA"
bodyClass: "home"
proyectos:
  - imagen: "..."
    titulo: "..."
    url: "..."
soluciones: [...]
empresas: [...]
---
```

## Licencia

ISC
