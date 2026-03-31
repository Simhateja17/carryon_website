'use client';

const stats = [
  { label: 'Active Jobs', value: '142', trend: '+12%', trendUp: true, trendColor: '#2F80ED', iconType: 'activeJobs' },
  { label: 'Available Drivers', value: '28', trend: 'Stable', trendUp: null, trendColor: '#2F80ED', iconType: 'availableDrivers' },
  { label: 'Fleet Utilization', value: '94.2%', trend: '-2%', trendUp: false, trendColor: '#2F80ED', iconType: 'fleetUtilization' },
  { label: "Today's Revenue", value: '$14.2k', trend: '+8%', trendUp: true, trendColor: '#2F80ED', iconType: 'todaysRevenue' },
];

const drivers = [
  { name: 'Jordan P.', sub: 'In Route • Truck #042', subColor: '#2F80ED', dot: '#2F80ED', avatarBg: '#F1F5F9', light: false },
  { name: 'Sarah L.', sub: 'Available • Truck #011', subColor: '#10B981', dot: '#10B981', avatarBg: '#F1F5F9', light: false },
  { name: 'Kevin H.', sub: 'Offline • Last seen 2h ago', subColor: '#64748B', dot: '#64748B', avatarBg: '#F1F5F9', light: false },
  { name: 'Emily R.', sub: 'In Route • Truck #088', subColor: '#2F80ED', dot: '#2F80ED', avatarBg: '#F1F5F9', light: false },
  { name: 'Robert T.', sub: 'Offline • Last seen 14m ago', subColor: '#64748B', dot: '#64748B', avatarBg: '#F1F5F9', light: false },
];

const jobs = [
  {
    id: '#CR-9042', driver: 'David Chen',
    route: 'ORD → DWT', routeSub: 'Long Haul • 420mi',
    status: 'ACTIVE', statusBg: '#2563EB', statusText: '#fff',
    earnings: '$1,240.00',
  },
  {
    id: '#CR-8991', driver: 'Sarah Miller',
    route: 'SFO → SJX', routeSub: 'Local • 45mi',
    status: 'COMPLETED', statusBg: '#10B981', statusText: '#fff',
    earnings: '$320.00',
  },
  {
    id: '#CR-9102', driver: 'Marcus Johnson',
    route: 'LGA → PHL', routeSub: 'Express • 95mi',
    status: 'PENDING', statusBg: '#BFDBFE', statusText: '#1D4ED8',
    earnings: '$580.00',
  },
];

function StatCardIcon({ type }: { type: 'activeJobs' | 'availableDrivers' | 'fleetUtilization' | 'todaysRevenue' }) {
  const iconRoot = {
    width: '32px',
    height: '36px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    padding: '8px',
  } as const;

  const iconShapes: Record<typeof type, { bg: string; svg: JSX.Element }> = {
    activeJobs: {
      bg: '#E3F2FF',
      svg: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 2h8v12H4z" stroke="#2F80ED" strokeWidth="1.5" />
          <path d="M4 4h8" stroke="#2F80ED" strokeWidth="1.5" />
          <path d="M6 7l1.5 1.5L10 6" stroke="#2F80ED" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6 10l1.5 1.5L10 9" stroke="#2F80ED" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    availableDrivers: {
      bg: '#EEF5FF',
      svg: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="8" cy="5" r="2.5" stroke="#2563EB" strokeWidth="1.5" />
          <path d="M3 14c0-2.5 2-4.5 5-4.5s5 2 5 4.5" stroke="#2563EB" strokeWidth="1.5" />
        </svg>
      ),
    },
    fleetUtilization: {
      bg: '#ECFFF3',
      svg: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="9" width="2" height="5" fill="#10B981" />
          <rect x="6" y="5" width="2" height="9" fill="#10B981" />
          <rect x="10" y="7" width="2" height="7" fill="#10B981" />
          <rect x="14" y="3" width="0" height="0" />
          <path d="M1 14h14" stroke="#10B981" strokeWidth="1" strokeLinecap="round" />
        </svg>
      ),
    },
    todaysRevenue: {
      bg: '#FFFBEB',
      svg: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 2h8v12H4z" stroke="#F59E0B" strokeWidth="1.5" />
          <path d="M4 5h8" stroke="#F59E0B" strokeWidth="1.2" />
          <path d="M8 4v8" stroke="#F59E0B" strokeWidth="1.5" />
          <path d="M6.3 7.5c0-.92.74-1.6 1.7-1.6h0.6" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ),
    },
  };

  const selected = iconShapes[type];
  return (
    <div style={{ ...iconRoot, background: selected.bg }}>
      {selected.svg}
    </div>
  );
}

