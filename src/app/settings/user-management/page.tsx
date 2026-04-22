'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';

/* ── Types ────────────────────────────────────────────────────── */
type MemberRole = 'ADMIN' | 'DISPATCHER' | 'SUPPORT' | 'DRIVER';
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
  {
    id: '5', initials: 'MJ', initialsColor: '#059669', initBg: '#D1FAE5',
    name: 'Marcus Jensen', email: 'm.jensen@carryon.logistics',
    role: 'DRIVER', status: 'Active', lastActive: '35 mins ago',
  },
  {
    id: '6', initials: 'LP', initialsColor: '#2563EB', initBg: '#DBEAFE',
    name: 'Liam Parker', email: 'l.parker@carryon.logistics',
    role: 'ADMIN', status: 'Active', lastActive: '5 mins ago',
  },
];

const roleGroups = [
  { role: 'ADMIN' as MemberRole, label: 'Administrators', count: 2, color: '#2563EB', bg: '#EFF6FF', desc: 'Full platform access' },
  { role: 'DISPATCHER' as MemberRole, label: 'Dispatchers', count: 2, color: '#2563EB', bg: '#EFF6FF', desc: 'Route & order management' },
  { role: 'SUPPORT' as MemberRole, label: 'Support Agents', count: 1, color: '#2563EB', bg: '#EFF6FF', desc: 'Customer & driver help' },
  { role: 'DRIVER' as MemberRole, label: 'Drivers', count: 1, color: '#059669', bg: '#ECFDF5', desc: 'Fleet delivery operators' },
];

function roleStyle(role: MemberRole): { bg: string; color: string } {
  switch (role) {
    case 'ADMIN':      return { bg: '#DBEAFE', color: '#1D4ED8' };
    case 'DISPATCHER': return { bg: '#DBEAFE', color: '#1D4ED8' };
    case 'SUPPORT':    return { bg: '#FEF3C7', color: '#B45309' };
    case 'DRIVER':     return { bg: '#D1FAE5', color: '#047857' };
    default:           return { bg: '#F1F5F9', color: '#475569' };
  }
}

