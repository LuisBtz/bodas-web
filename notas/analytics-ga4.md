# Google Analytics 4 (GA4) y GTM — Configuración completa

## Arquitectura general

El sitio usa **Google Tag Manager (GTM)** como intermediario entre el código Next.js y todas las herramientas de analytics (GA4, Meta Pixel, etc.). Esto significa:

- El código Next.js **no tiene GA4 ni Meta Pixel directamente**
- Next.js solo tiene instalado GTM (un solo script)
- GTM contiene todas las etiquetas, activadores y variables
- Cuando quieres agregar o modificar tracking, vas a GTM — no al código

```
Navegador del usuario
        ↓
    Next.js carga
        ↓
    GTM se carga (GTM-PNTMPFTG)
        ↓
    GTM dispara → GA4
                → Meta Pixel
                → (futuras herramientas)
```

---

## GTM: Container

- **ID**: GTM-PNTMPFTG
- **Dominio**: photography.luisbtz.com
- **Versión publicada**: 4 (Meta Pixel v1)
- **Workspace**: Default Workspace

### Dónde está instalado en el código

`src/app/layout.tsx` — se carga con `strategy="afterInteractive"` de Next.js, lo que significa que se carga después del contenido principal para no bloquear el render de la página.

```typescript
<Script id="gtm-script" strategy="afterInteractive">
  {`(function(w,d,s,l,i){...})(window,document,'script','dataLayer','GTM-PNTMPFTG');`}
</Script>
```

También hay un `<noscript>` en el `<body>` para usuarios sin JavaScript (requerimiento de GTM).

---

## GA4: Configuración

- **Measurement ID**: G-JGW1J1VJXF
- **Plataforma**: Google Analytics 4

### Etiquetas de GA4 en GTM

#### 1. Etiqueta de Google (base)
- **Nombre en GTM**: `Etiqueta de Google G-JGW1J1VJXF`
- **Tipo**: Etiqueta de Google
- **Activador**: Initialization - All Pages
- **Propósito**: Carga la librería base de GA4 en todas las páginas. Es el equivalente al "init" de analytics. Debe dispararse antes que cualquier evento.

#### 2. GA4 - Config Base
- **Nombre en GTM**: `GA4 - Config Base`
- **Tipo**: Google Analytics: evento de GA4
- **Activador**: All Pages
- **Propósito**: Registra la vista de cada página en GA4. Equivale al `page_view` automático. Con esto GA4 sabe cuántas personas visitaron cada página.

#### 3. GA4 - Event form_submit
- **Nombre en GTM**: `GA4 - Event form_submit`
- **Tipo**: Google Analytics: evento de GA4
- **Activador**: Trigger - form_submit (evento personalizado)
- **Propósito**: Registra en GA4 cuando alguien envía el formulario de contacto. Aparece en GA4 como el evento `form_submit`.

#### 4. GA4 - Event whatsapp_click
- **Nombre en GTM**: `GA4 - Event whatsapp_click`
- **Tipo**: Google Analytics: evento de GA4
- **Activador**: Trigger - whatsapp_click (evento personalizado)
- **Propósito**: Registra en GA4 cuando alguien hace clic en el número de WhatsApp. Aparece como `whatsapp_click`.

---

## Cómo el código Next.js habla con GTM

### La función pushEvent

`src/lib/gtm.ts` exporta una función `pushEvent()` que empuja eventos al `dataLayer` — la variable global que GTM escucha.

```typescript
export function pushEvent(payload: GtmEvent) {
  if (typeof window === 'undefined') return; // guard para SSR
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push(payload);
}
```

### Dónde se usa en el proyecto

**Formulario de contacto** (`src/app/contacto/sections/ContactForm.tsx`):
```typescript
useEffect(() => {
  if (state?.ok) {
    pushEvent({ event: 'form_submit', form_id: 'contacto' });
  }
}, [state?.ok]);
```
Se dispara cuando el servidor confirma que el email fue enviado exitosamente.

**Footer** (`src/components/layout/Footer.tsx`):
```typescript
onClick={() => pushEvent({ event: 'whatsapp_click', source: 'footer' })}
```

**ContactForm** (`src/app/contacto/sections/ContactForm.tsx`):
```typescript
onClick={() => pushEvent({ event: 'whatsapp_click', source: 'contacto' })}
```

---

## Activadores (Triggers) configurados en GTM

| Nombre | Tipo | Condición |
|---|---|---|
| All Pages | Vista de página | Todas las páginas |
| Initialization - All Pages | Inicialización | Todas las páginas (se dispara antes que All Pages) |
| Consent Initialization - All Pages | Inicialización del consentimiento | Todas las páginas |
| Trigger - form_submit | Evento personalizado | Cuando dataLayer recibe `{ event: 'form_submit' }` |
| Trigger - whatsapp_click | Evento personalizado | Cuando dataLayer recibe `{ event: 'whatsapp_click' }` |
| Trigger - ViewContent Pages | Vista de página | URL coincide con regex `\/servicios|\/bodas-reales` |

---

## Variables configuradas en GTM

GTM tiene 5 variables integradas activas:
- `Event` — nombre del evento actual
- `Page Hostname` — dominio de la página (photography.luisbtz.com)
- `Page Path` — ruta de la página (/servicios, /contacto, etc.)
- `Page URL` — URL completa
- `Referrer` — de dónde vino el visitante

---

## Qué puedes ver en GA4

Con esta configuración, en tu cuenta de GA4 (G-JGW1J1VJXF) puedes ver:

- **Tiempo real**: visitantes activos ahora mismo, qué páginas están viendo
- **Páginas más visitadas**: /servicios, /bodas-reales, /contacto, etc.
- **Eventos**: cuántos `form_submit` y `whatsapp_click` ocurren por día/semana
- **Fuentes de tráfico**: de dónde vienen tus visitantes (Google, Instagram, directo)
- **Dispositivos**: móvil vs desktop, sistemas operativos

---

## Pendientes de GA4

### Conversiones
Para que GA4 te muestre `form_submit` y `whatsapp_click` como conversiones (no solo eventos), necesitas marcarlos:

1. En GA4 → Configurar → Eventos
2. Busca `form_submit` → activar el toggle "Marcar como conversión"
3. Repetir con `whatsapp_click`

Esto es importante para ver el "Tasa de conversión" en los reportes.

### Cuando crees la landing del brochure
Agregar un nuevo `pushEvent({ event: 'lead_magnet_download' })` cuando el usuario reciba el brochure, y crear la etiqueta correspondiente en GTM tanto para GA4 como para Meta Pixel (evento `Lead`).

---

## Flujo completo para agregar un nuevo evento

Si en el futuro quieres trackear algo nuevo (ej: clic en un botón de Instagram):

1. En el código Next.js, donde ocurre la acción:
   ```typescript
   pushEvent({ event: 'instagram_click', source: 'header' });
   ```

2. En GTM → Activadores → Nuevo:
   - Tipo: Evento personalizado
   - Nombre del evento: `instagram_click`
   - Nombre: `Trigger - instagram_click`

3. En GTM → Etiquetas → Nueva (para GA4):
   - Tipo: Google Analytics: evento de GA4
   - Nombre del evento: `instagram_click`
   - Activador: el que acabas de crear

4. En GTM → Etiquetas → Nueva (para Meta, si aplica):
   - Tipo: HTML personalizado
   - Código: `<script>fbq('trackCustom', 'InstagramClick');</script>`
   - Activador: el mismo

5. Publicar en GTM → Enviar
