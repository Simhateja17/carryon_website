'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import { getAdminCustomers, getAdminCustomerStats } from '@/lib/api';
import type { AdminCustomer, AdminCustomersPage, AdminCustomerStats } from '@/types';
import { useAdminPolling } from '@/lib/useAdminPolling';

/* ── Helpers ──────────────────────────────────────────────────────── */
function formatRevenue(amount: number): string {
  if (amount >= 1_000_000) return `RM ${(amount / 1_000_000).toFixed(1)}M`;
  if (amount >= 1_000) return `RM ${(amount / 1_000).toFixed(0)}K`;
  return `RM ${amount.toFixed(0)}`;
}

function initials(name: string): string {
  return name
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0] ?? '')
    .join('')
    .toUpperCase();
}

function shortId(id: string): string {
  return id.slice(0, 8).toUpperCase();
}

function joinYear(dateStr: string): string {
  return `EST. ${new Date(dateStr).getFullYear()}`;
}

/* ── Page ─────────────────────────────────────────────────────────── */
export default function CustomersPage() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [searchVal, setSearchVal] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  // Debounce search input (300 ms)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setDebouncedSearch(searchVal);
      setPage(1);
    }, 300);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [searchVal]);

  // Stats polling (60 s)
  const statsLoader = useCallback(() => getAdminCustomerStats(), []);
  const { data: statsData, loading: statsLoading } = useAdminPolling<AdminCustomerStats>(
    statsLoader,
    { intervalMs: 60_000 }
  );

  // Customers table polling (30 s)
  const customersLoader = useCallback(
    () => getAdminCustomers({ page, search: debouncedSearch }),
    [page, debouncedSearch]
  );
  const {
    data: pageData,
    loading: tableLoading,
    error: tableError,
  } = useAdminPolling<AdminCustomersPage>(customersLoader, { intervalMs: 30_000 });

  const customers: AdminCustomer[] = pageData?.customers ?? [];
  const totalCustomers = pageData?.total ?? 0;
  const limit = pageData?.limit ?? 20;
  const totalPages = pageData?.totalPages ?? Math.max(1, Math.ceil(totalCustomers / limit));

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
          </div>
        </div>

        <div style={{ padding: '0 32px 32px', display: 'flex', flexDirection: 'column', gap: '20px' }}>

          {/* Stats Row — 12-col grid: 960×194px, 24px column-gap */}
          <div style={{
            width: '100%',
            maxWidth: '1280px',
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
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '12px' }}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <circle cx="7" cy="7" r="3" stroke="#2563EB" strokeWidth="1.5" />
                  <path d="M1 17c0-3.314 2.686-6 6-6" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" />
                  <circle cx="14" cy="7" r="3" stroke="#2563EB" strokeWidth="1.5" />
                  <path d="M19 17c0-3.314-2.686-6-6-6" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                <span style={{
                  width: '144.66px', height: '24px',
                  display: 'inline-block',
                  fontFamily: 'Inter', fontSize: '11px', fontWeight: 600,
                  color: '#64748B', letterSpacing: '0.5px', textTransform: 'uppercase',
                  lineHeight: '24px',
                }}>
                  Total Clients
                </span>
              </div>
              <div style={{ fontFamily: 'Inter', fontSize: '32px', fontWeight: 700, color: '#0F172A', lineHeight: '1' }}>
                {statsLoading ? '—' : (statsData?.totalUsers ?? 0).toLocaleString()}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M6 9V3M3 6l3-3 3 3" stroke="#16A34A" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span style={{ fontFamily: 'Inter', fontSize: '12px', color: '#16A34A', fontWeight: 500 }}>
                  {statsLoading ? '—' : `${statsData?.verifiedUsers ?? 0} verified`}
                </span>
              </div>
            </div>

            {/* Active Users — span 3 cols */}
            <div style={{
              gridColumn: 'span 3',
              background: '#fff', borderRadius: '12px', padding: '20px 24px',
              border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '12px' }}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <rect x="1" y="6" width="12" height="9" rx="2" stroke="#2563EB" strokeWidth="1.5" />
                  <path d="M13 9.5h4l2 4H13V9.5Z" stroke="#2563EB" strokeWidth="1.5" strokeLinejoin="round" />
                  <circle cx="4.5" cy="17" r="1.5" fill="#2563EB" />
                  <circle cx="13.5" cy="17" r="1.5" fill="#2563EB" />
                </svg>
                <span style={{
                  width: '156px', height: '48px',
                  display: 'inline-block',
                  fontFamily: 'Inter', fontSize: '11px', fontWeight: 600,
                  color: '#64748B', letterSpacing: '0.5px', textTransform: 'uppercase',
                  lineHeight: '24px',
                }}>
                  Active Users (30d)
                </span>
              </div>
              <div style={{ fontFamily: 'Inter', fontSize: '32px', fontWeight: 700, color: '#0F172A', lineHeight: '1' }}>
                {statsLoading ? '—' : (statsData?.activeUsers ?? 0).toLocaleString()}
              </div>
              <span style={{ fontFamily: 'Inter', fontSize: '12px', color: '#16A34A', fontWeight: 500 }}>
                Active in the last 30 days
              </span>
            </div>

            {/* Total Revenue — span 3 cols */}
            <div style={{
              gridColumn: 'span 3',
              background: '#fff', borderRadius: '12px', padding: '20px 24px',
              border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '12px' }}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <rect x="2" y="4" width="16" height="12" rx="2" stroke="#2563EB" strokeWidth="1.5" />
                  <path d="M10 8v4M8.5 9c0-.828.672-1.5 1.5-1.5h.5a1 1 0 1 1 0 2H10a1 1 0 0 0 0 2h.5c.828 0 1.5-.672 1.5-1.5"
                    stroke="#2563EB" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
                <span style={{
                  width: '144.67px', height: '24px',
                  display: 'inline-block',
                  fontFamily: 'Inter', fontSize: '11px', fontWeight: 600,
                  color: '#64748B', letterSpacing: '0.5px', textTransform: 'uppercase',
                  lineHeight: '24px',
                }}>
                  Total Revenue
                </span>
              </div>
              <div style={{ fontFamily: 'Inter', fontSize: '32px', fontWeight: 700, color: '#0F172A', lineHeight: '1' }}>
                {statsLoading ? '—' : formatRevenue(statsData?.totalRevenue ?? 0)}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M6 9V3M3 6l3-3 3 3" stroke="#16A34A" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span style={{ fontFamily: 'Inter', fontSize: '12px', color: '#16A34A', fontWeight: 500 }}>
                  Completed payments
                </span>
              </div>
            </div>

            {/* Premium Tier Review — span 3 cols */}
            <div style={{
              gridColumn: 'span 3',
              height: '188px',
              width: '100%',
              justifySelf: 'stretch',
              background: 'linear-gradient(90deg, #2F80ED 0%, #3B82F6 100%)',
              borderRadius: '12px',
              padding: '22px 18px 20px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 8px 20px rgba(37, 99, 235, 0.24)',
            }}>
              <div>
                <div style={{ fontFamily: 'Inter', fontSize: '30px', fontWeight: 700, color: '#fff', marginBottom: '8px', lineHeight: '32px', transform: 'scale(0.5)', transformOrigin: 'left top', width: '200%' }}>
                  Premium Tier Review
                </div>
                <div style={{ fontFamily: 'Inter', fontSize: '12px', color: 'rgba(255,255,255,0.9)', lineHeight: '20px', maxWidth: '252px' }}>
                  4 High-value manufacturing clients are due for quarterly performance review.
                </div>
              </div>
              <button suppressHydrationWarning style={{
                width: '100%',
                height: '32px',
                borderRadius: '8px',
                background: 'rgba(255,255,255,0.18)',
                border: 'none',
                fontFamily: 'Inter',
                fontSize: '12px',
                fontWeight: 700,
                color: '#fff',
                cursor: 'pointer',
                lineHeight: '16px',
                textTransform: 'uppercase',
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
                placeholder="Search customers by name, email or phone..."
                style={{
                  width: '100%', height: '38px', paddingLeft: '36px', paddingRight: '12px',
                  background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px',
                  fontFamily: 'Inter', fontSize: '13px', color: '#374151', outline: 'none',
                  boxSizing: 'border-box',
                }}
              />
            </div>
            {/* Filters */}
            {[
              { label: 'Status: All', width: '80px' },
              { label: 'Verified: All', width: '88px' },
            ].map((f) => (
              <button suppressHydrationWarning key={f.label} style={{
                height: '38px', padding: '0 14px', borderRadius: '8px',
                background: '#fff', border: '1px solid #CBD5E1',
                cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap',
              }}>
                <span style={{
                  width: f.width,
                  height: '20px',
                  fontFamily: 'Inter',
                  fontSize: '14px',
                  fontWeight: 500,
                  lineHeight: '20px',
                  letterSpacing: '0px',
                  color: '#2F80ED',
                  display: 'inline-block',
                }}>
                  {f.label}
                </span>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M3 4.5l3 3 3-3" stroke="#2F80ED" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
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

          {/* Error banner */}
          {tableError && (
            <div style={{
              background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '8px',
              padding: '12px 16px', fontFamily: 'Inter', fontSize: '13px', color: '#DC2626',
            }}>
              {tableError}
            </div>
          )}

          {/* Table */}
          <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #E2E8F0', overflow: 'hidden' }}>
            {/* Table Header */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(7, minmax(0, 1fr))',
              columnGap: '20px',
              padding: '12px 20px',
              borderBottom: '1px solid #E2E8F0',
              background: '#F8FAFC',
            }}>
              {['Customer ID', 'Name', 'Contact', 'Total Orders', 'Total Spent', 'Status', 'Actions'].map((h) => (
                <span key={h} style={{ fontFamily: 'Inter', fontSize: '11px', fontWeight: 600, color: '#64748B', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                  {h}
                </span>
              ))}
            </div>

            {/* Loading skeleton */}
            {tableLoading && customers.length === 0 && (
              Array.from({ length: 5 }).map((_, i) => (
                <div key={i} style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(7, minmax(0, 1fr))',
                  columnGap: '20px',
                  padding: '18px 20px',
                  borderBottom: '1px solid #F1F5F9',
                  alignItems: 'center',
                }}>
                  {Array.from({ length: 7 }).map((__, j) => (
                    <div key={j} style={{
                      height: '14px', borderRadius: '4px',
                      background: '#F1F5F9',
                      width: j === 1 ? '80%' : j === 6 ? '60px' : '70%',
                    }} />
                  ))}
                </div>
              ))
            )}

            {/* Rows */}
            {customers.map((c, i) => (
              <div key={c.id} style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(7, minmax(0, 1fr))',
                columnGap: '20px',
                padding: '18px 20px',
                borderBottom: i < customers.length - 1 ? '1px solid #F1F5F9' : 'none',
                alignItems: 'center',
              }}>
                {/* Customer ID */}
                <div>
                  <div style={{ fontFamily: 'Inter', fontSize: '13px', fontWeight: 600, color: '#0F172A' }}>
                    {shortId(c.id)}
                  </div>
                  <div style={{
                    marginTop: '2px',
                    fontFamily: 'Inter',
                    fontSize: '10px',
                    fontWeight: 500,
                    color: '#2F80ED',
                  }}>
                    {joinYear(c.createdAt)}
                  </div>
                </div>

                {/* Name */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '36px',
                    height: '36px', borderRadius: '8px',
                    background: '#B7DAF5', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <span style={{
                      fontFamily: 'Inter',
                      fontSize: '12px',
                      fontWeight: 700,
                      color: '#2563EB',
                    }}>{initials(c.name || c.email)}</span>
                  </div>
                  <div>
                    <div style={{ fontFamily: 'Inter', fontSize: '13px', fontWeight: 600, color: '#0F172A' }}>{c.name || '—'}</div>
                    <div style={{
                      marginTop: '2px',
                      fontFamily: 'Inter',
                      fontSize: '12px',
                      fontWeight: 400,
                      lineHeight: '16px',
                      color: '#2F80ED',
                    }}>{c.email}</div>
                  </div>
                </div>

                {/* Contact / Phone */}
                <div>
                  <div style={{ fontFamily: 'Inter', fontSize: '13px', color: '#0F172A' }}>{c.phone || '—'}</div>
                  <div style={{ fontFamily: 'Inter', fontSize: '11px', color: '#64748B', marginTop: '2px' }}>
                    {c.lastOrderAt ? `Last order ${new Date(c.lastOrderAt).toLocaleDateString()}` : 'No orders yet'}
                  </div>
                </div>

                {/* Total Orders */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontFamily: 'Inter', fontSize: '13px', fontWeight: 600, color: '#0F172A' }}>
                    {c.totalOrders.toLocaleString()}
                  </span>
                  {c.activeOrders > 0 ? (
                    <span style={{
                      padding: '2px 6px',
                      boxSizing: 'border-box',
                      borderRadius: '4px',
                      background: '#B7DAF5',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: 'Inter', fontSize: '10px', fontWeight: 600, color: '#2563EB',
                      whiteSpace: 'nowrap',
                    }}>
                      +{c.activeOrders} active
                    </span>
                  ) : (
                    <span style={{
                      padding: '2px 6px',
                      boxSizing: 'border-box',
                      borderRadius: '4px',
                      background: '#F1F5F9',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: 'Inter', fontSize: '10px', fontWeight: 600, color: '#94A3B8',
                      whiteSpace: 'nowrap',
                    }}>
                      0 active
                    </span>
                  )}
                </div>

                {/* Total Spent */}
                <div style={{ fontFamily: 'Inter', fontSize: '13px', fontWeight: 600, color: '#0F172A' }}>
                  {formatRevenue(c.totalSpent)}
                </div>

                {/* Status */}
                <div>
                  <span style={{
                    padding: '4px 12px',
                    borderRadius: '9999px',
                    boxSizing: 'border-box',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: c.isVerified ? '#2F80ED' : '#B7DAF5',
                    fontFamily: 'Inter', fontSize: '11px', fontWeight: 700,
                    color: c.isVerified ? '#fff' : '#64748B',
                    letterSpacing: '0.4px',
                    whiteSpace: 'nowrap',
                  }}>
                    {c.isVerified ? 'VERIFIED' : 'UNVERIFIED'}
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

            {/* Empty state */}
            {!tableLoading && customers.length === 0 && !tableError && (
              <div style={{
                padding: '48px 20px', textAlign: 'center',
                fontFamily: 'Inter', fontSize: '14px', color: '#64748B',
              }}>
                {debouncedSearch ? `No customers found for "${debouncedSearch}"` : 'No customers yet'}
              </div>
            )}

            {/* Pagination */}
            <div style={{
              padding: '14px 20px',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              borderTop: '1px solid #F1F5F9',
            }}>
              <span style={{ fontFamily: 'Inter', fontSize: '13px', color: '#64748B' }}>
                {tableLoading && customers.length === 0
                  ? 'Loading...'
                  : `Showing ${Math.min((page - 1) * limit + 1, totalCustomers)}–${Math.min(page * limit, totalCustomers)} of ${totalCustomers.toLocaleString()} customers`}
              </span>
              <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                <button
                  suppressHydrationWarning
                  disabled={page <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  style={{
                    width: '32px', height: '32px', borderRadius: '6px',
                    background: '#fff', border: '1px solid #E2E8F0',
                    cursor: page <= 1 ? 'default' : 'pointer',
                    opacity: page <= 1 ? 0.4 : 1,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M7.5 9L4.5 6l3-3" stroke="#64748B" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                  const p = i + 1;
                  return (
                    <button suppressHydrationWarning key={p} onClick={() => setPage(p)} style={{
                      width: '32px', height: '32px', borderRadius: '6px',
                      background: p === page ? '#2563EB' : '#fff',
                      border: p === page ? 'none' : '1px solid #E2E8F0',
                      fontFamily: 'Inter', fontSize: '13px', fontWeight: p === page ? 600 : 400,
                      color: p === page ? '#fff' : '#374151', cursor: 'pointer',
                    }}>
                      {p}
                    </button>
                  );
                })}
                <button
                  suppressHydrationWarning
                  disabled={page >= totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  style={{
                    width: '32px', height: '32px', borderRadius: '6px',
                    background: '#fff', border: '1px solid #E2E8F0',
                    cursor: page >= totalPages ? 'default' : 'pointer',
                    opacity: page >= totalPages ? 0.4 : 1,
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
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '16px', alignItems: 'start' }}>

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
                          fill={s <= Math.floor(r.stars) ? '#2F80ED' : s - 0.5 <= r.stars ? '#2F80ED' : '#E2E8F0'}
                          stroke={s <= Math.ceil(r.stars) ? '#2F80ED' : '#E2E8F0'}
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
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', columnGap: '24px', alignItems: 'start' }}>
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
              padding: '20px 24px',
              display: 'flex', gap: '12px', alignItems: 'flex-start',
            }}>
              <div style={{
                width: '48px', height: '48px', borderRadius: '8px', background: '#2F80ED',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/customers-alert-icon.png"
                  alt=""
                  style={{ width: '23.3333px', height: '23.3917px', display: 'block' }}
                />
              </div>
              <div>
                <div style={{
                  width: '41.53px',
                  height: '16px',
                  fontFamily: 'Inter',
                  fontSize: '12px',
                  fontWeight: 700,
                  lineHeight: '16px',
                  letterSpacing: '0.6px',
                  textTransform: 'uppercase',
                  color: '#2F80ED',
                  marginBottom: '4px',
                }}>
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
