'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import { getAdminBookings } from '@/lib/api';
import { toOrderViewModel, type OrderViewModel } from '@/lib/adminOperations';
import type { BookingStatus } from '@/types';

const PER_PAGE = 10;

const STATUS_OPTIONS: { value: string; label: string }[] = [
  { value: 'all', label: 'All Statuses' },
  { value: 'PENDING', label: 'Pending' },
  { value: 'SEARCHING_DRIVER', label: 'Searching Driver' },
  { value: 'DRIVER_ASSIGNED', label: 'Driver Assigned' },
  { value: 'IN_TRANSIT', label: 'In Transit' },
  { value: 'DELIVERED', label: 'Delivered' },
  { value: 'CANCELLED', label: 'Cancelled' },
];

const VEHICLE_OPTIONS: { value: string; label: string }[] = [
  { value: 'all', label: 'All Vehicles' },
  { value: 'BIKE', label: 'Bike' },
  { value: 'CAR', label: 'Car' },
  { value: 'PICKUP', label: 'Pickup' },
  { value: 'VAN_7FT', label: 'Van 7ft' },
  { value: 'VAN_9FT', label: 'Van 9ft' },
  { value: 'LORRY_10FT', label: 'Lorry 10ft' },
  { value: 'LORRY_14FT', label: 'Lorry 14ft' },
  { value: 'LORRY_17FT', label: 'Lorry 17ft' },
];

const DATE_OPTIONS: { value: string; label: string }[] = [
  { value: '7', label: 'Last 7 Days' },
  { value: '30', label: 'Last 30 Days' },
  { value: '90', label: 'Last 90 Days' },
  { value: 'all', label: 'All Time' },
];

/* ── Helpers ─────────────────────────────────────────────── */
function dateFromDaysAgo(days: string): string | undefined {
  if (days === 'all') return undefined;
  return new Date(Date.now() - Number(days) * 86_400_000).toISOString();
}

