'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const settingsNav = [
  { label: 'Fleet Settings', href: '/settings/fleet-settings',
    icon: (<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="0.5" y="3.5" width="9" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.3"/><path d="M9.5 5.5h3l2 3.5H9.5V5.5Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/><circle cx="3.5" cy="12.5" r="1.3" fill="currentColor"/><circle cx="10.5" cy="12.5" r="1.3" fill="currentColor"/></svg>) },
  { label: 'Notifications', href: '/settings/notifications',
    icon: (<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M13 6.5A5 5 0 0 0 3 6.5c0 5-2 6.5-2 6.5h14s-2-1.5-2-6.5M9.2 14a1.5 1.5 0 0 1-2.4 0" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>) },
  { label: 'User Management', href: '/settings/user-management',
    icon: (<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="5.5" cy="4.5" r="2.5" stroke="currentColor" strokeWidth="1.3"/><path d="M1 13.5c0-2.485 2.015-4.5 4.5-4.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/><path d="M11 9.5v5M8.5 12h5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>) },
  { label: 'Billing & API', href: '/settings/billing-api',
    icon: (<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="0.75" y="2.75" width="14.5" height="10.5" rx="1.5" stroke="currentColor" strokeWidth="1.3"/><path d="M0.75 6.5h14.5" stroke="currentColor" strokeWidth="1.3"/></svg>) },
  { label: 'Appearance', href: '/settings/appearance',
    icon: (<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.3"/><circle cx="5.5" cy="6" r="1" fill="currentColor"/><circle cx="10.5" cy="6" r="1" fill="currentColor"/><path d="M5 10.5s1 2 3 2 3-2 3-2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>) },
];

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
          const isActive = item.label === 'Billing & API';
          return (
            <button key={item.label} suppressHydrationWarning onClick={() => router.push(item.href)}
              style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '9px 10px', width: '100%', textAlign: 'left', background: isActive ? '#EFF6FF' : 'transparent', border: 'none', borderLeft: isActive ? '3px solid #2563EB' : '3px solid transparent', borderRadius: isActive ? '0 7px 7px 0' : '7px', cursor: 'pointer' }}>
              <span style={{ display: 'flex', flexShrink: 0, color: isActive ? '#2563EB' : '#64748B' }}>{item.icon}</span>
              <span style={{ fontFamily: 'Inter', fontSize: '13px', fontWeight: isActive ? 600 : 400, color: isActive ? '#2563EB' : '#374151' }}>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div style={{ padding: '12px' }}>
        <button onClick={() => router.push('/')} style={{ width: '100%', padding: '9px', background: 'transparent', border: '1.5px solid #E2E8F0', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5 2H2.5A1.5 1.5 0 0 0 1 3.5v8A1.5 1.5 0 0 0 2.5 13H5M9 10l3-3-3-3M13 7H5" stroke="#64748B" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
          <span style={{ fontFamily: 'Inter', fontSize: '12px', fontWeight: 500, color: '#64748B' }}>Support Portal</span>
        </button>
      </div>
    </aside>
  );
}

const apiKeys = [
  { name: 'Main Logistics Hub', key: 'sk-live-••••••••••••4891', status: 'ACTIVE', statusColor: '#22C55E', statusBg: '#F0FDF4', lastUsed: '2 minutes ago' },
  { name: 'Staging/Testing Environment', key: 'sk-test-••••••••••••7723', status: 'ROTATION DUE', statusColor: '#F59E0B', statusBg: '#FFFBEB', lastUsed: '3 hours ago' },
  { name: 'Third-party Tracking Portal', key: 'sk-live-••••••••••••2156', status: 'INACTIVE', statusColor: '#94A3B8', statusBg: '#F1F5F9', lastUsed: '14 days ago' },
];

