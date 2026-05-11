'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';

type LogRow = {
  timestamp: string;
  time: string;
  initials: string;
  name: string;
  contact: string;
  type: string;
  status: 'DELIVERED' | 'COMPLETED' | 'FAILED' | 'PENDING';
  snippet: string;
};

const LOGS: LogRow[] = [
  { timestamp: 'Oct 24, 2023', time: '14:22:15.003', initials: 'JD', name: 'John Doe', contact: '+1 (555) 012-3456', type: 'Delay Alert', status: 'DELIVERED', snippet: '"Package #3921 is delayed by 45 mins due…' },
  { timestamp: 'Oct 24, 2023', time: '14:20:01.442', initials: 'AS', name: 'Alice Smith', contact: 'alice.s@company.com', type: 'New Order', status: 'COMPLETED', snippet: '"Order #ORD-8821 confirmed. Shipping lab…' },
  { timestamp: 'Oct 24, 2023', time: '14:15:33.210', initials: 'MB', name: 'Marcus Brown', contact: '+1 (555) 998-1122', type: 'Payment Failed', status: 'FAILED', snippet: '"Gateway error (502). Transaction for invoice…' },
  { timestamp: 'Oct 24, 2023', time: '14:12:00.891', initials: 'LL', name: 'Lana Lee', contact: 'lana.lee@logistics.net', type: 'ETA Update', status: 'PENDING', snippet: '"Shipment #551 is now 8 km from your location…' },
];

const STATUS_STYLES: Record<string, { bg: string; color: string }> = {
  DELIVERED: { bg: 'rgba(0,105,71,0.10)', color: '#006947' },
  COMPLETED: { bg: 'rgba(47,128,237,0.10)', color: '#2F80ED' },
  FAILED: { bg: 'rgba(186,26,26,0.10)', color: '#BA1A1A' },
  PENDING: { bg: 'rgba(166,210,243,0.4)', color: '#2F80ED' },
};

