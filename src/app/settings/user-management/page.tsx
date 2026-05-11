'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';

/* ─── Types ─────────────────────────────────────────────────────── */
type Tab = 'directory' | 'access' | 'audit' | 'security';

/* ─── Data ───────────────────────────────────────────────────────── */
const admins = [
  {
    id: 1,
    name: 'Marcus Thorne',
    created: 'Created Oct 12, 2023',
    email: 'm.thorne@carryon.io',
    role: 'SUPER ADMIN',
    roleBg: '#E0EBFF',
    roleColor: '#2563EB',
    health: 'Active',
    lastAuth: '2 mins ago',
    avatar: '/marcus-thorne.png',
  },
  {
    id: 2,
    name: 'Sarah Jenkins',
    created: 'Created Nov 05, 2023',
    email: 's.jenkins@carryon.io',
    role: 'MANAGER',
    roleBg: '#E0EBFF',
    roleColor: '#2563EB',
    health: 'Active',
    lastAuth: '1 hour ago',
    avatar: '/sarah-jenkins.png',
  },
];

const auditLogs = [
  {
    id: 1,
    time: '12:44:02 PM',
    admin: 'Marcus Thorne',
    adminColor: '#191C1E',
    module: 'ORDERS',
    moduleColor: '#2563EB',
    moduleBg: '#EFF6FF',
    detail: 'Cancelled order',
    detailLink: '#ORD-5524',
  },
  {
    id: 2,
    time: '09:15:44 AM',
    admin: 'Sarah Jenkins',
    adminColor: '#191C1E',
    module: 'PAYMENTS',
    moduleColor: '#7C3AED',
    moduleBg: '#F5F3FF',
    detail: 'Refunded',
    detailLink: 'RM 120.50 to #REF-2210',
  },
  {
    id: 3,
    time: 'Yesterday, 11:02 PM',
    admin: 'System Auth',
    adminColor: '#DC2626',
    module: 'SECURITY',
    moduleColor: '#DC2626',
    moduleBg: '#FEF2F2',
    detail: 'Blocked brute-force attempt',
    detailLink: '',
  },
];

const auditSummary = [
  { icon: '🛒', value: '142', label: 'Orders Adjusted', iconBg: '#EFF6FF' },
  { icon: '🛡', value: '8', label: 'Permissions Changed', iconBg: '#ECFDF5' },
  { icon: '🚨', value: '23', label: 'Security Threats', iconBg: '#FEF2F2' },
  { icon: '🔑', value: '5', label: 'Credentials Reset', iconBg: '#FFF7ED' },
];

/* ─── Avatar placeholder ─────────────────────────────────────────── */
function AdminAvatar({ name, size = 40 }: { name: string; size?: number }) {
  const initials = name.split(' ').map(w => w[0]).join('').slice(0, 2);
  const colors = ['#BFDBFE', '#DDD6FE', '#BBF7D0', '#FDE68A'];
  const idx = name.charCodeAt(0) % colors.length;
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: colors[idx],
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexShrink: 0, fontSize: size * 0.35, fontWeight: 700,
      color: '#374151', fontFamily: 'Inter',
    }}>
      {initials}
    </div>
  );
}

