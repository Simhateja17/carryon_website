'use client';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';

interface Vehicle {
  id: string;
  name: string;
  driver: string;
  status: 'active' | 'idle' | 'offline';
  location: { lat: number; lng: number };
  nextStop?: string;
  eta?: string;
  progress?: number;
}

const vehicles: Vehicle[] = [
  { id: 'TRK-042', name: 'Freightliner M2', driver: 'Marcus Jensen', status: 'active', location: { lat: 40.7128, lng: -74.0060 }, nextStop: 'Distribution Ctr A', eta: '2:45 PM', progress: 72 },
  { id: 'VAN-101', name: 'Ford Transit', driver: 'Sarah Chen', status: 'active', location: { lat: 40.7580, lng: -73.9855 }, nextStop: 'Warehouse B', eta: '3:20 PM', progress: 58 },
  { id: 'MOTO-09', name: 'Motorcycle', driver: 'James Rivera', status: 'idle', location: { lat: 40.7489, lng: -73.9680 }, nextStop: 'Depot', eta: '4:00 PM', progress: 0 },
];

export default function LiveMapPage() {
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(vehicles[0]);

  return (
    <div style={{ display: 'flex', width: '100vw', height: '100vh', background: '#0F172A', overflow: 'hidden' }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Map Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
        {/* Map Background */}
        <div style={{
          flex: 1,
          position: 'relative',
          background: 'radial-gradient(circle at center, #1a2a4a 0%, #0f172a 100%)',
          overflow: 'hidden',
        }}>
          {/* Street Map Grid SVG */}
          <svg
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              top: 0,
              left: 0,
            }}
            viewBox="0 0 1000 1000"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Outer boundary circle */}
            <circle cx="500" cy="500" r="450" fill="none" stroke="#0EA5E9" strokeWidth="3" opacity="0.4" />
            <circle cx="500" cy="500" r="420" fill="none" stroke="#0EA5E9" strokeWidth="1" opacity="0.2" />

            {/* Concentric rings */}
            {[300, 250, 200].map((r, i) => (
              <circle key={i} cx="500" cy="500" r={r} fill="none" stroke="#0EA5E9" strokeWidth="1" opacity="0.15" />
            ))}

            {/* Major streets - radial */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
              const rad = (angle * Math.PI) / 180;
              const x2 = 500 + 450 * Math.cos(rad);
              const y2 = 500 + 450 * Math.sin(rad);
              return (
                <line key={`radial-${i}`} x1="500" y1="500" x2={x2} y2={y2} stroke="#06B6D4" strokeWidth="2" opacity="0.6" filter="url(#glow)" />
              );
            })}

            {/* Secondary streets - grid */}
            {[100, 200, 300, 400, 600, 700, 800, 900].map((pos, i) => (
              <g key={`grid-${i}`}>
                <line x1={pos} y1="50" x2={pos} y2="950" stroke="#0EA5E9" strokeWidth="1" opacity="0.4" />
                <line x1="50" y1={pos} x2="950" y2={pos} stroke="#0EA5E9" strokeWidth="1" opacity="0.4" />
              </g>
            ))}

            {/* Tertiary streets */}
            {[150, 250, 350, 450, 550, 650, 750, 850].map((pos, i) => (
              <g key={`tertiary-${i}`}>
                <line x1={pos} y1="100" x2={pos} y2="900" stroke="#0EA5E9" strokeWidth="0.5" opacity="0.2" />
                <line x1="100" y1={pos} x2="900" y2={pos} stroke="#0EA5E9" strokeWidth="0.5" opacity="0.2" />
              </g>
            ))}

            {/* Vehicle markers */}
            {vehicles.map((v) => {
              const x = 200 + (v.location.lng + 74.0) * 80;
              const y = 400 - (v.location.lat - 40.7) * 80;
              const isSelected = selectedVehicle?.id === v.id;
              return (
                <g key={v.id}>
                  {/* Pulse ring */}
                  <circle cx={x} cy={y} r="25" fill="none" stroke={v.status === 'active' ? '#10B981' : '#94A3B8'} strokeWidth="1" opacity="0.3" />
                  {/* Vehicle marker */}
                  <circle
                    cx={x}
                    cy={y}
                    r="12"
                    fill={v.status === 'active' ? '#10B981' : v.status === 'idle' ? '#F59E0B' : '#6B7280'}
                    stroke={isSelected ? '#fff' : 'none'}
                    strokeWidth="2"
                    style={{ cursor: 'pointer' }}
                    onClick={() => setSelectedVehicle(v)}
                  />
                  {/* Vehicle icon */}
                  <g transform={`translate(${x - 6}, ${y - 5})`}>
                    <rect x="2" y="2" width="8" height="6" fill="#fff" rx="1" />
                    <path d="M10 5h2l1.5 2h-1.5V5Z" fill="#fff" strokeLinejoin="round" />
                  </g>
                </g>
              );
            })}
          </svg>

          {/* Top-left: Location search & controls */}
          <div style={{
            position: 'absolute',
            top: '20px',
            left: '20px',
            zIndex: 10,
            display: 'flex',
            gap: '12px',
            alignItems: 'center',
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(255,255,255,0.95)',
              padding: '10px 14px',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="7" cy="7" r="5.5" stroke="#374151" strokeWidth="1.2" />
                <path d="M11.5 11.5l3.5 3.5" stroke="#374151" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
              <input
                type="text"
                placeholder="Search location..."
                style={{
                  border: 'none',
                  outline: 'none',
                  fontFamily: 'Inter',
                  fontSize: '13px',
                  width: '200px',
                  background: 'transparent',
                  color: '#1F2937',
                }}
              />
            </div>
            <button suppressHydrationWarning style={{
              width: '40px',
              height: '40px',
              borderRadius: '8px',
              background: 'rgba(255,255,255,0.95)',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            }}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <circle cx="9" cy="3" r="2" fill="#374151" />
                <circle cx="15" cy="9" r="2" fill="#374151" />
                <circle cx="9" cy="15" r="2" fill="#374151" />
                <circle cx="3" cy="9" r="2" fill="#374151" />
              </svg>
            </button>
          </div>

          {/* Top-right: Map controls */}
          <div style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            zIndex: 10,
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}>
            <button suppressHydrationWarning style={{
              width: '40px',
              height: '40px',
              borderRadius: '8px',
              background: 'rgba(255,255,255,0.95)',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              fontSize: '20px',
            }}>
              +
            </button>
            <button suppressHydrationWarning style={{
              width: '40px',
              height: '40px',
              borderRadius: '8px',
              background: 'rgba(255,255,255,0.95)',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              fontSize: '24px',
            }}>
              −
            </button>
            <button suppressHydrationWarning style={{
              width: '40px',
              height: '40px',
              borderRadius: '8px',
              background: 'rgba(255,255,255,0.95)',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            }}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <circle cx="9" cy="9" r="7.5" stroke="#374151" strokeWidth="1.3" />
                <path d="M9 3v6M12 9H6" stroke="#374151" strokeWidth="1.3" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {/* Bottom-left: Vehicle list & alerts */}
          <div style={{
            position: 'absolute',
            bottom: '20px',
            left: '20px',
            zIndex: 10,
            maxWidth: '380px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}>
            {/* Active Alerts Card */}
            <div style={{
              background: 'rgba(30, 41, 59, 0.92)',
              border: '1px solid rgba(6, 182, 212, 0.3)',
              borderRadius: '10px',
              padding: '14px 16px',
              backdropFilter: 'blur(10px)',
            }}>
              <div style={{ fontFamily: 'Inter', fontSize: '12px', fontWeight: 700, color: '#06B6D4', marginBottom: '10px', letterSpacing: '0.5px' }}>
                ACTIVE ALERTS
              </div>
              <div style={{
                background: 'rgba(6, 182, 212, 0.1)',
                border: '1px solid rgba(6, 182, 212, 0.2)',
                borderRadius: '6px',
                padding: '10px 12px',
                marginBottom: '8px',
              }}>
                <div style={{ fontFamily: 'Inter', fontSize: '11px', color: '#06B6D4', fontWeight: 600 }}>
                  🔧 MECHANICAL ALERT
                </div>
                <div style={{ fontFamily: 'Inter', fontSize: '10px', color: '#CBD5E1', marginTop: '3px', lineHeight: '1.4' }}>
                  TRK-9423 reports engine fault code PO420
                </div>
                <div style={{ fontFamily: 'Inter', fontSize: '9px', color: '#94A3B8', marginTop: '4px' }}>
                  47 mins ago • Active
                </div>
              </div>
              <div style={{
                background: 'rgba(6, 182, 212, 0.1)',
                border: '1px solid rgba(6, 182, 212, 0.2)',
                borderRadius: '6px',
                padding: '10px 12px',
              }}>
                <div style={{ fontFamily: 'Inter', fontSize: '11px', color: '#06B6D4', fontWeight: 600 }}>
                  🌧️ WEATHER DELAY
                </div>
                <div style={{ fontFamily: 'Inter', fontSize: '10px', color: '#CBD5E1', marginTop: '3px', lineHeight: '1.4' }}>
                  Heavy rain affecting Zone 4 speedcuts
                </div>
                <div style={{ fontFamily: 'Inter', fontSize: '9px', color: '#94A3B8', marginTop: '4px' }}>
                  12 mins ago • Affecting 4 routes
                </div>
              </div>
            </div>

            {/* Fleet Status Card */}
            <div style={{
              background: 'rgba(30, 41, 59, 0.92)',
              border: '1px solid rgba(6, 182, 212, 0.3)',
              borderRadius: '10px',
              padding: '14px 16px',
              backdropFilter: 'blur(10px)',
            }}>
              <div style={{ fontFamily: 'Inter', fontSize: '12px', fontWeight: 700, color: '#0EA5E9', marginBottom: '12px', letterSpacing: '0.5px' }}>
                FLEET STATUS
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: 'Inter', fontSize: '24px', fontWeight: 800, color: '#10B981' }}>142</div>
                  <div style={{ fontFamily: 'Inter', fontSize: '10px', color: '#94A3B8', marginTop: '2px' }}>Active</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: 'Inter', fontSize: '24px', fontWeight: 800, color: '#06B6D4' }}>8</div>
                  <div style={{ fontFamily: 'Inter', fontSize: '10px', color: '#94A3B8', marginTop: '2px' }}>Idle</div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom-right: Selected vehicle info */}
          {selectedVehicle && (
            <div style={{
              position: 'absolute',
              bottom: '20px',
              right: '20px',
              zIndex: 10,
              width: '320px',
              background: 'rgba(30, 41, 59, 0.95)',
              border: '1px solid rgba(6, 182, 212, 0.4)',
              borderRadius: '12px',
              padding: '18px',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
            }}>
              {/* Avatar & Name */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '8px',
                  background: selectedVehicle.status === 'active' ? '#DBEAFE' : selectedVehicle.status === 'idle' ? '#FEF3C7' : '#E5E7EB',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <rect x="1" y="7" width="15" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.5" fill={selectedVehicle.status === 'active' ? '#0EA5E9' : selectedVehicle.status === 'idle' ? '#F59E0B' : '#6B7280'} />
                    <path d="M16 9.5h3l2 4.5h-5V9.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" fill={selectedVehicle.status === 'active' ? '#0EA5E9' : selectedVehicle.status === 'idle' ? '#F59E0B' : '#6B7280'} />
                    <circle cx="3.5" cy="18" r="1.5" fill={selectedVehicle.status === 'active' ? '#0EA5E9' : selectedVehicle.status === 'idle' ? '#F59E0B' : '#6B7280'} />
                    <circle cx="14" cy="18" r="1.5" fill={selectedVehicle.status === 'active' ? '#0EA5E9' : selectedVehicle.status === 'idle' ? '#F59E0B' : '#6B7280'} />
                  </svg>
                </div>
                <div>
                  <div style={{ fontFamily: 'Inter', fontSize: '14px', fontWeight: 700, color: '#F1F5F9' }}>
                    {selectedVehicle.name}
                  </div>
                  <div style={{ fontFamily: 'Inter', fontSize: '12px', color: '#94A3B8', marginTop: '2px' }}>
                    {selectedVehicle.id}
                  </div>
                </div>
              </div>

              {/* Driver info */}
              <div style={{ marginBottom: '14px', paddingBottom: '14px', borderBottom: '1px solid rgba(6, 182, 212, 0.2)' }}>
                <div style={{ fontFamily: 'Inter', fontSize: '11px', color: '#94A3B8', fontWeight: 600, marginBottom: '4px' }}>
                  DRIVER
                </div>
                <div style={{ fontFamily: 'Inter', fontSize: '13px', color: '#F1F5F9', fontWeight: 500 }}>
                  {selectedVehicle.driver}
                </div>
              </div>

              {/* Status */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                <span style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: selectedVehicle.status === 'active' ? '#10B981' : selectedVehicle.status === 'idle' ? '#F59E0B' : '#6B7280',
                  display: 'inline-block',
                  flexShrink: 0,
                }} />
                <span style={{
                  fontFamily: 'Inter',
                  fontSize: '12px',
                  textTransform: 'uppercase',
                  fontWeight: 700,
                  color: selectedVehicle.status === 'active' ? '#10B981' : selectedVehicle.status === 'idle' ? '#F59E0B' : '#9CA3AF',
                  letterSpacing: '0.3px',
                }}>
                  {selectedVehicle.status === 'active' ? 'In Transit' : selectedVehicle.status === 'idle' ? 'Idle' : 'Offline'}
                </span>
              </div>

              {/* Progress bar */}
              {selectedVehicle.progress !== undefined && (
                <div style={{ marginBottom: '14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <span style={{ fontFamily: 'Inter', fontSize: '10px', color: '#94A3B8', fontWeight: 600 }}>
                      ROUTE PROGRESS
                    </span>
                    <span style={{ fontFamily: 'Inter', fontSize: '11px', color: '#06B6D4', fontWeight: 700 }}>
                      {selectedVehicle.progress}%
                    </span>
                  </div>
                  <div style={{ height: '5px', background: 'rgba(6, 182, 212, 0.2)', borderRadius: '2.5px', overflow: 'hidden' }}>
                    <div style={{
                      height: '100%',
                      width: `${selectedVehicle.progress}%`,
                      background: 'linear-gradient(90deg, #06B6D4, #0EA5E9)',
                      borderRadius: '2.5px',
                      transition: 'width 0.3s ease',
                    }} />
                  </div>
                </div>
              )}

              {/* Next stop */}
              {selectedVehicle.nextStop && (
                <div style={{ marginBottom: '12px', paddingBottom: '12px', borderBottom: '1px solid rgba(6, 182, 212, 0.2)' }}>
                  <div style={{ fontFamily: 'Inter', fontSize: '10px', color: '#94A3B8', fontWeight: 600, marginBottom: '4px' }}>
                    NEXT STOP
                  </div>
                  <div style={{ fontFamily: 'Inter', fontSize: '12px', color: '#F1F5F9', fontWeight: 600, marginBottom: '4px' }}>
                    {selectedVehicle.nextStop}
                  </div>
                  {selectedVehicle.eta && (
                    <div style={{ fontFamily: 'Inter', fontSize: '11px', color: '#06B6D4' }}>
                      ETA: {selectedVehicle.eta}
                    </div>
                  )}
                </div>
              )}

              {/* Action buttons */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                <button suppressHydrationWarning style={{
                  height: '36px',
                  background: 'rgba(6, 182, 212, 0.15)',
                  border: '1px solid rgba(6, 182, 212, 0.4)',
                  borderRadius: '6px',
                  color: '#06B6D4',
                  fontFamily: 'Inter',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}>
                  View Log
                </button>
                <button suppressHydrationWarning style={{
                  height: '36px',
                  background: '#2563EB',
                  border: 'none',
                  borderRadius: '6px',
                  color: '#fff',
                  fontFamily: 'Inter',
                  fontSize: '12px',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}>
                  Message
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
