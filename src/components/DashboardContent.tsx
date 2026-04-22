'use client';

const stats = [
  {
    label: 'TOTAL ORDERS\n(TODAY)',
    value: '1,284',
    trend: '+12.5%',
    trendUp: true,
    icon: 'orders' as const,
    sparkline: 'M0 26 C8 20, 18 28, 28 18 C38 8, 48 22, 60 14 C72 6, 82 16, 96 6',
  },
  {
    label: 'ACTIVE DELIVERIES',
    value: '432',
    trend: '+4.2%',
    trendUp: true,
    icon: 'deliveries' as const,
    sparkline: 'M0 22 C10 26, 22 16, 34 20 C46 24, 56 12, 68 16 C78 20, 86 8, 96 4',
  },
  {
    label: "TODAY'S REVENUE",
    value: '$42.8k',
    trend: '+18.7%',
    trendUp: true,
    icon: 'revenue' as const,
    sparkline: 'M0 24 C12 18, 22 26, 34 16 C46 6, 58 20, 70 12 C80 4, 88 10, 96 6',
  },
  {
    label: 'CANCELLED\nORDERS',
    value: '12',
    trend: '-2.1%',
    trendUp: false,
    icon: 'cancelled' as const,
    sparkline: 'M0 6 C10 10, 22 4, 34 12 C46 20, 56 14, 68 20 C80 26, 88 18, 96 24',
  },
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

function StatIcon({ type }: { type: 'orders' | 'deliveries' | 'revenue' | 'cancelled' }) {
  const icons = {
    orders: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="2" width="12" height="14" rx="2" stroke="#2563EB" strokeWidth="1.4" />
        <path d="M6 6h6M6 9h6M6 12h4" stroke="#2563EB" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
    deliveries: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="1" y="6" width="11" height="8" rx="1.5" stroke="#2563EB" strokeWidth="1.4" />
        <path d="M12 9h3l2 3v2h-5V9z" stroke="#2563EB" strokeWidth="1.4" strokeLinejoin="round" />
        <circle cx="4.5" cy="14.5" r="1.5" stroke="#2563EB" strokeWidth="1.2" />
        <circle cx="13.5" cy="14.5" r="1.5" stroke="#2563EB" strokeWidth="1.2" />
      </svg>
    ),
    revenue: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="9" cy="9" r="7" stroke="#2563EB" strokeWidth="1.4" />
        <path d="M9 5v8" stroke="#2563EB" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M7 7.5c0-.83.67-1.5 2-1.5h.5c1 0 1.5.5 1.5 1.2 0 .8-.7 1.3-2 1.8-1.4.5-2 1-2 1.8C7 11.6 7.7 12.5 9 12.5h.5c1.2 0 1.5-.5 1.5-1" stroke="#2563EB" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    ),
    cancelled: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="9" cy="9" r="7" stroke="#2563EB" strokeWidth="1.4" />
        <path d="M6.5 6.5l5 5M11.5 6.5l-5 5" stroke="#2563EB" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
  };
  return (
    <div style={{
      width: '36px',
      height: '36px',
      borderRadius: '10px',
      background: '#DBEAFE',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
    }}>
      {icons[type]}
    </div>
  );
}

function Sparkline({ path, up, id }: { path: string; up: boolean; id: string }) {
  const gradId = `sg-${id}`;
  const bgColor = up ? '#a6d2f3' : '#2f80ed';
  const lineColor = up ? '#2f80ed' : '#a6d2f3';
  const fillColor = up ? '#2f80ed' : '#a6d2f3';
  return (
    <div style={{
      width: '96px',
      height: '32px',
      borderRadius: '4px',
      background: bgColor,
      overflow: 'hidden',
      flexShrink: 0,
    }}>
      <svg width="96" height="32" viewBox="0 0 96 32" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={fillColor} stopOpacity="0.6" />
            <stop offset="100%" stopColor={fillColor} stopOpacity="0.05" />
          </linearGradient>
        </defs>
        <path d={`${path} L96 32 L0 32 Z`} fill={`url(#${gradId})`} />
        <path d={path} stroke={lineColor} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
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
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontFamily: 'Inter', fontSize: '12px', fontWeight: 700, color }}>
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

