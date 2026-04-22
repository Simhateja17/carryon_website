'use client';

import { useRouter } from 'next/navigation';

const inter = "'Inter', sans-serif";

export default function Navbar() {
  const router = useRouter();

  return (
    <header style={{
      display: 'flex',
      height: '56px',
      padding: '0 24px',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexShrink: 0,
      borderBottom: '1px solid #E2E8F0',
      background: 'rgba(241,244,249,0.85)',
      backdropFilter: 'blur(12px)',
      boxSizing: 'border-box',
      position: 'relative',
      zIndex: 10,
    }}>

      {/* Logo */}
      <button
        suppressHydrationWarning
        type="button"
        onClick={() => router.push('/command-center')}
        style={{ display: 'flex', alignItems: 'center', border: 'none', background: 'transparent', cursor: 'pointer', padding: 0 }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/carryon-logo.svg" alt="CarryOn" style={{ height: '32px', width: 'auto', objectFit: 'contain', display: 'block' }} />
      </button>

      {/* Search */}
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', width: '320px', height: '36px', background: '#FFFFFF', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
        <div style={{ position: 'absolute', left: '12px', display: 'flex', alignItems: 'center' }}>
          <svg width="14" height="14" viewBox="0 0 18 18" fill="none">
            <path d="M7.3 1.5C4 1.5 1.25 4.24 1.25 7.56c0 3.32 2.75 6.06 6.06 6.06 1.5 0 2.88-.56 3.9-1.63l4.74 4.74a.71.71 0 0 0 1 0 .71.71 0 0 0 0-1L12.26 11a6.06 6.06 0 0 0 1.74-4.19A6.06 6.06 0 0 0 7.94 1.5H7.3Z" fill="#9CA3AF" />
          </svg>
        </div>
        <input
          suppressHydrationWarning
          type="text"
          placeholder="Search orders, drivers..."
          style={{
            width: '100%', height: '100%', border: 'none', outline: 'none',
            background: 'transparent', paddingLeft: '36px', paddingRight: '12px',
            fontFamily: inter, fontWeight: 400, fontSize: '13px', color: '#374151',
            boxSizing: 'border-box',
          }}
        />
      </div>

      {/* Right side */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>

        {/* Bell */}
        <button suppressHydrationWarning type="button" style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* Help */}
        <button suppressHydrationWarning type="button" style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="#64748B" strokeWidth="1.5" />
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* Settings gear */}
        <button suppressHydrationWarning type="button" onClick={() => router.push('/settings')} style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="3" stroke="#64748B" strokeWidth="1.5" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z" stroke="#64748B" strokeWidth="1.5" />
          </svg>
        </button>

        {/* Divider */}
        <div style={{ width: '1px', height: '28px', background: '#E2E8F0', margin: '0 8px' }} />

        {/* Admin user info + avatar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontFamily: inter, fontSize: '14px', fontWeight: 700, color: '#0F172A', lineHeight: '20px' }}>Admin</div>
            <div style={{ fontFamily: inter, fontSize: '10px', fontWeight: 500, color: '#94A3B8', letterSpacing: '1px', textTransform: 'uppercase', lineHeight: '14px' }}>Master Op</div>
          </div>
          <div style={{ width: '40px', height: '40px', borderRadius: '9999px', overflow: 'hidden', border: '2px solid #fff', boxShadow: '0 1px 3px rgba(0,0,0,0.12)' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/nav-user-profile.png" alt="Admin" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </div>

      </div>
    </header>
  );
}
