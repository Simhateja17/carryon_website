'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import DriverAdvancedFiltersPanel from '@/components/DriverAdvancedFiltersPanel';

/* ── Driver data ─────────────────────────────────────────────── */
type DriverStatus = 'ACTIVE' | 'ON BREAK' | 'OFFLINE';

interface Driver {
  id: string;
  name: string;
  drvId: string;
  license: string;
  status: DriverStatus;
  rating: number;
  vehicle: string | null;
  detail: string;
  initials: string;
  initialsColor: string;
  dotColor: string;
  avatarBg: string;
  avatarType: 'desk' | 'beard' | 'laptop' | 'away' | 'glasses' | 'mask';
  avatarSrc: string;
}

const drivers: Driver[] = [
  {
    id: '1', name: 'Alex Rivera', drvId: 'DRV-88291', license: 'Class A CDL',
    status: 'ACTIVE', rating: 4.9, vehicle: 'Freightliner Cascadia (TX-492)',
    detail: 'Near Austin, TX • 12 mi to destination',
    initials: 'AR', initialsColor: '#2563EB', dotColor: '#22C55E',
    avatarBg: '#DBEAFE', avatarType: 'desk',
    avatarSrc: '/driver-avatar.png',
  },
  {
    id: '2', name: 'Elena Rodriguez', drvId: 'DRV-72104', license: 'Class B CDL',
    status: 'ON BREAK', rating: 4.7, vehicle: 'Kenworth T680 (CA-102)',
    detail: 'Resting • Resuming in 45 mins',
    initials: 'ER', initialsColor: '#2563EB', dotColor: '#2563EB',
    avatarBg: '#EDE9FE', avatarType: 'beard',
    avatarSrc: '/driver-elena.png',
  },
  {
    id: '3', name: 'James Wilson', drvId: 'DRV-11029', license: 'Hazmat Endorsed',
    status: 'ACTIVE', rating: 5.0, vehicle: 'Peterbilt 579 (NY-221)',
    detail: 'Route: #9921-X • 88% complete',
    initials: 'JW', initialsColor: '#2563EB', dotColor: '#22C55E',
    avatarBg: '#DBEAFE', avatarType: 'laptop',
    avatarSrc: '/driver-james.png',
  },
  {
    id: '4', name: 'Sam Thompson', drvId: 'DRV-44211', license: 'Class A CDL',
    status: 'OFFLINE', rating: 4.4, vehicle: null,
    detail: 'Off-duty since 08:00 AM',
    initials: 'ST', initialsColor: '#2563EB', dotColor: '#2563EB',
    avatarBg: '#F1F5F9', avatarType: 'away',
    avatarSrc: '/driver-sam.png',
  },
  {
    id: '5', name: 'Sarah Connor', drvId: 'DRV-99382', license: 'Multi-Trailer',
    status: 'ACTIVE', rating: 4.8, vehicle: 'Mack Anthem (aL-881)',
    detail: 'Avg speed: 64mph • On schedule',
    initials: 'SC', initialsColor: '#2563EB', dotColor: '#22C55E',
    avatarBg: '#DBEAFE', avatarType: 'glasses',
    avatarSrc: '/driver-sarah.png',
  },
  {
    id: '6', name: 'Michael Vance', drvId: 'DRV-00213', license: 'Class A CDL',
    status: 'ACTIVE', rating: 4.6, vehicle: 'International LT (IL-449)',
    detail: 'Driving hours: 6h 12m today',
    initials: 'MV', initialsColor: '#2563EB', dotColor: '#22C55E',
    avatarBg: '#DBEAFE', avatarType: 'mask',
    avatarSrc: '/driver-michael.png',
  },
];

function statusStyle(status: DriverStatus): { bg: string; color: string } {
  if (status === 'ACTIVE') return { bg: '#2563EB', color: '#fff' };
  if (status === 'ON BREAK') return { bg: '#2563EB', color: '#fff' };
  return { bg: '#2F80ED', color: '#fff' }; // OFFLINE uses requested #2F80ED
}

