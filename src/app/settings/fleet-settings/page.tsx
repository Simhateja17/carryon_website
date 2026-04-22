'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';

/* ── Vehicle icon ────────────────────────────────────────────── */
function VehicleIcon({ type }: { type: 'bike' | 'car' | 'van' | 'truck' }) {
  const icons: Record<string, React.ReactNode> = {
    bike: (
      <svg width="22" height="20" viewBox="0 0 22 20" fill="none">
        <circle cx="4.5" cy="15" r="3.5" stroke="#2563EB" strokeWidth="1.5"/>
        <circle cx="17.5" cy="15" r="3.5" stroke="#2563EB" strokeWidth="1.5"/>
        <path d="M4.5 15L9 6h4l4 9" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 6h5" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="11" cy="5" r="1.5" fill="#2563EB"/>
      </svg>
    ),
    car: (
      <svg width="22" height="16" viewBox="0 0 22 16" fill="none">
        <rect x="1" y="6" width="20" height="7" rx="2" stroke="#2563EB" strokeWidth="1.5"/>
        <path d="M4 6l2.5-4h9l2.5 4" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="5.5" cy="13.5" r="2" fill="#2563EB"/>
        <circle cx="16.5" cy="13.5" r="2" fill="#2563EB"/>
        <path d="M8 6h6" stroke="#2563EB" strokeWidth="1.2"/>
      </svg>
    ),
    van: (
      <svg width="22" height="16" viewBox="0 0 22 16" fill="none">
        <rect x="1" y="4" width="14" height="9" rx="1.5" stroke="#2563EB" strokeWidth="1.5"/>
        <path d="M15 6.5h4l2 4H15V6.5Z" stroke="#2563EB" strokeWidth="1.5" strokeLinejoin="round"/>
        <circle cx="5" cy="14" r="1.8" fill="#2563EB"/>
        <circle cx="14" cy="14" r="1.8" fill="#2563EB"/>
        <circle cx="19" cy="14" r="1.8" fill="#2563EB"/>
      </svg>
    ),
    truck: (
      <svg width="22" height="16" viewBox="0 0 22 16" fill="none">
        <rect x="1" y="3" width="12" height="10" rx="1.5" stroke="#2563EB" strokeWidth="1.5"/>
        <path d="M13 5.5h5l3 5H13V5.5Z" stroke="#2563EB" strokeWidth="1.5" strokeLinejoin="round"/>
        <circle cx="4.5" cy="14" r="1.8" fill="#2563EB"/>
        <circle cx="10.5" cy="14" r="1.8" fill="#2563EB"/>
        <circle cx="18" cy="14" r="1.8" fill="#2563EB"/>
      </svg>
    ),
  };
  return (
    <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      {icons[type]}
    </div>
  );
}