function TrendBadge({ trend, trendUp, color }: { trend: string; trendUp: boolean | null; color: string }) {
  if (trend === 'Stable') {
    return (
      <span style={{
        fontFamily: 'Inter',
        fontWeight: 700,
        fontSize: '10px',
        lineHeight: '15px',
        color: '#2F80ED',
      }}>
        Stable
      </span>
    );
  }
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontFamily: 'Inter', fontSize: '14px', fontWeight: 700, color }}>
      {trendUp ? (
        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 4.2L3.5 1.3L5.2 2.8L8.5 0.2" stroke={color} strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8.5 0.2L8.5 0" stroke={color} strokeWidth="1.35" strokeLinecap="round" />
          <path d="M8.5 0.2L7.5 0.2" stroke={color} strokeWidth="1.35" strokeLinecap="round" />
        </svg>
      ) : (
        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 1.8L3.5 4.7L5.2 3.0L8.5 5.8" stroke={color} strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8.5 5.8L8.5 6" stroke={color} strokeWidth="1.35" strokeLinecap="round" />
          <path d="M8.5 5.8L7.5 5.8" stroke={color} strokeWidth="1.35" strokeLinecap="round" />
        </svg>
      )}
      {trend}
    </span>
  );
}

function TableDriverAvatar({ index }: { index: number }) {
  const shades = ['#7c9cbf', '#5a7a9c', '#4a6a8c'];
  return (
    <div style={{
      width: '32px', height: '32px', borderRadius: '50%', background: '#e2e8f0',
      display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
      overflow: 'hidden', flexShrink: 0,
    }}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="8" r="4" fill={shades[index] || '#5a7a9c'} />
        <path d="M3 22c0-4.971 4.029-9 9-9s9 4.029 9 9" fill={shades[index] || '#5a7a9c'} />
      </svg>
    </div>
  );
}

function CityMap() {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/blue_map.png"
      alt="City map"
      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
    />
  );
}

