'use client';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';

const manrope = "'Manrope', sans-serif";
const inter = "'Inter', sans-serif";

const tabs = ['Base Fare', 'Surge Pricing', 'Zone Pricing', 'Coupons', 'Commission', 'Charges'];

const vehicleFares = [
  { type: 'Bike', icon: 'bike', base: '2.50', perKm: '0.45', min: '5.00' },
  { type: 'Pickup', icon: 'pickup', base: '8.00', perKm: '1.20', min: '15.00' },
  { type: 'Truck', icon: 'truck', base: '25.00', perKm: '3.50', min: '45.00' },
];

const surgeItems = [
  { name: 'Time-based Surge', multiplier: '1.5x', desc: 'Active during configured peak hours (20:00 - 04:00).', active: true },
  { name: 'Demand-based Surge', multiplier: '1.0x', desc: 'Applies when demand exceeds driver supply by 20%.', active: false },
  { name: 'Area-based Surge', multiplier: '1.2x', desc: 'Triggers in Central Business District during gridlock alerts.', active: true },
];

const coupons = [
  { code: 'SAVE25NOW', desc: '25% Off • Up to $10 • Pickup Only', status: 'ACTIVE', expires: 'Dec 31, 2024', usage: '432 / 1000' },
  { code: 'FIRSTM30VE', desc: 'Flat $5 Off • First 3 Orders', status: 'PAUSED', expires: 'N/A (Unlimited)', usage: '897 / --' },
];

const history = [
  { time: 'Today, 10:45 AM', user: 'Admin_Robert', action: 'Updated Base Fare for Truck (+12%)', status: 'SUCCESS', statusColor: '#059669', statusBg: '#D1FAE5' },
  { time: 'Yesterday, 4:12 PM', user: 'System_Auto', action: 'Enabled Weekend Surge in Downtown', status: 'SYSTEM', statusColor: '#3B82F6', statusBg: '#DBEAFE' },
];

function VehicleIcon({ type }: { type: string }) {
  const icons: Record<string, React.ReactNode> = {
    bike: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="5" cy="14" r="3" stroke="#3B82F6" strokeWidth="1.4" />
        <circle cx="15" cy="14" r="3" stroke="#3B82F6" strokeWidth="1.4" />
        <path d="M8 14l3-6 2 3M5 14h10" stroke="#3B82F6" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    pickup: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="2" y="6" width="11" height="7" rx="1.5" stroke="#3B82F6" strokeWidth="1.4" />
        <path d="M13 8h3l2 4H13V8Z" stroke="#3B82F6" strokeWidth="1.4" strokeLinejoin="round" />
        <circle cx="6" cy="14.5" r="1.5" fill="#3B82F6" />
        <circle cx="15" cy="14.5" r="1.5" fill="#3B82F6" />
      </svg>
    ),
    truck: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="1" y="5" width="13" height="8" rx="1.5" stroke="#3B82F6" strokeWidth="1.4" />
        <path d="M14 7h3l2 4v2h-5V7Z" stroke="#3B82F6" strokeWidth="1.4" strokeLinejoin="round" />
        <circle cx="5" cy="14.5" r="1.5" fill="#3B82F6" />
        <circle cx="15" cy="14.5" r="1.5" fill="#3B82F6" />
      </svg>
    ),
  };
  return <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{icons[type] || null}</div>;
}

