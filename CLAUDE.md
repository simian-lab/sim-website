# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Simian agency portfolio built with [Eleventy (11ty)](https://www.11ty.dev/) v3. Content is in Spanish.

## Commands

```bash
npm start        # Dev server with hot reload (eleventy --serve)
npm run build    # Production build → public/
```

Node version is pinned in `.nvmrc` (v24). Use `nvm use` before running commands.

## Architecture

**Input:** `src/` → **Output:** `public/`

### Templates

All pages are Nunjucks (`.njk`) in `src/`. Every page uses YAML front matter to declare its layout, metadata, and inline data:

```yaml
---
layout: layouts/base.njk
css: home           # loads public/assets/css/home.css
title: "..."
description: "..."
bodyClass: "home"
ogImage: "..."
proyectos:          # page data defined inline, no _data/ files
  - titulo: "..."
    imagen: "..."
    url: "..."
---
```

`_includes/` organization:
- `layouts/base.njk` — master HTML shell (doctype, head, body wrapper, GTM)
- `partials/` — header, footer (page sections)
- `molecules/` — reusable cards (`card-portafolio.njk`, `card-solucion.njk`)

### Styles

Sass is compiled by a custom 11ty extension in `eleventy.config.js` (not a separate build tool). Files in `src/assets/scss/`:
- `_variables.scss` — design tokens (colors, fonts, spacing)
- `_functions.scss` — px-to-rem converter
- `_base.scss` — global styles, 12-column grid
- One `.scss` per page, matching the `css:` front matter key
- `molecules/` and `organisms/` — component-scoped styles (imported into page files)

Partial files (`_*.scss`) are ignored by the compiler and must be `@use`/`@import`ed.

### Assets

Passthrough copy (no processing):
- `src/assets/js` → `public/assets/js`
- `src/assets/img` → `public/assets/img`
- `src/assets/fonts` → `public/assets/fonts`
- `src/assets/firmas` → `public/images/firmas`

### JavaScript

Single file: `src/assets/js/general.js`. Handles mobile menu toggle and scroll-based `.scroll` body class. No build step, vanilla JS.

### Deployment

Firebase Hosting. Deploy with Firebase CLI (`firebase deploy`). Config in `firebase.json`.

## Adding a New Project (Case Study)

1. Create `src/<slug>.njk` — follow the front matter pattern of an existing project like `src/app-externado.njk`
2. Create `src/assets/scss/<slug>.scss` — import shared partials as needed
3. Add images to `src/assets/img/proyectos/<slug>/`
4. Add the project to the `proyectos` array in `src/portafolio.njk` and `src/index.njk`

## Adding a New Service

Same pattern as projects but reference `src/estrategia-producto-consultoria.njk` and `src/assets/scss/detalle-servicio.scss`.
