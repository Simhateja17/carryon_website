'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';

const BAR_HEIGHTS = [28, 44, 36, 56, 40, 68, 60];

export default function ApiManagementPage() {
  const router = useRouter();
  const [keys, setKeys] = useState([
    { id: 1, label: 'Production Dispatcher', scope: 'FULL ACCESS', key: 'ck_live_••••••••••••x8y2', active: true, revoked: false },
    { id: 2, label: 'Customer Portal App', scope: 'ORDERS: READ', key: 'ck_live_••••••••••••9m1s', active: true, revoked: false },
    { id: 3, label: 'Legacy Analytics Integration', scope: 'REVOKED', key: 'ck_live_••••••••••••v5t4', active: false, revoked: true },
  ]);
  const [newLabel, setNewLabel] = useState('');
  const [fleet, setFleet] = useState('Read & Write');
  const [orders, setOrders] = useState('Read Only');
  const [customers, setCustomers] = useState('No Access');

  const cardBase: React.CSSProperties = {
    background: '#fff',
    borderRadius: '12px',
    border: '1px solid rgba(194,198,214,0.15)',
    boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
    padding: '24px',
  };

  const toggleKey = (id: number) => {
    setKeys((prev) => prev.map((k) => k.id === id && !k.revoked ? { ...k, active: !k.active } : k));
  };

  const deleteKey = (id: number) => {
    setKeys((prev) => prev.filter((k) => k.id !== id));
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F7F9FB', fontFamily: 'Inter, sans-serif' }}>
      <Sidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowX: 'hidden' }}>
        <Navbar />
        <main style={{ flex: 1, overflowY: 'auto', padding: '32px 48px' }}>
          {/* Back breadcrumb */}
          <button
            onClick={() => router.push('/settings/billing-api')}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#2F80ED', fontSize: '14px', fontWeight: 500, padding: '0 0 8px 0', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}
          >
            ← Back to Billing & API
          </button>

          {/* Page header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
            <div>
              <h1 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '30px', color: '#191C1E', margin: 0 }}>API Management</h1>
              <p style={{ color: '#6B7280', fontSize: '14px', marginTop: '6px' }}>Manage API keys, permissions, and monitor usage across your integrations.</p>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button style={{ background: '#F2F4F6', border: '1px solid #E5E7EB', borderRadius: '8px', padding: '10px 14px', fontSize: '18px', cursor: 'pointer', color: '#424754' }}>
                ↻
              </button>
              <button style={{ background: '#2F80ED', color: '#fff', border: 'none', borderRadius: '8px', padding: '10px 20px', fontSize: '13px', fontWeight: 700, cursor: 'pointer', letterSpacing: '0.02em' }}>
                + Generate New API Key
              </button>
            </div>
          </div>

          {/* Security recommendation banner */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(47,128,237,0.06) 0%, rgba(183,218,245,0.12) 100%)',
            border: '1px solid rgba(47,128,237,0.2)',
            borderRadius: '12px',
            padding: '18px 24px',
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '16px',
          }}>
            <div style={{ width: '40px', height: '40px', background: 'rgba(47,128,237,0.12)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '20px' }}>
              🛡️
            </div>
            <div>
              <div style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '15px', color: '#191C1E', marginBottom: '4px' }}>
                Security Recommendation: Key Rotation
              </div>
              <p style={{ color: '#6B7280', fontSize: '13px', margin: '0 0 8px 0', lineHeight: 1.5 }}>
                It's been over 90 days since your Production key was rotated. Regular rotation reduces the risk of unauthorized access and is recommended for all live integrations.
              </p>
              <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#2F80ED', fontSize: '13px', fontWeight: 600, padding: 0 }}>
                Learn more about rotation best practices →
              </button>
            </div>
          </div>

          {/* Main grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
            {/* Active API Keys */}
            <div style={{ ...cardBase, padding: 0, overflow: 'hidden' }}>
              <div style={{ padding: '20px 24px', borderBottom: '1px solid #F2F4F6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <h3 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '17px', color: '#191C1E', margin: 0 }}>Active API Keys</h3>
                  <span style={{ background: 'rgba(16,185,129,0.1)', color: '#059669', fontSize: '11px', fontWeight: 700, padding: '4px 10px', borderRadius: '20px' }}>
                    {keys.filter(k => k.active).length} Keys Active
                  </span>
                </div>
              </div>

              {keys.map((k, i) => (
                <div key={k.id} style={{
                  padding: '18px 24px', display: 'flex', alignItems: 'center', gap: '16px',
                  borderBottom: i < keys.length - 1 ? '1px solid #F2F4F6' : 'none',
                  opacity: k.revoked ? 0.55 : 1,
                }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <span style={{ color: '#191C1E', fontSize: '14px', fontWeight: 600, textDecoration: k.revoked ? 'line-through' : 'none' }}>{k.label}</span>
                      <span style={{
                        background: k.revoked ? 'rgba(239,68,68,0.1)' : k.scope === 'FULL ACCESS' ? 'rgba(47,128,237,0.1)' : 'rgba(245,158,11,0.1)',
                        color: k.revoked ? '#EF4444' : k.scope === 'FULL ACCESS' ? '#2F80ED' : '#D97706',
                        fontSize: '10px', fontWeight: 700, padding: '3px 8px', borderRadius: '12px', letterSpacing: '0.04em',
                      }}>
                        {k.scope}
                      </span>
                    </div>
                    <div style={{ color: '#9CA3AF', fontSize: '12px', fontFamily: 'monospace', letterSpacing: '0.5px' }}>{k.key}</div>
                  </div>

                  {/* Toggle */}
                  <button
                    onClick={() => toggleKey(k.id)}
                    disabled={k.revoked}
                    style={{
                      width: '44px', height: '24px', borderRadius: '12px', border: 'none', cursor: k.revoked ? 'not-allowed' : 'pointer',
                      background: k.active ? '#2F80ED' : '#D1D5DB', position: 'relative', transition: 'background 0.2s', flexShrink: 0,
                    }}
                  >
                    <span style={{
                      position: 'absolute', top: '3px', left: k.active ? '23px' : '3px',
                      width: '18px', height: '18px', borderRadius: '50%', background: '#fff',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.15)', transition: 'left 0.2s',
                    }} />
                  </button>

                  {/* Delete */}
                  <button
                    onClick={() => deleteKey(k.id)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9CA3AF', fontSize: '18px', padding: '4px', flexShrink: 0, borderRadius: '6px' }}
                  >
                    🗑
                  </button>
                </div>
              ))}
            </div>

            {/* Right column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Generate New Key form */}
              <div style={{
                ...cardBase,
                border: '2px solid #2F80ED',
                boxShadow: '0 4px 16px rgba(47,128,237,0.12)',
              }}>
                <h3 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '16px', color: '#191C1E', margin: '0 0 18px 0' }}>Generate New Key</h3>

                <div style={{ marginBottom: '14px' }}>
                  <label style={{ display: 'block', color: '#6B7280', fontSize: '11px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '6px' }}>KEY LABEL</label>
                  <input
                    value={newLabel}
                    onChange={(e) => setNewLabel(e.target.value)}
                    placeholder="e.g. Mobile App Integration"
                    style={{ width: '100%', boxSizing: 'border-box', padding: '10px 12px', borderRadius: '8px', border: '1px solid #E5E7EB', fontSize: '13px', color: '#191C1E', outline: 'none', background: '#F9FAFB' }}
                  />
                </div>

                <div style={{ marginBottom: '18px' }}>
                  <label style={{ display: 'block', color: '#6B7280', fontSize: '11px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '10px' }}>PERMISSION SCOPES</label>
                  {[
                    { label: 'Fleet', value: fleet, set: setFleet, options: ['Read & Write', 'Read Only', 'No Access'] },
                    { label: 'Orders', value: orders, set: setOrders, options: ['Read & Write', 'Read Only', 'No Access'] },
                    { label: 'Customers', value: customers, set: setCustomers, options: ['Read & Write', 'Read Only', 'No Access'] },
                  ].map((scope) => (
                    <div key={scope.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <span style={{ color: '#424754', fontSize: '13px' }}>{scope.label}</span>
                      <select
                        value={scope.value}
                        onChange={(e) => scope.set(e.target.value)}
                        style={{ padding: '6px 10px', borderRadius: '6px', border: '1px solid #E5E7EB', fontSize: '12px', color: '#424754', background: '#F9FAFB', cursor: 'pointer', outline: 'none' }}
                      >
                        {scope.options.map((opt) => <option key={opt}>{opt}</option>)}
                      </select>
                    </div>
                  ))}
                </div>

                <button style={{ width: '100%', background: '#2F80ED', color: '#fff', border: 'none', borderRadius: '8px', padding: '12px', fontSize: '13px', fontWeight: 700, cursor: 'pointer', marginBottom: '10px' }}>
                  Create Access Key
                </button>
                <p style={{ color: '#9CA3AF', fontSize: '11px', textAlign: 'center', margin: 0, lineHeight: 1.4 }}>
                  Keys are shown once. Store securely after creation.
                </p>
              </div>

              {/* API Usage mini card */}
              <div style={{ ...cardBase }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <h3 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '15px', color: '#191C1E', margin: 0 }}>API Usage (24h)</h3>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '18px', color: '#2F80ED' }}>42.8k</div>
                    <div style={{ color: '#9CA3AF', fontSize: '11px' }}>Requests</div>
                  </div>
                </div>

                {/* Bar chart */}
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '6px', height: '72px' }}>
                  {BAR_HEIGHTS.map((h, i) => (
                    <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                      <div style={{
                        height: `${h}px`,
                        borderRadius: '4px 4px 0 0',
                        background: i >= 5 ? '#2F80ED' : 'rgba(47,128,237,0.2)',
                        transition: 'background 0.2s',
                      }} />
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px' }}>
                  <span style={{ color: '#9CA3AF', fontSize: '10px' }}>6h ago</span>
                  <span style={{ color: '#9CA3AF', fontSize: '10px' }}>Now</span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