/* Driver avatar — 64×64 per-driver image asset */
function DriverAvatar({ src }: { src: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt="driver avatar"
      width={64}
      height={64}
      style={{ width: '64px', height: '64px', borderRadius: '14px', display: 'block', flexShrink: 0, objectFit: 'cover' }}
    />
  );
}

/* ── Driver Card ─────────────────────────────────────────────── */
function DriverCard({ driver }: { driver: Driver }) {
  const status = statusStyle(driver.status);
  const bg = status.bg;
  const color = driver.name === 'Sarah Connor' && driver.status === 'ACTIVE' ? '#0F172A' : status.color;
  return (
    <div style={{
      width: '222px',
      height: '331px',
      background: '#fff',
      borderRadius: '12px',
      border: '1px solid #E2E8F0',
      paddingTop: '20px',
      paddingRight: '20px',
      paddingBottom: '24px',
      paddingLeft: '20px',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      boxSizing: 'border-box',
      boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
    }}>
      {/* Top: avatar (64×64) + status badge + star rating */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>

        {/* Avatar wrapper — blue status ring indicator for James Wilson */}
        <div style={{ position: 'relative', width: '64px', height: '64px', flexShrink: 0 }}>
          <DriverAvatar src={driver.avatarSrc} />
          {(driver.id === '3' || driver.id === '5') && (
            <div style={{
              position: 'absolute',
              top: '60%',
              right: '-10px',
              transform: 'translateY(50%)',
              width: '20px',
              height: '20px',
              borderRadius: '9999px',
              background: '#2F80ED',
              border: '2px solid #FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxSizing: 'border-box',
            }}>
              <div style={{
                width: '8px',
                height: '8px',
                borderRadius: '9999px',
                background: '#FFFFFF',
              }} />
            </div>
          )}
        </div>

        {/* Badge + rating column */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px' }}>
          {/* Status pill — auto width so ON BREAK fits */}
          <span style={{
            height: '23px',
            paddingTop: '4px',
            paddingRight: '10px',
            paddingBottom: '4px',
            paddingLeft: '10px',
            borderRadius: '9999px',
            background: bg,
            color,
            fontFamily: 'Inter',
            fontSize: '10px',
            fontWeight: 700,
            lineHeight: '15px',
            letterSpacing: '0px',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            whiteSpace: 'nowrap',
            boxSizing: 'border-box',
          }}>
            {driver.status}
          </span>
          {/* Star + rating */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M6.5 1l1.545 3.09L11.5 4.745l-2.5 2.437.59 3.418L6.5 9l-3.09 1.6.59-3.418-2.5-2.437 3.455-.655L6.5 1Z"
                fill="#2F80ED" />
            </svg>
            <span style={{ fontFamily: 'Inter', fontSize: '12px', fontWeight: 700, lineHeight: '16px', color: '#191C1E' }}>
              {driver.rating.toFixed(1)}
            </span>
          </div>
        </div>
      </div>

      {/* Name (Manrope 18 / 700 / 28px) + ID */}
      <div style={{ width: '180px' }}>
        <div style={{
          width: '180px',
          fontFamily: 'Manrope',
          fontSize: '18px',
          fontWeight: 700,
          lineHeight: '28px',
          letterSpacing: '0px',
          color: '#191C1E',
        }}>
          {driver.name}
        </div>
        <div style={{ fontFamily: 'Inter', fontSize: '12px', fontWeight: 400, lineHeight: '16px', color: '#2F80ED' }}>
          ID: {driver.drvId} • {driver.license}
        </div>
      </div>

      {/* Vehicle chip — text wraps so long names show on 2 lines */}
      <div style={{
        width: '180px',
        minHeight: '48px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '8px',
        borderRadius: '8px',
        background: '#B7DAF5',
        boxSizing: 'border-box',
      }}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0 }}>
          <rect x="0.5" y="4" width="9" height="6.5" rx="1.2" stroke="#2F80ED" strokeWidth="1.2" />
          <path d="M9.5 5.5h2.5l1.5 3H9.5V5.5Z" stroke="#2F80ED" strokeWidth="1.2" strokeLinejoin="round" />
          <circle cx="3" cy="11" r="1.2" fill="#2F80ED" />
          <circle cx="10" cy="11" r="1.2" fill="#2F80ED" />
        </svg>
        <span style={{
          fontFamily: 'Inter', fontSize: '12px', fontWeight: 500,
          color: '#2F80ED',
          lineHeight: '16px',
        }}>
          {driver.vehicle ?? 'No active vehicle'}
        </span>
      </div>

      {/* Detail line — location pin for active, clock for break, monitor for offline */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '6px' }}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0, marginTop: '1px' }}>
          {driver.status === 'ON BREAK' ? (
            /* clock */
            <>
              <circle cx="7" cy="7" r="5.5" stroke="#64748B" strokeWidth="1.2" />
              <path d="M7 4v3l2 1.5" stroke="#64748B" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </>
          ) : driver.status === 'OFFLINE' ? (
            /* monitor */
            <>
              <rect x="1" y="2.5" width="12" height="8" rx="1.5" stroke="#94A3B8" strokeWidth="1.2" />
              <path d="M5 12.5h4M7 10.5v2" stroke="#94A3B8" strokeWidth="1.2" strokeLinecap="round" />
            </>
          ) : (
            /* location pin */
            <>
              <path d="M7 1C4.791 1 3 2.791 3 5c0 3.5 4 8 4 8s4-4.5 4-8c0-2.209-1.791-4-4-4Z"
                stroke="#64748B" strokeWidth="1.2" />
              <circle cx="7" cy="5" r="1.3" fill="#64748B" />
            </>
          )}
        </svg>
        <span style={{ fontFamily: 'Inter', fontSize: '12px', color: '#475569', lineHeight: '16px', flex: 1 }}>
          {driver.detail}
        </span>
      </div>

      {/* Footer: initials bubble + View Performance */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        borderTop: '1px solid #F1F5F9', paddingTop: '10px', marginTop: 'auto',
      }}>
        <div style={{
          width: '28px', height: '28px', borderRadius: '50%',
        background: '#B7DAF5',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{
            fontFamily: 'Inter', fontSize: '10px', fontWeight: 700,
            color: driver.initialsColor,
          }}>
            {driver.initials}
          </span>
        </div>
        <button suppressHydrationWarning style={{
          background: 'none', border: 'none', padding: 0,
          fontFamily: 'Inter', fontSize: '12px', fontWeight: 600,
          color: '#2F80ED', cursor: 'pointer',
        }}>
          View Performance
        </button>
      </div>
    </div>
  );
}

