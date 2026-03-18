'use client';

import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { adminLogin } from '@/app/actions/adminAuth';

export default function AdminLoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}

function LoginForm() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const params = useSearchParams();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(false);

    const { ok } = await adminLogin(password);

    if (ok) {
      const from = params.get('from') || '/admin/galeria';
      router.push(from);
    } else {
      setError(true);
      setLoading(false);
    }
  };

  return (
    <div style={S.page}>
      <form onSubmit={handleSubmit} style={S.card}>
        <p style={S.eyebrow}>Luis Benítez Photography</p>
        <h1 style={S.title}>Admin</h1>

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
          autoFocus
          style={{
            ...S.input,
            borderColor: error ? '#c44' : '#ddd',
          }}
        />

        {error && <p style={S.error}>Contraseña incorrecta</p>}

        <button type="submit" disabled={loading} style={S.btn}>
          {loading ? 'Verificando…' : 'Entrar'}
        </button>
      </form>
    </div>
  );
}

const S: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100dvh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#fafafa',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  },
  card: {
    width: '100%',
    maxWidth: 360,
    padding: '48px 36px',
    background: '#fff',
    border: '1px solid #eee',
    borderRadius: 10,
    textAlign: 'center' as const,
  },
  eyebrow: {
    fontSize: 10,
    letterSpacing: '0.2em',
    textTransform: 'uppercase' as const,
    color: '#999',
    margin: '0 0 8px',
  },
  title: {
    fontSize: 22,
    fontWeight: 500,
    margin: '0 0 28px',
    color: '#1a1a1a',
  },
  input: {
    width: '100%',
    padding: '11px 14px',
    fontSize: 14,
    border: '1px solid #ddd',
    borderRadius: 6,
    outline: 'none',
    marginBottom: 12,
    boxSizing: 'border-box' as const,
  },
  error: {
    fontSize: 12,
    color: '#c44',
    margin: '0 0 12px',
  },
  btn: {
    width: '100%',
    padding: '11px 0',
    fontSize: 13,
    fontWeight: 500,
    background: '#1a1a1a',
    color: '#fff',
    border: 'none',
    borderRadius: 6,
    cursor: 'pointer',
  },
};
