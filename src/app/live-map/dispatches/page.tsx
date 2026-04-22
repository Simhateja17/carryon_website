'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';

/* ── Icons ────────────────────────────────────────────────────── */
function LocationPinIcon() {
  return (
    <svg width="20" height="24" viewBox="0 0 20 24" fill="none" aria-hidden>
      <path d="M10 22.5C10 22.5 18 15.5 18 9.5C18 4.8 14.4 1 10 1C5.6 1 2 4.8 2 9.5C2 15.5 10 22.5 10 22.5Z" stroke="#2F80ED" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="10" cy="9" r="2.5" stroke="#2F80ED" strokeWidth="1.6" />
    </svg>
  );
}

function FlagIcon() {
  return (
    <svg width="20" height="24" viewBox="0 0 20 24" fill="none" aria-hidden>
      <path d="M3 1v22" stroke="#64748B" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M3 3h12l-3 4 3 4H3" stroke="#64748B" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function TruckIcon({ color = '#2F80ED' }: { color?: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="2" y="5" width="14" height="10" rx="1.5" stroke={color} strokeWidth="1.5" />
      <path d="M16 8h4l3 5h-7V8Z" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
      <circle cx="6.5" cy="17.5" r="2" stroke={color} strokeWidth="1.5" />
      <circle cx="17.5" cy="17.5" r="2" stroke={color} strokeWidth="1.5" />
      <path d="M8.5 17.5h7" stroke={color} strokeWidth="1.5" />
    </svg>
  );
}

function CheckBadgeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <circle cx="10" cy="10" r="9" fill="#16A34A" />
      <path d="M6 10l2.5 2.5L14 7" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <circle cx="8" cy="8" r="7" stroke="#94A3B8" strokeWidth="1.3" />
      <path d="M8 7v4M8 5.5v.1" stroke="#94A3B8" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

function WarningIcon({ bg = '#DBEAFE' }: { bg?: string }) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden>
      <circle cx="16" cy="16" r="16" fill={bg} />
      <path d="M16 9v8M16 19.5v.1" stroke="#2F80ED" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function CheckCircleIcon({ bg = '#DBEAFE' }: { bg?: string }) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden>
      <circle cx="16" cy="16" r="16" fill={bg} />
      <path d="M10 16l4 4 6-6" stroke="#2F80ED" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function UserIcon({ bg = '#DBEAFE' }: { bg?: string }) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden>
      <circle cx="16" cy="16" r="16" fill={bg} />
      <circle cx="16" cy="13" r="3" stroke="#2F80ED" strokeWidth="1.5" />
      <path d="M10 22c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="#2F80ED" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function FileIcon({ bg = '#DBEAFE' }: { bg?: string }) {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden>
      <circle cx="16" cy="16" r="16" fill={bg} />
      <path d="M17 9h-6a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-9l-3-4Z" stroke="#2F80ED" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M17 9v4h4M17 13h4" stroke="#2F80ED" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ExpandIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path d="M1 5V2a1 1 0 0 1 1-1h3M13 9v3a1 1 0 0 1-1 1H9M9 1h3a1 1 0 0 1 1 1v3M1 9v3a1 1 0 0 0 1 1h3" stroke="#64748B" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path d="M3.5 5.5L7 9L10.5 5.5" stroke="#64748B" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ── Map Placeholder ──────────────────────────────────────────── */
