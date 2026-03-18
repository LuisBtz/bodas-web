import { getGalleryPhotos } from '@/lib/gallery';
import GalleryManager from './GalleryManager';

export const dynamic = 'force-dynamic';

export default function AdminGaleriaPage() {
  const photos = getGalleryPhotos();
  return <GalleryManager initialPhotos={photos} />;
}
