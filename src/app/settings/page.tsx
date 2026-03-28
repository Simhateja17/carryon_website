'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

/* ── Sidebar ─────────────────────────────────────────────────── */
const sideNav = [
  {
    label: 'Command Center',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <rect x="1" y="1" width="7" height="7" rx="1.5" fill="currentColor" />
        <rect x="10" y="1" width="7" height="7" rx="1.5" fill="currentColor" />
        <rect x="1" y="10" width="7" height="7" rx="1.5" fill="currentColor" />
        <rect x="10" y="10" width="7" height="7" rx="1.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: 'Live Map',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M9 1C6.239 1 4 3.239 4 6c0 4.5 5 11 5 11s5-6.5 5-11c0-2.761-2.239-5-5-5Z"
          stroke="currentColor" strokeWidth="1.5" fill="none" />
        <circle cx="9" cy="6" r="2" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: 'Orders',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <rect x="2" y="2" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M5 7h8M5 10h8M5 13h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: 'Drivers',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <circle cx="9" cy="6" r="3" stroke="currentColor" strokeWidth="1.5" />
        <path d="M3 16c0-3.314 2.686-6 6-6s6 2.686 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: 'Customers',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <circle cx="6.5" cy="6" r="2.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M1 15c0-3.038 2.462-5.5 5.5-5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="12.5" cy="6" r="2.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M17 15c0-3.038-2.462-5.5-5.5-5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: 'Revenue',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <polyline points="2,14 6,8 10,11 16,3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="2" y1="16" x2="16" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: 'Settings',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <circle cx="9" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M9 1v2M9 15v2M1 9h2M15 9h2M3.22 3.22l1.41 1.41M13.36 13.36l1.42 1.42M3.22 14.78l1.41-1.41M13.36 4.64l1.42-1.42" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
];

function Sidebar() {
  const router = useRouter();

  return (
    <aside style={{
      width: '256px', height: '100vh', flexShrink: 0,
      background: '#fff', borderRight: '1px solid #E2E8F0',
      display: 'flex', flexDirection: 'column',
    }}>
      <div style={{ padding: '20px 24px 18px', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{
          width: '40px', height: '40px', borderRadius: '10px', background: '#2563EB',
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>
          <svg width="24" height="20" viewBox="0 0 24 20" fill="none">
            <rect x="1" y="5" width="15" height="11" rx="2" stroke="white" strokeWidth="1.5" />
            <path d="M16 8.5h4.5l2.5 5H16V8.5Z" stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
            <circle cx="5.5" cy="17" r="2" fill="white" />
            <circle cx="15.5" cy="17" r="2" fill="white" />
          </svg>
        </div>
        <div>
          <div style={{ fontFamily: 'Inter', fontSize: '16px', fontWeight: 700, color: '#2563EB', lineHeight: '20px' }}>
            Carry On
          </div>
          <div style={{ fontFamily: 'Inter', fontSize: '9px', fontWeight: 600, color: '#94A3B8', letterSpacing: '1px', lineHeight: '14px' }}>
            FLEET MANAGEMENT
          </div>
        </div>
      </div>

      <nav style={{ flex: 1, padding: '8px 12px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
        {sideNav.map((item) => {
          const isActive = item.label === 'Settings';
          return (
            <button
              suppressHydrationWarning
              key={item.label}
              onClick={() => {
                if (item.label === 'Command Center') { router.push('/command-center'); return; }
                if (item.label === 'Live Map') { router.push('/'); return; }
                if (item.label === 'Orders') { router.push('/orders'); return; }
                if (item.label === 'Drivers') { router.push('/drivers'); return; }
                if (item.label === 'Customers') { router.push('/customers'); return; }
                if (item.label === 'Settings') { router.push('/settings'); return; }
              }}
              style={{
                display: 'flex', alignItems: 'center', gap: '12px',
                padding: '10px 14px', width: '100%', textAlign: 'left',
                background: isActive ? '#EFF6FF' : 'transparent',
                border: 'none',
                borderLeft: isActive ? '3px solid #2563EB' : '3px solid transparent',
                borderRadius: isActive ? '0 8px 8px 0' : '8px',
                cursor: 'pointer',
              }}
            >
              <span style={{ display: 'flex', color: isActive ? '#2563EB' : '#64748B', flexShrink: 0 }}>
                {item.icon}
              </span>
              <span style={{
                fontFamily: 'Inter', fontSize: '14px',
                fontWeight: isActive ? 600 : 400,
                color: isActive ? '#2563EB' : '#374151',
              }}>
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>

      <div style={{ padding: '16px 16px 20px', display: 'flex', flexDirection: 'column', gap: '4px', borderTop: '1px solid #F1F5F9' }}>
        <button suppressHydrationWarning style={{
          display: 'flex', alignItems: 'center', gap: '10px',
          padding: '9px 12px', width: '100%', textAlign: 'left',
          background: 'transparent', border: 'none', borderRadius: '8px', cursor: 'pointer',
        }}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <circle cx="9" cy="9" r="7.5" stroke="#64748B" strokeWidth="1.5" />
            <path d="M9 12.5v-1M9 6.5a2 2 0 1 1 0 4" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <span style={{ fontFamily: 'Inter', fontSize: '14px', color: '#374151' }}>Support</span>
        </button>
        <button suppressHydrationWarning style={{
          display: 'flex', alignItems: 'center', gap: '10px',
          padding: '9px 12px', width: '100%', textAlign: 'left',
          background: 'transparent', border: 'none', borderRadius: '8px', cursor: 'pointer',
        }}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M7 16H3a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h4" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M12 13l3-4-3-4M15 9H7" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span style={{ fontFamily: 'Inter', fontSize: '14px', color: '#374151' }}>Logout</span>
        </button>
      </div>
    </aside>
  );
}

/* ── Toggle ──────────────────────────────────────────────────── */
function Toggle({ on }: { on: boolean }) {
  return (
    <div style={{
      width: '44px', height: '24px', borderRadius: '12px',
      background: on ? '#2563EB' : '#CBD5E1',
      position: 'relative', flexShrink: 0, cursor: 'pointer',
    }}>
      <div style={{
        position: 'absolute', top: '3px',
        left: on ? '23px' : '3px',
        width: '18px', height: '18px', borderRadius: '50%',
        background: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
        transition: 'left 0.15s',
      }} />
    </div>
  );
}

/* ── Page ────────────────────────────────────────────────────── */
export default function SettingsPage() {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState('General');
  const [themeMode, setThemeMode] = useState<'Light' | 'Dark'>('Dark');
  const [selectedAccent, setSelectedAccent] = useState('#2563EB');

  const accentColors = ['#2563EB', '#16A34A', '#7C3AED', '#DC2626', '#D97706', '#0F172A'];

  const prefSections = [
    {
      label: 'General',
      icon: (
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
          <rect x="0.5" y="0.5" width="5.5" height="5.5" rx="1" stroke="currentColor" strokeWidth="1.3" />
          <rect x="9" y="0.5" width="5.5" height="5.5" rx="1" stroke="currentColor" strokeWidth="1.3" />
          <rect x="0.5" y="9" width="5.5" height="5.5" rx="1" stroke="currentColor" strokeWidth="1.3" />
          <rect x="9" y="9" width="5.5" height="5.5" rx="1" stroke="currentColor" strokeWidth="1.3" />
        </svg>
      ),
    },
    {
      label: 'Fleet Settings',
      icon: (
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
          <rect x="0.5" y="3.5" width="9" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
          <path d="M9.5 5.5h3l2 3.5H9.5V5.5Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
          <circle cx="3.5" cy="12.5" r="1.3" fill="currentColor" />
          <circle cx="10.5" cy="12.5" r="1.3" fill="currentColor" />
        </svg>
      ),
    },
    {
      label: 'Notifications',
      icon: (
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
          <path d="M12 5.5A4.5 4.5 0 0 0 3 5.5c0 4.5-1.5 6-1.5 6h12s-1.5-1.5-1.5-6M8.7 13a1.3 1.3 0 0 1-2.4 0" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      label: 'User Management',
      icon: (
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
          <circle cx="5.5" cy="4.5" r="2.5" stroke="currentColor" strokeWidth="1.3" />
          <path d="M1 13c0-2.485 2.015-4.5 4.5-4.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
          <path d="M10 9.5v5M7.5 12h5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      label: 'Billing & API',
      icon: (
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
          <rect x="0.75" y="2.75" width="13.5" height="9.5" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
          <path d="M0.75 6h13.5" stroke="currentColor" strokeWidth="1.3" />
        </svg>
      ),
    },
    {
      label: 'Appearance',
      icon: (
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
          <circle cx="7.5" cy="7.5" r="6" stroke="currentColor" strokeWidth="1.3" />
          <circle cx="5" cy="5.5" r="1" fill="currentColor" />
          <circle cx="10" cy="5.5" r="1" fill="currentColor" />
          <path d="M4.5 10c0 0 1 2 3 2s3-2 3-2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        </svg>
      ),
    },
  ];

  return (
    /* Outer shell — max 1280px, sidebar 256px + content 1024px */
    <div style={{
      display: 'flex', width: '100vw', minHeight: '100vh',
      maxWidth: '1280px', margin: '0 auto',
      background: '#F8FAFC', fontFamily: 'Inter, sans-serif',
      overflow: 'hidden',
    }}>
      <Sidebar />

      {/* Content column — exactly 1024px wide, 1297px tall */}
      <div style={{
        width: '1024px', minHeight: '1297px', flexShrink: 0,
        display: 'flex', flexDirection: 'column',
        background: '#F8FAFC',
      }}>

        {/* ── Navbar — height 64px, top: 0 ── */}
        <header style={{
          width: '1024px', height: '64px', flexShrink: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 32px',
          background: '#fff',
          borderBottom: '1px solid #F1F5F9',
          boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
          position: 'sticky', top: 0, zIndex: 20,
          boxSizing: 'border-box',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontFamily: 'Inter', fontSize: '18px', fontWeight: 700, color: '#0F172A' }}>
              Platform Configuration
            </span>
            <span style={{
              padding: '2px 8px', borderRadius: '5px',
              background: '#DBEAFE', border: '1px solid #93C5FD',
              fontFamily: 'Inter', fontSize: '10px', fontWeight: 700,
              color: '#1D4ED8', letterSpacing: '0.4px',
            }}>
              ENTERPRISE
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            {/* Bell */}
            <button suppressHydrationWarning style={{
              width: '36px', height: '36px', borderRadius: '8px', background: 'transparent',
              border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              position: 'relative',
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0"
                  stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            {/* Help */}
            <button suppressHydrationWarning style={{
              width: '36px', height: '36px', borderRadius: '8px', background: 'transparent',
              border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="#64748B" strokeWidth="1.5" />
                <path d="M12 17v-2M12 9a2 2 0 1 1 0 4" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" />
                <circle cx="12" cy="17" r="0.5" fill="#64748B" />
              </svg>
            </button>
            {/* Admin User */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: '8px' }}>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontFamily: 'Inter', fontSize: '13px', fontWeight: 600, color: '#0F172A', lineHeight: '18px' }}>Admin User</div>
                <div style={{ fontFamily: 'Inter', fontSize: '11px', color: '#64748B', lineHeight: '15px' }}>Fleet Operations</div>
              </div>
              <div style={{
                width: '36px', height: '36px', borderRadius: '50%', background: '#FCD34D',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                overflow: 'hidden',
              }}>
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <circle cx="11" cy="8" r="4" fill="#92400E" />
                  <path d="M2 20c0-4.418 4.029-8 9-8s9 3.582 9 8" fill="#92400E" />
                </svg>
              </div>
            </div>
          </div>
        </header>

        {/* ── Body below navbar — top: 64px, flex row ── */}
        <div style={{ display: 'flex', flex: 1 }}>

          {/* Preference sections panel */}
          <div style={{
            width: '176px', flexShrink: 0,
            background: '#fff', borderRight: '1px solid #E2E8F0',
            padding: '24px 10px 24px',
            display: 'flex', flexDirection: 'column', gap: '2px',
          }}>
            <div style={{
              fontFamily: 'Inter', fontSize: '9px', fontWeight: 700,
              color: '#94A3B8', letterSpacing: '1px',
              marginBottom: '10px', paddingLeft: '10px',
            }}>
              PREFERENCE SECTIONS
            </div>
            {prefSections.map((sec) => {
              const isActive = activeSection === sec.label;
              return (
                <button
                  suppressHydrationWarning
                  key={sec.label}
                  onClick={() => {
                    if (sec.label === 'Fleet Settings')   { router.push('/settings/fleet-settings'); return; }
                    if (sec.label === 'Notifications')    { router.push('/settings/notifications'); return; }
                    if (sec.label === 'User Management')  { router.push('/settings/user-management'); return; }
                    if (sec.label === 'Appearance')       { router.push('/settings/appearance'); return; }
                    if (sec.label === 'Billing & API')    { router.push('/settings/billing-api'); return; }
                    setActiveSection(sec.label);
                  }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '9px',
                    padding: '8px 10px', width: '100%', textAlign: 'left',
                    background: isActive ? '#EFF6FF' : 'transparent',
                    border: 'none',
                    borderLeft: isActive ? '3px solid #2563EB' : '3px solid transparent',
                    borderRadius: isActive ? '0 6px 6px 0' : '6px',
                    cursor: 'pointer',
                  }}
                >
                  <span style={{ display: 'flex', color: isActive ? '#2563EB' : '#64748B', flexShrink: 0 }}>
                    {sec.icon}
                  </span>
                  <span style={{
                    fontFamily: 'Inter', fontSize: '13px',
                    fontWeight: isActive ? 600 : 400,
                    color: isActive ? '#2563EB' : '#374151',
                    lineHeight: '18px',
                  }}>
                    {sec.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* ── Main content — width: 848px, padding: 32px, gap: 32px ── */}
          <div style={{
            flex: 1,
            padding: '32px',
            display: 'flex', flexDirection: 'column', gap: '32px',
            overflowY: 'auto',
            boxSizing: 'border-box',
          }}>

            {/* 1. General Platform */}
            <section style={{
              background: '#fff', borderRadius: '12px',
              border: '1px solid #E2E8F0', padding: '24px',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '22px' }}>
                <div>
                  <h2 style={{ margin: 0, fontFamily: 'Inter', fontSize: '17px', fontWeight: 700, color: '#0F172A' }}>
                    General Platform
                  </h2>
                  <p style={{ margin: '4px 0 0', fontFamily: 'Inter', fontSize: '13px', color: '#64748B' }}>
                    Manage your core brand identity and localization.
                  </p>
                </div>
                <button suppressHydrationWarning style={{
                  height: '36px', padding: '0 18px',
                  background: '#2563EB', border: 'none', borderRadius: '7px',
                  fontFamily: 'Inter', fontSize: '12px', fontWeight: 700, color: '#fff',
                  cursor: 'pointer', letterSpacing: '0.3px', flexShrink: 0,
                }}>
                  SAVE CHANGES
                </button>
              </div>

              {/*
                Outer grid — 608px total, 3 equal columns (181.33px each), column-gap 32px
                  Col 1        : Platform Logo
                  Col 2–3 span : Fields 2×2 sub-grid (394.67px), row-gap 16px, col-gap 16px
              */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 181.33px)',
                columnGap: '32px',
                alignItems: 'start',
              }}>

                {/* ── Platform Logo — col 1 ── */}
                <div style={{ gridColumn: '1' }}>
                  <div style={{
                    fontFamily: 'Inter', fontSize: '12px', fontWeight: 600,
                    color: '#94A3B8', letterSpacing: '-0.6px', lineHeight: '16px',
                    textTransform: 'uppercase', marginBottom: '8px',
                  }}>
                    Platform Logo
                  </div>
                  {/* Dashed logo box */}
                  <div style={{
                    width: '100px', height: '100px', borderRadius: '10px',
                    border: '1.5px dashed #CBD5E1', background: '#F8FAFC',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <div style={{
                      width: '76px', height: '76px', borderRadius: '8px',
                      background: '#1E5A5A',
                      display: 'flex', flexDirection: 'column',
                      alignItems: 'center', justifyContent: 'center', gap: '2px',
                    }}>
                      <span style={{
                        fontFamily: 'Inter', fontSize: '11px', fontWeight: 800,
                        color: '#fff', letterSpacing: '0.5px',
                      }}>CARRY ON</span>
                      <span style={{
                        fontFamily: 'Inter', fontSize: '6px', fontWeight: 400,
                        color: 'rgba(255,255,255,0.6)', letterSpacing: '0.3px',
                      }}>FLEET PLATFORM</span>
                    </div>
                  </div>
                  {/* Edit button below logo box */}
                  <div style={{ marginTop: '8px', display: 'flex', justifyContent: 'flex-end', width: '100px' }}>
                    <button suppressHydrationWarning style={{
                      width: '28px', height: '28px', borderRadius: '50%',
                      background: '#2563EB', border: '2px solid #fff',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      cursor: 'pointer',
                      boxShadow: '0 1px 4px rgba(0,0,0,0.15)',
                    }}>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M8.5 1.5l2 2-6.5 6.5H2v-2L8.5 1.5Z" stroke="white" strokeWidth="1.2" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/*
                  ── Fields — col 2–3 (394.67px) ──
                  2×2 sub-grid: Platform Name & System Language in row 1,
                  Primary Timezone spanning both cols in row 2.
                  Each field cell: height 66px = label(16) + gap(6) + input(44)
                */}
                <div style={{
                  gridColumn: '2 / span 2',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 189.33px)',
                  rowGap: '16px',
                  columnGap: '16px',
                }}>

                  {/* Platform Name — row 1, col 1 */}
                  <div style={{
                    gridColumn: '1', gridRow: '1',
                    display: 'flex', flexDirection: 'column', gap: '6px',
                    height: '66px',
                  }}>
                    <label style={{
                      fontFamily: 'Inter', fontSize: '12px', fontWeight: 600,
                      color: '#374151', letterSpacing: '-0.6px', lineHeight: '16px',
                      textTransform: 'uppercase', height: '16px',
                    }}>
                      Platform Name
                    </label>
                    <input
                      suppressHydrationWarning
                      defaultValue="Carry On Logistics"
                      style={{
                        width: '189.33px', height: '44px',
                        padding: '12px 16px',
                        border: 'none', borderRadius: '8px',
                        fontFamily: 'Inter', fontSize: '14px', fontWeight: 400,
                        lineHeight: '20px', color: '#1E293B',
                        background: '#B7DAF5', outline: 'none',
                        boxSizing: 'border-box',
                      }}
                    />
                  </div>

                  {/* System Language — row 1, col 2 */}
                  <div style={{
                    gridColumn: '2', gridRow: '1',
                    display: 'flex', flexDirection: 'column', gap: '6px',
                    height: '66px',
                  }}>
                    <label style={{
                      fontFamily: 'Inter', fontSize: '12px', fontWeight: 600,
                      color: '#374151', letterSpacing: '-0.6px', lineHeight: '16px',
                      textTransform: 'uppercase', height: '16px',
                    }}>
                      System Language
                    </label>
                    <div style={{ position: 'relative', width: '189.33px', height: '44px' }}>
                      <select suppressHydrationWarning style={{
                        width: '100%', height: '44px',
                        padding: '12px 36px 12px 16px',
                        border: 'none', borderRadius: '8px',
                        fontFamily: 'Inter', fontSize: '14px', fontWeight: 400,
                        lineHeight: '20px', color: '#1E293B',
                        background: '#B7DAF5', outline: 'none',
                        cursor: 'pointer', appearance: 'none',
                        boxSizing: 'border-box',
                      }}>
                        <option>English (US)</option>
                        <option>Spanish</option>
                        <option>French</option>
                      </select>
                      <svg style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
                        width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M2 4l4 4 4-4" stroke="#1E293B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>

                  {/* Primary Timezone — row 2, col 1–2 */}
                  <div style={{
                    gridColumn: '1 / span 2', gridRow: '2',
                    display: 'flex', flexDirection: 'column', gap: '6px',
                    height: '66px',
                  }}>
                    <label style={{
                      fontFamily: 'Inter', fontSize: '12px', fontWeight: 600,
                      color: '#374151', letterSpacing: '-0.6px', lineHeight: '16px',
                      textTransform: 'uppercase', height: '16px',
                    }}>
                      Primary Timezone
                    </label>
                    <div style={{ position: 'relative', width: '100%', height: '44px' }}>
                      <span style={{
                        position: 'absolute', left: '14px', top: '50%',
                        transform: 'translateY(-50%)', pointerEvents: 'none', display: 'flex',
                      }}>
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                          <circle cx="7.5" cy="7.5" r="6.5" stroke="#1E293B" strokeWidth="1.3" />
                          <path d="M7.5 3v4.5l2.5 1.5" stroke="#1E293B" strokeWidth="1.3" strokeLinecap="round" />
                        </svg>
                      </span>
                      <select suppressHydrationWarning style={{
                        width: '100%', height: '44px',
                        padding: '12px 36px 12px 36px',
                        border: 'none', borderRadius: '8px',
                        fontFamily: 'Inter', fontSize: '14px', fontWeight: 400,
                        lineHeight: '20px', color: '#1E293B',
                        background: '#B7DAF5', outline: 'none',
                        cursor: 'pointer', appearance: 'none',
                        boxSizing: 'border-box',
                      }}>
                        <option>(GMT-05:00) Eastern Time (US & Canada)</option>
                        <option>(GMT-06:00) Central Time (US & Canada)</option>
                        <option>(GMT-07:00) Mountain Time (US & Canada)</option>
                        <option>(GMT-08:00) Pacific Time (US & Canada)</option>
                      </select>
                      <svg style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
                        width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M2 4l4 4 4-4" stroke="#1E293B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>

                </div>{/* end fields sub-grid */}
              </div>{/* end outer 3-col grid */}
            </section>

            {/* 2. Driver Payouts + Quick Triggers — 2 columns */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>

              {/* Driver Payouts */}
              <section style={{
                background: '#fff', borderRadius: '12px',
                border: '1px solid #E2E8F0', padding: '22px',
              }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '14px' }}>
                  <div style={{
                    width: '36px', height: '36px', borderRadius: '8px',
                    background: '#DBEAFE', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}>
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <rect x="1" y="4" width="16" height="10" rx="2" stroke="#2563EB" strokeWidth="1.5" />
                      <circle cx="9" cy="9" r="2" stroke="#2563EB" strokeWidth="1.5" />
                    </svg>
                  </div>
                  <div>
                    <div style={{ fontFamily: 'Inter', fontSize: '15px', fontWeight: 700, color: '#1E3A5F', marginBottom: '4px' }}>
                      Driver Payouts
                    </div>
                    <div style={{ fontFamily: 'Inter', fontSize: '12px', color: '#3B82F6', lineHeight: '1.5' }}>
                      Configure dynamic payout multipliers<br />and base rates per delivery mile.
                    </div>
                  </div>
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <span style={{ fontFamily: 'Inter', fontSize: '30px', fontWeight: 800, color: '#1E3A5F' }}>$2.45</span>
                  <span style={{ fontFamily: 'Inter', fontSize: '13px', color: '#64748B', marginLeft: '6px' }}>base / mile</span>
                </div>
                <button suppressHydrationWarning style={{
                  width: '100%', height: '36px', borderRadius: '7px',
                  background: '#2563EB', border: 'none',
                  fontFamily: 'Inter', fontSize: '13px', fontWeight: 600, color: '#fff',
                  cursor: 'pointer',
                }}>
                  Adjust Rates
                </button>
              </section>

              {/* Quick Triggers */}
              <section style={{
                background: '#fff', borderRadius: '12px',
                border: '1px solid #E2E8F0', padding: '22px',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M9 1L1 9h6l-1 6 8-8H8l1-6Z" fill="#F59E0B" stroke="#F59E0B" strokeWidth="0.4" strokeLinejoin="round" />
                  </svg>
                  <span style={{ fontFamily: 'Inter', fontSize: '15px', fontWeight: 700, color: '#0F172A' }}>Quick Triggers</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontFamily: 'Inter', fontSize: '14px', fontWeight: 600, color: '#0F172A' }}>Critical Delays</div>
                      <div style={{ fontFamily: 'Inter', fontSize: '11px', color: '#94A3B8', marginTop: '2px' }}>+Mr • Pete</div>
                    </div>
                    <Toggle on={true} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontFamily: 'Inter', fontSize: '14px', fontWeight: 600, color: '#0F172A' }}>New Order Placement</div>
                      <div style={{ fontFamily: 'Inter', fontSize: '11px', color: '#94A3B8', marginTop: '2px' }}>EMAIL ONLY</div>
                    </div>
                    <Toggle on={false} />
                  </div>
                </div>
              </section>
            </div>

            {/* 3. Infrastructure & Security */}
            <section style={{
              background: '#fff', borderRadius: '12px',
              border: '1px solid #E2E8F0', padding: '24px',
            }}>
              <h3 style={{ margin: '0 0 22px', fontFamily: 'Inter', fontSize: '16px', fontWeight: 700, color: '#0F172A' }}>
                Infrastructure & Security
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>

                {/* Left — API Keys + Role-Based Access */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>

                  {/* Active API Keys */}
                  <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                    <div style={{
                      width: '40px', height: '40px', borderRadius: '10px', background: '#F1F5F9',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    }}>
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <circle cx="7" cy="10" r="4" stroke="#64748B" strokeWidth="1.4" />
                        <path d="M11 7.5l7 7M15.5 11l2 2" stroke="#64748B" strokeWidth="1.4" strokeLinecap="round" />
                      </svg>
                    </div>
                    <div>
                      <div style={{ fontFamily: 'Inter', fontSize: '14px', fontWeight: 700, color: '#0F172A', marginBottom: '3px' }}>
                        Active API Keys
                      </div>
                      <div style={{ fontFamily: 'Inter', fontSize: '12px', color: '#64748B', marginBottom: '8px' }}>
                        4 Production keys generating traffic.
                      </div>
                      <div style={{
                        display: 'inline-block', padding: '3px 10px',
                        background: '#F1F5F9', borderRadius: '5px',
                        fontFamily: 'monospace', fontSize: '12px', color: '#475569',
                      }}>
                        live_pk_51K...a79w
                      </div>
                    </div>
                  </div>

                  {/* Role-Based Access */}
                  <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                    <div style={{
                      width: '40px', height: '40px', borderRadius: '10px', background: '#F1F5F9',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    }}>
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <circle cx="7" cy="6.5" r="3" stroke="#64748B" strokeWidth="1.4" />
                        <path d="M1 17.5c0-3.038 2.686-5.5 6-5.5" stroke="#64748B" strokeWidth="1.4" strokeLinecap="round" />
                        <circle cx="14" cy="6.5" r="3" stroke="#64748B" strokeWidth="1.4" />
                        <path d="M19 17.5c0-3.038-2.686-5.5-6-5.5" stroke="#64748B" strokeWidth="1.4" strokeLinecap="round" />
                      </svg>
                    </div>
                    <div>
                      <div style={{ fontFamily: 'Inter', fontSize: '14px', fontWeight: 700, color: '#0F172A', marginBottom: '3px' }}>
                        Role-Based Access
                      </div>
                      <div style={{ fontFamily: 'Inter', fontSize: '12px', color: '#64748B', marginBottom: '6px' }}>
                        Manage permissions for 12 staff members.
                      </div>
                      <button suppressHydrationWarning style={{
                        background: 'none', border: 'none', padding: 0,
                        fontFamily: 'Inter', fontSize: '13px', fontWeight: 600,
                        color: '#2563EB', cursor: 'pointer',
                      }}>
                        Configure Permissions
                      </button>
                    </div>
                  </div>
                </div>

                {/* Right — Active Plan */}
                <div style={{
                  background: '#F8FAFC', borderRadius: '10px',
                  border: '1px solid #E2E8F0', padding: '20px',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                    <span style={{
                      fontFamily: 'Inter', fontSize: '10px', fontWeight: 600,
                      color: '#94A3B8', letterSpacing: '0.6px',
                    }}>
                      ACTIVE PLAN
                    </span>
                    <span style={{
                      padding: '3px 8px', borderRadius: '5px',
                      background: '#2563EB', color: '#fff',
                      fontFamily: 'Inter', fontSize: '10px', fontWeight: 700,
                    }}>
                      Pro Enterprise
                    </span>
                  </div>

                  <div style={{ marginBottom: '4px' }}>
                    <span style={{ fontFamily: 'Inter', fontSize: '34px', fontWeight: 800, color: '#0F172A', lineHeight: 1 }}>
                      $899
                    </span>
                    <span style={{ fontFamily: 'Inter', fontSize: '14px', color: '#64748B' }}>/mo</span>
                  </div>
                  <div style={{ fontFamily: 'Inter', fontSize: '12px', color: '#94A3B8', marginBottom: '16px' }}>
                    Next billing date: Oct 24, 2023
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '18px' }}>
                    {['Unlimited Driver Accounts', 'Real-time Map Integration', 'Full API Access'].map((feat) => (
                      <div key={feat} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                          <circle cx="7.5" cy="7.5" r="6.5" fill="#16A34A" />
                          <path d="M4 7.5l2.5 2.5 4.5-4.5" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span style={{ fontFamily: 'Inter', fontSize: '13px', color: '#374151' }}>{feat}</span>
                      </div>
                    ))}
                  </div>

                  <button suppressHydrationWarning style={{
                    width: '100%', height: '38px', borderRadius: '7px',
                    background: '#2563EB', border: 'none',
                    fontFamily: 'Inter', fontSize: '12px', fontWeight: 700, color: '#fff',
                    cursor: 'pointer', letterSpacing: '0.3px',
                  }}>
                    MANAGE BILLING
                  </button>
                </div>
              </div>
            </section>

            {/* 4. Visual Environment */}
            <section style={{
              background: '#fff', borderRadius: '12px',
              border: '1px solid #E2E8F0', padding: '24px',
            }}>
              <h3 style={{ margin: '0 0 22px', fontFamily: 'Inter', fontSize: '16px', fontWeight: 700, color: '#0F172A' }}>
                Visual Environment
              </h3>

              <div style={{ display: 'flex', gap: '56px', alignItems: 'flex-start' }}>
                {/* Theme Mode */}
                <div>
                  <div style={{
                    fontFamily: 'Inter', fontSize: '10px', fontWeight: 600,
                    color: '#94A3B8', letterSpacing: '0.5px', marginBottom: '10px',
                  }}>
                    THEME MODE
                  </div>
                  <div style={{
                    display: 'inline-flex', borderRadius: '8px',
                    border: '1px solid #E2E8F0', overflow: 'hidden',
                    background: '#F8FAFC',
                  }}>
                    {(['Light', 'Dark'] as const).map((mode) => (
                      <button
                        suppressHydrationWarning
                        key={mode}
                        onClick={() => setThemeMode(mode)}
                        style={{
                          padding: '8px 18px',
                          background: themeMode === mode ? '#fff' : 'transparent',
                          border: 'none',
                          boxShadow: themeMode === mode ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                          cursor: 'pointer',
                          fontFamily: 'Inter', fontSize: '13px',
                          fontWeight: themeMode === mode ? 600 : 400,
                          color: themeMode === mode ? '#0F172A' : '#64748B',
                          display: 'flex', alignItems: 'center', gap: '6px',
                          margin: '3px',
                          borderRadius: '6px',
                        }}
                      >
                        {mode === 'Light' ? (
                          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                            <circle cx="6.5" cy="6.5" r="2.5" stroke="currentColor" strokeWidth="1.3" />
                            <path d="M6.5 1v1.5M6.5 10.5V12M1 6.5h1.5M10.5 6.5H12M2.64 2.64l1.06 1.06M9.3 9.3l1.06 1.06M2.64 10.36l1.06-1.06M9.3 3.7l1.06-1.06" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                          </svg>
                        ) : (
                          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                            <path d="M10.5 7.5A5 5 0 1 1 5.5 2.5c0 0 2.5.5 3.5 2.5s1.5 2.5 1.5 2.5Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                          </svg>
                        )}
                        {mode}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Brand Accents */}
                <div>
                  <div style={{
                    fontFamily: 'Inter', fontSize: '10px', fontWeight: 600,
                    color: '#94A3B8', letterSpacing: '0.5px', marginBottom: '10px',
                  }}>
                    BRAND ACCENTS
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {accentColors.map((color) => (
                      <button
                        suppressHydrationWarning
                        key={color}
                        onClick={() => setSelectedAccent(color)}
                        style={{
                          width: '32px', height: '32px', borderRadius: '50%',
                          background: color, border: 'none', cursor: 'pointer',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          outline: selectedAccent === color ? '2.5px solid #0F172A' : '2.5px solid transparent',
                          outlineOffset: '2px',
                        }}
                      >
                        {selectedAccent === color && (
                          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                            <path d="M2 6.5l3 3 6-6" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </button>
                    ))}
                    <button suppressHydrationWarning style={{
                      padding: '6px 12px', borderRadius: '7px',
                      background: '#fff', border: '1px solid #E2E8F0',
                      fontFamily: 'Inter', fontSize: '12px', color: '#374151',
                      cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px',
                      marginLeft: '4px',
                    }}>
                      <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                        <path d="M8 1.5l1.5 1.5-6 6H2v-1.5l6-6Z" stroke="#374151" strokeWidth="1.2" strokeLinejoin="round" />
                      </svg>
                      Custom Hex
                    </button>
                  </div>
                </div>
              </div>
            </section>

          </div>{/* end main content */}
        </div>{/* end body row */}

        {/* ── Footer ── */}
        <footer style={{
          width: '1024px', height: '44px', flexShrink: 0,
          borderTop: '1px solid #E2E8F0', background: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 32px', boxSizing: 'border-box',
        }}>
          <span style={{ fontFamily: 'Inter', fontSize: '11px', color: '#94A3B8' }}>
            © 2023 Carry On Logistics Platform. All rights reserved.
          </span>
          <div style={{ display: 'flex', gap: '20px' }}>
            {['Documentation', 'Privacy Policy', 'r tatus: r ystem Operational'].map((link) => (
              <span key={link} style={{ fontFamily: 'Inter', fontSize: '11px', color: '#94A3B8', cursor: 'pointer' }}>
                {link}
              </span>
            ))}
          </div>
        </footer>

      </div>{/* end content column */}
    </div>
  );
}
