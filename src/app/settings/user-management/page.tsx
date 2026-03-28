'use client';

import { useRouter } from 'next/navigation';

/* ── Types ────────────────────────────────────────────────────── */
type MemberRole   = 'ADMIN' | 'DISPATCHER' | 'SUPPORT';
type MemberStatus = 'Active' | 'Invited';

interface Member {
  id: string;
  initials: string;
  initialsColor: string;
  initBg: string;
  name: string;
  email: string;
  role: MemberRole;
  status: MemberStatus;
  lastActive: string;
}

/* ── Data ─────────────────────────────────────────────────────── */
const members: Member[] = [
  {
    id: '1', initials: 'EK', initialsColor: '#2563EB', initBg: '#DBEAFE',
    name: 'Erik Karlsson', email: 'erik.k@carryon.logistics',
    role: 'ADMIN', status: 'Active', lastActive: '2 mins ago',
  },
  {
    id: '2', initials: 'AM', initialsColor: '#2563EB', initBg: '#DBEAFE',
    name: 'Amara Miller', email: 'a.miller@carryon.logistics',
    role: 'DISPATCHER', status: 'Active', lastActive: '14 mins ago',
  },
  {
    id: '3', initials: 'JL', initialsColor: '#2563EB', initBg: '#DBEAFE',
    name: 'James Lowery', email: 'j.lowery@carryon.logistics',
    role: 'SUPPORT', status: 'Invited', lastActive: 'Pending',
  },
  {
    id: '4', initials: 'SC', initialsColor: '#2563EB', initBg: '#DBEAFE',
    name: 'Sarah Chen', email: 's.chen@carryon.logistics',
    role: 'DISPATCHER', status: 'Active', lastActive: '1 hour ago',
  },
];

function roleStyle(role: MemberRole): { bg: string; color: string } {
  if (role === 'ADMIN')      return { bg: '#DBEAFE', color: '#1D4ED8' };
  if (role === 'DISPATCHER') return { bg: '#DBEAFE', color: '#1D4ED8' };
  return { bg: '#DBEAFE', color: '#1D4ED8' };
}

/* ── Settings Left Sidebar ───────────────────────────────────── */
const settingsNav = [
  {
    label: 'Fleet Settings',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect x="0.5" y="3.5" width="9" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
        <path d="M9.5 5.5h3l2 3.5H9.5V5.5Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
        <circle cx="3.5" cy="12.5" r="1.3" fill="currentColor" />
        <circle cx="10.5" cy="12.5" r="1.3" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: 'Notifications',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M13 6.5A5 5 0 0 0 3 6.5c0 5-2 6.5-2 6.5h14s-2-1.5-2-6.5M9.2 14a1.5 1.5 0 0 1-2.4 0"
          stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: 'User Management',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="5.5" cy="4.5" r="2.5" stroke="currentColor" strokeWidth="1.3" />
        <path d="M1 13.5c0-2.485 2.015-4.5 4.5-4.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        <path d="M11 9.5v5M8.5 12h5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: 'Billing & API',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect x="0.75" y="2.75" width="14.5" height="10.5" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
        <path d="M0.75 6.5h14.5" stroke="currentColor" strokeWidth="1.3" />
      </svg>
    ),
  },
  {
    label: 'Appearance',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.3" />
        <circle cx="5.5" cy="6" r="1" fill="currentColor" />
        <circle cx="10.5" cy="6" r="1" fill="currentColor" />
        <path d="M5 10.5s1 2 3 2 3-2 3-2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    ),
  },
];

