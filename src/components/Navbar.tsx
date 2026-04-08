'use client';

/* â”€â”€ Navbar â€” node 404-3220 â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
   display: flex; height: 64px; padding: 0 32px;
   justify-content: space-between; align-items: center;
   flex-shrink: 0; align-self: stretch;
   border-bottom: 1px solid #F1F5F9;
   background: rgba(255, 255, 255, 0.80);
   box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
   backdrop-filter: blur(6px);
â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
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

      {/* Inner bar: full width content with screenshot style */}
      <header
        style={{
          width: '100%',
          maxWidth: '1136px',
          height: '64px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingLeft: '20px',
          paddingRight: '20px',
          background: '#FFFFFF',
          border: '1px solid #E2E8F0',
          borderRadius: '16px',
          boxShadow: '0px 4px 16px rgba(15, 23, 42, 0.08)',
          boxSizing: 'border-box',
        }}
      >
        {/* Search */}
        <div style={{ position: 'relative', width: '448px', height: '36px', display: 'flex', alignItems: 'center', background: '#FFFFFF', borderRadius: '18px', border: '1px solid #E6E8EC' }}>
          <div style={{ width: '448px', height: '36px', display: 'flex', alignItems: 'center', padding: '0 12px 0 10px', boxSizing: 'border-box' }}>
            <div style={{ width: '18px', height: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F1F5F9', borderRadius: '9999px', marginRight: '10px' }}>
              <svg
                width="10"
                height="10"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ display: 'block' }}
              >
                <path d="M7.3125 1.5C3.98906 1.5 1.25 4.23906 1.25 7.5625C1.25 10.8859 3.98906 13.625 7.3125 13.625C8.81641 13.625 10.1891 13.068 11.2125 12.0016L15.9506 16.7397C16.2531 17.0422 16.7531 17.0422 17.0556 16.7397C17.3581 16.4372 17.3581 15.9372 17.0556 15.6347L12.3175 10.8966C13.3797 9.87344 14 8.57656 14 7.5625C14 4.23906 11.2609 1.5 7.9375 1.5H7.3125Z" fill="#6B7280" />
              </svg>
            </div>
            <input
              suppressHydrationWarning
              type="text"
              placeholder="Search analytics, invoices, or reports..."
              style={{
                width: '392px',
                height: '17px',
                border: 'none',
                outline: 'none',
                background: 'transparent',
                fontFamily: 'Inter',
                fontWeight: 400,
                fontSize: '14px',
                lineHeight: '17px',
                letterSpacing: '0px',
                color: '#6B7280',
                verticalAlign: 'middle',
              }}
            />
          </div>
        </div>

        {/* Right bell + settings + profile (screenshot2 style) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <img src="/Button.png" alt="notifications" style={{ width: '16px', height: '20px', objectFit: 'contain', opacity: 0.8 }} />
          </div>
          <div style={{ width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <img src="/Button (1).png" alt="settings" style={{ width: '20.1px', height: '20px', objectFit: 'contain', opacity: 0.8 }} />
          </div>

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
    </header>
  );
}
