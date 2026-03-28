'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

/* ── Sidebar nav ─────────────────────────────────────────────── */
const settingsNav = [
  { label: 'Fleet Settings',   href: '/settings/fleet-settings',
    icon: (<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="0.5" y="3.5" width="9" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.3"/><path d="M9.5 5.5h3l2 3.5H9.5V5.5Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/><circle cx="3.5" cy="12.5" r="1.3" fill="currentColor"/><circle cx="10.5" cy="12.5" r="1.3" fill="currentColor"/></svg>) },
  { label: 'Notifications',    href: '/settings/notifications',
    icon: (<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M13 6.5A5 5 0 0 0 3 6.5c0 5-2 6.5-2 6.5h14s-2-1.5-2-6.5M9.2 14a1.5 1.5 0 0 1-2.4 0" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>) },
  { label: 'User Management',  href: '/settings/user-management',
    icon: (<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="5.5" cy="4.5" r="2.5" stroke="currentColor" strokeWidth="1.3"/><path d="M1 13.5c0-2.485 2.015-4.5 4.5-4.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/><path d="M11 9.5v5M8.5 12h5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>) },
  { label: 'Billing & API',    href: '/settings/billing-api',
    icon: (<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="0.75" y="2.75" width="14.5" height="10.5" rx="1.5" stroke="currentColor" strokeWidth="1.3"/><path d="M0.75 6.5h14.5" stroke="currentColor" strokeWidth="1.3"/></svg>) },
  { label: 'Appearance',       href: '/settings/appearance',
    icon: (<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.3"/><circle cx="5.5" cy="6" r="1" fill="currentColor"/><circle cx="10.5" cy="6" r="1" fill="currentColor"/><path d="M5 10.5s1 2 3 2 3-2 3-2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>) },
];

/* ── Sidebar ─────────────────────────────────────────────────── */
function SettingsSidebar() {
  const router = useRouter();
  return (
    <aside style={{ width: '200px', flexShrink: 0, height: '100vh', background: '#fff', borderRight: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '18px 16px 16px', display: 'flex', alignItems: 'center', gap: '10px', borderBottom: '1px solid #F1F5F9' }}>
        <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#2563EB', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <svg width="20" height="16" viewBox="0 0 20 16" fill="none">
            <rect x="0.5" y="3" width="12" height="9" rx="1.5" stroke="white" strokeWidth="1.5"/>
            <path d="M12.5 5.5h4l2.5 4H12.5V5.5Z" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
            <circle cx="4" cy="13.5" r="1.5" fill="white"/>
            <circle cx="13" cy="13.5" r="1.5" fill="white"/>
          </svg>
        </div>
        <div>
          <div style={{ fontFamily: 'Inter', fontSize: '13px', fontWeight: 700, color: '#0F172A', lineHeight: '16px' }}>Command Center</div>
          <div style={{ fontFamily: 'Inter', fontSize: '9px', fontWeight: 600, color: '#94A3B8', letterSpacing: '0.6px' }}>Logistics Admin</div>
        </div>
      </div>

      <nav style={{ flex: 1, padding: '10px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
        {settingsNav.map((item) => {
          const isActive = item.label === 'Notifications';
          return (
            <button key={item.label} suppressHydrationWarning onClick={() => router.push(item.href)}
              style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '9px 10px', width: '100%', textAlign: 'left', background: isActive ? '#EFF6FF' : 'transparent', border: 'none', borderLeft: isActive ? '3px solid #2563EB' : '3px solid transparent', borderRadius: isActive ? '0 7px 7px 0' : '7px', cursor: 'pointer' }}>
              <span style={{ display: 'flex', flexShrink: 0, color: isActive ? '#2563EB' : '#64748B' }}>{item.icon}</span>
              <span style={{ fontFamily: 'Inter', fontSize: '13px', fontWeight: isActive ? 600 : 400, color: isActive ? '#2563EB' : '#374151' }}>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div style={{ padding: '10px 10px 0', borderTop: '1px solid #F1F5F9', display: 'flex', flexDirection: 'column', gap: '2px' }}>
        <button suppressHydrationWarning style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 10px', width: '100%', background: 'transparent', border: 'none', borderRadius: '7px', cursor: 'pointer' }}>
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><rect x="1" y="1.5" width="13" height="12" rx="2" stroke="#64748B" strokeWidth="1.3"/><path d="M1 5.5h13" stroke="#64748B" strokeWidth="1.3"/><path d="M4.5 9.5h6M4.5 11.5h4" stroke="#64748B" strokeWidth="1.3" strokeLinecap="round"/></svg>
          <span style={{ fontFamily: 'Inter', fontSize: '13px', color: '#374151' }}>System Status</span>
        </button>
        <button suppressHydrationWarning style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 10px', width: '100%', background: 'transparent', border: 'none', borderRadius: '7px', cursor: 'pointer' }}>
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M6 13H3a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h3" stroke="#64748B" strokeWidth="1.3" strokeLinecap="round"/><path d="M10 11l3-3.5L10 4M13 7.5H6" stroke="#64748B" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
          <span style={{ fontFamily: 'Inter', fontSize: '13px', color: '#374151' }}>Logout</span>
        </button>
      </div>
      <div style={{ padding: '10px 10px 18px' }}>
        <button suppressHydrationWarning style={{ width: '100%', height: '36px', borderRadius: '8px', background: '#2563EB', border: 'none', cursor: 'pointer', fontFamily: 'Inter', fontSize: '12px', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><circle cx="6.5" cy="6.5" r="5.5" stroke="white" strokeWidth="1.3"/><path d="M6.5 10V9M6.5 4a1.5 1.5 0 1 1 0 3" stroke="white" strokeWidth="1.3" strokeLinecap="round"/></svg>
          Support Portal
        </button>
      </div>
    </aside>
  );
}

/* ── Toggle switch ───────────────────────────────────────────── */
function Toggle({ on, onChange }: { on: boolean; onChange: (v: boolean) => void }) {
  return (
    <button suppressHydrationWarning onClick={() => onChange(!on)}
      style={{ width: '40px', height: '22px', borderRadius: '11px', background: on ? '#2563EB' : '#CBD5E1', border: 'none', cursor: 'pointer', position: 'relative', padding: 0, flexShrink: 0, transition: 'background 0.15s' }}>
      <div style={{ position: 'absolute', top: '3px', left: on ? '21px' : '3px', width: '16px', height: '16px', borderRadius: '50%', background: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,0.2)', transition: 'left 0.15s' }} />
    </button>
  );
}

/* ── Alert row icon ──────────────────────────────────────────── */
function AlertIcon({ type }: { type: 'delay' | 'order' | 'offline' | 'fuel' }) {
  const paths: Record<string, React.ReactNode> = {
    delay:   <><path d="M8 2L14.5 13H1.5L8 2Z" stroke="#2563EB" strokeWidth="1.4" strokeLinejoin="round"/><path d="M8 6v3M8 11v.5" stroke="#2563EB" strokeWidth="1.4" strokeLinecap="round"/></>,
    order:   <><rect x="2" y="3" width="12" height="10" rx="1.5" stroke="#2563EB" strokeWidth="1.4"/><path d="M5 7h6M5 9.5h4" stroke="#2563EB" strokeWidth="1.4" strokeLinecap="round"/></>,
    offline: <><circle cx="8" cy="6" r="3" stroke="#2563EB" strokeWidth="1.4"/><path d="M3 14c0-2.761 2.239-5 5-5s5 2.239 5 5" stroke="#2563EB" strokeWidth="1.4" strokeLinecap="round"/><path d="M5 3L11 13M11 3L5 13" stroke="#2563EB" strokeWidth="1.2" strokeLinecap="round"/></>,
    fuel:    <><path d="M4 13V4a1 1 0 0 1 1-1h5l2 2v8a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1Z" stroke="#2563EB" strokeWidth="1.4"/><path d="M6 7h4M7 10h2" stroke="#2563EB" strokeWidth="1.4" strokeLinecap="round"/></>,
  };
  return (
    <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">{paths[type]}</svg>
    </div>
  );
}

/* ── Alert data ──────────────────────────────────────────────── */
type AlertRow = { type: 'delay'|'order'|'offline'|'fuel'; label: string; sub: string; sms: boolean; push: boolean; email: boolean };

/* ── Recipient group ─────────────────────────────────────────── */
function GroupIcon({ type }: { type: 'admin'|'dispatch'|'driver' }) {
  const c: Record<string, React.ReactNode> = {
    admin:    <><circle cx="8" cy="5.5" r="2.5" stroke="#2563EB" strokeWidth="1.4"/><path d="M3 13c0-2.485 2.015-4.5 5-4.5s5 2.015 5 4.5" stroke="#2563EB" strokeWidth="1.4" strokeLinecap="round"/><path d="M12 3v3M10.5 4.5h3" stroke="#2563EB" strokeWidth="1.3" strokeLinecap="round"/></>,
    dispatch: <><rect x="1.5" y="4" width="10" height="7" rx="1.5" stroke="#2563EB" strokeWidth="1.4"/><path d="M11.5 6.5h2l2 3h-4V6.5Z" stroke="#2563EB" strokeWidth="1.3" strokeLinejoin="round"/><circle cx="4.5" cy="12" r="1.3" fill="#2563EB"/><circle cx="11" cy="12" r="1.3" fill="#2563EB"/></>,
    driver:   <><path d="M8 1C5.239 1 3 3.239 3 6c0 4 5 9 5 9s5-5 5-9c0-2.761-2.239-5-5-5Z" stroke="#2563EB" strokeWidth="1.4"/><circle cx="8" cy="6" r="2" fill="#2563EB"/></>,
  };
  return (
    <div style={{ width: '38px', height: '38px', borderRadius: '9px', background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">{c[type]}</svg>
    </div>
  );
}

/* ── Page ────────────────────────────────────────────────────── */
export default function NotificationsPage() {
  const [alerts, setAlerts] = useState<AlertRow[]>([
    { type: 'delay',   label: 'Critical Delays',    sub: 'Shipment is >2 hours behind schedule',    sms: true,  push: true,  email: false },
    { type: 'order',   label: 'New Orders',          sub: 'When a client places a new delivery request', sms: false, push: true,  email: true  },
    { type: 'offline', label: 'Driver Offline',      sub: 'Sudden disconnect during active duty',   sms: true,  push: true,  email: false },
    { type: 'fuel',    label: 'Low Fuel Warnings',   sub: 'Telematics detect <15% fuel levels',     sms: false, push: true,  email: false },
  ]);

  const toggle = (idx: number, ch: 'sms'|'push'|'email') => {
    setAlerts((prev) => prev.map((a, i) => i === idx ? { ...a, [ch]: !a[ch] } : a));
  };

  const auditItems = [
    { icon: 'edit',    text: 'Alex M. updated critical alerts',        time: '2 hours ago' },
    { icon: 'plus',    text: 'New Dispatcher Group created',           time: 'Yesterday, 4:32 PM' },
    { icon: 'warning', text: 'System suppressed 12 duplicate alerts',  time: '2 days ago' },
  ];

  const groups = [
    { type: 'admin'    as const, label: 'Admins',       badge: 'ACTIVE',     badgeBg: '#D1FAE5', badgeColor: '#065F46', sub: '12 Members • Global Access' },
    { type: 'dispatch' as const, label: 'Dispatchers',  badge: 'ACTIVE',     badgeBg: '#D1FAE5', badgeColor: '#065F46', sub: '45 Members • Regional' },
    { type: 'driver'   as const, label: 'Drivers',      badge: 'RESTRICTED', badgeBg: '#FEF3C7', badgeColor: '#92400E', sub: '850 Members • Mobile Only' },
  ];

  return (
    <div style={{ display: 'flex', width: '100vw', height: '100vh', background: '#F8FAFC', fontFamily: 'Inter, sans-serif', overflow: 'hidden' }}>
      <SettingsSidebar />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

        {/* Top bar */}
        <header style={{ height: '54px', flexShrink: 0, background: '#fff', borderBottom: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 28px', boxSizing: 'border-box' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'Inter', fontSize: '13px' }}>
            <span style={{ color: '#94A3B8', fontWeight: 500 }}>Platform Settings</span>
            <span style={{ color: '#CBD5E1' }}>/</span>
            <span style={{ color: '#2563EB', fontWeight: 700 }}>Notifications</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', height: '34px', padding: '0 12px', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px', width: '200px' }}>
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><circle cx="5.5" cy="5.5" r="4" stroke="#94A3B8" strokeWidth="1.3"/><path d="M9 9l2.5 2.5" stroke="#94A3B8" strokeWidth="1.3" strokeLinecap="round"/></svg>
              <span style={{ fontFamily: 'Inter', fontSize: '12px', color: '#CBD5E1' }}>Search settings...</span>
            </div>
            <button suppressHydrationWarning style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#F1F5F9', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6" stroke="#64748B" strokeWidth="1.3"/><path d="M7 10V9M7 5a1.5 1.5 0 1 1 0 3" stroke="#64748B" strokeWidth="1.3" strokeLinecap="round"/></svg>
            </button>
            <button suppressHydrationWarning style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#F1F5F9', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="2" stroke="#64748B" strokeWidth="1.3"/><path d="M7 1v1.5M7 11.5V13M1 7h1.5M11.5 7H13" stroke="#64748B" strokeWidth="1.3" strokeLinecap="round"/></svg>
            </button>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#FCD34D', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', overflow: 'hidden', flexShrink: 0 }}>
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><circle cx="11" cy="8" r="4" fill="#92400E"/><path d="M2 20c0-4.418 4.029-8 9-8s9 3.582 9 8" fill="#92400E"/></svg>
            </div>
          </div>
        </header>

        {/* Content */}
        <main style={{ flex: 1, padding: '26px 28px 0', overflowY: 'auto', boxSizing: 'border-box', display: 'flex', flexDirection: 'column' }}>

          {/* Page title */}
          <h1 style={{ margin: '0 0 4px', fontFamily: 'Inter', fontSize: '24px', fontWeight: 800, color: '#0F172A' }}>Notification Strategy</h1>
          <p style={{ margin: '0 0 22px', fontFamily: 'Inter', fontSize: '13px', color: '#64748B', lineHeight: '1.6', maxWidth: '520px' }}>
            Configure how the system communicates critical fleet events across your team. Use recipient groups to target alerts to specific roles.
          </p>

          {/* Two-column layout */}
          <div style={{ display: 'flex', gap: '16px', flex: 1, minHeight: 0 }}>

            {/* LEFT */}
            <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '14px', paddingBottom: '80px' }}>

              {/* Active Alerts */}
              <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #E2E8F0', padding: '20px 22px' }}>
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ fontFamily: 'Inter', fontSize: '15px', fontWeight: 700, color: '#0F172A', marginBottom: '2px' }}>Active Alerts</div>
                  <div style={{ fontFamily: 'Inter', fontSize: '12px', color: '#64748B' }}>Manage delivery status and logistics warnings.</div>
                </div>

                {/* Column headers */}
                <div style={{ display: 'flex', alignItems: 'center', paddingBottom: '10px', borderBottom: '1px solid #F1F5F9', marginBottom: '4px' }}>
                  <div style={{ flex: 1 }} />
                  {['SMS', 'PUSH', 'EMAIL'].map((h) => (
                    <div key={h} style={{ width: '60px', textAlign: 'center' }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '3px 8px', borderRadius: '5px', background: '#EFF6FF', border: '1px solid #BFDBFE', fontFamily: 'Inter', fontSize: '10px', fontWeight: 700, color: '#2563EB' }}>
                        {h === 'SMS'   && <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><rect x="1" y="1.5" width="8" height="7" rx="1.5" stroke="#2563EB" strokeWidth="1.1"/><path d="M3 4.5h4M3 6h2" stroke="#2563EB" strokeWidth="1.1" strokeLinecap="round"/></svg>}
                        {h === 'PUSH'  && <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M8.5 4.5A3.5 3.5 0 0 0 1.5 4.5c0 3.5-1 4.5-1 4.5h9s-1-1-1-4.5M5.9 9a1 1 0 0 1-1.8 0" stroke="#2563EB" strokeWidth="1.1" strokeLinecap="round"/></svg>}
                        {h === 'EMAIL' && <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><rect x="1" y="2" width="8" height="6" rx="1.2" stroke="#2563EB" strokeWidth="1.1"/><path d="M1 3l4 3 4-3" stroke="#2563EB" strokeWidth="1.1" strokeLinecap="round"/></svg>}
                        {h}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Alert rows */}
                {alerts.map((alert, idx) => (
                  <div key={alert.label} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 0', borderBottom: idx < alerts.length - 1 ? '1px solid #F1F5F9' : 'none' }}>
                    <AlertIcon type={alert.type} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontFamily: 'Inter', fontSize: '13px', fontWeight: 700, color: '#0F172A', marginBottom: '2px' }}>{alert.label}</div>
                      <div style={{ fontFamily: 'Inter', fontSize: '11px', color: '#64748B' }}>{alert.sub}</div>
                    </div>
                    <div style={{ width: '60px', display: 'flex', justifyContent: 'center' }}>
                      <Toggle on={alert.sms}   onChange={() => toggle(idx, 'sms')} />
                    </div>
                    <div style={{ width: '60px', display: 'flex', justifyContent: 'center' }}>
                      <Toggle on={alert.push}  onChange={() => toggle(idx, 'push')} />
                    </div>
                    <div style={{ width: '60px', display: 'flex', justifyContent: 'center' }}>
                      <Toggle on={alert.email} onChange={() => toggle(idx, 'email')} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Recipient Groups */}
              <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #E2E8F0', padding: '20px 22px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <span style={{ fontFamily: 'Inter', fontSize: '15px', fontWeight: 700, color: '#0F172A' }}>Recipient Groups</span>
                  <button suppressHydrationWarning style={{ display: 'flex', alignItems: 'center', gap: '5px', fontFamily: 'Inter', fontSize: '12px', fontWeight: 600, color: '#2563EB', background: 'none', border: 'none', cursor: 'pointer' }}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6" stroke="#2563EB" strokeWidth="1.3"/><path d="M7 4v6M4 7h6" stroke="#2563EB" strokeWidth="1.3" strokeLinecap="round"/></svg>
                    New Group
                  </button>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                  {groups.map((g) => (
                    <div key={g.label} style={{ background: '#F8FAFC', borderRadius: '10px', border: '1px solid #E2E8F0', padding: '14px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                        <GroupIcon type={g.type} />
                        <span style={{ display: 'inline-block', padding: '2px 8px', borderRadius: '999px', background: g.badgeBg, fontFamily: 'Inter', fontSize: '9px', fontWeight: 700, color: g.badgeColor, letterSpacing: '0.3px' }}>
                          {g.badge}
                        </span>
                      </div>
                      <div style={{ fontFamily: 'Inter', fontSize: '13px', fontWeight: 700, color: '#0F172A', marginBottom: '3px' }}>{g.label}</div>
                      <div style={{ fontFamily: 'Inter', fontSize: '11px', color: '#64748B', lineHeight: '1.5' }}>{g.sub}</div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* RIGHT */}
            <div style={{ width: '230px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '14px', paddingBottom: '80px' }}>

              {/* Notification Health (blue card) */}
              <div style={{ background: 'linear-gradient(145deg, #1D4ED8 0%, #2563EB 100%)', borderRadius: '12px', padding: '20px 20px', position: 'relative', overflow: 'hidden' }}>
                {/* Background decoration */}
                <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '100px', height: '100px', borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }} />
                <div style={{ position: 'absolute', bottom: '-30px', left: '-10px', width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <div style={{ fontFamily: 'Inter', fontSize: '13px', fontWeight: 700, color: 'rgba(255,255,255,0.9)', marginBottom: '8px' }}>Notification Health</div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '10px' }}>
                    <span style={{ fontFamily: 'Inter', fontSize: '34px', fontWeight: 800, color: '#fff', lineHeight: 1 }}>98.2%</span>
                    <span style={{ fontFamily: 'Inter', fontSize: '11px', fontWeight: 600, color: 'rgba(255,255,255,0.7)' }}>Delivery Rate</span>
                  </div>
                  <div style={{ fontFamily: 'Inter', fontSize: '11px', color: 'rgba(255,255,255,0.7)', lineHeight: '1.5', marginBottom: '16px' }}>
                    The platform successfully pushed 14,204 critical alerts over the last 24 hours.
                  </div>
                  <button suppressHydrationWarning style={{ width: '100%', height: '32px', borderRadius: '7px', background: 'transparent', border: '1.5px solid rgba(255,255,255,0.5)', cursor: 'pointer', fontFamily: 'Inter', fontSize: '11px', fontWeight: 700, color: '#fff', letterSpacing: '0.5px' }}>
                    VIEW FULL LOGS
                  </button>
                </div>
              </div>

              {/* Audit Trail */}
              <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #E2E8F0', padding: '18px 18px' }}>
                <div style={{ fontFamily: 'Inter', fontSize: '10px', fontWeight: 700, color: '#94A3B8', letterSpacing: '0.8px', marginBottom: '14px' }}>AUDIT TRAIL</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '16px' }}>
                  {auditItems.map((item, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                      {/* Icon */}
                      <div style={{ width: '26px', height: '26px', borderRadius: '6px', background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        {item.icon === 'edit' && (
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M8.5 1.5l2 2-6 6H2.5v-2l6-6Z" stroke="#2563EB" strokeWidth="1.2" strokeLinejoin="round"/></svg>
                        )}
                        {item.icon === 'plus' && (
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 2v8M2 6h8" stroke="#2563EB" strokeWidth="1.4" strokeLinecap="round"/></svg>
                        )}
                        {item.icon === 'warning' && (
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 1.5L11 10H1L6 1.5Z" stroke="#F59E0B" strokeWidth="1.2" strokeLinejoin="round"/><path d="M6 5.5v2M6 9v.2" stroke="#F59E0B" strokeWidth="1.2" strokeLinecap="round"/></svg>
                        )}
                      </div>
                      <div>
                        <div style={{ fontFamily: 'Inter', fontSize: '12px', fontWeight: 600, color: '#0F172A', lineHeight: '1.4', marginBottom: '2px' }}>{item.text}</div>
                        <div style={{ fontFamily: 'Inter', fontSize: '10px', color: '#94A3B8' }}>{item.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <button suppressHydrationWarning style={{ width: '100%', height: '32px', borderRadius: '7px', background: '#fff', border: '1.5px solid #E2E8F0', cursor: 'pointer', fontFamily: 'Inter', fontSize: '11px', fontWeight: 700, color: '#2563EB', letterSpacing: '0.4px' }}>
                  VIEW AUDIT HISTORY
                </button>
              </div>

              {/* Priority support */}
              <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #E2E8F0', padding: '18px 18px' }}>
                <div style={{ fontFamily: 'Inter', fontSize: '13px', fontWeight: 700, color: '#0F172A', marginBottom: '6px' }}>Need priority support?</div>
                <div style={{ fontFamily: 'Inter', fontSize: '12px', color: '#64748B', lineHeight: '1.6', marginBottom: '10px' }}>
                  Enterprise accounts have access to 24/7 dedicated alert monitoring and configuration assistance.
                </div>
                <button suppressHydrationWarning style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontFamily: 'Inter', fontSize: '12px', fontWeight: 700, color: '#2563EB', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  Talk to a Specialist
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6h8M7 3l3 3-3 3" stroke="#2563EB" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
              </div>

            </div>
          </div>

          {/* Sticky bottom bar */}
          <div style={{ position: 'sticky', bottom: 0, background: 'rgba(248,250,252,0.95)', borderTop: '1px solid #E2E8F0', padding: '12px 0', display: 'flex', justifyContent: 'flex-end', gap: '10px', marginLeft: '-28px', marginRight: '-28px', paddingLeft: '28px', paddingRight: '28px', backdropFilter: 'blur(8px)' }}>
            <button suppressHydrationWarning style={{ height: '38px', padding: '0 20px', borderRadius: '8px', background: '#fff', border: '1px solid #E2E8F0', cursor: 'pointer', fontFamily: 'Inter', fontSize: '13px', fontWeight: 600, color: '#374151' }}>
              Discard Changes
            </button>
            <button suppressHydrationWarning style={{ height: '38px', padding: '0 20px', borderRadius: '8px', background: '#2563EB', border: 'none', cursor: 'pointer', fontFamily: 'Inter', fontSize: '13px', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '7px' }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7l3.5 3.5L12 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              Save Configurations
            </button>
          </div>

        </main>
      </div>
    </div>
  );
}
