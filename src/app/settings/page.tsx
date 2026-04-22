'use client';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';

const inter = "'Inter', sans-serif";
const manrope = "'Manrope', sans-serif";

/* ── Toggle ─────────────────────────────────────────────────── */
function Toggle({ on }: { on: boolean }) {
  return (
    <div style={{
      width: '44px', height: '24px', borderRadius: '999px',
      background: on ? '#2563EB' : '#E2E8F0',
      position: 'relative', flexShrink: 0, cursor: 'pointer',
    }}>
      <div style={{
        position: 'absolute', top: '2px',
        left: on ? '22px' : '2px',
        width: '20px', height: '20px', borderRadius: '50%',
        background: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
        transition: 'left 0.15s ease',
      }} />
    </div>
  );
}

/* ── Tab Switcher ───────────────────────────────────────────── */
function TabSwitcher({ active, onChange }: { active: string; onChange: (t: string) => void }) {
  const tabs = ['Alerts', 'Fraud', 'Safety', 'Logs'];
  return (
    <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
      {tabs.map((tab) => {
        const isActive = active === tab;
        return (
          <button
            suppressHydrationWarning
            key={tab}
            onClick={() => onChange(tab)}
            style={{
              background: 'none', border: 'none', borderBottom: isActive ? '2px solid #2563EB' : '2px solid transparent',
              padding: '8px 0', cursor: 'pointer',
              fontFamily: inter, fontSize: '14px', fontWeight: isActive ? 700 : 500,
              color: isActive ? '#2563EB' : '#64748B',
              lineHeight: '20px',
            }}
          >
            {tab}
          </button>
        );
      })}
    </div>
  );
}

