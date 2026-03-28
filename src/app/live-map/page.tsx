'use client';

import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';

/* ── Fleet Status Card ──────────────────────────────────────── */
function FleetStatusCard() {
  return (
    /* 404-3341: transparent container, shadow only */
    <div style={{
      width: '288px',
      borderRadius: '16px',
      background: 'rgba(255, 255, 255, 0.00)',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
    }}>
      {/* Header row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 4px' }}>
        <span style={{ fontFamily: 'Inter', fontSize: '14px', fontWeight: 700, color: '#FFFFFF' }}>
          Fleet Status
        </span>
        <span style={{
          fontFamily: 'Inter', fontSize: '10px', fontWeight: 700,
          color: '#2F80ED', letterSpacing: '0.5px',
        }}>
          REAL-TIME
        </span>
      </div>

      {/* 2×2 grid of white boxes — 404-3348/3353/3358/3363 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
        {[
          { label: 'ACTIVE',   value: '142', color: '#2563EB' },
          { label: 'DELAYED',  value: '12',  color: '#F59E0B' },
          { label: 'IDLE',     value: '08',  color: '#64748B' },
          { label: 'EN ROUTE', value: '94',  color: '#2563EB' },
        ].map(({ label, value, color }) => (
          <div key={label} style={{
            display: 'flex',
            padding: '12px',
            flexDirection: 'column',
            alignItems: 'flex-start',
            borderRadius: '12px',
            background: '#FFF',
          }}>
            <div style={{
              fontFamily: 'Inter', fontSize: '10px', fontWeight: 600,
              color: '#64748B', letterSpacing: '0.5px', marginBottom: '4px',
            }}>
              {label}
            </div>
            <div style={{
              fontFamily: 'Inter', fontSize: '28px', fontWeight: 800,
              color, lineHeight: 1,
            }}>
              {value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Active Alerts Card ─────────────────────────────────────── */
function ActiveAlertsCard() {
  const alerts = [
    {
      type: 'MECHANICAL ALERT',
      typeColor: '#2F80ED',
      time: '2m ago',
      title: 'TRK-8829 reports engine fault code P0420',
      sub: 'Driver: Marcus J. • I-90 West',
      /* 404-3374: active/highlighted alert */
      bg: 'rgba(47, 128, 237, 0.10)',
      border: '1px solid #2F80ED',
      titleColor: '#0F172A',
      subColor: '#475569',
      timeColor: '#64748B',
    },
    {
      type: 'ROUTE DEVIATION',
      typeColor: '#F59E0B',
      time: '14m ago',
      title: 'TRK-4412 left planned route by 1.2 miles',
      sub: 'Driver: Sarah L. • Downtown Loop',
      /* 404-3382: white */
      bg: '#FFF',
      border: 'none',
      titleColor: '#0F172A',
      subColor: '#475569',
      timeColor: '#64748B',
    },
    {
      type: 'WEATHER DELAY',
      typeColor: '#60A5FA',
      time: '28m ago',
      title: 'Heavy rain affecting Zone 4 speeds',
      sub: '8 drivers impacted • North Suburbs',
      /* 404-3390: white */
      bg: '#FFF',
      border: 'none',
      titleColor: '#0F172A',
      subColor: '#475569',
      timeColor: '#64748B',
    },
  ];

  return (
    /* 404-3368: blue glassmorphism container */
    <div style={{
      width: '288px',
      borderRadius: '16px',
      border: '1px solid rgba(255, 255, 255, 0.40)',
      background: 'rgba(47, 128, 237, 0.20)',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      backdropFilter: 'blur(10px)',
      padding: '16px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: '16px',
      alignSelf: 'stretch',
      boxSizing: 'border-box',
    }}>
      {/* 404-3369: header row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', alignSelf: 'stretch' }}>
        <span style={{ fontFamily: 'Inter', fontSize: '14px', fontWeight: 700, color: '#FFFFFF' }}>
          Active Alerts
        </span>
        <span style={{
          width: '8px', height: '8px', borderRadius: '50%',
          background: '#2F80ED',
          boxShadow: '0 0 6px rgba(47,128,237,0.8)',
          display: 'inline-block',
        }} />
      </div>

      {/* Alert items */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignSelf: 'stretch' }}>
        {alerts.map((alert) => (
          <div key={alert.type} style={{
            display: 'flex',
            padding: '12px',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: '4px',
            alignSelf: 'stretch',
            borderRadius: '12px',
            background: alert.bg,
            border: alert.border,
            boxSizing: 'border-box',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
              <span style={{
                fontFamily: 'Inter', fontSize: '9px', fontWeight: 700,
                color: alert.typeColor, letterSpacing: '0.5px', textTransform: 'uppercase',
              }}>
                {alert.type}
              </span>
              <span style={{ fontFamily: 'Inter', fontSize: '10px', color: alert.timeColor }}>
                {alert.time}
              </span>
            </div>
            <div style={{
              fontFamily: 'Inter', fontSize: '12px', fontWeight: 600,
              color: alert.titleColor, lineHeight: '1.4',
            }}>
              {alert.title}
            </div>
            <div style={{ fontFamily: 'Inter', fontSize: '10px', color: alert.subColor }}>
              {alert.sub}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Driver Popup ───────────────────────────────────────────── */
function DriverPopup() {
  return (
    /* 404-3400: blue glassmorphism, 320×266.5, absolute top-right */
    <div style={{
      position: 'absolute',
      top: '24px',
      right: '24px',
      width: '320px',
      height: '266.5px',
      borderRadius: '16px',
      background: 'rgba(47, 128, 237, 0.20)',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.20)',
      padding: '16px',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
    }}>

      {/* 404-3401: header row — avatar + name/id + badge */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        alignSelf: 'stretch',
      }}>
        {/* Avatar circle */}
        <div style={{
          width: '48px', height: '48px', borderRadius: '50%',
          overflow: 'hidden', flexShrink: 0,
          border: '2px solid rgba(255,255,255,0.30)',
        }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/driver-avatar.png" alt="Marcus Jensen" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>

        {/* Name + ID */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: 'Inter', fontSize: '14px', fontWeight: 700, color: '#FFFFFF', marginBottom: '2px' }}>
            Marcus Jensen
          </div>
          <div style={{ fontFamily: 'Inter', fontSize: '10px', color: 'rgba(255,255,255,0.55)' }}>
            ID: DRV-00982 • 1 river • Tier
          </div>
        </div>

        {/* ON DUTY badge */}
        <span style={{
          padding: '4px 8px',
          borderRadius: '6px',
          background: '#2563EB',
          fontFamily: 'Inter', fontSize: '10px', fontWeight: 700,
          color: '#FFFFFF', letterSpacing: '0.3px', flexShrink: 0,
        }}>
          ON DUTY
        </span>
      </div>

      {/* 404-3414: Route progress row */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        alignSelf: 'stretch',
        flexDirection: 'column',
        gap: '6px',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <span style={{
            fontFamily: 'Inter', fontSize: '10px', fontWeight: 600,
            color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.5px',
          }}>
            ROUTE PROGRESS
          </span>
          <span style={{ fontFamily: 'Inter', fontSize: '10px', fontWeight: 700, color: '#2F80ED' }}>72%</span>
        </div>
        <div style={{ height: '4px', borderRadius: '9999px', background: 'rgba(255,255,255,0.15)', width: '100%', overflow: 'hidden' }}>
          <div style={{ width: '72%', height: '100%', borderRadius: '9999px', background: '#2F80ED' }} />
        </div>
      </div>

      {/* 404-3421: info grid — border-top divider, 2 cols */}
      <div style={{
        display: 'inline-grid',
        paddingTop: '16px',
        rowGap: '16px',
        columnGap: '16px',
        alignSelf: 'stretch',
        gridTemplateRows: '33px',
        gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
        borderTop: '1px solid rgba(255, 255, 255, 0.20)',
      }}>
        {/* Vehicle column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {/* 404-3424: label */}
          <span style={{
            alignSelf: 'stretch',
            color: '#64748B',
            fontFamily: 'Inter', fontSize: '10px', fontWeight: 600,
            lineHeight: '15px', textTransform: 'uppercase',
          }}>
            VEHICLE
          </span>
          {/* 404-3426: value */}
          <span style={{
            alignSelf: 'stretch',
            color: '#FFFFFF',
            fontFamily: 'Inter', fontSize: '12px', fontWeight: 600,
            lineHeight: '16px',
          }}>
            Freightliner M2 (2023)
          </span>
        </div>

        {/* Next Stop column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          <span style={{
            alignSelf: 'stretch',
            color: '#64748B',
            fontFamily: 'Inter', fontSize: '10px', fontWeight: 600,
            lineHeight: '15px', textTransform: 'uppercase',
          }}>
            NEXT STOP
          </span>
          {/* 404-3431: value */}
          <span style={{
            alignSelf: 'stretch',
            color: '#FFFFFF',
            fontFamily: 'Inter', fontSize: '12px', fontWeight: 600,
            lineHeight: '16px',
          }}>
            Distribution Ctr A
          </span>
        </div>
      </div>

      {/* Action buttons */}
      <div style={{ display: 'flex', gap: '8px', alignSelf: 'stretch', marginTop: 'auto' }}>
        {/* 404-3433: View Log — gray bg */}
        <button suppressHydrationWarning style={{
          display: 'flex', padding: '8px 0',
          flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
          flex: '1 0 0',
          borderRadius: '8px',
          background: '#E0E3E5',
          border: 'none',
          fontFamily: 'Inter', fontSize: '12px', fontWeight: 600, color: '#191C1E',
          cursor: 'pointer',
        }}>
          View Log
        </button>

        {/* 404-3435: Message — blue */}
        <button suppressHydrationWarning style={{
          display: 'flex', padding: '8px 0',
          flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
          flex: '1 0 0',
          borderRadius: '8px',
          background: '#2563EB',
          border: 'none',
          fontFamily: 'Inter', fontSize: '12px', fontWeight: 600, color: '#FFFFFF',
          cursor: 'pointer',
          gap: '6px',
        }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 2h8a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H4L1 11V3a1 1 0 0 1 1-1Z" stroke="white" strokeWidth="1.2" />
            </svg>
            Message
          </span>
        </button>
      </div>
    </div>
  );
}

/* ── Vehicle Markers on map ─────────────────────────────────── */
function VehicleMarker({ top, left, color, icon }: { top: string; left: string; color: string; icon: 'truck' | 'van' }) {
  return (
    <div style={{ position: 'absolute', top, left, transform: 'translate(-50%, -50%)' }}>
      <div style={{
        width: '32px', height: '32px', borderRadius: '50%',
        background: color, border: '2px solid white',
        boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {icon === 'truck' ? (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <rect x="1" y="4" width="9" height="7" rx="1.2" stroke="white" strokeWidth="1.3" />
            <path d="M10 6h3l2 4H10V6Z" stroke="white" strokeWidth="1.3" strokeLinejoin="round" />
            <circle cx="4" cy="12" r="1.5" fill="white" />
            <circle cx="11.5" cy="12" r="1.5" fill="white" />
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <rect x="1" y="5" width="14" height="7" rx="1.5" stroke="white" strokeWidth="1.3" />
            <path d="M1 8h14" stroke="white" strokeWidth="1" opacity="0.5" />
            <circle cx="4" cy="13" r="1.5" fill="white" />
            <circle cx="12" cy="13" r="1.5" fill="white" />
          </svg>
        )}
      </div>
    </div>
  );
}

/* ── Map Controls ───────────────────────────────────────────── */
function MapControls() {
  return (
    <div style={{
      position: 'absolute',
      bottom: '80px',
      left: '24px',
      display: 'flex',
      flexDirection: 'column',
      gap: '4px',
    }}>
      {[
        { label: '+', title: 'Zoom in' },
        { label: '−', title: 'Zoom out' },
      ].map(({ label, title }) => (
        <button key={label} suppressHydrationWarning title={title} style={{
          width: '36px', height: '36px', borderRadius: '8px',
          background: 'rgba(255,255,255,0.90)', border: '1px solid rgba(255,255,255,0.5)',
          backdropFilter: 'blur(6px)',
          fontFamily: 'Inter', fontSize: '18px', fontWeight: 400, color: '#374151',
          cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
        }}>
          {label}
        </button>
      ))}
      <button suppressHydrationWarning title="My location" style={{
        width: '36px', height: '36px', borderRadius: '8px',
        background: 'rgba(255,255,255,0.90)', border: '1px solid rgba(255,255,255,0.5)',
        backdropFilter: 'blur(6px)',
        cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
      }}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <circle cx="8" cy="8" r="3" stroke="#374151" strokeWidth="1.5" />
          <path d="M8 1v2M8 13v2M1 8h2M13 8h2" stroke="#374151" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
}

/* ── Page ───────────────────────────────────────────────────── */
export default function LiveMapPage() {
  return (
    <div style={{
      display: 'flex',
      width: '100vw',
      height: '100vh',
      overflow: 'hidden',
      fontFamily: 'Inter, sans-serif',
    }}>
      <Sidebar />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <Navbar />

        {/* Map area */}
        <div style={{
          flex: 1,
          position: 'relative',
          overflow: 'hidden',
          backgroundImage: 'url(/dark_map.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}>

          {/* 404-3325: left column — Fleet Status + Active Alerts stacked */}
          <div style={{
            position: 'absolute',
            top: '24px',
            left: '24px',
            display: 'inline-flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: '8px',
            maxHeight: 'calc(100% - 48px)',
            overflowY: 'auto',
          }}>
            <FleetStatusCard />
            <ActiveAlertsCard />
          </div>

          {/* Driver Popup */}
          <DriverPopup />

          {/* Vehicle markers */}
          <VehicleMarker top="38%" left="52%" color="#22C55E" icon="truck" />
          <VehicleMarker top="54%" left="64%" color="#22C55E" icon="truck" />
          <VehicleMarker top="62%" left="73%" color="#EF4444" icon="van" />

          {/* Map controls */}
          <MapControls />

          {/* Optimize All Routes */}
          <button suppressHydrationWarning style={{
            position: 'absolute',
            bottom: '24px',
            right: '24px',
            height: '56px',
            paddingLeft: '24px',
            paddingRight: '24px',
            borderRadius: '9999px',
            background: '#2563EB',
            border: 'none',
            boxShadow: '0 25px 50px -12px rgba(0, 88, 190, 0.40)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontFamily: 'Inter',
            fontSize: '14px',
            fontWeight: 700,
            color: '#FFFFFF',
            whiteSpace: 'nowrap',
          }}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <circle cx="9" cy="9" r="7.5" stroke="white" strokeWidth="1.5" />
              <path d="M9 5v4l3 2" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Optimize All Routes
          </button>

        </div>
      </div>
    </div>
  );
}
