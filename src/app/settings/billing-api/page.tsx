'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const settingsNav = [
  {
    label: 'Fleet Settings', href: '/settings/fleet-settings',
    icon: (<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="0.5" y="3.5" width="9" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.3"/><path d="M9.5 5.5h3l2 3.5H9.5V5.5Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/><circle cx="3.5" cy="12.5" r="1.3" fill="currentColor"/><circle cx="10.5" cy="12.5" r="1.3" fill="currentColor"/></svg>),
  },
  {
    label: 'Notifications', href: '/settings/notifications',
    icon: (<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M13 6.5A5 5 0 0 0 3 6.5c0 5-2 6.5-2 6.5h14s-2-1.5-2-6.5M9.2 14a1.5 1.5 0 0 1-2.4 0" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>),
  },
  {
    label: 'User Management', href: '/settings/user-management',
    icon: (<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="5.5" cy="4.5" r="2.5" stroke="currentColor" strokeWidth="1.3"/><path d="M1 13.5c0-2.485 2.015-4.5 4.5-4.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/><path d="M11 9.5v5M8.5 12h5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>),
  },
  {
    label: 'Billing & API', href: '/settings/billing-api',
    icon: (<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="0.75" y="2.75" width="14.5" height="10.5" rx="1.5" stroke="currentColor" strokeWidth="1.3"/><path d="M0.75 6.5h14.5" stroke="currentColor" strokeWidth="1.3"/></svg>),
  },
  {
    label: 'Appearance', href: '/settings/appearance',
    icon: (<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.3"/><circle cx="5.5" cy="6" r="1" fill="currentColor"/><circle cx="10.5" cy="6" r="1" fill="currentColor"/><path d="M5 10.5s1 2 3 2 3-2 3-2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>),
  },
];

