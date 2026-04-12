'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';

/* ── Orders data ─────────────────────────────────────────────── */
const orders = [
  {
    id: '#ORD-9421', customer: 'Global Logistics Corp', type: 'Retail Supply',
    destination: 'Chicago, IL', driver: 'Robert Mitchell', driverBg: '#DBEAFE', driverImage: '/order-driver-1.png',
    status: 'PENDING', statusBg: '#2F80ED', statusText: '#fff', statusBorder: 'none',
  },
  {
    id: '#ORD-9422', customer: 'Zenith Manufacturing', type: 'Industrial Goods',
    destination: 'Austin, TX', driver: 'Sarah Jenkins', driverBg: '#D1FAE5', driverImage: '/order-driver-2.png',
    status: 'IN-TRANSIT', statusBg: '#2F80ED', statusText: '#fff', statusBorder: 'none', statusWidth: '82.14px',
  },
  {
    id: '#ORD-9423', customer: 'Apex Fresh Market', type: 'Perishables',
    destination: 'Seattle, WA', driver: 'Michael Vance', driverBg: '#E2E8F0', driverImage: '/order-driver-3.png',
    status: 'DELAYED', statusBg: '#2F80ED', statusText: '#fff', statusBorder: 'none', statusWidth: '69.86px',
  },
  {
    id: '#ORD-9424', customer: 'Starlight Tech', type: 'Electronics',
    destination: 'Miami, FL', driver: 'Elena Rodriguez', driverBg: '#FEE2E2', driverImage: '/order-driver-4.png',
    status: 'DELIVERED', statusBg: '#B7DAF5', statusText: '#2F80ED',
    statusBorder: 'none', statusWidth: '78.84px',
  },
];

function DriverAvatar({ bg, initials, image, name }: { bg: string; initials: string; image?: string; name: string }) {
  return (
    <div style={{
      width: '24px', height: '24px', borderRadius: '50%', background: bg,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'Inter', fontSize: '9px', fontWeight: 700, color: '#374151', flexShrink: 0,
      overflow: 'hidden',
    }}>
      {image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={image} alt={name} style={{ width: '24px', height: '24px', borderRadius: '9999px', objectFit: 'cover' }} />
      ) : initials}
    </div>
  );
}

/* ── Chevron ─────────────────────────────────────────────────── */
function Chevron() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M3 4.5L6 7.5L9 4.5" stroke="#64748B" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ── Page ─────────────────────────────────────────────────────── */
const TOTAL_ORDERS = 1248;
const PER_PAGE = 10;
const TOTAL_PAGES = Math.ceil(TOTAL_ORDERS / PER_PAGE);

