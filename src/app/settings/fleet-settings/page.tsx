'use client';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';

/* ── Vehicle icon ────────────────────────────────────────────── */
function VehicleIcon({ icon }: { icon: string }) {
  return (
    <div style={{ width: '56px', height: '56px', borderRadius: '10px', background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`/vehicles/${icon}.png`} alt="" style={{ width: '48px', height: '48px', objectFit: 'contain' }} />
    </div>
  );
}

/* ── Toggle switch ───────────────────────────────────────────── */
function Toggle({ on, onChange }: { on: boolean; onChange: (v: boolean) => void }) {
  return (
    <button suppressHydrationWarning onClick={() => onChange(!on)} style={{ width: '44px', height: '24px', borderRadius: '12px', background: on ? '#337ADF' : '#A7CBE8', border: 'none', cursor: 'pointer', position: 'relative', padding: 0, flexShrink: 0 }}>
      <div style={{ position: 'absolute', top: '3px', left: on ? '23px' : '3px', width: '18px', height: '18px', borderRadius: '50%', background: '#F1F5F9', boxShadow: '0 1px 2px rgba(15, 23, 42, 0.18)', transition: 'left 0.15s' }} />
    </button>
  );
}

/* ── Vehicle categories data ─────────────────────────────────── */
const vehicles = [
  { icon: 'motorcycle', label: 'Motorcycle', active: 24, desc: 'Documents, groceries, small parcels. Max payload 10kg.' },
  { icon: 'car', label: 'Car', active: 48, desc: 'Groceries, parcels, fragile goods. Max payload 200kg.' },
  { icon: 'pickup', label: 'Pickup (4x4)', active: 18, desc: 'Small boxes, small furniture, bicycle. Max payload 500kg.' },
  { icon: 'van', label: 'Van', active: 32, desc: 'Appliances, fridge, washing machine. Max payload 1,200kg.' },
  { icon: 'small-lorry', label: 'Small Lorry', active: 14, desc: 'Furniture, sofa, bed frame. Max payload 2,000kg.' },
  { icon: 'large-lorry', label: 'Large Lorry', active: 8, desc: 'Heavy freight, warehouse goods. Max payload 5,000kg.' },
  { icon: 'skip-truck', label: 'Skip Truck', active: 6, desc: 'Bulk materials, construction waste. Max payload 3,000kg.' },
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
                        <VehicleIcon icon={v.icon} />
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
            <div style={{ width: '300px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>

              {/* Payout Rates */}
              <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #E2E8F0', padding: '20px 20px' }}>
                <div style={{ fontFamily: 'Inter', fontSize: '15px', fontWeight: 700, color: '#0F172A', marginBottom: '16px' }}>Payout Rates</div>

                <div style={{ fontFamily: 'Inter', fontSize: '10px', fontWeight: 700, color: '#94A3B8', letterSpacing: '0.6px', marginBottom: '8px' }}>BASE RATE / MILE</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', height: '44px', padding: '0 14px', background: '#B7DAF5', border: '1.5px solid #BFDBFE', borderRadius: '8px', marginBottom: '16px' }}>
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
              <div style={{ background: '#fff', borderRadius: '14px', border: '1px solid #E2E8F0', padding: '28px 28px' }}>
                <div style={{ fontFamily: 'Inter', fontSize: '31px', fontWeight: 700, color: '#0F172A', marginBottom: '30px', lineHeight: 1.08, letterSpacing: '-0.4px' }}>Maintenance Logic</div>

                {/* Toggle rows */}
                {[
                  { label: 'Mileage Threshold', sub: 'Auto-alert every 5k miles', on: mileage,    set: setMileage    },
                  { label: 'Emission Check',    sub: 'Annual regulatory alert',   on: emission,   set: setEmission   },
                  { label: 'Telematics Faults', sub: 'Real-time engine alerts',   on: telematics, set: setTelematics },
                ].map((item, i) => (
                  <div key={item.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', paddingBottom: i < 2 ? '22px' : '0', marginBottom: i < 2 ? '22px' : '0', borderBottom: i < 2 ? '1px solid #EFF3F8' : 'none' }}>
                    <div>
                      <div style={{ fontFamily: 'Inter', fontSize: '14px', fontWeight: 700, color: '#0F172A', marginBottom: '4px', lineHeight: 1.18 }}>{item.label}</div>
                      <div style={{ fontFamily: 'Inter', fontSize: '12px', color: '#2E74D7', lineHeight: 1.2 }}>{item.sub}</div>
                    </div>
                    <Toggle on={item.on} onChange={item.set} />
                  </div>
                ))}

                {/* Critical Notification */}
                <div style={{ marginTop: '36px', paddingTop: '24px', borderTop: '2px solid #ECEFF4' }}>
                  <div style={{ fontFamily: 'Inter', fontSize: '13px', fontWeight: 700, color: '#111827', letterSpacing: '0.8px', marginBottom: '14px' }}>CRITICAL NOTIFICATION</div>
                  <div style={{ background: '#A5C8E4', borderRadius: '16px', padding: '22px 22px', display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                    <svg width="34" height="34" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: '3px' }}>
                      <path d="M8 2L14.5 13H1.5L8 2Z" stroke="#2C79DE" strokeWidth="1.4" strokeLinejoin="round"/>
                      <path d="M8 6.5v3M8 11v.5" stroke="#2C79DE" strokeWidth="1.4" strokeLinecap="round"/>
                    </svg>
                    <div>
                      <div style={{ fontFamily: 'Inter', fontSize: '16px', fontWeight: 700, color: '#2C79DE', marginBottom: '4px', lineHeight: 1.15 }}>Fleet Sync Pending</div>
                      <div style={{ fontFamily: 'Inter', fontSize: '12px', color: '#2C79DE', lineHeight: '1.3' }}>4 trucks missed the weekly scan.</div>
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
