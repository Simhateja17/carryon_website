'use client';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';

const configLogs = [
  { label: 'iOS Version Bump', by: 'Admin (J. Doe)', time: '2h ago' },
  { label: 'Security MFA enforced', by: 'System Security', time: '5h ago' },
  { label: 'Timezone adjusted (UTC-5)', by: 'Admin (J. Doe)', time: '1d ago' },
];

const timezones = [
  '(GMT-12:00) International Date Line West',
  '(GMT-08:00) Pacific Time',
  '(GMT-07:00) Mountain Time',
  '(GMT-06:00) Central Time',
  '(GMT-05:00) Eastern Time',
  '(GMT+00:00) UTC',
  '(GMT+01:00) Central European Time',
  '(GMT+05:30) India Standard Time',
  '(GMT+08:00) China Standard Time',
];

const languages = ['English (US)', 'English (UK)', 'Spanish', 'French', 'German', 'Portuguese'];

export default function GeneralSettingsPage() {
  const [appName, setAppName] = useState('Carry On');
  const [language, setLanguage] = useState('English (US)');
  const [timezone, setTimezone] = useState('(GMT-05:00) Eastern Time');
  const [maintenanceOn, setMaintenanceOn] = useState(false);
  const [iosForce, setIosForce] = useState(true);
  const [androidForce, setAndroidForce] = useState(false);
  const [mfaScope, setMfaScope] = useState('All Staff & Admins');
  const [sessionTimeout, setSessionTimeout] = useState('30');
  const [passwordExpiry, setPasswordExpiry] = useState('90');

  return (
    <div style={{ display: 'flex', width: '100vw', minHeight: '100vh', background: '#F7F9FB' }}>
      <Sidebar />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: '100vh', overflow: 'hidden' }}>
        <Navbar />

        <main style={{ flex: 1, padding: '32px 36px 48px', overflowY: 'auto' }}>

          {/* Page header */}
          <h1 style={{ margin: '0 0 6px', fontFamily: "'Manrope', Inter, sans-serif", fontSize: '28px', fontWeight: 800, color: '#191C1E' }}>
            General Settings
          </h1>
          <p style={{ margin: '0 0 28px', fontFamily: 'Inter', fontSize: '14px', color: '#64748B' }}>
            Configure global platform behavior, branding, and security protocols.
          </p>

          {/* Two-column layout */}
          <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>

            {/* LEFT: Platform Identity */}
            <div style={{
              flex: 1, background: '#fff', borderRadius: '16px',
              border: '1px solid #E2E8F0', padding: '28px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
            }}>
              {/* Section header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '28px' }}>
                <div style={{
                  width: 32, height: 32, borderRadius: '8px',
                  background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
                    <rect x="1" y="3" width="15" height="11" rx="2" stroke="#2563EB" strokeWidth="1.4" />
                    <path d="M4 7h9M4 10h5" stroke="#2563EB" strokeWidth="1.3" strokeLinecap="round" />
                  </svg>
                </div>
                <span style={{ fontFamily: "'Manrope', Inter, sans-serif", fontSize: '17px', fontWeight: 800, color: '#191C1E' }}>
                  Platform Identity
                </span>
              </div>

              <div style={{ display: 'flex', gap: '32px', alignItems: 'flex-start' }}>
                {/* Left form fields */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '22px' }}>

                  {/* App Name */}
                  <div>
                    <label style={{ display: 'block', fontFamily: 'Inter', fontSize: '11px', fontWeight: 700, color: '#64748B', letterSpacing: '0.8px', textTransform: 'uppercase', marginBottom: 8 }}>
                      APP NAME
                    </label>
                    <input
                      suppressHydrationWarning
                      type="text"
                      value={appName}
                      onChange={e => setAppName(e.target.value)}
                      style={{
                        width: '100%', padding: '11px 14px', borderRadius: '10px',
                        border: '1px solid #E2E8F0', background: '#F1F6FB',
                        fontFamily: 'Inter', fontSize: '14px', color: '#191C1E', outline: 'none',
                        boxSizing: 'border-box',
                      }}
                    />
                  </div>

                  {/* System Language */}
                  <div>
                    <label style={{ display: 'block', fontFamily: 'Inter', fontSize: '11px', fontWeight: 700, color: '#64748B', letterSpacing: '0.8px', textTransform: 'uppercase', marginBottom: 8 }}>
                      SYSTEM LANGUAGE
                    </label>
                    <div style={{ position: 'relative' }}>
                      <select
                        suppressHydrationWarning
                        value={language}
                        onChange={e => setLanguage(e.target.value)}
                        style={{
                          width: '100%', padding: '11px 36px 11px 14px', borderRadius: '10px',
                          border: '1px solid #E2E8F0', background: '#F1F6FB',
                          fontFamily: 'Inter', fontSize: '14px', color: '#191C1E',
                          appearance: 'none', outline: 'none', cursor: 'pointer',
                          boxSizing: 'border-box',
                        }}
                      >
                        {languages.map(l => <option key={l}>{l}</option>)}
                      </select>
                      <svg style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} width="12" height="7" viewBox="0 0 12 7" fill="none">
                        <path d="M1 1l5 5 5-5" stroke="#64748B" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>

                  {/* Default Timezone */}
                  <div>
                    <label style={{ display: 'block', fontFamily: 'Inter', fontSize: '11px', fontWeight: 700, color: '#64748B', letterSpacing: '0.8px', textTransform: 'uppercase', marginBottom: 8 }}>
                      DEFAULT TIMEZONE
                    </label>
                    <div style={{ position: 'relative' }}>
                      <select
                        suppressHydrationWarning
                        value={timezone}
                        onChange={e => setTimezone(e.target.value)}
                        style={{
                          width: '100%', padding: '11px 36px 11px 14px', borderRadius: '10px',
                          border: '1px solid #E2E8F0', background: '#F1F6FB',
                          fontFamily: 'Inter', fontSize: '14px', color: '#191C1E',
                          appearance: 'none', outline: 'none', cursor: 'pointer',
                          boxSizing: 'border-box',
                        }}
                      >
                        {timezones.map(t => <option key={t}>{t}</option>)}
                      </select>
                      <svg style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} width="12" height="7" viewBox="0 0 12 7" fill="none">
                        <path d="M1 1l5 5 5-5" stroke="#64748B" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Right: Platform Logo upload */}
                <div style={{ width: '220px', flexShrink: 0 }}>
                  <label style={{ display: 'block', fontFamily: 'Inter', fontSize: '11px', fontWeight: 700, color: '#64748B', letterSpacing: '0.8px', textTransform: 'uppercase', marginBottom: 8 }}>
                    PLATFORM LOGO
                  </label>
                  <button
                    suppressHydrationWarning
                    style={{
                      width: '100%', height: '148px', borderRadius: '12px',
                      border: '2px dashed #93C5FD', background: '#F0F8FF',
                      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                      gap: '10px', cursor: 'pointer',
                    }}
                  >
                    <div style={{
                      width: 44, height: 44, borderRadius: '50%', background: '#DBEAFE',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M10 14V4M6 8l4-4 4 4" stroke="#2563EB" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M3 17h14" stroke="#2563EB" strokeWidth="1.6" strokeLinecap="round" />
                      </svg>
                    </div>
                    <div>
                      <div style={{ fontFamily: 'Inter', fontSize: '13px', fontWeight: 600, color: '#2563EB', textAlign: 'center' }}>
                        Click to upload SVG or PNG
                      </div>
                      <div style={{ fontFamily: 'Inter', fontSize: '11px', color: '#94A3B8', textAlign: 'center', marginTop: 4 }}>
                        Recommended: 512×512px (Max 2MB)
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* RIGHT column */}
            <div style={{ width: '280px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>

              {/* Maintenance Mode card */}
              <div style={{
                background: '#EFF6FF', borderRadius: '16px',
                border: '1px solid #BFDBFE', padding: '22px',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: '10px',
                    background: '#DBEAFE', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path d="M15 3l-2 2-3-3 2-2s2 0 3 3z" stroke="#2563EB" strokeWidth="1.3" strokeLinejoin="round" />
                      <path d="M13 5L6 12l-1 2-2 1 1-2 7-7" stroke="#2563EB" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                      <circle cx="4.5" cy="13.5" r="1" fill="#2563EB" />
                    </svg>
                  </div>
                  <span style={{ fontFamily: "'Manrope', Inter, sans-serif", fontSize: '16px', fontWeight: 800, color: '#2563EB' }}>
                    Maintenance Mode
                  </span>
                </div>

                <p style={{ margin: '0 0 18px', fontFamily: 'Inter', fontSize: '13px', color: '#374151', lineHeight: '1.6' }}>
                  Enabling this will restrict all driver and user access. The platform will display a maintenance message while you perform system updates.
                </p>

                <button
                  suppressHydrationWarning
                  onClick={() => setMaintenanceOn(v => !v)}
                  style={{
                    width: '100%', padding: '12px', borderRadius: '10px',
                    background: maintenanceOn ? '#DC2626' : '#2563EB',
                    border: 'none', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                    fontFamily: 'Inter', fontSize: '12px', fontWeight: 800,
                    color: '#fff', letterSpacing: '0.8px', textTransform: 'uppercase',
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <circle cx="7" cy="7" r="5.5" stroke="white" strokeWidth="1.4" />
                    <path d="M7 4.5V7" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
                    <path d="M4.5 3.5A5.5 5.5 0 0 0 7 12.5" stroke="white" strokeWidth="1.4" strokeLinecap="round" />
                  </svg>
                  {maintenanceOn ? 'DISABLE MAINTENANCE MODE' : 'ENABLE MAINTENANCE MODE'}
                </button>
              </div>

              {/* Configuration Logs */}
              <div style={{
                background: '#fff', borderRadius: '16px',
                border: '1px solid #E2E8F0', padding: '22px',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <circle cx="8" cy="8" r="6.5" stroke="#2563EB" strokeWidth="1.3" />
                      <path d="M8 4.5v4l2.5 1.5" stroke="#2563EB" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span style={{ fontFamily: "'Manrope', Inter, sans-serif", fontSize: '14px', fontWeight: 800, color: '#191C1E' }}>
                      Configuration Logs
                    </span>
                  </div>
                  <button suppressHydrationWarning style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    fontFamily: 'Inter', fontSize: '11px', fontWeight: 700,
                    color: '#2563EB', letterSpacing: '0.3px', whiteSpace: 'nowrap',
                  }}>
                    VIEW FULL AUDIT
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {configLogs.map((log) => (
                    <div key={log.label} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                      <span style={{
                        width: 8, height: 8, borderRadius: '50%', background: '#2563EB',
                        flexShrink: 0, marginTop: 4,
                      }} />
                      <div>
                        <div style={{ fontFamily: 'Inter', fontSize: '13px', fontWeight: 700, color: '#191C1E' }}>
                          {log.label}
                        </div>
                        <div style={{ fontFamily: 'Inter', fontSize: '11px', color: '#64748B', marginTop: 2 }}>
                          by {log.by} • {log.time}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* ── App Version Control ─────────────────────────────── */}
          <div style={{
            marginTop: '24px', background: '#EFF6FF', borderRadius: '16px',
            border: '1px solid #BFDBFE', padding: '28px',
          }}>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
              <div style={{ width: 32, height: 32, borderRadius: '8px', background: '#DBEAFE', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <rect x="4" y="1" width="8" height="14" rx="2" stroke="#2563EB" strokeWidth="1.4" />
                  <path d="M6 12h4" stroke="#2563EB" strokeWidth="1.3" strokeLinecap="round" />
                </svg>
              </div>
              <span style={{ fontFamily: "'Manrope', Inter, sans-serif", fontSize: '17px', fontWeight: 800, color: '#191C1E' }}>
                App Version Control
              </span>
            </div>
            <p style={{ margin: '0 0 20px', fontFamily: 'Inter', fontSize: '13px', color: '#64748B' }}>
              Manage production builds and enforcement policies for mobile platforms.
            </p>

            {/* Platform cards */}
            <div style={{ display: 'flex', gap: '16px' }}>
              {[
                { name: 'iOS Production', version: 'v4.8.2', deployed: 'Oct 24, 2023', forceOn: iosForce, setForce: setIosForce },
                { name: 'Android Production', version: 'v4.7.9', deployed: 'Oct 12, 2023', forceOn: androidForce, setForce: setAndroidForce },
              ].map((p) => (
                <div key={p.name} style={{
                  flex: 1, background: '#fff', borderRadius: '12px',
                  border: '1px solid #DBEAFE', padding: '18px 20px',
                  display: 'flex', flexDirection: 'column', gap: '10px',
                }}>
                  {/* Top row */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: 40, height: 40, borderRadius: '10px', background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <svg width="18" height="22" viewBox="0 0 18 22" fill="none">
                          <rect x="2" y="1" width="14" height="20" rx="3" stroke="#2563EB" strokeWidth="1.4" />
                          <path d="M7 18h4" stroke="#2563EB" strokeWidth="1.4" strokeLinecap="round" />
                          <path d="M6 4h6" stroke="#2563EB" strokeWidth="1.2" strokeLinecap="round" />
                        </svg>
                      </div>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                          <span style={{ fontFamily: 'Inter', fontSize: '14px', fontWeight: 700, color: '#191C1E' }}>{p.name}</span>
                          <span style={{ padding: '2px 8px', borderRadius: '9999px', background: '#2563EB', fontFamily: 'Inter', fontSize: '10px', fontWeight: 700, color: '#fff', letterSpacing: '0.3px' }}>
                            ACTIVE
                          </span>
                        </div>
                        <div style={{ fontFamily: "'Manrope', Inter, sans-serif", fontSize: '22px', fontWeight: 800, color: '#2563EB', lineHeight: '1.2', marginTop: 4 }}>
                          {p.version}
                        </div>
                        <div style={{ fontFamily: 'Inter', fontSize: '11px', color: '#64748B', marginTop: 2 }}>
                          Last deployed: {p.deployed}
                        </div>
                      </div>
                    </div>

                    {/* Force Update toggle */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px', flexShrink: 0 }}>
                      <span style={{ fontFamily: 'Inter', fontSize: '10px', fontWeight: 700, color: '#64748B', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                        FORCE UPDATE
                      </span>
                      <button
                        suppressHydrationWarning
                        onClick={() => p.setForce(v => !v)}
                        style={{
                          width: 44, height: 24, borderRadius: 12, border: 'none', cursor: 'pointer',
                          background: p.forceOn ? '#2563EB' : '#D1D5DB', position: 'relative',
                        }}
                      >
                        <span style={{
                          position: 'absolute', top: 2, borderRadius: '50%',
                          width: 20, height: 20, background: '#fff',
                          left: p.forceOn ? 22 : 2, transition: 'left 0.15s',
                          display: 'block',
                        }} />
                      </button>
                    </div>
                  </div>

                  {/* Edit Config button */}
                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <button suppressHydrationWarning style={{
                      padding: '7px 16px', borderRadius: '8px',
                      border: '1px solid #BFDBFE', background: '#EFF6FF',
                      fontFamily: 'Inter', fontSize: '12px', fontWeight: 700, color: '#2563EB', cursor: 'pointer',
                    }}>
                      Edit Config
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Security Protocols ──────────────────────────────── */}
          <div style={{
            marginTop: '24px', background: '#fff', borderRadius: '16px',
            border: '1px solid #E2E8F0', padding: '28px',
          }}>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '6px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                  <div style={{ width: 32, height: 32, borderRadius: '8px', background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="16" height="18" viewBox="0 0 16 18" fill="none">
                      <path d="M8 1L2 4v5c0 4.1 2.6 7.9 6 9 3.4-1.1 6-4.9 6-9V4L8 1z" stroke="#2563EB" strokeWidth="1.4" strokeLinejoin="round" />
                      <path d="M5.5 9l2 2 3-3" stroke="#2563EB" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <span style={{ fontFamily: "'Manrope', Inter, sans-serif", fontSize: '17px', fontWeight: 800, color: '#191C1E' }}>
                    Security Protocols
                  </span>
                </div>
                <p style={{ margin: 0, fontFamily: 'Inter', fontSize: '13px', color: '#64748B' }}>
                  Define authentication and session management policies.
                </p>
              </div>
              <button suppressHydrationWarning style={{
                padding: '10px 20px', borderRadius: '10px', border: 'none',
                background: '#2563EB', fontFamily: 'Inter', fontSize: '12px', fontWeight: 800,
                color: '#fff', letterSpacing: '0.8px', textTransform: 'uppercase', cursor: 'pointer',
                whiteSpace: 'nowrap', flexShrink: 0,
              }}>
                SAVE ALL CHANGES
              </button>
            </div>

            {/* Three protocol cards */}
            <div style={{ display: 'flex', gap: '16px', marginTop: '20px' }}>

              {/* MFA Enforcement */}
              <div style={{ flex: 1, background: '#F8FBFF', borderRadius: '12px', border: '1px solid #DBEAFE', padding: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8 1L2 4v4c0 3.28 2.08 6.33 6 7.5C11.92 14.33 14 11.28 14 8V4L8 1z" stroke="#2563EB" strokeWidth="1.3" strokeLinejoin="round" />
                    <path d="M5 8l2 2 4-4" stroke="#2563EB" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span style={{ fontFamily: 'Inter', fontSize: '11px', fontWeight: 800, color: '#2563EB', letterSpacing: '0.8px', textTransform: 'uppercase' }}>
                    MFA ENFORCEMENT
                  </span>
                </div>
                <p style={{ margin: '0 0 16px', fontFamily: 'Inter', fontSize: '12px', color: '#64748B', lineHeight: '1.6' }}>
                  Require Multi-Factor Authentication for all administrative roles.
                </p>
                <div style={{ position: 'relative' }}>
                  <select
                    suppressHydrationWarning
                    value={mfaScope}
                    onChange={e => setMfaScope(e.target.value)}
                    style={{
                      width: '100%', padding: '10px 32px 10px 12px', borderRadius: '8px',
                      border: '1px solid #DBEAFE', background: '#fff',
                      fontFamily: 'Inter', fontSize: '13px', color: '#191C1E',
                      appearance: 'none', outline: 'none', cursor: 'pointer',
                    }}
                  >
                    {['All Staff & Admins', 'Admins Only', 'Disabled'].map(o => <option key={o}>{o}</option>)}
                  </select>
                  <svg style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} width="11" height="7" viewBox="0 0 11 7" fill="none">
                    <path d="M1 1l4.5 5 4.5-5" stroke="#64748B" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>

              {/* Session Timeout */}
              <div style={{ flex: 1, background: '#F8FBFF', borderRadius: '12px', border: '1px solid #DBEAFE', padding: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="6.5" stroke="#2563EB" strokeWidth="1.3" />
                    <path d="M8 4.5V8.5l3 1.5" stroke="#2563EB" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span style={{ fontFamily: 'Inter', fontSize: '11px', fontWeight: 800, color: '#2563EB', letterSpacing: '0.8px', textTransform: 'uppercase' }}>
                    SESSION TIMEOUT
                  </span>
                </div>
                <p style={{ margin: '0 0 16px', fontFamily: 'Inter', fontSize: '12px', color: '#64748B', lineHeight: '1.6' }}>
                  Automatic logout after period of inactivity. Value in minutes.
                </p>
                <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #DBEAFE', borderRadius: '8px', background: '#fff', overflow: 'hidden' }}>
                  <input
                    suppressHydrationWarning
                    type="number"
                    value={sessionTimeout}
                    onChange={e => setSessionTimeout(e.target.value)}
                    style={{
                      flex: 1, padding: '10px 12px', border: 'none', outline: 'none',
                      fontFamily: 'Inter', fontSize: '16px', fontWeight: 700, color: '#191C1E',
                      background: 'transparent',
                    }}
                  />
                  <span style={{ padding: '0 12px', fontFamily: 'Inter', fontSize: '11px', fontWeight: 700, color: '#2563EB', letterSpacing: '0.5px' }}>
                    MINUTES
                  </span>
                </div>
              </div>

              {/* Password Expiry */}
              <div style={{ flex: 1, background: '#F8FBFF', borderRadius: '12px', border: '1px solid #DBEAFE', padding: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle cx="3.5" cy="10" r="1.5" stroke="#2563EB" strokeWidth="1.2" />
                    <circle cx="8" cy="10" r="1.5" stroke="#2563EB" strokeWidth="1.2" />
                    <circle cx="12.5" cy="10" r="1.5" stroke="#2563EB" strokeWidth="1.2" />
                    <path d="M3.5 8.5V6a4.5 4.5 0 0 1 9 0v2.5" stroke="#2563EB" strokeWidth="1.2" strokeLinecap="round" />
                  </svg>
                  <span style={{ fontFamily: 'Inter', fontSize: '11px', fontWeight: 800, color: '#2563EB', letterSpacing: '0.8px', textTransform: 'uppercase' }}>
                    PASSWORD EXPIRY
                  </span>
                </div>
                <p style={{ margin: '0 0 16px', fontFamily: 'Inter', fontSize: '12px', color: '#64748B', lineHeight: '1.6' }}>
                  Force password reset after specified duration. 0 to disable.
                </p>
                <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #DBEAFE', borderRadius: '8px', background: '#fff', overflow: 'hidden' }}>
                  <input
                    suppressHydrationWarning
                    type="number"
                    value={passwordExpiry}
                    onChange={e => setPasswordExpiry(e.target.value)}
                    style={{
                      flex: 1, padding: '10px 12px', border: 'none', outline: 'none',
                      fontFamily: 'Inter', fontSize: '16px', fontWeight: 700, color: '#191C1E',
                      background: 'transparent',
                    }}
                  />
                  <span style={{ padding: '0 12px', fontFamily: 'Inter', fontSize: '11px', fontWeight: 700, color: '#2563EB', letterSpacing: '0.5px' }}>
                    DAYS
                  </span>
                </div>
              </div>

            </div>
          </div>

          {/* ── Footer ──────────────────────────────────────────── */}
          <div style={{ marginTop: '28px', textAlign: 'center' }}>
            <span style={{ fontFamily: 'Inter', fontSize: '13px', color: '#64748B' }}>
              Need help with advanced configuration?{' '}
              <button suppressHydrationWarning style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Inter', fontSize: '13px', fontWeight: 600, color: '#2563EB', padding: 0, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                View Documentation
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 10L10 2M10 2H5M10 2v5" stroke="#2563EB" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </span>
          </div>

        </main>
      </div>
    </div>
  );
}
