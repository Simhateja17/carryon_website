'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import DriverAdvancedFiltersPanel from '@/components/DriverAdvancedFiltersPanel';
import { getAdminDrivers, type DriverListItem } from '@/lib/api';

/* ── Types ───────────────────────────────────────────────────── */
type DriverStatus = 'ONLINE' | 'BUSY' | 'OFFLINE';

interface Driver {
  id: string;
  drvId: string;
  name: string;
  email: string;
  licenseClass: string;
  licenseType: string;
  dotColor: string;
  avatarSrc: string;
  vehicleName: string;
  vehicleId: string;
  routeFrom: string;
  routeTo: string;
  routeStatus?: string;
  routeEta?: string;
  routeInfo?: string;
  status: DriverStatus;
  acceptance: number;
  rating: number;
  earnings: string;
  earningsSub?: string;
}

/* ── Helpers ─────────────────────────────────────────────────── */
function toDriverRow(driver: DriverListItem): Driver {
  const approvedRatio = driver.documentsCount > 0
    ? Math.round((driver.documentsApproved / driver.documentsCount) * 100)
    : driver.isVerified ? 100 : 0;
  const status: DriverStatus = driver.isOnline
    ? driver.verificationStatus === 'APPROVED' ? 'ONLINE' : 'BUSY'
    : 'OFFLINE';

  return {
    id: driver.id,
    drvId: `DRV-${driver.id.slice(0, 4).toUpperCase()}`,
    name: driver.name || 'Unnamed Driver',
    email: driver.email || '--',
    licenseClass: driver.verificationStatus.replace('_', ' '),
    licenseType: driver.isVerified ? 'Verified' : 'Review',
    dotColor: driver.isOnline ? '#22C55E' : '#94A3B8',
    avatarSrc: driver.photo || '/driver-avatar.png',
    vehicleName: driver.vehicleSummary || 'No vehicle submitted',
    vehicleId: driver.hasVehicle ? `ID: ${driver.id.slice(0, 6).toUpperCase()}` : 'Awaiting vehicle',
    routeFrom: driver.isOnline ? 'Available' : 'No Active Route',
    routeTo: driver.isOnline ? 'Dispatch Pool' : '',
    routeInfo: driver.isOnline ? undefined : `JOINED ${new Date(driver.createdAt).toLocaleDateString()}`,
    status,
    acceptance: approvedRatio,
    rating: driver.rating || 0,
    earnings: `${driver.totalTrips} trips`,
    earningsSub: driver.hasFcmToken ? 'Push enabled' : 'No push token',
  };
}

function statusBadgeStyle(status: DriverStatus): { bg: string; color: string } {
  switch (status) {
    case 'ONLINE':
      return { bg: '#2563EB', color: '#fff' };
    case 'BUSY':
      return { bg: '#6366F1', color: '#fff' };
    case 'OFFLINE':
    default:
      return { bg: '#E2E8F0', color: '#64748B' };
  }
}

/* ── Components ──────────────────────────────────────────────── */

function FilterChip({ label }: { label: string }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '6px',
      height: '32px',
      padding: '6px 12px',
      borderRadius: '9999px',
      background: '#B7DAF5',
      boxSizing: 'border-box',
    }}>
      <span style={{ fontFamily: 'Inter', fontSize: '12px', fontWeight: 500, lineHeight: '16px', color: '#2F80ED' }}>{label}</span>
      <button suppressHydrationWarning style={{
        background: 'none', border: 'none', padding: 0, cursor: 'pointer',
        display: 'flex', alignItems: 'center', color: '#2F80ED',
      }}>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M2 2l8 8M10 2l-8 8" stroke="#2F80ED" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
}