function MapPlaceholder() {
  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '100%',
      minHeight: '420px',
      borderRadius: '12px',
      overflow: 'hidden',
      background: '#EAF2FB',
    }}>
      {/* Decorative water shapes */}
      <div style={{ position: 'absolute', top: '-10%', right: '-15%', width: '55%', height: '120%', background: '#C4DDF5', borderRadius: '40% 0 0 40%', opacity: 0.5 }} />
      <div style={{ position: 'absolute', bottom: '-5%', right: '-10%', width: '40%', height: '50%', background: '#C4DDF5', borderRadius: '50% 0 0 0', opacity: 0.4 }} />
      <div style={{ position: 'absolute', top: '30%', left: '-5%', width: '20%', height: '25%', background: '#C4DDF5', borderRadius: '0 50% 50% 0', opacity: 0.3 }} />

      {/* Grid lines for map texture */}
      <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0, opacity: 0.15 }}>
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#64748B" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Route paths */}
      <svg width="100%" height="100%" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" style={{ position: 'absolute', inset: 0 }}>
        {/* Planned path */}
        <path d="M 180 420 Q 250 380 300 340 T 420 260 T 520 180 T 620 100" fill="none" stroke="#2F80ED" strokeWidth="3" strokeDasharray="6 4" />
        {/* Actual path */}
        <path d="M 180 420 Q 250 380 300 340 T 420 260 T 480 220 T 560 160 T 620 100" fill="none" stroke="#EF4444" strokeWidth="3" />

        {/* Route dots */}
        {[
          { cx: 180, cy: 420 },
          { cx: 300, cy: 340 },
          { cx: 420, cy: 260 },
          { cx: 480, cy: 220 },
          { cx: 560, cy: 160 },
          { cx: 620, cy: 100 },
        ].map((p, i) => (
          <circle key={i} cx={p.cx} cy={p.cy} r="5" fill="white" stroke="#EF4444" strokeWidth="2" />
        ))}

        {/* Truck icon on route */}
        <g transform="translate(460, 235)">
          <rect x="0" y="0" width="28" height="20" rx="4" fill="#2F80ED" />
          <path d="M18 6h6l4 8h-10V6Z" fill="#2F80ED" />
          <circle cx="7" cy="20" r="3" fill="white" stroke="#2F80ED" strokeWidth="1.5" />
          <circle cx="21" cy="20" r="3" fill="white" stroke="#2F80ED" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

/* ── Event Log Item ───────────────────────────────────────────── */
interface EventItem {
  icon: React.ReactNode;
  title: string;
  description: string;
  time: string;
  actions?: { label: string; onClick?: () => void }[];
}