/* ── Page ────────────────────────────────────────────────────── */
export default function AdminRolesPage() {
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<MemberRole | 'ALL'>('ALL');

  const filtered = members.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter === 'ALL' || m.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div style={{ display: 'flex', width: '100vw', minHeight: '100vh', background: '#F7F9FB' }}>
      <Sidebar />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: '100vh', overflow: 'hidden' }}>
        <Navbar />

        <main style={{ flex: 1, padding: '28px 32px 40px', overflowY: 'auto' }}>
          {/* Title */}
          <h1 style={{ margin: '0 0 4px', fontFamily: 'Inter', fontSize: '26px', fontWeight: 700, color: '#0F172A' }}>
            Admin & Roles
          </h1>
          <p style={{ margin: '0 0 24px', fontFamily: 'Inter', fontSize: '13px', color: '#64748B' }}>
            Manage users, assign roles, and control platform access across your organization.
          </p>

          {/* Stats row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
            {[
              { label: 'TOTAL MEMBERS', value: '124', sub: '+12% from last month', subColor: '#16A34A' },
              { label: 'ACTIVE NOW', value: '42', sub: '34.2% engagement rate', subColor: '#2563EB' },
              { label: 'PENDING INVITES', value: '8', sub: 'Avg. response 24h', subColor: '#64748B' },
              { label: 'ROLES DEFINED', value: '4', sub: 'All permissions active', subColor: '#16A34A' },
            ].map((s) => (
              <div key={s.label} style={{
                background: '#fff', borderRadius: '12px', padding: '20px 22px',
                boxShadow: '0px 1px 2px 0px rgba(0,0,0,0.05)',
              }}>
                <div style={{
                  fontFamily: 'Inter', fontSize: '10px', fontWeight: 700,
                  color: '#94A3B8', letterSpacing: '1px', marginBottom: '10px',
                  textTransform: 'uppercase',
                }}>
                  {s.label}
                </div>
                <div style={{
                  fontFamily: 'Inter', fontSize: '28px', fontWeight: 700,
                  color: '#0F172A', lineHeight: '1', marginBottom: '6px',
                }}>
                  {s.value}
                </div>
                <div style={{ fontFamily: 'Inter', fontSize: '12px', color: s.subColor }}>
                  {s.sub}
                </div>
              </div>
            ))}
          </div>

          {/* Role cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
            {roleGroups.map((g) => (
              <div key={g.role} style={{
                background: g.bg, borderRadius: '12px', padding: '20px',
                border: '1px solid rgba(0,0,0,0.04)',
                cursor: 'pointer',
                transition: 'transform 0.15s',
              }}
              onClick={() => setRoleFilter(roleFilter === g.role ? 'ALL' : g.role)}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                  <span style={{
                    fontFamily: 'Inter', fontSize: '11px', fontWeight: 700,
                    color: g.color, letterSpacing: '0.5px', textTransform: 'uppercase',
                  }}>
                    {g.label}
                  </span>
                  <span style={{
                    fontFamily: 'Inter', fontSize: '20px', fontWeight: 800, color: g.color,
                  }}>
                    {g.count}
                  </span>
                </div>
                <div style={{ fontFamily: 'Inter', fontSize: '12px', color: '#64748B' }}>
                  {g.desc}
                </div>
              </div>
            ))}
          </div>

          {/* Toolbar */}
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            marginBottom: '16px', flexWrap: 'wrap', gap: '12px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
              {/* Search */}
              <div style={{
                position: 'relative', width: '280px',
              }}>
                <svg style={{
                  position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none',
                }} width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <circle cx="5.5" cy="5.5" r="4.5" stroke="#94A3B8" strokeWidth="1.3" />
                  <path d="M9.5 9.5l2.5 2.5" stroke="#94A3B8" strokeWidth="1.3" strokeLinecap="round" />
                </svg>
                <input
                  suppressHydrationWarning
                  type="text"
                  placeholder="Search users by name or email..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  style={{
                    width: '100%', height: '40px', paddingLeft: '34px', paddingRight: '12px',
                    border: '1px solid #E2E8F0', borderRadius: '8px',
                    background: '#fff', fontFamily: 'Inter', fontSize: '13px', color: '#0F172A', outline: 'none',
                  }}
                />
              </div>

              {/* Role filter pills */}
              <div style={{ display: 'flex', gap: '8px' }}>
                {(['ALL', 'ADMIN', 'DISPATCHER', 'SUPPORT', 'DRIVER'] as const).map((r) => (
                  <button
                    key={r}
                    suppressHydrationWarning
                    onClick={() => setRoleFilter(r)}
                    style={{
                      padding: '6px 14px', borderRadius: '999px', border: '1px solid #E2E8F0',
                      fontFamily: 'Inter', fontSize: '12px', fontWeight: roleFilter === r ? 700 : 500,
                      color: roleFilter === r ? '#fff' : '#64748B',
                      background: roleFilter === r ? '#2563EB' : '#fff',
                      cursor: 'pointer',
                    }}
                  >
                    {r === 'ALL' ? 'All Roles' : r}
                  </button>
                ))}
              </div>
            </div>

            <button suppressHydrationWarning style={{
              height: '40px', padding: '0 18px',
              display: 'flex', alignItems: 'center', gap: '8px',
              background: '#2563EB', border: 'none', borderRadius: '8px',
              fontFamily: 'Inter', fontSize: '13px', fontWeight: 700, color: '#fff',
              cursor: 'pointer',
            }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle cx="7" cy="5" r="3.5" stroke="white" strokeWidth="1.3" />
                <path d="M1 13c0-3.038 2.462-5.5 5.5-5.5" stroke="white" strokeWidth="1.3" strokeLinecap="round" />
                <path d="M11 9v4M9 11h4" stroke="white" strokeWidth="1.3" strokeLinecap="round" />
              </svg>
              Add New User
            </button>
          </div>

          {/* Members table */}
          <div style={{
            background: '#fff', borderRadius: '12px',
            boxShadow: '0px 1px 2px 0px rgba(0,0,0,0.05)',
            overflow: 'hidden', marginBottom: '24px',
          }}>
            {/* Headers */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '2.2fr 1fr 1fr 1fr 60px',
              padding: '14px 24px',
              background: '#F8FAFC',
              borderBottom: '1px solid #F1F5F9',
            }}>
              {['NAME', 'ROLE', 'STATUS', 'LAST ACTIVE', ''].map((h) => (
                <span key={h} style={{
                  fontFamily: 'Inter', fontSize: '10px', fontWeight: 700,
                  color: '#94A3B8', letterSpacing: '0.8px', textTransform: 'uppercase',
                }}>
                  {h}
                </span>
              ))}
            </div>

            {/* Rows */}
            {filtered.map((m, i) => {
              const { bg, color } = roleStyle(m.role);
              return (
                <div key={m.id} style={{
                  display: 'grid',
                  gridTemplateColumns: '2.2fr 1fr 1fr 1fr 60px',
                  padding: '14px 24px',
                  alignItems: 'center',
                  borderBottom: i < filtered.length - 1 ? '1px solid #F1F5F9' : 'none',
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
                      <div style={{ fontFamily: 'Inter', fontSize: '12px', color: '#64748B', marginTop: '1px' }}>{m.email}</div>
                    </div>
                  </div>

                  {/* Role */}
                  <span style={{
                    display: 'inline-flex', alignItems: 'center',
                    padding: '4px 10px', borderRadius: '6px',
                    background: bg, color,
                    fontFamily: 'Inter', fontSize: '10px', fontWeight: 700,
                    letterSpacing: '0.3px', textTransform: 'uppercase',
                    width: 'fit-content',
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

            {filtered.length === 0 && (
              <div style={{ padding: '40px 24px', textAlign: 'center' }}>
                <span style={{ fontFamily: 'Inter', fontSize: '14px', color: '#94A3B8' }}>
                  No users match your filters.
                </span>
              </div>
            )}

            {/* Pagination */}
            <div style={{
              padding: '14px 24px',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              borderTop: '1px solid #F1F5F9',
            }}>
              <span style={{ fontFamily: 'Inter', fontSize: '13px', color: '#64748B' }}>
                Showing <strong style={{ color: '#0F172A' }}>{filtered.length}</strong> of {members.length} members
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
            gap: '24px', flexWrap: 'wrap',
          }}>
            <div>
              <div style={{ fontFamily: 'Inter', fontSize: '16px', fontWeight: 700, color: '#fff', marginBottom: '6px' }}>
                Bulk Permission Update
              </div>
              <div style={{ fontFamily: 'Inter', fontSize: '13px', color: 'rgba(255,255,255,0.7)', lineHeight: '1.6', maxWidth: '520px' }}>
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
