'use client';

/* ── Navbar — node 404-3220 ─────────────────────────────────────
   display: flex; height: 64px; padding: 0 32px;
   justify-content: space-between; align-items: center;
   flex-shrink: 0; align-self: stretch;
   border-bottom: 1px solid #F1F5F9;
   background: rgba(255, 255, 255, 0.80);
   box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
   backdrop-filter: blur(6px);
─────────────────────────────────────────────────────────────── */
export default function Navbar() {
  return (
    <header
      style={{
        display: 'flex',
        height: '64px',
        padding: '0 32px',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexShrink: 0,
        alignSelf: 'stretch',
        borderBottom: '1px solid #F1F5F9',
        background: 'rgba(255, 255, 255, 0.80)',
        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        backdropFilter: 'blur(6px)',
        boxSizing: 'border-box',
        zIndex: 10,
        position: 'relative',
      }}
    >
      {/* Search */}
      <div style={{ position: 'relative', flex: 1, maxWidth: '420px' }}>
        <svg
          style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
          width="14" height="14" viewBox="0 0 14 14" fill="none"
        >
          <circle cx="6" cy="6" r="5" stroke="#94A3B8" strokeWidth="1.4" />
          <path d="M10.5 10.5l2.5 2.5" stroke="#94A3B8" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
        <input
          suppressHydrationWarning
          type="text"
          placeholder="Search drivers, orders, or vehicles..."
          style={{
            width: '100%',
            height: '40px',
            padding: '0 14px 0 38px',
            background: '#F8FAFC',
            border: '1px solid #E2E8F0',
            borderRadius: '999px',
            fontFamily: 'Inter',
            fontSize: '13px',
            color: '#94A3B8',
            outline: 'none',
            boxSizing: 'border-box',
          }}
        />
      </div>

      {/* Right icons */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>

        {/* Bell */}
        <button suppressHydrationWarning style={{
          width: '36px', height: '36px', borderRadius: '8px',
          background: 'transparent', border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/nav-bell.png" alt="notifications" style={{ width: '20px', height: '20px', objectFit: 'contain', opacity: 0.8 }} />
        </button>

        {/* Settings */}
        <button suppressHydrationWarning style={{
          width: '36px', height: '36px', borderRadius: '8px',
          background: 'transparent', border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/nav-settings.png" alt="settings" style={{ width: '20px', height: '20px', objectFit: 'contain', opacity: 0.8 }} />
        </button>

        {/* Help */}
        <button suppressHydrationWarning style={{
          width: '36px', height: '36px', borderRadius: '8px',
          background: 'transparent', border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/nav-help.png" alt="help" style={{ width: '20px', height: '20px', objectFit: 'contain', opacity: 0.8 }} />
        </button>

        {/* User Profile */}
        <button suppressHydrationWarning style={{
          width: '36px', height: '36px', borderRadius: '50%',
          background: 'transparent', border: '1.5px solid #E2E8F0', cursor: 'pointer',
          overflow: 'hidden', marginLeft: '4px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/nav-user-profile.png" alt="user profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </button>

      </div>
    </header>
  );
}
