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
    <header style={{
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
      position: 'relative',
      zIndex: 10,
    }}>

      {/* Search — node 404-3222: background #E0E3E5, border-radius 8px, padding 8px 16px 9px 40px */}
      <div style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        flex: 1,
        maxWidth: '520px',
      }}>
        {/* Search icon */}
        <svg
          style={{ position: 'absolute', left: '14px', pointerEvents: 'none' }}
          width="16" height="16" viewBox="0 0 16 16" fill="none"
        >
          <circle cx="6.5" cy="6.5" r="5" stroke="#6B7280" strokeWidth="1.4" />
          <path d="M10.5 10.5L14 14" stroke="#6B7280" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
        <input
          suppressHydrationWarning
          type="text"
          placeholder="Search drivers, orders, or vehicles..."
          style={{
            display: 'flex',
            padding: '8px 16px 9px 40px',
            width: '100%',
            borderRadius: '8px',
            background: '#E0E3E5',
            border: 'none',
            outline: 'none',
            fontFamily: 'Manrope, Inter, sans-serif',
            fontSize: '14px',
            fontWeight: 400,
            color: '#6B7280',
            lineHeight: 'normal',
            boxSizing: 'border-box',
          }}
        />
      </div>

      {/* Right icons — node 404-3227: display flex; align-items center; gap 16px */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>

        {/* Bell */}
        <button suppressHydrationWarning style={{
          width: '36px', height: '36px', borderRadius: '8px',
          background: 'transparent', border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0"
              stroke="#6B7280" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* Settings / gear */}
        <button suppressHydrationWarning style={{
          width: '36px', height: '36px', borderRadius: '8px',
          background: 'transparent', border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="3" stroke="#6B7280" strokeWidth="1.6" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z"
              stroke="#6B7280" strokeWidth="1.6" />
          </svg>
        </button>

        {/* Help / question mark */}
        <button suppressHydrationWarning style={{
          width: '36px', height: '36px', borderRadius: '8px',
          background: 'transparent', border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="#6B7280" strokeWidth="1.6" />
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01"
              stroke="#6B7280" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

      </div>
    </header>
  );
}