function EventLogItem({ event }: { event: EventItem }) {
  return (
    <div style={{
      display: 'flex',
      gap: '16px',
      padding: '16px 0',
      borderBottom: '1px solid #F1F5F9',
    }}>
      <div style={{ flexShrink: 0, marginTop: '2px' }}>{event.icon}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: '12px',
        }}>
          <div>
            <div style={{
              fontFamily: 'Inter',
              fontSize: '14px',
              fontWeight: 600,
              lineHeight: '20px',
              color: '#0F172A',
            }}>
              {event.title}
            </div>
            <div style={{
              fontFamily: 'Inter',
              fontSize: '12px',
              fontWeight: 400,
              lineHeight: '18px',
              color: '#64748B',
              marginTop: '4px',
              maxWidth: '480px',
            }}>
              {event.description}
            </div>
            {event.actions && event.actions.length > 0 && (
              <div style={{ display: 'flex', gap: '12px', marginTop: '10px' }}>
                {event.actions.map((action) => (
                  <button
                    key={action.label}
                    suppressHydrationWarning
                    onClick={action.onClick}
                    style={{
                      height: '28px',
                      padding: '0 12px',
                      borderRadius: '6px',
                      background: '#EFF6FF',
                      border: '1px solid #BFDBFE',
                      fontFamily: 'Inter',
                      fontSize: '11px',
                      fontWeight: 600,
                      color: '#2F80ED',
                      cursor: 'pointer',
                    }}
                  >
                    {action.label}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div style={{
            flexShrink: 0,
            padding: '4px 10px',
            borderRadius: '6px',
            background: '#F1F5F9',
            fontFamily: 'Inter',
            fontSize: '11px',
            fontWeight: 600,
            color: '#2F80ED',
            whiteSpace: 'nowrap',
          }}>
            {event.time}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Page ─────────────────────────────────────────────────────── */
export default function DispatchesPage() {
  const router = useRouter();
  const [showAllEvents, setShowAllEvents] = useState(false);

  const events: EventItem[] = [
    {
      icon: <WarningIcon />,
      title: 'Route Deviation Detected',
      description: 'Driver departed from planned I-90 route at Exit 42. Heading North on Kennedy Expressway. AI Prediction: Heavy traffic avoidance.',
      time: '14:12 PM',
      actions: [
        { label: 'Acknowledge' },
        { label: 'View Street View' },
      ],
    },
    {
      icon: <CheckCircleIcon />,
      title: 'Pickup Completed',
      description: 'Central Distribution Hub A. 4 Pallets confirmed. Digital signature acquired from dispatcher Dave S.',
      time: '13:45 PM',
    },
    {
      icon: <UserIcon />,
      title: 'Driver Assigned',
      description: 'Marcus Thorne accepted the dispatch. ETA to origin: 15 minutes.',
      time: '12:30 PM',
    },
    {
      icon: <FileIcon />,
      title: 'Order Created',
      description: 'System generated dispatch for #CO-88219-X. Priority set by Automation Rule 4.',
      time: '11:05 AM',
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

          {/* Breadcrumb */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '12px',
          }}>
            <button
              suppressHydrationWarning
              onClick={() => router.push('/orders')}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'Inter',
                fontSize: '12px',
                fontWeight: 500,
                color: '#64748B',
                padding: 0,
              }}
            >
              Orders
            </button>
            <span style={{ fontFamily: 'Inter', fontSize: '12px', color: '#94A3B8' }}>/</span>
            <span style={{ fontFamily: 'Inter', fontSize: '12px', fontWeight: 600, color: '#0F172A' }}>
              Dispatch #CO-88219-X
            </span>
          </div>

          {/* Header row */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '24px',
            flexWrap: 'wrap',
            gap: '16px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <h1 style={{
                fontFamily: 'Inter',
                fontSize: '28px',
                fontWeight: 700,
                color: '#0F172A',
                margin: 0,
                lineHeight: '1.2',
              }}>
                Dispatch #CO-88219-X
              </h1>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}>
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  height: '24px',
                  padding: '0 10px',
                  borderRadius: '9999px',
                  background: '#DBEAFE',
                  fontFamily: 'Inter',
                  fontSize: '11px',
                  fontWeight: 700,
                  color: '#2563EB',
                  textTransform: 'uppercase',
                  letterSpacing: '0.3px',
                }}>
                  In Transit
                </span>
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontFamily: 'Inter',
                  fontSize: '13px',
                  fontWeight: 400,
                  color: '#64748B',
                }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="6.5" stroke="#94A3B8" strokeWidth="1.2" />
                    <path d="M8 5v3.5l2.5 1.5" stroke="#94A3B8" strokeWidth="1.2" strokeLinecap="round" />
                  </svg>
                  Estimated Arrival: 14:45 (in 22 mins)
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button suppressHydrationWarning style={{
                height: '40px',
                padding: '0 18px',
                borderRadius: '8px',
                background: '#FFFFFF',
                border: '1px solid #E2E8F0',
                fontFamily: 'Inter',
                fontSize: '13px',
                fontWeight: 600,
                color: '#475569',
                cursor: 'pointer',
              }}>
                FLAG INCIDENT
              </button>
              <button suppressHydrationWarning style={{
                height: '40px',
                padding: '0 20px',
                borderRadius: '8px',
                background: '#2563EB',
                border: 'none',
                fontFamily: 'Inter',
                fontSize: '13px',
                fontWeight: 700,
                color: '#fff',
                cursor: 'pointer',
              }}>
                CONTACT DRIVER
              </button>
            </div>
          </div>

          {/* Two-column grid: summary + map */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '360px 1fr',
            gap: '24px',
            marginBottom: '24px',
            alignItems: 'stretch',
          }}>
            {/* Left: Order Summary */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}>
              {/* Order Summary Card */}
              <div style={{
                background: '#fff',
                borderRadius: '12px',
                boxShadow: '0px 1px 2px 0px rgba(0,0,0,0.05)',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
              }}>
                <div style={{
                  fontFamily: 'Inter',
                  fontSize: '10px',
                  fontWeight: 700,
                  lineHeight: '15px',
                  letterSpacing: '1px',
                  color: '#94A3B8',
                  textTransform: 'uppercase',
                }}>
                  Order Summary
                </div>

                {/* Origin */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
                  <div>
                    <div style={{
                      fontFamily: 'Inter',
                      fontSize: '10px',
                      fontWeight: 700,
                      lineHeight: '15px',
                      letterSpacing: '1px',
                      color: '#94A3B8',
                      textTransform: 'uppercase',
                      marginBottom: '4px',
                    }}>
                      Origin
                    </div>
                    <div style={{
                      fontFamily: 'Inter',
                      fontSize: '14px',
                      fontWeight: 600,
                      lineHeight: '20px',
                      color: '#0F172A',
                    }}>
                      Central Distribution Hub A
                    </div>
                    <div style={{
                      fontFamily: 'Inter',
                      fontSize: '12px',
                      fontWeight: 400,
                      lineHeight: '18px',
                      color: '#64748B',
                    }}>
                      102 Logistics Way, Chicago, IL
                    </div>
                  </div>
                  <LocationPinIcon />
                </div>

                {/* Destination */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
                  <div>
                    <div style={{
                      fontFamily: 'Inter',
                      fontSize: '10px',
                      fontWeight: 700,
                      lineHeight: '15px',
                      letterSpacing: '1px',
                      color: '#94A3B8',
                      textTransform: 'uppercase',
                      marginBottom: '4px',
                    }}>
                      Destination
                    </div>
                    <div style={{
                      fontFamily: 'Inter',
                      fontSize: '14px',
                      fontWeight: 600,
                      lineHeight: '20px',
                      color: '#0F172A',
                    }}>
                      Northside Medical Center
                    </div>
                    <div style={{
                      fontFamily: 'Inter',
                      fontSize: '12px',
                      fontWeight: 400,
                      lineHeight: '18px',
                      color: '#64748B',
                    }}>
                      4422 Harrison Blvd, Evanston, IL
                    </div>
                  </div>
                  <FlagIcon />
                </div>

                {/* Weight + Priority row */}
                <div style={{ display: 'flex', gap: '24px' }}>
                  <div>
                    <div style={{
                      fontFamily: 'Inter',
                      fontSize: '10px',
                      fontWeight: 700,
                      lineHeight: '15px',
                      letterSpacing: '1px',
                      color: '#94A3B8',
                      textTransform: 'uppercase',
                      marginBottom: '4px',
                    }}>
                      Package Weight
                    </div>
                    <div style={{
                      fontFamily: 'Inter',
                      fontSize: '18px',
                      fontWeight: 700,
                      lineHeight: '28px',
                      color: '#0F172A',
                    }}>
                      142.5 kg
                    </div>
                  </div>
                  <div>
                    <div style={{
                      fontFamily: 'Inter',
                      fontSize: '10px',
                      fontWeight: 700,
                      lineHeight: '15px',
                      letterSpacing: '1px',
                      color: '#94A3B8',
                      textTransform: 'uppercase',
                      marginBottom: '4px',
                    }}>
                      Priority
                    </div>
                    <div style={{
                      fontFamily: 'Inter',
                      fontSize: '14px',
                      fontWeight: 700,
                      lineHeight: '20px',
                      color: '#DC2626',
                    }}>
                      High (Level 1)
                    </div>
                  </div>
                </div>
              </div>

              {/* Assigned Driver Card */}
              <div style={{
                background: '#fff',
                borderRadius: '12px',
                boxShadow: '0px 1px 2px 0px rgba(0,0,0,0.05)',
                padding: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
              }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '9999px',
                  overflow: 'hidden',
                  background: '#DBEAFE',
                  flexShrink: 0,
                }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/marcus-jensen.png"
                    alt="Marcus Thorne"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontFamily: 'Inter',
                    fontSize: '10px',
                    fontWeight: 700,
                    lineHeight: '15px',
                    letterSpacing: '1px',
                    color: '#94A3B8',
                    textTransform: 'uppercase',
                    marginBottom: '2px',
                  }}>
                    Assigned Driver
                  </div>
                  <div style={{
                    fontFamily: 'Inter',
                    fontSize: '14px',
                    fontWeight: 700,
                    lineHeight: '20px',
                    color: '#0F172A',
                  }}>
                    Marcus Thorne
                  </div>
                  <div style={{
                    fontFamily: 'Inter',
                    fontSize: '11px',
                    fontWeight: 400,
                    lineHeight: '16px',
                    color: '#64748B',
                  }}>
                    ID: #DX-9022 &bull; 4.9 Rating
                  </div>
                </div>
                <CheckBadgeIcon />
              </div>

              {/* Vehicle Status Card */}
              <div style={{
                background: '#fff',
                borderRadius: '12px',
                boxShadow: '0px 1px 2px 0px rgba(0,0,0,0.05)',
                padding: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
              }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '10px',
                  background: '#EFF6FF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <TruckIcon />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontFamily: 'Inter',
                    fontSize: '10px',
                    fontWeight: 700,
                    lineHeight: '15px',
                    letterSpacing: '1px',
                    color: '#94A3B8',
                    textTransform: 'uppercase',
                    marginBottom: '2px',
                  }}>
                    Vehicle Status
                  </div>
                  <div style={{
                    fontFamily: 'Inter',
                    fontSize: '14px',
                    fontWeight: 600,
                    lineHeight: '20px',
                    color: '#0F172A',
                  }}>
                    Freightliner M2 (VAN-04)
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginTop: '4px',
                  }}>
                    <div style={{
                      width: '60px',
                      height: '6px',
                      borderRadius: '9999px',
                      background: '#E2E8F0',
                      overflow: 'hidden',
                    }}>
                      <div style={{ width: '92%', height: '100%', borderRadius: '9999px', background: '#16A34A' }} />
                    </div>
                    <span style={{
                      fontFamily: 'Inter',
                      fontSize: '11px',
                      fontWeight: 600,
                      color: '#16A34A',
                    }}>
                      92%
                    </span>
                    <span style={{
                      fontFamily: 'Inter',
                      fontSize: '11px',
                      fontWeight: 400,
                      color: '#64748B',
                    }}>
                      &bull; Fuel: 450mi range
                    </span>
                  </div>
                </div>
                <InfoIcon />
              </div>
            </div>

            {/* Right: Map */}
            <div style={{
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              minWidth: 0,
            }}>
              <MapPlaceholder />

              {/* Map Legend */}
              <div style={{
                position: 'absolute',
                top: '24px',
                left: '24px',
                background: 'rgba(255,255,255,0.95)',
                borderRadius: '8px',
                padding: '12px 16px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
              }}>
                <div style={{
                  fontFamily: 'Inter',
                  fontSize: '10px',
                  fontWeight: 700,
                  lineHeight: '15px',
                  letterSpacing: '1px',
                  color: '#94A3B8',
                  textTransform: 'uppercase',
                  marginBottom: '4px',
                }}>
                  Map Legend
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '20px', height: '2px', background: '#2F80ED', borderRadius: '1px' }} />
                  <span style={{ fontFamily: 'Inter', fontSize: '12px', fontWeight: 500, color: '#475569' }}>Planned Path</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '20px', height: '2px', background: '#EF4444', borderRadius: '1px' }} />
                  <span style={{ fontFamily: 'Inter', fontSize: '12px', fontWeight: 500, color: '#475569' }}>Actual Path (Deviation)</span>
                </div>
              </div>

              {/* Expand Live View button */}
              <button suppressHydrationWarning style={{
                position: 'absolute',
                bottom: '16px',
                right: '16px',
                height: '36px',
                padding: '0 14px',
                borderRadius: '8px',
                background: 'rgba(255,255,255,0.95)',
                border: '1px solid #E2E8F0',
                fontFamily: 'Inter',
                fontSize: '12px',
                fontWeight: 600,
                color: '#475569',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
              }}>
                <ExpandIcon />
                Expand Live View
              </button>

              {/* Event Log */}
              <div style={{
                background: '#fff',
                borderRadius: '12px',
                boxShadow: '0px 1px 2px 0px rgba(0,0,0,0.05)',
                padding: '24px 32px',
                marginTop: '12px',
              }}>
            {/* Header */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '8px',
            }}>
              <h2 style={{
                fontFamily: 'Inter',
                fontSize: '14px',
                fontWeight: 700,
                lineHeight: '20px',
                letterSpacing: '0.5px',
                color: '#0F172A',
                textTransform: 'uppercase',
                margin: 0,
              }}>
                Detailed Event Log
              </h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <span style={{
                  fontFamily: 'Inter',
                  fontSize: '12px',
                  fontWeight: 400,
                  color: '#64748B',
                }}>
                  Showing 5 of 12 events
                </span>
                <button suppressHydrationWarning style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: 'Inter',
                  fontSize: '12px',
                  fontWeight: 600,
                  color: '#2F80ED',
                  padding: 0,
                }}>
                  Download CSV
                </button>
              </div>
            </div>

            {/* Events */}
            <div>
              {events.map((event) => (
                <EventLogItem key={event.title} event={event} />
              ))}
            </div>

            {/* View all */}
            <button
              suppressHydrationWarning
              onClick={() => setShowAllEvents(!showAllEvents)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                width: '100%',
                padding: '12px 0',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'Inter',
                fontSize: '12px',
                fontWeight: 600,
                color: '#64748B',
                marginTop: '4px',
              }}
            >
              <ChevronDownIcon />
              View All 12 History Items
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  );
}
