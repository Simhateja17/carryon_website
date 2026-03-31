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
    <div style={{ width: '100%', height: '64px', paddingLeft: '256px', boxSizing: 'border-box', flexShrink: 0, background: '#F8FAFC' }}>

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
        <div style={{ position: 'relative', width: '754px', height: '36px', display: 'flex', alignItems: 'center', background: '#FFFFFF', borderRadius: '18px', border: '1px solid #E6E8EC' }}>
          <div style={{ width: '384px', height: '36px', display: 'flex', alignItems: 'center', padding: '0 12px 0 10px', boxSizing: 'border-box' }}>
            <svg
              width="16"
              height="20"
              viewBox="0 0 16 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ marginRight: '10px', display: 'block' }}
            >
              <path d="M6.5 1C3.462 1 1 3.462 1 6.5S3.462 12 6.5 12c1.36 0 2.618-.51 3.57-1.35l4.55 4.55c.2.2.512.2.71 0s.2-.51 0-.71l-4.55-4.55A5.43 5.43 0 0012 6.5C12 3.462 9.538 1 6.5 1zm0 2c2.205 0 4 1.795 4 4s-1.795 4-4 4-4-1.795-4-4 1.795-4 4-4z" fill="#000" />
            </svg>
            <input
              suppressHydrationWarning
              type="text"
              placeholder="Search fleet, jobs, or drivers..."
              style={{
                width: '100%',
                height: '36px',
                border: 'none',
                outline: 'none',
                background: 'transparent',
                fontFamily: 'Inter',
                fontWeight: 400,
                fontSize: '14px',
                lineHeight: '100%',
                letterSpacing: '0px',
                color: '#000000',
                verticalAlign: 'middle',
              }}
            />
          </div>
        </div>

        {/* Right bell + profile (screenshot1 style) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <img src="/nav-bell.png" alt="notifications" style={{ width: '20px', height: '20px', objectFit: 'contain' }} />
          </div>

          <div style={{ width: '1px', height: '40px', background: '#E2E8F0' }} />

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '6px 10px', border: '1px solid #E2E8F0', borderRadius: '20px', background: '#FFFFFF' }}>
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1, textAlign: 'right' }}>
              <span style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: '14px', color: '#0F172A' }}>Alex Rivera</span>
              <span style={{ fontFamily: 'Inter', fontWeight: 500, fontSize: '12px', color: '#64748B' }}>aleet Admin</span>
            </div>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', overflow: 'hidden' }}>
              <img src="/nav-user-profile.png" alt="user profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </div>

        </div>
      </header>
    </div>
  );
}