function AlertsPanel() {
  const secondaryAlerts = [
    {
      id: 'system-delay',
      label: 'System Delay',
      title: ['System Surge', 'Risk'],
      detail: ['North Sector •', '+15m delay'],
      resolved: false,
    },
    {
      id: 'resolved',
      label: 'Resolved',
      title: ['Bulk Payment', 'Issue'],
      detail: ['Stripe Webhook •', '12m ago'],
      resolved: true,
    },
  ] as const;

  return (
    <div style={{
      background: '#FFFFFF',
      border: '1px solid #E2E8F0',
      borderRadius: '12px',
      padding: '25px',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <svg width="22" height="19" viewBox="0 0 22 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11 1.8L20 17.2H2L11 1.8Z" stroke="#2F80ED" strokeWidth="2" strokeLinejoin="round" />
            <path d="M11 7.2V11.2" stroke="#2F80ED" strokeWidth="2" strokeLinecap="round" />
            <circle cx="11" cy="14" r="1" fill="#2F80ED" />
          </svg>
          <span style={{ fontFamily: 'Manrope, Inter, sans-serif', fontSize: '16px', fontWeight: 800, lineHeight: '24px', color: '#191C1E' }}>
            Alerts (4)
          </span>
        </div>
        <span style={{
          background: '#2F80ED',
          borderRadius: '9999px',
          padding: '2px 8px',
          fontFamily: 'Inter, sans-serif',
          fontSize: '10px',
          fontWeight: 700,
          lineHeight: '15px',
          color: '#FFFFFF',
          textTransform: 'uppercase',
        }}>
          Live
        </span>
      </div>

      <div style={{
        background: '#2F80ED',
        borderBottom: '4px solid rgba(0, 0, 0, 0.1)',
        borderRadius: '12px',
        padding: '16px 16px 20px',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '12px',
        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)',
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '8px',
          background: 'rgba(255,255,255,0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}>
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '18px', fontWeight: 800, color: '#FFFFFF', lineHeight: '1', letterSpacing: '0.5px' }}>
            SOS
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', fontWeight: 700, lineHeight: '16px', letterSpacing: '0.6px', color: '#FFFFFF', textTransform: 'uppercase' }}>
            <div>CRITICAL</div>
            <div>EMERGENCY</div>
          </div>
          <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: 500, lineHeight: '17.5px', color: '#FFFFFF' }}>
            <div>Driver #9244</div>
            <div>SOS Signal</div>
          </div>
          <div style={{ paddingTop: '2px', opacity: 0.7, fontFamily: 'Inter, sans-serif', fontSize: '10px', fontWeight: 700, lineHeight: '15px', color: '#FFFFFF' }}>
            <div>Downtown • 2m</div>
            <div>ago</div>
          </div>
        </div>
      </div>

      {secondaryAlerts.map((alert) => (
        <div key={alert.id} style={{
          background: 'rgba(166,210,243,0.2)',
          border: '1px solid #A6D2F3',
          borderRadius: '12px',
          padding: '17px',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '12px',
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '8px',
            background: '#A6D2F3',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="10" cy="10" r="8.5" stroke="#2F80ED" strokeWidth="2" />
              <path d="M10 5.5V10.2L13 13" stroke="#2F80ED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', fontWeight: 700, lineHeight: '16px', color: '#2F80ED' }}>
              {alert.label}
            </div>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', fontWeight: 600, lineHeight: '16px', color: '#2F80ED', textDecoration: alert.resolved ? 'line-through' : 'none' }}>
              <div>{alert.title[0]}</div>
              <div>{alert.title[1]}</div>
            </div>
            <div style={{ paddingTop: '4px', fontFamily: 'Inter, sans-serif', fontSize: '10px', fontWeight: alert.resolved ? 400 : 500, lineHeight: '15px', color: '#000000' }}>
              <div>{alert.detail[0]}</div>
              <div>{alert.detail[1]}</div>
            </div>
          </div>
        </div>
      ))}

      <div style={{ borderTop: '1px solid #A6D2F3', paddingTop: '25px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <button
          suppressHydrationWarning
          style={{
            width: '100%',
            border: 'none',
            borderRadius: '12px',
            background: '#2F80ED',
            padding: '12px 0',
            fontFamily: 'Inter, sans-serif',
            fontSize: '10px',
            fontWeight: 700,
            letterSpacing: '1px',
            textTransform: 'uppercase',
            color: '#FFFFFF',
            boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)',
            cursor: 'pointer',
          }}
        >
          OPEN INCIDENT CENTER
        </button>

        <div style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '10px',
          fontWeight: 500,
          lineHeight: '15px',
          letterSpacing: '-0.5px',
          textTransform: 'uppercase',
          color: '#000000',
          textAlign: 'center',
        }}>
          SECURE PROTOCOL V2.4 ENABLED
        </div>
      </div>
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
    <main style={{ flex: 1, padding: '32px 26px 20px', overflowY: 'auto', background: '#F7F9FB' }}>

      {/* Stats row */}
      <div style={{
        display: 'flex',
        gap: '16px',
        marginBottom: '20px',
        width: '945px',
        maxWidth: '100%',
      }}>
        {stats.map((s, i) => (
          <div key={s.label} style={{
            flex: '1',
            background: '#FFFFFF',
            borderRadius: '12px',
            padding: '24px',
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05), 0 2px 4px -2px rgb(0 0 0 / 0.05)',
            border: '1px solid #E2E8F0',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '168px',
            position: 'relative',
          }}>
            {/* Icon: absolute top-right */}
            <div style={{ position: 'absolute', top: '16px', right: '16px' }}>
              <StatIcon type={s.icon} />
            </div>

            {/* Top: label + value (left-aligned, icon does not affect layout) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', paddingRight: '52px' }}>
              <div style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '12px',
                fontWeight: 600,
                color: '#64748B',
                letterSpacing: '0.6px',
                lineHeight: '16px',
                textTransform: 'uppercase',
                whiteSpace: 'pre-line',
              }}>
                {s.label}
              </div>
              <div style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '30px',
                fontWeight: 800,
                color: '#191C1E',
                lineHeight: '36px',
              }}>
                {s.value}
              </div>
            </div>

            {/* Bottom: trend left, sparkline right */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <TrendBadge trend={s.trend} trendUp={s.trendUp} color="#2f80ed" />
              <Sparkline path={s.sparkline} up={s.trendUp} id={String(i)} />
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

        {/* RIGHT: Alerts Panel */}
        <div style={{ width: '272px', flexShrink: 0 }}>
          <AlertsPanel />
        </div>
      </div>
    </main>
  );
}
