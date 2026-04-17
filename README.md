# Luis Benítez Photography — Sitio oficial

Sitio web de fotografía y video de bodas en Monterrey. Next.js 15 (App Router)
con contenido editable vía Keystatic (MDX en disco) y envío de consultas por
Resend.

Producción: https://photography.luisbtz.com

## Stack

- **Next.js 15** + React 19 (App Router, Turbopack).
- **styled-components** para estilos.
- **Keystatic** como CMS local (blog + bodas reales en `content/`).
- **Resend** para el formulario de contacto.
- **Zod** para validación de inputs.
- **MDX** (`next-mdx-remote`) con componentes custom (`<Photo>`, `<PhotoRow>`,
  `<Carousel>`, `<Callout>`).
- **Vercel** para deploy.

## Scripts

```bash
npm run dev      # Dev server con Turbopack (http://localhost:3000)
npm run build    # Build de producción
npm run start    # Server de producción
npm run lint     # ESLint
```

## Estructura

```
content/
  blog/                 # Posts del blog (MDX)
  bodas-reales/         # Casos de estudio (MDX)
  galeria/index.json    # Fotos del portfolio home
public/
  blog/<slug>/          # Imágenes por post
  bodas-reales/<slug>/  # Imágenes por boda
  galeria/              # Fotos del portfolio
src/
  app/
    (home)/             # Homepage (route group, resuelve en /)
    blog/               # Listado + post dinámico
    bodas-reales/       # Listado + caso dinámico
    servicios, sobre-mi, contacto, fotografias
    admin/              # Panel de admin (dev-only)
    api/                # API routes (instagram, keystatic, gallery upload)
    actions/            # Server actions (envío de mails)
  components/           # layout, ui, mdx, providers
  lib/                  # acceso a content (blog, bodas-reales, galeria)
keystatic.config.tsx    # Schema de colecciones para el CMS
```

## Variables de entorno

Producción (Vercel):

| Variable | Para qué |
|---|---|
| `RESEND_API_KEY` | Envío de mails desde los forms |
| `MAIL_FROM` | Remitente (ej. `Luis Benítez <contacto@luisbtz.com>`) |
| `MAIL_TO` | Destinatario(s), separados por coma |
| `IG_USER_ID` | (opcional) Instagram Graph API — feed del footer |
| `IG_ACCESS_TOKEN` | (opcional) Instagram Graph API |

Desarrollo local (`.env.local`):

```
RESEND_API_KEY=re_...
MAIL_FROM=Luis Benítez <contacto@luisbtz.com>
MAIL_TO=luisbttf@gmail.com
ADMIN_SECRET=clave_para_proteger_/admin_en_dev
```

`ADMIN_SECRET` **no** es necesaria en producción: las rutas admin están
bloqueadas vía middleware (ver más abajo).

## Contenido

Todo el contenido es MDX en `content/`, versionado en git. Dos flujos para
editarlo:

### a) Keystatic (recomendado)

```bash
npm run dev
# → http://localhost:3000/keystatic
```

Edición visual con preview. Al guardar, escribe los `.mdx` y las imágenes en
disco. Después, `git add` + `commit` + `push` → Vercel redespliega.

### b) Editar `.mdx` a mano

Los archivos en `content/blog/` y `content/bodas-reales/` son MDX con
frontmatter. Las imágenes van en `public/<coleccion>/<slug>/`. Componentes
disponibles: `<Photo>`, `<PhotoRow>`, `<Carousel>`, `<Callout>` (ver
`keystatic.config.tsx`).

Los posts con `status: draft` no se publican (quedan fuera del sitemap).

## Admin y seguridad

`/admin`, `/keystatic`, `/api/keystatic/*` y `/api/gallery/*` son
**dev-only**. El middleware (`src/middleware.ts`) devuelve 404 para todas
esas rutas cuando `NODE_ENV === 'production'`. En Vercel:

- No hace falta configurar OAuth de GitHub para Keystatic.
- No hace falta `ADMIN_SECRET`.
- Cualquier intento de acceso público al CMS devuelve 404.

Para editar en producción: `npm run dev` local → commit → push. Simple.

## SEO

- Metadata por página (`generateMetadata` en rutas dinámicas).
- `sitemap.ts` auto-genera rutas estáticas + dinámicas (solo `published`).
- `robots.ts` bloquea `/admin/` y `/keystatic/` para crawlers.
- JSON-LD `LocalBusiness` en la home.
- OG + Twitter cards en layout + por página.

## Deploy

Vercel detecta Next.js automáticamente. Build command: `npm run build`,
Output: `.next`, Node: 20+.

Tras setear las env vars, cada `git push origin main` dispara deploy.
