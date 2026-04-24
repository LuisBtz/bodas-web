# Meta Pixel — Estado actual y pendientes

## Contexto: por qué esto es confuso

Meta tiene dos conceptos que suenan igual pero son distintos:

- **Dataset de App**: se crea cuando configuras tracking para una app móvil (iOS/Android). Tiene secciones como SKAdNetwork, iOS 14 attribution, etc.
- **Dataset Web (Pixel)**: se crea para sitios web. Tiene secciones de CAPI, verificación de dominio, GTM, etc.

**El problema que encontramos**: "LBP Website" (ID `1232475401574959`) fue creado originalmente como dataset de App, no como Web. A pesar de eso, el código del Pixel de Meta funciona en el navegador porque el script de `fbevents.js` no distingue — manda datos a cualquier dataset. Por eso el Pixel Helper lo detecta y los eventos llegan.

Sin embargo, cuando intentamos generar el token de CAPI (API de Conversiones), ese flujo requiere un dataset de tipo Web con configuración específica, que este dataset no tiene.

---

## Lo que SÍ está configurado y funcionando

### 1. Pixel de Meta (browser-side) via GTM
**Qué es**: Un pequeño script de JavaScript que se carga en el navegador del visitante y envía eventos a Meta.

**Para qué sirve**: Permite a Meta saber quién visita tu sitio, qué páginas ve, si llena formularios, etc. Con eso Meta puede:
- Crear audiencias personalizadas (ej: personas que visitaron /servicios)
- Hacer retargeting (mostrar anuncios a quienes ya te visitaron)
- Optimizar campañas hacia conversiones reales

**Cómo está instalado**: A través de Google Tag Manager (GTM-PNTMPFTG). El GTM ya estaba instalado en el código Next.js (`src/app/layout.tsx`), y desde GTM se inyecta el Pixel automáticamente. No hay código del Pixel directamente en el proyecto.

**Pixel ID**: `1232475401574959`

**Verificado con**: Meta Pixel Helper (extensión de Chrome) — confirmado activo.

### 2. Eventos configurados en GTM

| Etiqueta GTM | Evento Meta | Cuándo se dispara |
|---|---|---|
| Meta Pixel - PageView | PageView | En todas las páginas |
| Meta Pixel - ViewContent | ViewContent | Al visitar /servicios o /bodas-reales |
| Meta Pixel - Contact | Contact | Al enviar el formulario de contacto |
| Meta Pixel - WhatsApp | Contact | Al hacer clic en el número de WhatsApp |

**Cómo funcionan los eventos**: El código Next.js ya tenía una función `pushEvent()` en `src/lib/gtm.ts` que manda eventos al `dataLayer` de GTM. GTM escucha esos eventos y dispara las etiquetas correspondientes de Meta.

- `form_submit` → dispara "Meta Pixel - Contact"
- `whatsapp_click` → dispara "Meta Pixel - WhatsApp"

### 3. Dominio verificado en Meta Business Manager
**Qué es**: Meta requiere que pruebes que eres dueño del dominio antes de poder optimizar campañas post-iOS 14.

**Para qué sirve**: Sin verificación, Meta no puede atribuir conversiones correctamente a tus anuncios cuando el usuario usa iOS. También es requisito para configurar eventos prioritarios de conversión.

**Cómo se hizo**: Se agregó un meta-tag en `src/app/layout.tsx`:
```typescript
other: {
  'facebook-domain-verification': 'c95ox9874sq5itv5v2d39rtdmr1glf',
},
```

**Estado**: Verificado ✅

---

## Lo que NO está configurado y por qué

### API de Conversiones (CAPI)
**Qué es**: Un sistema que envía los mismos eventos (PageView, Contact, etc.) pero desde el servidor de Vercel directamente a Meta, en lugar de desde el navegador del usuario.

**Por qué es importante en 2026**:
- Los bloqueadores de anuncios bloquean el Pixel del navegador
- iOS 14+ restringe el tracking en Safari
- CAPI bypassa todo eso porque va de servidor a servidor
- Meta recomienda usar ambos (Pixel + CAPI) para mayor cobertura

**Por qué no está configurado**: El dataset "LBP Website" es de tipo App, no Web. El flujo de generación de token de CAPI no está disponible para datasets de App. Intentamos varias rutas (System Users, Integraciones con socios) pero todas bloquearon.

**Qué se necesita para configurarlo**:
1. Crear un nuevo dataset de tipo Web en Events Manager → "Conectar datos" → seleccionar "Web" (NO App)
2. Ese dataset tendrá la opción de generar el token de CAPI en su pestaña "Configuración"
3. Guardar el token en Vercel como variable de entorno `META_CAPI_TOKEN`
4. Crear el archivo `src/app/api/meta-capi/route.ts` (el código ya está documentado)
5. Llamar ese endpoint desde `src/app/actions/sendContactFull.ts` al enviar el formulario

**Cuándo hacerlo**: Antes de lanzar tu primera campaña de pago. El Pixel browser-side es suficiente para recopilar audiencias, pero CAPI es necesario para optimización de conversiones con iOS.

---

## Decisiones importantes tomadas

### Eventos: Contact vs Lead
- El formulario de contacto en `/contacto` dispara **Contact** (no Lead)
- Esto es intencional: "Lead" está reservado para la futura landing page con brochure descargable, que será un lead más calificado
- Cuando crees esa landing, agregar una etiqueta GTM "Meta Pixel - Lead" con su propio trigger

### Pixel Helper detecta "Contact" dos veces en /contacto
Esto es normal y correcto:
- Uno viene del formulario enviado (Trigger - form_submit)
- El otro viene del clic en WhatsApp (Trigger - whatsapp_click)
Los dos eventos son "Contact" porque ambos son formas de contacto directo.

---

## Estructura de archivos relevantes

```
src/
├── app/
│   ├── layout.tsx              ← GTM instalado + facebook-domain-verification
│   ├── actions/
│   │   └── sendContactFull.ts  ← Aquí iría la llamada a CAPI cuando se configure
│   └── contacto/
│       └── sections/
│           └── ContactForm.tsx ← Dispara pushEvent({ event: 'form_submit' })
├── components/
│   └── layout/
│       └── Footer.tsx          ← Dispara pushEvent({ event: 'whatsapp_click' })
└── lib/
    └── gtm.ts                  ← Función pushEvent() que alimenta el dataLayer
```

---

## IDs importantes

| Recurso | ID |
|---|---|
| GTM Container | GTM-PNTMPFTG |
| Meta Pixel / Dataset | 1232475401574959 |
| Meta Business ID | 730285573314219 |
| System User (Capiserver) | 61560598795570 |
