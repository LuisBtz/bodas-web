'use client';

import { useRouter } from 'next/navigation';
import { adminLogout } from '@/app/actions/adminAuth';

const TOOLS = [
  {
    title: 'Blog & Bodas Reales',
    description: 'Crear, editar y publicar posts del blog y proyectos de bodas reales.',
    href: '/keystatic',
    icon: '✎',
  },
  {
    title: 'Galería de fotografías',
    description: 'Agregar, eliminar y reordenar las fotos del portfolio visualmente.',
    href: '/admin/galeria',
    icon: '⬒',
  },
];

export default function AdminDashboard() {
  const router = useRouter();

  const logout = async () => {
    await adminLogout();
    router.push('/admin/login');
  };

  return (
    <div style={S.shell}>
      {/* Top bar */}
      <header style={S.topBar}>
        <div style={S.topLeft}>
          <span style={S.logo}>LB</span>
          <span style={S.topDivider} />
          <span style={S.topSection}>Panel de administración</span>
        </div>
        <div style={S.topRight}>
          <a href="/" target="_blank" rel="noopener" style={S.topLink}>
            Ver sitio →
          </a>
          <span style={S.topDivider} />
          <button onClick={logout} style={{ ...S.topLink, background: 'none', border: 'none' }}>
            Cerrar sesión
          </button>
        </div>
      </header>

      {/* Content */}
      <div style={S.page}>
        <div style={S.header}>
          <h1 style={S.title}>Bienvenido</h1>
          <p style={S.subtitle}>Selecciona una herramienta para comenzar</p>
        </div>

        <div style={S.grid}>
          {TOOLS.map((tool) => (
            <a key={tool.href} href={tool.href} style={S.card}>
              <span style={S.cardIcon}>{tool.icon}</span>
              <div>
                <h2 style={S.cardTitle}>{tool.title}</h2>
                <p style={S.cardDesc}>{tool.description}</p>
              </div>
              <span style={S.cardArrow}>→</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

const S: Record<string, React.CSSProperties> = {
  shell: {
    minHeight: '100dvh',
    background: '#f5f5f5',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    color: '#1a1a1a',
  },
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
  },
  page: {
    maxWidth: 640,
    margin: '0 auto',
    padding: '60px 24px 80px',
  },
  header: {
    marginBottom: 36,
  },
  title: {
    fontSize: 22,
    fontWeight: 600,
    margin: '0 0 6px',
    letterSpacing: '-0.01em',
  },
  subtitle: {
    fontSize: 13,
    color: '#999',
    margin: 0,
  },
  grid: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 12,
  },
  card: {
    display: 'flex',
    alignItems: 'center',
    gap: 20,
    padding: '22px 24px',
    background: '#fff',
    border: '1px solid #eaeaea',
    borderRadius: 10,
    textDecoration: 'none',
    color: '#1a1a1a',
    transition: 'box-shadow 0.15s, border-color 0.15s',
    cursor: 'pointer',
  },
  cardIcon: {
    fontSize: 24,
    width: 48,
    height: 48,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#f5f5f5',
    borderRadius: 8,
    flexShrink: 0,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: 600,
    margin: '0 0 4px',
  },
  cardDesc: {
    fontSize: 12,
    color: '#888',
    margin: 0,
    lineHeight: 1.5,
  },
  cardArrow: {
    marginLeft: 'auto',
    fontSize: 18,
    color: '#ccc',
    flexShrink: 0,
  },
};