export default function NotificationLogsPage() {
  const router = useRouter();
  const [dateRange, setDateRange] = useState('Last 24 Hours');
  const [type, setType] = useState('All Types');
  const [status, setStatus] = useState('All Statuses');
  const [channel, setChannel] = useState<'All' | 'SMS' | 'Email'>('All');
  const [page, setPage] = useState(1);

  const cardBase: React.CSSProperties = {
    background: '#fff',
    borderRadius: '12px',
    boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
    border: '1px solid rgba(194,198,214,0.15)',
  };

  const selectStyle: React.CSSProperties = {
    background: '#A6D2F3',
    border: 'none',
    borderRadius: '8px',
    padding: '8px 32px 8px 12px',
    fontSize: '14px',
    color: '#2F80ED',
    fontWeight: 500,
    outline: 'none',
    cursor: 'pointer',
    appearance: 'none',
    WebkitAppearance: 'none',
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F7F9FB', fontFamily: 'Inter, sans-serif' }}>
      <Sidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowX: 'hidden' }}>
        <Navbar />
        <main style={{ flex: 1, overflowY: 'auto', padding: '32px 48px' }}>

          {/* Page header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '28px' }}>
            <div>
              <button
                onClick={() => router.push('/settings/notifications')}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8', fontSize: '12px', fontWeight: 700, letterSpacing: '1.2px', textTransform: 'uppercase', padding: 0, marginBottom: '6px', display: 'block' }}
              >
                ← Notifications
              </button>
              <h1 style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: '30px', color: '#2F80ED', margin: '0 0 4px 0' }}>Notification Logs</h1>
              <p style={{ color: '#424754', fontSize: '16px', margin: 0 }}>High-density audit trail for system-generated alerts</p>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button style={{ background: '#E6E8EA', border: 'none', borderRadius: '8px', padding: '8px 16px', fontSize: '12px', fontWeight: 700, color: '#2F80ED', cursor: 'pointer', letterSpacing: '0.6px', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>↓</span> Export CSV
              </button>
              <button style={{ background: '#E6E8EA', border: 'none', borderRadius: '8px', padding: '8px 16px', fontSize: '12px', fontWeight: 700, color: '#2F80ED', cursor: 'pointer', letterSpacing: '0.6px', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>↻</span> Sync Logs
              </button>
            </div>

          {/* Stats row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr) 1.4fr', gap: '24px', marginBottom: '24px' }}>
            {[
              { label: 'TOTAL SENT', value: '12,482' },
              { label: 'DELIVERED', value: '99.2%' },
              { label: 'FAILED', value: '104' },
            ].map((stat) => (
              <div key={stat.label} style={{ ...cardBase, padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '128px' }}>
                <div style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '1.2px', textTransform: 'uppercase', color: '#000' }}>{stat.label}</div>
                <div style={{ fontSize: '30px', fontWeight: 700, color: '#2F80ED' }}>{stat.value}</div>
              </div>
            ))}
            {/* Active Channels */}
            <div style={{ background: '#3B82F6', borderRadius: '24px', padding: '30px 34px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '220px', boxShadow: '0 18px 28px -8px rgba(15,23,42,0.22)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ fontSize: '18px', fontWeight: 700, letterSpacing: '2.2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.65)', marginBottom: '10px' }}>ACTIVE CHANNELS</div>
                  <div style={{ fontSize: '52px', lineHeight: '1.05', fontWeight: 700, color: '#fff', letterSpacing: '-0.8px' }}>SMS & Push Active</div>
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/icon-active-channels.png" alt="" style={{ width: '78px', height: '78px', objectFit: 'contain', opacity: 0.5, marginTop: '6px' }} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0', marginTop: '28px' }}>
                {[
                  <svg key="msg" width="48" height="48" viewBox="0 0 24 24" fill="none"><path d="M5 5h14v10H9l-4 4V5Z" stroke="white" strokeWidth="1.8" strokeLinejoin="round"/><circle cx="10" cy="10" r="1" fill="white"/><circle cx="13" cy="10" r="1" fill="white"/><circle cx="16" cy="10" r="1" fill="white"/></svg>,
                  <svg key="mail" width="48" height="48" viewBox="0 0 24 24" fill="none"><rect x="4" y="6" width="16" height="12" rx="1.7" stroke="white" strokeWidth="1.8"/><path d="M4.5 7L12 12.5L19.5 7" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>,
                  <svg key="bell" width="48" height="48" viewBox="0 0 24 24" fill="none"><path d="M18 16H6l1.3-1.8V10a4.7 4.7 0 1 1 9.4 0v4.2L18 16Z" stroke="white" strokeWidth="1.8" strokeLinejoin="round"/><path d="M10 18a2 2 0 0 0 4 0" stroke="white" strokeWidth="1.8" strokeLinecap="round"/><path d="M8 7.8c.2-.9.6-1.7 1.3-2.3M16 7.8c-.2-.9-.6-1.7-1.3-2.3" stroke="white" strokeWidth="1.8" strokeLinecap="round"/></svg>,
                ].map((icon, i) => (
                  <div key={i} style={{ width: '96px', height: '96px', marginLeft: i === 0 ? '0' : '-14px', borderRadius: '999px', background: 'radial-gradient(circle at 40% 35%, rgba(255,255,255,0.25), rgba(255,255,255,0.15))', border: '2px solid rgba(191,219,254,0.55)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxSizing: 'border-box' }}>
                    {icon}
                  </div>
                ))}
                <span style={{ fontSize: '45px', color: '#fff', marginLeft: '22px', letterSpacing: '-0.4px' }}>All protocols operational</span>
              </div>
            </div>
          </div>
          </div>

          {/* Filters + Table */}
          <div style={{ background: '#F2F4F6', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 1px 2px rgba(0,0,0,0.05)', marginBottom: '32px' }}>
            {/* Filters row */}
            <div style={{ background: '#fff', borderBottom: '1px solid #E6E8EA', padding: '20px 24px', display: 'flex', gap: '24px', alignItems: 'flex-end', flexWrap: 'wrap' }}>
              <div>
                <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.5px', textTransform: 'uppercase', color: '#000', marginBottom: '6px', paddingLeft: '4px' }}>DATE RANGE</div>
                <div style={{ position: 'relative' }}>
                  <select value={dateRange} onChange={e => setDateRange(e.target.value)} style={selectStyle}>
                    <option>Last 24 Hours</option>
                    <option>Last 7 Days</option>
                    <option>Last 30 Days</option>
                  </select>
                  <span style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#2F80ED', fontSize: '12px' }}>▾</span>
                </div>
              </div>
              <div>
                <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.5px', textTransform: 'uppercase', color: '#000', marginBottom: '6px', paddingLeft: '4px' }}>TYPE</div>
                <div style={{ position: 'relative' }}>
                  <select value={type} onChange={e => setType(e.target.value)} style={selectStyle}>
                    <option>All Types</option>
                    <option>Delay Alert</option>
                    <option>New Order</option>
                    <option>ETA Update</option>
                    <option>Payment Failed</option>
                  </select>
                  <span style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#2F80ED', fontSize: '12px' }}>▾</span>
                </div>
              </div>
              <div>
                <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.5px', textTransform: 'uppercase', color: '#000', marginBottom: '6px', paddingLeft: '4px' }}>STATUS</div>
                <div style={{ position: 'relative' }}>
                  <select value={status} onChange={e => setStatus(e.target.value)} style={selectStyle}>
                    <option>All Statuses</option>
                    <option>Delivered</option>
                    <option>Failed</option>
                    <option>Pending</option>
                  </select>
                  <span style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#2F80ED', fontSize: '12px' }}>▾</span>
                </div>
              </div>
              <div>
                <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.5px', textTransform: 'uppercase', color: '#000', marginBottom: '6px', paddingLeft: '4px' }}>CHANNEL</div>
                <div style={{ background: '#A6D2F3', borderRadius: '8px', padding: '4px', display: 'flex', gap: '2px' }}>
                  {(['All', 'SMS', 'Email'] as const).map((ch) => (
                    <button key={ch} onClick={() => setChannel(ch)} style={{ background: channel === ch ? '#fff' : 'transparent', border: 'none', borderRadius: '6px', padding: '4px 12px', fontSize: '12px', fontWeight: channel === ch ? 700 : 500, color: channel === ch ? '#2F80ED' : '#64748B', cursor: 'pointer', boxShadow: channel === ch ? '0 1px 1px rgba(0,0,0,0.05)' : 'none' }}>
                      {ch}
                    </button>
                  ))}
                </div>
              </div>
              <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#2F80ED', fontSize: '12px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px', marginLeft: 'auto', padding: '8px 12px' }}>
                ✕ Clear Filters
              </button>
            </div>

            {/* Table */}
            <div style={{ background: '#fff', overflow: 'hidden' }}>
              {/* Header */}
              <div style={{ display: 'grid', gridTemplateColumns: '136px 220px 154px 128px 1fr 93px', background: 'rgba(242,244,246,0.5)', borderBottom: '1px solid #E6E8EA' }}>
                {['TIMESTAMP', 'RECIPIENT', 'TYPE', 'STATUS', 'MESSAGE SNIPPET', 'ACTION'].map((h, i) => (
                  <div key={h} style={{ padding: '16px 24px', fontSize: '10px', fontWeight: 700, letterSpacing: '1px', color: '#2F80ED', textTransform: 'uppercase', textAlign: i === 5 ? 'center' : 'left' }}>{h}</div>
                ))}
              </div>

              {/* Rows */}
              {LOGS.map((log, i) => {
                const st = STATUS_STYLES[log.status];
                return (
                  <div key={i} style={{ display: 'grid', gridTemplateColumns: '136px 220px 154px 128px 1fr 93px', alignItems: 'center', borderBottom: i < LOGS.length - 1 ? '1px solid #F2F4F6' : 'none', background: i % 2 === 1 ? 'rgba(242,244,246,0.2)' : '#fff', minHeight: '85px' }}>
                    {/* Timestamp */}
                    <div style={{ padding: '20px 24px' }}>
                      <div style={{ fontSize: '14px', fontWeight: 600, color: '#2F80ED', lineHeight: '20px' }}>{log.timestamp}</div>
                      <div style={{ fontSize: '12px', color: '#000', lineHeight: '16px' }}>{log.time}</div>
                    </div>
                    {/* Recipient */}
                    <div style={{ padding: '20px 24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#A6D2F3', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 700, color: '#2F80ED', flexShrink: 0 }}>{log.initials}</div>
                      <div>
                        <div style={{ fontSize: '14px', fontWeight: 600, color: '#2F80ED' }}>{log.name}</div>
                        <div style={{ fontSize: '12px', color: '#64748B' }}>{log.contact}</div>
                      </div>
                    </div>
                    {/* Type */}
                    <div style={{ padding: '20px 24px', fontSize: '14px', fontWeight: 500, color: '#2F80ED', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '12px' }}>◎</span>
                      {log.type}
                    </div>
                    {/* Status */}
                    <div style={{ padding: '20px 24px' }}>
                      <span style={{ background: st.bg, color: st.color, fontSize: '10px', fontWeight: 700, letterSpacing: '-0.25px', textTransform: 'uppercase', padding: '2px 10px', borderRadius: '999px' }}>
                        {log.status}
                      </span>
                    </div>
                    {/* Snippet */}
                    <div style={{ padding: '20px 24px', fontSize: '14px', fontStyle: 'italic', color: '#475569', lineHeight: '22px', overflow: 'hidden' }}>{log.snippet}</div>
                    {/* Action */}
                    <div style={{ padding: '20px 24px', display: 'flex', justifyContent: 'center' }}>
                      <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8', fontSize: '18px', padding: '4px' }}>👁</button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagination */}
            <div style={{ background: '#fff', borderTop: '1px solid #E6E8EA', padding: '17px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '12px', fontWeight: 500, color: '#64748B' }}>Showing 1 to 4 of 12,482 logs</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8', padding: '8px', opacity: 0.3 }}>‹</button>
                {[1, 2, 3].map((n) => (
                  <button key={n} onClick={() => setPage(n)} style={{ width: '32px', height: '32px', borderRadius: '8px', border: 'none', background: page === n ? '#2F80ED' : 'transparent', color: page === n ? '#fff' : '#2F80ED', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}>
                    {n}
                  </button>
                ))}
                <span style={{ color: '#B7DAF5', fontSize: '16px', padding: '0 8px' }}>...</span>
                <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#2F80ED', fontSize: '12px', fontWeight: 700, padding: '8px' }}>3,121</button>
                <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#2F80ED', padding: '8px', fontSize: '14px' }}>›</button>
              </div>
            </div>
          </div>

          {/* Bottom row: Channel Health + Automated Report */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '32px' }}>
            {/* Channel Health */}
            <div style={{ ...cardBase, padding: '32px', position: 'relative', overflow: 'hidden' }}>
              <h3 style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: '18px', color: '#2F80ED', margin: '0 0 24px 0' }}>Channel Health</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[
                  { name: 'SMS Gateway', stat: '12ms Latency' },
                  { name: 'Email SMTP', stat: '99.9% Uptime' },
                  { name: 'Push Engine', stat: 'Active' },
                ].map((ch) => (
                  <div key={ch.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#2F80ED', flexShrink: 0 }} />
                      <span style={{ fontSize: '14px', fontWeight: 600, color: '#2F80ED' }}>{ch.name}</span>
                    </div>
                    <span style={{ fontSize: '12px', fontWeight: 700, color: '#B7DAF5' }}>{ch.stat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Automated Report */}
            <div style={{ ...cardBase, padding: '32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '32px' }}>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: '18px', color: '#2F80ED', margin: '0 0 10px 0' }}>Automated Report</h3>
                <p style={{ fontSize: '14px', color: '#424754', lineHeight: '22.75px', margin: '0 0 20px 0' }}>
                  Weekly insights for notification delivery across all drivers and regional managers. System suggests optimizing SMS alerts for the Northeast corridor.
                </p>
                <button style={{ background: '#2F80ED', color: '#fff', border: 'none', borderRadius: '8px', padding: '10px 20px', fontSize: '12px', fontWeight: 700, letterSpacing: '1.2px', textTransform: 'uppercase', cursor: 'pointer', boxShadow: '0 10px 15px -3px rgba(0,88,190,0.2)' }}>
                  GENERATE INSIGHTS
                </button>
              </div>
              {/* Donut chart */}
              <div style={{ background: 'rgba(166,210,243,0.2)', border: '1px solid #A6D2F3', borderRadius: '12px', padding: '17px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
                <div style={{ position: 'relative', width: '80px', height: '80px' }}>
                  <svg width="80" height="80" viewBox="0 0 80 80">
                    <circle cx="40" cy="40" r="32" fill="none" stroke="#E2E8F0" strokeWidth="8" />
                    <circle cx="40" cy="40" r="32" fill="none" stroke="#2F80ED" strokeWidth="8" strokeDasharray={`${2 * Math.PI * 32 * 0.8} ${2 * Math.PI * 32 * 0.2}`} strokeDashoffset={2 * Math.PI * 32 * 0.25} strokeLinecap="round" />
                  </svg>
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 700, color: '#2F80ED' }}>80%</div>
                </div>
                <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '1px', color: '#B7DAF5', textTransform: 'uppercase' }}>OPTIMIZATION</span>
              </div>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}