export default function DashboardContent() {
  return (
    <main style={{ flex: 1, padding: '20px 24px', overflowY: 'auto', background: '#F7F9FB' }}>

      {/* Stats row — fixed 960x160 cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 222px)',
        columnGap: '24px',
        rowGap: '24px',
        width: '960px',
        minHeight: '160px',
        margin: '0 auto 20px',
      }}>
        {stats.map((s) => (
          <div key={s.label} style={{
            width: '222px',
            height: '160px',
            background: '#FFFFFF',
            borderRadius: '12px',
            padding: '24px 18px 16px',
            border: '1px solid #E2E8F0',
            boxSizing: 'border-box',
          }}>
            <div style={{
              width: '174px',
              height: '36px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '12px',
            }}>
              <StatCardIcon type={s.iconType} />
              <TrendBadge trend={s.trend} trendUp={s.trendUp} color={s.trendColor} />
            </div>
            <div style={{ fontFamily: 'Inter', fontSize: '12px', fontWeight: 500, color: '#2F80ED', marginBottom: '4px' }}>
              {s.label}
            </div>
            <div style={{ fontFamily: 'Inter', fontSize: '26px', fontWeight: 700, color: '#0F172A', lineHeight: '1.2' }}>
              {s.value}
            </div>
          </div>
        ))}
      </div>

      {/* Two-column body */}
      <div style={{ display: 'flex', gap: '18px', alignItems: 'flex-start' }}>

        {/* LEFT: Map + Recent Jobs */}
        <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>

          {/* Map */}
          <div style={{
            borderRadius: '12px', border: '1px solid #E2E8F0',
            overflow: 'hidden', position: 'relative',
            width: '100%', aspectRatio: '122/77',
          }}>
            <CityMap />

            {/* Live Fleet card */}
            <div style={{
              position: 'absolute', top: '14px', left: '14px',
              background: 'rgba(255,255,255,0.96)', borderRadius: '10px',
              padding: '10px 14px', boxShadow: '0 2px 10px rgba(0,0,0,0.12)',
            }}>
              <div style={{ fontFamily: 'Inter', fontSize: '13px', fontWeight: 700, color: '#0F172A', marginBottom: '6px' }}>
                Live Fleet (32)
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '3px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#3B82F6', flexShrink: 0 }} />
                <span style={{ fontFamily: 'Inter', fontSize: '12px', color: '#374151' }}>24 In Motion</span>
              </div>
              <div style={{ paddingLeft: '14px' }}>
                <span style={{ fontFamily: 'Inter', fontSize: '12px', color: '#64748B' }}>8 Stationary</span>
              </div>
            </div>

            {/* Active drivers badge */}
            <div style={{
              position: 'absolute', bottom: '14px', right: '14px',
              background: 'rgba(255,255,255,0.96)', borderRadius: '999px',
              padding: '6px 14px 6px 8px',
              display: 'flex', alignItems: 'center', gap: '8px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.12)',
            }}>
              <div style={{ display: 'flex' }}>
                {['#DBEAFE', '#D1FAE5', '#FEE2E2'].map((bg, i) => (
                  <div key={i} style={{
                    width: '26px', height: '26px', borderRadius: '50%', background: bg,
                    border: '2px solid #fff', marginLeft: i > 0 ? '-8px' : '0',
                    display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
                    overflow: 'hidden', position: 'relative', zIndex: 3 - i,
                  }}>
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <circle cx="9" cy="6" r="3" fill="#64748B" />
                      <path d="M2 17c0-3.866 3.134-7 7-7s7 3.134 7 7" fill="#64748B" />
                    </svg>
                  </div>
                ))}
              </div>
              <span style={{ fontFamily: 'Inter', fontSize: '12px', fontWeight: 600, color: '#0F172A' }}>
                +12 Active Drivers
              </span>
            </div>
          </div>

          {/* Recent Jobs */}
          <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #E2E8F0', overflow: 'hidden' }}>
            {/* Header */}
            <div style={{
              padding: '18px 24px 14px',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
              <span style={{ fontFamily: 'Inter', fontSize: '16px', fontWeight: 700, color: '#0F172A' }}>
                Recent Jobs
              </span>
              <button suppressHydrationWarning style={{
                fontFamily: 'Inter', fontSize: '13px', color: '#2563EB', fontWeight: 500,
                background: 'none', border: 'none', cursor: 'pointer',
              }}>
                View All →
              </button>
            </div>

            {/* Table */}
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderTop: '1px solid #F1F5F9', borderBottom: '1px solid #F1F5F9' }}>
                  {['JOB ID', 'DRIVER', 'ROUTE', 'STATUS', 'EARNINGS'].map((h) => (
                    <th key={h} style={{
                      padding: '9px 24px', textAlign: 'left',
                      fontFamily: 'Inter', fontSize: '11px', fontWeight: 600,
                      color: '#94A3B8', letterSpacing: '0.5px',
                    }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {jobs.map((job, i) => (
                  <tr key={job.id} style={{ borderBottom: i < jobs.length - 1 ? '1px solid #F1F5F9' : 'none' }}>
                    <td style={{
                      padding: '16px 24px',
                      fontFamily: 'Inter', fontSize: '13px', fontWeight: 700,
                      color: '#0F172A', whiteSpace: 'nowrap',
                    }}>
                      {job.id}
                    </td>
                    <td style={{ padding: '16px 24px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <TableDriverAvatar index={i} />
                        <span style={{ fontFamily: 'Inter', fontSize: '13px', fontWeight: 500, color: '#0F172A' }}>
                          {job.driver}
                        </span>
                      </div>
                    </td>
                    <td style={{ padding: '16px 24px' }}>
                      <div style={{ fontFamily: 'Inter', fontSize: '13px', fontWeight: 600, color: '#0F172A' }}>
                        {job.route}
                      </div>
                      <div style={{ fontFamily: 'Inter', fontSize: '11px', color: '#94A3B8', marginTop: '2px' }}>
                        {job.routeSub}
                      </div>
                    </td>
                    <td style={{ padding: '16px 24px' }}>
                      <span style={{
                        display: 'inline-block', padding: '4px 12px',
                        borderRadius: '999px', background: job.statusBg,
                        fontFamily: 'Inter', fontSize: '11px', fontWeight: 700,
                        color: job.statusText, letterSpacing: '0.3px', whiteSpace: 'nowrap',
                      }}>
                        {job.status}
                      </span>
                    </td>
                    <td style={{
                      padding: '16px 24px',
                      fontFamily: 'Inter', fontSize: '13px', fontWeight: 600,
                      color: '#0F172A', whiteSpace: 'nowrap',
                    }}>
                      {job.earnings}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* RIGHT: Driver Status + Efficiency */}
        <div style={{ width: '272px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>

          {/* Driver Status */}
          <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #E2E8F0', padding: '16px 18px' }}>
            <div style={{ fontFamily: 'Inter', fontSize: '14px', fontWeight: 700, color: '#0F172A', marginBottom: '14px' }}>
              Driver Status
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {drivers.map((d) => (
                <div key={d.name} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ position: 'relative', flexShrink: 0, width: '48px', height: '48px', borderRadius: '12px', background: '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
                      <circle cx="12" cy="8" r="4" fill="#94A3B8" />
                      <path d="M4 22c0-4.418 3.582-8 8-8s8 3.582 8 8" fill="#94A3B8" />
                    </svg>
                    <div style={{
                      position: 'absolute', bottom: '2px', right: '2px',
                      width: '16px', height: '16px', borderRadius: '9999px',
                      background: d.dot, border: '2px solid #FFFFFF',
                    }} />
                  </div>
                  <div>
                    <div style={{ fontFamily: 'Inter', fontSize: '16px', fontWeight: 700, color: '#0F172A' }}>
                      {d.name}
                    </div>
                    <div style={{ fontFamily: 'Inter', fontSize: '13px', color: d.subColor }}>
                      {d.sub}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Efficiency Overview */}
          <div style={{
            background: 'linear-gradient(160deg, #EFF6FF 0%, #DBEAFE 100%)',
            borderRadius: '12px', border: '1px solid #BFDBFE', padding: '16px 18px',
          }}>
            <div style={{ fontFamily: 'Inter', fontSize: '13px', fontWeight: 700, color: '#1E40AF', marginBottom: '16px' }}>
              Efficiency Overview
            </div>
            {[{ label: 'ON TIME RATE', value: 98 }, { label: 'FUEL ECONOMY', value: 82 }].map((item, i) => (
              <div key={item.label} style={{ marginBottom: i === 0 ? '14px' : 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                  <span style={{ fontFamily: 'Inter', fontSize: '11px', fontWeight: 600, color: '#1E40AF', letterSpacing: '0.4px' }}>
                    {item.label}
                  </span>
                  <span style={{ fontFamily: 'Inter', fontSize: '11px', fontWeight: 700, color: '#1E40AF' }}>
                    {item.value}%
                  </span>
                </div>
                <div style={{ height: '6px', background: '#BFDBFE', borderRadius: '999px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${item.value}%`, background: '#1D4ED8', borderRadius: '999px' }} />
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </main>
  );
}