/* ── SOS Card ───────────────────────────────────────────────── */
function SOSCard() {
  return (
    <div style={{
      flex: 1.3, minWidth: 0,
      background: '#FFFFFF', borderRadius: '12px',
      border: '1px solid #E2E8F0', padding: '20px',
      display: 'flex', flexDirection: 'column', gap: '12px',
    }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span style={{
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          width: '36px', height: '36px', borderRadius: '8px',
          background: '#FEE2E2', color: '#DC2626',
          fontFamily: inter, fontSize: '12px', fontWeight: 800,
        }}>
          SOS
        </span>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontFamily: inter, fontSize: '14px', fontWeight: 700, color: '#0F172A' }}>
              SOS Triggered: #C-9011
            </span>
            <span style={{
              padding: '3px 8px', borderRadius: '9999px',
              background: '#DC2626', color: '#FFFFFF',
              fontFamily: inter, fontSize: '9px', fontWeight: 700,
              letterSpacing: '0.5px', textTransform: 'uppercase',
            }}>
              Active Emergency
            </span>
          </div>
          <div style={{ fontFamily: inter, fontSize: '12px', color: '#64748B', marginTop: '2px' }}>
            Driver: Marco Rossi • Vehicle: BX-901-LK
          </div>
        </div>
      </div>

      {/* Body: map + info */}
      <div style={{ display: 'flex', gap: '12px' }}>
        {/* Map thumbnail */}
        <div style={{
          width: '120px', height: '100px', borderRadius: '10px',
          background: '#1F2937', overflow: 'hidden', position: 'relative', flexShrink: 0,
        }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/dark_map.png" alt="SOS location" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }} />
          <div style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '16px', height: '16px', borderRadius: '50%',
            background: '#DC2626', border: '2px solid white',
            boxShadow: '0 0 8px rgba(220,38,38,0.6)',
          }} />
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px', justifyContent: 'center' }}>
          <div>
            <div style={{ fontFamily: inter, fontSize: '10px', fontWeight: 600, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Location</div>
            <div style={{ fontFamily: inter, fontSize: '12px', fontWeight: 600, color: '#0F172A' }}>Lower Manhattan, 5th Ave</div>
          </div>
          <div>
            <div style={{ fontFamily: inter, fontSize: '10px', fontWeight: 600, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Time Active</div>
            <div style={{ fontFamily: inter, fontSize: '14px', fontWeight: 700, color: '#0F172A' }}>04m 22s</div>
          </div>
          <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
            <button suppressHydrationWarning style={{
              flex: 1, height: '32px', borderRadius: '8px',
              background: '#1F2937', border: 'none',
              fontFamily: inter, fontSize: '12px', fontWeight: 600, color: '#FFFFFF',
              cursor: 'pointer',
            }}>
              Contact
            </button>
            <button suppressHydrationWarning style={{
              flex: 1, height: '32px', borderRadius: '8px',
              background: '#DC2626', border: 'none',
              fontFamily: inter, fontSize: '12px', fontWeight: 600, color: '#FFFFFF',
              cursor: 'pointer',
            }}>
              Notify Authorities
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Fraud Trend Card ───────────────────────────────────────── */
function FraudTrendCard() {
  const bars = [28, 42, 35, 58, 82];
  return (
    <div style={{
      flex: 1, minWidth: 0,
      background: '#FFFFFF', borderRadius: '12px',
      border: '1px solid #E2E8F0', padding: '20px',
      display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
    }}>
      <div style={{ fontFamily: inter, fontSize: '10px', fontWeight: 600, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
        Fraud Trend
      </div>
      <div style={{ fontFamily: manrope, fontSize: '28px', fontWeight: 800, color: '#2563EB', lineHeight: '36px', marginTop: '8px' }}>
        +12.4%
      </div>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '6px', height: '60px', marginTop: '12px' }}>
        {bars.map((h, i) => (
          <div key={i} style={{
            flex: 1,
            height: `${h}%`,
            borderRadius: '3px 3px 0 0',
            background: i === bars.length - 1 ? '#2563EB' : '#DBEAFE',
          }} />
        ))}
      </div>
    </div>
  );
}

/* ── High Risk Zone Card ────────────────────────────────────── */
function HighRiskZoneCard() {
  return (
    <div style={{
      flex: 1, minWidth: 0,
      background: '#FFFFFF', borderRadius: '12px',
      border: '1px solid #E2E8F0', padding: '20px',
      display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
    }}>
      <div style={{ fontFamily: inter, fontSize: '10px', fontWeight: 600, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
        High Risk Zone
      </div>
      <div style={{ marginTop: '8px' }}>
        <div style={{ fontFamily: manrope, fontSize: '18px', fontWeight: 700, color: '#0F172A' }}>Brooklyn, NY</div>
        <div style={{ fontFamily: manrope, fontSize: '24px', fontWeight: 800, color: '#DC2626', lineHeight: '32px' }}>42%</div>
      </div>
      <div style={{ fontFamily: inter, fontSize: '11px', color: '#94A3B8', marginTop: '12px', lineHeight: '16px' }}>
        Concentration of coupon misuse and identity spoofing reported.
      </div>
    </div>
  );
}

/* ── Prevention Rate Card ───────────────────────────────────── */
function PreventionRateCard() {
  return (
    <div style={{
      flex: 1, minWidth: 0,
      background: '#FFFFFF', borderRadius: '12px',
      border: '1px solid #E2E8F0', padding: '20px',
      display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
    }}>
      <div style={{ fontFamily: inter, fontSize: '10px', fontWeight: 600, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
        Prevention Rate
      </div>
      <div style={{ marginTop: '8px' }}>
        <div style={{ fontFamily: manrope, fontSize: '28px', fontWeight: 800, color: '#059669', lineHeight: '36px' }}>94.8%</div>
        <div style={{
          height: '6px', borderRadius: '9999px', background: '#F1F5F9', overflow: 'hidden', marginTop: '8px',
        }}>
          <div style={{ width: '94.8%', height: '100%', borderRadius: '9999px', background: '#059669' }} />
        </div>
      </div>
      <div style={{ fontFamily: inter, fontSize: '11px', color: '#94A3B8', marginTop: '8px' }}>
        Target: 98%
      </div>
    </div>
  );
}

/* ── Severity Badge ─────────────────────────────────────────── */
function SeverityBadge({ level }: { level: 'Critical' | 'Warning' | 'Info' }) {
  const styles = {
    Critical: { bg: '#FEE2E2', color: '#DC2626', dot: '#DC2626' },
    Warning: { bg: '#FEF3C7', color: '#D97706', dot: '#F59E0B' },
    Info: { bg: '#DBEAFE', color: '#2563EB', dot: '#3B82F6' },
  };
  const s = styles[level];
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: '6px',
      padding: '4px 10px', borderRadius: '9999px',
      background: s.bg,
      fontFamily: inter, fontSize: '11px', fontWeight: 700, color: s.color,
    }}>
      <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: s.dot }} />
      {level}
    </span>
  );
}

/* ── Alert Icon ─────────────────────────────────────────────── */
function AlertIcon({ type }: { type: 'sos' | 'suspicious' | 'payment' }) {
  if (type === 'sos') {
    return (
      <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#FEE2E2', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M9 2l7 13H2L9 2z" stroke="#DC2626" strokeWidth="1.4" strokeLinejoin="round" />
          <path d="M9 7v3.5M9 12.2v.1" stroke="#DC2626" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      </div>
    );
  }
  if (type === 'suspicious') {
    return (
      <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#DBEAFE', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <circle cx="9" cy="9" r="6" stroke="#2563EB" strokeWidth="1.4" />
          <path d="M9 6v4M9 12v.01" stroke="#2563EB" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      </div>
    );
  }
  return (
    <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#FEF3C7', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <rect x="2" y="5" width="14" height="9" rx="1.5" stroke="#D97706" strokeWidth="1.3" />
        <path d="M2 8h14" stroke="#D97706" strokeWidth="1" />
        <circle cx="12" cy="11" r="1.5" fill="#D97706" />
        <path d="M5 11h3" stroke="#D97706" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    </div>
  );
}

/* ── Real-time Alerts Feed ──────────────────────────────────── */
function RealTimeAlertsFeed() {
  const alerts = [
    { type: 'sos' as const, title: 'SOS Triggered', user: 'Marco Rossi', id: 'DR-9082', location: 'Manhattan, NY', time: '14:22:10', severity: 'Critical' as const },
    { type: 'suspicious' as const, title: 'Suspicious booking', user: 'Elena Fisher', id: 'US-1142', location: 'Remote (API)', time: '14:19:45', severity: 'Warning' as const },
    { type: 'payment' as const, title: 'Payment fraud', user: 'Victor Sullivan', id: 'US-9920', location: 'Los Angeles, CA', time: '14:15:02', severity: 'Critical' as const },
  ];

  return (
    <div style={{
      flex: 1, minWidth: 0,
      background: '#FFFFFF', borderRadius: '12px',
      border: '1px solid #E2E8F0', padding: '20px',
      display: 'flex', flexDirection: 'column', gap: '16px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: manrope, fontSize: '16px', fontWeight: 700, color: '#0F172A' }}>Real-time Alerts Feed</span>
        <span style={{
          padding: '4px 10px', borderRadius: '9999px',
          background: '#D1FAE5', color: '#059669',
          fontFamily: inter, fontSize: '10px', fontWeight: 700,
          letterSpacing: '0.5px', textTransform: 'uppercase',
        }}>
          Live Feed
        </span>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            {['Alert Type', 'User/Driver', 'Location', 'Time', 'Severity'].map((h) => (
              <th key={h} style={{
                padding: '10px 12px', textAlign: 'left',
                fontFamily: inter, fontSize: '10px', fontWeight: 700,
                color: '#94A3B8', letterSpacing: '0.8px', textTransform: 'uppercase',
                borderBottom: '1px solid #F1F5F9',
              }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {alerts.map((a, i) => (
            <tr key={i}>
              <td style={{ padding: '14px 12px', borderBottom: '1px solid #F8FAFC' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <AlertIcon type={a.type} />
                  <span style={{ fontFamily: inter, fontSize: '13px', fontWeight: 600, color: '#0F172A' }}>{a.title}</span>
                </div>
              </td>
              <td style={{ padding: '14px 12px', borderBottom: '1px solid #F8FAFC' }}>
                <div style={{ fontFamily: inter, fontSize: '13px', fontWeight: 600, color: '#0F172A' }}>{a.user}</div>
                <div style={{ fontFamily: inter, fontSize: '11px', color: '#94A3B8', marginTop: '2px' }}>ID: {a.id}</div>
              </td>
              <td style={{ padding: '14px 12px', borderBottom: '1px solid #F8FAFC', fontFamily: inter, fontSize: '13px', color: '#475569' }}>
                {a.location}
              </td>
              <td style={{ padding: '14px 12px', borderBottom: '1px solid #F8FAFC', fontFamily: inter, fontSize: '13px', color: '#475569' }}>
                {a.time}
              </td>
              <td style={{ padding: '14px 12px', borderBottom: '1px solid #F8FAFC' }}>
                <SeverityBadge level={a.severity} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ── Risk Score Bar ─────────────────────────────────────────── */
function RiskScoreBar({ score }: { score: number }) {
  const color = score >= 70 ? '#DC2626' : score >= 40 ? '#D97706' : '#059669';
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1 }}>
      <div style={{ flex: 1, height: '6px', borderRadius: '9999px', background: '#F1F5F9', overflow: 'hidden' }}>
        <div style={{ width: `${score}%`, height: '100%', borderRadius: '9999px', background: color }} />
      </div>
      <span style={{ fontFamily: inter, fontSize: '12px', fontWeight: 700, color, minWidth: '24px' }}>{score}</span>
    </div>
  );
}

/* ── Top Risk Profiles ──────────────────────────────────────── */
function TopRiskProfiles() {
  const profiles = [
    { name: 'Jack Drake', score: 92, max: 100, level: 'HIGH RISK', color: '#DC2626', detail: 'Cancellation: 88%', avatar: '#1F2937' },
    { name: 'Sarah Chen', score: 54, max: 100, level: 'MID RISK', color: '#D97706', detail: 'Failed Pay: 3 in 30d', avatar: '#374151' },
    { name: 'Liam Brown', score: 12, max: 100, level: 'LOW RISK', color: '#059669', detail: 'Reports: Clean', avatar: '#475569' },
  ];

  return (
    <div style={{
      background: '#FFFFFF', borderRadius: '12px',
      border: '1px solid #E2E8F0', padding: '20px',
      display: 'flex', flexDirection: 'column', gap: '16px',
    }}>
      <div style={{ fontFamily: manrope, fontSize: '16px', fontWeight: 700, color: '#0F172A' }}>Top Risk Profiles</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {profiles.map((p, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: '12px',
            padding: '12px', borderRadius: '10px', background: '#F8FAFC',
          }}>
            <div style={{
              width: '40px', height: '40px', borderRadius: '50%',
              background: p.avatar, display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <circle cx="9" cy="7" r="3" stroke="white" strokeWidth="1.3" />
                <path d="M3 16c0-3.314 2.686-6 6-6s6 2.686 6 6" stroke="white" strokeWidth="1.3" strokeLinecap="round" />
              </svg>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'space-between' }}>
                <span style={{ fontFamily: inter, fontSize: '14px', fontWeight: 700, color: '#0F172A' }}>{p.name}</span>
                <span style={{ fontFamily: inter, fontSize: '12px', fontWeight: 700, color: p.color }}>{p.score}/{p.max}</span>
              </div>
              <div style={{ fontFamily: inter, fontSize: '11px', color: '#64748B', marginTop: '2px' }}>{p.detail}</div>
              <div style={{ marginTop: '6px' }}>
                <RiskScoreBar score={p.score} />
              </div>
              <div style={{
                marginTop: '4px',
                fontFamily: inter, fontSize: '9px', fontWeight: 700,
                color: p.color, letterSpacing: '0.5px', textTransform: 'uppercase',
              }}>
                {p.level}
              </div>
            </div>
          </div>
        ))}
      </div>
      <button suppressHydrationWarning style={{
        width: '100%', height: '40px', borderRadius: '10px',
        background: '#F1F5F9', border: '1px solid #E2E8F0',
        fontFamily: inter, fontSize: '13px', fontWeight: 600, color: '#2563EB',
        cursor: 'pointer',
      }}>
        View All Risk Scores
      </button>

      {/* Recent Actions */}
      <div style={{ marginTop: '8px' }}>
        <div style={{ fontFamily: manrope, fontSize: '14px', fontWeight: 700, color: '#0F172A', marginBottom: '12px' }}>Recent Actions</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', gap: '10px' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#2563EB', marginTop: '5px', flexShrink: 0 }} />
            <div>
              <div style={{ fontFamily: inter, fontSize: '13px', fontWeight: 600, color: '#0F172A' }}>Account Blocked</div>
              <div style={{ fontFamily: inter, fontSize: '11px', color: '#64748B', marginTop: '2px', lineHeight: '16px' }}>
                Admin-42 blocked US-8812 (Payment fraud)
              </div>
              <div style={{ fontFamily: inter, fontSize: '11px', color: '#94A3B8', marginTop: '4px' }}>2 mins ago</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#059669', marginTop: '5px', flexShrink: 0 }} />
            <div>
              <div style={{ fontFamily: inter, fontSize: '13px', fontWeight: 600, color: '#0F172A' }}>SOS Resolved</div>
              <div style={{ fontFamily: inter, fontSize: '11px', color: '#64748B', marginTop: '2px', lineHeight: '16px' }}>
                Case #C-9011 marked as false alarm
              </div>
              <div style={{ fontFamily: inter, fontSize: '11px', color: '#94A3B8', marginTop: '4px' }}>15 mins ago</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Fraud Status Badge ─────────────────────────────────────── */
function FraudStatusBadge({ status }: { status: 'Pending Review' | 'Watchlist' | 'Resolved' }) {
  const styles = {
    'Pending Review': { bg: '#DBEAFE', color: '#2563EB' },
    'Watchlist': { bg: '#D1FAE5', color: '#059669' },
    'Resolved': { bg: '#F1F5F9', color: '#64748B' },
  };
  const s = styles[status];
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center',
      padding: '4px 12px', borderRadius: '9999px',
      background: s.bg,
      fontFamily: inter, fontSize: '11px', fontWeight: 600, color: s.color,
    }}>
      {status}
    </span>
  );
}

/* ── Fraud Detection Pipeline ───────────────────────────────── */
function FraudDetectionPipeline() {
  const cases = [
    { id: 'FR-88029', user: 'Arthur Morgan', ip: '192.168.1.1', type: 'Coupon misuse', score: 82, status: 'Pending Review' as const },
    { id: 'FR-88031', user: 'Sadie Adler', ip: '104.22.11.0', type: 'Fake booking', score: 45, status: 'Watchlist' as const },
  ];

  return (
    <div style={{
      background: '#FFFFFF', borderRadius: '12px',
      border: '1px solid #E2E8F0', padding: '20px',
      display: 'flex', flexDirection: 'column', gap: '16px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontFamily: manrope, fontSize: '16px', fontWeight: 700, color: '#0F172A' }}>Fraud Detection Pipeline</div>
          <div style={{ fontFamily: inter, fontSize: '12px', color: '#94A3B8', marginTop: '2px' }}>Automated risk analysis of recent transactions</div>
        </div>
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: '6px',
          padding: '6px 12px', borderRadius: '9999px',
          background: '#D1FAE5', color: '#059669',
          fontFamily: inter, fontSize: '11px', fontWeight: 700,
        }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="7" cy="7" r="5" stroke="#059669" strokeWidth="1.3" />
            <path d="M7 4.5v3l2 1.5" stroke="#059669" strokeWidth="1.3" strokeLinecap="round" />
          </svg>
          AI GUARD ACTIVE
        </span>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            {['Case ID', 'User/Driver', 'Fraud Type', 'Risk Score', 'Status'].map((h) => (
              <th key={h} style={{
                padding: '10px 12px', textAlign: 'left',
                fontFamily: inter, fontSize: '10px', fontWeight: 700,
                color: '#94A3B8', letterSpacing: '0.8px', textTransform: 'uppercase',
                borderBottom: '1px solid #F1F5F9',
              }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {cases.map((c, i) => (
            <tr key={i}>
              <td style={{ padding: '14px 12px', borderBottom: '1px solid #F8FAFC', fontFamily: inter, fontSize: '13px', fontWeight: 600, color: '#0F172A' }}>
                {c.id}
              </td>
              <td style={{ padding: '14px 12px', borderBottom: '1px solid #F8FAFC' }}>
                <div style={{ fontFamily: inter, fontSize: '13px', fontWeight: 600, color: '#0F172A' }}>{c.user}</div>
                <div style={{ fontFamily: inter, fontSize: '11px', color: '#94A3B8', marginTop: '2px' }}>IP: {c.ip}</div>
              </td>
              <td style={{ padding: '14px 12px', borderBottom: '1px solid #F8FAFC' }}>
                <span style={{
                  padding: '4px 10px', borderRadius: '6px',
                  background: '#F1F5F9',
                  fontFamily: inter, fontSize: '12px', fontWeight: 500, color: '#475569',
                }}>
                  {c.type}
                </span>
              </td>
              <td style={{ padding: '14px 12px', borderBottom: '1px solid #F8FAFC' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '60px', height: '6px', borderRadius: '9999px', background: '#F1F5F9', overflow: 'hidden' }}>
                    <div style={{
                      width: `${c.score}%`, height: '100%', borderRadius: '9999px',
                      background: c.score >= 70 ? '#DC2626' : c.score >= 40 ? '#D97706' : '#059669',
                    }} />
                  </div>
                  <span style={{
                    fontFamily: inter, fontSize: '12px', fontWeight: 700,
                    color: c.score >= 70 ? '#DC2626' : c.score >= 40 ? '#D97706' : '#059669',
                  }}>
                    {c.score}
                  </span>
                </div>
              </td>
              <td style={{ padding: '14px 12px', borderBottom: '1px solid #F8FAFC' }}>
                <FraudStatusBadge status={c.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ── Page ───────────────────────────────────────────────────── */
export default function SafetyFraudPage() {
  const [activeTab, setActiveTab] = useState('Alerts');

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: '#F6F8FA' }}>
      <Sidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minWidth: 0 }}>
        <Navbar />
        <main style={{ flex: 1, overflowY: 'auto', padding: '24px', background: '#F6F8FA', boxSizing: 'border-box' }}>

          {/* ── Header Row ─────────────────────────────────────────── */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
              <div>
                <div style={{ fontFamily: manrope, fontSize: '22px', fontWeight: 800, color: '#2563EB', lineHeight: '28px' }}>
                  Logistics Safety & Fraud
                </div>
                <div style={{ fontFamily: manrope, fontSize: '22px', fontWeight: 800, color: '#2563EB', lineHeight: '28px' }}>
                  Pro
                </div>
              </div>
              <TabSwitcher active={activeTab} onChange={setActiveTab} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <button suppressHydrationWarning style={{
                height: '40px', padding: '0 20px',
                borderRadius: '9999px',
                background: '#DC2626', border: 'none',
                display: 'flex', alignItems: 'center', gap: '8px',
                fontFamily: inter, fontSize: '13px', fontWeight: 700, color: '#FFFFFF',
                cursor: 'pointer',
              }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 1l1.8 4.2L14 6l-3.5 2.8L11.5 13 8 10.5 4.5 13l1-4.2L2 6l4.2-.8L8 1z" fill="white" />
                </svg>
                Emergency SOS
              </button>
            </div>
          </div>

          {/* ── KPI Cards Row ──────────────────────────────────────── */}
          <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }}>
            <SOSCard />
            <FraudTrendCard />
            <HighRiskZoneCard />
            <PreventionRateCard />
          </div>

          {/* ── Filters Bar ────────────────────────────────────────── */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '12px',
            marginBottom: '24px', flexWrap: 'wrap',
          }}>
            {[
              { label: 'Risk Level: All', icon: 'filter' },
              { label: 'Alert Type: All', icon: 'filter' },
              { label: 'Oct 20, 2023 - Today', icon: 'calendar' },
            ].map((f) => (
              <button
                suppressHydrationWarning
                key={f.label}
                style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  height: '40px', padding: '0 14px',
                  borderRadius: '8px',
                  background: '#FFFFFF', border: '1px solid #E2E8F0',
                  fontFamily: inter, fontSize: '13px', fontWeight: 500, color: '#475569',
                  cursor: 'pointer',
                }}
              >
                {f.icon === 'calendar' ? (
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <rect x="1.5" y="2.5" width="11" height="10" rx="1.5" stroke="#94A3B8" strokeWidth="1.2" />
                    <path d="M1.5 5.5h11M4 1v2.5M9 1v2.5" stroke="#94A3B8" strokeWidth="1.2" strokeLinecap="round" />
                  </svg>
                ) : (
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M1 3.5h12M3 7h8M5 10.5h4" stroke="#94A3B8" strokeWidth="1.2" strokeLinecap="round" />
                  </svg>
                )}
                {f.label}
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                  <path d="M1 1.5l4 3 4-3" stroke="#94A3B8" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            ))}
            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button suppressHydrationWarning style={{
                width: '40px', height: '40px', borderRadius: '8px',
                background: '#FFFFFF', border: '1px solid #E2E8F0',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer',
              }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 1v10M4 7l4 4 4-4M2 15h12" stroke="#475569" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button suppressHydrationWarning style={{
                height: '40px', padding: '0 20px',
                borderRadius: '8px',
                background: '#2563EB', border: 'none',
                fontFamily: inter, fontSize: '13px', fontWeight: 600, color: '#FFFFFF',
                cursor: 'pointer',
              }}>
                Search Database
              </button>
            </div>
          </div>

          {/* ── Two Column: Alerts Feed + Risk Profiles ──────────── */}
          <div style={{ display: 'flex', gap: '20px', marginBottom: '24px', flexWrap: 'wrap' }}>
            <div style={{ flex: '1.5 1 0', minWidth: '500px' }}>
              <RealTimeAlertsFeed />
            </div>
            <div style={{ flex: '1 1 0', minWidth: '280px' }}>
              <TopRiskProfiles />
            </div>
          </div>

          {/* ── Fraud Detection Pipeline ──────────────────────────── */}
          <FraudDetectionPipeline />

          {/* ── Footer ────────────────────────────────────────────── */}
          <div style={{
            marginTop: '24px', paddingTop: '16px',
            borderTop: '1px solid #E2E8F0',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            flexWrap: 'wrap', gap: '12px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <span style={{ fontFamily: inter, fontSize: '11px', fontWeight: 600, color: '#94A3B8', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                Carry On Logistics Admin V4.2.0
              </span>
              <span style={{ fontFamily: inter, fontSize: '11px', fontWeight: 600, color: '#94A3B8', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                System Uptime: 99.98%
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <span style={{ fontFamily: inter, fontSize: '11px', fontWeight: 600, color: '#059669', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                Server Node: NYC-PROD-01
              </span>
              <span style={{ fontFamily: inter, fontSize: '11px', fontWeight: 600, color: '#94A3B8', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                Security Token Expires in 4h 12m
              </span>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