/* ─── Directory Tab ──────────────────────────────────────────────── */
function DirectoryTab() {
  return (
    <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #E2E8F0', overflow: 'hidden' }}>
      {/* Table header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px 16px' }}>
        <span style={{ fontFamily: 'Inter', fontSize: '16px', fontWeight: 700, color: '#191C1E' }}>
          Administrator Directory
        </span>
        <button suppressHydrationWarning style={{
          display: 'flex', alignItems: 'center', gap: '6px',
          padding: '7px 14px', border: '1px solid #E2E8F0', borderRadius: '8px',
          background: '#fff', fontFamily: 'Inter', fontSize: '13px', fontWeight: 600, color: '#374151',
          cursor: 'pointer',
        }}>
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <path d="M6.5 1v11M1 6.5h11" stroke="#374151" strokeWidth="1.3" strokeLinecap="round" />
          </svg>
          Export
        </button>
      </div>

      {/* Column headers */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '2fr 1.6fr 1.2fr 0.9fr 0.8fr 1.6fr',
        padding: '10px 24px',
        borderTop: '1px solid #F1F5F9',
        borderBottom: '1px solid #F1F5F9',
      }}>
        {['User Identity', 'Email Address', 'Access Level', 'Health', 'Last Auth', 'Administrative Actions'].map((h) => (
          <span key={h} style={{ fontFamily: 'Inter', fontSize: '13px', fontWeight: 700, color: '#191C1E' }}>
            {h}
          </span>
        ))}
      </div>

      {/* Rows */}
      {admins.map((a, i) => (
        <div key={a.id} style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1.6fr 1.2fr 0.9fr 0.8fr 1.6fr',
          padding: '20px 24px',
          alignItems: 'center',
          borderBottom: i < admins.length - 1 ? '1px solid #F1F5F9' : 'none',
        }}>
          {/* User Identity */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <AdminAvatar name={a.name} size={44} />
            <div>
              <div style={{ fontFamily: 'Inter', fontSize: '14px', fontWeight: 700, color: '#191C1E' }}>{a.name}</div>
              <div style={{ fontFamily: 'Inter', fontSize: '11px', color: '#94A3B8', marginTop: '2px' }}>{a.created}</div>
            </div>
          </div>

          {/* Email */}
          <span style={{ fontFamily: 'Inter', fontSize: '13px', color: '#374151' }}>{a.email}</span>

          {/* Access Level */}
          <span style={{
            display: 'inline-flex', padding: '4px 10px', borderRadius: '9999px',
            background: a.roleBg, color: a.roleColor,
            fontFamily: 'Inter', fontSize: '10px', fontWeight: 700,
            letterSpacing: '0.4px', textTransform: 'uppercase', width: 'fit-content',
          }}>
            {a.role}
          </span>

          {/* Health */}
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            padding: '4px 10px', borderRadius: '9999px',
            background: '#D1FAE5', color: '#065F46',
            fontFamily: 'Inter', fontSize: '12px', fontWeight: 600,
            width: 'fit-content',
          }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#10B981', flexShrink: 0, display: 'inline-block' }} />
            {a.health}
          </span>

          {/* Last Auth */}
          <span style={{ fontFamily: 'Inter', fontSize: '13px', color: '#374151' }}>{a.lastAuth}</span>

          {/* Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {[
              { icon: '✏', label: 'Edit' },
              { icon: '⊘', label: 'Disable' },
              { icon: '↺', label: 'Reset' },
            ].map(({ label }) => (
              <button key={label} suppressHydrationWarning style={{
                display: 'flex', alignItems: 'center', gap: '5px',
                background: 'none', border: 'none', cursor: 'pointer',
                fontFamily: 'Inter', fontSize: '13px', fontWeight: 600, color: '#374151',
                padding: 0,
              }}>
                {label === 'Edit' && (
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                    <path d="M9 2L11 4L4 11H2V9L9 2Z" stroke="#374151" strokeWidth="1.3" strokeLinejoin="round" />
                  </svg>
                )}
                {label === 'Disable' && (
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                    <circle cx="6.5" cy="6.5" r="5.5" stroke="#374151" strokeWidth="1.3" />
                    <path d="M2.5 6.5h8" stroke="#374151" strokeWidth="1.3" strokeLinecap="round" />
                  </svg>
                )}
                {label === 'Reset' && (
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                    <path d="M2 6.5A4.5 4.5 0 0 1 10.5 3.5L11 2" stroke="#374151" strokeWidth="1.3" strokeLinecap="round" />
                    <path d="M11 2l-1.5 2.5L7 3" stroke="#374151" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
                {label}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── Permission Checkbox ────────────────────────────────────────── */
function PermCheck({ label, sub, checked, onChange }: {
  label: string; sub: string; checked: boolean; onChange: () => void;
}) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
      <button
        suppressHydrationWarning
        onClick={onChange}
        style={{
          width: 20, height: 20, borderRadius: 4, flexShrink: 0, marginTop: 2,
          background: checked ? '#2563EB' : '#fff',
          border: checked ? 'none' : '1.5px solid #D1D5DB',
          display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
        }}
      >
        {checked && (
          <svg width="11" height="8" viewBox="0 0 11 8" fill="none">
            <path d="M1 4l3 3 6-6" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </button>
      <div>
        <div style={{ fontFamily: 'Inter', fontSize: '13px', fontWeight: 700, color: '#191C1E' }}>{label}</div>
        <div style={{ fontFamily: 'Inter', fontSize: '11px', color: '#64748B', marginTop: 1 }}>{sub}</div>
      </div>
    </div>
  );
}

/* ─── Access Levels Tab ─────────────────────────────────────────── */
function AccessLevelsTab() {
  const [perms, setPerms] = useState({
    viewOrders: true, modifyOrders: true, deleteRecords: false,
    gps: true, fleetAssign: true, kyc: false,
    ledger: true, refund: false, priceOverride: false,
  });
  const [roleId, setRoleId] = useState('');
  const [qp, setQp] = useState({ analytics: false, payout: false, sysConfig: false });
  const [twoFA, setTwoFA] = useState(true);

  function toggle(key: keyof typeof perms) {
    setPerms(p => ({ ...p, [key]: !p[key] }));
  }

  const permGroups = [
    {
      title: 'Orders Management',
      icon: (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <rect x="2" y="2" width="14" height="14" rx="2" stroke="#2563EB" strokeWidth="1.4" />
          <path d="M5 7h8M5 10h8M5 13h5" stroke="#2563EB" strokeWidth="1.3" strokeLinecap="round" />
        </svg>
      ),
      perms: [
        { key: 'viewOrders' as const, label: 'View Orders', sub: 'Access to global list' },
        { key: 'modifyOrders' as const, label: 'Modify Orders', sub: 'Update status/details' },
        { key: 'deleteRecords' as const, label: 'Delete Records', sub: 'Permanent removal' },
      ],
    },
    {
      title: 'Driver & Fleet Operations',
      icon: (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <rect x="1" y="6" width="11" height="8" rx="1.5" stroke="#2563EB" strokeWidth="1.3" />
          <path d="M12 9h3l2 3v2h-5V9z" stroke="#2563EB" strokeWidth="1.3" strokeLinejoin="round" />
          <circle cx="4.5" cy="14.5" r="1.5" stroke="#2563EB" strokeWidth="1.2" />
          <circle cx="13.5" cy="14.5" r="1.5" stroke="#2563EB" strokeWidth="1.2" />
        </svg>
      ),
      perms: [
        { key: 'gps' as const, label: 'Real-time GPS', sub: 'Track active drivers' },
        { key: 'fleetAssign' as const, label: 'Fleet Assignment', sub: 'Dispatch vehicles' },
        { key: 'kyc' as const, label: 'KYC Validation', sub: 'Approve licenses' },
      ],
    },
    {
      title: 'Payments & Refunds',
      icon: (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <rect x="1" y="4" width="16" height="11" rx="2" stroke="#2563EB" strokeWidth="1.3" />
          <path d="M1 8h16" stroke="#2563EB" strokeWidth="1.3" />
          <rect x="3" y="11" width="4" height="2" rx="1" fill="#2563EB" />
        </svg>
      ),
      perms: [
        { key: 'ledger' as const, label: 'Ledger Audit', sub: 'View transactions' },
        { key: 'refund' as const, label: 'Initiate Refund', sub: 'Requires 2FA' },
        { key: 'priceOverride' as const, label: 'Price Override', sub: 'Modify base tariffs' },
      ],
    },
  ];

  return (
    <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
      {/* Left: Precision Access Control */}
      <div style={{ flex: 1, background: '#fff', borderRadius: '12px', border: '1px solid #E2E8F0', padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '24px' }}>
          <div>
            <div style={{ fontFamily: 'Inter', fontSize: '18px', fontWeight: 800, color: '#191C1E' }}>Precision Access Control</div>
            <div style={{ fontFamily: 'Inter', fontSize: '13px', color: '#64748B', marginTop: 4 }}>
              Configuring permissions for: <span style={{ color: '#2563EB', fontWeight: 600 }}>Operations Manager</span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button suppressHydrationWarning style={{
              padding: '8px 18px', borderRadius: '8px', border: '1px solid #E2E8F0',
              background: '#fff', fontFamily: 'Inter', fontSize: '13px', fontWeight: 600, color: '#374151', cursor: 'pointer',
            }}>
              Discard
            </button>
            <button suppressHydrationWarning style={{
              padding: '8px 18px', borderRadius: '8px', border: 'none',
              background: '#2563EB', fontFamily: 'Inter', fontSize: '13px', fontWeight: 600, color: '#fff', cursor: 'pointer',
            }}>
              Commit Changes
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {permGroups.map((g) => (
            <div key={g.title} style={{ border: '1px solid #E2E8F0', borderRadius: '10px', padding: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
                {g.icon}
                <span style={{ fontFamily: 'Inter', fontSize: '15px', fontWeight: 700, color: '#191C1E' }}>{g.title}</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                {g.perms.map((p) => (
                  <PermCheck key={p.key} label={p.label} sub={p.sub} checked={perms[p.key]} onChange={() => toggle(p.key)} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right: New Role Blueprint */}
      <div style={{ width: '260px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{
          background: '#2563EB', borderRadius: '16px', padding: '20px',
          display: 'flex', flexDirection: 'column', gap: '16px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M9 2L3 5v4c0 3.31 2.57 6.41 6 7 3.43-.59 6-3.69 6-7V5L9 2Z" stroke="white" strokeWidth="1.4" strokeLinejoin="round" />
              <path d="M6.5 9l2 2 3-3" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span style={{ fontFamily: 'Inter', fontSize: '15px', fontWeight: 700, color: '#fff' }}>New Role Blueprint</span>
          </div>

          <div>
            <div style={{ fontFamily: 'Inter', fontSize: '10px', fontWeight: 700, color: 'rgba(255,255,255,0.7)', letterSpacing: '0.8px', textTransform: 'uppercase', marginBottom: 8 }}>
              ROLE IDENTIFIER
            </div>
            <input
              suppressHydrationWarning
              value={roleId}
              onChange={e => setRoleId(e.target.value)}
              placeholder="e.g. Regional Supervisor"
              style={{
                width: '100%', padding: '10px 12px', borderRadius: '8px',
                border: 'none', background: 'rgba(255,255,255,0.15)',
                fontFamily: 'Inter', fontSize: '13px', color: '#fff', outline: 'none',
                boxSizing: 'border-box',
              }}
            />
          </div>

          <div>
            <div style={{ fontFamily: 'Inter', fontSize: '10px', fontWeight: 700, color: 'rgba(255,255,255,0.7)', letterSpacing: '0.8px', textTransform: 'uppercase', marginBottom: 8 }}>
              QUICK PERMISSIONS
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                { key: 'analytics' as const, label: 'Global Analytics View', first: true },
                { key: 'payout' as const, label: 'Driver Payout Export', first: false },
                { key: 'sysConfig' as const, label: 'System Configuration', first: false },
              ].map(({ key, label, first }) => (
                <div key={key} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '10px 12px', borderRadius: '8px',
                  background: first ? 'rgba(255,255,255,0.22)' : 'rgba(255,255,255,0.1)',
                }}>
                  <span style={{ fontFamily: 'Inter', fontSize: '13px', color: first ? '#fff' : 'rgba(255,255,255,0.65)' }}>{label}</span>
                  <button
                    suppressHydrationWarning
                    onClick={() => setQp(p => ({ ...p, [key]: !p[key] }))}
                    style={{
                      width: 20, height: 20, borderRadius: 4, flexShrink: 0,
                      background: qp[key] ? '#fff' : (first ? '#fff' : 'rgba(255,255,255,0.2)'),
                      border: 'none', cursor: 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}
                  >
                    {qp[key] && (
                      <svg width="11" height="8" viewBox="0 0 11 8" fill="none">
                        <path d="M1 4l3 3 6-6" stroke="#2563EB" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>

          <button suppressHydrationWarning style={{
            width: '100%', padding: '12px', borderRadius: '8px',
            background: '#fff', border: 'none', cursor: 'pointer',
            fontFamily: 'Inter', fontSize: '12px', fontWeight: 800,
            color: '#2563EB', letterSpacing: '1px', textTransform: 'uppercase',
          }}>
            CREATE ACCESS ROLE
          </button>
        </div>

        {/* Hardened Security preview */}
        <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #E2E8F0', padding: '20px' }}>
          <div style={{ fontFamily: 'Inter', fontSize: '15px', fontWeight: 700, color: '#191C1E', marginBottom: 4 }}>Hardened Security</div>
          <div style={{ fontFamily: 'Inter', fontSize: '12px', color: '#64748B', marginBottom: 16 }}>Configure automated defense protocols.</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontFamily: 'Inter', fontSize: '13px', fontWeight: 600, color: '#191C1E' }}>2-Factor Authentication (2FA)</div>
              <div style={{ fontFamily: 'Inter', fontSize: '11px', color: '#64748B' }}>Mandatory for all administrative accounts</div>
            </div>
            <button
              suppressHydrationWarning
              onClick={() => setTwoFA(v => !v)}
              style={{
                width: 44, height: 24, borderRadius: 12, border: 'none', cursor: 'pointer',
                background: twoFA ? '#2563EB' : '#D1D5DB',
                position: 'relative', flexShrink: 0, transition: 'background 0.2s',
              }}
            >
              <span style={{
                position: 'absolute', top: 2, borderRadius: '50%',
                width: 20, height: 20, background: '#fff',
                left: twoFA ? 22 : 2, transition: 'left 0.2s',
                display: 'block',
              }} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Audit Vault Tab ────────────────────────────────────────────── */
function AuditVaultTab() {
  return (
    <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #E2E8F0', overflow: 'hidden' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px 16px' }}>
        <span style={{ fontFamily: 'Inter', fontSize: '16px', fontWeight: 700, color: '#191C1E' }}>
          Audit Vault: Comprehensive Logs
        </span>
        <span style={{
          padding: '4px 12px', borderRadius: '6px',
          background: '#F1F5F9', fontFamily: 'Inter', fontSize: '11px', fontWeight: 700,
          color: '#64748B', letterSpacing: '0.5px', textTransform: 'uppercase',
        }}>
          LIVE STREAM
        </span>
      </div>

      {/* Headers */}
      <div style={{
        display: 'grid', gridTemplateColumns: '1.2fr 1.4fr 1fr 1.4fr',
        padding: '10px 24px', borderTop: '1px solid #F1F5F9', borderBottom: '1px solid #F1F5F9',
      }}>
        {['TIMESTAMP', 'ADMINISTRATOR', 'MODULE', 'ACTION DETAILS'].map(h => (
          <span key={h} style={{ fontFamily: 'Inter', fontSize: '11px', fontWeight: 700, color: '#191C1E', letterSpacing: '0.5px' }}>{h}</span>
        ))}
      </div>

      {/* Rows */}
      {auditLogs.map((log, i) => (
        <div key={log.id} style={{
          display: 'grid', gridTemplateColumns: '1.2fr 1.4fr 1fr 1.4fr',
          padding: '18px 24px', alignItems: 'center',
          borderBottom: i < auditLogs.length - 1 ? '1px solid #F1F5F9' : 'none',
        }}>
          <span style={{ fontFamily: 'Inter', fontSize: '13px', color: '#374151' }}>{log.time}</span>
          <span style={{ fontFamily: 'Inter', fontSize: '13px', fontWeight: 700, color: log.adminColor }}>{log.admin}</span>
          <span style={{
            display: 'inline-flex', padding: '3px 10px', borderRadius: '6px', width: 'fit-content',
            background: log.moduleBg, color: log.moduleColor,
            fontFamily: 'Inter', fontSize: '11px', fontWeight: 700, letterSpacing: '0.3px',
          }}>
            {log.module}
          </span>
          <div style={{ fontFamily: 'Inter', fontSize: '13px', color: '#374151' }}>
            {log.detail}{' '}
            {log.detailLink && (
              <span style={{ color: '#2563EB', fontWeight: 600 }}>{log.detailLink}</span>
            )}
          </div>
        </div>
      ))}

      {/* Summary */}
      <div style={{ padding: '20px 24px', borderTop: '1px solid #F1F5F9' }}>
        <div style={{ fontFamily: 'Inter', fontSize: '10px', fontWeight: 700, color: '#94A3B8', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 12 }}>
          ACTION SUMMARY (LAST 24H)
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
          {auditSummary.map((s) => (
            <div key={s.label} style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              background: '#F8FAFC', borderRadius: '10px', padding: '12px 14px',
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: '8px', background: s.iconBg,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 16, flexShrink: 0,
              }}>
                {s.icon}
              </div>
              <div>
                <div style={{ fontFamily: 'Inter', fontSize: '15px', fontWeight: 800, color: '#191C1E' }}>{s.value}</div>
                <div style={{ fontFamily: 'Inter', fontSize: '11px', color: '#64748B' }}>{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Toggle row ─────────────────────────────────────────────────── */
function ToggleRow({ label, sub, on, onChange, action }: {
  label: string; sub: string; on?: boolean; onChange?: () => void; action?: { label: string };
}) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', padding: '16px 0', borderBottom: '1px solid #F1F5F9' }}>
      <div style={{ flex: 1, paddingRight: 16 }}>
        <div style={{ fontFamily: 'Inter', fontSize: '14px', fontWeight: 600, color: '#191C1E' }}>{label}</div>
        <div style={{ fontFamily: 'Inter', fontSize: '12px', color: '#64748B', marginTop: 2 }}>{sub}</div>
      </div>
      {action ? (
        <button suppressHydrationWarning style={{
          background: 'none', border: 'none', cursor: 'pointer',
          fontFamily: 'Inter', fontSize: '12px', fontWeight: 700, color: '#2563EB',
          letterSpacing: '0.5px', textTransform: 'uppercase',
        }}>
          {action.label}
        </button>
      ) : (
        <button
          suppressHydrationWarning
          onClick={onChange}
          style={{
            width: 44, height: 24, borderRadius: 12, border: 'none', cursor: 'pointer',
            background: on ? '#2563EB' : '#D1D5DB', position: 'relative', flexShrink: 0,
          }}
        >
          <span style={{
            position: 'absolute', top: 2, borderRadius: '50%',
            width: 20, height: 20, background: '#fff',
            left: on ? 22 : 2, transition: 'left 0.15s',
            display: 'block',
          }} />
        </button>
      )}
    </div>
  );
}

/* ─── Security Hub Tab ───────────────────────────────────────────── */
function SecurityHubTab() {
  const [s, setS] = useState({ twoFA: true, loginAlerts: true, suspicious: false });

  return (
    <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
      {/* Left: Security settings */}
      <div style={{ flex: 1, background: '#fff', borderRadius: '12px', border: '1px solid #E2E8F0', padding: '24px' }}>
        <div style={{ fontFamily: 'Inter', fontSize: '18px', fontWeight: 800, color: '#191C1E', marginBottom: 4 }}>Hardened Security</div>
        <div style={{ fontFamily: 'Inter', fontSize: '13px', color: '#64748B', marginBottom: 4 }}>Configure automated defense protocols.</div>

        <ToggleRow label="2-Factor Authentication (2FA)" sub="Mandatory for all administrative accounts" on={s.twoFA} onChange={() => setS(p => ({ ...p, twoFA: !p.twoFA }))} />
        <ToggleRow label="Real-time Login Alerts" sub="Push notifications for new device logins" on={s.loginAlerts} onChange={() => setS(p => ({ ...p, loginAlerts: !p.loginAlerts }))} />
        <ToggleRow label="Suspicious Activity Detection" sub="Auto-block IPs from abnormal geolocations" on={s.suspicious} onChange={() => setS(p => ({ ...p, suspicious: !p.suspicious }))} />
        <ToggleRow label="IP Restricted Access" sub="Whitelist 2 corporate HQ static IPs" action={{ label: 'MANAGE IPS' }} />

        {/* Compliance Notice */}
        <div style={{
          marginTop: 20, borderRadius: '10px', border: '1px solid #BFDBFE', background: '#EFF6FF',
          padding: '14px 16px', display: 'flex', gap: '10px', alignItems: 'flex-start',
        }}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ flexShrink: 0, marginTop: 1 }}>
            <circle cx="9" cy="9" r="7.5" stroke="#2563EB" strokeWidth="1.3" />
            <path d="M6.5 9l2 2 3-3" stroke="#2563EB" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span style={{ fontFamily: 'Inter', fontSize: '12px', color: '#1D4ED8', lineHeight: '1.6' }}>
            <strong>Compliance Notice:</strong> Your security posture is currently Tier 1. Periodic role audit is required in 12 days to maintain SOC2 compliance.
          </span>
        </div>
      </div>

      {/* Right: Quick Role Stats */}
      <div style={{ width: '260px', flexShrink: 0, background: '#fff', borderRadius: '12px', border: '1px solid #E2E8F0', padding: '24px' }}>
        <div style={{ fontFamily: 'Inter', fontSize: '15px', fontWeight: 700, color: '#191C1E', marginBottom: 16 }}>Quick Role Stats</div>
        {[
          { label: 'Super Admins', value: '02' },
          { label: 'Ops Managers', value: '08' },
          { label: 'Support Agents', value: '15' },
        ].map((r, i, arr) => (
          <div key={r.label} style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '12px 0',
            borderBottom: i < arr.length - 1 ? '1px solid #F1F5F9' : 'none',
          }}>
            <span style={{ fontFamily: 'Inter', fontSize: '14px', color: '#374151' }}>{r.label}</span>
            <span style={{ fontFamily: 'Inter', fontSize: '14px', fontWeight: 700, color: '#191C1E' }}>{r.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Page ───────────────────────────────────────────────────────── */
export default function UserManagementPage() {
  const [tab, setTab] = useState<Tab>('directory');

  const tabs: { id: Tab; label: string }[] = [
    { id: 'directory', label: 'Directory' },
    { id: 'access', label: 'Access Levels' },
    { id: 'audit', label: 'Audit Vault' },
    { id: 'security', label: 'Security Hub' },
  ];

  return (
    <div style={{ display: 'flex', width: '100vw', minHeight: '100vh', background: '#F7F9FB' }}>
      <Sidebar />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: '100vh', overflow: 'hidden' }}>
        <Navbar />

        <main style={{ flex: 1, padding: '28px 32px 40px', overflowY: 'auto' }}>

          {/* Page header */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '24px' }}>
            <div>
              <h1 style={{ margin: '0 0 4px', fontFamily: "'Manrope', Inter, sans-serif", fontSize: '28px', fontWeight: 800, color: '#191C1E' }}>
                Ultimate Admin Control
              </h1>
              <p style={{ margin: 0, fontFamily: 'Inter', fontSize: '13px', color: '#64748B' }}>
                Global governance dashboard for security, audit trails, and role-based access.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '10px', flexShrink: 0 }}>
              <button suppressHydrationWarning style={{
                display: 'flex', alignItems: 'center', gap: '7px',
                padding: '10px 18px', border: '1px solid #E2E8F0', borderRadius: '8px',
                background: '#fff', fontFamily: 'Inter', fontSize: '13px', fontWeight: 600, color: '#374151',
                cursor: 'pointer',
              }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <circle cx="7" cy="5" r="3.5" stroke="#374151" strokeWidth="1.3" />
                  <path d="M1 13c0-3.038 2.462-5.5 6-5.5" stroke="#374151" strokeWidth="1.3" strokeLinecap="round" />
                  <path d="M11 9v4M9 11h4" stroke="#374151" strokeWidth="1.3" strokeLinecap="round" />
                </svg>
                Add New Role
              </button>
              <button suppressHydrationWarning style={{
                display: 'flex', alignItems: 'center', gap: '7px',
                padding: '10px 18px', border: 'none', borderRadius: '8px',
                background: '#2563EB', fontFamily: 'Inter', fontSize: '13px', fontWeight: 700, color: '#fff',
                cursor: 'pointer',
              }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <circle cx="7" cy="5" r="3.5" stroke="white" strokeWidth="1.3" />
                  <path d="M1 13c0-3.038 2.462-5.5 6-5.5" stroke="white" strokeWidth="1.3" strokeLinecap="round" />
                  <path d="M11 9v4M9 11h4" stroke="white" strokeWidth="1.3" strokeLinecap="round" />
                </svg>
                NEW ADMIN
              </button>
            </div>
          </div>

          {/* Tab bar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '24px', flexWrap: 'wrap' }}>
            {/* Tabs */}
            <div style={{ display: 'flex', gap: '4px' }}>
              {tabs.map((t) => (
                <button
                  key={t.id}
                  suppressHydrationWarning
                  onClick={() => setTab(t.id)}
                  style={{
                    padding: '8px 18px', borderRadius: '8px', border: 'none', cursor: 'pointer',
                    fontFamily: 'Inter', fontSize: '13px', fontWeight: 600,
                    background: tab === t.id ? '#2563EB' : 'transparent',
                    color: tab === t.id ? '#fff' : '#64748B',
                  }}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* Spacer + filters (directory only) */}
            {tab === 'directory' && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: 'auto' }}>
                <div style={{ position: 'relative' }}>
                  <svg style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <circle cx="5.5" cy="5.5" r="4.5" stroke="#94A3B8" strokeWidth="1.3" />
                    <path d="M9.5 9.5l2.5 2.5" stroke="#94A3B8" strokeWidth="1.3" strokeLinecap="round" />
                  </svg>
                  <input
                    suppressHydrationWarning
                    type="text"
                    placeholder="Search by name, email or IP..."
                    style={{
                      width: '220px', height: '36px', paddingLeft: '30px', paddingRight: '10px',
                      border: '1px solid #E2E8F0', borderRadius: '8px',
                      background: '#fff', fontFamily: 'Inter', fontSize: '12px', color: '#374151', outline: 'none',
                    }}
                  />
                </div>
                {['All Roles', 'All Status'].map((f) => (
                  <button key={f} suppressHydrationWarning style={{
                    display: 'flex', alignItems: 'center', gap: '4px',
                    height: '36px', padding: '0 12px', borderRadius: '8px',
                    border: '1px solid #E2E8F0', background: '#fff',
                    fontFamily: 'Inter', fontSize: '12px', fontWeight: 600, color: '#374151', cursor: 'pointer',
                  }}>
                    {f}
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M2 4l3 3 3-3" stroke="#64748B" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Tab content */}
          {tab === 'directory' && <DirectoryTab />}
          {tab === 'access' && <AccessLevelsTab />}
          {tab === 'audit' && <AuditVaultTab />}
          {tab === 'security' && <SecurityHubTab />}

        </main>
      </div>
    </div>
  );
}
