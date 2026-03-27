'use client';

import { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import type { GalleryPhoto } from '@/lib/gallery';
import {
  saveGalleryOrder,
  removeGalleryImage,
  removeGalleryImages,
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
  const [fileDragOver, setFileDragOver] = useState(false);
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [selectionMode, setSelectionMode] = useState(false);
  const [batchMoving, setBatchMoving] = useState(false);
  const [moveTarget, setMoveTarget] = useState('');
  const dragIdx = useRef<number | null>(null);
  const dragOverIdx = useRef<number | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2500);
  };

  /* ── Selection ── */
  const toggleSelect = (i: number) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  const selectAll = () => {
    setSelected(new Set(photos.map((_, i) => i)));
  };

  const clearSelection = () => {
    setSelected(new Set());
    setSelectionMode(false);
    setBatchMoving(false);
  };

  const toggleSelectionMode = () => {
    if (selectionMode) {
      clearSelection();
    } else {
      setSelectionMode(true);
    }
  };

  /* ── Batch delete ── */
  const batchDelete = async () => {
    if (selected.size === 0) return;
    if (
      !confirm(
        `¿Eliminar ${selected.size} foto${selected.size > 1 ? 's' : ''} de la galería?`
      )
    )
      return;
    const indices = Array.from(selected);
    const result = await removeGalleryImages(indices);
    if (result.photos) setPhotos(result.photos);
    showToast(`${selected.size} foto(s) eliminada(s)`);
    clearSelection();
  };

  /* ── Batch move ── */
  const batchMove = (position: 'start' | 'end' | number) => {
    if (selected.size === 0) return;
    const indices = Array.from(selected).sort((a, b) => a - b);
    const selectedPhotos = indices.map((i) => photos[i]);
    const remaining = photos.filter((_, i) => !selected.has(i));

    let next: GalleryPhoto[];
    if (position === 'start') {
      next = [...selectedPhotos, ...remaining];
    } else if (position === 'end') {
      next = [...remaining, ...selectedPhotos];
    } else {
      const insertAt = Math.max(0, Math.min(position, remaining.length));
      next = [
        ...remaining.slice(0, insertAt),
        ...selectedPhotos,
        ...remaining.slice(insertAt),
      ];
    }

    setPhotos(next);
    setDirty(true);
    clearSelection();
    showToast(`${indices.length} foto(s) movida(s)`);
  };

  /* ── Drag and drop reorder ── */
  const onDragStart = (e: React.DragEvent, i: number) => {
    if (selectionMode) return;
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

  /* ── Upload (shared logic via API route — no body size limit) ── */
  const handleUpload = async (files: FileList | File[]) => {
    if (!files.length) return;

    setUploading(true);
    const fd = new FormData();
    for (const f of Array.from(files)) fd.append('files', f);

    try {
      const res = await fetch('/api/gallery/upload', {
        method: 'POST',
        body: fd,
      });
      const result = await res.json();
      if (result.photos) setPhotos(result.photos);
      showToast(`${files.length} foto(s) agregada(s)`);
    } catch {
      showToast('Error al subir imágenes');
    }
    setUploading(false);

    if (fileRef.current) fileRef.current.value = '';
  };

  /* ── Upload via file input ── */
  const onUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;
    await handleUpload(files);
  };

  /* ── Drag & drop files from desktop ── */
  const onFileDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.types.includes('Files')) {
      setFileDragOver(true);
    }
  }, []);

  const onFileDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setFileDragOver(false);
  }, []);

  const onFileDrop = useCallback(
    async (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setFileDragOver(false);

      const files = Array.from(e.dataTransfer.files).filter((f) =>
        f.type.startsWith('image/')
      );
      if (files.length > 0) {
        await handleUpload(files);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  /* ── Remove single ── */
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
        .gm-card.gm-selected { outline: 2px solid #2563eb !important; outline-offset: -1px; }
        .gm-card .gm-checkbox { opacity: 0; transition: opacity 0.15s; }
        .gm-card:hover .gm-checkbox, .gm-selecting .gm-checkbox { opacity: 1 !important; }
        .gm-card.gm-selected .gm-checkbox { opacity: 1 !important; }
        .gm-alt:focus { border-color: #999 !important; background: #fff !important; }
        .gm-arrow:hover:not(:disabled) { background: #f5f5f5 !important; }
        .gm-toplink:hover { color: rgba(255,255,255,0.9) !important; }
        .gm-upload:hover { border-color: #aaa !important; }
        .gm-dropzone-active { border-color: #2563eb !important; background: #eff6ff !important; }
        .gm-batch-btn:hover { background: #f5f5f5 !important; }
        .gm-batch-btn-danger:hover { background: #fef2f2 !important; color: #dc2626 !important; }
      `}</style>

      <div
        style={S.shell}
        onDragOver={onFileDragOver}
        onDragLeave={onFileDragLeave}
        onDrop={onFileDrop}
      >
        {/* ── File drop overlay ── */}
        {fileDragOver && (
          <div style={S.dropOverlay}>
            <div style={S.dropOverlayInner}>
              <div style={S.dropIcon}>+</div>
              <p style={S.dropText}>Suelta las imágenes aquí</p>
              <p style={S.dropSubtext}>Se agregarán al final de la galería</p>
            </div>
          </div>
        )}

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
                &nbsp;&middot;&nbsp; Arrastra para reordenar &nbsp;&middot;&nbsp;
                Suelta imágenes en la página para subir
              </p>
            </div>
            <div style={S.actions}>
              <button
                onClick={toggleSelectionMode}
                style={{
                  ...S.selectBtn,
                  background: selectionMode ? '#2563eb' : '#fff',
                  color: selectionMode ? '#fff' : '#333',
                  borderColor: selectionMode ? '#2563eb' : '#d0d0d0',
                }}
              >
                {selectionMode ? 'Cancelar selección' : 'Seleccionar'}
              </button>
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

          {/* ── Selection action bar ── */}
          {selectionMode && (
            <div style={S.selectionBar}>
              <div style={S.selectionBarLeft}>
                <span style={S.selectionCount}>
                  {selected.size} de {photos.length} seleccionada
                  {selected.size !== 1 ? 's' : ''}
                </span>
                <button
                  onClick={selectAll}
                  className="gm-batch-btn"
                  style={S.batchBtn}
                >
                  Seleccionar todas
                </button>
                <button
                  onClick={() => setSelected(new Set())}
                  className="gm-batch-btn"
                  style={S.batchBtn}
                >
                  Deseleccionar
                </button>
              </div>
              {selected.size > 0 && (
                <div style={S.selectionBarRight}>
                  <button
                    onClick={() => batchMove('start')}
                    className="gm-batch-btn"
                    style={S.batchBtn}
                  >
                    Mover al inicio
                  </button>
                  <button
                    onClick={() => batchMove('end')}
                    className="gm-batch-btn"
                    style={S.batchBtn}
                  >
                    Mover al final
                  </button>
                  <button
                    onClick={() => setBatchMoving(!batchMoving)}
                    className="gm-batch-btn"
                    style={{
                      ...S.batchBtn,
                      background: batchMoving ? '#f0f0f0' : '#fff',
                    }}
                  >
                    Mover a posición…
                  </button>
                  <span style={S.batchDivider} />
                  <button
                    onClick={batchDelete}
                    className="gm-batch-btn gm-batch-btn-danger"
                    style={S.batchBtnDanger}
                  >
                    Eliminar ({selected.size})
                  </button>
                </div>
              )}
            </div>
          )}

          {/* ── Move to position input ── */}
          {batchMoving && selected.size > 0 && (
            <div style={S.moveBar}>
              <span style={{ fontSize: 12, color: '#555' }}>
                Mover selección a la posición:
              </span>
              <input
                type="number"
                min={1}
                max={photos.length}
                value={moveTarget}
                onChange={(e) => setMoveTarget(e.target.value)}
                placeholder="Ej: 1"
                style={S.moveInput}
              />
              <button
                onClick={() => {
                  const pos = parseInt(moveTarget, 10);
                  if (!isNaN(pos) && pos >= 1) {
                    batchMove(pos - 1);
                    setMoveTarget('');
                    setBatchMoving(false);
                  }
                }}
                disabled={!moveTarget}
                style={{
                  ...S.moveBtnConfirm,
                  opacity: moveTarget ? 1 : 0.4,
                }}
              >
                Mover
              </button>
            </div>
          )}

          {/* ── Unsaved indicator ── */}
          {dirty && (
            <div style={S.unsaved}>Tienes cambios sin guardar</div>
          )}

          {/* ── Toast ── */}
          {toast && <div style={S.toast}>{toast}</div>}

          {/* ── Upload progress overlay ── */}
          {uploading && (
            <div style={S.uploadingBar}>
              Subiendo imágenes…
            </div>
          )}

          {/* ── Grid ── */}
          <div style={S.grid} className={selectionMode ? 'gm-selecting' : ''}>
            {photos.map((p, i) => (
              <div
                key={p.image + i}
                className={`gm-card${selected.has(i) ? ' gm-selected' : ''}`}
                draggable={!selectionMode}
                onDragStart={(e) => onDragStart(e, i)}
                onDragOver={(e) => onDragOver(e, i)}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
                onDragEnd={onDragEnd}
                onClick={
                  selectionMode ? () => toggleSelect(i) : undefined
                }
                style={{
                  ...S.card,
                  outline:
                    dragOver === i
                      ? '2px solid #333'
                      : selected.has(i)
                        ? undefined
                        : '1px solid #eaeaea',
                  outlineOffset: -1,
                  cursor: selectionMode ? 'pointer' : 'grab',
                }}
              >
                {/* Thumbnail */}
                <div style={S.thumb}>
                  <Image
                    src={p.image}
                    alt={p.alt || ''}
                    width={400}
                    height={
                      p.orientation === 'portrait' ? 600
                      : p.orientation === 'square' ? 400
                      : 267
                    }
                    sizes="220px"
                    style={{ display: 'block', width: '100%', height: 'auto' }}
                    draggable={false}
                  />

                  <span style={S.badge}>{i + 1}</span>

                  {/* Checkbox for selection */}
                  <label
                    className="gm-checkbox"
                    style={S.checkbox}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <input
                      type="checkbox"
                      checked={selected.has(i)}
                      onChange={() => toggleSelect(i)}
                      style={S.checkboxInput}
                    />
                  </label>

                  {!selectionMode && (
                    <button
                      className="gm-remove"
                      onClick={() => remove(i)}
                      style={S.removeBtn}
                      title="Eliminar foto"
                    >
                      ✕
                    </button>
                  )}
                </div>

                {/* Footer */}
                <div style={S.cardFooter}>
                  <input
                    type="text"
                    className="gm-alt"
                    placeholder="Alt text…"
                    value={p.alt}
                    onChange={(e) => updateAlt(i, e.target.value)}
                    onClick={(e) => selectionMode && e.stopPropagation()}
                    style={S.altInput}
                  />
                  {!selectionMode && (
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
                  )}
                </div>
              </div>
            ))}
          </div>

          {!photos.length && (
            <div style={S.empty}>
              <div style={S.emptyDropzone}>
                <p style={S.emptyTitle}>Sin fotografías</p>
                <p style={S.emptyText}>
                  Arrastra imágenes aquí o usa el botón &quot;+ Agregar
                  fotos&quot; para comenzar.
                </p>
              </div>
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
    position: 'relative',
  },
  /* ── Drop overlay ── */
  dropOverlay: {
    position: 'fixed',
    inset: 0,
    zIndex: 100,
    background: 'rgba(37, 99, 235, 0.08)',
    backdropFilter: 'blur(2px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    pointerEvents: 'none',
  },
  dropOverlayInner: {
    textAlign: 'center' as const,
    padding: '60px 80px',
    border: '3px dashed #2563eb',
    borderRadius: 20,
    background: 'rgba(255,255,255,0.9)',
  },
  dropIcon: {
    fontSize: 48,
    fontWeight: 300,
    color: '#2563eb',
    marginBottom: 8,
  },
  dropText: {
    fontSize: 18,
    fontWeight: 600,
    color: '#1a1a1a',
    margin: '0 0 4px',
  },
  dropSubtext: {
    fontSize: 13,
    color: '#666',
    margin: 0,
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
  selectBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '7px 14px',
    fontSize: 12,
    fontWeight: 500,
    border: '1px solid #d0d0d0',
    borderRadius: 6,
    cursor: 'pointer',
    transition: 'all 0.15s',
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
  /* ── Selection bar ── */
  selectionBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap' as const,
    gap: 12,
    marginBottom: 16,
    padding: '10px 16px',
    background: '#eef2ff',
    border: '1px solid #c7d2fe',
    borderRadius: 8,
    fontSize: 12,
  },
  selectionBarLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },
  selectionBarRight: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
  },
  selectionCount: {
    fontWeight: 600,
    color: '#3730a3',
    marginRight: 4,
  },
  batchBtn: {
    padding: '5px 12px',
    fontSize: 11,
    fontWeight: 500,
    border: '1px solid #d0d0d0',
    borderRadius: 5,
    background: '#fff',
    cursor: 'pointer',
    transition: 'background 0.15s',
    color: '#333',
  },
  batchBtnDanger: {
    padding: '5px 12px',
    fontSize: 11,
    fontWeight: 600,
    border: '1px solid #fca5a5',
    borderRadius: 5,
    background: '#fff',
    cursor: 'pointer',
    transition: 'all 0.15s',
    color: '#ef4444',
  },
  batchDivider: {
    width: 1,
    height: 20,
    background: '#d0d0d0',
    display: 'inline-block',
  },
  /* ── Move bar ── */
  moveBar: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    marginBottom: 16,
    padding: '10px 16px',
    background: '#fff',
    border: '1px solid #e2e2e2',
    borderRadius: 8,
  },
  moveInput: {
    width: 70,
    padding: '5px 8px',
    fontSize: 12,
    border: '1px solid #d0d0d0',
    borderRadius: 5,
    outline: 'none',
  },
  moveBtnConfirm: {
    padding: '5px 14px',
    fontSize: 12,
    fontWeight: 600,
    border: 'none',
    borderRadius: 5,
    background: '#2563eb',
    color: '#fff',
    cursor: 'pointer',
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
  uploadingBar: {
    marginBottom: 16,
    padding: '10px 16px',
    background: '#f0f7ff',
    border: '1px solid #bfdbfe',
    borderRadius: 6,
    fontSize: 12,
    color: '#1d4ed8',
    fontWeight: 500,
    textAlign: 'center' as const,
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
    transition: 'box-shadow 0.15s, outline-color 0.1s',
    boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
  },
  thumb: {
    position: 'relative' as const,
    width: '100%',
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
  checkbox: {
    position: 'absolute' as const,
    top: 8,
    right: 8,
    zIndex: 10,
    cursor: 'pointer',
    transition: 'opacity 0.15s',
  },
  checkboxInput: {
    width: 18,
    height: 18,
    cursor: 'pointer',
    accentColor: '#2563eb',
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
  emptyDropzone: {
    padding: '60px 40px',
    border: '2px dashed #d0d0d0',
    borderRadius: 16,
    display: 'inline-block',
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