export default function OrdersPage() {
  const router = useRouter();
  const [selected, setSelected] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const toggleAll = () => {
    setSelected(selected.length === orders.length ? [] : orders.map((o) => o.id));
  };
  const toggle = (id: string) => {
    setSelected((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  };

  const goTo = (page: number) => {
    if (page < 1 || page > TOTAL_PAGES) return;
    setCurrentPage(page);
    setSelected([]);
  };

  const showingStart = (currentPage - 1) * PER_PAGE + 1;
  const showingEnd = Math.min(currentPage * PER_PAGE, TOTAL_ORDERS);

  /* visible page buttons: show up to 3 consecutive pages around current */
  const getPageNums = (): number[] => {
    if (currentPage <= 2) return [1, 2, 3];
    if (currentPage >= TOTAL_PAGES - 1) return [TOTAL_PAGES - 2, TOTAL_PAGES - 1, TOTAL_PAGES];
    return [currentPage - 1, currentPage, currentPage + 1];
  };
  const pageNums = getPageNums();

  return (
    <div style={{ display: 'flex', width: '100vw', minHeight: '100vh', background: '#F7F9FB' }}>
      <Sidebar />

      {/* Right column */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: '100vh', overflow: 'hidden' }}>

        {/* Navbar */}
        <header style={{
          height: '64px', flexShrink: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          paddingLeft: '32px', paddingRight: '32px',
          background: 'rgba(255,255,255,0.9)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid #F1F5F9',
          boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
          position: 'sticky', top: 0, zIndex: 20,
        }}>
          <div style={{ flex: 1, position: 'relative', maxWidth: '480px' }}>
            <svg style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
              width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M6.333 11.333A5 5 0 1 0 6.333 1.333a5 5 0 0 0 0 10ZM13 13l-2.733-2.733"
                stroke="#94A3B8" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <input suppressHydrationWarning type="text"
              placeholder="Search orders, tracking IDs, or customers..."
              style={{
                width: '100%', height: '40px', paddingLeft: '34px', paddingRight: '12px',
                background: '#F1F5F9', border: '1px solid #E2E8F0',
                borderRadius: '20px', fontFamily: 'Inter', fontSize: '13px',
                color: '#64748B', outline: 'none',
              }}
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            {[
              <svg key="bell" width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>,
              <svg key="sun" width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="3" stroke="#64748B" strokeWidth="1.5" /><path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" /></svg>,
              <svg key="help" width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="#64748B" strokeWidth="1.5" /><path d="M12 17v-2M12 9a2 2 0 1 1 0 4" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" /></svg>,
            ].map((icon, i) => (
              <button suppressHydrationWarning key={i} style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {icon}
              </button>
            ))}
            <div style={{
              width: '36px', height: '36px', borderRadius: '50%', background: '#FED7AA',
              display: 'flex', alignItems: 'flex-end', justifyContent: 'center', overflow: 'hidden', marginLeft: '8px',
            }}>
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <circle cx="14" cy="9" r="5" fill="#F97316" />
                <path d="M3 26c0-6.075 4.925-11 11-11s11 4.925 11 11" fill="#F97316" />
              </svg>
            </div>
          </div>
        </header>

        {/* Main content */}
        <div style={{ flex: 1, padding: '32px 32px 40px', overflowY: 'auto' }}>

          {/* Page header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '28px' }}>
            <div>
              <h1 style={{ fontFamily: 'Inter', fontSize: '28px', fontWeight: 700, color: '#0F172A', margin: 0, lineHeight: '1.2' }}>
                Order Management
              </h1>
              <p style={{ fontFamily: 'Inter', fontSize: '14px', color: '#64748B', margin: '6px 0 0' }}>
                Manage and monitor your fleet&apos;s active logistics operations.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <button suppressHydrationWarning style={{
                height: '40px', padding: '0 18px', borderRadius: '8px',
                background: '#EFF6FF', border: '1px solid #BFDBFE',
                fontFamily: 'Inter', fontSize: '13px', fontWeight: 600, color: '#2F80ED',
                cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px',
              }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M7 1v8M4 6l3 3 3-3" stroke="#2F80ED" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M1 10v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1" stroke="#2F80ED" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                Export CSV
              </button>
              <button suppressHydrationWarning type="button" onClick={() => router.push('/orders/create')} style={{
                height: '40px', padding: '0 20px', borderRadius: '8px',
                background: '#2F80ED', border: 'none',
                fontFamily: 'Inter', fontSize: '13px', fontWeight: 700, color: '#fff',
                cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px',
              }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <circle cx="7" cy="7" r="6" stroke="white" strokeWidth="1.4" />
                  <path d="M7 4v6M4 7h6" stroke="white" strokeWidth="1.4" strokeLinecap="round" />
                </svg>
                CREATE NEW ORDER
              </button>
            </div>
          </div>

          {/* Filters + Efficiency row — 12-col grid, 24px gap */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            columnGap: '24px',
            rowGap: '24px',
            marginBottom: '24px',
            alignItems: 'stretch',
          }}>

            {/* Filter card — col 1-9 */}
            <div style={{
              gridColumn: '1 / span 9',
              background: '#fff',
              borderRadius: '12px',
              boxShadow: '0px 1px 2px 0px rgba(0,0,0,0.05)',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
            }}>
              {/* Header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/global-logistics-filters-icon.png" alt="" style={{ width: '18px', height: '12px', display: 'block' }} />
                <span style={{
                  fontFamily: 'Manrope', fontWeight: 700, fontSize: '14px',
                  lineHeight: '20px', letterSpacing: '0.7px',
                  color: '#64748B', textTransform: 'uppercase',
                }}>
                  Global Logistics Filters
                </span>
              </div>

              {/* 4-column filter grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                columnGap: '16px',
                rowGap: '16px',
              }}>
                {/* Date Range */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <span style={{
                    fontFamily: 'Inter', fontWeight: 700, fontSize: '10px',
                    lineHeight: '15px', textTransform: 'uppercase', color: '#2F80ED',
                  }}>
                    Date Range
                  </span>
                  <div style={{
                    width: '154.5px', height: '32px', borderRadius: '8px', border: 'none',
                    background: '#F2F4F6', display: 'flex', alignItems: 'center',
                    padding: '0 10px', gap: '8px', cursor: 'pointer',
                  }}>
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                      <rect x="1" y="2" width="11" height="10" rx="1.5" stroke="#2F80ED" strokeWidth="1.2" />
                      <path d="M1 5h11M4 1v2M9 1v2" stroke="#2F80ED" strokeWidth="1.2" strokeLinecap="round" />
                    </svg>
                    <span style={{ fontFamily: 'Inter', fontWeight: 400, fontSize: '12px', lineHeight: '16px', color: '#2F80ED', flex: 1 }}>
                      Last 30 Days
                    </span>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M3 4.5L6 7.5L9 4.5" stroke="#2F80ED" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>

                {/* Status */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <span style={{
                    fontFamily: 'Inter', fontWeight: 700, fontSize: '10px',
                    lineHeight: '15px', textTransform: 'uppercase', color: '#2F80ED',
                  }}>
                    Status
                  </span>
                  <div style={{
                    width: '154.5px', height: '32px', borderRadius: '8px', border: 'none',
                    background: '#F2F4F6', display: 'flex', alignItems: 'center',
                    padding: '0 10px', gap: '8px', cursor: 'pointer',
                  }}>
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                      <rect x="1" y="1" width="5" height="5" rx="1" stroke="#2F80ED" strokeWidth="1.2" />
                      <rect x="7" y="1" width="5" height="5" rx="1" stroke="#2F80ED" strokeWidth="1.2" />
                      <rect x="1" y="7" width="5" height="5" rx="1" stroke="#2F80ED" strokeWidth="1.2" />
                      <rect x="7" y="7" width="5" height="5" rx="1" stroke="#2F80ED" strokeWidth="1.2" />
                    </svg>
                    <span style={{ fontFamily: 'Inter', fontWeight: 400, fontSize: '12px', lineHeight: '16px', color: '#2F80ED', flex: 1 }}>
                      All Statuses
                    </span>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M3 4.5L6 7.5L9 4.5" stroke="#2F80ED" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>

                {/* Vehicle Type */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <span style={{
                    fontFamily: 'Inter', fontWeight: 700, fontSize: '10px',
                    lineHeight: '15px', textTransform: 'uppercase', color: '#2F80ED',
                  }}>
                    Vehicle Type
                  </span>
                  <div style={{
                    width: '154.5px', height: '32px', borderRadius: '8px', border: 'none',
                    background: '#F2F4F6', display: 'flex', alignItems: 'center',
                    padding: '0 10px', gap: '8px', cursor: 'pointer',
                  }}>
                    <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
                      <rect x="1" y="3" width="10" height="7" rx="1.2" stroke="#2F80ED" strokeWidth="1.2" />
                      <path d="M11 5h2.5l1.5 3H11V5Z" stroke="#2F80ED" strokeWidth="1.2" strokeLinejoin="round" />
                      <circle cx="4" cy="11" r="1.2" fill="#2F80ED" />
                      <circle cx="11.5" cy="11" r="1.2" fill="#2F80ED" />
                    </svg>
                    <span style={{ fontFamily: 'Inter', fontWeight: 400, fontSize: '12px', lineHeight: '16px', color: '#2F80ED', flex: 1 }}>
                      All Vehicles
                    </span>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M3 4.5L6 7.5L9 4.5" stroke="#2F80ED" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>

                {/* Clear All */}
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                  <button suppressHydrationWarning style={{
                    height: '32px', borderRadius: '8px',
                    background: '#B7DAF5', border: 'none',
                    fontFamily: 'Inter', fontWeight: 600, fontSize: '12px',
                    lineHeight: '16px', letterSpacing: '0px',
                    color: '#1a5fa8', cursor: 'pointer', textTransform: 'uppercase',
                  }}>
                    Clear All
                  </button>
                </div>
              </div>
            </div>

            {/* On-Time Efficiency card — col 10-12 */}
            <div style={{
              gridColumn: '10 / span 3',
              background: 'linear-gradient(135deg, #2F80ED 0%, #2170E4 100%)',
              borderRadius: '12px',
              boxShadow: '0px 8px 10px -6px rgba(0,0,0,0.1), 0px 20px 25px -5px rgba(0,0,0,0.1)',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span style={{
                  fontFamily: 'Inter', fontWeight: 600, fontSize: '10px',
                  lineHeight: '15px', letterSpacing: '1px',
                  color: 'rgba(255,255,255,0.75)', textTransform: 'uppercase',
                }}>
                  On-Time Efficiency
                </span>
                <span style={{
                  fontFamily: 'Manrope', fontWeight: 800, fontSize: '36px',
                  lineHeight: '40px', color: '#fff',
                }}>
                  94.2%
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 10L7 5L12 10" stroke="rgba(255,255,255,0.9)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span style={{ fontFamily: 'Inter', fontWeight: 400, fontSize: '12px', lineHeight: '16px', color: 'rgba(255,255,255,0.9)' }}>
                  +2.4% from last month
                </span>
              </div>
            </div>
          </div>

          {/* Orders table card */}
          <div style={{
            background: '#fff',
            borderRadius: '12px',
            boxShadow: '0px 1px 2px 0px rgba(0,0,0,0.05)',
            overflow: 'hidden',
          }}>

            {/* Toolbar — height 69px */}
            <div style={{
              height: '69px',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              paddingLeft: '32px', paddingRight: '32px',
              borderBottom: '1px solid #ECEEF0',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                {/* Select All */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <input
                    suppressHydrationWarning
                    type="checkbox"
                    checked={selected.length === orders.length}
                    onChange={toggleAll}
                    style={{ width: '16px', height: '16px', cursor: 'pointer', accentColor: '#2F80ED' }}
                  />
                  <span style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: '14px', lineHeight: '20px', color: '#191C1E' }}>
                    Select All (142 orders)
                  </span>
                </div>

                {/* Bulk Edit */}
                <button suppressHydrationWarning style={{
                  display: 'flex', alignItems: 'center', gap: '4px',
                  background: 'none', border: 'none', cursor: 'pointer',
                  fontFamily: 'Inter', fontWeight: 600, fontSize: '12px',
                  lineHeight: '16px', color: '#374151',
                  padding: '6px 0',
                }}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 7h10M2 4h7M2 10h5" stroke="#374151" strokeWidth="1.3" strokeLinecap="round" />
                  </svg>
                  Bulk Edit
                </button>

                {/* Delete */}
                <button suppressHydrationWarning style={{
                  display: 'flex', alignItems: 'center', gap: '4px',
                  background: '#191C1E', border: 'none', cursor: 'pointer',
                  fontFamily: 'Inter', fontWeight: 600, fontSize: '12px',
                  lineHeight: '16px', color: '#fff',
                  padding: '6px 12px', borderRadius: '8px',
                }}>
                  <svg width="12" height="13" viewBox="0 0 12 13" fill="none">
                    <path d="M1 3h10M4.5 3V2a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1M10 3l-.8 8a1 1 0 0 1-1 .9H3.8a1 1 0 0 1-1-.9L2 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Delete
                </button>
              </div>

              {/* Showing text */}
              <span style={{ fontFamily: 'Inter', fontWeight: 400, fontSize: '12px', color: '#94A3B8' }}>
                Showing {showingStart}–{showingEnd} of {TOTAL_ORDERS.toLocaleString()} orders
              </span>
            </div>

            {/* Column headers — height 44px */}
            <div style={{
              height: '44px',
              display: 'grid',
              gridTemplateColumns: '186px 194px 149px 187px 130px 1fr',
              background: 'rgba(242,244,246,0.5)',
            }}>
              {[
                { label: 'Order ID', align: 'left' as const, pl: '32px', pr: '32px' },
                { label: 'Customer', align: 'left' as const, pl: '24px', pr: '24px' },
                { label: 'Destination', align: 'left' as const, pl: '24px', pr: '24px' },
                { label: 'Assigned Driver', align: 'left' as const, pl: '24px', pr: '24px' },
                { label: 'Status', align: 'left' as const, pl: '24px', pr: '24px' },
                { label: 'Actions', align: 'right' as const, pl: '32px', pr: '32px' },
              ].map((col) => (
                <div key={col.label} style={{
                  display: 'flex', alignItems: 'center',
                  justifyContent: col.align === 'right' ? 'flex-end' : 'flex-start',
                  paddingLeft: col.pl, paddingRight: col.pr,
                }}>
                  <span style={{
                    fontFamily: 'Inter', fontWeight: 700, fontSize: '10px',
                    lineHeight: '12px', letterSpacing: '0.5px',
                    color: '#424754', textTransform: 'uppercase',
                  }}>
                    {col.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Table rows */}
            <div>
              {orders.map((order, i) => (
                <div key={order.id} style={{
                  height: '84.5px',
                  display: 'grid',
                  gridTemplateColumns: '186px 194px 149px 187px 130px 1fr',
                  borderBottom: i < orders.length - 1 ? '1px solid #ECEEF0' : 'none',
                  background: '#fff',
                  alignItems: 'center',
                }}>
                  {/* Order ID */}
                  <div style={{ paddingLeft: '32px', paddingRight: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <input
                      suppressHydrationWarning
                      type="checkbox"
                      checked={selected.includes(order.id)}
                      onChange={() => toggle(order.id)}
                      style={{ width: '15px', height: '15px', cursor: 'pointer', accentColor: '#2F80ED', flexShrink: 0 }}
                    />
                    <span style={{ fontFamily: 'Manrope', fontWeight: 700, fontSize: '16px', lineHeight: '100%', color: '#2F80ED' }}>
                      {order.id}
                    </span>
                  </div>

                  {/* Customer */}
                  <div style={{ paddingLeft: '0', paddingRight: '16px' }}>
                    <div style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: '14px', lineHeight: '20px', color: '#191C1E' }}>
                      {order.customer}
                    </div>
                    <div style={{ fontFamily: 'Inter', fontWeight: 400, fontSize: '10px', lineHeight: '100%', color: '#2F80ED', marginTop: '4px' }}>
                      {order.type}
                    </div>
                  </div>

                  {/* Destination */}
                  <div style={{ paddingLeft: '0', paddingRight: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src="/order-destination-icon.png"
                        alt="Destination"
                        style={{ width: '10.6667px', height: '13.3333px', objectFit: 'contain', flexShrink: 0 }}
                      />
                      <span style={{ fontFamily: 'Inter', fontWeight: 400, fontSize: '14px', lineHeight: '20px', color: '#191C1E' }}>
                        {order.destination}
                      </span>
                    </div>
                  </div>

                  {/* Assigned Driver */}
                  <div style={{ paddingLeft: '0', paddingRight: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <DriverAvatar
                        bg={order.driverBg}
                        initials={order.driver.split(' ').map((n) => n[0]).join('')}
                        image={order.driverImage}
                        name={order.driver}
                      />
                      <span style={{ fontFamily: 'Inter', fontWeight: 400, fontSize: '14px', lineHeight: '20px', color: '#191C1E' }}>
                        {order.driver}
                      </span>
                    </div>
                  </div>

                  {/* Status */}
                  <div style={{ paddingTop: '32px', paddingRight: '32px', paddingBottom: '32.5px', paddingLeft: '0', display: 'flex', alignItems: 'center' }}>
                    <span style={{
                      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                      width: (order as { statusWidth?: string }).statusWidth ?? 'auto',
                      height: '20px',
                      padding: '4px 12px', borderRadius: '9999px',
                      background: order.statusBg,
                      border: order.statusBorder,
                      fontFamily: 'Inter', fontWeight: 700, fontSize: '10px',
                      lineHeight: '100%', letterSpacing: '0px',
                      color: order.statusText, whiteSpace: 'nowrap',
                      textTransform: 'uppercase',
                    }}>
                      {order.status}
                    </span>
                  </div>

                  {/* Actions */}
                  <div style={{ paddingRight: '32px', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                    <button suppressHydrationWarning style={{
                      background: 'none', border: 'none', cursor: 'pointer',
                      color: '#94A3B8', display: 'flex', alignItems: 'center', padding: '4px',
                    }}>
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <circle cx="9" cy="4" r="1.2" fill="#94A3B8" />
                        <circle cx="9" cy="9" r="1.2" fill="#94A3B8" />
                        <circle cx="9" cy="14" r="1.2" fill="#94A3B8" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination — height 87px */}
            <div style={{
              height: '87px',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              paddingLeft: '32px', paddingRight: '32px',
              borderTop: '1px solid #ECEEF0',
            }}>
              {/* Previous */}
              <button
                suppressHydrationWarning
                onClick={() => goTo(currentPage - 1)}
                disabled={currentPage === 1}
                style={{
                  height: '38px', padding: '8px 16px', borderRadius: '8px',
                  background: 'transparent', border: '1px solid #2F80ED',
                  fontFamily: 'Inter', fontWeight: 600, fontSize: '14px',
                  lineHeight: '20px', color: '#2F80ED',
                  cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                  opacity: currentPage === 1 ? 0.5 : 1,
                  transition: 'opacity 0.15s',
                }}
              >
                Previous
              </button>

              {/* Page numbers */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {pageNums.map((n) => (
                  <button
                    suppressHydrationWarning
                    key={n}
                    onClick={() => goTo(n)}
                    style={{
                      width: '32px', height: '32px', borderRadius: '8px',
                      background: n === currentPage ? '#2F80ED' : 'transparent',
                      border: 'none',
                      fontFamily: 'Inter',
                      fontWeight: n === currentPage ? 700 : 500,
                      fontSize: '14px', lineHeight: '20px',
                      color: n === currentPage ? '#fff' : '#191C1E',
                      cursor: 'pointer',
                    }}
                  >
                    {n}
                  </button>
                ))}
                {pageNums[pageNums.length - 1] < TOTAL_PAGES - 1 && (
                  <div style={{ padding: '0 8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontFamily: 'Inter', fontSize: '14px', color: '#94A3B8' }}>...</span>
                  </div>
                )}
                {pageNums[pageNums.length - 1] < TOTAL_PAGES && (
                  <button
                    suppressHydrationWarning
                    onClick={() => goTo(TOTAL_PAGES)}
                    style={{
                      width: '32px', height: '32px', borderRadius: '8px',
                      background: currentPage === TOTAL_PAGES ? '#2F80ED' : 'transparent',
                      border: 'none',
                      fontFamily: 'Inter', fontWeight: currentPage === TOTAL_PAGES ? 700 : 400,
                      fontSize: '14px', lineHeight: '20px',
                      color: currentPage === TOTAL_PAGES ? '#fff' : '#191C1E',
                      cursor: 'pointer',
                    }}
                  >
                    {TOTAL_PAGES}
                  </button>
                )}
              </div>

              {/* Next */}
              <button
                suppressHydrationWarning
                onClick={() => goTo(currentPage + 1)}
                disabled={currentPage === TOTAL_PAGES}
                style={{
                  height: '38px', padding: '8px 16px', borderRadius: '8px',
                  background: 'transparent', border: '1px solid #2F80ED',
                  fontFamily: 'Inter', fontWeight: 600, fontSize: '14px',
                  lineHeight: '20px', color: '#2F80ED',
                  cursor: currentPage === TOTAL_PAGES ? 'not-allowed' : 'pointer',
                  opacity: currentPage === TOTAL_PAGES ? 0.5 : 1,
                  transition: 'opacity 0.15s',
                }}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
