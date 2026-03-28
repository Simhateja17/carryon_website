'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

/* ── Sidebar ─────────────────────────────────────────────────── */
const sideNav = [
  {
    label: 'Command Center',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <rect x="1" y="1" width="7" height="7" rx="1.5" fill="currentColor" />
        <rect x="10" y="1" width="7" height="7" rx="1.5" fill="currentColor" />
        <rect x="1" y="10" width="7" height="7" rx="1.5" fill="currentColor" />
        <rect x="10" y="10" width="7" height="7" rx="1.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: 'Live Map',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M9 1C6.239 1 4 3.239 4 6c0 4.5 5 11 5 11s5-6.5 5-11c0-2.761-2.239-5-5-5Z"
          stroke="currentColor" strokeWidth="1.5" fill="none" />
        <circle cx="9" cy="6" r="2" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: 'Orders',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <rect x="2" y="2" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M5 7h8M5 10h8M5 13h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: 'Drivers',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <circle cx="9" cy="6" r="3" stroke="currentColor" strokeWidth="1.5" />
        <path d="M3 16c0-3.314 2.686-6 6-6s6 2.686 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: 'Customers',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <circle cx="6.5" cy="6" r="2.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M1 15c0-3.038 2.462-5.5 5.5-5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="12.5" cy="6" r="2.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M17 15c0-3.038-2.462-5.5-5.5-5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: 'Revenue',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <polyline points="2,14 6,8 10,11 16,3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="2" y1="16" x2="16" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: 'Settings',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <circle cx="9" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M9 1v2M9 15v2M1 9h2M15 9h2M3.22 3.22l1.41 1.41M13.36 13.36l1.42 1.42M3.22 14.78l1.41-1.41M13.36 4.64l1.42-1.42"
          stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
];

function Sidebar() {
  const router = useRouter();
  return (
    <aside style={{
      width: '220px', height: '100vh', minHeight: '900px', flexShrink: 0,
      background: '#fff', borderRight: '1px solid #E2E8F0',
      display: 'flex', flexDirection: 'column',
    }}>
      {/* Logo */}
      <div style={{ padding: '20px 20px 16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{
          width: '32px', height: '32px', borderRadius: '8px', background: '#2563EB',
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M4 9L8 5L12 9L8 13L4 9Z" fill="white" />
            <path d="M8 9L12 5L16 9L12 13L8 9Z" fill="rgba(255,255,255,0.5)" />
          </svg>
        </div>
        <span style={{ fontFamily: 'Inter', fontSize: '18px', fontWeight: 700 }}>
          <span style={{ color: '#0F172A' }}>Carry </span>
          <span style={{ color: '#2563EB' }}>On</span>
        </span>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '8px 12px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
        {sideNav.map((item) => {
          const isActive = item.label === 'Customers';
          return (
            <button
              suppressHydrationWarning
              key={item.label}
              onClick={() => {
                if (item.label === 'Command Center') router.push('/command-center');
                else if (item.label === 'Live Map') router.push('/');
                else if (item.label === 'Orders') router.push('/orders');
                else if (item.label === 'Drivers') router.push('/drivers');
                else if (item.label === 'Customers') router.push('/customers');
                else if (item.label === 'Settings') router.push('/settings');
              }}
              style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                padding: '9px 12px', width: '100%', textAlign: 'left',
                background: isActive ? 'rgba(37,99,235,0.08)' : 'transparent',
                border: 'none', borderRadius: '8px', cursor: 'pointer',
                color: isActive ? '#2563EB' : '#64748B',
              }}
            >
              <span style={{ display: 'flex', color: isActive ? '#2563EB' : '#64748B', flexShrink: 0 }}>
                {item.icon}
              </span>
              <span style={{
                fontFamily: 'Inter', fontSize: '14px',
                fontWeight: isActive ? 600 : 400,
                color: isActive ? '#2563EB' : '#374151',
              }}>
                {item.label}
              </span>
              {isActive && (
                <span style={{
                  marginLeft: 'auto', width: '3px', height: '20px',
                  background: '#2563EB', borderRadius: '2px',
                }} />
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom */}
      <div style={{ padding: '12px 12px 20px', borderTop: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', gap: '2px' }}>
        <button suppressHydrationWarning style={{
          display: 'flex', alignItems: 'center', gap: '10px',
          padding: '9px 12px', width: '100%', background: 'transparent',
          border: 'none', borderRadius: '8px', cursor: 'pointer', textAlign: 'left',
        }}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <circle cx="9" cy="9" r="7.5" stroke="#64748B" strokeWidth="1.5" />
            <path d="M9 13v-4M9 7V5" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <span style={{ fontFamily: 'Inter', fontSize: '14px', color: '#374151' }}>Support</span>
        </button>
        <button suppressHydrationWarning style={{
          display: 'flex', alignItems: 'center', gap: '10px',
          padding: '9px 12px', width: '100%', background: 'transparent',
          border: 'none', borderRadius: '8px', cursor: 'pointer', textAlign: 'left',
        }}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M7 16H3a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h4" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M12 13l3-4-3-4M15 9H7" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span style={{ fontFamily: 'Inter', fontSize: '14px', color: '#374151' }}>Logout</span>
        </button>
      </div>
    </aside>
  );
}

/* ── Data ─────────────────────────────────────────────────────── */
const customers = [
  {
    id: 'CO-8942',
    est: 'EST. 2021',
    initials: 'SV',
    color: '#EFF6FF',
    textColor: '#2563EB',
    company: 'Swift Valley Retail',
    category: 'Retail & Consumer Goods',
    contact: 'Elena Rodriguez',
    role: 'Logistics Director',
    totalOrders: 1402,
    active: 12,
    revenue: '$1.2M',
    status: 'ACTIVE',
  },
  {
    id: 'CO-7712',
    est: 'EST. 2022',
    initials: 'AM',
    color: '#F0FDF4',
    textColor: '#16A34A',
    company: 'Apex Manufacturing',
    category: 'Industrial Parts',
    contact: 'Marcus Chen',
    role: 'Operations Manager',
    totalOrders: 890,
    active: 0,
    revenue: '$740K',
    status: 'INACTIVE',
  },
  {
    id: 'CO-9011',
    est: 'EST. 2023',
    initials: 'NF',
    color: '#EFF6FF',
    textColor: '#2563EB',
    company: 'Northern Fresh Foods',
    category: 'Perishables',
    contact: 'Sarah Jenkins',
    role: 'Cold Chain Lead',
    totalOrders: 2145,
    active: 45,
    revenue: '$3.1M',
    status: 'ACTIVE',
  },
];

/* ── Page ─────────────────────────────────────────────────────── */
export default function CustomersPage() {
  const [searchVal, setSearchVal] = useState('');

  return (
    <div style={{ display: 'flex', width: '100vw', minHeight: '100vh', background: '#F8FAFC', fontFamily: 'Inter, sans-serif' }}>
      <Sidebar />

      {/* Main */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'auto' }}>

        {/* Header */}
        <div style={{
          padding: '28px 32px 20px',
          display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
          background: '#F8FAFC',
        }}>
          <div>
            <h1 style={{ margin: 0, fontFamily: 'Inter', fontSize: '24px', fontWeight: 700, color: '#0F172A', lineHeight: '32px' }}>
              Customer Relations
            </h1>
            <p style={{ margin: '4px 0 0', fontFamily: 'Inter', fontSize: '14px', color: '#64748B' }}>
              Manage logistics partnerships and client accounts
            </p>
          </div>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <button suppressHydrationWarning style={{
              height: '38px', padding: '0 16px', borderRadius: '8px',
              background: '#fff', border: '1px solid #CBD5E1',
              fontFamily: 'Inter', fontSize: '13px', fontWeight: 600, color: '#374151',
              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px',
            }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7h10M7 2l5 5-5 5" stroke="#374151" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Export Data
            </button>
            <button suppressHydrationWarning style={{
              height: '38px', padding: '0 16px', borderRadius: '8px',
              background: '#2563EB', border: 'none',
              fontFamily: 'Inter', fontSize: '13px', fontWeight: 600, color: '#fff',
              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px',
            }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle cx="9" cy="5" r="3" stroke="white" strokeWidth="1.3" />
                <path d="M1 13c0-2.761 2.239-5 5-5" stroke="white" strokeWidth="1.3" strokeLinecap="round" />
                <path d="M11 8v4M9 10h4" stroke="white" strokeWidth="1.3" strokeLinecap="round" />
              </svg>
              Add New Customer
            </button>
          </div>
        </div>

        <div style={{ padding: '0 32px 32px', display: 'flex', flexDirection: 'column', gap: '20px' }}>

          {/* Stats Row — 12-col grid: 960×194px, 24px column-gap */}
          <div style={{
            width: '960px',
            height: '194px',
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gridTemplateRows: '1fr',
            columnGap: '24px',
            rowGap: '24px',
          }}>
            {/* Total Clients — span 3 cols */}
            <div style={{
              gridColumn: 'span 3',
              background: '#fff', borderRadius: '12px', padding: '20px 24px',
              border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <circle cx="7" cy="7" r="3" stroke="#2563EB" strokeWidth="1.5" />
                  <path d="M1 17c0-3.314 2.686-6 6-6" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" />
                  <circle cx="14" cy="7" r="3" stroke="#2563EB" strokeWidth="1.5" />
                  <path d="M19 17c0-3.314-2.686-6-6-6" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                <span style={{ fontFamily: 'Inter', fontSize: '11px', fontWeight: 600, color: '#64748B', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                  Total Clients
                </span>
              </div>
              <div style={{ fontFamily: 'Inter', fontSize: '32px', fontWeight: 700, color: '#0F172A', lineHeight: '1' }}>
                1,284
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M6 9V3M3 6l3-3 3 3" stroke="#16A34A" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span style={{ fontFamily: 'Inter', fontSize: '12px', color: '#16A34A', fontWeight: 500 }}>+12% vs last month</span>
              </div>
            </div>

            {/* Active Shipments — span 3 cols */}
            <div style={{
              gridColumn: 'span 3',
              background: '#fff', borderRadius: '12px', padding: '20px 24px',
              border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <rect x="1" y="6" width="12" height="9" rx="2" stroke="#2563EB" strokeWidth="1.5" />
                  <path d="M13 9.5h4l2 4H13V9.5Z" stroke="#2563EB" strokeWidth="1.5" strokeLinejoin="round" />
                  <circle cx="4.5" cy="17" r="1.5" fill="#2563EB" />
                  <circle cx="13.5" cy="17" r="1.5" fill="#2563EB" />
                </svg>
                <span style={{ fontFamily: 'Inter', fontSize: '11px', fontWeight: 600, color: '#64748B', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                  Active Shipments
                </span>
              </div>
              <div style={{ fontFamily: 'Inter', fontSize: '32px', fontWeight: 700, color: '#0F172A', lineHeight: '1' }}>
                452
              </div>
              <span style={{ fontFamily: 'Inter', fontSize: '12px', color: '#16A34A', fontWeight: 500 }}>92% On-time delivery</span>
            </div>

            {/* MRR Impact — span 3 cols */}
            <div style={{
              gridColumn: 'span 3',
              background: '#fff', borderRadius: '12px', padding: '20px 24px',
              border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <rect x="2" y="4" width="16" height="12" rx="2" stroke="#2563EB" strokeWidth="1.5" />
                  <path d="M10 8v4M8.5 9c0-.828.672-1.5 1.5-1.5h.5a1 1 0 1 1 0 2H10a1 1 0 0 0 0 2h.5c.828 0 1.5-.672 1.5-1.5"
                    stroke="#2563EB" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
                <span style={{ fontFamily: 'Inter', fontSize: '11px', fontWeight: 600, color: '#64748B', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                  MRR Impact
                </span>
              </div>
              <div style={{ fontFamily: 'Inter', fontSize: '32px', fontWeight: 700, color: '#0F172A', lineHeight: '1' }}>
                $2.4M
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M6 9V3M3 6l3-3 3 3" stroke="#16A34A" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span style={{ fontFamily: 'Inter', fontSize: '12px', color: '#16A34A', fontWeight: 500 }}>4.2% Growth</span>
              </div>
            </div>

            {/* Premium Tier Review — span 3 cols */}
            <div style={{
              gridColumn: 'span 3',
              background: '#2563EB', borderRadius: '12px', padding: '20px 24px',
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
            }}>
              <div>
                <div style={{ fontFamily: 'Inter', fontSize: '14px', fontWeight: 700, color: '#fff', marginBottom: '8px' }}>
                  Premium Tier Review
                </div>
                <div style={{ fontFamily: 'Inter', fontSize: '12px', color: 'rgba(255,255,255,0.85)', lineHeight: '1.5' }}>
                  4 High-value manufacturing clients are due for quarterly performance review.
                </div>
              </div>
              <button suppressHydrationWarning style={{
                width: '100%', height: '32px', borderRadius: '6px',
                background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.3)',
                fontFamily: 'Inter', fontSize: '12px', fontWeight: 600, color: '#fff',
                cursor: 'pointer', letterSpacing: '0.3px',
              }}>
                Start Audit
              </button>
            </div>
          </div>

          {/* Search + Filters */}
          <div style={{
            background: '#fff', borderRadius: '12px', border: '1px solid #E2E8F0',
            padding: '16px 20px',
            display: 'flex', alignItems: 'center', gap: '12px',
          }}>
            <div style={{ flex: 1, position: 'relative' }}>
              <svg style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
                width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M6.333 11.333A5 5 0 1 0 6.333 1.333a5 5 0 0 0 0 10ZM13 13l-2.733-2.733"
                  stroke="#94A3B8" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <input
                suppressHydrationWarning
                type="text"
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                placeholder="Search customers by name, ID or contact..."
                style={{
                  width: '100%', height: '38px', paddingLeft: '36px', paddingRight: '12px',
                  background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px',
                  fontFamily: 'Inter', fontSize: '13px', color: '#374151', outline: 'none',
                  boxSizing: 'border-box',
                }}
              />
            </div>
            {/* Filters */}
            {['Industry: All', 'Status: Active', 'Region: All'].map((f) => (
              <button suppressHydrationWarning key={f} style={{
                height: '38px', padding: '0 14px', borderRadius: '8px',
                background: '#fff', border: '1px solid #CBD5E1',
                fontFamily: 'Inter', fontSize: '13px', color: '#374151',
                cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap',
              }}>
                {f}
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M3 4.5l3 3 3-3" stroke="#64748B" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            ))}
            <button suppressHydrationWarning style={{
              width: '38px', height: '38px', borderRadius: '8px',
              background: '#2563EB', border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M2 4h12M4 8h8M6 12h4" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {/* Table */}
          <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #E2E8F0', overflow: 'hidden' }}>
            {/* Table Header */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '130px 1fr 140px 130px 100px 110px 80px',
              padding: '12px 20px',
              borderBottom: '1px solid #E2E8F0',
              background: '#F8FAFC',
            }}>
              {['Customer ID', 'Company Name', 'Contact Person', 'Total Orders', 'Revenue', 'Status', 'Actions'].map((h) => (
                <span key={h} style={{ fontFamily: 'Inter', fontSize: '11px', fontWeight: 600, color: '#64748B', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                  {h}
                </span>
              ))}
            </div>

            {/* Rows */}
            {customers.map((c, i) => (
              <div key={c.id} style={{
                display: 'grid',
                gridTemplateColumns: '130px 1fr 140px 130px 100px 110px 80px',
                padding: '18px 20px',
                borderBottom: i < customers.length - 1 ? '1px solid #F1F5F9' : 'none',
                alignItems: 'center',
              }}>
                {/* Customer ID */}
                <div>
                  <div style={{ fontFamily: 'Inter', fontSize: '13px', fontWeight: 600, color: '#0F172A' }}>{c.id}</div>
                  <div style={{ fontFamily: 'Inter', fontSize: '11px', color: '#94A3B8', marginTop: '2px' }}>{c.est}</div>
                </div>

                {/* Company */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '36px', height: '36px', borderRadius: '8px',
                    background: c.color, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <span style={{ fontFamily: 'Inter', fontSize: '12px', fontWeight: 700, color: c.textColor }}>{c.initials}</span>
                  </div>
                  <div>
                    <div style={{ fontFamily: 'Inter', fontSize: '13px', fontWeight: 600, color: '#0F172A' }}>{c.company}</div>
                    <div style={{ fontFamily: 'Inter', fontSize: '11px', color: '#94A3B8', marginTop: '2px' }}>{c.category}</div>
                  </div>
                </div>

                {/* Contact */}
                <div>
                  <div style={{ fontFamily: 'Inter', fontSize: '13px', color: '#0F172A' }}>{c.contact}</div>
                  <div style={{ fontFamily: 'Inter', fontSize: '11px', color: '#2563EB', marginTop: '2px' }}>{c.role}</div>
                </div>

                {/* Total Orders */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontFamily: 'Inter', fontSize: '13px', fontWeight: 600, color: '#0F172A' }}>{c.totalOrders.toLocaleString()}</span>
                  {c.active > 0 && (
                    <span style={{
                      padding: '2px 6px', borderRadius: '4px',
                      background: '#EFF6FF', fontFamily: 'Inter', fontSize: '10px', fontWeight: 600, color: '#2563EB',
                    }}>
                      +{c.active} active
                    </span>
                  )}
                  {c.active === 0 && (
                    <span style={{
                      padding: '2px 6px', borderRadius: '4px',
                      background: '#F1F5F9', fontFamily: 'Inter', fontSize: '10px', fontWeight: 600, color: '#94A3B8',
                    }}>
                      0 active
                    </span>
                  )}
                </div>

                {/* Revenue */}
                <div style={{ fontFamily: 'Inter', fontSize: '13px', fontWeight: 600, color: '#0F172A' }}>{c.revenue}</div>

                {/* Status */}
                <div>
                  <span style={{
                    padding: '4px 10px', borderRadius: '6px',
                    background: c.status === 'ACTIVE' ? '#DCFCE7' : '#F1F5F9',
                    fontFamily: 'Inter', fontSize: '11px', fontWeight: 700,
                    color: c.status === 'ACTIVE' ? '#16A34A' : '#64748B',
                    letterSpacing: '0.4px',
                  }}>
                    {c.status}
                  </span>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button suppressHydrationWarning style={{
                    width: '28px', height: '28px', borderRadius: '6px',
                    background: '#F8FAFC', border: '1px solid #E2E8F0', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <circle cx="7" cy="7" r="5.5" stroke="#64748B" strokeWidth="1.3" />
                      <path d="M7 5v2.5l1.5 1.5" stroke="#64748B" strokeWidth="1.3" strokeLinecap="round" />
                    </svg>
                  </button>
                  <button suppressHydrationWarning style={{
                    width: '28px', height: '28px', borderRadius: '6px',
                    background: '#F8FAFC', border: '1px solid #E2E8F0', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <circle cx="2" cy="7" r="1" fill="#64748B" />
                      <circle cx="7" cy="7" r="1" fill="#64748B" />
                      <circle cx="12" cy="7" r="1" fill="#64748B" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}

            {/* Pagination */}
            <div style={{
              padding: '14px 20px',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              borderTop: '1px solid #F1F5F9',
            }}>
              <span style={{ fontFamily: 'Inter', fontSize: '13px', color: '#64748B' }}>
                Showing 1-10 of 1,284 customers
              </span>
              <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                <button suppressHydrationWarning style={{
                  width: '32px', height: '32px', borderRadius: '6px',
                  background: '#fff', border: '1px solid #E2E8F0', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M7.5 9L4.5 6l3-3" stroke="#64748B" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                {[1, 2, 3].map((p) => (
                  <button suppressHydrationWarning key={p} style={{
                    width: '32px', height: '32px', borderRadius: '6px',
                    background: p === 1 ? '#2563EB' : '#fff',
                    border: p === 1 ? 'none' : '1px solid #E2E8F0',
                    fontFamily: 'Inter', fontSize: '13px', fontWeight: p === 1 ? 600 : 400,
                    color: p === 1 ? '#fff' : '#374151', cursor: 'pointer',
                  }}>
                    {p}
                  </button>
                ))}
                <button suppressHydrationWarning style={{
                  width: '32px', height: '32px', borderRadius: '6px',
                  background: '#fff', border: '1px solid #E2E8F0', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M4.5 3L7.5 6l-3 3" stroke="#64748B" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '16px', alignItems: 'start' }}>

            {/* Satisfaction Ratings */}
            <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #E2E8F0', padding: '20px 24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <span style={{ fontFamily: 'Inter', fontSize: '14px', fontWeight: 600, color: '#0F172A' }}>Satisfaction Ratings</span>
                <span style={{
                  background: '#EFF6FF', padding: '3px 10px', borderRadius: '999px',
                  fontFamily: 'Inter', fontSize: '13px', fontWeight: 700, color: '#2563EB',
                }}>4.8 Avg</span>
              </div>
              {[
                { name: 'Swift Valley Retail', stars: 5 },
                { name: 'Apex Manufacturing', stars: 3.5 },
              ].map((r) => (
                <div key={r.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <span style={{ fontFamily: 'Inter', fontSize: '13px', color: '#374151' }}>{r.name}</span>
                  <div style={{ display: 'flex', gap: '2px' }}>
                    {[1, 2, 3, 4, 5].map((s) => (
                      <svg key={s} width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M7 1l1.545 3.13L12 4.635l-2.5 2.435.59 3.437L7 8.635l-3.09 1.872.59-3.437L2 4.635l3.455-.505L7 1Z"
                          fill={s <= Math.floor(r.stars) ? '#FBBF24' : s - 0.5 <= r.stars ? '#FBBF24' : '#E2E8F0'}
                          stroke={s <= Math.ceil(r.stars) ? '#FBBF24' : '#E2E8F0'}
                          strokeWidth="0.5"
                        />
                      </svg>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Regional Distribution */}
            <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #E2E8F0', padding: '20px 24px' }}>
              <div style={{ fontFamily: 'Inter', fontSize: '14px', fontWeight: 600, color: '#0F172A', marginBottom: '16px' }}>
                Regional Distribution
              </div>
              <div style={{ height: '8px', borderRadius: '999px', overflow: 'hidden', display: 'flex', marginBottom: '12px' }}>
                <div style={{ width: '45%', background: '#2563EB' }} />
                <div style={{ width: '30%', background: '#60A5FA' }} />
                <div style={{ width: '25%', background: '#BFDBFE' }} />
              </div>
              <div style={{ display: 'flex', gap: '24px' }}>
                {[
                  { label: 'NA', pct: '45%', color: '#2563EB' },
                  { label: 'EU', pct: '30%', color: '#60A5FA' },
                  { label: 'APAC', pct: '25%', color: '#BFDBFE' },
                ].map((r) => (
                  <div key={r.label} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <span style={{ fontFamily: 'Inter', fontSize: '11px', fontWeight: 600, color: '#64748B' }}>{r.label}</span>
                    <span style={{ fontFamily: 'Inter', fontSize: '16px', fontWeight: 700, color: '#0F172A' }}>{r.pct}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Alert */}
            <div style={{
              background: '#fff', borderRadius: '12px', border: '1px solid #E2E8F0',
              padding: '16px 20px', minWidth: '220px',
              display: 'flex', gap: '12px', alignItems: 'flex-start',
            }}>
              <div style={{
                width: '36px', height: '36px', borderRadius: '8px', background: '#EFF6FF',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M14 7A5 5 0 0 0 4 7c0 6.5-3 8-3 8h16s-3-1.5-3-8M10.73 15a2 2 0 0 1-3.46 0"
                    stroke="#2563EB" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <div style={{ fontFamily: 'Inter', fontSize: '10px', fontWeight: 700, color: '#EF4444', letterSpacing: '0.5px', marginBottom: '4px' }}>
                  ALERT
                </div>
                <div style={{ fontFamily: 'Inter', fontSize: '12px', color: '#0F172A', lineHeight: '1.5', marginBottom: '6px' }}>
                  Invoice #882 overdue for Swift Valley Retail.
                </div>
                <button suppressHydrationWarning style={{
                  background: 'none', border: 'none', padding: 0,
                  fontFamily: 'Inter', fontSize: '11px', fontWeight: 700, color: '#2563EB',
                  cursor: 'pointer', textDecoration: 'underline',
                }}>
                  Resolve Now
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
