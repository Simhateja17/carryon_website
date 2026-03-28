'use client';

import { useRouter, usePathname } from 'next/navigation';

/* ── Sidebar ─────────────────────────────────────────────────── */
const sideNav = [
  {
    label: 'Command Center', href: '/command-center',
    icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="1" y="1" width="6" height="6" rx="1.2" fill="currentColor"/><rect x="9" y="1" width="6" height="6" rx="1.2" fill="currentColor"/><rect x="1" y="9" width="6" height="6" rx="1.2" fill="currentColor"/><rect x="9" y="9" width="6" height="6" rx="1.2" fill="currentColor"/></svg>,
  },
  {
    label: 'Fleet Tracking', href: '/live-map',
    icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="1" y="3" width="9" height="7" rx="1.2" stroke="currentColor" strokeWidth="1.3"/><path d="M10 5.5h2.5l2 4H10V5.5Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/><circle cx="3.5" cy="12" r="1.5" fill="currentColor"/><circle cx="11" cy="12" r="1.5" fill="currentColor"/></svg>,
  },
  {
    label: 'Job Management', href: '/orders',
    icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2" y="1" width="12" height="14" rx="1.5" stroke="currentColor" strokeWidth="1.3"/><path d="M5 6h6M5 9h6M5 12h3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>,
  },
  {
    label: 'Route Analytics', href: '/analytics',
    icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><polyline points="2,12 5,7 8,9.5 14,3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/><line x1="2" y1="14" x2="14" y2="14" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>,
  },
  {
    label: 'Asset Ledger', href: '/customers',
    icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2" y="2" width="12" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.3"/><path d="M5 8h6M8 5v6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>,
  },
  {
    label: 'Settings', href: '/settings',
    icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="2.2" stroke="currentColor" strokeWidth="1.3"/><path d="M8 1v1.5M8 13.5V15M1 8h1.5M13.5 8H15M3.05 3.05l1.06 1.06M11.89 11.89l1.06 1.06M3.05 12.95l1.06-1.06M11.89 4.11l1.06-1.06" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>,
  },
];

