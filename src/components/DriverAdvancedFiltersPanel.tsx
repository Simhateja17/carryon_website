'use client';

import { useEffect, useState } from 'react';

const manrope = "'Manrope', Inter, sans-serif";

type Props = {
  open: boolean;
  onClose: () => void;
};

const DRIVER_STATUS_ROW1 = ['Active', 'On Break', 'Offline'] as const;
const DRIVER_STATUS_ROW2 = ['In Transit'] as const;
type DriverStatusOpt = (typeof DRIVER_STATUS_ROW1)[number] | (typeof DRIVER_STATUS_ROW2)[number];

export default function DriverAdvancedFiltersPanel({ open, onClose }: Props) {
  const [driverStatus, setDriverStatus] = useState<DriverStatusOpt>('Active');
  const [vehicle, setVehicle] = useState({ truck: true, van: false, bike: true, evCar: false });
  const [minRating, setMinRating] = useState(4.5);
  const [sector, setSector] = useState<'A1' | 'B2' | 'C4'>('B2');
  const [license, setLicense] = useState({ commercialA: true, hazmat: false, international: false });

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  if (!open) return null;

  const toggleVehicle = (key: keyof typeof vehicle) => {
    setVehicle((v) => ({ ...v, [key]: !v[key] }));
  };

  const reset = () => {
    setDriverStatus('Active');
    setVehicle({ truck: true, van: false, bike: true, evCar: false });
    setMinRating(4.5);
    setSector('B2');
    setLicense({ commercialA: true, hazmat: false, international: false });
  };

  const sectionTitle = (text: string) => (
    <div style={{ alignSelf: 'stretch' }}>
      <span
        style={{
          fontFamily: manrope,
          fontSize: '12px',
          fontWeight: 700,
          lineHeight: '16px',
          letterSpacing: '1.2px',
          textTransform: 'uppercase',
          color: '#000',
        }}
      >
        {text}
      </span>
    </div>
  );

  const VehicleTile = ({
    id,
    label,
    selected,
    icon,
  }: {
    id: keyof typeof vehicle;
    label: string;
    selected: boolean;
    icon: React.ReactNode;
  }) => (
    <button
      suppressHydrationWarning
      type="button"
      onClick={() => toggleVehicle(id)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '11px',
        height: '58px',
        padding: '17px 16px',
        borderRadius: '12px',
        border: '1px solid transparent',
        background: 'rgba(166, 210, 243, 0.2)',
        cursor: 'pointer',
        textAlign: 'left',
        boxSizing: 'border-box',
      }}
    >
      <span
        style={{
          width: selected ? '18px' : '16px',
          height: selected ? '18px' : '16px',
          borderRadius: selected ? '4px' : '4px',
          background: selected ? '#2F80ED' : '#fff',
          border: selected ? 'none' : '1px solid #C2C6D6',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        {selected ? (
          <svg width="12" height="10" viewBox="0 0 12 10" fill="none" aria-hidden>
            <path d="M1 5l3 3 7-7" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ) : null}
      </span>
      <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '24px', color: '#2F80ED' }}>
          {icon}
        </span>
        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: 600, color: '#2F80ED', lineHeight: '20px' }}>
          {label}
        </span>
      </span>
    </button>
  );

  return (
    <>
      {/* Backdrop */}
      <button
        suppressHydrationWarning
        type="button"
        aria-label="Close filters"
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(15, 23, 42, 0.35)',
          zIndex: 100,
          border: 'none',
          cursor: 'pointer',
          padding: 0,
        }}
      />

      {/* Panel — Figma 439px */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="driver-filters-title"
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          width: '439px',
          maxWidth: '100vw',
          display: 'flex',
          flexDirection: 'column',
          background: '#FFF',
          zIndex: 101,
          boxShadow: '-8px 0 32px rgba(15, 23, 42, 0.12)',
          boxSizing: 'border-box',
        }}
      >
        {/* Header — node 105:9829 */}
        <div
          style={{
            display: 'flex',
            width: '100%',
            padding: '32px',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '1px solid #ECEEF0',
            background: 'rgba(242, 244, 246, 0.5)',
            flexShrink: 0,
            boxSizing: 'border-box',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '4px', minWidth: 0 }}>
            <h2
              id="driver-filters-title"
              style={{
                margin: 0,
                fontFamily: manrope,
                fontSize: '18px',
                fontWeight: 800,
                color: '#191C1E',
                lineHeight: '24px',
              }}
            >
              Advanced Filters
            </h2>
            <p
              style={{
                margin: 0,
                width: '236.72px',
                maxWidth: '100%',
                fontFamily: 'Inter, sans-serif',
                fontSize: '12px',
                fontWeight: 500,
                lineHeight: '16px',
                color: '#000',
              }}
            >
              Refine your fleet view with 14 parameters
            </p>
          </div>
          <button
            suppressHydrationWarning
            type="button"
            onClick={onClose}
            aria-label="Close"
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
              <path d="M1 1l12 12M13 1L1 13" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Scrollable body — padding 32px, gap 32px between sections */}
        <div
          style={{
            flex: 1,
            minHeight: 0,
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            padding: '32px',
            gap: '32px',
            boxSizing: 'border-box',
          }}
        >
          {/* Driver Status — 105:9839 */}
          <div style={{ display: 'flex', width: '100%', maxWidth: '375px', flexDirection: 'column', alignItems: 'flex-start', gap: '16px' }}>
            {sectionTitle('Driver Status')}
            <div
              style={{
                position: 'relative',
                minHeight: '86px',
                alignSelf: 'stretch',
                width: '100%',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'flex-start' }}>
                  {DRIVER_STATUS_ROW1.map((s) => {
                    const sel = driverStatus === s;
                    return (
                      <button
                        suppressHydrationWarning
                        key={s}
                        type="button"
                        onClick={() => setDriverStatus(s)}
                        style={{
                          display: 'inline-flex',
                          padding: '8px 16px',
                          alignItems: 'center',
                          gap: '8px',
                          borderRadius: '9999px',
                          border: sel ? '2px solid #2F80ED' : '1px solid #C2C6D6',
                          background: sel ? 'rgba(0, 88, 190, 0.05)' : 'transparent',
                          cursor: 'pointer',
                          fontFamily: 'Inter, sans-serif',
                          fontSize: '14px',
                          fontWeight: sel ? 600 : 500,
                          lineHeight: '20px',
                          color: sel ? '#2F80ED' : '#000',
                        }}
                      >
                        {sel ? (
                          <span style={{ width: '8px', height: '8px', borderRadius: '9999px', background: '#2F80ED', flexShrink: 0 }} />
                        ) : null}
                        {s}
                      </button>
                    );
                  })}
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  {DRIVER_STATUS_ROW2.map((s) => {
                    const sel = driverStatus === s;
                    return (
                      <button
                        suppressHydrationWarning
                        key={s}
                        type="button"
                        onClick={() => setDriverStatus(s)}
                        style={{
                          display: 'inline-flex',
                          padding: '8px 16px',
                          alignItems: 'center',
                          gap: '8px',
                          borderRadius: '9999px',
                          border: sel ? '2px solid #2F80ED' : '1px solid #C2C6D6',
                          background: sel ? 'rgba(0, 88, 190, 0.05)' : 'transparent',
                          cursor: 'pointer',
                          fontFamily: 'Inter, sans-serif',
                          fontSize: '14px',
                          fontWeight: sel ? 600 : 500,
                          lineHeight: '20px',
                          color: sel ? '#2F80ED' : '#000',
                        }}
                      >
                        {sel ? (
                          <span style={{ width: '8px', height: '8px', borderRadius: '9999px', background: '#2F80ED', flexShrink: 0 }} />
                        ) : null}
                        {s}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Vehicle Type */}
          <div style={{ display: 'flex', width: '100%', maxWidth: '375px', flexDirection: 'column', alignItems: 'flex-start', gap: '16px' }}>
            {sectionTitle('Vehicle Type')}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '12px',
                width: '100%',
              }}
            >
              <VehicleTile
                id="truck"
                label="Truck"
                selected={vehicle.truck}
                icon={
                  <svg width="22" height="16" viewBox="0 0 22 16" fill="none" aria-hidden>
                    <rect x="1" y="4" width="12" height="8" rx="1.2" stroke="currentColor" strokeWidth="1.3" />
                    <path d="M13 6h3.5l2.5 4H13V6Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
                    <circle cx="5.5" cy="13" r="1.5" fill="currentColor" />
                    <circle cx="15.5" cy="13" r="1.5" fill="currentColor" />
                  </svg>
                }
              />
              <VehicleTile
                id="van"
                label="Van"
                selected={vehicle.van}
                icon={
                  <svg width="22" height="14" viewBox="0 0 22 14" fill="none" aria-hidden>
                    <rect x="1" y="3" width="14" height="8" rx="1.2" stroke="currentColor" strokeWidth="1.3" />
                    <path d="M15 5h4l2 4h-6V5Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
                    <circle cx="6" cy="12" r="1.3" fill="currentColor" />
                    <circle cx="16" cy="12" r="1.3" fill="currentColor" />
                  </svg>
                }
              />
              <VehicleTile
                id="bike"
                label="Bike"
                selected={vehicle.bike}
                icon={
                  <svg width="24" height="16" viewBox="0 0 24 16" fill="none" aria-hidden>
                    <circle cx="6" cy="12" r="3.5" stroke="currentColor" strokeWidth="1.3" />
                    <circle cx="18" cy="12" r="3.5" stroke="currentColor" strokeWidth="1.3" />
                    <path d="M9 12l4-8 3 4M13 4l2 2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                  </svg>
                }
              />
              <VehicleTile
                id="evCar"
                label="EV Car"
                selected={vehicle.evCar}
                icon={
                  <svg width="18" height="22" viewBox="0 0 18 22" fill="none" aria-hidden>
                    <path d="M4 8h10v8H4V8Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
                    <path d="M6 8V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v3M9 14v3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                  </svg>
                }
              />
            </div>
          </div>

          {/* Minimum Rating */}
          <div style={{ display: 'flex', width: '100%', maxWidth: '375px', flexDirection: 'column', alignItems: 'flex-start', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', gap: '12px' }}>
              <span
                style={{
                  fontFamily: manrope,
                  fontSize: '12px',
                  fontWeight: 700,
                  lineHeight: '16px',
                  letterSpacing: '1.2px',
                  textTransform: 'uppercase',
                  color: '#000',
                }}
              >
                Minimum Rating
              </span>
              <span
                style={{
                  background: 'rgba(0, 88, 190, 0.1)',
                  color: '#2F80ED',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '14px',
                  fontWeight: 600,
                  lineHeight: '20px',
                  padding: '2px 8px',
                  borderRadius: '4px',
                  flexShrink: 0,
                }}
              >
                {minRating.toFixed(1)}+ Stars
              </span>
            </div>
            <div style={{ width: '100%', paddingTop: '4px' }}>
              <div style={{ position: 'relative', height: '8px', borderRadius: '8px', background: '#E2E8F0', marginBottom: '8px' }}>
                <div
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: `${((minRating - 1) / 4) * 100}%`,
                    borderRadius: '8px',
                    background: '#A6D2F3',
                    maxWidth: '100%',
                  }}
                />
                <input
                  suppressHydrationWarning
                  type="range"
                  min={1}
                  max={5}
                  step={0.5}
                  value={minRating}
                  onChange={(e) => setMinRating(Number(e.target.value))}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '24px',
                    top: '-8px',
                    opacity: 0,
                    cursor: 'pointer',
                    margin: 0,
                  }}
                />
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  paddingLeft: '4px',
                  paddingRight: '4px',
                }}
              >
                {['1.0', '2.0', '3.0', '4.0', '5.0'].map((t) => (
                  <span key={t} style={{ fontFamily: 'Inter, sans-serif', fontSize: '10px', fontWeight: 600, color: '#000', lineHeight: '15px' }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Region / Sector */}
          <div style={{ display: 'flex', width: '100%', maxWidth: '375px', flexDirection: 'column', alignItems: 'flex-start', gap: '16px' }}>
            {sectionTitle('Region/Sector')}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  height: '44px',
                  padding: '0 16px',
                  borderRadius: '12px',
                  background: '#B7DAF5',
                  boxSizing: 'border-box',
                }}
              >
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: 500, color: '#000', lineHeight: '20px' }}>
                  North Metropolitan Area
                </span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                  <path d="M4 6l4 4 4-4" stroke="#191C1E" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', width: '100%' }}>
                {(
                  [
                    { id: 'A1' as const, label: 'Sector A1' },
                    { id: 'B2' as const, label: 'Sector B2' },
                    { id: 'C4' as const, label: 'Sector C4' },
                  ]
                ).map(({ id, label }) => {
                  const sel = sector === id;
                  return (
                    <button
                      suppressHydrationWarning
                      key={id}
                      type="button"
                      onClick={() => setSector(id)}
                      style={{
                        padding: '8px',
                        borderRadius: '8px',
                        border: 'none',
                        cursor: 'pointer',
                        background: sel ? '#2F80ED' : '#A6D2F3',
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '10px',
                        fontWeight: 600,
                        letterSpacing: '-0.5px',
                        textTransform: 'uppercase',
                        lineHeight: '15px',
                        color: sel ? '#fff' : '#000',
                      }}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Registration Period */}
          <div style={{ display: 'flex', width: '100%', maxWidth: '375px', flexDirection: 'column', alignItems: 'flex-start', gap: '16px' }}>
            {sectionTitle('Registration Period')}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%' }}>
              <div
                style={{
                  flex: 1,
                  minWidth: 0,
                  background: '#B7DAF5',
                  borderRadius: '12px',
                  padding: '12px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                }}
              >
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '10px', fontWeight: 600, textTransform: 'uppercase', color: '#000', lineHeight: '15px' }}>
                  From
                </span>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: 600, color: '#000', lineHeight: '20px' }}>
                  Jan 01, 2024
                </span>
              </div>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                <path d="M6 4l4 4-4 4" stroke="#64748B" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div
                style={{
                  flex: 1,
                  minWidth: 0,
                  background: '#B7DAF5',
                  borderRadius: '12px',
                  padding: '12px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                }}
              >
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '10px', fontWeight: 600, textTransform: 'uppercase', color: '#000', lineHeight: '15px' }}>
                  To
                </span>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: 600, color: '#000', lineHeight: '20px' }}>
                  Today
                </span>
              </div>
            </div>
          </div>

          {/* License Type */}
          <div style={{ display: 'flex', width: '100%', maxWidth: '375px', flexDirection: 'column', alignItems: 'flex-start', gap: '16px', paddingBottom: '16px' }}>
            {sectionTitle('License Type')}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
              {(
                [
                  { key: 'commercialA' as const, label: 'Commercial Class A' },
                  { key: 'hazmat' as const, label: 'Hazmat Certified' },
                  { key: 'international' as const, label: 'International Cargo' },
                ]
              ).map(({ key, label }) => {
                const sel = license[key];
                return (
                  <button
                    suppressHydrationWarning
                    key={key}
                    type="button"
                    onClick={() => setLicense((L) => ({ ...L, [key]: !L[key] }))}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      width: '100%',
                      padding: '12px',
                      borderRadius: '8px',
                      border: 'none',
                      background: 'transparent',
                      cursor: 'pointer',
                      textAlign: 'left',
                    }}
                  >
                    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: 500, color: '#000', lineHeight: '20px' }}>
                      {label}
                    </span>
                    <span
                      style={{
                        width: sel ? '22px' : '20px',
                        height: sel ? '22px' : '20px',
                        borderRadius: '9999px',
                        border: sel ? 'none' : '1px solid #C2C6D6',
                        background: sel ? '#2F80ED' : '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      {sel ? (
                        <svg width="12" height="9" viewBox="0 0 12 9" fill="none" aria-hidden>
                          <path d="M1 4.5L4.5 8 11 1" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      ) : null}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer — 105:9961: buttons side-by-side like screenshot */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            padding: '32px',
            alignItems: 'stretch',
            gap: '16px',
            borderTop: '1px solid #ECEEF0',
            background: '#FFF',
            flexShrink: 0,
            boxSizing: 'border-box',
          }}
        >
          <button
            suppressHydrationWarning
            type="button"
            onClick={reset}
            style={{
              flex: '1 1 0',
              minWidth: 0,
              display: 'inline-flex',
              padding: '12px 16px',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              borderRadius: '8px',
              border: 'none',
              background: '#B7DAF5',
              cursor: 'pointer',
              fontFamily: manrope,
              fontSize: '12px',
              fontWeight: 700,
              letterSpacing: '1.2px',
              textTransform: 'uppercase',
              color: '#191C1E',
              lineHeight: '16px',
              minHeight: '44px',
              boxSizing: 'border-box',
            }}
          >
            Reset
          </button>
          <button
            suppressHydrationWarning
            type="button"
            onClick={onClose}
            style={{
              flex: '1 1 0',
              minWidth: 0,
              display: 'inline-flex',
              padding: '12px 16px',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              borderRadius: '8px',
              border: 'none',
              background: '#2F80ED',
              cursor: 'pointer',
              fontFamily: manrope,
              fontSize: '12px',
              fontWeight: 700,
              letterSpacing: '1.2px',
              textTransform: 'uppercase',
              color: '#fff',
              lineHeight: '16px',
              minHeight: '44px',
              boxSizing: 'border-box',
              boxShadow: '0 10px 15px -3px rgba(0, 88, 190, 0.2), 0 4px 6px -4px rgba(0, 88, 190, 0.2)',
            }}
          >
            Apply Filters
          </button>
        </div>
      </aside>
    </>
  );
}
