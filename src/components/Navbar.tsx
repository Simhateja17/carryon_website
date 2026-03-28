'use client';

export default function Navbar() {
  return (
    /* Outer shell: full 1024px wide, left-padded by the 256px sidebar */
    <div style={{ width: '1024px', height: '64px', paddingLeft: '256px', boxSizing: 'border-box', flexShrink: 0 }}>

      {/* Inner bar: 768px × 64px */}
      <header
        style={{
          width: '768px',
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingLeft: '32px',
          paddingRight: '32px',
          background: 'rgba(255,255,255,0.80)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid #F1F5F9',
          boxShadow: '0px 1px 2px 0px rgba(0,0,0,0.05)',
          boxSizing: 'border-box',
        }}
      >
        {/* Search */}
        <div style={{ position: 'relative', flex: 1, maxWidth: '400px' }}>
          <svg
            style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
            width="14" height="14" viewBox="0 0 14 14" fill="none"
          >
            <circle cx="6" cy="6" r="5" stroke="#94A3B8" strokeWidth="1.4" />
            <path d="M10.5 10.5l2.5 2.5" stroke="#94A3B8" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
          <input
            suppressHydrationWarning
            type="text"
            placeholder="Search drivers by name, ID or vehicle..."
            style={{
              width: '100%',
              height: '38px',
              padding: '0 12px 0 34px',
              background: '#F8FAFC',
              border: '1px solid #E2E8F0',
              borderRadius: '20px',
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

          {/* Bell — Container (71).png, 36.1×36, opacity 0.8, padding 8 */}
          <div style={{ width: '36px', height: '36px', opacity: 0.8, padding: '8px', boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/nav-bell.png" alt="notifications" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </div>

          {/* Settings — Container (72).png, 36.1×36, opacity 0.8, padding 8 */}
          <div style={{ width: '36px', height: '36px', opacity: 0.8, padding: '8px', boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/nav-settings.png" alt="settings" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </div>

          {/* Help — Container (73).png, 32×36, opacity 0.8, padding 8 */}
          <div style={{ width: '32px', height: '36px', opacity: 0.8, padding: '8px', boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/nav-help.png" alt="help" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </div>

          {/* User Profile — User Profile.png, 36×36, opacity 0.8, padding 8 */}
          <div style={{ width: '36px', height: '36px', opacity: 0.8, padding: '8px', boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', marginLeft: '4px' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/nav-user-profile.png" alt="user profile" style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '50%' }} />
          </div>

        </div>
      </header>
    </div>
  );
}