/* ── Add New Driver card ─────────────────────────────────────── */
function AddNewDriverCard({ onClick }: { onClick?: () => void }) {
  return (
    <div
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={(e) => {
        if (onClick && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick();
        }
      }}
      style={{
      width: '222px',
      height: '331px',
      borderRadius: '12px',
      border: '2px dashed #CBD5E1',
      background: '#FAFAFA',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      gap: '12px', padding: '24px', minHeight: '220px',
      cursor: 'pointer',
      boxSizing: 'border-box',
    }}>
      <div style={{
        width: '44px', height: '44px', borderRadius: '50%',
        background: '#B7DAF5',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M10 4v12M4 10h12" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontFamily: 'Inter', fontSize: '14px', fontWeight: 700, color: '#0F172A', marginBottom: '4px' }}>
          Add New Driver
        </div>
        <div style={{ fontFamily: 'Inter', fontSize: '12px', color: '#2563EB', lineHeight: '1.5' }}>
          Onboard a new member to your<br />
          fleet directory.
        </div>
      </div>
    </div>
  );
}

/* ── Filter chip ─────────────────────────────────────────────── */
function FilterChip({ label }: { label: string }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '6px',
      height: '32px',
      paddingTop: '6px',
      paddingRight: '12px',
      paddingBottom: '6px',
      paddingLeft: '12px',
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

/* ── Page ────────────────────────────────────────────────────── */
export default function DriversPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'All Drivers' | 'Favorites'>('All Drivers');
  const [filterOpen, setFilterOpen] = useState(false);

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

            {/* Controls — total width 460.85, height 40, gap 12 */}
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
                {/* All Drivers — active */}
                <button
                  suppressHydrationWarning
                  onClick={() => setActiveTab('All Drivers')}
                  style={{
                    height: '32px',
                    paddingTop: '8px',
                    paddingRight: '16px',
                    paddingBottom: '8px',
                    paddingLeft: '16px',
                    borderRadius: '6px',
                    background: activeTab === 'All Drivers' ? '#FFFFFF' : 'transparent',
                    boxShadow: activeTab === 'All Drivers' ? '0px 1px 2px 0px rgba(0,0,0,0.05)' : 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontFamily: 'Inter',
                    fontSize: '12px',
                    fontWeight: 700,
                    lineHeight: '16px',
                    letterSpacing: '0px',
                    color: activeTab === 'All Drivers' ? '#2F80ED' : '#191C1E',
                    whiteSpace: 'nowrap',
                    boxSizing: 'border-box',
                  }}
                >
                  All Drivers
                </button>

                {/* Favorites — inactive */}
                <button
                  suppressHydrationWarning
                  onClick={() => setActiveTab('Favorites')}
                  style={{
                    height: '32px',
                    paddingTop: '8px',
                    paddingRight: '16px',
                    paddingBottom: '8px',
                    paddingLeft: '16px',
                    borderRadius: '6px',
                    background: activeTab === 'Favorites' ? '#FFFFFF' : 'transparent',
                    boxShadow: activeTab === 'Favorites' ? '0px 1px 2px 0px rgba(0,0,0,0.05)' : 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontFamily: 'Inter',
                    fontSize: '12px',
                    fontWeight: 700,
                    lineHeight: '16px',
                    letterSpacing: '0px',
                    color: activeTab === 'Favorites' ? '#2F80ED' : '#000000',
                    whiteSpace: 'nowrap',
                    boxSizing: 'border-box',
                  }}
                >
                  Favorites
                </button>
              </div>

              {/* Filter button — bg #B7DAF5, height 36, radius 8 */}
              <button suppressHydrationWarning type="button" onClick={() => setFilterOpen(true)} style={{
                display: 'flex', alignItems: 'center', gap: '7.99px',
                height: '36px',
                paddingTop: '8px', paddingRight: '16px',
                paddingBottom: '8px', paddingLeft: '16px',
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

              {/* Register Driver — bg #2F80ED, height 36, radius 8 */}
              <button suppressHydrationWarning type="button" onClick={() => router.push('/drivers/register')} style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                height: '36px',
                paddingTop: '8px', paddingRight: '16px',
                paddingBottom: '8px', paddingLeft: '16px',
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
            width: '960px',
            height: '40px',
            paddingBottom: '8px',
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

          {/* Driver cards grid */}
          <div style={{
            display: 'grid',
            width: '960px',
            height: '670px',
            gridTemplateColumns: 'repeat(4, 222px)',
            gridTemplateRows: 'repeat(2, 331px)',
            columnGap: '24px',
            rowGap: '24px',
          }}>
            {drivers.map((d) => (
              <DriverCard key={d.id} driver={d} />
            ))}
            <AddNewDriverCard onClick={() => router.push('/drivers/register')} />
          </div>

        </main>
        </>
  );
}