function Sidebar() {
  const router   = useRouter();
  const pathname = usePathname();

  return (
    <aside style={{
      width: '210px', flexShrink: 0, height: '100vh',
      background: '#fff', borderRight: '1px solid #E2E8F0',
      display: 'flex', flexDirection: 'column',
    }}>
      {/* Logo */}
      <div style={{ padding: '20px 20px 16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{
          width: '36px', height: '36px', borderRadius: '8px',
          background: '#2563EB', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>
          <svg width="20" height="16" viewBox="0 0 24 18" fill="none">
            <rect x="0.75" y="3.5" width="13.5" height="10" rx="1.75" stroke="white" strokeWidth="1.6"/>
            <path d="M14.25 6.5h4.5l2.75 4.5H14.25V6.5Z" stroke="white" strokeWidth="1.6" strokeLinejoin="round"/>
            <circle cx="4.5" cy="15.25" r="1.75" fill="white"/>
            <circle cx="14.75" cy="15.25" r="1.75" fill="white"/>
          </svg>
        </div>
        <span style={{ fontFamily: 'Inter', fontSize: '20px', fontWeight: 800, color: '#2563EB', letterSpacing: '-0.3px' }}>
          Carry On
        </span>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '4px 12px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
        {sideNav.map((item) => {
          const isActive = pathname === item.href;
          return (
            <button
              key={item.label}
              suppressHydrationWarning
              onClick={() => router.push(item.href)}
              style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                padding: '9px 12px', width: '100%', textAlign: 'left',
                background: isActive ? '#EFF6FF' : 'transparent',
                border: 'none', borderRadius: '8px', cursor: 'pointer',
              }}
            >
              <span style={{ color: isActive ? '#2563EB' : '#64748B', display: 'flex', flexShrink: 0 }}>{item.icon}</span>
              <span style={{
                fontFamily: 'Inter', fontSize: '13px',
                fontWeight: isActive ? 700 : 400,
                color: isActive ? '#2563EB' : '#374151',
              }}>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Bottom */}
      <div style={{ padding: '12px 12px 20px', borderTop: '1px solid #F1F5F9', display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <button suppressHydrationWarning style={{
          width: '100%', height: '40px', borderRadius: '8px',
          background: '#2563EB', border: 'none', cursor: 'pointer',
          fontFamily: 'Inter', fontSize: '13px', fontWeight: 700, color: '#fff',
          marginBottom: '4px',
        }}>
          + New Dispatch
        </button>
        <button suppressHydrationWarning style={{
          display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px',
          background: 'none', border: 'none', cursor: 'pointer', width: '100%',
        }}>
          <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="6.5" stroke="#64748B" strokeWidth="1.3"/>
            <path d="M8 11v-1M8 8.5a1.75 1.75 0 1 0 0-3.5 1.75 1.75 0 0 0 0 3.5Z" stroke="#64748B" strokeWidth="1.3" strokeLinecap="round"/>
          </svg>
          <span style={{ fontFamily: 'Inter', fontSize: '13px', color: '#374151' }}>Support</span>
        </button>
        <button suppressHydrationWarning style={{
          display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px',
          background: 'none', border: 'none', cursor: 'pointer', width: '100%',
        }}>
          <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
            <path d="M6 14H3a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h3" stroke="#64748B" strokeWidth="1.3" strokeLinecap="round"/>
            <path d="M11 12l4-4-4-4M15 8H7" stroke="#64748B" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span style={{ fontFamily: 'Inter', fontSize: '13px', color: '#374151' }}>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}

/* ── Stat Card ───────────────────────────────────────────────── */
interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  trend: string;
  trendUp: boolean | null; // null = stable
}
function StatCard({ icon, label, value, trend, trendUp }: StatCardProps) {
  const trendColor = trendUp === null ? '#64748B' : trendUp ? '#10B981' : '#EF4444';
  return (
    <div style={{
      background: '#fff', borderRadius: '12px', border: '1px solid #E2E8F0',
      padding: '16px 18px', display: 'flex', alignItems: 'flex-start', gap: '14px',
    }}>
      <div style={{
        width: '40px', height: '40px', borderRadius: '10px',
        background: '#EFF6FF', display: 'flex', alignItems: 'center',
        justifyContent: 'center', flexShrink: 0, color: '#2563EB',
      }}>
        {icon}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
          <span style={{ fontFamily: 'Inter', fontSize: '11px', fontWeight: 500, color: '#64748B' }}>{label}</span>
          <span style={{ fontFamily: 'Inter', fontSize: '11px', fontWeight: 600, color: trendColor }}>
            {trendUp === true ? '↗' : trendUp === false ? '↘' : ''}{trend}
          </span>
        </div>
        <div style={{ fontFamily: 'Inter', fontSize: '26px', fontWeight: 800, color: '#0F172A', lineHeight: 1 }}>
          {value}
        </div>
      </div>
    </div>
  );
}

/* ── Driver Status Row ───────────────────────────────────────── */
/* 404-6412 / 404-6438 / 404-6451 / 404-6464:
   display:flex; justify-content:space-between; align-items:center; align-self:stretch */
function DriverRow({ name, status, detail, avatarSrc, dotColor }: {
  name: string; status: string; detail: string; avatarSrc: string; dotColor: string;
}) {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      alignSelf: 'stretch',
    }}>
      {/* Left: avatar + text */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {/* Avatar with status dot — dot at bottom-left */}
        <div style={{ position: 'relative', flexShrink: 0 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={avatarSrc}
            alt={name}
            style={{
              width: '48px', height: '48px', borderRadius: '50%',
              objectFit: 'cover', display: 'block',
              background: '#F1F5F9',
            }}
          />
          <span style={{
            position: 'absolute', bottom: '1px', left: '1px',
            width: '12px', height: '12px', borderRadius: '50%',
            background: dotColor, border: '2px solid #fff',
          }} />
        </div>

        {/* Name + status */}
        <div>
          <div style={{ fontFamily: 'Inter', fontSize: '14px', fontWeight: 700, color: '#0F172A', lineHeight: '20px' }}>
            {name}
          </div>
          <div style={{ fontFamily: 'Inter', fontSize: '12px', color: '#64748B', lineHeight: '16px' }}>
            {status} • {detail}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Progress Bar ────────────────────────────────────────────── */
function ProgressBar({ label, pct }: { label: string; pct: number }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: 'Inter', fontSize: '10px', fontWeight: 600, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.4px' }}>{label}</span>
        <span style={{ fontFamily: 'Inter', fontSize: '10px', fontWeight: 700, color: '#2563EB' }}>{pct}%</span>
      </div>
      <div style={{ height: '6px', borderRadius: '9999px', background: '#E2E8F0', overflow: 'hidden' }}>
        <div style={{ width: `${pct}%`, height: '100%', borderRadius: '9999px', background: '#2563EB' }} />
      </div>
    </div>
  );
}

/* ── Job Status Badge ────────────────────────────────────────── */
function StatusBadge({ status }: { status: 'ACTIVE' | 'COMPLETED' | 'PENDING' }) {
  const styles = {
    ACTIVE:    { background: '#2563EB', color: '#fff' },
    COMPLETED: { background: '#10B981', color: '#fff' },
    PENDING:   { background: '#EFF6FF', color: '#2563EB', border: '1px solid #BFDBFE' },
  };
  const s = styles[status];
  return (
    <span style={{
      display: 'inline-block', padding: '3px 10px', borderRadius: '9999px',
      fontFamily: 'Inter', fontSize: '10px', fontWeight: 700,
      whiteSpace: 'nowrap', ...s,
    }}>
      {status}
    </span>
  );
}

/* ── Page ────────────────────────────────────────────────────── */
export default function CommandCenterPage() {
  const jobs = [
    { id: '#CR-9042', driver: 'David Chen',     avatarSrc: '/driver-avatar.png', from: 'ORD', to: 'DWT', routeType: 'Long Haul', dist: '420mi', status: 'ACTIVE'    as const, earnings: '$1,240.00' },
    { id: '#CR-8991', driver: 'Sarah Miller',   avatarSrc: '/driver-sarah.png',  from: 'SFO', to: 'SJX', routeType: 'Local',     dist: '45mi',  status: 'COMPLETED' as const, earnings: '$320.00'   },
    { id: '#CR-9102', driver: 'Marcus Johnson', avatarSrc: '/driver-james.png',  from: 'LGA', to: 'PHL', routeType: 'Express',   dist: '95mi',  status: 'PENDING'   as const, earnings: '$580.00'   },
  ];

  const drivers = [
    { name: 'Jordan P.', status: 'In Route',   detail: 'Truck #042',           avatarSrc: '/driver-avatar.png',   dotColor: '#22C55E' },
    { name: 'Sarah L.',  status: 'Available',  detail: 'Truck #011',           avatarSrc: '/driver-sarah.png',    dotColor: '#22C55E' },
    { name: 'Kevin H.',  status: 'Offline',    detail: 'Last seen 2h ago',     avatarSrc: '/driver-michael.png',  dotColor: '#94A3B8' },
    { name: 'Emily R.',  status: 'In Route',   detail: 'Truck #088',           avatarSrc: '/driver-elena.png',    dotColor: '#22C55E' },
    { name: 'Robert T.', status: 'Offline',    detail: 'Last seen 14m ago',    avatarSrc: '/driver-sam.png',      dotColor: '#94A3B8' },
  ];

  return (
    <div style={{ display: 'flex', width: '100vw', height: '100vh', background: '#F8FAFC', fontFamily: 'Inter, sans-serif', overflow: 'hidden' }}>
      <Sidebar />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

        {/* ── Navbar ── */}
        <header style={{
          height: '60px', flexShrink: 0, background: '#fff',
          borderBottom: '1px solid #E2E8F0',
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', padding: '0 24px',
          boxSizing: 'border-box', gap: '16px',
        }}>
          {/* Search */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            height: '38px', padding: '0 14px',
            background: '#F8FAFC', border: '1px solid #E2E8F0',
            borderRadius: '999px', flex: 1, maxWidth: '420px',
          }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <circle cx="6" cy="6" r="4.5" stroke="#94A3B8" strokeWidth="1.3"/>
              <path d="M9.5 9.5l2.5 2.5" stroke="#94A3B8" strokeWidth="1.3" strokeLinecap="round"/>
            </svg>
            <span style={{ fontFamily: 'Inter', fontSize: '13px', color: '#CBD5E1' }}>Search fleet, jobs, or drivers...</span>
          </div>

          {/* Right: bell + profile */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button suppressHydrationWarning style={{
              width: '36px', height: '36px', borderRadius: '50%',
              background: 'transparent', border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative',
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" stroke="#374151" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span style={{ position: 'absolute', top: '7px', right: '7px', width: '7px', height: '7px', borderRadius: '50%', background: '#EF4444', border: '1.5px solid #fff' }} />
            </button>

            {/* Alex Rivera */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontFamily: 'Inter', fontSize: '13px', fontWeight: 700, color: '#0F172A' }}>Alex Rivera</div>
                <div style={{ fontFamily: 'Inter', fontSize: '11px', color: '#64748B' }}>Fleet Admin</div>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/driver-avatar.png" alt="Alex Rivera" style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #E2E8F0' }} />
            </div>
          </div>
        </header>

        {/* ── Main content ── */}
        <main style={{ flex: 1, overflowY: 'auto', padding: '20px 24px', boxSizing: 'border-box' }}>

          {/* Stat cards row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '20px' }}>
            <StatCard
              icon={<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="3" y="2" width="14" height="16" rx="2" stroke="#2563EB" strokeWidth="1.5"/><path d="M7 7h6M7 10h6M7 13h4" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round"/></svg>}
              label="Active Jobs" value="142" trend="+12%" trendUp={true}
            />
            <StatCard
              icon={<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="7" r="3.5" stroke="#2563EB" strokeWidth="1.5"/><path d="M3 18c0-3.866 3.134-7 7-7s7 3.134 7 7" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round"/></svg>}
              label="Available Drivers" value="28" trend="Stable" trendUp={null}
            />
            <StatCard
              icon={<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="1" y="6" width="12" height="8" rx="1.5" stroke="#2563EB" strokeWidth="1.5"/><path d="M13 9h3l2.5 4H13V9Z" stroke="#2563EB" strokeWidth="1.5" strokeLinejoin="round"/><circle cx="4.5" cy="16" r="1.8" fill="#2563EB"/><circle cx="13" cy="16" r="1.8" fill="#2563EB"/></svg>}
              label="Fleet Utilization" value="94.2%" trend="-2%" trendUp={false}
            />
            <StatCard
              icon={<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M3 14l4-5 3 3 4-6 3 2" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><circle cx="17" cy="5" r="2" fill="#2563EB"/></svg>}
              label="Today's Revenue" value="$14.2k" trend="+8%" trendUp={true}
            />
          </div>

          {/* Two-column layout: Map+Jobs | Driver Status */}
          <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>

            {/* LEFT — Map + Recent Jobs */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px', minWidth: 0 }}>

              {/* Map — node 414-987
                  aspect-ratio: 122/77; background: url(/blue_map.png) lightgray
                  -77.529px -8.879px / 136.345% 111.821% no-repeat */}
              <div style={{
                borderRadius: '12px', overflow: 'hidden',
                border: '1px solid #E2E8F0',
                position: 'relative',
                aspectRatio: '122 / 77',
                backgroundColor: 'lightgray',
                backgroundImage: 'url(/blue_map.png)',
                backgroundPosition: '-77.529px -8.879px',
                backgroundSize: '136.345% 111.821%',
                backgroundRepeat: 'no-repeat',
              }}>
                {/* Live Fleet overlay card */}
                <div style={{
                  position: 'absolute', top: '16px', left: '16px',
                  background: 'rgba(255,255,255,0.95)',
                  borderRadius: '10px', padding: '12px 14px',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.10)',
                  backdropFilter: 'blur(4px)',
                }}>
                  <div style={{ fontFamily: 'Inter', fontSize: '13px', fontWeight: 700, color: '#0F172A', marginBottom: '8px' }}>
                    Live Fleet (32)
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22C55E', display: 'inline-block' }} />
                      <span style={{ fontFamily: 'Inter', fontSize: '12px', color: '#374151' }}>24 In Motion</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#94A3B8', display: 'inline-block' }} />
                      <span style={{ fontFamily: 'Inter', fontSize: '12px', color: '#374151' }}>8 Stationary</span>
                    </div>
                  </div>
                </div>

                {/* +12 Active Drivers pill */}
                <div style={{
                  position: 'absolute', bottom: '16px', right: '16px',
                  background: 'rgba(255,255,255,0.95)',
                  borderRadius: '999px', padding: '8px 14px',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.10)',
                  display: 'flex', alignItems: 'center', gap: '8px',
                  backdropFilter: 'blur(4px)',
                }}>
                  {/* Mini overlapping avatars */}
                  <div style={{ display: 'flex', position: 'relative', width: '52px', height: '24px' }}>
                    {['/driver-avatar.png', '/driver-sarah.png', '/driver-elena.png'].map((src, i) => (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img key={i} src={src} alt="" style={{
                        width: '24px', height: '24px', borderRadius: '50%',
                        objectFit: 'cover', border: '2px solid #fff',
                        position: 'absolute', left: `${i * 14}px`,
                      }} />
                    ))}
                  </div>
                  <span style={{ fontFamily: 'Inter', fontSize: '12px', fontWeight: 600, color: '#0F172A', whiteSpace: 'nowrap' }}>
                    +12 Active Drivers
                  </span>
                </div>
              </div>

              {/* Recent Jobs */}
              <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #E2E8F0', overflow: 'hidden' }}>
                {/* Header */}
                <div style={{
                  padding: '14px 20px', display: 'flex',
                  justifyContent: 'space-between', alignItems: 'center',
                  borderBottom: '1px solid #F1F5F9',
                }}>
                  <span style={{ fontFamily: 'Inter', fontSize: '15px', fontWeight: 700, color: '#0F172A' }}>Recent Jobs</span>
                  <button suppressHydrationWarning style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    fontFamily: 'Inter', fontSize: '12px', fontWeight: 600, color: '#2563EB',
                    display: 'flex', alignItems: 'center', gap: '4px',
                  }}>
                    View All →
                  </button>
                </div>

                {/* Table */}
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ background: '#F8FAFC' }}>
                      {['JOB ID', 'DRIVER', 'ROUTE', 'STATUS', 'EARNINGS'].map((h) => (
                        <th key={h} style={{
                          padding: '10px 16px', textAlign: 'left',
                          fontFamily: 'Inter', fontSize: '10px',
                          fontWeight: 600, color: '#94A3B8',
                          letterSpacing: '0.5px', whiteSpace: 'nowrap',
                        }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {jobs.map((job, i) => (
                      <tr key={job.id} style={{ borderTop: '1px solid #F1F5F9' }}>
                        <td style={{ padding: '12px 16px', fontFamily: 'Inter', fontSize: '12px', fontWeight: 700, color: '#0F172A', whiteSpace: 'nowrap' }}>
                          {job.id}
                        </td>
                        <td style={{ padding: '12px 16px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={job.avatarSrc} alt={job.driver} style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
                            <span style={{ fontFamily: 'Inter', fontSize: '12px', fontWeight: 500, color: '#0F172A', whiteSpace: 'nowrap' }}>{job.driver}</span>
                          </div>
                        </td>
                        <td style={{ padding: '12px 16px' }}>
                          <div style={{ fontFamily: 'Inter', fontSize: '12px', fontWeight: 600, color: '#0F172A', whiteSpace: 'nowrap' }}>
                            {job.from} → {job.to}
                          </div>
                          <div style={{ fontFamily: 'Inter', fontSize: '10px', color: '#94A3B8' }}>
                            {job.routeType} • {job.dist}
                          </div>
                        </td>
                        <td style={{ padding: '12px 16px' }}>
                          <StatusBadge status={job.status} />
                        </td>
                        <td style={{ padding: '12px 16px', fontFamily: 'Inter', fontSize: '13px', fontWeight: 700, color: '#0F172A', whiteSpace: 'nowrap' }}>
                          {job.earnings}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* RIGHT — Driver Status + Efficiency Overview */}
            <div style={{ width: '270px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>

              {/* 404-6404: Driver Status card
                  padding: 24px 24px 24px 24px; gap: 24px; border-radius: 12px; background: #FFF */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: '24px',
                alignSelf: 'stretch',
                borderRadius: '12px',
                background: '#FFF',
                border: '1px solid #E2E8F0',
                padding: '24px',
                boxSizing: 'border-box',
              }}>
                {/* Title */}
                <div style={{ fontFamily: 'Inter', fontSize: '18px', fontWeight: 700, color: '#0F172A' }}>
                  Driver Status
                </div>

                {/* Driver rows with dividers */}
                <div style={{ display: 'flex', flexDirection: 'column', alignSelf: 'stretch', gap: '0' }}>
                  {drivers.map((d, i) => (
                    <div key={d.name}>
                      {i > 0 && (
                        <div style={{ height: '1px', background: '#F1F5F9', margin: '0' }} />
                      )}
                      <div style={{ padding: '12px 0' }}>
                        <DriverRow {...d} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Efficiency Overview */}
              <div style={{
                background: '#EFF6FF',
                borderRadius: '12px',
                border: '1px solid #BFDBFE',
                padding: '20px',
              }}>
                <div style={{
                  fontFamily: 'Inter', fontSize: '15px', fontWeight: 700,
                  color: '#2563EB', marginBottom: '16px',
                }}>
                  Efficiency Overview
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <ProgressBar label="On Time Rate" pct={98} />
                  <ProgressBar label="Fuel Economy" pct={82} />
                </div>
              </div>

            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
