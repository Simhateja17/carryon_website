'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';

/* ── Toggle switch ───────────────────────────────────────────── */
function Toggle({ on, onChange }: { on: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      suppressHydrationWarning
      onClick={() => onChange(!on)}
      style={{
        width: '40px',
        height: '22px',
        borderRadius: '11px',
        background: on ? '#2563EB' : '#CBD5E1',
        border: 'none',
        cursor: 'pointer',
        position: 'relative',
        padding: 0,
        flexShrink: 0,
        transition: 'background 0.15s',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '3px',
          left: on ? '21px' : '3px',
          width: '16px',
          height: '16px',
          borderRadius: '50%',
          background: '#fff',
          boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
          transition: 'left 0.15s',
        }}
      />
    </button>
  );
}

/* ── Member row ──────────────────────────────────────────────── */
type Member = {
  name: string;
  role: string;
  avatar: string;
  email: boolean;
  sms: boolean;
  push: boolean;
};

function MemberRow({ member }: { member: Member }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '14px',
        padding: '16px 18px',
        borderRadius: '12px',
        background: '#F8FAFC',
      }}
    >
      <div
        style={{
          width: '42px',
          height: '42px',
          borderRadius: '50%',
          background: '#DBEAFE',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          overflow: 'hidden',
        }}
      >
        <img
          src={member.avatar}
          alt={member.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: 'Inter', fontSize: '14px', fontWeight: 700, color: '#0F172A', marginBottom: '2px' }}>
          {member.name}
        </div>
        <div style={{ fontFamily: 'Inter', fontSize: '12px', color: '#64748B' }}>{member.role}</div>
      </div>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        {member.email && (
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <rect x="2" y="4" width="14" height="10" rx="2" stroke="#059669" strokeWidth="1.4" />
            <path d="M2 5l7 4 7-4" stroke="#059669" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
        )}
        {member.sms && (
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M3 3h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H6l-4 3V4a1 1 0 0 1 1-1Z" stroke="#059669" strokeWidth="1.4" strokeLinejoin="round" />
          </svg>
        )}
        {member.push && (
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M13 6.5A5 5 0 0 0 5 6.5c0 5-1.5 6.5-1.5 6.5h11S13 11.5 13 6.5Z" stroke="#059669" strokeWidth="1.4" />
            <path d="M9.5 14.5a1.5 1.5 0 0 1-3 0" stroke="#059669" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
        )}
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ cursor: 'pointer', marginLeft: '4px' }}>
          <circle cx="9" cy="3" r="1.2" fill="#94A3B8" />
          <circle cx="9" cy="9" r="1.2" fill="#94A3B8" />
          <circle cx="9" cy="15" r="1.2" fill="#94A3B8" />
        </svg>
      </div>
    </div>
  );
}

/* ── Activity row ────────────────────────────────────────────── */
type Activity = {
  timestamp: string;
  alertType: string;
  status: 'DELIVERED' | 'BOUNCED';
  deliveryIcon: string;
};

function ActivityRow({ activity }: { activity: Activity }) {
  const statusBg = activity.status === 'DELIVERED' ? '#DCFCE7' : '#FEE2E2';
  const statusColor = activity.status === 'DELIVERED' ? '#166534' : '#991B1B';

  return (
    <tr>
      <td style={{ fontFamily: 'Inter', fontSize: '13px', color: '#64748B', padding: '14px 0', borderBottom: '1px solid #F1F5F9' }}>
        {activity.timestamp}
      </td>
      <td style={{ fontFamily: 'Inter', fontSize: '13px', fontWeight: 600, color: '#0F172A', padding: '14px 0', borderBottom: '1px solid #F1F5F9' }}>
        {activity.alertType}
      </td>
      <td style={{ padding: '14px 0', borderBottom: '1px solid #F1F5F9' }}>
        <span
          style={{
            display: 'inline-block',
            padding: '4px 12px',
            borderRadius: '999px',
            background: statusBg,
            fontFamily: 'Inter',
            fontSize: '11px',
            fontWeight: 700,
            color: statusColor,
            letterSpacing: '0.3px',
          }}
        >
          {activity.status}
        </span>
      </td>
      <td style={{ padding: '14px 0', borderBottom: '1px solid #F1F5F9' }}>
        <div
          style={{
            width: '30px',
            height: '30px',
            borderRadius: '50%',
            background: activity.status === 'DELIVERED' ? '#DBEAFE' : '#F1F5F9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {activity.deliveryIcon === 'email' ? (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <rect x="1.5" y="3" width="11" height="8" rx="1.5" stroke="#2563EB" strokeWidth="1.2" />
              <path d="M1.5 4l5.5 3 5.5-3" stroke="#2563EB" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          ) : activity.deliveryIcon === 'sms' ? (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 2h10a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H5l-3 2V3a1 1 0 0 1 1-1Z" stroke="#2563EB" strokeWidth="1.2" strokeLinejoin="round" />
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M10 5.5A4 4 0 0 0 4 5.5c0 4-1 5-1 5h8s-1-1-1-5Z" stroke="#94A3B8" strokeWidth="1.2" />
            </svg>
          )}
        </div>
      </td>
    </tr>
  );
}