function exportCsv(orders: OrderViewModel[]) {
  const header = 'Order ID,Customer,Type,Destination,Driver,Status,Created\n';
  const rows = orders.map((o) =>
    [o.id, o.customer, o.customerType, o.destination, o.driverName, o.displayStatus, o.createdAt]
      .map((v) => `"${String(v).replace(/"/g, '""')}"`)
      .join(',')
  ).join('\n');
  const blob = new Blob([header + rows], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `orders-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

/* ── Components ──────────────────────────────────────────── */
function DriverAvatar({ bg, initials, photo, name }: { bg: string; initials: string; photo?: string | null; name: string }) {
  return (
    <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter', fontSize: '9px', fontWeight: 700, color: '#fff', flexShrink: 0, overflow: 'hidden' }}>
      {photo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={photo} alt={name} style={{ width: '24px', height: '24px', borderRadius: '9999px', objectFit: 'cover' }} />
      ) : initials}
    </div>
  );
}

function SkeletonRow() {
  return (
    <div style={{ height: '84.5px', display: 'grid', gridTemplateColumns: '186px 194px 149px 187px 130px 1fr', borderBottom: '1px solid #ECEEF0', alignItems: 'center' }}>
      {[{ w: 120, pl: 32 }, { w: 140, pl: 0 }, { w: 100, pl: 0 }, { w: 130, pl: 0 }, { w: 70, pl: 0 }, { w: 20, pl: 0 }].map((col, i) => (
        <div key={i} style={{ paddingLeft: col.pl }}>
          <div style={{ width: `${col.w}px`, height: '12px', borderRadius: '6px', background: 'linear-gradient(90deg,#F1F5F9 25%,#E2E8F0 50%,#F1F5F9 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.4s infinite' }} />
        </div>
      ))}
    </div>
  );
}

const selectStyle: React.CSSProperties = {
  height: '32px', borderRadius: '8px', background: '#F2F4F6', border: 'none',
  fontFamily: 'Inter', fontSize: '12px', color: '#2F80ED',
  padding: '0 24px 0 10px', cursor: 'pointer', outline: 'none',
  appearance: 'none', WebkitAppearance: 'none',
  backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M3 4.5L6 7.5L9 4.5' stroke='%232F80ED' stroke-width='1.2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'right 8px center',
  width: '100%',
};

/* ── Page ─────────────────────────────────────────────────── */
export default function OrdersPage() {
  const router = useRouter();

  // Filter state
  const [statusFilter, setStatusFilter] = useState('all');
  const [vehicleFilter, setVehicleFilter] = useState('all');
  const [dateRange, setDateRange] = useState('30');
  const [searchInput, setSearchInput] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  // Data state
  const [orders, setOrders] = useState<OrderViewModel[]>([]);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selected, setSelected] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [retryCounter, setRetryCounter] = useState(0);

  // Debounce search input (300ms)
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchInput), 300);
    return () => clearTimeout(timer);
  }, [searchInput]);

  // Reset to page 1 when filters change
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) { isFirstRender.current = false; return; }
    setCurrentPage(1);
  }, [statusFilter, vehicleFilter, dateRange, debouncedSearch]);

  // Main data fetch — re-runs on page, filters, or retry
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError('');

    getAdminBookings({
      page: currentPage,
      limit: PER_PAGE,
      status: statusFilter !== 'all' ? statusFilter as BookingStatus : undefined,
      vehicleType: vehicleFilter !== 'all' ? vehicleFilter : undefined,
      search: debouncedSearch || undefined,
      dateFrom: dateFromDaysAgo(dateRange),
    })
      .then((res) => {
        if (cancelled) return;
        setOrders(res.data.map(toOrderViewModel));
        setTotalOrders(res.total);
        setTotalPages(res.totalPages);
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : 'Failed to load orders');
      })
      .finally(() => {
        if (cancelled) return;
        setLoading(false);
      });

    return () => { cancelled = true; };
  }, [currentPage, statusFilter, vehicleFilter, dateRange, debouncedSearch, retryCounter]);

  const clearAllFilters = useCallback(() => {
    setStatusFilter('all');
    setVehicleFilter('all');
    setDateRange('30');
    setSearchInput('');
    setDebouncedSearch('');
  }, []);

  const toggleAll = () => setSelected(selected.length === orders.length ? [] : orders.map((o) => o.id));
  const toggle = (id: string) => setSelected((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);

  const goTo = (page: number) => {
    if (page < 1 || page > totalPages || loading) return;
    setCurrentPage(page);
    setSelected([]);
  };

  const showingStart = totalOrders === 0 ? 0 : (currentPage - 1) * PER_PAGE + 1;
  const showingEnd = Math.min(currentPage * PER_PAGE, totalOrders);

  const getPageNums = (): number[] => {
    if (totalPages <= 3) return Array.from({ length: totalPages }, (_, i) => i + 1);
    if (currentPage <= 2) return [1, 2, 3];
    if (currentPage >= totalPages - 1) return [totalPages - 2, totalPages - 1, totalPages];
    return [currentPage - 1, currentPage, currentPage + 1];
  };
  const pageNums = getPageNums();

  const hasActiveFilters = statusFilter !== 'all' || vehicleFilter !== 'all' || dateRange !== '30' || debouncedSearch.length > 0;

  return (
    <div style={{ display: 'flex', width: '100vw', minHeight: '100vh', background: '#F7F9FB' }}>
      <style>{`@keyframes shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}`}</style>
      <Sidebar />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: '100vh', overflow: 'hidden' }}>

        {/* Navbar */}
        <header style={{ height: '64px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingLeft: '32px', paddingRight: '32px', background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(12px)', borderBottom: '1px solid #F1F5F9', boxShadow: '0 1px 2px rgba(0,0,0,0.05)', position: 'sticky', top: 0, zIndex: 20 }}>
          <div style={{ flex: 1, position: 'relative', maxWidth: '480px' }}>
            <svg style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M6.333 11.333A5 5 0 1 0 6.333 1.333a5 5 0 0 0 0 10ZM13 13l-2.733-2.733" stroke="#94A3B8" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <input
              suppressHydrationWarning
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search orders, tracking IDs, or customers..."
              style={{ width: '100%', height: '40px', paddingLeft: '34px', paddingRight: '12px', background: '#F1F5F9', border: '1px solid #E2E8F0', borderRadius: '20px', fontFamily: 'Inter', fontSize: '13px', color: '#334155', outline: 'none' }}
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            {([
              <svg key="bell" width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>,
              <svg key="sun" width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="3" stroke="#64748B" strokeWidth="1.5" /><path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" /></svg>,
              <svg key="help" width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="#64748B" strokeWidth="1.5" /><path d="M12 17v-2M12 9a2 2 0 1 1 0 4" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" /></svg>,
            ] as React.ReactNode[]).map((icon, i) => (
              <button suppressHydrationWarning key={i} style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{icon}</button>
            ))}
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#FED7AA', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', overflow: 'hidden', marginLeft: '8px' }}>
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><circle cx="14" cy="9" r="5" fill="#F97316" /><path d="M3 26c0-6.075 4.925-11 11-11s11 4.925 11 11" fill="#F97316" /></svg>
            </div>
          </div>
        </header>

        {/* Main content */}
        <div style={{ flex: 1, padding: '32px 32px 40px', overflowY: 'auto' }}>

          {/* Page header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '28px' }}>
            <div>
              <h1 style={{ fontFamily: 'Inter', fontSize: '28px', fontWeight: 700, color: '#0F172A', margin: 0, lineHeight: '1.2' }}>Order Management</h1>
              <p style={{ fontFamily: 'Inter', fontSize: '14px', color: '#64748B', margin: '6px 0 0' }}>Manage and monitor your fleet&apos;s active logistics operations.</p>
            </div>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <button suppressHydrationWarning onClick={() => exportCsv(orders)} disabled={orders.length === 0} style={{ height: '40px', padding: '0 18px', borderRadius: '8px', background: '#EFF6FF', border: '1px solid #BFDBFE', fontFamily: 'Inter', fontSize: '13px', fontWeight: 600, color: '#2F80ED', cursor: orders.length === 0 ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: '6px', opacity: orders.length === 0 ? 0.5 : 1 }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1v8M4 6l3 3 3-3" stroke="#2F80ED" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><path d="M1 10v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1" stroke="#2F80ED" strokeWidth="1.5" strokeLinecap="round" /></svg>
                Export CSV
              </button>
            </div>
          </div>

          {/* Filters + Efficiency row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', columnGap: '24px', rowGap: '24px', marginBottom: '24px', alignItems: 'stretch' }}>
            <div style={{ gridColumn: '1 / span 9', background: '#fff', borderRadius: '12px', boxShadow: '0px 1px 2px 0px rgba(0,0,0,0.05)', padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/global-logistics-filters-icon.png" alt="" style={{ width: '18px', height: '12px', display: 'block' }} />
                <span style={{ fontFamily: 'Manrope', fontWeight: 700, fontSize: '14px', lineHeight: '20px', letterSpacing: '0.7px', color: '#64748B', textTransform: 'uppercase' }}>Global Logistics Filters</span>
                {hasActiveFilters && <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#2F80ED', flexShrink: 0 }} />}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', columnGap: '16px' }}>
                {/* Date Range */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <span style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: '10px', textTransform: 'uppercase', color: '#2F80ED' }}>Date Range</span>
                  <select value={dateRange} onChange={(e) => setDateRange(e.target.value)} style={selectStyle}>
                    {DATE_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                </div>
                {/* Status */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <span style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: '10px', textTransform: 'uppercase', color: '#2F80ED' }}>Status</span>
                  <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} style={selectStyle}>
                    {STATUS_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                </div>
                {/* Vehicle Type */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <span style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: '10px', textTransform: 'uppercase', color: '#2F80ED' }}>Vehicle Type</span>
                  <select value={vehicleFilter} onChange={(e) => setVehicleFilter(e.target.value)} style={selectStyle}>
                    {VEHICLE_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                </div>
                {/* Clear All */}
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                  <button suppressHydrationWarning onClick={clearAllFilters} style={{ height: '32px', borderRadius: '8px', background: hasActiveFilters ? '#2F80ED' : '#B7DAF5', border: 'none', fontFamily: 'Inter', fontWeight: 600, fontSize: '12px', color: hasActiveFilters ? '#fff' : '#1a5fa8', cursor: 'pointer', textTransform: 'uppercase', transition: 'background 0.15s' }}>Clear All</button>
                </div>
              </div>
            </div>
            <div style={{ gridColumn: '10 / span 3', background: 'linear-gradient(135deg,#2F80ED 0%,#2170E4 100%)', borderRadius: '12px', boxShadow: '0px 8px 10px -6px rgba(0,0,0,0.1),0px 20px 25px -5px rgba(0,0,0,0.1)', padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: '10px', letterSpacing: '1px', color: 'rgba(255,255,255,0.75)', textTransform: 'uppercase' }}>On-Time Efficiency</span>
                <span style={{ fontFamily: 'Manrope', fontWeight: 800, fontSize: '36px', lineHeight: '40px', color: '#fff' }}>94.2%</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 10L7 5L12 10" stroke="rgba(255,255,255,0.9)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                <span style={{ fontFamily: 'Inter', fontSize: '12px', color: 'rgba(255,255,255,0.9)' }}>+2.4% from last month</span>
              </div>
            </div>
          </div>

          {/* Error banner */}
          {error && (
            <div style={{ marginBottom: '16px', padding: '12px 16px', background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '8px', fontFamily: 'Inter', fontSize: '13px', color: '#DC2626', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="#DC2626" strokeWidth="1.4" /><path d="M8 5v4M8 11v.5" stroke="#DC2626" strokeWidth="1.4" strokeLinecap="round" /></svg>
              {error}
              <button suppressHydrationWarning onClick={() => setRetryCounter((c) => c + 1)} style={{ marginLeft: 'auto', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Inter', fontSize: '12px', color: '#DC2626', fontWeight: 600 }}>Retry</button>
            </div>
          )}

          {/* Orders table */}
          <div style={{ background: '#fff', borderRadius: '12px', boxShadow: '0px 1px 2px 0px rgba(0,0,0,0.05)', overflow: 'hidden' }}>

            {/* Toolbar */}
            <div style={{ height: '69px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingLeft: '32px', paddingRight: '32px', borderBottom: '1px solid #ECEEF0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <input suppressHydrationWarning type="checkbox" checked={orders.length > 0 && selected.length === orders.length} onChange={toggleAll} style={{ width: '16px', height: '16px', cursor: 'pointer', accentColor: '#2F80ED' }} />
                  <span style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: '14px', color: '#191C1E' }}>
                    Select All ({totalOrders.toLocaleString()} orders)
                  </span>
                </div>
                <button suppressHydrationWarning style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Inter', fontWeight: 600, fontSize: '12px', color: '#374151', padding: '6px 0' }}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M2 4h7M2 10h5" stroke="#374151" strokeWidth="1.3" strokeLinecap="round" /></svg>
                  Bulk Edit
                </button>
                <button suppressHydrationWarning disabled={selected.length === 0} style={{ display: 'flex', alignItems: 'center', gap: '4px', background: selected.length > 0 ? '#191C1E' : '#94A3B8', border: 'none', cursor: selected.length > 0 ? 'pointer' : 'not-allowed', fontFamily: 'Inter', fontWeight: 600, fontSize: '12px', color: '#fff', padding: '6px 12px', borderRadius: '8px' }}>
                  <svg width="12" height="13" viewBox="0 0 12 13" fill="none"><path d="M1 3h10M4.5 3V2a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1M10 3l-.8 8a1 1 0 0 1-1 .9H3.8a1 1 0 0 1-1-.9L2 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  Delete{selected.length > 0 ? ` (${selected.length})` : ''}
                </button>
              </div>
              <span style={{ fontFamily: 'Inter', fontSize: '12px', color: '#94A3B8' }}>
                {loading ? 'Loading…' : `Showing ${showingStart}–${showingEnd} of ${totalOrders.toLocaleString()} orders`}
              </span>
            </div>

            {/* Column headers */}
            <div style={{ height: '44px', display: 'grid', gridTemplateColumns: '186px 194px 149px 187px 130px 1fr', background: 'rgba(242,244,246,0.5)' }}>
              {(['Order ID', 'Customer', 'Destination', 'Assigned Driver', 'Status'] as const).map((label, i) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', paddingLeft: i === 0 ? '32px' : '24px' }}>
                  <span style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: '10px', letterSpacing: '0.5px', color: '#424754', textTransform: 'uppercase' }}>{label}</span>
                </div>
              ))}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: '32px' }}>
                <span style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: '10px', letterSpacing: '0.5px', color: '#424754', textTransform: 'uppercase' }}>Actions</span>
              </div>
            </div>

            {/* Rows */}
            <div>
              {loading
                ? Array.from({ length: PER_PAGE }).map((_, i) => <SkeletonRow key={i} />)
                : orders.length === 0
                  ? <div style={{ padding: '48px 32px', textAlign: 'center', fontFamily: 'Inter', fontSize: '14px', color: '#94A3B8' }}>{hasActiveFilters ? 'No orders match your filters.' : 'No orders found.'}</div>
                  : orders.map((order, i) => (
                    <div key={order.id} style={{ height: '84.5px', display: 'grid', gridTemplateColumns: '186px 194px 149px 187px 130px 1fr', borderBottom: i < orders.length - 1 ? '1px solid #ECEEF0' : 'none', background: '#fff', alignItems: 'center' }}>
                      <div style={{ paddingLeft: '32px', paddingRight: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <input suppressHydrationWarning type="checkbox" checked={selected.includes(order.id)} onChange={() => toggle(order.id)} style={{ width: '15px', height: '15px', cursor: 'pointer', accentColor: '#2F80ED', flexShrink: 0 }} />
                        <span style={{ fontFamily: 'Manrope', fontWeight: 700, fontSize: '16px', color: '#2F80ED' }}>{order.id}</span>
                      </div>
                      <div style={{ paddingRight: '16px' }}>
                        <div style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: '14px', color: '#191C1E' }}>{order.customer}</div>
                        <div style={{ fontFamily: 'Inter', fontSize: '10px', color: '#2F80ED', marginTop: '4px' }}>{order.customerType}</div>
                      </div>
                      <div style={{ paddingRight: '16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src="/order-destination-icon.png" alt="" style={{ width: '10.67px', height: '13.33px', objectFit: 'contain', flexShrink: 0 }} />
                          <span style={{ fontFamily: 'Inter', fontSize: '14px', color: '#191C1E', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{order.destination}</span>
                        </div>
                      </div>
                      <div style={{ paddingRight: '16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <DriverAvatar bg={order.driverBg} initials={order.driverInitials} name={order.driverName} />
                          <span style={{ fontFamily: 'Inter', fontSize: '14px', color: '#191C1E' }}>{order.driverName}</span>
                        </div>
                      </div>
                      <div style={{ paddingTop: '32px', paddingRight: '32px', paddingBottom: '32.5px', display: 'flex', alignItems: 'center' }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', height: '20px', padding: '4px 12px', borderRadius: '9999px', background: order.statusBg, fontFamily: 'Inter', fontWeight: 700, fontSize: '10px', color: order.statusTextColor, whiteSpace: 'nowrap', textTransform: 'uppercase' }}>
                          {order.displayStatus}
                        </span>
                      </div>
                      <div style={{ paddingRight: '32px', display: 'flex', justifyContent: 'flex-end' }}>
                        <button suppressHydrationWarning style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '4px' }}>
                          <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="4" r="1.2" fill="#94A3B8" /><circle cx="9" cy="9" r="1.2" fill="#94A3B8" /><circle cx="9" cy="14" r="1.2" fill="#94A3B8" /></svg>
                        </button>
                      </div>
                    </div>
                  ))
              }
            </div>

            {/* Pagination */}
            <div style={{ height: '87px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingLeft: '32px', paddingRight: '32px', borderTop: '1px solid #ECEEF0' }}>
              <button suppressHydrationWarning onClick={() => goTo(currentPage - 1)} disabled={currentPage === 1 || loading} style={{ height: '38px', padding: '8px 16px', borderRadius: '8px', background: 'transparent', border: '1px solid #2F80ED', fontFamily: 'Inter', fontWeight: 600, fontSize: '14px', color: '#2F80ED', cursor: currentPage === 1 || loading ? 'not-allowed' : 'pointer', opacity: currentPage === 1 || loading ? 0.5 : 1 }}>Previous</button>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {pageNums.map((n) => (
                  <button suppressHydrationWarning key={n} onClick={() => goTo(n)} style={{ width: '32px', height: '32px', borderRadius: '8px', background: n === currentPage ? '#2F80ED' : 'transparent', border: 'none', fontFamily: 'Inter', fontWeight: n === currentPage ? 700 : 500, fontSize: '14px', color: n === currentPage ? '#fff' : '#191C1E', cursor: 'pointer' }}>{n}</button>
                ))}
                {pageNums[pageNums.length - 1] < totalPages - 1 && (
                  <span style={{ padding: '0 8px', fontFamily: 'Inter', fontSize: '14px', color: '#94A3B8' }}>...</span>
                )}
                {totalPages > 3 && pageNums[pageNums.length - 1] < totalPages && (
                  <button suppressHydrationWarning onClick={() => goTo(totalPages)} style={{ width: '32px', height: '32px', borderRadius: '8px', background: currentPage === totalPages ? '#2F80ED' : 'transparent', border: 'none', fontFamily: 'Inter', fontWeight: currentPage === totalPages ? 700 : 400, fontSize: '14px', color: currentPage === totalPages ? '#fff' : '#191C1E', cursor: 'pointer' }}>{totalPages}</button>
                )}
              </div>
              <button suppressHydrationWarning onClick={() => goTo(currentPage + 1)} disabled={currentPage === totalPages || loading} style={{ height: '38px', padding: '8px 16px', borderRadius: '8px', background: 'transparent', border: '1px solid #2F80ED', fontFamily: 'Inter', fontWeight: 600, fontSize: '14px', color: '#2F80ED', cursor: currentPage === totalPages || loading ? 'not-allowed' : 'pointer', opacity: currentPage === totalPages || loading ? 0.5 : 1 }}>Next</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