function StarIcon({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 13 13" fill="none">
      <path d="M6.5 1l1.545 3.09L11.5 4.745l-2.5 2.437.59 3.418L6.5 9l-3.09 1.6.59-3.418-2.5-2.437 3.455-.655L6.5 1Z" fill="#F59E0B" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M2 6h8M6 2l4 4-4 4" stroke="#64748B" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function WarningIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M6 1l5.5 9.5H.5L6 1Z" fill="#EF4444" />
      <path d="M6 4.5v2M6 7.5h.01" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

/* ── Table Row ───────────────────────────────────────────────── */
function DriverTableRow({ driver }: { driver: Driver }) {
  const status = statusBadgeStyle(driver.status);
  return (
    <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
      {/* Driver ID & Photo */}
      <td style={{ padding: '16px 12px', verticalAlign: 'middle' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ position: 'relative', width: '40px', height: '40px', flexShrink: 0 }}>
            <img
              src={driver.avatarSrc}
              alt={driver.name}
              width={40}
              height={40}
              style={{ width: '40px', height: '40px', borderRadius: '10px', objectFit: 'cover', display: 'block' }}
            />
            <div style={{
              position: 'absolute',
              bottom: '-2px',
              right: '-2px',
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              background: driver.dotColor,
              border: '2px solid #fff',
            }} />
          </div>
          <div>
            <div style={{ fontFamily: 'Inter', fontSize: '11px', fontWeight: 700, color: '#2F80ED', lineHeight: '16px' }}>
              #{driver.drvId}
            </div>
            <div style={{ fontFamily: 'Inter', fontSize: '10px', fontWeight: 500, color: '#64748B', lineHeight: '14px' }}>
              {driver.licenseClass} {driver.licenseType}
            </div>
          </div>
        </div>
      </td>

      {/* Name */}
      <td style={{ padding: '16px 12px', verticalAlign: 'middle' }}>
        <div style={{ fontFamily: 'Inter', fontSize: '14px', fontWeight: 700, color: '#0F172A', lineHeight: '20px' }}>
          {driver.name}
        </div>
        <div style={{ fontFamily: 'Inter', fontSize: '11px', fontWeight: 400, color: '#64748B', lineHeight: '16px' }}>
          {driver.email}
        </div>
      </td>

      {/* Vehicle Details */}
      <td style={{ padding: '16px 12px', verticalAlign: 'middle' }}>
        <div style={{ fontFamily: 'Inter', fontSize: '13px', fontWeight: 600, color: '#2F80ED', lineHeight: '18px' }}>
          {driver.vehicleName}
        </div>
        <div style={{ fontFamily: 'Inter', fontSize: '11px', fontWeight: 400, color: '#94A3B8', lineHeight: '16px' }}>
          {driver.vehicleId}
        </div>
      </td>

      {/* Active Route */}
      <td style={{ padding: '16px 12px', verticalAlign: 'middle' }}>
        {driver.routeFrom === 'No Active Route' ? (
          <div>
            <div style={{ fontFamily: 'Inter', fontSize: '12px', fontWeight: 500, color: '#94A3B8', lineHeight: '18px' }}>
              No Active Route
            </div>
            <div style={{ fontFamily: 'Inter', fontSize: '10px', fontWeight: 500, color: '#CBD5E1', lineHeight: '14px' }}>
              {driver.routeInfo}
            </div>
          </div>
        ) : (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontFamily: 'Inter', fontSize: '12px', fontWeight: 600, color: '#0F172A', lineHeight: '18px' }}>
              <span>{driver.routeFrom}</span>
              <ArrowRightIcon />
              <span>{driver.routeTo}</span>
            </div>
            {driver.routeStatus && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                <WarningIcon />
                <span style={{ fontFamily: 'Inter', fontSize: '10px', fontWeight: 700, color: '#EF4444', lineHeight: '14px', letterSpacing: '0.4px' }}>
                  {driver.routeStatus}
                </span>
              </div>
            )}
            {driver.routeEta && (
              <div style={{ fontFamily: 'Inter', fontSize: '10px', fontWeight: 500, color: '#94A3B8', lineHeight: '14px', marginTop: '2px' }}>
                {driver.routeEta}
              </div>
            )}
          </div>
        )}
      </td>

      {/* Status */}
      <td style={{ padding: '16px 12px', verticalAlign: 'middle' }}>
        <span style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '24px',
          padding: '4px 12px',
          borderRadius: '9999px',
          background: status.bg,
          color: status.color,
          fontFamily: 'Inter',
          fontSize: '10px',
          fontWeight: 700,
          letterSpacing: '0.4px',
          lineHeight: '14px',
          whiteSpace: 'nowrap',
        }}>
          {driver.status}
        </span>
      </td>

      {/* Performance */}
      <td style={{ padding: '16px 12px', verticalAlign: 'middle' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <div style={{ fontFamily: 'Inter', fontSize: '13px', fontWeight: 700, color: '#0F172A', lineHeight: '18px' }}>
            {driver.acceptance}%
          </div>
          <div style={{ fontFamily: 'Inter', fontSize: '9px', fontWeight: 700, color: '#94A3B8', lineHeight: '12px', letterSpacing: '0.4px' }}>
            ACCEPTANCE
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ fontFamily: 'Inter', fontSize: '12px', fontWeight: 700, color: '#F59E0B', lineHeight: '16px' }}>
              {driver.rating.toFixed(1)}
            </span>
            <StarIcon />
          </div>
        </div>
      </td>

      {/* Today's Earnings */}
      <td style={{ padding: '16px 12px', verticalAlign: 'middle' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', textAlign: 'right' }}>
          <div style={{ fontFamily: 'Inter', fontSize: '14px', fontWeight: 700, color: '#0F172A', lineHeight: '20px' }}>
            {driver.earnings}
          </div>
          {driver.earningsSub && (
            <div style={{
              fontFamily: 'Inter',
              fontSize: '10px',
              fontWeight: 600,
              color: driver.earningsSub.includes('Bonus') ? '#22C55E' : '#94A3B8',
              lineHeight: '14px',
            }}>
              {driver.earningsSub}
            </div>
          )}
        </div>
      </td>
    </tr>
  );
}

