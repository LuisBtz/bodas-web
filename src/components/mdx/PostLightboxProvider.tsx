'use client';

import { useCallback, useRef, useState } from 'react';
import Lightbox from '@/components/ui/Lightbox';

interface Photo {
  src: string;
  alt: string;
}

/**
 * Wraps MDX article content. Scans for elements with data-lightbox-src
 * and opens a unified lightbox on click (event delegation).
 */
export default function PostLightboxProvider({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const handleClick = useCallback((e: React.MouseEvent) => {
    const target = (e.target as HTMLElement).closest<HTMLElement>('[data-lightbox-src]');
    if (!target || !containerRef.current) return;

    // Build photos array from DOM on each click (handles dynamic content)
    const allElements = containerRef.current.querySelectorAll<HTMLElement>('[data-lightbox-src]');
    const allPhotos = Array.from(allElements).map((el) => ({
      src: el.dataset.lightboxSrc!,
      alt: el.dataset.lightboxAlt ?? '',
    }));

    const idx = Array.from(allElements).indexOf(target);
    if (idx >= 0 && allPhotos.length > 0) {
      setPhotos(allPhotos);
      setIndex(idx);
      setOpen(true);
    }
  }, []);

  return (
    <div ref={containerRef} onClick={handleClick}>
      {children}
      {open && photos.length > 0 && (
        <Lightbox
          photos={photos}
          index={index}
          onChange={setIndex}
          onClose={() => setOpen(false)}
        />
      )}
    </div>
  );
}
