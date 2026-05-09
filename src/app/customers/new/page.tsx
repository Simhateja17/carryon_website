'use client';

import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';

const label: React.CSSProperties = {
  fontFamily: 'Inter, sans-serif',
  fontSize: '10px',
  fontWeight: 700,
  letterSpacing: '0.8px',
  textTransform: 'uppercase',
  color: '#667085',
  marginBottom: '8px',
  display: 'block',
};

const field: React.CSSProperties = {
  width: '100%',
  height: '36px',
  borderRadius: '8px',
  border: 'none',
  background: '#9EC7E8',
  padding: '0 12px',
  boxSizing: 'border-box',
  fontFamily: 'Inter, sans-serif',
  fontSize: '16px',
  color: '#0F172A',
};

export default function NewCustomerPage() {
  const router = useRouter();

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: '#F8FAFC', fontFamily: 'Inter, sans-serif' }}>
      <Sidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <Navbar />
        <main style={{ flex: 1, overflowY: 'auto', padding: '20px 28px 28px' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div>
                <h1 style={{ margin: 0, fontSize: '48px', lineHeight: '44px', fontWeight: 700, color: '#0B0F17' }}>
                  New Enterprise
                  <br />
                  Client
                </h1>
                <p style={{ margin: '6px 0 0', fontSize: '30px', lineHeight: '34px', color: '#2F80ED', transform: 'scale(0.5)', transformOrigin: 'left top', width: '200%' }}>
                  Define profile, billing parameters and operational settings.
                </p>
              </div>
              <div style={{ display: 'flex', gap: '12px', marginTop: '4px' }}>
                <button
                  suppressHydrationWarning
                  onClick={() => router.push('/customers')}
                  style={{ height: '36px', padding: '0 22px', borderRadius: '8px', border: 'none', background: '#9EC7E8', color: '#2F80ED', fontSize: '21px', fontWeight: 600, transform: 'scale(0.5)', transformOrigin: 'top left', cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button
                  suppressHydrationWarning
                  style={{ height: '36px', padding: '0 30px', borderRadius: '8px', border: 'none', background: '#2F80ED', color: '#fff', fontSize: '21px', fontWeight: 700, transform: 'scale(0.5)', transformOrigin: 'top left', cursor: 'pointer' }}
                >
                  SAVE CUSTOMER
                </button>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '22px', alignItems: 'start' }}>
              <section style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#A7D0EF', display: 'grid', placeItems: 'center' }}>
                    <svg width="17" height="17" viewBox="0 0 18 18" fill="none">
                      <path d="M3 2h8v14H3V2Zm8 4h4v10h-4V6ZM5 4h4M5 7h4M5 10h4M5 13h2" stroke="#2F80ED" strokeWidth="1.2" strokeLinecap="round" />
                    </svg>
                  </div>
                  <h2 style={{ margin: 0, fontSize: '35px', lineHeight: '40px', color: '#111827', transform: 'scale(0.5)', transformOrigin: 'left center', width: '200%' }}>
                    Company Information
                  </h2>
                </div>

                <div style={{ marginBottom: '14px' }}>
                  <span style={label}>Company Registered Name</span>
                  <input suppressHydrationWarning defaultValue="e.g. Global Logistics Solutions Inc." style={field} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '14px' }}>
                  <div>
                    <span style={label}>Registration Number</span>
                    <input suppressHydrationWarning defaultValue="REG-2024-XXXX" style={field} />
                  </div>
                  <div>
                    <span style={label}>Industry Type</span>
                    <div style={{ ...field, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span>Manufacturing</span>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M3.5 5.5L7 9L10.5 5.5" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div>
                  <span style={label}>Company Size</span>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,minmax(0,1fr))', gap: '10px' }}>
                    {['1-50', '51-200', '201-500', '500+'].map((s) => {
                      const active = s === '51-200';
                      return (
                        <button
                          key={s}
                          suppressHydrationWarning
                          style={{
                            height: '34px',
                            borderRadius: '8px',
                            border: active ? '1px solid #9DB9DC' : 'none',
                            background: active ? '#E4EDF7' : '#9EC7E8',
                            color: active ? '#2F80ED' : '#0F172A',
                            fontSize: '16px',
                            fontWeight: 600,
                            cursor: 'pointer',
                          }}
                        >
                          {s}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </section>

              <aside style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '0 22px 22px', overflow: 'hidden' }}>
                <div style={{ height: '4px', background: '#2F80ED', margin: '0 -22px 18px' }} />
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#A7D0EF', display: 'grid', placeItems: 'center' }}>
                    <svg width="17" height="17" viewBox="0 0 18 18" fill="none">
                      <path d="M9 2.5 3.5 5.8v6.4L9 15.5l5.5-3.3V5.8L9 2.5Z" stroke="#2F80ED" strokeWidth="1.2" />
                      <path d="M9 6.5v4M7 8.5h4M2.5 15.5h5v-3h-5v3Zm8 0h5v-5h-5v5Z" stroke="#2F80ED" strokeWidth="1.1" />
                    </svg>
                  </div>
                  <h2 style={{ margin: 0, fontSize: '35px', lineHeight: '40px', color: '#111827', transform: 'scale(0.5)', transformOrigin: 'left center', width: '200%' }}>
                    Account Settings
                  </h2>
                </div>
                <div style={{ marginBottom: '12px' }}>
                  <span style={label}>Credit Limit ($)</span>
                  <div style={{ ...field, display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ color: '#6B7280', fontWeight: 700 }}>$</span>
                    <span style={{ fontWeight: 700 }}>50000</span>
                  </div>
                </div>
                <div style={{ marginBottom: '12px' }}>
                  <span style={label}>Payment Terms</span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {['Net 30', 'Net 60', 'Due on Receipt'].map((t, i) => (
                      <button
                        key={t}
                        suppressHydrationWarning
                        style={{
                          height: '28px',
                          borderRadius: '999px',
                          border: i === 0 ? '1px solid #9DB9DC' : 'none',
                          background: i === 0 ? '#DDEAF8' : '#9EC7E8',
                          color: i === 0 ? '#2F80ED' : '#0F172A',
                          padding: '0 14px',
                          fontSize: '12px',
                          fontWeight: 600,
                          cursor: 'pointer',
                        }}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <span style={label}>Assigned Manager</span>
                  <button
                    suppressHydrationWarning
                    style={{ width: '100%', height: '52px', borderRadius: '8px', border: 'none', background: '#9EC7E8', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 12px', cursor: 'pointer' }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
                      <img src="/driver-avatar.png" alt="David Chen" style={{ width: '36px', height: '36px', borderRadius: '999px', objectFit: 'cover' }} />
                      <div style={{ textAlign: 'left' }}>
                        <div style={{ fontSize: '17px', fontWeight: 700, color: '#0F172A', lineHeight: '18px' }}>David Chen</div>
                        <div style={{ fontSize: '10px', fontWeight: 500, color: '#475569', lineHeight: '12px', marginTop: '2px' }}>SENIOR ACCOUNTS</div>
                      </div>
                    </div>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M4 6l4 4 4-4" stroke="#64748B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
              </aside>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
