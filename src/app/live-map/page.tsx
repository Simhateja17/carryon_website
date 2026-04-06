'use client';

import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';

/* ── Fleet Status Card ──────────────────────────────────────── */
function FleetStatusCard() {
  return (
    <div style={{
      width: '288px',
      height: '224px',
      borderRadius: '16px',
      background: '#2F80ED33',
      border: '1px solid #FFFFFF66',
      backdropFilter: 'blur(20px)',
      padding: '16px',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
    }}>
      {/* Header row — 404-3344 "Fleet Status" + 404-3346 "REAL-TIME" */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 4px' }}>
        {/* 404-3344: Manrope 14px 700 — white on dark map background */}
        <span style={{ fontFamily: 'Manrope, Inter, sans-serif', fontSize: '14px', fontWeight: 700, color: '#FFFFFF', lineHeight: '20px' }}>
          Fleet Status
        </span>
        {/* 404-3346: Inter 10px 500, color #2F80ED */}
        <span style={{ fontFamily: 'Inter', fontSize: '10px', fontWeight: 500, color: '#2F80ED', lineHeight: '15px' }}>
          REAL-TIME
        </span>
      </div>

      {/* 2×2 grid of white boxes — 404-3348/3353/3358/3363 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
        {[
          { label: 'ACTIVE',   value: '142' },
          { label: 'DELAYED',  value: '12'  },
          { label: 'IDLE',     value: '08'  },
          { label: 'EN ROUTE', value: '94'  },
        ].map(({ label, value }) => (
          <div key={label} style={{
            display: 'flex',
            padding: '12px',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifySelf: 'stretch',
            borderRadius: '12px',
            background: '#FFF',
          }}>
            {/* 404-3350: color #000, letter-spacing -0.5px, line-height 15px */}
            <div style={{
              alignSelf: 'stretch',
              fontFamily: 'Inter', fontSize: '10px', fontWeight: 600,
              color: '#000', letterSpacing: '-0.5px', lineHeight: '15px',
              textTransform: 'uppercase', marginBottom: '4px',
            }}>
              {label}
            </div>
            {/* 404-3352: Manrope 24px 800, color #2F80ED, line-height 32px */}
            <div style={{
              alignSelf: 'stretch',
              fontFamily: 'Manrope, Inter, sans-serif', fontSize: '24px', fontWeight: 800,
              color: '#2F80ED', lineHeight: '32px',
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
      titleColor: '#2F80ED',
      subColor: '#475569',
      timeColor: '#64748B',
      titleWidth: '224px',
      titleHeight: '32px',
    },
    {
      type: 'ROUTE DEVIATION',
      typeColor: '#2F80ED',
      time: '14m ago',
      title: 'TRK-4412 left planned route by 1.2 miles',
      sub: 'Driver: Sarah L. • Downtown Loop',
      /* 404-3382: white */
      bg: '#FFF',
      border: 'none',
      titleColor: '#0F172A',
      subColor: '#2F80ED',
      timeColor: '#2F80ED',
      typeWidth: '91.13px',
      timeWidth: '52px',
      subWidth: '226px',
    },
    {
      type: 'WEATHER DELAY',
      typeColor: '#2F80ED',
      time: '28m ago',
      title: 'Heavy rain affecting Zone 4 speeds',
      sub: '8 drivers impacted • North Suburbs',
      /* 404-3390: white */
      bg: '#FFF',
      border: 'none',
      titleColor: '#0F172A',
      subColor: '#2F80ED',
      timeColor: '#2F80ED',
      timeWidth: '41.61px',
      subWidth: '226px',
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
                fontFamily: 'Inter', fontSize: '10px', fontWeight: 600, lineHeight: '15px',
                color: alert.typeColor, letterSpacing: '0px', textTransform: 'uppercase',
                width: (alert as { typeWidth?: string }).typeWidth ?? 'auto',
              }}>
                {alert.type}
              </span>
              <span style={{
                fontFamily: 'Inter', fontSize: '10px', fontWeight: 400, lineHeight: '15px',
                color: alert.timeColor,
                width: (alert as { timeWidth?: string }).timeWidth ?? 'auto',
              }}>
                {alert.time}
              </span>
            </div>
            <div style={{
              fontFamily: 'Inter', fontSize: '12px', fontWeight: 600,
              color: alert.titleColor, lineHeight: '16px',
              width: (alert as { titleWidth?: string }).titleWidth ?? '100%',
              minHeight: (alert as { titleHeight?: string }).titleHeight ?? 'auto',
            }}>
              {alert.title}
            </div>
            <div style={{
              fontFamily: 'Inter', fontSize: '10px', fontWeight: 400, lineHeight: '15px',
              color: alert.subColor,
              width: (alert as { subWidth?: string }).subWidth ?? 'auto',
            }}>
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
    <div style={{
      position: 'absolute',
      top: '24px',
      right: '24px',
      width: '320px',
      height: '267px',
      borderRadius: '16px',
      background: '#FFFFFFB2',
      border: '1px solid #FFFFFF66',
      backdropFilter: 'blur(20px)',
      padding: '20px',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
    }}>

      {/* Header row: avatar + name/id + ON DUTY badge */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', alignSelf: 'stretch' }}>
        {/* Avatar */}
        <div style={{
          width: '48px', height: '48px', borderRadius: '9999px',
          overflow: 'hidden', flexShrink: 0,
          border: '2px solid #FFFFFF',
          boxShadow: '0px 1px 2px 0px rgba(0,0,0,0.05)',
        }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/marcus-jensen.png" alt="Marcus Jensen" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>

        {/* Name + ID */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            fontFamily: 'Manrope, Inter, sans-serif', fontSize: '14px', fontWeight: 800,
            lineHeight: '20px', color: '#191C1E',
          }}>
            Marcus Jensen
          </div>
          <div style={{
            fontFamily: 'Inter', fontSize: '12px', fontWeight: 400,
            color: '#64748B', lineHeight: '16px',
          }}>
            ID: DRV-00982 • Silver Tier
          </div>
        </div>

        {/* ON DUTY badge */}
        <div style={{
          height: '31px', padding: '0 10px',
          borderRadius: '4px', background: '#B7DAF5',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>
          <span style={{ fontFamily: 'Inter', fontSize: '9px', fontWeight: 800, color: '#2F80ED', lineHeight: '11px', letterSpacing: '0.3px' }}>ON</span>
          <span style={{ fontFamily: 'Inter', fontSize: '9px', fontWeight: 800, color: '#2F80ED', lineHeight: '11px', letterSpacing: '0.3px' }}>DUTY</span>
        </div>
      </div>

      {/* Route Progress */}
      <div style={{ display: 'flex', flexDirection: 'column', alignSelf: 'stretch', gap: '6px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{
            fontFamily: 'Inter', fontSize: '10px', fontWeight: 600,
            color: '#5F6B7A', textTransform: 'uppercase', letterSpacing: '0.5px',
          }}>
            ROUTE PROGRESS
          </span>
          <span style={{ fontFamily: 'Inter', fontSize: '10px', fontWeight: 700, color: '#2F80ED' }}>72%</span>
        </div>
        <div style={{ height: '6px', alignSelf: 'stretch', borderRadius: '9999px', background: '#ECEEF0', overflow: 'hidden' }}>
          <div style={{ width: '72%', height: '100%', borderRadius: '9999px', background: '#2F80ED' }} />
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: '1px', background: '#E2E8F0', alignSelf: 'stretch' }} />

      {/* Vehicle / Next Stop grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
        columnGap: '16px',
        alignSelf: 'stretch',
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          <span style={{ color: '#5F6B7A', fontFamily: 'Inter', fontSize: '10px', fontWeight: 600, lineHeight: '15px', textTransform: 'uppercase' }}>
            VEHICLE
          </span>
          <span style={{ color: '#191C1E', fontFamily: 'Inter', fontSize: '12px', fontWeight: 600, lineHeight: '16px' }}>
            Freightliner M2 (2023)
          </span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          <span style={{ color: '#5F6B7A', fontFamily: 'Inter', fontSize: '10px', fontWeight: 600, lineHeight: '15px', textTransform: 'uppercase' }}>
            NEXT STOP
          </span>
          <span style={{ color: '#191C1E', fontFamily: 'Inter', fontSize: '12px', fontWeight: 600, lineHeight: '16px' }}>
            Distribution Ctr A
          </span>
        </div>
      </div>

      {/* Action buttons */}
      <div style={{ display: 'flex', gap: '8px', alignSelf: 'stretch', marginTop: 'auto' }}>
        <button suppressHydrationWarning style={{
          flex: '1 0 0', height: '40px', borderRadius: '10px',
          background: '#E0E3E5', border: 'none',
          fontFamily: 'Inter', fontSize: '13px', fontWeight: 600, color: '#191C1E',
          cursor: 'pointer',
        }}>
          View Log
        </button>
        <button suppressHydrationWarning style={{
          flex: '1 0 0', height: '40px', borderRadius: '10px',
          background: '#2F80ED', border: 'none',
          fontFamily: 'Inter', fontSize: '13px', fontWeight: 600, color: '#FFFFFF',
          cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
        }}>
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <path d="M2 2h9a1 1 0 0 1 1 1v5.5a1 1 0 0 1-1 1H4.5L1.5 12V3a1 1 0 0 1 1-1Z" stroke="white" strokeWidth="1.3" strokeLinejoin="round" />
          </svg>
          Message
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
    /* 404-3218: display flex; flex-direction column; background #F7F9FB */
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      minWidth: '1244px',
      minHeight: '1024px',
      width: '100vw',
      height: '100vh',
      overflow: 'auto',
      fontFamily: 'Inter, sans-serif',
      background: '#F7F9FB',
    }}>
      <Navbar />

      <div style={{ flex: 1, display: 'flex', overflow: 'hidden', minHeight: '960px' }}>
        <Sidebar />

        {/* Map area — 1024×960 content area */}
        <div style={{
          flex: 1,
          minWidth: '1024px',
          minHeight: '960px',
          position: 'relative',
          overflow: 'hidden',
          background: 'url(/dark_map.png) lightgray 0px -32px / 100% 106.667% no-repeat',
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