export default function BillingAPIPage() {
  const [hoveredKey, setHoveredKey] = useState<number | null>(null);

  const progressBar = (used: number, total: number, label: string, usedLabel: string, totalLabel: string) => (
    <div style={{ marginBottom: '18px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
        <span style={{ fontFamily: 'Inter', fontSize: '13px', fontWeight: 500, color: '#374151' }}>{label}</span>
        <span style={{ fontFamily: 'Inter', fontSize: '12px', color: '#64748B' }}>
          <span style={{ fontWeight: 600, color: '#0F172A' }}>{usedLabel}</span> / {totalLabel}
        </span>
      </div>
      <div style={{ height: '8px', background: '#E2E8F0', borderRadius: '999px', overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${(used / total) * 100}%`, background: 'linear-gradient(90deg, #2563EB 0%, #60A5FA 100%)', borderRadius: '999px' }} />
      </div>
    </div>
  );

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F8FAFC', fontFamily: 'Inter' }}>
      <SettingsSidebar />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Top navbar */}
        <header style={{ height: '60px', background: '#fff', borderBottom: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', flexShrink: 0 }}>
          <span style={{ fontFamily: 'Inter', fontSize: '17px', fontWeight: 700, color: '#0F172A' }}>Platform Settings</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '7px 12px' }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="6" cy="6" r="4.5" stroke="#94A3B8" strokeWidth="1.3"/><path d="M9.5 9.5L13 13" stroke="#94A3B8" strokeWidth="1.3" strokeLinecap="round"/></svg>
              <input placeholder="Search settings…" style={{ fontFamily: 'Inter', fontSize: '12px', color: '#374151', background: 'transparent', border: 'none', outline: 'none', width: '140px' }} />
            </div>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#2563EB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontFamily: 'Inter', fontSize: '12px', fontWeight: 700, color: '#fff' }}>AR</span>
            </div>
          </div>
        </header>

        <main style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>

          {/* Current Plan card */}
          <div style={{ background: 'linear-gradient(135deg, #1E3A8A 0%, #2563EB 60%, #3B82F6 100%)', borderRadius: '14px', padding: '28px 32px', marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 4px 20px rgba(37,99,235,0.25)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              {/* Shield icon */}
              <div style={{ width: '52px', height: '52px', borderRadius: '12px', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <path d="M14 2L4 6.5v8c0 5.5 4.3 10.6 10 12 5.7-1.4 10-6.5 10-12v-8L14 2Z" fill="rgba(255,255,255,0.3)" stroke="white" strokeWidth="1.8"/>
                  <path d="M9 14l3.5 3.5L19 11" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <div style={{ fontFamily: 'Inter', fontSize: '11px', fontWeight: 600, color: 'rgba(255,255,255,0.7)', letterSpacing: '1px', marginBottom: '4px' }}>CURRENT PLAN</div>
                <div style={{ fontFamily: 'Inter', fontSize: '26px', fontWeight: 800, color: '#fff', lineHeight: '1', marginBottom: '6px' }}>Pro Enterprise</div>
                <div style={{ fontFamily: 'Inter', fontSize: '12px', color: 'rgba(255,255,255,0.65)' }}>Billing cycle: Oct 1 – Oct 31, 2023 &nbsp;·&nbsp; Auto-renews Nov 1</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button style={{ padding: '10px 18px', background: 'transparent', border: '1.5px solid rgba(255,255,255,0.5)', borderRadius: '8px', color: '#fff', fontFamily: 'Inter', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>
                View Invoices
              </button>
              <button style={{ padding: '10px 18px', background: '#fff', border: 'none', borderRadius: '8px', color: '#2563EB', fontFamily: 'Inter', fontSize: '13px', fontWeight: 700, cursor: 'pointer', letterSpacing: '0.4px' }}>
                MANAGE BILLING
              </button>
            </div>
          </div>

          {/* Usage Quotas + API Keys row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>

            {/* Usage Quotas */}
            <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #E2E8F0', padding: '22px 24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <div>
                  <div style={{ fontFamily: 'Inter', fontSize: '15px', fontWeight: 700, color: '#0F172A', marginBottom: '2px' }}>Usage Quotas</div>
                  <div style={{ fontFamily: 'Inter', fontSize: '11px', color: '#94A3B8' }}>Current billing period</div>
                </div>
              </div>
              {progressBar(842000, 1000000, 'API Requests', '842,000', '1M')}
              {progressBar(1240, 5000, 'Managed Assets', '1,240', '5K')}
              {progressBar(42.8, 100, 'Log Retention', '42.8 GB', '100 GB')}
              <button style={{ marginTop: '4px', background: 'none', border: 'none', fontFamily: 'Inter', fontSize: '13px', fontWeight: 600, color: '#2563EB', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', gap: '4px' }}>
                Upgrade Quota Limits
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7h8M8 4l3 3-3 3" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            </div>

            {/* Active API Keys */}
            <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #E2E8F0', padding: '22px 24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
                <div>
                  <div style={{ fontFamily: 'Inter', fontSize: '15px', fontWeight: 700, color: '#0F172A', marginBottom: '2px' }}>Active API Keys</div>
                  <div style={{ fontFamily: 'Inter', fontSize: '11px', color: '#94A3B8' }}>Manage your API credentials</div>
                </div>
                <button style={{ padding: '7px 12px', background: '#2563EB', border: 'none', borderRadius: '7px', color: '#fff', fontFamily: 'Inter', fontSize: '12px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 1v10M1 6h10" stroke="white" strokeWidth="1.8" strokeLinecap="round"/></svg>
                  Generate New Key
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {apiKeys.map((k, i) => (
                  <div key={i} onMouseEnter={() => setHoveredKey(i)} onMouseLeave={() => setHoveredKey(null)}
                    style={{ padding: '12px 14px', border: '1px solid #E2E8F0', borderRadius: '9px', background: hoveredKey === i ? '#F8FAFC' : '#fff', transition: 'background 0.15s' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '5px' }}>
                      <span style={{ fontFamily: 'Inter', fontSize: '13px', fontWeight: 600, color: '#0F172A' }}>{k.name}</span>
                      <span style={{ fontFamily: 'Inter', fontSize: '10px', fontWeight: 700, color: k.statusColor, background: k.statusBg, padding: '2px 8px', borderRadius: '999px', letterSpacing: '0.4px' }}>{k.status}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontFamily: 'monospace', fontSize: '12px', color: '#64748B' }}>{k.key}</span>
                      <span style={{ fontFamily: 'Inter', fontSize: '11px', color: '#94A3B8' }}>Used {k.lastUsed}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom row: Payment Method, Last Payment, Tax ID */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '24px' }}>

            {/* Payment Method */}
            <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #E2E8F0', padding: '20px 22px' }}>
              <div style={{ fontFamily: 'Inter', fontSize: '11px', fontWeight: 600, color: '#94A3B8', letterSpacing: '0.8px', marginBottom: '12px' }}>PAYMENT METHOD</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
                <div style={{ width: '42px', height: '28px', background: '#1A1F71', borderRadius: '5px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontFamily: 'Inter', fontSize: '9px', fontWeight: 900, color: '#fff', letterSpacing: '-0.5px' }}>VISA</span>
                </div>
                <div>
                  <div style={{ fontFamily: 'Inter', fontSize: '13px', fontWeight: 600, color: '#0F172A' }}>Visa ending 4242</div>
                  <div style={{ fontFamily: 'Inter', fontSize: '11px', color: '#94A3B8' }}>Expires 09/26</div>
                </div>
              </div>
              <button style={{ fontFamily: 'Inter', fontSize: '12px', fontWeight: 600, color: '#2563EB', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>Update Card</button>
            </div>

            {/* Last Payment */}
            <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #E2E8F0', padding: '20px 22px' }}>
              <div style={{ fontFamily: 'Inter', fontSize: '11px', fontWeight: 600, color: '#94A3B8', letterSpacing: '0.8px', marginBottom: '12px' }}>LAST PAYMENT</div>
              <div style={{ fontFamily: 'Inter', fontSize: '24px', fontWeight: 800, color: '#0F172A', marginBottom: '4px' }}>$2,450.00</div>
              <div style={{ fontFamily: 'Inter', fontSize: '12px', color: '#64748B', marginBottom: '10px' }}>Sept 12, 2023 &nbsp;·&nbsp; Pro Enterprise</div>
              <button style={{ fontFamily: 'Inter', fontSize: '12px', fontWeight: 600, color: '#2563EB', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>Download Receipt</button>
            </div>

            {/* Tax ID / VAT */}
            <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #E2E8F0', padding: '20px 22px' }}>
              <div style={{ fontFamily: 'Inter', fontSize: '11px', fontWeight: 600, color: '#94A3B8', letterSpacing: '0.8px', marginBottom: '12px' }}>TAX ID / VAT</div>
              <div style={{ fontFamily: 'Inter', fontSize: '16px', fontWeight: 700, color: '#0F172A', marginBottom: '4px' }}>GB 123 4567 89</div>
              <div style={{ fontFamily: 'Inter', fontSize: '12px', color: '#64748B', marginBottom: '10px' }}>United Kingdom · VAT registered</div>
              <button style={{ fontFamily: 'Inter', fontSize: '12px', fontWeight: 600, color: '#2563EB', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>Edit Tax Info</button>
            </div>
          </div>

          {/* Footer */}
          <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontFamily: 'Inter', fontSize: '12px', color: '#94A3B8' }}>© 2023 Carry On Logistics. All rights reserved.</span>
            <div style={{ display: 'flex', gap: '20px' }}>
              {['API Documentation', 'Security Policy', 'Terms of Service'].map((link) => (
                <button key={link} style={{ fontFamily: 'Inter', fontSize: '12px', color: '#64748B', background: 'none', border: 'none', cursor: 'pointer', padding: 0, textDecoration: 'underline', textDecorationColor: 'transparent' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#2563EB')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#64748B')}>
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