/* ── Page ────────────────────────────────────────────────────── */
export default function DriversPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'All Drivers' | 'Favorites'>('All Drivers');
  const [filterOpen, setFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [driverRows, setDriverRows] = useState<Driver[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const totalPages = Math.max(1, Math.ceil(driverRows.length / 10));
  const visibleDrivers = useMemo(
    () => driverRows.slice((currentPage - 1) * 10, currentPage * 10),
    [currentPage, driverRows]
  );

  useEffect(() => {
    let alive = true;
    async function loadDrivers() {
      setLoading(true);
      setError('');
      try {
        const res = await getAdminDrivers();
        if (alive) setDriverRows(res.data.map(toDriverRow));
      } catch (err) {
        if (alive) setError(err instanceof Error ? err.message : 'Failed to load drivers');
      } finally {
        if (alive) setLoading(false);
      }
    }
    loadDrivers();
    return () => {
      alive = false;
    };
  }, []);

  return (
    <>
      <DriverAdvancedFiltersPanel open={filterOpen} onClose={() => setFilterOpen(false)} />
      <main style={{
        flex: 1,
        padding: '32px',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        overflowY: 'auto',
        boxSizing: 'border-box',
      }}>

        {/* Page header row */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
        }}>
          <div>
            <h1 style={{ margin: 0, fontFamily: 'Inter', fontSize: '26px', fontWeight: 800, color: '#0F172A' }}>
              Drivers
            </h1>
            <p style={{ margin: '4px 0 0', fontFamily: 'Inter', fontSize: '13px', color: '#2563EB', fontWeight: 500 }}>
              Manage and track your active fleet personnel.
            </p>
          </div>

          {/* Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', height: '40px' }}>

            {/* All Drivers / Favorites tab group */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              borderRadius: '8px',
              background: '#B7DAF5',
              padding: '4px',
              gap: '0px',
              height: '40px',
              boxSizing: 'border-box',
            }}>
              <button
                suppressHydrationWarning
                onClick={() => setActiveTab('All Drivers')}
                style={{
                  height: '32px',
                  padding: '8px 16px',
                  borderRadius: '6px',
                  background: activeTab === 'All Drivers' ? '#FFFFFF' : 'transparent',
                  boxShadow: activeTab === 'All Drivers' ? '0px 1px 2px 0px rgba(0,0,0,0.05)' : 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: 'Inter',
                  fontSize: '12px',
                  fontWeight: 700,
                  lineHeight: '16px',
                  color: activeTab === 'All Drivers' ? '#2F80ED' : '#191C1E',
                  whiteSpace: 'nowrap',
                  boxSizing: 'border-box',
                }}
              >
                All Drivers
              </button>
              <button
                suppressHydrationWarning
                onClick={() => setActiveTab('Favorites')}
                style={{
                  height: '32px',
                  padding: '8px 16px',
                  borderRadius: '6px',
                  background: activeTab === 'Favorites' ? '#FFFFFF' : 'transparent',
                  boxShadow: activeTab === 'Favorites' ? '0px 1px 2px 0px rgba(0,0,0,0.05)' : 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: 'Inter',
                  fontSize: '12px',
                  fontWeight: 700,
                  lineHeight: '16px',
                  color: activeTab === 'Favorites' ? '#2F80ED' : '#000000',
                  whiteSpace: 'nowrap',
                  boxSizing: 'border-box',
                }}
              >
                Favorites
              </button>
            </div>

            {/* Filter button */}
            <button suppressHydrationWarning type="button" onClick={() => setFilterOpen(true)} style={{
              display: 'flex', alignItems: 'center', gap: '7.99px',
              height: '36px',
              padding: '8px 16px',
              borderRadius: '8px',
              background: '#B7DAF5',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'Inter', fontSize: '14px', fontWeight: 600,
              lineHeight: '20px', color: '#191C1E',
              whiteSpace: 'nowrap',
              boxSizing: 'border-box',
            }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 3h12M3 7h8M5 11h4" stroke="#191C1E" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              Filter
            </button>

            {/* Register Driver */}
            <button suppressHydrationWarning type="button" onClick={() => router.push('/drivers/register')} style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              height: '36px',
              padding: '8px 16px',
              borderRadius: '8px',
              background: '#2F80ED',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'Inter', fontSize: '14px', fontWeight: 700,
              lineHeight: '20px', color: '#FFFFFF',
              whiteSpace: 'nowrap',
              boxSizing: 'border-box',
            }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle cx="6" cy="5" r="3.5" stroke="white" strokeWidth="1.3" />
                <path d="M0.5 13c0-3.038 2.462-5.5 5.5-5.5" stroke="white" strokeWidth="1.3" strokeLinecap="round" />
                <path d="M10 9v4M8 11h4" stroke="white" strokeWidth="1.3" strokeLinecap="round" />
              </svg>
              Register Driver
            </button>
          </div>
        </div>

        {/* Filter chips */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          boxSizing: 'border-box',
        }}>
          <FilterChip label="License: Class A" />
          <FilterChip label="Rating: 4.5+" />
          <FilterChip label="Status: Active" />
          <button suppressHydrationWarning style={{
            background: 'none', border: 'none', padding: '5px 8px',
            fontFamily: 'Inter', fontSize: '12px', fontWeight: 700,
            color: '#2F80ED', cursor: 'pointer',
          }}>
            Clear all
          </button>
        </div>

        {/* Active Driver Directory Table */}
        <div style={{
          background: '#fff',
          borderRadius: '12px',
          border: '1px solid #E2E8F0',
          boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
          overflow: 'hidden',
        }}>
          {/* Table header bar */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '20px 24px',
            borderBottom: '1px solid #F1F5F9',
          }}>
            <h2 style={{
              margin: 0,
              fontFamily: 'Inter',
              fontSize: '16px',
              fontWeight: 700,
              color: '#0F172A',
              lineHeight: '24px',
            }}>
              Active Driver Directory
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <button suppressHydrationWarning style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                height: '32px',
                padding: '6px 12px',
                borderRadius: '6px',
                background: 'transparent',
                border: '1px solid #E2E8F0',
                cursor: 'pointer',
                fontFamily: 'Inter', fontSize: '12px', fontWeight: 600,
                color: '#64748B', lineHeight: '16px',
                boxSizing: 'border-box',
              }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 3h12M3 7h8M5 11h4" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                FILTER
              </button>
              <button suppressHydrationWarning style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                height: '32px',
                padding: '6px 12px',
                borderRadius: '6px',
                background: 'transparent',
                border: '1px solid #E2E8F0',
                cursor: 'pointer',
                fontFamily: 'Inter', fontSize: '12px', fontWeight: 600,
                color: '#64748B', lineHeight: '16px',
                boxSizing: 'border-box',
              }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M7 1v12M1 7h12" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                EXPORT CSV
              </button>
            </div>
          </div>

          {/* Table */}
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontFamily: 'Inter, sans-serif',
          }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                <th style={{
                  padding: '12px',
                  textAlign: 'left',
                  fontFamily: 'Inter',
                  fontSize: '10px',
                  fontWeight: 700,
                  color: '#94A3B8',
                  letterSpacing: '0.6px',
                  textTransform: 'uppercase',
                  lineHeight: '14px',
                }}>
                  Driver ID<br />& Photo
                </th>
                <th style={{
                  padding: '12px',
                  textAlign: 'left',
                  fontFamily: 'Inter',
                  fontSize: '10px',
                  fontWeight: 700,
                  color: '#94A3B8',
                  letterSpacing: '0.6px',
                  textTransform: 'uppercase',
                  lineHeight: '14px',
                }}>
                  Name
                </th>
                <th style={{
                  padding: '12px',
                  textAlign: 'left',
                  fontFamily: 'Inter',
                  fontSize: '10px',
                  fontWeight: 700,
                  color: '#94A3B8',
                  letterSpacing: '0.6px',
                  textTransform: 'uppercase',
                  lineHeight: '14px',
                }}>
                  Vehicle<br />Details
                </th>
                <th style={{
                  padding: '12px',
                  textAlign: 'left',
                  fontFamily: 'Inter',
                  fontSize: '10px',
                  fontWeight: 700,
                  color: '#94A3B8',
                  letterSpacing: '0.6px',
                  textTransform: 'uppercase',
                  lineHeight: '14px',
                }}>
                  Active Route
                </th>
                <th style={{
                  padding: '12px',
                  textAlign: 'left',
                  fontFamily: 'Inter',
                  fontSize: '10px',
                  fontWeight: 700,
                  color: '#94A3B8',
                  letterSpacing: '0.6px',
                  textTransform: 'uppercase',
                  lineHeight: '14px',
                }}>
                  Status
                </th>
                <th style={{
                  padding: '12px',
                  textAlign: 'left',
                  fontFamily: 'Inter',
                  fontSize: '10px',
                  fontWeight: 700,
                  color: '#94A3B8',
                  letterSpacing: '0.6px',
                  textTransform: 'uppercase',
                  lineHeight: '14px',
                }}>
                  Performance
                </th>
                <th style={{
                  padding: '12px',
                  textAlign: 'right',
                  fontFamily: 'Inter',
                  fontSize: '10px',
                  fontWeight: 700,
                  color: '#94A3B8',
                  letterSpacing: '0.6px',
                  textTransform: 'uppercase',
                  lineHeight: '14px',
                }}>
                  Today&apos;s<br />Earnings
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={7} style={{ padding: '28px', color: '#64748B', fontFamily: 'Inter' }}>Loading drivers...</td></tr>
              ) : error ? (
                <tr><td colSpan={7} style={{ padding: '28px', color: '#DC2626', fontFamily: 'Inter' }}>{error}</td></tr>
              ) : visibleDrivers.length === 0 ? (
                <tr><td colSpan={7} style={{ padding: '28px', color: '#64748B', fontFamily: 'Inter' }}>No drivers found.</td></tr>
              ) : visibleDrivers.map((d) => (
                <DriverTableRow key={d.id} driver={d} />
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '16px 24px',
            borderTop: '1px solid #F1F5F9',
          }}>
            <div style={{
              fontFamily: 'Inter',
              fontSize: '11px',
              fontWeight: 600,
              color: '#94A3B8',
              letterSpacing: '0.4px',
              textTransform: 'uppercase',
              lineHeight: '16px',
            }}>
              SHOWING {driverRows.length === 0 ? 0 : (currentPage - 1) * 10 + 1}-{Math.min(currentPage * 10, driverRows.length)} OF {driverRows.length} DRIVERS
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <button
                suppressHydrationWarning
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '6px',
                  border: '1px solid #E2E8F0',
                  background: '#fff',
                  cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: currentPage === 1 ? 0.5 : 1,
                }}
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M7 2L3 6l4 4" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {Array.from({ length: Math.min(3, totalPages) }, (_, idx) => idx + 1).map((p) => (
                <button
                  suppressHydrationWarning
                  key={p}
                  onClick={() => setCurrentPage(p)}
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '6px',
                    border: 'none',
                    background: currentPage === p ? '#2F80ED' : 'transparent',
                    cursor: 'pointer',
                    fontFamily: 'Inter',
                    fontSize: '12px',
                    fontWeight: 700,
                    color: currentPage === p ? '#fff' : '#64748B',
                    lineHeight: '16px',
                  }}
                >
                  {p}
                </button>
              ))}

              <span style={{
                fontFamily: 'Inter',
                fontSize: '12px',
                fontWeight: 700,
                color: '#64748B',
                padding: '0 4px',
              }}>
                ...
              </span>

              <button
                suppressHydrationWarning
                onClick={() => setCurrentPage(totalPages)}
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '6px',
                  border: 'none',
                  background: currentPage === totalPages ? '#2F80ED' : 'transparent',
                  cursor: 'pointer',
                  fontFamily: 'Inter',
                  fontSize: '12px',
                  fontWeight: 700,
                  color: currentPage === totalPages ? '#fff' : '#64748B',
                  lineHeight: '16px',
                }}
              >
                {totalPages}
              </button>

              <button
                suppressHydrationWarning
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '6px',
                  border: '1px solid #E2E8F0',
                  background: '#fff',
                  cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: currentPage === totalPages ? 0.5 : 1,
                }}
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M5 2l4 4-4 4" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
