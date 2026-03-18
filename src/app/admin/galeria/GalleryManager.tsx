'use client';

import { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import type { GalleryPhoto } from '@/lib/gallery';
import {
  saveGalleryOrder,
  uploadGalleryImages,
  removeGalleryImage,
} from '@/app/actions/gallery';
import { adminLogout } from '@/app/actions/adminAuth';

export default function GalleryManager({
  initialPhotos,
}: {
  initialPhotos: GalleryPhoto[];
}) {
  const [photos, setPhotos] = useState(initialPhotos);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [toast, setToast] = useState('');
  const [dragOver, setDragOver] = useState<number | null>(null);
  const dragIdx = useRef<number | null>(null);
  const dragOverIdx = useRef<number | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2500);
  };

  /* ── Drag and drop ── */
  const onDragStart = (e: React.DragEvent, i: number) => {
    dragIdx.current = i;
    e.dataTransfer.effectAllowed = 'move';
  };

  const onDragOver = (e: React.DragEvent, i: number) => {
    e.preventDefault();
    dragOverIdx.current = i;
    setDragOver(i);
  };

  const onDragLeave = () => setDragOver(null);

  const onDrop = () => {
    const from = dragIdx.current;
    const to = dragOverIdx.current;
    setDragOver(null);
    if (from === null || to === null || from === to) return;

    setPhotos((prev) => {
      const next = [...prev];
      const [moved] = next.splice(from, 1);
      next.splice(to, 0, moved);
      return next;
    });
    setDirty(true);
    dragIdx.current = null;
    dragOverIdx.current = null;
  };

  const onDragEnd = () => setDragOver(null);

  /* ── Move with arrows ── */
  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= photos.length) return;
    setPhotos((prev) => {
      const next = [...prev];
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });
    setDirty(true);
  };

  /* ── Save ── */
  const save = async () => {
    setSaving(true);
    await saveGalleryOrder(photos);
    setDirty(false);
    setSaving(false);
    showToast('Galería guardada');
  };

  /* ── Upload ── */
  const onUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;

    setUploading(true);
    const fd = new FormData();
    for (const f of Array.from(files)) fd.append('files', f);

    const result = await uploadGalleryImages(fd);
    if (result.photos) setPhotos(result.photos);
    setUploading(false);
    showToast(`${files.length} foto(s) agregada(s)`);

    if (fileRef.current) fileRef.current.value = '';
  };

  /* ── Remove ── */
  const remove = async (i: number) => {
    if (!confirm('¿Eliminar esta foto de la galería?')) return;
    await removeGalleryImage(i);
    setPhotos((prev) => prev.filter((_, idx) => idx !== i));
    showToast('Foto eliminada');
  };

  /* ── Alt text ── */
  const updateAlt = useCallback((i: number, alt: string) => {
    setPhotos((prev) => {
      const next = [...prev];
      next[i] = { ...next[i], alt };
      return next;
    });
    setDirty(true);
  }, []);

  /* ── Logout ── */
  const logout = async () => {
    await adminLogout();
    router.push('/admin/login');
  };

  return (
    <>
      {/* CSS for hover effects */}
      <style>{`
        .gm-card:hover .gm-remove { opacity: 1 !important; }
        .gm-card:hover { box-shadow: 0 4px 12px rgba(0,0,0,0.08) !important; }
        .gm-alt:focus { border-color: #999 !important; background: #fff !important; }
        .gm-arrow:hover:not(:disabled) { background: #f5f5f5 !important; }
        .gm-toplink:hover { color: rgba(255,255,255,0.9) !important; }
        .gm-upload:hover { border-color: #aaa !important; }
      `}</style>

      <div style={S.shell}>
        {/* ── Top bar ── */}
        <header style={S.topBar}>
          <div style={S.topLeft}>
            <span style={S.logo}>LB</span>
            <span style={S.topDivider} />
            <span style={S.topLabel}>Admin</span>
            <span style={S.topDivider} />
            <span style={S.topSection}>Galería</span>
          </div>
          <div style={S.topRight}>
            <a
              href="/"
              target="_blank"
              rel="noopener"
              className="gm-toplink"
              style={S.topLink}
            >
              Ver sitio &rarr;
            </a>
            <span style={S.topDivider} />
            <button
              onClick={logout}
              className="gm-toplink"
              style={{ ...S.topLink, background: 'none', border: 'none' }}
            >
              Cerrar sesión
            </button>
          </div>
        </header>

        <div style={S.page}>
          {/* ── Toolbar ── */}
          <div style={S.toolbar}>
            <div>
              <h1 style={S.title}>Galería de fotografías</h1>
              <p style={S.subtitle}>
                {photos.length} foto{photos.length !== 1 ? 's' : ''}
                &nbsp;&middot;&nbsp; Arrastra para reordenar
              </p>
            </div>
            <div style={S.actions}>
              <label className="gm-upload" style={S.uploadBtn}>
                {uploading ? 'Subiendo…' : '+ Agregar fotos'}
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={onUpload}
                  style={{ display: 'none' }}
                />
              </label>
              <button
                onClick={save}
                disabled={!dirty || saving}
                style={{
                  ...S.saveBtn,
                  opacity: dirty ? 1 : 0.3,
                  cursor: dirty ? 'pointer' : 'default',
                }}
              >
                {saving ? 'Guardando…' : 'Guardar cambios'}
              </button>
            </div>
          </div>

          {/* ── Unsaved indicator ── */}
          {dirty && (
            <div style={S.unsaved}>
              Tienes cambios sin guardar
            </div>
          )}

          {/* ── Toast ── */}
          {toast && <div style={S.toast}>{toast}</div>}

          {/* ── Grid ── */}
          <div style={S.grid}>
            {photos.map((p, i) => (
              <div
                key={p.image + i}
                className="gm-card"
                draggable
                onDragStart={(e) => onDragStart(e, i)}
                onDragOver={(e) => onDragOver(e, i)}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
                onDragEnd={onDragEnd}
                style={{
                  ...S.card,
                  outline:
                    dragOver === i ? '2px solid #333' : '1px solid #eaeaea',
                  outlineOffset: -1,
                }}
              >
                {/* Thumbnail */}
                <div style={S.thumb}>
                  <Image
                    src={p.image}
                    alt={p.alt || ''}
                    fill
                    sizes="220px"
                    style={{ objectFit: 'cover' }}
                    draggable={false}
                  />

                  <span style={S.badge}>{i + 1}</span>

                  <button
                    className="gm-remove"
                    onClick={() => remove(i)}
                    style={S.removeBtn}
                    title="Eliminar foto"
                  >
                    ✕
                  </button>
                </div>

                {/* Footer */}
                <div style={S.cardFooter}>
                  <input
                    type="text"
                    className="gm-alt"
                    placeholder="Alt text…"
                    value={p.alt}
                    onChange={(e) => updateAlt(i, e.target.value)}
                    style={S.altInput}
                  />
                  <div style={S.arrows}>
                    <button
                      className="gm-arrow"
                      onClick={() => move(i, -1)}
                      disabled={i === 0}
                      style={{
                        ...S.arrowBtn,
                        opacity: i === 0 ? 0.2 : 1,
                      }}
                      title="Mover antes"
                    >
                      ‹
                    </button>
                    <button
                      className="gm-arrow"
                      onClick={() => move(i, 1)}
                      disabled={i === photos.length - 1}
                      style={{
                        ...S.arrowBtn,
                        opacity: i === photos.length - 1 ? 0.2 : 1,
                      }}
                      title="Mover después"
                    >
                      ›
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {!photos.length && (
            <div style={S.empty}>
              <p style={S.emptyTitle}>Sin fotografías</p>
              <p style={S.emptyText}>
                Usa el botón &quot;+ Agregar fotos&quot; para comenzar a
                construir tu galería.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

/* ── Styles ── */
const S: Record<string, React.CSSProperties> = {
  shell: {
    minHeight: '100dvh',
    background: '#f5f5f5',
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    color: '#1a1a1a',
  },
  /* ── Top bar ── */
  topBar: {
    position: 'sticky',
    top: 0,
    zIndex: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 24px',
    height: 48,
    background: '#141414',
    color: '#fff',
    fontSize: 12,
  },
  topLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },
  logo: {
    fontWeight: 700,
    fontSize: 13,
    letterSpacing: '0.1em',
  },
  topLabel: {
    opacity: 0.4,
    fontSize: 10,
    letterSpacing: '0.14em',
    textTransform: 'uppercase' as const,
  },
  topSection: {
    fontSize: 12,
    fontWeight: 500,
    opacity: 0.8,
  },
  topDivider: {
    width: 1,
    height: 14,
    background: 'rgba(255,255,255,0.12)',
    display: 'inline-block',
  },
  topRight: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },
  topLink: {
    color: 'rgba(255,255,255,0.45)',
    fontSize: 11,
    letterSpacing: '0.04em',
    cursor: 'pointer',
    textDecoration: 'none',
    padding: '4px 0',
    transition: 'color 0.15s',
  },
  /* ── Page ── */
  page: {
    maxWidth: 1200,
    margin: '0 auto',
    padding: '28px 28px 80px',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    flexWrap: 'wrap' as const,
    gap: 16,
    marginBottom: 24,
    paddingBottom: 20,
    borderBottom: '1px solid #e2e2e2',
  },
  title: {
    fontSize: 18,
    fontWeight: 600,
    margin: 0,
    letterSpacing: '-0.01em',
  },
  subtitle: {
    fontSize: 12,
    color: '#999',
    margin: '4px 0 0',
  },
  actions: {
    display: 'flex',
    gap: 8,
  },
  uploadBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '7px 14px',
    fontSize: 12,
    fontWeight: 500,
    border: '1px solid #d0d0d0',
    borderRadius: 6,
    background: '#fff',
    cursor: 'pointer',
    transition: 'border-color 0.15s',
  },
  saveBtn: {
    padding: '7px 16px',
    fontSize: 12,
    fontWeight: 600,
    border: 'none',
    borderRadius: 6,
    background: '#1a1a1a',
    color: '#fff',
    transition: 'opacity 0.15s',
  },
  unsaved: {
    marginBottom: 16,
    padding: '8px 14px',
    background: '#fffbe6',
    border: '1px solid #f0e6a0',
    borderRadius: 6,
    fontSize: 12,
    color: '#8a7a00',
    fontWeight: 500,
  },
  toast: {
    position: 'fixed' as const,
    bottom: 24,
    left: '50%',
    transform: 'translateX(-50%)',
    background: '#1a1a1a',
    color: '#fff',
    padding: '10px 24px',
    borderRadius: 8,
    fontSize: 13,
    fontWeight: 500,
    zIndex: 200,
    boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
  },
  /* ── Grid ── */
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(185px, 1fr))',
    gap: 12,
  },
  card: {
    borderRadius: 8,
    overflow: 'hidden',
    background: '#fff',
    cursor: 'grab',
    transition: 'box-shadow 0.15s, outline-color 0.1s',
    boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
  },
  thumb: {
    position: 'relative' as const,
    width: '100%',
    aspectRatio: '1',
    overflow: 'hidden',
    background: '#f0ece8',
  },
  badge: {
    position: 'absolute' as const,
    top: 8,
    left: 8,
    background: 'rgba(0,0,0,0.6)',
    color: '#fff',
    fontSize: 10,
    fontWeight: 600,
    padding: '2px 8px',
    borderRadius: 4,
    backdropFilter: 'blur(4px)',
  },
  removeBtn: {
    position: 'absolute' as const,
    top: 6,
    right: 6,
    width: 26,
    height: 26,
    border: 'none',
    borderRadius: 5,
    background: 'rgba(200,50,50,0.75)',
    color: '#fff',
    fontSize: 11,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0,
    transition: 'opacity 0.15s',
    backdropFilter: 'blur(4px)',
  },
  cardFooter: {
    padding: '8px 8px 10px',
    display: 'flex',
    gap: 5,
    alignItems: 'center',
  },
  altInput: {
    flex: 1,
    border: '1px solid #eee',
    borderRadius: 5,
    padding: '5px 8px',
    fontSize: 11,
    color: '#333',
    outline: 'none',
    minWidth: 0,
    background: '#fafafa',
    transition: 'border-color 0.15s, background 0.15s',
  },
  arrows: {
    display: 'flex',
    gap: 2,
    flexShrink: 0,
  },
  arrowBtn: {
    width: 26,
    height: 26,
    border: '1px solid #eee',
    borderRadius: 5,
    background: '#fff',
    cursor: 'pointer',
    fontSize: 16,
    fontWeight: 300,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#555',
    transition: 'background 0.1s',
  },
  /* ── Empty state ── */
  empty: {
    textAlign: 'center' as const,
    padding: '100px 24px',
  },
  emptyTitle: {
    fontSize: 15,
    fontWeight: 500,
    color: '#999',
    margin: '0 0 6px',
  },
  emptyText: {
    fontSize: 13,
    color: '#bbb',
    margin: 0,
  },
};