function SettingsSidebar() {
  const router = useRouter();
  return (
    <aside style={{
      width: '200px', flexShrink: 0,
      background: '#fff', borderRight: '1px solid #E2E8F0',
      display: 'flex', flexDirection: 'column',
      height: '100vh',
    }}>
      {/* Header */}
      <div style={{ padding: '20px 16px 18px', display: 'flex', alignItems: 'center', gap: '10px', borderBottom: '1px solid #F1F5F9' }}>
        <div style={{
          width: '36px', height: '36px', borderRadius: '8px', background: '#2563EB',
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>
          <svg width="20" height="16" viewBox="0 0 20 16" fill="none">
            <rect x="0.5" y="3" width="12" height="9" rx="1.5" stroke="white" strokeWidth="1.5" />
            <path d="M12.5 5.5h4l2.5 4H12.5V5.5Z" stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
            <circle cx="4" cy="13.5" r="1.5" fill="white" />
            <circle cx="13" cy="13.5" r="1.5" fill="white" />
          </svg>
        </div>
        <div>
          <div style={{ fontFamily: 'Inter', fontSize: '13px', fontWeight: 700, color: '#0F172A', lineHeight: '16px' }}>
            Command Center
          </div>
          <div style={{ fontFamily: 'Inter', fontSize: '9px', fontWeight: 600, color: '#94A3B8', letterSpacing: '0.6px' }}>
            LOGISTICS ADMIN
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '12px 10px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
        {settingsNav.map((item) => {
          const isActive = item.label === 'User Management';
          return (
            <button
              suppressHydrationWarning
              key={item.label}
              onClick={() => {
                if (item.label === 'Fleet Settings')  { router.push('/settings/fleet-settings'); return; }
                if (item.label === 'Appearance')      { router.push('/settings/appearance'); return; }
                if (item.label === 'Billing & API')    { router.push('/settings/billing-api'); return; }
                if (item.label === 'Notifications')    { router.push('/settings/notifications'); return; }
                if (item.label !== 'User Management')    router.push('/settings');
              }}
              style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                padding: '9px 10px', width: '100%', textAlign: 'left',
                background: isActive ? '#EFF6FF' : 'transparent',
                border: 'none',
                borderLeft: isActive ? '3px solid #2563EB' : '3px solid transparent',
                borderRadius: isActive ? '0 7px 7px 0' : '7px',
                cursor: 'pointer',
              }}
            >
              <span style={{ display: 'flex', color: isActive ? '#2563EB' : '#64748B', flexShrink: 0 }}>
                {item.icon}
              </span>
              <span style={{
                fontFamily: 'Inter', fontSize: '13px',
                fontWeight: isActive ? 600 : 400,
                color: isActive ? '#2563EB' : '#374151',
              }}>
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Bottom */}
      <div style={{ padding: '12px 10px 16px', borderTop: '1px solid #F1F5F9', display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <button suppressHydrationWarning style={{
          display: 'flex', alignItems: 'center', gap: '10px',
          padding: '8px 10px', width: '100%', background: 'transparent',
          border: 'none', borderRadius: '7px', cursor: 'pointer', textAlign: 'left',
        }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <rect x="1" y="2" width="14" height="12" rx="2" stroke="#64748B" strokeWidth="1.3" />
            <path d="M1 6h14" stroke="#64748B" strokeWidth="1.3" />
            <path d="M5 10h6M5 12h4" stroke="#64748B" strokeWidth="1.3" strokeLinecap="round" />
          </svg>
          <span style={{ fontFamily: 'Inter', fontSize: '13px', color: '#374151' }}>System Status</span>
        </button>
        <button suppressHydrationWarning style={{
          display: 'flex', alignItems: 'center', gap: '10px',
          padding: '8px 10px', width: '100%', background: 'transparent',
          border: 'none', borderRadius: '7px', cursor: 'pointer', textAlign: 'left',
        }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M6 14H3a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h3" stroke="#64748B" strokeWidth="1.3" strokeLinecap="round" />
            <path d="M11 11l3-3-3-3M14 8H6" stroke="#64748B" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span style={{ fontFamily: 'Inter', fontSize: '13px', color: '#374151' }}>Logout</span>
        </button>
        <button suppressHydrationWarning style={{
          width: '100%', height: '34px', marginTop: '6px',
          borderRadius: '7px', background: '#F1F5F9',
          border: '1px solid #E2E8F0', cursor: 'pointer',
          fontFamily: 'Inter', fontSize: '11px', fontWeight: 700,
          color: '#374151', letterSpacing: '0.5px',
        }}>
          SUPPORT PORTAL
        </button>
      </div>
    </aside>
  );
}

/* ── Stat Card ───────────────────────────────────────────────── */
function StatCard({ label, value, sub, subColor }: { label: string; value: string; sub: string; subColor?: string }) {
  return (
    <div style={{
      flex: 1, background: '#fff', borderRadius: '10px',
      border: '1px solid #E2E8F0', padding: '20px 22px',
    }}>
      <div style={{ fontFamily: 'Inter', fontSize: '10px', fontWeight: 700, color: '#2563EB', letterSpacing: '0.6px', textTransform: 'uppercase', marginBottom: '8px' }}>
        {label}
      </div>
      <div style={{ fontFamily: 'Inter', fontSize: '32px', fontWeight: 700, color: '#0F172A', lineHeight: '1', marginBottom: '6px' }}>
        {value}
      </div>
      <div style={{ fontFamily: 'Inter', fontSize: '12px', color: subColor ?? '#2563EB' }}>
        {sub}
      </div>
    </div>
  );
}

/* ── Page ────────────────────────────────────────────────────── */
export default function UserManagementPage() {
  return (
    <div style={{
      display: 'flex', width: '100vw', height: '100vh',
      background: '#F8FAFC', fontFamily: 'Inter, sans-serif', overflow: 'hidden',
    }}>
      <SettingsSidebar />

      {/* Main column */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

        {/* Top bar */}
        <header style={{
          height: '56px', flexShrink: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 28px',
          background: '#fff', borderBottom: '1px solid #F1F5F9',
          boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
        }}>
          {/* Breadcrumb */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontFamily: 'Inter', fontSize: '13px', color: '#64748B' }}>Platform Settings</span>
            <span style={{ color: '#CBD5E1' }}>/</span>
            <span style={{ fontFamily: 'Inter', fontSize: '13px', fontWeight: 600, color: '#2563EB' }}>User Management</span>
          </div>

          {/* Right icons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            {/* Search */}
            <div style={{ position: 'relative', marginRight: '8px' }}>
              <svg style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
                width="13" height="13" viewBox="0 0 13 13" fill="none">
                <circle cx="5.5" cy="5.5" r="4.5" stroke="#94A3B8" strokeWidth="1.3" />
                <path d="M9.5 9.5l2.5 2.5" stroke="#94A3B8" strokeWidth="1.3" strokeLinecap="round" />
              </svg>
              <input suppressHydrationWarning type="text" placeholder="Search team members..."
                style={{
                  width: '200px', height: '34px', paddingLeft: '30px', paddingRight: '10px',
                  border: '1px solid #E2E8F0', borderRadius: '8px',
                  background: '#F8FAFC', fontFamily: 'Inter', fontSize: '12px', color: '#94A3B8', outline: 'none',
                }} />
            </div>
            {/* Help */}
            <button suppressHydrationWarning style={{ width: '32px', height: '32px', background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="#64748B" strokeWidth="1.5" />
                <path d="M12 17v-2M12 9a2 2 0 1 1 0 4" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
            {/* Settings */}
            <button suppressHydrationWarning style={{ width: '32px', height: '32px', background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="3" stroke="#64748B" strokeWidth="1.5" />
                <path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
            {/* Avatar */}
            <div style={{
              width: '32px', height: '32px', borderRadius: '50%', background: '#FCD34D',
              display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
            }}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="7" r="4" fill="#92400E" />
                <path d="M2 18c0-4 3.582-7 8-7s8 3 8 7" fill="#92400E" />
              </svg>
            </div>
          </div>
        </header>

        {/* Scrollable content */}
        <main style={{ flex: 1, overflowY: 'auto', padding: '28px 32px', display: 'flex', flexDirection: 'column', gap: '24px' }}>

          {/* Page title + actions */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <h1 style={{ margin: 0, fontFamily: 'Inter', fontSize: '24px', fontWeight: 700, color: '#0F172A' }}>
                Team Directory
              </h1>
              <p style={{ margin: '6px 0 0', fontFamily: 'Inter', fontSize: '13px', color: '#64748B', lineHeight: '1.6', maxWidth: '480px' }}>
                Manage your organization&apos;s members, roles, and security permissions.<br />
                Administrators can invite new users and define access levels across the logistics platform.
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
              {/* Filter */}
              <button suppressHydrationWarning style={{
                height: '38px', padding: '0 16px',
                display: 'flex', alignItems: 'center', gap: '6px',
                background: '#fff', border: '1px solid #E2E8F0', borderRadius: '8px',
                fontFamily: 'Inter', fontSize: '13px', fontWeight: 600, color: '#374151', cursor: 'pointer',
              }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 3h12M3 7h8M5 11h4" stroke="#374151" strokeWidth="1.4" strokeLinecap="round" />
                </svg>
                Filter
              </button>
              {/* Add New User */}
              <button suppressHydrationWarning style={{
                height: '38px', padding: '0 16px',
                display: 'flex', alignItems: 'center', gap: '8px',
                background: '#2563EB', border: 'none', borderRadius: '8px',
                fontFamily: 'Inter', fontSize: '12px', fontWeight: 700, color: '#fff',
                cursor: 'pointer', letterSpacing: '0.3px',
              }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <circle cx="6" cy="5" r="3.5" stroke="white" strokeWidth="1.3" />
                  <path d="M0.5 13c0-3.038 2.462-5.5 5.5-5.5" stroke="white" strokeWidth="1.3" strokeLinecap="round" />
                  <path d="M10 9v4M8 11h4" stroke="white" strokeWidth="1.3" strokeLinecap="round" />
                </svg>
                ADD NEW USER
              </button>
            </div>
          </div>

          {/* Stat cards row */}
          <div style={{ display: 'flex', gap: '16px' }}>
            <StatCard label="Total Members" value="124" sub="↗ +12% from last month" subColor="#16A34A" />
            <StatCard label="Active Now"    value="42"  sub="● 34.2% engagement rate" subColor="#2563EB" />
            <StatCard label="Pending Invites" value="8" sub="⏱ Avg. response 24h" />
            <div style={{
              flex: 1, background: '#fff', borderRadius: '10px',
              border: '1px solid #E2E8F0', padding: '20px 22px',
            }}>
              <div style={{ fontFamily: 'Inter', fontSize: '10px', fontWeight: 700, color: '#2563EB', letterSpacing: '0.6px', textTransform: 'uppercase', marginBottom: '8px' }}>
                System Load
              </div>
              <div style={{ fontFamily: 'Inter', fontSize: '28px', fontWeight: 700, color: '#0F172A', lineHeight: '1', marginBottom: '6px' }}>
                Normal
              </div>
              <div style={{ fontFamily: 'Inter', fontSize: '12px', color: '#2563EB' }}>
                ✓ All services operational
              </div>
            </div>
          </div>

          {/* Members table */}
          <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #E2E8F0', overflow: 'hidden' }}>
            {/* Column headers */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '2fr 1fr 1fr 1fr 80px',
              padding: '12px 24px',
              background: '#F8FAFC',
              borderBottom: '1px solid #E2E8F0',
            }}>
              {['NAME', 'ROLE', 'STATUS', 'LAST ACTIVE', 'ACTIONS'].map((h) => (
                <span key={h} style={{ fontFamily: 'Inter', fontSize: '10px', fontWeight: 700, color: '#64748B', letterSpacing: '0.5px' }}>
                  {h}
                </span>
              ))}
            </div>

            {/* Rows */}
            {members.map((m, i) => {
              const { bg, color } = roleStyle(m.role);
              return (
                <div key={m.id} style={{
                  display: 'grid',
                  gridTemplateColumns: '2fr 1fr 1fr 1fr 80px',
                  padding: '16px 24px',
                  alignItems: 'center',
                  borderBottom: i < members.length - 1 ? '1px solid #F1F5F9' : 'none',
                }}>
                  {/* Name */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      width: '36px', height: '36px', borderRadius: '8px', background: m.initBg,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    }}>
                      <span style={{ fontFamily: 'Inter', fontSize: '12px', fontWeight: 700, color: m.initialsColor }}>{m.initials}</span>
                    </div>
                    <div>
                      <div style={{ fontFamily: 'Inter', fontSize: '14px', fontWeight: 600, color: '#0F172A' }}>{m.name}</div>
                      <div style={{ fontFamily: 'Inter', fontSize: '11px', color: '#2563EB', marginTop: '2px' }}>{m.email}</div>
                    </div>
                  </div>

                  {/* Role */}
                  <span style={{
                    display: 'inline-flex', alignItems: 'center',
                    padding: '4px 10px', borderRadius: '6px',
                    background: bg, color,
                    fontFamily: 'Inter', fontSize: '10px', fontWeight: 700,
                    letterSpacing: '0.3px',
                  }}>
                    {m.role}
                  </span>

                  {/* Status */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{
                      width: '7px', height: '7px', borderRadius: '50%',
                      background: m.status === 'Active' ? '#22C55E' : '#94A3B8',
                      display: 'inline-block', flexShrink: 0,
                    }} />
                    <span style={{
                      fontFamily: 'Inter', fontSize: '13px',
                      color: m.status === 'Active' ? '#16A34A' : '#94A3B8',
                    }}>
                      {m.status}
                    </span>
                  </div>

                  {/* Last Active */}
                  <span style={{ fontFamily: 'Inter', fontSize: '13px', color: '#374151' }}>{m.lastActive}</span>

                  {/* Actions */}
                  <button suppressHydrationWarning style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', padding: '4px',
                  }}>
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <circle cx="9" cy="4" r="1.3" fill="#94A3B8" />
                      <circle cx="9" cy="9" r="1.3" fill="#94A3B8" />
                      <circle cx="9" cy="14" r="1.3" fill="#94A3B8" />
                    </svg>
                  </button>
                </div>
              );
            })}

            {/* Pagination row */}
            <div style={{
              padding: '14px 24px',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              borderTop: '1px solid #F1F5F9',
            }}>
              <span style={{ fontFamily: 'Inter', fontSize: '13px', color: '#2563EB', fontWeight: 500 }}>
                Showing 1-4 of 124 members
              </span>
              <div style={{ display: 'flex', gap: '6px' }}>
                <button suppressHydrationWarning style={{
                  width: '32px', height: '32px', borderRadius: '7px',
                  background: '#fff', border: '1px solid #E2E8F0', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M7.5 9L4.5 6l3-3" stroke="#64748B" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <button suppressHydrationWarning style={{
                  width: '32px', height: '32px', borderRadius: '7px',
                  background: '#fff', border: '1px solid #E2E8F0', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M4.5 3L7.5 6l-3 3" stroke="#64748B" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Bulk Permission Update */}
          <div style={{
            borderRadius: '12px',
            background: '#1E293B',
            padding: '24px 28px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            gap: '24px',
          }}>
            <div>
              <div style={{ fontFamily: 'Inter', fontSize: '16px', fontWeight: 700, color: '#fff', marginBottom: '8px' }}>
                Bulk Permission Update
              </div>
              <div style={{ fontFamily: 'Inter', fontSize: '13px', color: 'rgba(255,255,255,0.7)', lineHeight: '1.6', maxWidth: '420px' }}>
                Need to adjust access for an entire department? Use the permissions editor to batch-update role capabilities across your team.
              </div>
            </div>
            <button suppressHydrationWarning style={{
              height: '40px', padding: '0 22px', flexShrink: 0,
              background: '#fff', border: 'none', borderRadius: '8px',
              fontFamily: 'Inter', fontSize: '13px', fontWeight: 600, color: '#0F172A',
              cursor: 'pointer',
            }}>
              Edit Permissions
            </button>
          </div>

        </main>
      </div>
    </div>
  );
}