function SettingsSidebar() {
  const router = useRouter();
  return (
    <aside style={{
      width: '288px', flexShrink: 0, height: '100vh', background: '#fff',
      borderRight: '1px solid rgba(25, 28, 30, 0.08)',
      display: 'flex', flexDirection: 'column',
    }}>
      {/* Logo */}
      <div style={{ padding: '20px 24px', display: 'flex', alignItems: 'center', gap: '12px', borderBottom: '1px solid rgba(25, 28, 30, 0.06)' }}>
        <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#2563EB', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <svg width="22" height="18" viewBox="0 0 22 18" fill="none">
            <rect x="0.5" y="3" width="13" height="10" rx="1.5" stroke="white" strokeWidth="1.5"/>
            <path d="M13.5 5.5h4l2.5 4.5H13.5V5.5Z" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
            <circle cx="4.5" cy="14.5" r="1.8" fill="white"/>
            <circle cx="14.5" cy="14.5" r="1.8" fill="white"/>
          </svg>
        </div>
        <div>
          <div style={{ fontFamily: 'Inter', fontSize: '14px', fontWeight: 700, color: '#191C1E', lineHeight: '18px' }}>Command Center</div>
          <div style={{ fontFamily: 'Inter', fontSize: '11px', fontWeight: 500, color: 'rgba(66, 71, 84, 0.5)', lineHeight: '16px' }}>Logistics Admin</div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '12px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
        {settingsNav.map((item) => {
          const isActive = item.label === 'Billing & API';
          return (
            <button key={item.label} suppressHydrationWarning onClick={() => router.push(item.href)}
              style={{
                display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px',
                width: '100%', textAlign: 'left', cursor: 'pointer',
                background: isActive ? 'rgba(47, 128, 237, 0.08)' : 'transparent',
                border: 'none', borderRadius: '8px',
              }}>
              <span style={{ display: 'flex', flexShrink: 0, color: isActive ? '#2F80ED' : 'rgba(66, 71, 84, 0.6)' }}>{item.icon}</span>
              <span style={{ fontFamily: 'Inter', fontSize: '13px', fontWeight: isActive ? 600 : 400, color: isActive ? '#2F80ED' : '#424754' }}>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Support Portal */}
      <div style={{ padding: '12px' }}>
        <button style={{
          width: '100%', padding: '10px', background: '#F7F9FB',
          border: '1px solid rgba(25, 28, 30, 0.08)', borderRadius: '8px',
          cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center',
        }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5 2H2.5A1.5 1.5 0 0 0 1 3.5v8A1.5 1.5 0 0 0 2.5 13H5M9 10l3-3-3-3M13 7H5" stroke="rgba(66,71,84,0.6)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
          <span style={{ fontFamily: 'Inter', fontSize: '12px', fontWeight: 500, color: 'rgba(66, 71, 84, 0.6)' }}>Support Portal</span>
        </button>
      </div>

      {/* System Status + Logout */}
      <div style={{ padding: '8px 12px 16px', display: 'flex', flexDirection: 'column', gap: '2px', borderTop: '1px solid rgba(25, 28, 30, 0.06)' }}>
        <button style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px', background: 'none', border: 'none', cursor: 'pointer', borderRadius: '6px', width: '100%' }}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="5" stroke="rgba(66,71,84,0.4)" strokeWidth="1.2"/><circle cx="6" cy="6" r="2.5" fill="rgba(66,71,84,0.4)"/></svg>
          <span style={{ fontFamily: 'Inter', fontSize: '12px', color: 'rgba(66, 71, 84, 0.5)' }}>System Status</span>
        </button>
        <button onClick={() => router.push('/')} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px', background: 'none', border: 'none', cursor: 'pointer', borderRadius: '6px', width: '100%' }}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M4.5 1.5H2A1.5 1.5 0 0 0 .5 3v6A1.5 1.5 0 0 0 2 10.5h2.5M8 8.5l2.5-2.5L8 3.5M11 6H4" stroke="rgba(66,71,84,0.4)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          <span style={{ fontFamily: 'Inter', fontSize: '12px', color: 'rgba(66, 71, 84, 0.5)' }}>+ Logout</span>
        </button>
      </div>
    </aside>
  );
}

const apiKeys = [
  {
    name: 'Main Logistics Hub',
    key: 'pk_live••••••••••••4f2a',
    status: 'ACTIVE',
    statusColor: '#22C55E',
    statusBg: 'rgba(34, 197, 94, 0.12)',
    created: 'Aug 12, 2023',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <circle cx="7" cy="8" r="4" stroke="#2F80ED" strokeWidth="1.4"/>
        <path d="M10.5 11.5L14 15" stroke="#2F80ED" strokeWidth="1.4" strokeLinecap="round"/>
        <path d="M7 8v.01" stroke="#2F80ED" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    name: 'Staging/Testing Environment',
    key: 'pk_test••••••••••••9x11',
    status: 'ROTATION DUE',
    statusColor: '#F59E0B',
    statusBg: 'rgba(245, 158, 11, 0.12)',
    created: 'Jun 04, 2023',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <rect x="2" y="2" width="6" height="6" rx="1" stroke="#2F80ED" strokeWidth="1.4"/>
        <rect x="10" y="2" width="6" height="6" rx="1" stroke="#2F80ED" strokeWidth="1.4"/>
        <rect x="2" y="10" width="6" height="6" rx="1" stroke="#2F80ED" strokeWidth="1.4"/>
        <rect x="10" y="10" width="6" height="6" rx="1" stroke="#2F80ED" strokeWidth="1.4"/>
      </svg>
    ),
  },
  {
    name: 'Third-party Tracking Portal',
    key: 'pk_live••••••••••••2z98',
    status: 'INACTIVE',
    statusColor: 'rgba(66, 71, 84, 0.5)',
    statusBg: 'rgba(66, 71, 84, 0.08)',
    created: 'Jan 20, 2023',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <circle cx="4" cy="9" r="2.5" stroke="#2F80ED" strokeWidth="1.4"/>
        <circle cx="14" cy="4" r="2.5" stroke="#2F80ED" strokeWidth="1.4"/>
        <circle cx="14" cy="14" r="2.5" stroke="#2F80ED" strokeWidth="1.4"/>
        <path d="M6.5 8L11.5 5M6.5 10L11.5 13" stroke="#2F80ED" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
  },
];


export default function BillingAPIPage() {
  const [openMenu, setOpenMenu] = useState<number | null>(null);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F7F9FB', fontFamily: 'Inter' }}>
      <SettingsSidebar />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>

        {/* Header */}
        <header style={{
          display: 'flex', height: '80px', padding: '0 48px',
          justifyContent: 'space-between', alignItems: 'center', flexShrink: 0,
          borderBottom: '1px solid rgba(25, 28, 30, 0.05)',
          background: 'rgba(247, 249, 251, 0.80)',
          backdropFilter: 'blur(12px)',
          position: 'sticky', top: 0, zIndex: 5,
        }}>
          <span style={{ fontFamily: 'Inter', fontSize: '18px', fontWeight: 700, color: '#191C1E', letterSpacing: '-0.3px' }}>
            Platform Settings
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            {/* Search */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#fff', border: '1px solid rgba(25, 28, 30, 0.08)', borderRadius: '8px', padding: '8px 14px' }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="6" cy="6" r="4.5" stroke="rgba(66,71,84,0.4)" strokeWidth="1.3"/><path d="M9.5 9.5L13 13" stroke="rgba(66,71,84,0.4)" strokeWidth="1.3" strokeLinecap="round"/></svg>
              <input placeholder="Search settings..." style={{ fontFamily: 'Inter', fontSize: '13px', color: '#424754', background: 'transparent', border: 'none', outline: 'none', width: '160px' }} />
            </div>
            {/* Help */}
            <button style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'transparent', border: '1px solid rgba(25,28,30,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6" stroke="rgba(66,71,84,0.5)" strokeWidth="1.3"/><path d="M5.5 5.5a1.5 1.5 0 0 1 3 .5c0 1-1.5 1.5-1.5 2.5" stroke="rgba(66,71,84,0.5)" strokeWidth="1.3" strokeLinecap="round"/><circle cx="7" cy="10.5" r=".5" fill="rgba(66,71,84,0.5)"/></svg>
            </button>
            {/* Settings */}
            <button style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'transparent', border: '1px solid rgba(25,28,30,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="2" stroke="rgba(66,71,84,0.5)" strokeWidth="1.3"/><path d="M7 1v1.5M7 11.5V13M1 7h1.5M11.5 7H13M2.93 2.93l1.06 1.06M10.01 10.01l1.06 1.06M2.93 11.07l1.06-1.06M10.01 3.99l1.06-1.06" stroke="rgba(66,71,84,0.5)" strokeWidth="1.3" strokeLinecap="round"/></svg>
            </button>
            {/* Avatar */}
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#B7DAF5', overflow: 'hidden', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="7" r="4" fill="#2F80ED"/><path d="M2 18c0-4.418 3.582-8 8-8s8 3.582 8 8" fill="#2F80ED"/></svg>
            </div>
          </div>
        </header>

        {/* Main scrollable content */}
        <main style={{ flex: 1, overflowY: 'auto', padding: '32px 48px', display: 'flex', flexDirection: 'column', gap: '24px' }}>

          {/* Row 1: Current Plan card (full width) */}
          <div style={{
            display: 'flex', padding: '32px', flexDirection: 'column', alignItems: 'flex-start', gap: '24px',
            borderRadius: '12px', border: '1px solid rgba(194, 198, 214, 0.10)',
            background: '#FFF', boxShadow: '0 20px 40px 0 rgba(25, 28, 30, 0.03)',
          }}>
            {/* Plan header row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', alignSelf: 'stretch' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                {/* Plan icon */}
                <div style={{ width: '52px', height: '52px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '12px', background: '#2F80ED', flexShrink: 0 }}>
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                    <path d="M14 2L4 6.5v8c0 5.5 4.3 10.6 10 12 5.7-1.4 10-6.5 10-12v-8L14 2Z" fill="rgba(255,255,255,0.25)" stroke="white" strokeWidth="1.6"/>
                    <path d="M9.5 14l3 3 6-6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <div style={{ fontFamily: 'Inter', fontSize: '11px', fontWeight: 700, color: '#2F80ED', letterSpacing: '1.2px', marginBottom: '4px' }}>CURRENT PLAN</div>
                  <div style={{ fontFamily: 'Inter', fontSize: '28px', fontWeight: 800, color: '#191C1E', lineHeight: '1', marginBottom: '6px', letterSpacing: '-0.5px' }}>Pro Enterprise</div>
                  <div style={{ fontFamily: 'Inter', fontSize: '13px', color: '#2F80ED', fontWeight: 400 }}>Your next billing cycle starts on October 12, 2023</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button style={{ padding: '10px 20px', background: '#fff', border: '1px solid rgba(25,28,30,0.15)', borderRadius: '8px', color: '#424754', fontFamily: 'Inter', fontSize: '13px', fontWeight: 500, cursor: 'pointer' }}>
                  View Invoices
                </button>
                <button style={{ padding: '10px 22px', background: '#2F80ED', border: 'none', borderRadius: '8px', color: '#fff', fontFamily: 'Inter', fontSize: '13px', fontWeight: 700, cursor: 'pointer', letterSpacing: '0.5px' }}>
                  MANAGE BILLING
                </button>
              </div>
            </div>
          </div>

          {/* Row 2: Usage Quotas (left) + API Keys (right) */}
          <div style={{ display: 'grid', gridTemplateColumns: '5fr 7fr', gap: '24px', alignItems: 'start' }}>

            {/* Usage Quotas card */}
            <div style={{
              display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
              borderRadius: '12px', border: '1px solid rgba(194, 198, 214, 0.10)',
              background: '#FFF', boxShadow: '0 20px 40px 0 rgba(25, 28, 30, 0.03)',
              overflow: 'hidden',
            }}>
              {/* Gray quotas section */}
              <div style={{ display: 'flex', padding: '24px', flexDirection: 'column', alignItems: 'flex-start', gap: '32px', alignSelf: 'stretch', background: '#F2F4F6', borderRadius: '12px' }}>
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', alignSelf: 'stretch' }}>
                  <span style={{ fontFamily: 'Inter', fontSize: '16px', fontWeight: 700, color: '#191C1E' }}>Usage Quotas</span>
                  <span style={{ fontFamily: 'Inter', fontSize: '12px', fontWeight: 600, color: '#2F80ED', background: '#B7DAF5', padding: '4px 12px', borderRadius: '9999px' }}>Monthly</span>
                </div>

                {/* API Requests */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignSelf: 'stretch' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', alignSelf: 'stretch' }}>
                    <div>
                      <div style={{ fontFamily: 'Inter', fontSize: '13px', fontWeight: 600, color: '#2F80ED', marginBottom: '2px' }}>API Requests</div>
                      <div style={{ fontFamily: 'Inter', fontSize: '11px', color: 'rgba(66,71,84,0.5)' }}>Core aleet Endpoints</div>
                    </div>
                    <div style={{ fontFamily: 'Inter', fontSize: '12px', color: 'rgba(66,71,84,0.6)', textAlign: 'right' }}>
                      <span style={{ fontWeight: 700, color: '#191C1E' }}>842,000</span> / 1M
                    </div>
                  </div>
                  <div style={{ display: 'flex', height: '8px', alignItems: 'center', alignSelf: 'stretch', borderRadius: '9999px', background: 'rgba(183,218,245,0.35)', overflow: 'hidden' }}>
                    <div style={{ width: '84.2%', height: '100%', background: '#B7DAF5', borderRadius: '9999px' }}/>
                  </div>
                </div>

                {/* Managed Assets */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignSelf: 'stretch' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', alignSelf: 'stretch' }}>
                    <div>
                      <div style={{ fontFamily: 'Inter', fontSize: '13px', fontWeight: 600, color: '#2F80ED', marginBottom: '2px' }}>Managed Assets</div>
                      <div style={{ fontFamily: 'Inter', fontSize: '11px', color: 'rgba(66,71,84,0.5)' }}>Vehicles &amp; Drivers</div>
                    </div>
                    <div style={{ fontFamily: 'Inter', fontSize: '12px', color: 'rgba(66,71,84,0.6)', textAlign: 'right' }}>
                      <span style={{ fontWeight: 700, color: '#191C1E' }}>1,240</span> / 5K
                    </div>
                  </div>
                  <div style={{ display: 'flex', height: '8px', alignItems: 'center', alignSelf: 'stretch', borderRadius: '9999px', background: 'rgba(183,218,245,0.35)', overflow: 'hidden' }}>
                    <div style={{ width: '24.8%', height: '100%', background: '#B7DAF5', borderRadius: '9999px' }}/>
                  </div>
                </div>

                {/* Log Retention */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignSelf: 'stretch' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', alignSelf: 'stretch' }}>
                    <div>
                      <div style={{ fontFamily: 'Inter', fontSize: '13px', fontWeight: 600, color: '#2F80ED', marginBottom: '2px' }}>Log Retention</div>
                      <div style={{ fontFamily: 'Inter', fontSize: '11px', color: 'rgba(66,71,84,0.5)' }}>Compliance Archive</div>
                    </div>
                    <div style={{ fontFamily: 'Inter', fontSize: '12px', color: 'rgba(66,71,84,0.6)', textAlign: 'right' }}>
                      <span style={{ fontWeight: 700, color: '#191C1E' }}>42.8 GB</span> / 100GB
                    </div>
                  </div>
                  <div style={{ display: 'flex', height: '8px', alignItems: 'center', alignSelf: 'stretch', borderRadius: '9999px', background: 'rgba(183,218,245,0.35)', overflow: 'hidden' }}>
                    <div style={{ width: '42.8%', height: '100%', background: '#B7DAF5', borderRadius: '9999px' }}/>
                  </div>
                </div>
              </div>

              {/* Upgrade link row */}
              <div style={{ display: 'flex', padding: '24px', flexDirection: 'column', alignItems: 'flex-start', alignSelf: 'stretch', borderTop: '1px solid rgba(194, 198, 214, 0.10)' }}>
                <button style={{ background: 'none', border: 'none', fontFamily: 'Inter', fontSize: '13px', fontWeight: 600, color: '#2F80ED', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
                  Upgrade Quota Limits
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7h8M8 4l3 3-3 3" stroke="#2F80ED" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
              </div>
            </div>

            {/* Active API Keys card */}
            <div style={{
              display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
              borderRadius: '12px', border: '1px solid rgba(194, 198, 214, 0.10)',
              background: '#FFF', boxShadow: '0 20px 40px 0 rgba(25, 28, 30, 0.03)',
              overflow: 'hidden',
            }}>
              {/* Card header */}
              <div style={{ display: 'flex', padding: '24px 24px 16px', justifyContent: 'space-between', alignItems: 'flex-start', alignSelf: 'stretch' }}>
                <div>
                  <div style={{ fontFamily: 'Inter', fontSize: '16px', fontWeight: 700, color: '#191C1E', marginBottom: '4px' }}>Active API Keys</div>
                  <div style={{ fontFamily: 'Inter', fontSize: '12px', color: 'rgba(66,71,84,0.5)' }}>Manage secure access for your integrations</div>
                </div>
                <button style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px', background: '#B7DAF5', border: 'none', borderRadius: '9999px', color: '#2F80ED', fontFamily: 'Inter', fontSize: '12px', fontWeight: 600, cursor: 'pointer', flexShrink: 0, whiteSpace: 'nowrap' }}>
                  <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M5.5 1v9M1 5.5h9" stroke="#2F80ED" strokeWidth="1.8" strokeLinecap="round"/></svg>
                  Generate New Key
                </button>
              </div>

              {/* API key list */}
              <div style={{ display: 'flex', padding: '16px 24px', flexDirection: 'column', alignItems: 'flex-start', alignSelf: 'stretch', gap: '0' }}>
                {apiKeys.map((k, i) => (
                  <div key={i} style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '14px 0', alignSelf: 'stretch',
                    borderBottom: i < apiKeys.length - 1 ? '1px solid rgba(194,198,214,0.08)' : 'none',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(183,218,245,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        {k.icon}
                      </div>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '3px' }}>
                          <span style={{ fontFamily: 'Inter', fontSize: '13px', fontWeight: 600, color: '#191C1E' }}>{k.name}</span>
                          <span style={{ fontFamily: 'Inter', fontSize: '10px', fontWeight: 700, color: k.statusColor, background: k.statusBg, padding: '2px 8px', borderRadius: '9999px', letterSpacing: '0.3px' }}>{k.status}</span>
                        </div>
                        <span style={{ fontFamily: 'monospace', fontSize: '11px', color: 'rgba(66,71,84,0.5)' }}>{k.key}</span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexShrink: 0 }}>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontFamily: 'Inter', fontSize: '10px', color: 'rgba(66,71,84,0.4)', marginBottom: '2px' }}>Created</div>
                        <div style={{ fontFamily: 'Inter', fontSize: '11px', fontWeight: 500, color: 'rgba(66,71,84,0.6)' }}>{k.created}</div>
                      </div>
                      <button
                        onClick={() => setOpenMenu(openMenu === i ? null : i)}
                        style={{ width: '28px', height: '28px', borderRadius: '6px', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(66,71,84,0.4)' }}>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="3" r="1.2" fill="currentColor"/><circle cx="8" cy="8" r="1.2" fill="currentColor"/><circle cx="8" cy="13" r="1.2" fill="currentColor"/></svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Security tip */}
              <div style={{ display: 'flex', padding: '16px 24px', alignItems: 'flex-start', gap: '10px', alignSelf: 'stretch', borderTop: '1px solid rgba(194,198,214,0.10)', background: 'rgba(242,244,246,0.20)' }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: '1px' }}><circle cx="8" cy="8" r="7" stroke="rgba(66,71,84,0.3)" strokeWidth="1.2"/><path d="M8 7v4M8 5v.01" stroke="rgba(66,71,84,0.3)" strokeWidth="1.2" strokeLinecap="round"/></svg>
                <span style={{ fontFamily: 'Inter', fontSize: '12px', color: 'rgba(66,71,84,0.5)', lineHeight: '1.5' }}>
                  Security Tip: Rotate your production keys every 90 days to maintain optimal security.
                </span>
              </div>
            </div>
          </div>

          {/* Row 3: Bottom 3 cards */}
          <div style={{ display: 'inline-grid', rowGap: '24px', columnGap: '24px', gridTemplateRows: '98px', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', alignSelf: 'stretch' }}>

            {/* Payment Method */}
            <div style={{ display: 'flex', height: '98px', padding: '24px', alignItems: 'center', gap: '16px', borderRadius: '12px', border: '1px solid rgba(194, 198, 214, 0.10)', background: '#FFF', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }}>
              <div style={{ width: '48px', height: '48px', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '9999px', background: '#B7DAF5', flexShrink: 0 }}>
                <svg width="22" height="18" viewBox="0 0 22 18" fill="none">
                  <rect x="1" y="2" width="20" height="14" rx="2.5" stroke="white" strokeWidth="1.5"/>
                  <path d="M1 6h20" stroke="white" strokeWidth="1.5"/>
                  <rect x="3" y="10" width="4" height="2" rx="0.5" fill="white"/>
                </svg>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', alignSelf: 'stretch', justifyContent: 'center', gap: '4px' }}>
                <div style={{ fontFamily: 'Inter', fontSize: '12px', fontWeight: 700, color: '#000', letterSpacing: '-0.3px', textTransform: 'uppercase' }}>Payment Method</div>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', color: '#2F80ED', fontFamily: 'Inter', fontSize: '14px', fontWeight: 700, lineHeight: '20px' }}>Visa ending in 4242</div>
              </div>
            </div>

            {/* Last Payment */}
            <div style={{ display: 'flex', height: '98px', padding: '24px', alignItems: 'center', gap: '16px', borderRadius: '12px', border: '1px solid rgba(194, 198, 214, 0.10)', background: '#FFF', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }}>
              <div style={{ width: '48px', height: '48px', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '9999px', background: '#B7DAF5', flexShrink: 0 }}>
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <circle cx="11" cy="11" r="9" stroke="white" strokeWidth="1.5"/>
                  <path d="M11 6v5l3 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', alignSelf: 'stretch', justifyContent: 'center', gap: '4px' }}>
                <div style={{ fontFamily: 'Inter', fontSize: '12px', fontWeight: 700, color: '#000', letterSpacing: '-0.3px', textTransform: 'uppercase' }}>Last Payment</div>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', color: '#2F80ED', fontFamily: 'Inter', fontSize: '14px', fontWeight: 700, lineHeight: '20px' }}>$2,450.00 (Sept 12)</div>
              </div>
            </div>

            {/* Tax ID / VAT */}
            <div style={{ display: 'flex', height: '98px', padding: '24px', alignItems: 'center', gap: '16px', borderRadius: '12px', border: '1px solid #B7DAF5', background: '#FFF', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }}>
              <div style={{ width: '48px', height: '48px', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '9999px', background: '#B7DAF5', flexShrink: 0 }}>
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <rect x="3" y="8" width="16" height="12" rx="1.5" stroke="white" strokeWidth="1.5"/>
                  <path d="M7 8V6a4 4 0 0 1 8 0v2" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M11 13v2" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', alignSelf: 'stretch', justifyContent: 'center', gap: '4px' }}>
                <div style={{ fontFamily: 'Inter', fontSize: '12px', fontWeight: 700, color: '#000', letterSpacing: '-0.3px', textTransform: 'uppercase' }}>Tax ID / VAT</div>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', color: '#2F80ED', fontFamily: 'Inter', fontSize: '14px', fontWeight: 700, lineHeight: '20px' }}>GB 123 4567 89</div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0 8px' }}>
            <span style={{ fontFamily: 'Inter', fontSize: '12px', fontWeight: 400, lineHeight: '16px', color: 'rgba(66, 71, 84, 0.40)' }}>
              © 2023 Carry On Logistics. All rights reserved.
            </span>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '24px' }}>
              {['API Documentation', 'Security Policy', 'Terms of Service'].map((link) => (
                <button key={link} style={{ fontFamily: 'Inter', fontSize: '12px', color: 'rgba(66,71,84,0.4)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#2F80ED')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(66,71,84,0.4)')}>
                  {link}
                </button>
              ))}
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}