/* ── Toggle switch ───────────────────────────────────────────── */
function Toggle({ on, onChange }: { on: boolean; onChange: (v: boolean) => void }) {
  return (
    <button suppressHydrationWarning onClick={() => onChange(!on)} style={{ width: '44px', height: '24px', borderRadius: '12px', background: on ? '#2563EB' : '#CBD5E1', border: 'none', cursor: 'pointer', position: 'relative', padding: 0, flexShrink: 0 }}>
      <div style={{ position: 'absolute', top: '3px', left: on ? '23px' : '3px', width: '18px', height: '18px', borderRadius: '50%', background: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,0.2)', transition: 'left 0.15s' }} />
    </button>
  );
}

/* ── Vehicle categories data ─────────────────────────────────── */
const vehicles = [
  { type: 'bike'  as const, label: 'Bikes',  active: 12, desc: 'Urban last-mile delivery. Max payload 25kg.' },
  { type: 'car'   as const, label: 'Cars',   active: 48, desc: 'Standard courier routes. Max payload 400kg.' },
  { type: 'van'   as const, label: 'Vans',   active: 32, desc: 'Large parcel routes. Max payload 1,200kg.' },
  { type: 'truck' as const, label: 'Trucks', active: 8,  desc: 'Inter-city logistics. Max payload 8,000kg.' },
];

/* ── Page ────────────────────────────────────────────────────── */
export default function FleetSettingsPage() {
  const [mileage,    setMileage]    = useState(true);
  const [emission,   setEmission]   = useState(true);
  const [telematics, setTelematics] = useState(false);
  const [baseRate,   setBaseRate]   = useState('1.45');

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: '#F8FAFC', fontFamily: 'Inter, sans-serif' }}>
      <Sidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minWidth: 0 }}>
        <Navbar />

        {/* Content */}
        <main style={{ flex: 1, padding: '28px 28px', overflowY: 'auto', boxSizing: 'border-box' }}>

          {/* Page title */}
          <h1 style={{ margin: '0 0 6px', fontFamily: 'Inter', fontSize: '26px', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.3px' }}>Fleet Infrastructure</h1>
          <p style={{ margin: '0 0 24px', fontFamily: 'Inter', fontSize: '13px', color: '#64748B', lineHeight: '1.6', maxWidth: '560px' }}>
            Configure the operational parameters for your Carry On logistics network. Manage asset classification, financial triggers, and automated maintenance workflows.
          </p>

          {/* Two-column layout */}
          <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>

            {/* LEFT column */}
            <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>

              {/* Vehicle Categories */}
              <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #E2E8F0', padding: '22px 24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
                  <span style={{ fontFamily: 'Inter', fontSize: '15px', fontWeight: 700, color: '#0F172A' }}>Vehicle Categories</span>
                  <button suppressHydrationWarning style={{ fontFamily: 'Inter', fontSize: '13px', fontWeight: 600, color: '#2563EB', background: 'none', border: 'none', cursor: 'pointer' }}>+ Add New Class</button>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  {vehicles.map((v) => (
                    <div key={v.label} style={{ background: '#F8FAFC', borderRadius: '10px', border: '1px solid #E2E8F0', padding: '16px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                        <VehicleIcon type={v.type} />
                        <span style={{ display: 'inline-flex', alignItems: 'center', padding: '2px 10px', borderRadius: '999px', background: '#DBEAFE', fontFamily: 'Inter', fontSize: '11px', fontWeight: 700, color: '#1D4ED8' }}>
                          {v.active} Active
                        </span>
                      </div>
                      <div style={{ fontFamily: 'Inter', fontSize: '14px', fontWeight: 700, color: '#0F172A', marginBottom: '4px' }}>{v.label}</div>
                      <div style={{ fontFamily: 'Inter', fontSize: '11px', color: '#2563EB', lineHeight: '1.5' }}>{v.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Operational Regions */}
              <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #E2E8F0', padding: '22px 24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <span style={{ fontFamily: 'Inter', fontSize: '15px', fontWeight: 700, color: '#0F172A' }}>Operational Regions</span>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button suppressHydrationWarning style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748B', display: 'flex', alignItems: 'center' }}>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="1" y="2" width="4" height="12" rx="1" stroke="currentColor" strokeWidth="1.3"/><rect x="7" y="2" width="4" height="12" rx="1" stroke="currentColor" strokeWidth="1.3"/><rect x="1" y="2" width="14" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.3"/></svg>
                    </button>
                    <button suppressHydrationWarning style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748B', display: 'flex', alignItems: 'center' }}>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 4h12M4 8h8M6 12h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>
                    </button>
                  </div>
                </div>

                {[
                  { name: 'London Metropolitan', sub: '42 Active hubs • Zone 1-6' },
                  { name: 'Manchester District',  sub: '15 Active hubs • Greater Manchester' },
                ].map((region, i, arr) => (
                  <div key={region.name} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 0', borderTop: i === 0 ? '1px solid #F1F5F9' : 'none', borderBottom: i < arr.length - 1 ? '1px solid #F1F5F9' : 'none' }}>
                    <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <path d="M9 1C6.239 1 4 3.239 4 6c0 4.5 5 11 5 11s5-6.5 5-11c0-2.761-2.239-5-5-5Z" stroke="#2563EB" strokeWidth="1.5"/>
                        <circle cx="9" cy="6" r="2" fill="#2563EB"/>
                      </svg>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: 'Inter', fontSize: '14px', fontWeight: 700, color: '#0F172A' }}>{region.name}</div>
                      <div style={{ fontFamily: 'Inter', fontSize: '11px', color: '#64748B', marginTop: '2px' }}>{region.sub}</div>
                    </div>
                    <button suppressHydrationWarning style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8', display: 'flex', alignItems: 'center', padding: '4px' }}>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="3" r="1.2" fill="currentColor"/><circle cx="8" cy="8" r="1.2" fill="currentColor"/><circle cx="8" cy="13" r="1.2" fill="currentColor"/></svg>
                    </button>
                  </div>
                ))}
              </div>

            </div>

            {/* RIGHT column */}
            <div style={{ width: '240px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>

              {/* Payout Rates */}
              <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #E2E8F0', padding: '20px 20px' }}>
                <div style={{ fontFamily: 'Inter', fontSize: '15px', fontWeight: 700, color: '#0F172A', marginBottom: '16px' }}>Payout Rates</div>

                <div style={{ fontFamily: 'Inter', fontSize: '10px', fontWeight: 700, color: '#94A3B8', letterSpacing: '0.6px', marginBottom: '8px' }}>BASE RATE / MILE</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', height: '44px', padding: '0 14px', background: '#EFF6FF', border: '1.5px solid #BFDBFE', borderRadius: '8px', marginBottom: '16px' }}>
                  <span style={{ fontFamily: 'Inter', fontSize: '16px', color: '#94A3B8' }}>£</span>
                  <input
                    suppressHydrationWarning
                    value={baseRate}
                    onChange={(e) => setBaseRate(e.target.value)}
                    style={{ flex: 1, border: 'none', background: 'transparent', fontFamily: 'Inter', fontSize: '18px', fontWeight: 700, color: '#0F172A', outline: 'none' }}
                  />
                </div>

                <div style={{ fontFamily: 'Inter', fontSize: '10px', fontWeight: 700, color: '#94A3B8', letterSpacing: '0.6px', marginBottom: '6px' }}>PEAK MULTIPLIER</div>
                <div style={{ fontFamily: 'Inter', fontSize: '22px', fontWeight: 800, color: '#2563EB', marginBottom: '18px', textAlign: 'right' }}>x1.5</div>

                <button suppressHydrationWarning style={{ width: '100%', height: '40px', borderRadius: '8px', background: '#2563EB', border: 'none', cursor: 'pointer', fontFamily: 'Inter', fontSize: '13px', fontWeight: 700, color: '#fff' }}>
                  Update Financials
                </button>
              </div>

              {/* Maintenance Logic */}
              <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #E2E8F0', padding: '20px 20px' }}>
                <div style={{ fontFamily: 'Inter', fontSize: '15px', fontWeight: 700, color: '#0F172A', marginBottom: '18px' }}>Maintenance Logic</div>

                {/* Toggle rows */}
                {[
                  { label: 'Mileage Threshold', sub: 'Auto-alert every 5k miles', on: mileage,    set: setMileage    },
                  { label: 'Emission Check',    sub: 'Annual regulatory alert',   on: emission,   set: setEmission   },
                  { label: 'Telematics Faults', sub: 'Real-time engine alerts',   on: telematics, set: setTelematics },
                ].map((item, i) => (
                  <div key={item.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', paddingBottom: i < 2 ? '14px' : '0', marginBottom: i < 2 ? '14px' : '0', borderBottom: i < 2 ? '1px solid #F1F5F9' : 'none' }}>
                    <div>
                      <div style={{ fontFamily: 'Inter', fontSize: '13px', fontWeight: 600, color: '#0F172A', marginBottom: '2px' }}>{item.label}</div>
                      <div style={{ fontFamily: 'Inter', fontSize: '11px', color: '#64748B' }}>{item.sub}</div>
                    </div>
                    <Toggle on={item.on} onChange={item.set} />
                  </div>
                ))}

                {/* Critical Notification */}
                <div style={{ marginTop: '18px' }}>
                  <div style={{ fontFamily: 'Inter', fontSize: '9px', fontWeight: 700, color: '#94A3B8', letterSpacing: '0.6px', marginBottom: '8px' }}>CRITICAL NOTIFICATION</div>
                  <div style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: '8px', padding: '12px 12px', display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: '1px' }}>
                      <path d="M8 2L14.5 13H1.5L8 2Z" stroke="#F59E0B" strokeWidth="1.4" strokeLinejoin="round"/>
                      <path d="M8 6.5v3M8 11v.5" stroke="#F59E0B" strokeWidth="1.4" strokeLinecap="round"/>
                    </svg>
                    <div>
                      <div style={{ fontFamily: 'Inter', fontSize: '12px', fontWeight: 700, color: '#1D4ED8', marginBottom: '2px' }}>Fleet Sync Pending</div>
                      <div style={{ fontFamily: 'Inter', fontSize: '11px', color: '#64748B', lineHeight: '1.4' }}>4 trucks missed the weekly scan.</div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