export default function PricingPage() {
  const [activeTab, setActiveTab] = useState('Base Fare');

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: '#F6F8FA' }}>
      <Sidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minWidth: 0 }}>
        <Navbar />
        <main style={{ flex: 1, overflowY: 'auto', padding: '24px', background: '#F6F8FA', boxSizing: 'border-box' }}>

          {/* ── Header ── */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
            <div>
              <h1 style={{ fontFamily: manrope, fontSize: '28px', fontWeight: 800, color: '#0F172A', margin: 0, marginBottom: '6px' }}>Pricing & Fare Management</h1>
              <p style={{ fontFamily: inter, fontSize: '13px', fontWeight: 500, color: '#64748B', margin: 0 }}>Configure global pricing rules, surge multipliers, and simulated cost breakdowns.</p>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button suppressHydrationWarning type="button" style={{
                padding: '10px 18px', borderRadius: '8px', border: '1px solid #E2E8F0', background: '#FFFFFF',
                fontFamily: inter, fontSize: '12px', fontWeight: 700, color: '#374151', cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: '6px',
              }}>
                Export Rules
              </button>
              <button suppressHydrationWarning type="button" style={{
                padding: '10px 18px', borderRadius: '8px', border: 'none', background: '#3B82F6',
                fontFamily: inter, fontSize: '12px', fontWeight: 700, color: '#FFFFFF', cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: '6px', boxShadow: '0 4px 12px rgba(59,130,246,0.3)',
              }}>
                PREVIEW & CONFIRM
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7h8M7 3l4 4-4 4" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            </div>
          </div>

          {/* Warning */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '20px' }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 1L1 12h12L7 1Z" stroke="#EF4444" strokeWidth="1.2" strokeLinejoin="round"/>
              <path d="M7 5v3M7 9.5v.5" stroke="#EF4444" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
            <span style={{ fontFamily: inter, fontSize: '11px', fontWeight: 500, color: '#EF4444' }}>Mistakes in pricing may lead to financial loss. Please verify all changes.</span>
          </div>

          {/* ── Tabs ── */}
          <div style={{ display: 'flex', gap: '4px', marginBottom: '24px' }}>
            {tabs.map((tab) => (
              <button
                key={tab}
                suppressHydrationWarning
                type="button"
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '8px',
                  border: 'none',
                  background: activeTab === tab ? '#FFFFFF' : 'transparent',
                  fontFamily: inter,
                  fontSize: '13px',
                  fontWeight: activeTab === tab ? 700 : 500,
                  color: activeTab === tab ? '#3B82F6' : '#64748B',
                  cursor: 'pointer',
                  boxShadow: activeTab === tab ? '0 1px 2px rgba(0,0,0,0.05)' : 'none',
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* ── Main Content Grid ── */}
          <div style={{ display: 'flex', gap: '20px' }}>

            {/* Left Column */}
            <div style={{ flex: 1, minWidth: 0 }}>

              {/* Base Fare Configuration */}
              <div style={{
                background: '#FFFFFF',
                borderRadius: '12px',
                padding: '20px',
                boxShadow: '0px 1px 2px rgba(0,0,0,0.05)',
                marginBottom: '20px',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <rect x="2" y="2" width="16" height="16" rx="2" stroke="#3B82F6" strokeWidth="1.4" />
                      <path d="M6 8h8M6 12h5" stroke="#3B82F6" strokeWidth="1.4" strokeLinecap="round" />
                    </svg>
                    <span style={{ fontFamily: manrope, fontSize: '14px', fontWeight: 800, color: '#0F172A' }}>Base Fare Configuration</span>
                  </div>
                  <button suppressHydrationWarning type="button" style={{
                    fontFamily: inter, fontSize: '11px', fontWeight: 700, color: '#3B82F6',
                    background: 'none', border: 'none', cursor: 'pointer', letterSpacing: '0.5px', textTransform: 'uppercase',
                  }}>
                    + ADD VEHICLE TYPE
                  </button>
                </div>

                {/* Table header */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '40px 1fr 100px 100px 100px 60px',
                  gap: '12px',
                  padding: '0 0 10px',
                  borderBottom: '1px solid #F1F5F9',
                  marginBottom: '8px',
                }}>
                  {['', 'VEHICLE TYPE', 'BASE FARE ($)', 'PER KM RATE ($)', 'MIN. FARE ($)', 'ACTIONS'].map((h, i) => (
                    <span key={i} style={{
                      fontFamily: inter, fontSize: '9px', fontWeight: 800, color: '#94A3B8',
                      letterSpacing: '0.8px', textTransform: 'uppercase',
                    }}>{h}</span>
                  ))}
                </div>

                {/* Vehicle rows */}
                {vehicleFares.map((v) => (
                  <div key={v.type} style={{
                    display: 'grid',
                    gridTemplateColumns: '40px 1fr 100px 100px 100px 60px',
                    gap: '12px',
                    alignItems: 'center',
                    padding: '10px 0',
                    borderBottom: '1px solid #F8FAFC',
                  }}>
                    <VehicleIcon type={v.icon} />
                    <span style={{ fontFamily: inter, fontSize: '13px', fontWeight: 700, color: '#0F172A' }}>{v.type}</span>
                    <input suppressHydrationWarning type="text" defaultValue={v.base} style={{
                      width: '70px', padding: '6px 10px', borderRadius: '6px', border: '1px solid #E2E8F0',
                      fontFamily: inter, fontSize: '13px', fontWeight: 600, color: '#0F172A', background: '#F8FAFC',
                    }} />
                    <input suppressHydrationWarning type="text" defaultValue={v.perKm} style={{
                      width: '70px', padding: '6px 10px', borderRadius: '6px', border: '1px solid #E2E8F0',
                      fontFamily: inter, fontSize: '13px', fontWeight: 600, color: '#0F172A', background: '#F8FAFC',
                    }} />
                    <span style={{ fontFamily: inter, fontSize: '13px', fontWeight: 600, color: '#0F172A' }}>${v.min}</span>
                    <button suppressHydrationWarning type="button" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M8 3v10M3 8h10" stroke="#64748B" strokeWidth="1.4" strokeLinecap="round" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>

              {/* Platform Earnings Banner */}
              <div style={{
                background: '#3B82F6',
                borderRadius: '12px',
                padding: '16px 20px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '20px',
                boxShadow: '0 4px 12px rgba(59,130,246,0.3)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <rect x="2" y="5" width="16" height="11" rx="2" stroke="#FFFFFF" strokeWidth="1.4" />
                      <path d="M2 9h16M6 2v4M14 2v4" stroke="#FFFFFF" strokeWidth="1.4" strokeLinecap="round" />
                    </svg>
                  </div>
                  <div>
                    <div style={{ fontFamily: inter, fontSize: '10px', fontWeight: 800, color: 'rgba(255,255,255,0.7)', letterSpacing: '1px', textTransform: 'uppercase' }}>PLATFORM EARNINGS</div>
                    <div style={{ fontFamily: manrope, fontSize: '18px', fontWeight: 800, color: '#FFFFFF' }}>20% commission per order</div>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontFamily: inter, fontSize: '9px', fontWeight: 700, color: 'rgba(255,255,255,0.6)', letterSpacing: '0.8px', textTransform: 'uppercase' }}>EST. REVENUE (SIMULATED)</div>
                  <div style={{ fontFamily: manrope, fontSize: '24px', fontWeight: 800, color: '#FFFFFF' }}>$4.37</div>
                </div>
              </div>

              {/* Surge + Zone Row */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>

                {/* Surge Pricing */}
                <div style={{
                  background: '#FFFFFF',
                  borderRadius: '12px',
                  padding: '20px',
                  boxShadow: '0px 1px 2px rgba(0,0,0,0.05)',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path d="M9 1.5L11.5 7H17L12.5 11L14 17L9 13.5L4 17L5.5 11L1 7H6.5L9 1.5Z" stroke="#EF4444" strokeWidth="1.4" strokeLinejoin="round" />
                    </svg>
                    <span style={{ fontFamily: manrope, fontSize: '14px', fontWeight: 800, color: '#0F172A' }}>Surge Pricing</span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {surgeItems.map((s) => (
                      <div key={s.name} style={{
                        background: '#F8FAFC',
                        borderRadius: '10px',
                        padding: '14px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                      }}>
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                            <span style={{ fontFamily: inter, fontSize: '12px', fontWeight: 700, color: '#0F172A' }}>{s.name}</span>
                            <span style={{ fontFamily: inter, fontSize: '12px', fontWeight: 800, color: '#EF4444' }}>{s.multiplier}</span>
                          </div>
                          <p style={{ fontFamily: inter, fontSize: '11px', fontWeight: 500, color: '#64748B', margin: 0, lineHeight: '16px' }}>{s.desc}</p>
                        </div>
                        <div style={{
                          width: '36px',
                          height: '20px',
                          borderRadius: '9999px',
                          background: s.active ? '#3B82F6' : '#CBD5E1',
                          position: 'relative',
                          cursor: 'pointer',
                          flexShrink: 0,
                        }}>
                          <div style={{
                            width: '16px', height: '16px', borderRadius: '50%', background: '#FFFFFF',
                            position: 'absolute', top: '2px', left: s.active ? '18px' : '2px',
                            boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                          }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Zone Pricing */}
                <div style={{
                  background: '#FFFFFF',
                  borderRadius: '12px',
                  padding: '20px',
                  boxShadow: '0px 1px 2px rgba(0,0,0,0.05)',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <path d="M9 1C6.239 1 4 3.239 4 6c0 4.5 5 11 5 11s5-6.5 5-11c0-2.761-2.239-5-5-5Z" stroke="#3B82F6" strokeWidth="1.4" />
                        <circle cx="9" cy="6" r="2" fill="#3B82F6" />
                      </svg>
                      <span style={{ fontFamily: manrope, fontSize: '14px', fontWeight: 800, color: '#0F172A' }}>Zone Pricing</span>
                    </div>
                    <button suppressHydrationWarning type="button" style={{
                      fontFamily: inter, fontSize: '10px', fontWeight: 700, color: '#3B82F6',
                      background: 'none', border: 'none', cursor: 'pointer', letterSpacing: '0.5px', textTransform: 'uppercase',
                    }}>
                      DRAW NEW ZONE
                    </button>
                  </div>

                  <div style={{
                    borderRadius: '10px',
                    overflow: 'hidden',
                    position: 'relative',
                    height: '160px',
                    background: '#E2E8F0',
                    marginBottom: '12px',
                  }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/blue_map.png" alt="Zone map" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.5 }} />
                    <div style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      background: '#3B82F6',
                      borderRadius: '6px',
                      padding: '6px 12px',
                      fontFamily: inter,
                      fontSize: '11px',
                      fontWeight: 700,
                      color: '#FFFFFF',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                    }}>
                      ZONE A: ACTIVE
                    </div>
                    <div style={{
                      position: 'absolute',
                      bottom: '10px',
                      left: '10px',
                      background: 'rgba(255,255,255,0.9)',
                      borderRadius: '4px',
                      padding: '4px 8px',
                      fontFamily: inter,
                      fontSize: '10px',
                      fontWeight: 700,
                      color: '#3B82F6',
                    }}>
                      4 ACTIVE ZONES
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '8px' }}>
                    {['Edit Zone Rules', 'Assign Pricing'].map((btn) => (
                      <button key={btn} suppressHydrationWarning type="button" style={{
                        flex: 1, padding: '8px', borderRadius: '6px', border: '1px solid #E2E8F0',
                        background: '#FFFFFF', fontFamily: inter, fontSize: '11px', fontWeight: 700,
                        color: '#3B82F6', cursor: 'pointer',
                      }}>{btn}</button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Active Coupons */}
              <div style={{
                background: '#FFFFFF',
                borderRadius: '12px',
                padding: '20px',
                boxShadow: '0px 1px 2px rgba(0,0,0,0.05)',
                marginBottom: '20px',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <rect x="2" y="3" width="14" height="10" rx="1.5" stroke="#10B981" strokeWidth="1.4" />
                      <path d="M2 7h14M7 3v4M11 3v4" stroke="#10B981" strokeWidth="1.4" strokeLinecap="round" />
                    </svg>
                    <span style={{ fontFamily: manrope, fontSize: '14px', fontWeight: 800, color: '#0F172A' }}>Active Coupons & Discounts</span>
                  </div>
                  <button suppressHydrationWarning type="button" style={{
                    fontFamily: inter, fontSize: '11px', fontWeight: 700, color: '#3B82F6',
                    background: 'none', border: 'none', cursor: 'pointer', letterSpacing: '0.5px', textTransform: 'uppercase',
                  }}>
                    + CREATE PROMO
                  </button>
                </div>

                <div style={{ display: 'flex', gap: '16px' }}>
                  {coupons.map((c) => (
                    <div key={c.code} style={{
                      flex: 1,
                      background: '#F8FAFC',
                      borderRadius: '10px',
                      padding: '16px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                    }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                          <span style={{ fontFamily: manrope, fontSize: '14px', fontWeight: 800, color: '#0F172A' }}>{c.code}</span>
                          <span style={{
                            padding: '2px 8px', borderRadius: '4px',
                            background: c.status === 'ACTIVE' ? '#D1FAE5' : '#F1F5F9',
                            fontFamily: inter, fontSize: '9px', fontWeight: 800,
                            color: c.status === 'ACTIVE' ? '#059669' : '#94A3B8',
                            letterSpacing: '0.5px', textTransform: 'uppercase',
                          }}>{c.status}</span>
                        </div>
                        <p style={{ fontFamily: inter, fontSize: '12px', fontWeight: 500, color: '#64748B', margin: '0 0 8px' }}>{c.desc}</p>
                        <div style={{ fontFamily: inter, fontSize: '11px', fontWeight: 500, color: '#94A3B8' }}>
                          Expires: {c.expires}<br />
                          Usage: {c.usage}
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button suppressHydrationWarning type="button" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}>
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 10.5V13h2.5l7-7L8 3.5l-7 7Z" stroke="#64748B" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </button>
                        <button suppressHydrationWarning type="button" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}>
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 4h10M5.5 4v-.5a1.5 1.5 0 0 1 3 0V4M6 7v4M8 7v4" stroke="#EF4444" strokeWidth="1.2" strokeLinecap="round"/></svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Modification History */}
              <div style={{
                background: '#FFFFFF',
                borderRadius: '12px',
                padding: '20px',
                boxShadow: '0px 1px 2px rgba(0,0,0,0.05)',
              }}>
                <div style={{
                  fontFamily: manrope,
                  fontSize: '12px',
                  fontWeight: 800,
                  color: '#94A3B8',
                  letterSpacing: '1.2px',
                  textTransform: 'uppercase',
                  marginBottom: '16px',
                }}>RECENT MODIFICATION HISTORY</div>

                {history.map((h, i) => (
                  <div key={i} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '12px 0',
                    borderBottom: i < history.length - 1 ? '1px solid #F8FAFC' : 'none',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flex: 1 }}>
                      <span style={{ fontFamily: inter, fontSize: '12px', fontWeight: 500, color: '#94A3B8', minWidth: '120px' }}>{h.time}</span>
                      <span style={{ fontFamily: inter, fontSize: '12px', fontWeight: 700, color: '#3B82F6', minWidth: '100px' }}>{h.user}</span>
                      <span style={{ fontFamily: inter, fontSize: '12px', fontWeight: 500, color: '#374151' }}>{h.action}</span>
                    </div>
                    <span style={{
                      padding: '3px 10px', borderRadius: '4px',
                      background: h.statusBg,
                      fontFamily: inter, fontSize: '10px', fontWeight: 800,
                      color: h.statusColor,
                      letterSpacing: '0.5px', textTransform: 'uppercase',
                    }}>{h.status}</span>
                  </div>
                ))}
              </div>

            </div>

            {/* Right Column: Pricing Simulator */}
            <div style={{ width: '280px', flexShrink: 0 }}>
              <div style={{
                background: '#FFFFFF',
                borderRadius: '12px',
                padding: '20px',
                boxShadow: '0px 1px 2px rgba(0,0,0,0.05)',
                position: 'sticky',
                top: '20px',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                  <div style={{
                    width: '40px', height: '40px', borderRadius: '10px', background: '#EFF6FF',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <rect x="2" y="2" width="16" height="16" rx="2" stroke="#3B82F6" strokeWidth="1.4" />
                      <path d="M6 7h8M6 11h5M6 15h3" stroke="#3B82F6" strokeWidth="1.4" strokeLinecap="round" />
                    </svg>
                  </div>
                  <div>
                    <div style={{ fontFamily: manrope, fontSize: '14px', fontWeight: 800, color: '#0F172A' }}>Pricing Simulator</div>
                    <div style={{ fontFamily: inter, fontSize: '10px', fontWeight: 600, color: '#94A3B8', letterSpacing: '0.5px', textTransform: 'uppercase' }}>TEST FARE RULES & SURGE</div>
                  </div>
                </div>

                <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: '16px', marginBottom: '16px' }}>
                  <div style={{
                    fontFamily: inter, fontSize: '9px', fontWeight: 800, color: '#94A3B8',
                    letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '12px',
                  }}>TRIP DETAILS</div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#3B82F6' }} />
                      <span style={{ fontFamily: inter, fontSize: '12px', fontWeight: 500, color: '#374151' }}>Downtown Business District</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#EF4444' }} />
                      <span style={{ fontFamily: inter, fontSize: '12px', fontWeight: 500, color: '#374151' }}>North Suburb Terminal</span>
                    </div>
                  </div>

                  <div style={{ marginBottom: '12px' }}>
                    <div style={{ fontFamily: inter, fontSize: '9px', fontWeight: 800, color: '#94A3B8', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '6px' }}>VEHICLE TYPE</div>
                    <div style={{
                      display: 'flex', alignItems: 'center', gap: '8px',
                      padding: '8px 10px', borderRadius: '6px', border: '1px solid #E2E8F0',
                    }}>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <rect x="1" y="5" width="10" height="6" rx="1" stroke="#64748B" strokeWidth="1.2" />
                        <path d="M11 7h2l2 2.5V12h-4V7Z" stroke="#64748B" strokeWidth="1.2" strokeLinejoin="round" />
                        <circle cx="4.5" cy="12" r="1.2" fill="#64748B" />
                        <circle cx="12" cy="12" r="1.2" fill="#64748B" />
                      </svg>
                      <span style={{ fontFamily: inter, fontSize: '12px', fontWeight: 600, color: '#0F172A', flex: 1 }}>Pickup Truck</span>
                      <svg width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke="#94A3B8" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '12px' }}>
                    <div>
                      <div style={{ fontFamily: inter, fontSize: '9px', fontWeight: 800, color: '#94A3B8', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '4px' }}>PICKUP TIME</div>
                      <span style={{ fontFamily: inter, fontSize: '13px', fontWeight: 700, color: '#0F172A' }}>09:45</span>
                    </div>
                    <div>
                      <div style={{ fontFamily: inter, fontSize: '9px', fontWeight: 800, color: '#94A3B8', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '4px' }}>DETECTED ZONE</div>
                      <span style={{
                        display: 'inline-block', padding: '2px 8px', borderRadius: '4px', background: '#DBEAFE',
                        fontFamily: inter, fontSize: '11px', fontWeight: 700, color: '#3B82F6',
                      }}>ZONE A</span>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '16px' }}>
                    <div>
                      <div style={{ fontFamily: inter, fontSize: '9px', fontWeight: 800, color: '#94A3B8', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '4px' }}>DISTANCE (KM)</div>
                      <span style={{ fontFamily: inter, fontSize: '13px', fontWeight: 700, color: '#0F172A' }}>12.5</span>
                    </div>
                    <div>
                      <div style={{ fontFamily: inter, fontSize: '9px', fontWeight: 800, color: '#94A3B8', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '4px' }}>EST. TIME (MIN)</div>
                      <span style={{ fontFamily: inter, fontSize: '13px', fontWeight: 700, color: '#0F172A' }}>34</span>
                    </div>
                  </div>
                </div>

                <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: '16px', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <span style={{ fontFamily: inter, fontSize: '10px', fontWeight: 800, color: '#94A3B8', letterSpacing: '1px', textTransform: 'uppercase' }}>FARE BREAKDOWN</span>
                    <span style={{
                      padding: '2px 8px', borderRadius: '4px', background: '#DBEAFE',
                      fontFamily: inter, fontSize: '9px', fontWeight: 800, color: '#3B82F6', letterSpacing: '0.5px', textTransform: 'uppercase',
                    }}>LIVE PREVIEW</span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontFamily: inter, fontSize: '12px', fontWeight: 500, color: '#64748B' }}>Base Fare (Pickup)</span>
                      <span style={{ fontFamily: inter, fontSize: '12px', fontWeight: 700, color: '#0F172A' }}>$8.00</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontFamily: inter, fontSize: '12px', fontWeight: 500, color: '#64748B' }}>Distance (12.5km x $1.20)</span>
                      <span style={{ fontFamily: inter, fontSize: '12px', fontWeight: 700, color: '#0F172A' }}>$15.00</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontFamily: inter, fontSize: '12px', fontWeight: 600, color: '#EF4444' }}>⚡ Surge Multiplier (1.2x)</span>
                      <span style={{ fontFamily: inter, fontSize: '12px', fontWeight: 700, color: '#EF4444' }}>+$4.60</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontFamily: inter, fontSize: '12px', fontWeight: 600, color: '#10B981' }}>☐ Discount (SAVE25)</span>
                      <span style={{ fontFamily: inter, fontSize: '12px', fontWeight: 700, color: '#10B981' }}>-$5.75</span>
                    </div>
                  </div>
                </div>

                <div style={{
                  background: '#3B82F6',
                  borderRadius: '10px',
                  padding: '16px',
                  textAlign: 'center',
                  marginBottom: '12px',
                }}>
                  <div style={{ fontFamily: inter, fontSize: '9px', fontWeight: 800, color: 'rgba(255,255,255,0.7)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '4px' }}>FINAL ESTIMATED TOTAL</div>
                  <div style={{ fontFamily: manrope, fontSize: '28px', fontWeight: 800, color: '#FFFFFF' }}>$21.85</div>
                  <div style={{ display: 'flex', justifyContent: 'center', marginTop: '8px' }}>
                    <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7l3 3 5-5" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                  </div>
                </div>

                <button suppressHydrationWarning type="button" style={{
                  width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #E2E8F0',
                  background: '#FFFFFF', fontFamily: inter, fontSize: '12px', fontWeight: 700,
                  color: '#64748B', cursor: 'pointer', letterSpacing: '0.5px', textTransform: 'uppercase',
                }}>
                  RESET SIMULATOR
                </button>
              </div>
            </div>

          </div>

        </main>
      </div>
    </div>
  );
}
