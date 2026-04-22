'use client';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';

/* ── Toggle switch ───────────────────────────────────────────── */
function Toggle({ on, onChange }: { on: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      suppressHydrationWarning
      onClick={() => onChange(!on)}
      style={{
        width: '40px',
        height: '22px',
        borderRadius: '11px',
        background: on ? '#2563EB' : '#CBD5E1',
        border: 'none',
        cursor: 'pointer',
        position: 'relative',
        padding: 0,
        flexShrink: 0,
        transition: 'background 0.15s',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '3px',
          left: on ? '21px' : '3px',
          width: '16px',
          height: '16px',
          borderRadius: '50%',
          background: '#fff',
          boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
          transition: 'left 0.15s',
        }}
      />
    </button>
  );
}

/* ── Alert icons ─────────────────────────────────────────────── */
function AlertIcon({ type }: { type: 'delay' | 'order' | 'offline' | 'fuel' }) {
  const paths: Record<string, React.ReactNode> = {
    delay: (
      <>
        <path d="M8 2L14.5 13H1.5L8 2Z" stroke="#2563EB" strokeWidth="1.4" strokeLinejoin="round" />
        <path d="M8 6v3M8 11v.5" stroke="#2563EB" strokeWidth="1.4" strokeLinecap="round" />
      </>
    ),
    order: (
      <>
        <rect x="2" y="3" width="12" height="10" rx="1.5" stroke="#2563EB" strokeWidth="1.4" />
        <path d="M5 7h6M5 9.5h4" stroke="#2563EB" strokeWidth="1.4" strokeLinecap="round" />
      </>
    ),
    offline: (
      <>
        <circle cx="8" cy="5.5" r="2.5" stroke="#2563EB" strokeWidth="1.4" />
        <path d="M3 13c0-2.485 2.485-4.5 5-4.5s5 2.015 5 4.5" stroke="#2563EB" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M5.5 3.5L10.5 12.5M10.5 3.5L5.5 12.5" stroke="#2563EB" strokeWidth="1.2" strokeLinecap="round" />
      </>
    ),
    fuel: (
      <>
        <path d="M4 13V4a1 1 0 0 1 1-1h5l2 2v8a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1Z" stroke="#2563EB" strokeWidth="1.4" />
        <path d="M6 7h4M7 10h2" stroke="#2563EB" strokeWidth="1.4" strokeLinecap="round" />
      </>
    ),
  };
  return (
    <div
      style={{
        width: '44px',
        height: '44px',
        borderRadius: '10px',
        background: '#DBEAFE',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        {paths[type]}
      </svg>
    </div>
  );
}

/* ── Group icons ─────────────────────────────────────────────── */
function GroupIcon({ type }: { type: 'admin' | 'dispatch' | 'driver' }) {
  const c: Record<string, React.ReactNode> = {
    admin: (
      <>
        <circle cx="8" cy="6" r="2.5" stroke="#2563EB" strokeWidth="1.4" />
        <path d="M3 14c0-2.5 2.5-4.5 5-4.5s5 2 5 4.5" stroke="#2563EB" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M12.5 3v3M11 4.5h3" stroke="#2563EB" strokeWidth="1.3" strokeLinecap="round" />
      </>
    ),
    dispatch: (
      <>
        <path d="M2 4a2 2 0 0 1 2-2h7l3 3v7a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4Z" stroke="#2563EB" strokeWidth="1.4" />
        <path d="M12 5H9V2" stroke="#2563EB" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
    driver: (
      <>
        <path d="M2 5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5Z" stroke="#2563EB" strokeWidth="1.4" />
        <path d="M2 8h12" stroke="#2563EB" strokeWidth="1.4" />
        <circle cx="5.5" cy="11.5" r="1.2" fill="#2563EB" />
        <circle cx="10.5" cy="11.5" r="1.2" fill="#2563EB" />
      </>
    ),
  };
  return (
    <div
      style={{
        width: '40px',
        height: '40px',
        borderRadius: '10px',
        background: '#DBEAFE',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        {c[type]}
      </svg>
    </div>
  );
}

/* ── Page ────────────────────────────────────────────────────── */
type AlertRow = {
  type: 'delay' | 'order' | 'offline' | 'fuel';
  label: string;
  sub: string;
  sms: boolean;
  push: boolean;
  email: boolean;
};

export default function NotificationsPage() {
  const [alerts, setAlerts] = useState<AlertRow[]>([
    {
      type: 'delay',
      label: 'Critical Delays',
      sub: 'Shipment is >2 hours behind schedule',
      sms: true,
      push: true,
      email: false,
    },
    {
      type: 'order',
      label: 'New Orders',
      sub: 'When a client places a new delivery request',
      sms: false,
      push: true,
      email: true,
    },
    {
      type: 'offline',
      label: 'Driver Offline',
      sub: 'Sudden disconnect during active duty',
      sms: true,
      push: true,
      email: false,
    },
    {
      type: 'fuel',
      label: 'Low Fuel Warnings',
      sub: 'Telematics detect <15% fuel levels',
      sms: false,
      push: true,
      email: false,
    },
  ]);

  const toggle = (idx: number, ch: 'sms' | 'push' | 'email') => {
    setAlerts((prev) => prev.map((a, i) => (i === idx ? { ...a, [ch]: !a[ch] } : a)));
  };

  const auditItems = [
    {
      icon: 'edit',
      text: 'Alex M. updated critical alerts',
      time: '2 hours ago',
    },
    {
      icon: 'plus',
      text: 'New Dispatcher Group created',
      time: 'Yesterday, 4:32 PM',
    },
    {
      icon: 'warning',
      text: 'System suppressed 12 duplicate alerts',
      time: '2 days ago',
    },
  ];

  const groups = [
    {
      type: 'admin' as const,
      label: 'Admins',
      badge: 'ACTIVE',
      badgeBg: '#DBEAFE',
      badgeColor: '#2563EB',
      sub: '12 Members \u2022 Global\nAccess',
    },
    {
      type: 'dispatch' as const,
      label: 'Dispatchers',
      badge: 'ACTIVE',
      badgeBg: '#DBEAFE',
      badgeColor: '#2563EB',
      sub: '45 Members \u2022 Regional',
    },
    {
      type: 'driver' as const,
      label: 'Drivers',
      badge: 'RESTRICTED',
      badgeBg: '#DBEAFE',
      badgeColor: '#2563EB',
      sub: '850 Members \u2022 Mobile\nOnly',
    },
  ];

  return (
    <div style={{ display: 'flex', width: '100vw', minHeight: '100vh', background: '#F7F9FB' }}>
      <Sidebar />

      {/* Right column */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: '100vh', overflow: 'hidden' }}>
        <Navbar />

        {/* Main content */}
        <div style={{ flex: 1, padding: '28px 32px 40px', overflowY: 'auto' }}>
          {/* Page title */}
          <h1
            style={{
              margin: '0 0 6px',
              fontFamily: 'Inter',
              fontSize: '24px',
              fontWeight: 700,
              color: '#0F172A',
            }}
          >
            Notification Strategy
          </h1>
          <p
            style={{
              margin: '0 0 24px',
              fontFamily: 'Inter',
              fontSize: '13px',
              color: '#64748B',
              lineHeight: '1.6',
              maxWidth: '540px',
            }}
          >
            Configure how the system communicates critical fleet events across your team. Use recipient groups to target alerts to specific roles.
          </p>

          {/* Two-column layout */}
          <div style={{ display: 'flex', gap: '24px', flex: 1, minHeight: 0 }}>
            {/* ── LEFT COLUMN ── */}
            <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {/* Active Alerts card */}
              <div
                style={{
                  borderRadius: '16px',
                  background: '#FFF',
                  padding: '28px',
                  boxShadow: '0px 1px 2px 0px rgba(0,0,0,0.05)',
                }}
              >
                {/* Card header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
                  <div>
                    <div style={{ fontFamily: 'Inter', fontSize: '18px', fontWeight: 700, color: '#0F172A', marginBottom: '4px' }}>
                      Active Alerts
                    </div>
                    <div style={{ fontFamily: 'Inter', fontSize: '13px', color: '#64748B' }}>
                      Manage delivery status and logistics warnings.
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    {[
                      {
                        label: 'SMS',
                        icon: (
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <rect x="1" y="2" width="10" height="8" rx="1.5" stroke="#2563EB" strokeWidth="1.2" />
                            <path d="M3 5h6M3 7h4" stroke="#2563EB" strokeWidth="1.2" strokeLinecap="round" />
                          </svg>
                        ),
                      },
                      {
                        label: 'PUSH',
                        icon: (
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <path d="M9 4.5A3 3 0 0 0 3 4.5c0 3-1 4-1 4h7s-1-1-1-4M6.9 9a1 1 0 0 1-1.8 0" stroke="#2563EB" strokeWidth="1.2" strokeLinecap="round" />
                          </svg>
                        ),
                      },
                      {
                        label: 'EMAIL',
                        icon: (
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <rect x="1" y="2" width="10" height="8" rx="1.5" stroke="#2563EB" strokeWidth="1.2" />
                            <path d="M1 3l5 3 5-3" stroke="#2563EB" strokeWidth="1.2" strokeLinecap="round" />
                          </svg>
                        ),
                      },
                    ].map(({ label, icon }) => (
                      <span
                        key={label}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          padding: '5px 12px',
                          borderRadius: '999px',
                          background: '#DBEAFE',
                          fontFamily: 'Inter',
                          fontSize: '11px',
                          fontWeight: 700,
                          color: '#2563EB',
                          letterSpacing: '0.3px',
                        }}
                      >
                        {icon}
                        {label}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Alert rows */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {alerts.map((alert, idx) => (
                    <div
                      key={alert.label}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '16px',
                        padding: '16px',
                        borderRadius: '12px',
                        background: '#F8FAFC',
                      }}
                    >
                      <AlertIcon type={alert.type} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontFamily: 'Inter', fontSize: '14px', fontWeight: 700, color: '#0F172A', marginBottom: '2px' }}>
                          {alert.label}
                        </div>
                        <div style={{ fontFamily: 'Inter', fontSize: '12px', color: '#64748B' }}>{alert.sub}</div>
                      </div>
                      <div style={{ width: '64px', display: 'flex', justifyContent: 'center' }}>
                        <Toggle on={alert.sms} onChange={() => toggle(idx, 'sms')} />
                      </div>
                      <div style={{ width: '64px', display: 'flex', justifyContent: 'center' }}>
                        <Toggle on={alert.push} onChange={() => toggle(idx, 'push')} />
                      </div>
                      <div style={{ width: '64px', display: 'flex', justifyContent: 'center' }}>
                        <Toggle on={alert.email} onChange={() => toggle(idx, 'email')} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recipient Groups card */}
              <div
                style={{
                  borderRadius: '16px',
                  background: '#FFF',
                  padding: '28px',
                  boxShadow: '0px 1px 2px 0px rgba(0,0,0,0.05)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <span style={{ fontFamily: 'Inter', fontSize: '18px', fontWeight: 700, color: '#0F172A' }}>Recipient Groups</span>
                  <button
                    suppressHydrationWarning
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                      fontFamily: 'Inter',
                      fontSize: '13px',
                      fontWeight: 600,
                      color: '#2563EB',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <circle cx="8" cy="8" r="6" stroke="#2563EB" strokeWidth="1.3" />
                      <path d="M8 5v6M5 8h6" stroke="#2563EB" strokeWidth="1.3" strokeLinecap="round" />
                    </svg>
                    New Group
                  </button>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                  {groups.map((g) => (
                    <div
                      key={g.label}
                      style={{
                        borderRadius: '12px',
                        background: '#F8FAFC',
                        padding: '20px',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                        <GroupIcon type={g.type} />
                        <span
                          style={{
                            display: 'inline-block',
                            padding: '3px 10px',
                            borderRadius: '999px',
                            background: g.badgeBg,
                            fontFamily: 'Inter',
                            fontSize: '10px',
                            fontWeight: 700,
                            color: g.badgeColor,
                            letterSpacing: '0.3px',
                          }}
                        >
                          {g.badge}
                        </span>
                      </div>
                      <div style={{ fontFamily: 'Inter', fontSize: '14px', fontWeight: 700, color: '#0F172A', marginBottom: '4px' }}>
                        {g.label}
                      </div>
                      <div
                        style={{
                          fontFamily: 'Inter',
                          fontSize: '12px',
                          color: '#64748B',
                          lineHeight: '1.5',
                          whiteSpace: 'pre-line',
                        }}
                      >
                        {g.sub}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── RIGHT COLUMN ── */}
            <div style={{ width: '300px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Notification Health */}
              <div
                style={{
                  borderRadius: '16px',
                  background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
                  padding: '28px',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <div
                    style={{
                      fontFamily: 'Inter',
                      fontSize: '14px',
                      fontWeight: 700,
                      color: '#fff',
                      marginBottom: '16px',
                    }}
                  >
                    Notification Health
                  </div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '12px' }}>
                    <span
                      style={{
                        fontFamily: 'Inter',
                        fontSize: '40px',
                        fontWeight: 800,
                        color: '#fff',
                        lineHeight: 1,
                      }}
                    >
                      98.2%
                    </span>
                    <span
                      style={{
                        fontFamily: 'Inter',
                        fontSize: '14px',
                        fontWeight: 500,
                        color: 'rgba(255,255,255,0.85)',
                      }}
                    >
                      Delivery Rate
                    </span>
                  </div>
                  <div
                    style={{
                      fontFamily: 'Inter',
                      fontSize: '13px',
                      color: 'rgba(255,255,255,0.8)',
                      lineHeight: '1.6',
                      marginBottom: '24px',
                    }}
                  >
                    The platform successfully pushed 14,204 critical alerts over the last 24 hours.
                  </div>
                  <button
                    suppressHydrationWarning
                    style={{
                      width: '100%',
                      height: '40px',
                      borderRadius: '10px',
                      background: 'rgba(255,255,255,0.15)',
                      border: '1px solid rgba(255,255,255,0.3)',
                      cursor: 'pointer',
                      fontFamily: 'Inter',
                      fontSize: '12px',
                      fontWeight: 700,
                      color: '#fff',
                      letterSpacing: '0.5px',
                    }}
                  >
                    VIEW FULL LOGS
                  </button>
                </div>
              </div>

              {/* Audit Trail */}
              <div
                style={{
                  borderRadius: '16px',
                  background: '#FFF',
                  padding: '24px',
                  boxShadow: '0px 1px 2px 0px rgba(0,0,0,0.05)',
                }}
              >
                <div
                  style={{
                    fontFamily: 'Inter',
                    fontSize: '11px',
                    fontWeight: 700,
                    color: '#94A3B8',
                    letterSpacing: '1px',
                    marginBottom: '20px',
                    textTransform: 'uppercase',
                  }}
                >
                  Audit Trail
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0', position: 'relative' }}>
                  {/* Vertical connecting line */}
                  <div
                    style={{
                      position: 'absolute',
                      left: '13px',
                      top: '20px',
                      bottom: '20px',
                      width: '1px',
                      background: '#E2E8F0',
                      zIndex: 0,
                    }}
                  />
                  {auditItems.map((item, i) => (
                    <div
                      key={i}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '12px',
                        paddingBottom: i < auditItems.length - 1 ? '18px' : '0',
                        position: 'relative',
                        zIndex: 1,
                      }}
                    >
                      <div
                        style={{
                          width: '26px',
                          height: '26px',
                          borderRadius: '50%',
                          background: '#DBEAFE',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        {item.icon === 'edit' && (
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <path d="M8 1.5l2.5 2.5-6 6H2V7.5l6-6Z" stroke="#2563EB" strokeWidth="1.2" strokeLinejoin="round" />
                          </svg>
                        )}
                        {item.icon === 'plus' && (
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <path d="M6 2v8M2 6h8" stroke="#2563EB" strokeWidth="1.4" strokeLinecap="round" />
                          </svg>
                        )}
                        {item.icon === 'warning' && (
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <path d="M6 1.5L11 10H1L6 1.5Z" stroke="#F59E0B" strokeWidth="1.2" strokeLinejoin="round" />
                            <path d="M6 5v2M6 8.5v.1" stroke="#F59E0B" strokeWidth="1.2" strokeLinecap="round" />
                          </svg>
                        )}
                      </div>
                      <div>
                        <div
                          style={{
                            fontFamily: 'Inter',
                            fontSize: '13px',
                            fontWeight: 600,
                            color: '#0F172A',
                            lineHeight: '1.4',
                            marginBottom: '2px',
                          }}
                        >
                          {item.text}
                        </div>
                        <div style={{ fontFamily: 'Inter', fontSize: '11px', color: '#94A3B8' }}>{item.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  suppressHydrationWarning
                  style={{
                    width: '100%',
                    height: '38px',
                    borderRadius: '8px',
                    background: '#fff',
                    border: '1px solid #E2E8F0',
                    cursor: 'pointer',
                    fontFamily: 'Inter',
                    fontSize: '12px',
                    fontWeight: 700,
                    color: '#2563EB',
                    marginTop: '20px',
                  }}
                >
                  VIEW AUDIT HISTORY
                </button>
              </div>

              {/* Priority support */}
              <div
                style={{
                  borderRadius: '16px',
                  background: '#FFF',
                  padding: '24px',
                  boxShadow: '0px 1px 2px 0px rgba(0,0,0,0.05)',
                }}
              >
                <div
                  style={{
                    fontFamily: 'Inter',
                    fontSize: '14px',
                    fontWeight: 700,
                    color: '#0F172A',
                    marginBottom: '8px',
                  }}
                >
                  Need priority support?
                </div>
                <div
                  style={{
                    fontFamily: 'Inter',
                    fontSize: '13px',
                    color: '#64748B',
                    lineHeight: '1.6',
                    marginBottom: '16px',
                  }}
                >
                  Enterprise accounts have access to 24/7 dedicated alert monitoring and configuration assistance.
                </div>
                <button
                  suppressHydrationWarning
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                    fontFamily: 'Inter',
                    fontSize: '13px',
                    fontWeight: 700,
                    color: '#2563EB',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  Talk to a Specialist &rarr;
                </button>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
              gap: '12px',
              marginTop: '24px',
            }}
          >
            <button
              suppressHydrationWarning
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '40px',
                padding: '0 20px',
                borderRadius: '8px',
                background: '#E2E8F0',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'Inter',
                fontSize: '13px',
                fontWeight: 600,
                color: '#64748B',
              }}
            >
              Discard Changes
            </button>
            <button
              suppressHydrationWarning
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                height: '40px',
                padding: '0 20px',
                borderRadius: '8px',
                background: '#2563EB',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'Inter',
                fontSize: '13px',
                fontWeight: 700,
                color: '#fff',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M13 4L6 11l-3-3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Save Configurations
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
