'use client';

const stats = [
  { label: 'Active Jobs', value: '142', trend: '+12%', trendUp: true, trendColor: '#10B981' },
  { label: 'Available Drivers', value: '28', trend: 'Stable', trendUp: null, trendColor: '#0058BE' },
  { label: 'Fleet Utilization', value: '94.2%', trend: '-2%', trendUp: false, trendColor: '#EF4444' },
  { label: "Today's Revenue", value: '$14.2k', trend: '+8%', trendUp: true, trendColor: '#10B981' },
];

const drivers = [
  { name: 'Jordan P.', sub: 'In Route • Truck #042', dot: '#10B981', avatarBg: '#DBEAFE', light: true },
  { name: 'Sarah L.', sub: 'Available • Truck #011', dot: '#10B981', avatarBg: '#1e293b', light: false },
  { name: 'Kevin H.', sub: 'Offline • Last seen 2h ago', dot: '#94A3B8', avatarBg: '#334155', light: false },
  { name: 'Emily R.', sub: 'In Route • Truck #088', dot: '#10B981', avatarBg: '#e2e8f0', light: true },
  { name: 'Robert T.', sub: 'Offline • Last seen 14m ago', dot: '#94A3B8', avatarBg: '#1e3a5f', light: false },
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

function StatCardIcon({ index }: { index: number }) {
  const icons = [
    <svg key={0} width="20" height="20" viewBox="0 0 20 20" fill="none">
      <rect x="4" y="2" width="12" height="15" rx="2" stroke="#3B82F6" strokeWidth="1.5" />
      <path d="M7 7h6M7 10h6M7 13h4" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" />
    </svg>,
    <svg key={1} width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="7" r="3" stroke="#3B82F6" strokeWidth="1.5" />
      <path d="M4 17c0-3.314 2.686-6 6-6s6 2.686 6 6" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" />
    </svg>,
    <svg key={2} width="20" height="20" viewBox="0 0 20 20" fill="none">
      <rect x="2" y="3" width="16" height="12" rx="2" stroke="#3B82F6" strokeWidth="1.5" />
      <path d="M2 17h16" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M6 13V9M10 13V7M14 13V10" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" />
    </svg>,
    <svg key={3} width="20" height="20" viewBox="0 0 20 20" fill="none">
      <rect x="2" y="4" width="16" height="11" rx="2" stroke="#3B82F6" strokeWidth="1.5" />
      <path d="M10 7v6M8 8.5c0-.828.672-1.5 1.5-1.5h1a1.5 1.5 0 0 1 0 3h-1a1.5 1.5 0 0 0 0 3h1c.828 0 1.5-.672 1.5-1.5" stroke="#3B82F6" strokeWidth="1.2" strokeLinecap="round" />
    </svg>,
  ];
  return (
    <div style={{
      width: '38px', height: '38px', borderRadius: '10px',
      background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
    }}>
      {icons[index]}
    </div>
  );
}

function TrendBadge({ trend, trendUp, color }: { trend: string; trendUp: boolean | null; color: string }) {
  if (trend === 'Stable') {
    return (
      <span style={{
        padding: '2px 10px', borderRadius: '999px',
        background: 'rgba(0,88,190,0.08)',
        fontFamily: 'Inter', fontSize: '11px', fontWeight: 600, color: '#0058BE',
      }}>Stable</span>
    );
  }
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '2px', fontFamily: 'Inter', fontSize: '12px', fontWeight: 600, color }}>
      {trendUp ? (
        <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
          <path d="M1.5 8.5L5.5 2.5L9.5 8.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ) : (
        <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
          <path d="M1.5 2.5L5.5 8.5L9.5 2.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
      {trend}
    </span>
  );
}

function DriverAvatar({ bg, light }: { bg: string; light: boolean }) {
  const personColor = light ? '#94a3b8' : 'rgba(255,255,255,0.75)';
  return (
    <div style={{
      width: '38px', height: '38px', borderRadius: '50%', background: bg,
      display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
      overflow: 'hidden', flexShrink: 0,
    }}>
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="10" r="5" fill={personColor} />
        <path d="M4 26c0-5.523 4.477-10 10-10s10 4.477 10 10" fill={personColor} />
      </svg>
    </div>
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

      {/* Stats row — full width */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px', marginBottom: '20px' }}>
        {stats.map((s, i) => (
          <div key={s.label} style={{
            background: '#fff', borderRadius: '12px', padding: '16px 18px', border: '1px solid #E2E8F0',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
              <StatCardIcon index={i} />
              <TrendBadge trend={s.trend} trendUp={s.trendUp} color={s.trendColor} />
            </div>
            <div style={{ fontFamily: 'Inter', fontSize: '12px', fontWeight: 500, color: '#64748B', marginBottom: '4px' }}>
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
                  <div style={{ position: 'relative', flexShrink: 0 }}>
                    <DriverAvatar bg={d.avatarBg} light={d.light} />
                    <div style={{
                      position: 'absolute', bottom: '1px', right: '1px',
                      width: '9px', height: '9px', borderRadius: '50%',
                      background: d.dot, border: '1.5px solid #fff',
                    }} />
                  </div>
                  <div>
                    <div style={{ fontFamily: 'Inter', fontSize: '13px', fontWeight: 600, color: '#0F172A' }}>
                      {d.name}
                    </div>
                    <div style={{ fontFamily: 'Inter', fontSize: '11px', color: '#64748B' }}>
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
