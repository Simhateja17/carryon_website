'use client';

import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';

const inter = "'Inter', sans-serif";
const manrope = "'Manrope', sans-serif";

/* ── Sparkle Icon (Apply button) ────────────────────────────── */
function SparkleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M8 1l1.2 3.8L13 6l-3 2.2L11.2 12 8 9.8 4.8 12 6 8.2 3 6l3.8-1.2L8 1z" fill="white" />
    </svg>
  );
}

/* ── Purple Destination Marker ──────────────────────────────── */
function DestinationMarker({ top, left, label }: { top: string; left: string; label?: string }) {
  return (
    <div style={{ position: 'absolute', top, left, transform: 'translate(-50%, -100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
      <div style={{
        width: '28px', height: '28px', borderRadius: '50%',
        background: '#A855F7', border: '2px solid white',
        boxShadow: '0 2px 8px rgba(0,0,0,0.25)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M7 1C4.5 1 2.5 3 2.5 5.5c0 2.8 3.2 6.6 4.2 7.6.2.2.5.2.7 0 1-1 4.2-4.8 4.2-7.6C11.6 3 9.5 1 7 1Z" fill="white" />
          <circle cx="7" cy="5.5" r="1.5" fill="#A855F7" />
        </svg>
      </div>
      {label && (
        <span style={{
          fontFamily: inter, fontSize: '11px', fontWeight: 600, color: '#A855F7',
          textShadow: '0 1px 3px rgba(255,255,255,0.9)', whiteSpace: 'nowrap',
          marginTop: '2px',
        }}>
          {label}
        </span>
      )}
    </div>
  );
}

/* ── Map Controls ───────────────────────────────────────────── */
function MapControls() {
  return (
    <div style={{
      position: 'absolute',
      top: '24px',
      left: '24px',
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      zIndex: 5,
    }}>
      {/* Layers toggle */}
      <button suppressHydrationWarning title="Layers" style={{
        width: '40px', height: '40px', borderRadius: '10px',
        background: 'rgba(255,255,255,0.95)', border: '1px solid rgba(226,232,240,0.8)',
        backdropFilter: 'blur(6px)',
        cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
      }}>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M9 1l8 4-8 4-8-4 8-4z" stroke="#475569" strokeWidth="1.4" strokeLinejoin="round" />
          <path d="M1 9l8 4 8-4" stroke="#475569" strokeWidth="1.4" strokeLinejoin="round" />
          <path d="M1 13l8 4 8-4" stroke="#475569" strokeWidth="1.4" strokeLinejoin="round" />
        </svg>
      </button>
      {/* Zoom controls */}
      <div style={{
        display: 'flex', flexDirection: 'column',
        background: 'rgba(255,255,255,0.95)', borderRadius: '10px',
        border: '1px solid rgba(226,232,240,0.8)',
        boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
        overflow: 'hidden',
      }}>
        {[
          { label: '+', title: 'Zoom in' },
          { label: '−', title: 'Zoom out' },
        ].map(({ label, title }) => (
          <button key={label} suppressHydrationWarning title={title} style={{
            width: '40px', height: '40px',
            background: 'transparent', border: 'none',
            fontFamily: inter, fontSize: '18px', fontWeight: 400, color: '#374151',
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ── Route Optimization Panel ───────────────────────────────── */
function RouteOptimizationPanel() {
  return (
    <div style={{
      position: 'absolute',
      top: '24px',
      right: '24px',
      width: '300px',
      borderRadius: '16px',
      background: 'rgba(255,255,255,0.95)',
      border: '1px solid rgba(255,255,255,0.6)',
      backdropFilter: 'blur(20px)',
      padding: '16px 20px',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      boxShadow: '0 8px 32px rgba(0,0,0,0.10)',
      zIndex: 5,
    }}>
      {/* Header */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
        <div style={{ fontFamily: manrope, fontSize: '14px', fontWeight: 700, color: '#0F172A', lineHeight: '20px' }}>
          Route Optimization
        </div>
        <div style={{ fontFamily: inter, fontSize: '10px', fontWeight: 500, color: '#3B82F6', letterSpacing: '0.5px' }}>
          AI ENGINE V4.2
        </div>
      </div>

      {/* Stats row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          <span style={{ fontFamily: inter, fontSize: '10px', fontWeight: 600, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Savings</span>
          <span style={{ fontFamily: manrope, fontSize: '18px', fontWeight: 800, color: '#0F172A', lineHeight: '24px' }}>18.4%</span>
        </div>
        <div style={{ width: '1px', height: '28px', background: '#E2E8F0' }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          <span style={{ fontFamily: inter, fontSize: '10px', fontWeight: 600, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Time</span>
          <span style={{ fontFamily: manrope, fontSize: '18px', fontWeight: 800, color: '#0F172A', lineHeight: '24px' }}>142h</span>
        </div>
        <button
          suppressHydrationWarning
          style={{
            marginLeft: 'auto',
            height: '36px',
            padding: '0 14px',
            borderRadius: '8px',
            background: '#2563EB',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontFamily: inter,
            fontSize: '13px',
            fontWeight: 600,
            color: '#FFFFFF',
          }}
        >
          <SparkleIcon />
          Apply
        </button>
      </div>
    </div>
  );
}

/* ── Live Fleet Status Card ─────────────────────────────────── */
function LiveFleetStatusCard() {
  return (
    <div style={{
      position: 'absolute',
      bottom: '24px',
      left: '24px',
      width: '220px',
      borderRadius: '16px',
      background: 'rgba(255,255,255,0.95)',
      border: '1px solid rgba(255,255,255,0.6)',
      backdropFilter: 'blur(20px)',
      padding: '16px',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      boxShadow: '0 8px 32px rgba(0,0,0,0.10)',
      zIndex: 5,
    }}>
      <div style={{ fontFamily: manrope, fontSize: '14px', fontWeight: 700, color: '#0F172A', lineHeight: '20px' }}>
        Live Fleet Status
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22C55E', flexShrink: 0 }} />
          <span style={{ fontFamily: inter, fontSize: '12px', fontWeight: 500, color: '#64748B', flex: 1 }}>On Time</span>
          <span style={{ fontFamily: manrope, fontSize: '14px', fontWeight: 700, color: '#0F172A' }}>42 Vehicles</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#F59E0B', flexShrink: 0 }} />
          <span style={{ fontFamily: inter, fontSize: '12px', fontWeight: 500, color: '#64748B', flex: 1 }}>Delayed</span>
          <span style={{ fontFamily: manrope, fontSize: '14px', fontWeight: 700, color: '#0F172A' }}>8 Vehicles</span>
        </div>
      </div>
    </div>
  );
}

/* ── Status Badge ───────────────────────────────────────────── */
function StatusBadge({ status }: { status: 'OPTIMIZED' | 'CALCULATING' | 'PENDING' }) {
  const styles = {
    OPTIMIZED: { bg: '#D1FAE5', color: '#059669' },
    CALCULATING: { bg: '#DBEAFE', color: '#2563EB' },
    PENDING: { bg: '#FEF3C7', color: '#D97706' },
  };
  const s = styles[status];
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      padding: '4px 10px',
      borderRadius: '9999px',
      background: s.bg,
      fontFamily: inter,
      fontSize: '10px',
      fontWeight: 700,
      color: s.color,
      letterSpacing: '0.5px',
      textTransform: 'uppercase',
    }}>
      {status}
    </span>
  );
}

/* ── Fleet Card ─────────────────────────────────────────────── */
function FleetCard({
  icon,
  title,
  driver,
  status,
  metrics,
  progressColor,
}: {
  icon: 'truck' | 'van';
  title: string;
  driver: string;
  status: 'OPTIMIZED' | 'CALCULATING' | 'PENDING';
  metrics: { label: string; value: React.ReactNode }[];
  progressColor: string;
}) {
  return (
    <div style={{
      flex: 1,
      minWidth: 0,
      borderRadius: '16px',
      background: '#FFFFFF',
      border: '1px solid #E2E8F0',
      padding: '20px',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
    }}>
      {/* Header row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{
          width: '40px', height: '40px', borderRadius: '10px',
          background: '#EFF6FF',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>
          {icon === 'truck' ? (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <rect x="1" y="4" width="12" height="9" rx="1.5" stroke="#3B82F6" strokeWidth="1.3" />
              <path d="M13 6h4l2.5 4.5H13V6Z" stroke="#3B82F6" strokeWidth="1.3" strokeLinejoin="round" />
              <circle cx="4.5" cy="14.5" r="1.8" stroke="#3B82F6" strokeWidth="1.2" />
              <circle cx="14" cy="14.5" r="1.8" stroke="#3B82F6" strokeWidth="1.2" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <rect x="1" y="5" width="18" height="9" rx="1.5" stroke="#3B82F6" strokeWidth="1.3" />
              <path d="M1 9.5h18" stroke="#3B82F6" strokeWidth="1" opacity="0.4" />
              <circle cx="5" cy="15.5" r="1.8" stroke="#3B82F6" strokeWidth="1.2" />
              <circle cx="15" cy="15.5" r="1.8" stroke="#3B82F6" strokeWidth="1.2" />
            </svg>
          )}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: manrope, fontSize: '14px', fontWeight: 700, color: '#0F172A', lineHeight: '20px' }}>
            {title}
          </div>
          <div style={{ fontFamily: inter, fontSize: '12px', fontWeight: 400, color: '#64748B', lineHeight: '16px' }}>
            Driver: {driver}
          </div>
        </div>
        <StatusBadge status={status} />
      </div>

      {/* Metrics */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {metrics.map((m) => (
          <div key={m.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontFamily: inter, fontSize: '12px', fontWeight: 400, color: '#94A3B8' }}>{m.label}</span>
            <span style={{ fontFamily: inter, fontSize: '12px', fontWeight: 600, color: '#0F172A' }}>{m.value}</span>
          </div>
        ))}
      </div>

      {/* Progress bar */}
      <div style={{ marginTop: 'auto' }}>
        <div style={{ height: '6px', borderRadius: '9999px', background: '#F1F5F9', overflow: 'hidden' }}>
          <div style={{
            width: status === 'OPTIMIZED' ? '100%' : status === 'CALCULATING' ? '55%' : '80%',
            height: '100%',
            borderRadius: '9999px',
            background: progressColor,
            transition: 'width 0.6s ease',
          }} />
        </div>
      </div>
    </div>
  );
}

/* ── Optimization Priority Queue ────────────────────────────── */
function OptimizationPriorityQueue() {
  return (
    <div style={{
      background: '#FFFFFF',
      borderTop: '1px solid #E2E8F0',
      padding: '20px 24px',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
    }}>
      {/* Header row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M2 4.5h14M2 9h10M2 13.5h6" stroke="#64748B" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
          <span style={{ fontFamily: inter, fontSize: '12px', fontWeight: 700, color: '#0F172A', letterSpacing: '0.8px', textTransform: 'uppercase' }}>
            Optimization Priority Queue
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontFamily: inter, fontSize: '10px', fontWeight: 600, color: '#94A3B8', letterSpacing: '0.5px', textTransform: 'uppercase' }}>Selected Fleet</span>
            <span style={{ fontFamily: inter, fontSize: '12px', fontWeight: 700, color: '#0F172A' }}>12 Vehicles Out of Range</span>
          </div>
          <button
            suppressHydrationWarning
            style={{
              fontFamily: inter, fontSize: '12px', fontWeight: 700, color: '#2563EB',
              background: 'none', border: 'none', cursor: 'pointer',
            }}
          >
            View All Fleet
          </button>
          <button
            suppressHydrationWarning
            style={{
              height: '36px',
              padding: '0 16px',
              borderRadius: '8px',
              background: '#0F172A',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontFamily: inter,
              fontSize: '12px',
              fontWeight: 600,
              color: '#FFFFFF',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 1v5.5l3.5 3.5M1 13h12" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Export Report
          </button>
        </div>
      </div>

      {/* Fleet cards */}
      <div style={{ display: 'flex', gap: '16px' }}>
        <FleetCard
          icon="truck"
          title="Fleet Delta - Sector 4"
          driver="Sam Rodriguez"
          status="OPTIMIZED"
          metrics={[
            { label: 'Distance', value: <span>242km <span style={{ color: '#059669' }}>→ 198km</span></span> },
            { label: 'Estimated Duration', value: <span>6h45m <span style={{ color: '#059669' }}>→ 4h52m</span></span> },
          ]}
          progressColor="#059669"
        />
        <FleetCard
          icon="van"
          title="Northside Express"
          driver="Sarah Jenkins"
          status="CALCULATING"
          metrics={[
            { label: 'Current Distance', value: '156km' },
            { label: 'Projected Saving', value: <span style={{ color: '#2563EB' }}>~12% Reduction</span> },
          ]}
          progressColor="#2563EB"
        />
        <FleetCard
          icon="truck"
          title="Last-Mile Heavy-Duty"
          driver="Mike Lawson"
          status="PENDING"
          metrics={[
            { label: 'Efficiency Boost', value: <span style={{ color: '#059669' }}>+8.4%</span> },
            { label: 'Fuel Savings', value: <span style={{ color: '#059669' }}>+14.2 gal</span> },
          ]}
          progressColor="#059669"
        />
      </div>
    </div>
  );
}

/* ── Page ───────────────────────────────────────────────────── */
export default function OptimizeRoutesPage() {
  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: '#F7F9FB' }}>
      <Sidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minWidth: 0 }}>
        <Navbar />
        <main style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minWidth: 0 }}>
          {/* Map area */}
          <div style={{
            flex: 1,
            position: 'relative',
            overflow: 'hidden',
            background: 'url(/blue_map.png) lightgray 0px 0px / cover no-repeat',
            minHeight: 0,
          }}>
            {/* Map controls */}
            <MapControls />

            {/* Route Optimization Panel */}
            <RouteOptimizationPanel />

            {/* Live Fleet Status */}
            <LiveFleetStatusCard />

            {/* Destination markers — positioned to match Figma */}
            <DestinationMarker top="12%" left="46%" label="Costco Wholesale" />
            <DestinationMarker top="30%" left="58%" label="Museum Of Contemporary Art" />
            <DestinationMarker top="33%" left="72%" label="Navy Pier" />
            <DestinationMarker top="42%" left="82%" label="Four Mile Crib" />
            <DestinationMarker top="50%" left="54%" label="Field Museum" />
            <DestinationMarker top="58%" left="44%" label="National Museum of Mexican Art" />
            <DestinationMarker top="63%" left="68%" label="McCormick Place" />
            <DestinationMarker top="16%" left="86%" label="William E. Dever Crib Lighthouse" />
          </div>

          {/* Optimization Priority Queue */}
          <OptimizationPriorityQueue />
        </main>
      </div>
    </div>
  );
}
