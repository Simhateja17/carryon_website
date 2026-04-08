'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

/* ── Sidebar nav items ──────────────────────────────────────────── */
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
          stroke="currentColor" strokeWidth="1.5" />
        <circle cx="9" cy="6" r="2" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: 'Orders',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <rect x="1" y="5" width="12" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M13 7.5h2.5l2 4H13V7.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <circle cx="4.5" cy="15.5" r="1.5" fill="currentColor" />
        <circle cx="12.5" cy="15.5" r="1.5" fill="currentColor" />
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
    label: 'Analytics',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <rect x="2" y="3" width="14" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M5 11l3-4 3 3 3-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

/* ── Sidebar ─────────────────────────────────────────────────────── */
function Sidebar() {
  const router = useRouter();
  return (
    <aside style={{
      width: '220px', minWidth: '220px', height: '100vh', flexShrink: 0,
      background: '#fff', borderRight: '1px solid #E2E8F0',
      display: 'flex', flexDirection: 'column',
      position: 'sticky', top: 0,
    }}>
      {/* Logo */}
      <div style={{ padding: '20px 20px 16px' }}>
        <span style={{ fontFamily: 'Inter', fontSize: '20px', fontWeight: 700 }}>
          <span style={{ color: '#2F80ED' }}>Carry </span>
          <span style={{ color: '#0F172A' }}>On</span>
        </span>
        <div style={{ fontFamily: 'Inter', fontSize: '9px', fontWeight: 600, color: '#94A3B8', marginTop: '2px', letterSpacing: '0.5px' }}>
          LOGISTICS ADMIN
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '4px 12px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
        {sideNav.map((item) => {
          const isActive = item.label === 'Orders';
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
              }}
              style={{
                display: 'flex', alignItems: 'center', gap: '12px',
                padding: '10px 14px', width: '100%', textAlign: 'left',
                background: isActive ? '#EFF6FF' : 'transparent',
                border: 'none',
                borderLeft: isActive ? '3px solid #2F80ED' : '3px solid transparent',
                borderRadius: isActive ? '0 8px 8px 0' : '8px',
                cursor: 'pointer',
                color: isActive ? '#2F80ED' : '#64748B',
              }}
            >
              <span style={{ display: 'flex', color: isActive ? '#2F80ED' : '#64748B', flexShrink: 0 }}>
                {item.icon}
              </span>
              <span style={{
                fontFamily: 'Inter', fontSize: '14px',
                fontWeight: isActive ? 600 : 400,
                color: isActive ? '#2F80ED' : '#374151',
              }}>
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Bottom */}
      <div style={{ padding: '12px 16px 20px', borderTop: '1px solid #F1F5F9', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {/* NEW DISPATCH button */}
        <button suppressHydrationWarning onClick={() => router.push('/orders/create')} style={{
          width: '100%', height: '40px', borderRadius: '8px',
          background: '#2F80ED', border: 'none', cursor: 'pointer',
          fontFamily: 'Inter', fontSize: '13px', fontWeight: 600, color: '#fff',
        }}>
          NEW DISPATCH
        </button>
        {/* Settings */}
        <button suppressHydrationWarning style={{
          display: 'flex', alignItems: 'center', gap: '8px',
          padding: '8px 12px', borderRadius: '8px',
          background: 'transparent', border: 'none', cursor: 'pointer',
          fontFamily: 'Inter', fontSize: '13px', color: '#64748B',
        }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="3" stroke="#64748B" strokeWidth="1.2" />
            <path d="M8 1v1.5M8 13.5V15M1 8h1.5M13.5 8H15M3.05 3.05l1.06 1.06M11.89 11.89l1.06 1.06M3.05 12.95l1.06-1.06M11.89 4.11l1.06-1.06"
              stroke="#64748B" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
          Settings
        </button>
        {/* Support */}
        <button suppressHydrationWarning style={{
          display: 'flex', alignItems: 'center', gap: '8px',
          padding: '8px 12px', borderRadius: '8px',
          background: 'transparent', border: 'none', cursor: 'pointer',
          fontFamily: 'Inter', fontSize: '13px', color: '#64748B',
        }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="7" stroke="#64748B" strokeWidth="1.2" />
            <path d="M8 11V8M8 5h.01" stroke="#64748B" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
          Support
        </button>
      </div>
    </aside>
  );
}

/* ── Event Log Item ───────────────────────────────────────────────── */
function EventItem({
  icon, title, time, description, tag1, tag2, dotColor,
}: {
  icon: React.ReactNode; title: string; time: string;
  description: string; tag1?: string; tag2?: string; dotColor: string;
}) {
  return (
    <div style={{
      display: 'flex', padding: '20px', alignItems: 'flex-start', gap: '16px',
      alignSelf: 'stretch', borderBottom: '1px solid #F8FAFC',
    }}>
      {/* Icon circle */}
      <div style={{
        display: 'flex', width: '32px', height: '32px',
        justifyContent: 'center', alignItems: 'center', flexShrink: 0,
        borderRadius: '50%', background: dotColor,
      }}>
        {icon}
      </div>
      {/* Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <span style={{ fontFamily: 'Inter', fontSize: '14px', fontWeight: 600, color: '#191C1E' }}>{title}</span>
          <span style={{ fontFamily: 'Inter', fontSize: '11px', color: '#94A3B8', whiteSpace: 'nowrap', marginLeft: '12px' }}>{time}</span>
        </div>
        <p style={{ fontFamily: 'Inter', fontSize: '12px', color: '#64748B', margin: 0, lineHeight: '18px' }}>{description}</p>
        {(tag1 || tag2) && (
          <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
            {tag1 && (
              <button suppressHydrationWarning style={{
                padding: '3px 10px', borderRadius: '4px', border: '1px solid #E2E8F0',
                background: '#F8FAFC', fontFamily: 'Inter', fontSize: '11px',
                fontWeight: 600, color: '#374151', cursor: 'pointer',
              }}>{tag1}</button>
            )}
            {tag2 && (
              <button suppressHydrationWarning style={{
                padding: '3px 10px', borderRadius: '4px', border: '1px solid #E2E8F0',
                background: '#F8FAFC', fontFamily: 'Inter', fontSize: '11px',
                fontWeight: 600, color: '#374151', cursor: 'pointer',
              }}>{tag2}</button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Main Page ──────────────────────────────────────────────────────── */
export default function DispatchDetailPage() {
  const router = useRouter();

  return (
    <div style={{
      display: 'flex', width: '1280px', minWidth: '1280px',
      minHeight: '1184px', alignItems: 'flex-start', background: '#F7F9FB',
    }}>
      <Sidebar />

      {/* Right content column */}
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
        flex: '1 0 0', alignSelf: 'stretch',
      }}>

        {/* ── Top Navbar ── */}
        <header style={{
          display: 'flex', height: '64px', padding: '0 24px',
          justifyContent: 'space-between', alignItems: 'center', alignSelf: 'stretch',
          borderBottom: '1px solid #F1F5F9',
          background: 'rgba(255, 255, 255, 0.80)',
          boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
          backdropFilter: 'blur(12px)',
          position: 'sticky', top: 0, zIndex: 20,
        }}>
          {/* Centered search */}
          <div style={{
            display: 'flex', paddingRight: '177px',
            justifyContent: 'center', alignItems: 'center', flex: '1 0 0',
          }}>
            <div style={{
              display: 'flex', padding: '9px 16px 10px 40px',
              justifyContent: 'center', alignItems: 'flex-start', alignSelf: 'stretch',
              borderRadius: '2px', background: '#E0E3E5', position: 'relative',
              width: '340px',
            }}>
              <svg style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }}
                width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M6.333 11.333A5 5 0 1 0 6.333 1.333a5 5 0 0 0 0 10ZM13 13l-2.733-2.733"
                  stroke="#9CA3AF" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <input
                suppressHydrationWarning
                type="text"
                placeholder="Search dispatches, drivers or VIN..."
                style={{
                  background: 'transparent', border: 'none', outline: 'none',
                  fontFamily: 'Inter', fontSize: '14px', fontWeight: 400,
                  color: '#6B7280', width: '100%',
                }}
              />
            </div>
          </div>

          {/* Right: icons + user */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {/* Bell with badge */}
            <div style={{ position: 'relative' }}>
              <button suppressHydrationWarning style={{
                width: '32px', height: '32px', borderRadius: '8px',
                background: 'transparent', border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0"
                    stroke="#374151" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <div style={{
                position: 'absolute', top: '4px', right: '4px',
                width: '7px', height: '7px', borderRadius: '50%',
                background: '#EF4444', border: '1.5px solid #fff',
              }} />
            </div>
            {/* Chat */}
            <button suppressHydrationWarning style={{
              width: '32px', height: '32px', borderRadius: '8px',
              background: 'transparent', border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
                  stroke="#374151" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            {/* Help */}
            <button suppressHydrationWarning style={{
              width: '32px', height: '32px', borderRadius: '8px',
              background: 'transparent', border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="#374151" strokeWidth="1.5" />
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01"
                  stroke="#374151" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {/* Divider */}
            <div style={{ width: '1px', height: '32px', flexShrink: 0, background: '#E2E8F0' }} />

            {/* User info + avatar */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                <span style={{ fontFamily: 'Inter', fontSize: '13px', fontWeight: 600, color: '#191C1E' }}>
                  Alex Rivera
                </span>
                <span style={{ fontFamily: 'Inter', fontSize: '10px', fontWeight: 500, color: '#94A3B8', letterSpacing: '0.5px' }}>
                  SENIOR MSPATCHER
                </span>
              </div>
              {/* Avatar */}
              <div style={{
                width: '36px', height: '36px', borderRadius: '9999px',
                background: '#FED7AA', overflow: 'hidden', flexShrink: 0,
                boxShadow: '0 0 0 2px #F1F5F9',
                display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
              }}>
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <circle cx="14" cy="9" r="5" fill="#F97316" />
                  <path d="M3 26c0-6.075 4.925-11 11-11s11 4.925 11 11" fill="#F97316" />
                </svg>
              </div>
            </div>
          </div>
        </header>

        {/* ── Main content ── */}
        <main style={{
          flex: 1, padding: '32px', display: 'flex', flexDirection: 'column',
          gap: '24px', alignSelf: 'stretch',
        }}>

          {/* ── Page title row ── */}
          <div style={{
            display: 'flex', justifyContent: 'space-between',
            alignItems: 'flex-end', alignSelf: 'stretch',
          }}>
            {/* Left: breadcrumb + title + status */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {/* Breadcrumb */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', alignSelf: 'stretch' }}>
                <button suppressHydrationWarning onClick={() => router.push('/orders')} style={{
                  display: 'flex', width: '39px', height: '16px',
                  flexDirection: 'column', justifyContent: 'center',
                  color: '#64748B', fontFamily: 'Inter', fontSize: '12px',
                  fontWeight: 500, lineHeight: '16px',
                  background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                }}>
                  Orders
                </button>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M4.5 3l3 3-3 3" stroke="#94A3B8" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span style={{
                  display: 'flex', width: '134px', height: '16px',
                  flexDirection: 'column', justifyContent: 'center',
                  color: '#191C1E', fontFamily: 'Inter', fontSize: '12px',
                  fontWeight: 500, lineHeight: '16px',
                }}>
                  Dispatch #CO-88219-X
                </span>
              </div>

              {/* Title */}
              <div style={{
                display: 'flex', width: '328px', height: '36px',
                flexDirection: 'column', justifyContent: 'center',
                color: '#191C1E', fontFamily: 'Manrope', fontSize: '30px',
                fontWeight: 800, lineHeight: '36px', letterSpacing: '-0.75px',
              }}>
                Dispatch #CO-88219-X
              </div>

              {/* Status + estimated arrival */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', alignSelf: 'stretch' }}>
                {/* IN TRANSIT badge */}
                <div style={{
                  display: 'flex', padding: '4px 12px', flexDirection: 'column',
                  alignItems: 'flex-start', borderRadius: '9999px', background: '#4EDEA3',
                }}>
                  <span style={{
                    display: 'flex', width: '68px', height: '17px',
                    flexDirection: 'column', justifyContent: 'center',
                    color: '#002113', fontFamily: 'Inter', fontSize: '11px',
                    fontWeight: 700, lineHeight: '16.5px', letterSpacing: '0.55px',
                    textTransform: 'uppercase',
                  }}>
                    In Transit
                  </span>
                </div>
                {/* Estimated arrival */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <circle cx="7" cy="7" r="6" stroke="#64748B" strokeWidth="1.2" />
                    <path d="M7 4v3l2 1.5" stroke="#64748B" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span style={{ fontFamily: 'Inter', fontSize: '12px', color: '#64748B' }}>
                    Estimated Arrival: 14:45 (In 22 mins)
                  </span>
                </div>
              </div>
            </div>

            {/* Right: action buttons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <button suppressHydrationWarning style={{
                padding: '10px 20px', borderRadius: '8px',
                border: '1.5px solid #CBD5E1', background: '#fff',
                fontFamily: 'Inter', fontSize: '13px', fontWeight: 600,
                color: '#374151', cursor: 'pointer',
              }}>
                FLAG INCIDENT
              </button>
              <button suppressHydrationWarning style={{
                padding: '10px 20px', borderRadius: '8px',
                border: 'none', background: '#0058BE',
                fontFamily: 'Inter', fontSize: '13px', fontWeight: 600,
                color: '#fff', cursor: 'pointer',
              }}>
                CONTACT DRIVER
              </button>
            </div>
          </div>

          {/* ── 12-column grid ── */}
          <div style={{
            display: 'inline-grid',
            rowGap: '24px', columnGap: '24px',
            alignSelf: 'stretch',
            gridTemplateColumns: 'repeat(12, minmax(0, 1fr))',
          }}>

            {/* ── Left column (cols 1–4) ── */}
            <div style={{
              display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
              gap: '24px', alignSelf: 'start',
              gridRow: '1 / span 1', gridColumn: '1 / span 4', justifySelf: 'stretch',
            }}>

              {/* Order Summary card */}
              <div style={{
                display: 'flex', padding: '24px', flexDirection: 'column',
                alignItems: 'flex-start', gap: '24px', alignSelf: 'stretch',
                borderRadius: '12px', background: '#FFF',
              }}>
                {/* Card label */}
                <span style={{
                  alignSelf: 'stretch', color: '#94A3B8', fontFamily: 'Manrope',
                  fontSize: '14px', fontWeight: 700, lineHeight: '20px',
                  letterSpacing: '1.4px', textTransform: 'uppercase',
                }}>
                  Order Summary
                </span>

                {/* Rows */}
                <div style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
                  gap: '16px', alignSelf: 'stretch',
                }}>
                  {/* Origin row */}
                  <div style={{
                    display: 'flex', justifyContent: 'space-between',
                    alignItems: 'flex-start', alignSelf: 'stretch',
                  }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <span style={{
                        color: '#94A3B8', fontFamily: 'Inter', fontSize: '11px',
                        fontWeight: 700, lineHeight: '16.5px', textTransform: 'uppercase',
                      }}>
                        Origin
                      </span>
                      <span style={{
                        color: '#191C1E', fontFamily: 'Inter', fontSize: '14px',
                        fontWeight: 600, lineHeight: '20px',
                      }}>
                        Central Distribution Hub A
                      </span>
                      <span style={{
                        color: '#64748B', fontFamily: 'Inter', fontSize: '12px',
                        fontWeight: 400, lineHeight: '16px',
                      }}>
                        102 Logistics Way, Chicago, IL
                      </span>
                    </div>
                    {/* Location pin icon */}
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ flexShrink: 0, marginTop: '2px' }}>
                      <path d="M9 1C6.239 1 4 3.239 4 6c0 4.5 5 11 5 11s5-6.5 5-11c0-2.761-2.239-5-5-5Z"
                        stroke="#94A3B8" strokeWidth="1.5" />
                      <circle cx="9" cy="6" r="2" fill="#94A3B8" />
                    </svg>
                  </div>

                  {/* Divider */}
                  <div style={{ width: '100%', height: '1px', background: '#F1F5F9' }} />

                  {/* Destination row */}
                  <div style={{
                    display: 'flex', justifyContent: 'space-between',
                    alignItems: 'flex-start', alignSelf: 'stretch',
                  }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <span style={{
                        color: '#94A3B8', fontFamily: 'Inter', fontSize: '11px',
                        fontWeight: 700, lineHeight: '16.5px', textTransform: 'uppercase',
                      }}>
                        Destination
                      </span>
                      <span style={{
                        color: '#191C1E', fontFamily: 'Inter', fontSize: '14px',
                        fontWeight: 600, lineHeight: '20px',
                      }}>
                        Northside Medical Center
                      </span>
                      <span style={{
                        color: '#64748B', fontFamily: 'Inter', fontSize: '12px',
                        fontWeight: 400, lineHeight: '16px',
                      }}>
                        4422 Harrison Blvd, Evanston, IL
                      </span>
                    </div>
                    {/* Flag icon */}
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ flexShrink: 0, marginTop: '2px' }}>
                      <path d="M3 1v16M3 3h10l-2.5 4L13 11H3" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>

                  {/* Divider */}
                  <div style={{ width: '100%', height: '1px', background: '#F1F5F9' }} />

                  {/* Package weight + Priority */}
                  <div style={{ display: 'flex', gap: '24px', alignSelf: 'stretch' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
                      <span style={{
                        color: '#94A3B8', fontFamily: 'Inter', fontSize: '11px',
                        fontWeight: 700, lineHeight: '16.5px', textTransform: 'uppercase',
                      }}>
                        Package Weight
                      </span>
                      <span style={{
                        color: '#191C1E', fontFamily: 'Inter', fontSize: '14px',
                        fontWeight: 600, lineHeight: '20px',
                      }}>
                        142.5 kg
                      </span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
                      <span style={{
                        color: '#94A3B8', fontFamily: 'Inter', fontSize: '11px',
                        fontWeight: 700, lineHeight: '16.5px', textTransform: 'uppercase',
                      }}>
                        Priority
                      </span>
                      <span style={{
                        color: '#DC2626', fontFamily: 'Inter', fontSize: '14px',
                        fontWeight: 600, lineHeight: '20px',
                      }}>
                        High (Level 1)
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Assigned Driver card */}
              <div style={{
                display: 'flex', padding: '24px', alignItems: 'center', gap: '16px',
                alignSelf: 'stretch', borderRadius: '12px', background: '#FFF',
              }}>
                {/* Driver avatar */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/recent-driver-marcus.png"
                  alt="Marcus Thorne"
                  style={{ width: '52px', height: '52px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }}
                />
                {/* Driver info */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', flex: '1 0 0' }}>
                  <span style={{
                    alignSelf: 'stretch', color: '#94A3B8', fontFamily: 'Inter',
                    fontSize: '11px', fontWeight: 700, lineHeight: '16.5px', textTransform: 'uppercase',
                  }}>
                    Assigned Driver
                  </span>
                  <span style={{
                    alignSelf: 'stretch', color: '#191C1E', fontFamily: 'Inter',
                    fontSize: '14px', fontWeight: 700, lineHeight: '20px',
                  }}>
                    Marcus Thorne
                  </span>
                  <span style={{
                    alignSelf: 'stretch', color: '#64748B', fontFamily: 'Inter',
                    fontSize: '12px', fontWeight: 400, lineHeight: '16px',
                  }}>
                    ID: #DX-9022 • 4.9★ Rating
                  </span>
                </div>
                {/* Verified checkmark */}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
                  <circle cx="12" cy="12" r="10" fill="#006947" />
                  <path d="M8 12l3 3 5-6" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              {/* Vehicle Status card */}
              <div style={{
                display: 'flex', padding: '24px', flexDirection: 'column',
                alignItems: 'flex-start', gap: '16px', alignSelf: 'stretch',
                borderRadius: '12px', background: '#FFF',
              }}>
                {/* Header */}
                <div style={{
                  display: 'flex', justifyContent: 'space-between',
                  alignItems: 'center', alignSelf: 'stretch',
                }}>
                  <span style={{
                    color: '#94A3B8', fontFamily: 'Inter', fontSize: '11px',
                    fontWeight: 700, lineHeight: '16.5px', textTransform: 'uppercase',
                  }}>
                    Vehicle Status
                  </span>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="7" stroke="#94A3B8" strokeWidth="1.2" />
                    <path d="M8 11V8M8 5h.01" stroke="#94A3B8" strokeWidth="1.4" strokeLinecap="round" />
                  </svg>
                </div>

                {/* Vehicle row */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', alignSelf: 'stretch' }}>
                  {/* Van icon */}
                  <div style={{
                    width: '48px', height: '48px', borderRadius: '8px',
                    background: '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}>
                    <svg width="28" height="20" viewBox="0 0 28 20" fill="none">
                      <rect x="0" y="4" width="20" height="12" rx="2" fill="#475569" />
                      <path d="M20 6h4l3 5H20V6Z" fill="#475569" />
                      <circle cx="6" cy="17" r="2.5" fill="#334155" />
                      <circle cx="20" cy="17" r="2.5" fill="#334155" />
                    </svg>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{
                        color: '#191C1E', fontFamily: 'Inter', fontSize: '14px',
                        fontWeight: 700, lineHeight: '20px',
                      }}>
                        Freightliner M2 (VAN-04)
                      </span>
                      {/* Fuel row */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', alignSelf: 'stretch' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="6" height="12" viewBox="0 0 6 12" fill="none">
                          <path d="M0.583333 11.6667C0.418056 11.6667 0.279514 11.6108 0.167708 11.499C0.0559028 11.3872 0 11.2486 0 11.0833V1.75C0 1.58472 0.0559028 1.44618 0.167708 1.33438C0.279514 1.22257 0.418056 1.16667 0.583333 1.16667H1.75V0H4.08333V1.16667H5.25C5.41528 1.16667 5.55382 1.22257 5.66563 1.33438C5.77743 1.44618 5.83333 1.58472 5.83333 1.75V11.0833C5.83333 11.2486 5.77743 11.3872 5.66563 11.499C5.55382 11.6108 5.41528 11.6667 5.25 11.6667H0.583333Z" fill="#006947" />
                        </svg>
                        <span style={{
                          color: '#006947', fontFamily: 'Inter', fontSize: '12px',
                          fontWeight: 400, lineHeight: '16px',
                        }}>
                          92%
                        </span>
                        <span style={{ color: '#CBD5E1', fontFamily: 'Inter', fontSize: '12px' }}>•</span>
                        <span style={{
                          color: '#64748B', fontFamily: 'Inter', fontSize: '12px',
                          fontWeight: 400, lineHeight: '16px',
                        }}>
                          Fuel: 450mi range
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Right column (cols 5–12) ── */}
            <div style={{
              gridRow: '1 / span 1', gridColumn: '5 / span 8',
              display: 'flex', flexDirection: 'column', gap: '24px', alignSelf: 'stretch',
            }}>

              {/* Map section */}
              <div style={{
                flex: '1 0 0', alignSelf: 'stretch', position: 'relative',
                borderRadius: '12px', overflow: 'hidden', minHeight: '400px',
              }}>
                {/* Map image */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/map-preview.png"
                  alt="Route map"
                  style={{
                    width: '100%', height: '100%', minHeight: '400px',
                    objectFit: 'cover', objectPosition: 'center top',
                    display: 'block',
                  }}
                />

                {/* Map Legend overlay */}
                <div style={{
                  position: 'absolute', top: '16px', left: '16px',
                  width: '158px',
                  borderRadius: '8px', background: '#fff',
                  boxShadow: '0 20px 25px -5px rgba(0,0,0,0.10), 0 8px 10px -6px rgba(0,0,0,0.10)',
                  padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: '8px',
                }}>
                  <span style={{
                    color: '#475569', fontFamily: 'Inter', fontSize: '10px',
                    fontWeight: 800, lineHeight: '15px', letterSpacing: '1px', textTransform: 'uppercase',
                  }}>
                    Map Legend
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '12px', height: '2px', borderRadius: '9999px', background: '#0058BE', flexShrink: 0 }} />
                    <span style={{ color: '#191C1E', fontFamily: 'Inter', fontSize: '10px', fontWeight: 700, lineHeight: '15px' }}>
                      Planned Path
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '12px', height: '2px', borderRadius: '9999px', background: '#BA1A1A', flexShrink: 0 }} />
                    <span style={{ color: '#191C1E', fontFamily: 'Inter', fontSize: '10px', fontWeight: 700, lineHeight: '15px' }}>
                      Actual Path (Deviation)
                    </span>
                  </div>
                </div>

                {/* Expand Live View */}
                <button suppressHydrationWarning style={{
                  position: 'absolute', bottom: '16px', right: '16px',
                  display: 'flex', alignItems: 'center', gap: '6px',
                  padding: '8px 14px', borderRadius: '8px',
                  background: 'rgba(255,255,255,0.92)',
                  border: '1px solid #E2E8F0', cursor: 'pointer',
                  fontFamily: 'Inter', fontSize: '12px', fontWeight: 600, color: '#374151',
                  backdropFilter: 'blur(8px)',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.10)',
                }}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M1 5V1h4M9 1h4v4M13 9v4H9M5 13H1V9" stroke="#374151" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Expand Live View
                </button>
              </div>

              {/* ── Detailed Event Log ── */}
              <div style={{
                display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
                alignSelf: 'stretch', borderRadius: '12px', background: '#FFF',
              }}>
                {/* Log header */}
                <div style={{
                  display: 'flex', padding: '24px',
                  justifyContent: 'space-between', alignItems: 'center', alignSelf: 'stretch',
                  borderBottom: '1px solid #F1F5F9',
                }}>
                  <span style={{
                    color: '#94A3B8', fontFamily: 'Manrope', fontSize: '14px',
                    fontWeight: 700, lineHeight: '20px', letterSpacing: '1.4px', textTransform: 'uppercase',
                  }}>
                    Detailed Event Log
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <span style={{
                      color: '#94A3B8', fontFamily: 'Inter', fontSize: '12px',
                      fontWeight: 400, lineHeight: '16px',
                    }}>
                      Showing 5 of 12 events
                    </span>
                    <button suppressHydrationWarning style={{
                      color: '#0058BE', fontFamily: 'Inter', fontSize: '12px',
                      fontWeight: 700, lineHeight: '16px', background: 'none',
                      border: 'none', cursor: 'pointer', padding: 0,
                    }}>
                      Download CSV
                    </button>
                  </div>
                </div>

                {/* Log items */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', alignSelf: 'stretch' }}>
                  <EventItem
                    dotColor="rgba(255, 218, 214, 0.50)"
                    icon={
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M8 5v4M8 11h.01" stroke="#BA1A1A" strokeWidth="1.5" strokeLinecap="round" />
                        <path d="M7.134 2l-6 10.4A1 1 0 0 0 2 14h12a1 1 0 0 0 .866-1.5L8.866 2A1 1 0 0 0 7.134 2Z"
                          stroke="#BA1A1A" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    }
                    title="Route Deviation Detected"
                    time="14:12 PM"
                    description="Driver departed from planned I-90 route at Exit 42. Heading North on Kennedy Expressway. AI Prediction: Heavy traffic avoidance."
                    tag1="Acknowledge"
                    tag2="View Street View"
                  />
                  <EventItem
                    dotColor="rgba(78, 222, 163, 0.15)"
                    icon={
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <circle cx="8" cy="8" r="7" stroke="#006947" strokeWidth="1.2" />
                        <path d="M5 8l2.5 2.5L11 5.5" stroke="#006947" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    }
                    title="Pickup Completed"
                    time="13:45 PM"
                    description="Central Distribution Hub A. 4 Pallets confirmed. Digital signature acquired from dispatcher Dave S."
                  />
                  <EventItem
                    dotColor="#F1F5F9"
                    icon={
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <circle cx="8" cy="6" r="3" stroke="#64748B" strokeWidth="1.2" />
                        <path d="M2 14c0-3.314 2.686-6 6-6s6 2.686 6 6" stroke="#64748B" strokeWidth="1.2" strokeLinecap="round" />
                      </svg>
                    }
                    title="Driver Assigned"
                    time="12:30 PM"
                    description="Marcus Thorne accepted the dispatch. ETA to origin: 15 minutes."
                  />
                  <EventItem
                    dotColor="#F1F5F9"
                    icon={
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <rect x="1" y="3" width="10" height="8" rx="1" stroke="#64748B" strokeWidth="1.2" />
                        <path d="M11 5.5h1.5L14 8.5H11V5.5Z" stroke="#64748B" strokeWidth="1.2" strokeLinejoin="round" />
                        <circle cx="3.5" cy="12.5" r="1.5" fill="#64748B" />
                        <circle cx="9.5" cy="12.5" r="1.5" fill="#64748B" />
                      </svg>
                    }
                    title="Order Created"
                    time="11:05 AM"
                    description="System generated dispatch for #CO-88219-X. Priority set by Automation Rule 4."
                  />
                </div>

                {/* View All */}
                <div style={{
                  display: 'flex', justifyContent: 'center', alignItems: 'center',
                  padding: '16px', alignSelf: 'stretch', borderTop: '1px solid #F1F5F9',
                }}>
                  <button suppressHydrationWarning style={{
                    color: '#64748B', fontFamily: 'Inter', fontSize: '13px',
                    fontWeight: 500, background: 'none', border: 'none',
                    cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px',
                  }}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M6 2v8M2 6l4 4 4-4" stroke="#64748B" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    View All 12 History Items
                  </button>
                </div>
              </div>

            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
