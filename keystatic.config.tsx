import { config, fields, collection } from '@keystatic/core';
import { block, wrapper } from '@keystatic/core/content-components';

// Usa github mode solo cuando las credenciales OAuth están configuradas (producción).
// Sin credenciales → local mode (sin auth, directo al filesystem).
const storage = process.env.KEYSTATIC_GITHUB_CLIENT_ID
  ? ({
      kind: 'github',
      repo: 'LuisBtz/bodas-web',
    } as const)
  : ({ kind: 'local' } as const);

// ─── Helpers de campos comunes ────────────────────────────────────────────────
const altField  = fields.text({ label: 'Texto alternativo', validation: { isRequired: true } });
const captionField = fields.text({ label: 'Pie de foto (opcional)' });

/** Devuelve fields.image configurado para el directorio correcto por colección */
const imgField = (dir: 'blog' | 'bodas-reales') =>
  fields.image({
    label: 'Imagen',
    directory: `public/${dir}`,
    publicPath: `/${dir}`,
    validation: { isRequired: true },
  });

// ─── Fábrica de componentes por colección ────────────────────────────────────
// Cada colección tiene sus propios bloques para que las imágenes vayan
// al subdirectorio correcto (public/blog vs public/bodas-reales).

function makePhotoComponents(dir: 'blog' | 'bodas-reales') {
  const img = imgField(dir);

  const FullPhoto = block({
    label: 'Foto completa (cinematic)',
    schema: {
      src: img,
      alt: altField,
      caption: captionField,
      aspect: fields.text({ label: 'Relación de aspecto (ej: 16/9, 4/3)', defaultValue: '16 / 9' }),
    },
  });

  const Photo = block({
    label: 'Foto ancho prose',
    schema: {
      src: img,
      alt: altField,
      caption: captionField,
      aspect: fields.text({ label: 'Relación de aspecto (ej: 3/2)', defaultValue: '3 / 2' }),
    },
  });

  // PhotoRow plano: dos fotos como props (sin children, compatible con Keystatic).
  const PhotoRow = block({
    label: 'Fila de fotos (2 lado a lado)',
    schema: {
      src1: img,
      alt1: altField,
      caption1: captionField,
      aspect1: fields.text({ label: 'Aspecto izquierda (ej: 2/3)', defaultValue: '2 / 3' }),
      src2: img,
      alt2: altField,
      caption2: captionField,
      aspect2: fields.text({ label: 'Aspecto derecha (ej: 2/3)', defaultValue: '2 / 3' }),
    },
  });

  return { FullPhoto, Photo, PhotoRow };
}

// Callout y PullQuote usan wrapper (tienen children de texto/markdown).
const CalloutWrapper = wrapper({
  label: 'Callout / Destacado',
  schema: {
    emoji: fields.text({ label: 'Emoji (opcional)' }),
  },
});

const PullQuoteWrapper = wrapper({
  label: 'Pull Quote / Cita grande',
  schema: {
    author: fields.text({ label: 'Autor (opcional)' }),
  },
});

// ─── Config principal ──────────────────────────────────────────────────────────

export default config({
  storage,

  ui: {
    brand: { name: 'Luis Benítez · CMS' },
  },

  collections: {
    // ── Blog ───────────────────────────────────────────────────────────────────
    blog: collection({
      label: 'Blog',
      slugField: 'title',
      path: 'content/blog/*',
      format: { contentField: 'content' },
      entryLayout: 'content',
      columns: ['date', 'status', 'description'],
      schema: {
        title: fields.slug({
          name: {
            label: 'Título',
            validation: { isRequired: true },
          },
        }),
        status: fields.select({
          label: 'Estado',
          options: [
            { label: '📝 Borrador', value: 'draft' },
            { label: '✅ Publicado', value: 'published' },
          ],
          defaultValue: 'draft',
        }),
        date: fields.date({
          label: 'Fecha de publicación',
          validation: { isRequired: true },
        }),
        description: fields.text({
          label: 'Descripción (meta / resumen)',
          multiline: true,
          validation: { isRequired: true },
        }),
        coverImage: fields.image({
          label: 'Foto de portada',
          directory: 'public/blog',
          publicPath: '/blog',
          validation: { isRequired: true },
        }),
        author: fields.text({
          label: 'Autor',
          defaultValue: 'Luis Benítez',
        }),
        tags: fields.array(
          fields.text({ label: 'Tag' }),
          {
            label: 'Tags',
            itemLabel: (props) => props.value || 'Tag',
          }
        ),
        readTime: fields.text({
          label: 'Tiempo de lectura (ej: 6 min)',
        }),
        content: fields.mdx({
          label: 'Contenido',
          components: {
            ...makePhotoComponents('blog'),
            Callout: CalloutWrapper,
            PullQuote: PullQuoteWrapper,
          },
        }),
      },
    }),

    // ── Bodas Reales ───────────────────────────────────────────────────────────
    bodasReales: collection({
      label: 'Bodas Reales',
      slugField: 'title',
      path: 'content/bodas-reales/*',
      format: { contentField: 'content' },
      entryLayout: 'content',
      columns: ['date', 'status', 'location'],
      schema: {
        title: fields.slug({
          name: {
            label: 'Nombres (ej: Ana & Carlos)',
            validation: { isRequired: true },
          },
        }),
        status: fields.select({
          label: 'Estado',
          options: [
            { label: '📝 Borrador', value: 'draft' },
            { label: '✅ Publicado', value: 'published' },
          ],
          defaultValue: 'draft',
        }),
        date: fields.date({
          label: 'Fecha de la boda',
          validation: { isRequired: true },
        }),
        location: fields.text({
          label: 'Venue / Locación',
          validation: { isRequired: true },
        }),
        description: fields.text({
          label: 'Descripción breve',
          multiline: true,
          validation: { isRequired: true },
        }),
        coverImage: fields.image({
          label: 'Foto de portada',
          directory: 'public/bodas-reales',
          publicPath: '/bodas-reales',
          validation: { isRequired: true },
        }),
        tags: fields.array(
          fields.text({ label: 'Tag' }),
          {
            label: 'Tags',
            itemLabel: (props) => props.value || 'Tag',
          }
        ),
        featured: fields.checkbox({
          label: 'Destacada en portada',
          defaultValue: false,
        }),
        content: fields.mdx({
          label: 'Historia de la boda',
          components: {
            ...makePhotoComponents('bodas-reales'),
            Callout: CalloutWrapper,
            PullQuote: PullQuoteWrapper,
          },
        }),
      },
    }),
  },
});