/* ── Page ────────────────────────────────────────────────────── */
export default function AdminGroupPage() {
  const router = useRouter();

  const [alertConfig, setAlertConfig] = useState({
    criticalDelays: true,
    fleetSafety: true,
    routeUpdates: false,
  });

  const members: Member[] = [
    {
      name: 'Sarah Chen',
      role: 'Head of Operations',
      avatar: '/avatars/sarah-chen.png',
      email: true,
      sms: true,
      push: false,
    },
    {
      name: 'Marcus Thorne',
      role: 'Fleet Safety Lead',
      avatar: '/avatars/marcus-thorne.png',
      email: true,
      sms: false,
      push: true,
    },
    {
      name: 'James Wilson',
      role: 'Regional Director',
      avatar: '/avatars/james-wilson.png',
      email: true,
      sms: true,
      push: true,
    },
  ];

  const activities: Activity[] = [
    {
      timestamp: '14:22:10 Today',
      alertType: 'Critical Delay #982',
      status: 'DELIVERED',
      deliveryIcon: 'email',
    },
    {
      timestamp: '11:05:45 Today',
      alertType: 'Fleet Maintenance Alert',
      status: 'DELIVERED',
      deliveryIcon: 'sms',
    },
    {
      timestamp: '08:12:30 Today',
      alertType: 'Route Divergence Det.',
      status: 'BOUNCED',
      deliveryIcon: 'push',
    },
  ];

  return (
    <div style={{ display: 'flex', width: '100vw', minHeight: '100vh', background: '#F7F9FB' }}>
      <Sidebar />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: '100vh', overflow: 'hidden' }}>
        <Navbar />

        <div style={{ flex: 1, padding: '28px 32px 40px', overflowY: 'auto' }}>
          {/* Breadcrumb */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span
              style={{
                fontFamily: 'Inter',
                fontSize: '12px',
                fontWeight: 600,
                color: '#94A3B8',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                cursor: 'pointer',
              }}
              onClick={() => router.push('/settings/notifications')}
            >
              Notifications
            </span>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M4 2l4 4-4 4" stroke="#94A3B8" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span
              style={{
                fontFamily: 'Inter',
                fontSize: '12px',
                fontWeight: 600,
                color: '#94A3B8',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}
            >
              Recipient Groups
            </span>
          </div>

          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '28px' }}>
            <div>
              <h1 style={{ margin: '0 0 6px', fontFamily: 'Inter', fontSize: '32px', fontWeight: 800, color: '#0F172A' }}>
                Admins{' '}
                <span style={{ color: '#2563EB', fontWeight: 600 }}>#004</span>
              </h1>
              <p
                style={{
                  margin: 0,
                  fontFamily: 'Inter',
                  fontSize: '14px',
                  color: '#64748B',
                  lineHeight: '1.6',
                  maxWidth: '540px',
                }}
              >
                System-level administrators with full override capabilities and critical incident visibility.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                suppressHydrationWarning
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  height: '44px',
                  padding: '0 20px',
                  borderRadius: '10px',
                  background: '#E2E8F0',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: 'Inter',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: '#0F172A',
                }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M11 2l3 3-7 7-4 1 1-4 7-7Z" stroke="#0F172A" strokeWidth="1.4" strokeLinejoin="round" />
                </svg>
                Share Logs
              </button>
              <button
                suppressHydrationWarning
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  height: '44px',
                  padding: '0 24px',
                  borderRadius: '10px',
                  background: '#2563EB',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: 'Inter',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: '#fff',
                }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M11 2l3 3-7 7-4 1 1-4 7-7Z" stroke="#fff" strokeWidth="1.4" strokeLinejoin="round" />
                </svg>
                Edit Group
              </button>
            </div>
          </div>

          {/* Two-column layout */}
          <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
            {/* LEFT COLUMN */}
            <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {/* Group Members */}
              <div
                style={{
                  borderRadius: '16px',
                  background: '#FFF',
                  padding: '24px 28px',
                  boxShadow: '0px 1px 2px 0px rgba(0,0,0,0.05)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <span style={{ fontFamily: 'Inter', fontSize: '18px', fontWeight: 700, color: '#0F172A' }}>
                    Group Members
                  </span>
                  <button
                    suppressHydrationWarning
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                      fontFamily: 'Inter',
                      fontSize: '13px',
                      fontWeight: 600,
                      color: '#2563EB',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <circle cx="8" cy="8" r="6" stroke="#2563EB" strokeWidth="1.3" />
                      <path d="M8 5v6M5 8h6" stroke="#2563EB" strokeWidth="1.3" strokeLinecap="round" />
                    </svg>
                    Add Member
                  </button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {members.map((m) => (
                    <MemberRow key={m.name} member={m} />
                  ))}
                </div>
              </div>

              {/* Recent Activity */}
              <div
                style={{
                  borderRadius: '16px',
                  background: '#FFF',
                  padding: '24px 28px',
                  boxShadow: '0px 1px 2px 0px rgba(0,0,0,0.05)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <span style={{ fontFamily: 'Inter', fontSize: '18px', fontWeight: 700, color: '#0F172A' }}>
                    Recent Activity
                  </span>
                  <span
                    style={{
                      display: 'inline-block',
                      padding: '4px 14px',
                      borderRadius: '999px',
                      background: '#DBEAFE',
                      fontFamily: 'Inter',
                      fontSize: '11px',
                      fontWeight: 700,
                      color: '#2563EB',
                      letterSpacing: '0.3px',
                    }}
                  >
                    3 TOTAL SENT TODAY
                  </span>
                </div>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr>
                      <th
                        style={{
                          fontFamily: 'Inter',
                          fontSize: '11px',
                          fontWeight: 700,
                          color: '#94A3B8',
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px',
                          textAlign: 'left',
                          paddingBottom: '12px',
                          borderBottom: '1px solid #E2E8F0',
                        }}
                      >
                        Timestamp
                      </th>
                      <th
                        style={{
                          fontFamily: 'Inter',
                          fontSize: '11px',
                          fontWeight: 700,
                          color: '#94A3B8',
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px',
                          textAlign: 'left',
                          paddingBottom: '12px',
                          borderBottom: '1px solid #E2E8F0',
                        }}
                      >
                        Alert Type
                      </th>
                      <th
                        style={{
                          fontFamily: 'Inter',
                          fontSize: '11px',
                          fontWeight: 700,
                          color: '#94A3B8',
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px',
                          textAlign: 'left',
                          paddingBottom: '12px',
                          borderBottom: '1px solid #E2E8F0',
                        }}
                      >
                        Status
                      </th>
                      <th
                        style={{
                          fontFamily: 'Inter',
                          fontSize: '11px',
                          fontWeight: 700,
                          color: '#94A3B8',
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px',
                          textAlign: 'left',
                          paddingBottom: '12px',
                          borderBottom: '1px solid #E2E8F0',
                        }}
                      >
                        Delivery
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {activities.map((a) => (
                      <ActivityRow key={a.timestamp} activity={a} />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* RIGHT COLUMN */}
            <div style={{ width: '300px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Alert Configuration */}
              <div
                style={{
                  borderRadius: '16px',
                  background: '#FFF',
                  padding: '24px',
                  boxShadow: '0px 1px 2px 0px rgba(0,0,0,0.05)',
                }}
              >
                <div style={{ fontFamily: 'Inter', fontSize: '18px', fontWeight: 700, color: '#0F172A', marginBottom: '20px' }}>
                  Alert Configuration
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {/* Critical Delays */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontFamily: 'Inter', fontSize: '14px', fontWeight: 600, color: '#0F172A', marginBottom: '2px' }}>
                        Critical Delays
                      </div>
                      <div style={{ fontFamily: 'Inter', fontSize: '12px', color: '#64748B' }}>
                        Immediate priority overrides
                      </div>
                    </div>
                    <Toggle
                      on={alertConfig.criticalDelays}
                      onChange={(v) => setAlertConfig((prev) => ({ ...prev, criticalDelays: v }))}
                    />
                  </div>
                  {/* Fleet Safety */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontFamily: 'Inter', fontSize: '14px', fontWeight: 600, color: '#0F172A', marginBottom: '2px' }}>
                        Fleet Safety
                      </div>
                      <div style={{ fontFamily: 'Inter', fontSize: '12px', color: '#64748B' }}>
                        Vehicle diagnostics &amp; health
                      </div>
                    </div>
                    <Toggle
                      on={alertConfig.fleetSafety}
                      onChange={(v) => setAlertConfig((prev) => ({ ...prev, fleetSafety: v }))}
                    />
                  </div>
                  {/* Route Updates */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontFamily: 'Inter', fontSize: '14px', fontWeight: 600, color: '#0F172A', marginBottom: '2px' }}>
                        Route Updates
                      </div>
                      <div style={{ fontFamily: 'Inter', fontSize: '12px', color: '#64748B' }}>
                        Non-critical traffic changes
                      </div>
                    </div>
                    <Toggle
                      on={alertConfig.routeUpdates}
                      onChange={(v) => setAlertConfig((prev) => ({ ...prev, routeUpdates: v }))}
                    />
                  </div>
                </div>

                {/* Muted Channels */}
                <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '1px solid #F1F5F9' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <span style={{ fontFamily: 'Inter', fontSize: '11px', fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      Muted Channels
                    </span>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ cursor: 'pointer' }}>
                      <circle cx="7" cy="7" r="6" stroke="#94A3B8" strokeWidth="1.2" />
                      <path d="M7 4.5v3M7 9.5v.1" stroke="#94A3B8" strokeWidth="1.2" strokeLinecap="round" />
                    </svg>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <span
                      style={{
                        display: 'inline-block',
                        padding: '5px 12px',
                        borderRadius: '8px',
                        background: '#F1F5F9',
                        fontFamily: 'Inter',
                        fontSize: '12px',
                        fontWeight: 500,
                        color: '#64748B',
                      }}
                    >
                      Push Notifications
                    </span>
                    <span
                      style={{
                        display: 'inline-block',
                        padding: '5px 12px',
                        borderRadius: '8px',
                        background: '#F1F5F9',
                        fontFamily: 'Inter',
                        fontSize: '12px',
                        fontWeight: 500,
                        color: '#64748B',
                      }}
                    >
                      Slack Hook
                    </span>
                  </div>
                </div>
              </div>

              {/* Delivery Score */}
              <div
                style={{
                  borderRadius: '16px',
                  background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
                  padding: '24px',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                    <span style={{ fontFamily: 'Inter', fontSize: '14px', fontWeight: 600, color: 'rgba(255,255,255,0.85)' }}>
                      Delivery Score
                    </span>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M4 18l6-6 4 4 6-8" stroke="rgba(255,255,255,0.6)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div style={{ fontFamily: 'Inter', fontSize: '36px', fontWeight: 800, color: '#fff', lineHeight: 1, marginBottom: '20px' }}>
                    98.4%
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <span style={{ fontFamily: 'Inter', fontSize: '11px', fontWeight: 600, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      Monthly Goal
                    </span>
                    <span style={{ fontFamily: 'Inter', fontSize: '12px', fontWeight: 600, color: '#fff' }}>
                      99.0%
                    </span>
                  </div>
                  <div style={{ width: '100%', height: '6px', borderRadius: '3px', background: 'rgba(255,255,255,0.2)' }}>
                    <div style={{ width: '98.4%', height: '100%', borderRadius: '3px', background: '#fff' }} />
                  </div>
                </div>
              </div>

              {/* Auto-Rotation Active */}
              <div
                style={{
                  borderRadius: '16px',
                  background: '#FFF',
                  padding: '24px',
                  boxShadow: '0px 1px 2px 0px rgba(0,0,0,0.05)',
                  border: '1px dashed #CBD5E1',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M9 2l1.5 3 3.5.5-2.5 2.5.5 3.5L9 10l-3 1.5.5-3.5L4 5.5 7.5 5 9 2Z" stroke="#2563EB" strokeWidth="1.3" strokeLinejoin="round" />
                  </svg>
                  <span style={{ fontFamily: 'Inter', fontSize: '14px', fontWeight: 700, color: '#0F172A' }}>
                    Auto-Rotation Active
                  </span>
                </div>
                <p style={{ margin: 0, fontFamily: 'Inter', fontSize: '12px', color: '#64748B', lineHeight: '1.6' }}>
                  Members are automatically rotated through "Active Alert" status based on timezone and weekend availability.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
