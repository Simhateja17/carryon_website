'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

/* ── Sidebar nav ─────────────────────────────────────────────── */
const settingsNav = [
  { label: 'Fleet Settings',  href: '/settings/fleet-settings',
    icon: (<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="0.5" y="3.5" width="9" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.3"/><path d="M9.5 5.5h3l2 3.5H9.5V5.5Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/><circle cx="3.5" cy="12.5" r="1.3" fill="currentColor"/><circle cx="10.5" cy="12.5" r="1.3" fill="currentColor"/></svg>) },
  { label: 'Notifications',   href: '/settings/notifications',
    icon: (<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M13 6.5A5 5 0 0 0 3 6.5c0 5-2 6.5-2 6.5h14s-2-1.5-2-6.5M9.2 14a1.5 1.5 0 0 1-2.4 0" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>) },
  { label: 'User Management', href: '/settings/user-management',
    icon: (<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="5.5" cy="4.5" r="2.5" stroke="currentColor" strokeWidth="1.3"/><path d="M1 13.5c0-2.485 2.015-4.5 4.5-4.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/><path d="M11 9.5v5M8.5 12h5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>) },
  { label: 'Billing & API',   href: '/settings/billing-api',
    icon: (<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="0.75" y="2.75" width="14.5" height="10.5" rx="1.5" stroke="currentColor" strokeWidth="1.3"/><path d="M0.75 6.5h14.5" stroke="currentColor" strokeWidth="1.3"/></svg>) },
  { label: 'Appearance',      href: '/settings/appearance',
    icon: (<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.3"/><circle cx="5.5" cy="6" r="1" fill="currentColor"/><circle cx="10.5" cy="6" r="1" fill="currentColor"/><path d="M5 10.5s1 2 3 2 3-2 3-2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>) },
];

/* ── Sidebar ─────────────────────────────────────────────────── */
function SettingsSidebar() {
  const router = useRouter();
  return (
    <aside style={{
      width: '240px', flexShrink: 0, height: '100vh', background: '#fff',
      borderRight: '1px solid rgba(25, 28, 30, 0.08)',
      display: 'flex', flexDirection: 'column',
    }}>
      {/* Logo */}
      <div style={{ padding: '20px 20px', display: 'flex', alignItems: 'center', gap: '10px', borderBottom: '1px solid rgba(25, 28, 30, 0.06)' }}>
        <div style={{ width: '38px', height: '38px', borderRadius: '9px', background: '#2563EB', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <svg width="20" height="16" viewBox="0 0 20 16" fill="none">
            <rect x="0.5" y="3" width="12" height="9" rx="1.5" stroke="white" strokeWidth="1.5"/>
            <path d="M12.5 5.5h4l2.5 4H12.5V5.5Z" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
            <circle cx="4" cy="13.5" r="1.5" fill="white"/>
            <circle cx="13" cy="13.5" r="1.5" fill="white"/>
          </svg>
        </div>
        <div>
          <div style={{ fontFamily: 'Inter', fontSize: '13px', fontWeight: 700, color: '#191C1E', lineHeight: '17px' }}>Command Center</div>
          <div style={{ fontFamily: 'Inter', fontSize: '10px', fontWeight: 500, color: 'rgba(66,71,84,0.5)' }}>Logistics Admin</div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '10px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
        {settingsNav.map((item) => {
          const isActive = item.label === 'Notifications';
          return (
            <button key={item.label} suppressHydrationWarning onClick={() => router.push(item.href)}
              style={{
                display: 'flex', alignItems: 'center', gap: '10px', padding: '9px 10px',
                width: '100%', textAlign: 'left', cursor: 'pointer',
                background: isActive ? 'rgba(47, 128, 237, 0.08)' : 'transparent',
                border: 'none', borderRadius: '8px',
              }}>
              <span style={{ display: 'flex', flexShrink: 0, color: isActive ? '#2F80ED' : 'rgba(66,71,84,0.6)' }}>{item.icon}</span>
              <span style={{ fontFamily: 'Inter', fontSize: '13px', fontWeight: isActive ? 600 : 400, color: isActive ? '#2F80ED' : '#424754' }}>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* System Status + Logout */}
      <div style={{ padding: '6px 10px', display: 'flex', flexDirection: 'column', gap: '2px', borderTop: '1px solid rgba(25,28,30,0.06)' }}>
        <button suppressHydrationWarning style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '7px 10px', background: 'none', border: 'none', cursor: 'pointer', borderRadius: '6px', width: '100%' }}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="5" stroke="rgba(66,71,84,0.4)" strokeWidth="1.2"/><circle cx="6" cy="6" r="2.5" fill="rgba(66,71,84,0.4)"/></svg>
          <span style={{ fontFamily: 'Inter', fontSize: '12px', color: 'rgba(66,71,84,0.5)' }}>System Status</span>
        </button>
        <button suppressHydrationWarning onClick={() => router.push('/')} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '7px 10px', background: 'none', border: 'none', cursor: 'pointer', borderRadius: '6px', width: '100%' }}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M4.5 1.5H2A1.5 1.5 0 0 0 .5 3v6A1.5 1.5 0 0 0 2 10.5h2.5M8 8.5l2.5-2.5L8 3.5M11 6H4" stroke="rgba(66,71,84,0.4)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          <span style={{ fontFamily: 'Inter', fontSize: '12px', color: 'rgba(66,71,84,0.5)' }}>Logout</span>
        </button>
      </div>

      {/* Support Portal */}
      <div style={{ padding: '10px 10px 16px' }}>
        <button suppressHydrationWarning style={{
          width: '100%', height: '36px', borderRadius: '8px', background: '#2563EB',
          border: 'none', cursor: 'pointer', fontFamily: 'Inter', fontSize: '12px',
          fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center',
          justifyContent: 'center', gap: '6px',
        }}>
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

/* ── Alert icons ─────────────────────────────────────────────── */
function AlertIcon({ type }: { type: 'delay' | 'order' | 'offline' | 'fuel' }) {
  const paths: Record<string, React.ReactNode> = {
    delay:   <><path d="M8 2L14.5 13H1.5L8 2Z" stroke="#2563EB" strokeWidth="1.4" strokeLinejoin="round"/><path d="M8 6v3M8 11v.5" stroke="#2563EB" strokeWidth="1.4" strokeLinecap="round"/></>,
    order:   <><rect x="2" y="3" width="12" height="10" rx="1.5" stroke="#2563EB" strokeWidth="1.4"/><path d="M5 7h6M5 9.5h4" stroke="#2563EB" strokeWidth="1.4" strokeLinecap="round"/></>,
    offline: <><circle cx="8" cy="5.5" r="2.5" stroke="#2563EB" strokeWidth="1.4"/><path d="M3 13c0-2.485 2.485-4.5 5-4.5s5 2.015 5 4.5" stroke="#2563EB" strokeWidth="1.4" strokeLinecap="round"/><path d="M5.5 3.5L10.5 12.5M10.5 3.5L5.5 12.5" stroke="#2563EB" strokeWidth="1.2" strokeLinecap="round"/></>,
    fuel:    <><path d="M4 13V4a1 1 0 0 1 1-1h5l2 2v8a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1Z" stroke="#2563EB" strokeWidth="1.4"/><path d="M6 7h4M7 10h2" stroke="#2563EB" strokeWidth="1.4" strokeLinecap="round"/></>,
  };
  return (
    <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(47,128,237,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">{paths[type]}</svg>
    </div>
  );
}

/* ── Recipient group icons ───────────────────────────────────── */
function GroupIcon({ type }: { type: 'admin' | 'dispatch' | 'driver' }) {
  const c: Record<string, React.ReactNode> = {
    admin:    <><circle cx="8" cy="5.5" r="2.5" stroke="#2563EB" strokeWidth="1.4"/><path d="M3 13c0-2.485 2.015-4.5 5-4.5s5 2.015 5 4.5" stroke="#2563EB" strokeWidth="1.4" strokeLinecap="round"/><path d="M12 3v3M10.5 4.5h3" stroke="#2563EB" strokeWidth="1.3" strokeLinecap="round"/></>,
    dispatch: <><rect x="1.5" y="4" width="10" height="7" rx="1.5" stroke="#2563EB" strokeWidth="1.4"/><path d="M11.5 6.5h2l2 3h-4V6.5Z" stroke="#2563EB" strokeWidth="1.3" strokeLinejoin="round"/><circle cx="4.5" cy="12" r="1.3" fill="#2563EB"/><circle cx="11" cy="12" r="1.3" fill="#2563EB"/></>,
    driver:   <><path d="M8 1C5.239 1 3 3.239 3 6c0 4 5 9 5 9s5-5 5-9c0-2.761-2.239-5-5-5Z" stroke="#2563EB" strokeWidth="1.4"/><circle cx="8" cy="6" r="2" fill="#2563EB"/></>,
  };
  return (
    <div style={{ width: '38px', height: '38px', borderRadius: '9px', background: 'rgba(47,128,237,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">{c[type]}</svg>
    </div>
  );
}

/* ── Page ────────────────────────────────────────────────────── */
type AlertRow = { type: 'delay'|'order'|'offline'|'fuel'; label: string; sub: string; sms: boolean; push: boolean; email: boolean };

export default function NotificationsPage() {
  const [alerts, setAlerts] = useState<AlertRow[]>([
    { type: 'delay',   label: 'Critical Delays',     sub: 'Shipment is >2 hours behind schedule',     sms: true,  push: true,  email: false },
    { type: 'order',   label: 'New Orders',           sub: 'When a client places a new delivery request', sms: false, push: true,  email: true  },
    { type: 'offline', label: 'Driver Offline',       sub: 'Sudden disconnect during active duty',    sms: true,  push: true,  email: false },
    { type: 'fuel',    label: 'Low Fuel Warnings',    sub: 'Telematics detect <15% fuel levels',      sms: false, push: true,  email: false },
  ]);

  const toggle = (idx: number, ch: 'sms' | 'push' | 'email') => {
    setAlerts((prev) => prev.map((a, i) => i === idx ? { ...a, [ch]: !a[ch] } : a));
  };

  const auditItems = [
    { icon: 'edit',    text: 'Alex M. updated critical alerts',       time: '2 hours ago' },
    { icon: 'plus',    text: 'New Dispatcher Group created',          time: 'Yesterday, 4:32 PM' },
    { icon: 'warning', text: 'System suppressed 12 duplicate alerts', time: '2 days ago' },
  ];

  const groups = [
    { type: 'admin'    as const, label: 'Admins',      badge: 'ACTIVE',      badgeBg: '#D1FAE5', badgeColor: '#065F46', sub: '12 Members • Global Access' },
    { type: 'dispatch' as const, label: 'Dispatchers', badge: 'ACTIVE',      badgeBg: '#D1FAE5', badgeColor: '#065F46', sub: '45 Members • Regional' },
    { type: 'driver'   as const, label: 'Drivers',     badge: 'RESTRICTED',  badgeBg: '#FEF3C7', badgeColor: '#92400E', sub: '850 Members • Mobile Only' },
  ];

  return (
    <div style={{ display: 'flex', width: '100vw', height: '100vh', background: '#F7F9FB', fontFamily: 'Inter, sans-serif', overflow: 'hidden' }}>
      <SettingsSidebar />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

        {/* Header */}
        <header style={{
          height: '60px', flexShrink: 0,
          background: 'rgba(247, 249, 251, 0.80)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(25, 28, 30, 0.05)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 32px', boxSizing: 'border-box',
        }}>
          {/* Breadcrumb */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'Inter', fontSize: '13px' }}>
            <span style={{ color: 'rgba(66,71,84,0.5)', fontWeight: 500 }}>Platform Settings</span>
            <span style={{ color: 'rgba(66,71,84,0.3)' }}>/</span>
            <span style={{ color: '#2F80ED', fontWeight: 700 }}>Notifications</span>
          </div>
          {/* Right side */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', height: '34px', padding: '0 12px', background: '#fff', border: '1px solid rgba(25,28,30,0.08)', borderRadius: '8px', width: '200px' }}>
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><circle cx="5.5" cy="5.5" r="4" stroke="rgba(66,71,84,0.4)" strokeWidth="1.3"/><path d="M9 9l2.5 2.5" stroke="rgba(66,71,84,0.4)" strokeWidth="1.3" strokeLinecap="round"/></svg>
              <span style={{ fontFamily: 'Inter', fontSize: '12px', color: 'rgba(66,71,84,0.35)' }}>Search settings...</span>
            </div>
            <button suppressHydrationWarning style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'transparent', border: '1px solid rgba(25,28,30,0.12)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6" stroke="rgba(66,71,84,0.5)" strokeWidth="1.3"/><path d="M7 10V9M7 5a1.5 1.5 0 1 1 0 3" stroke="rgba(66,71,84,0.5)" strokeWidth="1.3" strokeLinecap="round"/></svg>
            </button>
            <button suppressHydrationWarning style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'transparent', border: '1px solid rgba(25,28,30,0.12)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="2" stroke="rgba(66,71,84,0.5)" strokeWidth="1.3"/><path d="M7 1v1.5M7 11.5V13M1 7h1.5M11.5 7H13M2.93 2.93l1.06 1.06M10.01 10.01l1.06 1.06M2.93 11.07l1.06-1.06M10.01 3.99l1.06-1.06" stroke="rgba(66,71,84,0.5)" strokeWidth="1.3" strokeLinecap="round"/></svg>
            </button>
            <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: '#B7DAF5', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', overflow: 'hidden', flexShrink: 0 }}>
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><circle cx="11" cy="8" r="4" fill="#2F80ED"/><path d="M2 20c0-4.418 4.029-8 9-8s9 3.582 9 8" fill="#2F80ED"/></svg>
            </div>
          </div>
        </header>

        {/* Content */}
        <main style={{ flex: 1, padding: '28px 32px 0', overflowY: 'auto', boxSizing: 'border-box', display: 'flex', flexDirection: 'column' }}>

          {/* Page title */}
          <h1 style={{ margin: '0 0 6px', fontFamily: 'Inter', fontSize: '22px', fontWeight: 800, color: '#191C1E', letterSpacing: '-0.3px' }}>
            Notification Strategy
          </h1>
          <p style={{ margin: '0 0 24px', fontFamily: 'Inter', fontSize: '13px', color: 'rgba(66,71,84,0.6)', lineHeight: '1.6', maxWidth: '540px' }}>
            Configure how the system communicates critical fleet events across your team. Use recipient groups to target alerts to specific roles.
          </p>

          {/* Two-column layout */}
          <div style={{ display: 'flex', gap: '20px', flex: 1, minHeight: 0 }}>

            {/* ── LEFT COLUMN ── */}
            <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '16px', paddingBottom: '80px' }}>

              {/* Active Alerts card */}
              <div style={{
                borderRadius: '12px',
                border: '1px solid rgba(194, 198, 214, 0.05)',
                background: '#FFF',
                padding: '20px 22px',
              }}>
                {/* Card header row: title + channel badges on same line */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <div style={{ fontFamily: 'Inter', fontSize: '15px', fontWeight: 700, color: '#191C1E' }}>Active Alerts</div>
                  <div style={{ display: 'flex' }}>
                    {[
                      { label: 'SMS',   icon: <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><rect x="1" y="1.5" width="8" height="7" rx="1.5" stroke="#2563EB" strokeWidth="1.1"/><path d="M3 4.5h4M3 6h2" stroke="#2563EB" strokeWidth="1.1" strokeLinecap="round"/></svg> },
                      { label: 'PUSH',  icon: <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M8.5 4.5A3.5 3.5 0 0 0 1.5 4.5c0 3.5-1 4.5-1 4.5h9s-1-1-1-4.5M5.9 9a1 1 0 0 1-1.8 0" stroke="#2563EB" strokeWidth="1.1" strokeLinecap="round"/></svg> },
                      { label: 'EMAIL', icon: <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><rect x="1" y="2" width="8" height="6" rx="1.2" stroke="#2563EB" strokeWidth="1.1"/><path d="M1 3l4 3 4-3" stroke="#2563EB" strokeWidth="1.1" strokeLinecap="round"/></svg> },
                    ].map(({ label, icon }) => (
                      <div key={label} style={{ width: '64px', display: 'flex', justifyContent: 'center' }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '4px 8px', borderRadius: '6px', background: 'rgba(47,128,237,0.08)', border: '1px solid rgba(47,128,237,0.15)', fontFamily: 'Inter', fontSize: '10px', fontWeight: 700, color: '#2F80ED' }}>
                          {icon}{label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Subtitle */}
                <div style={{ fontFamily: 'Inter', fontSize: '12px', color: 'rgba(66,71,84,0.5)', marginBottom: '14px' }}>
                  Manage delivery status and logistics warnings.
                </div>

                {/* Alert rows — each in a gray rounded card */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {alerts.map((alert, idx) => (
                    <div key={alert.label} style={{
                      display: 'flex', alignItems: 'center', gap: '12px',
                      padding: '14px 16px',
                      borderRadius: '12px',
                      border: '1px solid rgba(194, 198, 214, 0.10)',
                      background: '#F2F4F6',
                    }}>
                      <AlertIcon type={alert.type} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontFamily: 'Inter', fontSize: '13px', fontWeight: 700, color: '#191C1E', marginBottom: '2px' }}>{alert.label}</div>
                        <div style={{ fontFamily: 'Inter', fontSize: '11px', color: 'rgba(66,71,84,0.5)' }}>{alert.sub}</div>
                      </div>
                      <div style={{ width: '64px', display: 'flex', justifyContent: 'center' }}>
                        <Toggle on={alert.sms}   onChange={() => toggle(idx, 'sms')} />
                      </div>
                      <div style={{ width: '64px', display: 'flex', justifyContent: 'center' }}>
                        <Toggle on={alert.push}  onChange={() => toggle(idx, 'push')} />
                      </div>
                      <div style={{ width: '64px', display: 'flex', justifyContent: 'center' }}>
                        <Toggle on={alert.email} onChange={() => toggle(idx, 'email')} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recipient Groups card */}
              <div style={{
                borderRadius: '12px',
                border: '1px solid rgba(194, 198, 214, 0.05)',
                background: '#FFF',
                padding: '20px 22px',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <span style={{ fontFamily: 'Inter', fontSize: '15px', fontWeight: 700, color: '#191C1E' }}>Recipient Groups</span>
                  <button suppressHydrationWarning style={{ display: 'flex', alignItems: 'center', gap: '5px', fontFamily: 'Inter', fontSize: '12px', fontWeight: 600, color: '#2F80ED', background: 'none', border: 'none', cursor: 'pointer' }}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6" stroke="#2F80ED" strokeWidth="1.3"/><path d="M7 4v6M4 7h6" stroke="#2F80ED" strokeWidth="1.3" strokeLinecap="round"/></svg>
                    New Group
                  </button>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                  {groups.map((g) => (
                    <div key={g.label} style={{
                      borderRadius: '12px',
                      border: '1px solid rgba(194, 198, 214, 0.10)',
                      background: '#F2F4F6',
                      padding: '14px',
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                        <GroupIcon type={g.type} />
                        <span style={{ display: 'inline-block', padding: '2px 8px', borderRadius: '999px', background: g.badgeBg, fontFamily: 'Inter', fontSize: '9px', fontWeight: 700, color: g.badgeColor, letterSpacing: '0.3px' }}>
                          {g.badge}
                        </span>
                      </div>
                      <div style={{ fontFamily: 'Inter', fontSize: '13px', fontWeight: 700, color: '#191C1E', marginBottom: '3px' }}>{g.label}</div>
                      <div style={{ fontFamily: 'Inter', fontSize: '11px', color: 'rgba(66,71,84,0.5)', lineHeight: '1.5' }}>{g.sub}</div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* ── RIGHT COLUMN ── */}
            <div style={{ width: '240px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '16px', paddingBottom: '80px' }}>

              {/* Notification Health — blue gradient card */}
              <div style={{
                borderRadius: '24px',
                background: 'linear-gradient(135deg, #0058BE 0%, #2170E4 100%)',
                boxShadow: '0 20px 25px -5px rgba(0,0,0,0.15), 0 8px 10px -6px rgba(0,0,0,0.08)',
                padding: '32px 24px',
                position: 'relative',
                overflow: 'hidden',
              }}>
                {/* Decorative speaker icon bottom right */}
                <div style={{ position: 'absolute', bottom: '-20px', right: '-10px', width: '120px', height: '120px', opacity: '0.15', pointerEvents: 'none' }}>
                  <svg width="120" height="120" viewBox="0 0 120 120" fill="none"><path d="M60 20c-22.09 0-40 18-40 40v40h16V60c0-13.25 10.75-24 24-24s24 10.75 24 24v40h16V60c0-22-17.91-40-40-40Z" fill="#fff"/><path d="M60 100c11.05 0 20-8.95 20-20s-8.95-20-20-20-20 8.95-20 20 8.95 20 20 20Z" fill="#fff"/></svg>
                </div>

                <div style={{ position: 'relative', zIndex: 1 }}>
                  <div style={{ fontFamily: 'Inter', fontSize: '16px', fontWeight: 700, color: '#fff', marginBottom: '20px', letterSpacing: '0.3px' }}>Notification Health</div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '20px' }}>
                    <span style={{ fontFamily: 'Inter', fontSize: '56px', fontWeight: 900, color: '#fff', lineHeight: 1, letterSpacing: '-1px' }}>98.2</span>
                    <span style={{ fontFamily: 'Inter', fontSize: '24px', fontWeight: 700, color: '#fff', lineHeight: 1, position: 'relative', top: '-4px' }}>%</span>
                    <span style={{ fontFamily: 'Inter', fontSize: '16px', fontWeight: 500, color: 'rgba(255,255,255,0.8)', marginLeft: '8px' }}>Delivery Rate</span>
                  </div>
                  <div style={{ fontFamily: 'Inter', fontSize: '14px', color: 'rgba(255,255,255,0.8)', lineHeight: '1.7', marginBottom: '28px' }}>
                    The platform successfully pushed 14,204 critical alerts over the last 24 hours.
                  </div>
                  <button suppressHydrationWarning style={{ width: '100%', height: '44px', borderRadius: '12px', background: 'rgba(255,255,255,0.15)', border: '1.5px solid rgba(255,255,255,0.35)', cursor: 'pointer', fontFamily: 'Inter', fontSize: '13px', fontWeight: 800, color: '#fff', letterSpacing: '0.6px', backdropFilter: 'blur(10px)', transition: 'all 0.2s' }}>
                    VIEW FULL LOGS
                  </button>
                </div>
              </div>

              {/* Audit Trail */}
              <div style={{ borderRadius: '12px', background: '#FFF', border: '1px solid rgba(194,198,214,0.10)', padding: '18px' }}>
                <div style={{ fontFamily: 'Inter', fontSize: '10px', fontWeight: 700, color: 'rgba(66,71,84,0.4)', letterSpacing: '0.9px', marginBottom: '14px' }}>AUDIT TRAIL</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '16px' }}>
                  {auditItems.map((item, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                      <div style={{ width: '26px', height: '26px', borderRadius: '6px', background: 'rgba(47,128,237,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        {item.icon === 'edit' && (
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M8.5 1.5l2 2-6 6H2.5v-2l6-6Z" stroke="#2F80ED" strokeWidth="1.2" strokeLinejoin="round"/></svg>
                        )}
                        {item.icon === 'plus' && (
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 2v8M2 6h8" stroke="#2F80ED" strokeWidth="1.4" strokeLinecap="round"/></svg>
                        )}
                        {item.icon === 'warning' && (
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 1.5L11 10H1L6 1.5Z" stroke="#F59E0B" strokeWidth="1.2" strokeLinejoin="round"/><path d="M6 5.5v2M6 9v.2" stroke="#F59E0B" strokeWidth="1.2" strokeLinecap="round"/></svg>
                        )}
                      </div>
                      <div>
                        <div style={{ fontFamily: 'Inter', fontSize: '12px', fontWeight: 600, color: '#191C1E', lineHeight: '1.4', marginBottom: '2px' }}>{item.text}</div>
                        <div style={{ fontFamily: 'Inter', fontSize: '10px', color: 'rgba(66,71,84,0.4)' }}>{item.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <button suppressHydrationWarning style={{ width: '100%', height: '32px', borderRadius: '7px', background: '#fff', border: '1px solid rgba(194,198,214,0.2)', cursor: 'pointer', fontFamily: 'Inter', fontSize: '11px', fontWeight: 700, color: '#2F80ED', letterSpacing: '0.4px' }}>
                  VIEW AUDIT HISTORY
                </button>
              </div>

              {/* Priority support */}
              <div style={{ borderRadius: '12px', background: '#FFF', border: '1px solid rgba(194,198,214,0.10)', padding: '18px' }}>
                <div style={{ fontFamily: 'Inter', fontSize: '13px', fontWeight: 700, color: '#191C1E', marginBottom: '6px' }}>Need priority support?</div>
                <div style={{ fontFamily: 'Inter', fontSize: '12px', color: 'rgba(66,71,84,0.55)', lineHeight: '1.6', marginBottom: '12px' }}>
                  Enterprise accounts have access to 24/7 dedicated alert monitoring and configuration assistance.
                </div>
                <button suppressHydrationWarning style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontFamily: 'Inter', fontSize: '12px', fontWeight: 700, color: '#2F80ED', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  Talk to a Specialist →
                </button>
              </div>

            </div>
          </div>

          {/* Sticky bottom bar */}
          <div style={{
            position: 'sticky', bottom: 0,
            background: 'rgba(247,249,251,0.92)',
            borderTop: '1px solid rgba(25,28,30,0.06)',
            backdropFilter: 'blur(12px)',
            padding: '12px 0',
            display: 'flex', justifyContent: 'flex-end', gap: '10px',
            marginLeft: '-32px', marginRight: '-32px',
            paddingLeft: '32px', paddingRight: '32px',
          }}>
            <button suppressHydrationWarning style={{ height: '38px', padding: '0 20px', borderRadius: '8px', background: '#fff', border: '1px solid rgba(25,28,30,0.12)', cursor: 'pointer', fontFamily: 'Inter', fontSize: '13px', fontWeight: 600, color: '#424754' }}>
              Discard Changes
            </button>
            <button suppressHydrationWarning style={{ height: '38px', padding: '0 22px', borderRadius: '8px', background: '#2563EB', border: 'none', cursor: 'pointer', fontFamily: 'Inter', fontSize: '13px', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '7px' }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1v9M4 4l3-3 3 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M2 11h10" stroke="white" strokeWidth="1.5" strokeLinecap="round"/></svg>
              Save Configurations
            </button>
          </div>

        </main>
      </div>
    </div>
  );
}
