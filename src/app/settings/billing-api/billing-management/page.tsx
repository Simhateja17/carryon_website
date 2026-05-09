'use client';

import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';

const invoiceRows = [
  { id: 'INV-2023-09-881', date: 'Sep 24, 2023', plan: 'Pro Enterprise', amount: '$950.00' },
  { id: 'INV-2023-08-442', date: 'Aug 24, 2023', plan: 'Pro Enterprise', amount: '$950.00' },
  { id: 'INV-2023-07-201', date: 'Jul 24, 2023', plan: 'Standard', amount: '$299.00' },
];

export default function BillingManagementPage() {
  const router = useRouter();

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F7F9FB', fontFamily: 'Inter' }}>
      <Sidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <main style={{ flex: 1, overflowY: 'auto', padding: '32px 48px', display: 'flex', flexDirection: 'column', gap: '32px' }}>

          {/* Back breadcrumb */}
          <button onClick={() => router.push('/settings/billing-api')} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', color: '#64748B', fontFamily: 'Inter', fontSize: '13px', fontWeight: 500, padding: 0, alignSelf: 'flex-start' }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 12L6 8l4-4" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Back to Billing &amp; API
          </button>

          {/* Page title */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <h1 style={{ margin: 0, fontFamily: 'Manrope, Inter, sans-serif', fontSize: '36px', fontWeight: 800, color: '#191C1E', letterSpacing: '-0.9px', lineHeight: '40px' }}>Billing Management</h1>
            <p style={{ margin: 0, fontFamily: 'Inter', fontSize: '16px', color: '#424754', fontWeight: 400 }}>Manage your enterprise subscription, payment methods, and historical ledger.</p>
          </div>

          {/* Row 1: Current Plan (8col) + Primary Payment (4col) */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '32px', alignItems: 'start' }}>

            {/* Current Active Plan */}
            <div style={{ background: 'rgba(166,210,243,0.2)', borderRadius: '12px', padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '32px', position: 'relative', overflow: 'hidden', minHeight: '240px' }}>
              <div style={{ position: 'absolute', width: '320px', height: '320px', borderRadius: '9999px', background: 'rgba(0,88,190,0.05)', filter: 'blur(32px)', top: '-80px', right: '-80px', pointerEvents: 'none' }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span style={{ fontFamily: 'Inter', fontSize: '16px', fontWeight: 700, color: '#2F80ED', letterSpacing: '0.8px', textTransform: 'uppercase' }}>Current Active Plan</span>
                <h2 style={{ margin: 0, fontFamily: 'Manrope, Inter, sans-serif', fontSize: '30px', fontWeight: 700, color: '#191C1E', lineHeight: '36px' }}>Pro Enterprise</h2>
                <p style={{ margin: 0, fontFamily: 'Inter', fontSize: '16px', color: '#424754', maxWidth: '448px' }}>Comprehensive fleet management with advanced route optimization and real-time telemetry analytics.</p>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                  <div style={{ fontFamily: 'Inter', fontSize: '14px', fontWeight: 500, color: '#424754', marginBottom: '4px' }}>Next Billing Cycle</div>
                  <div style={{ fontFamily: 'Manrope, Inter, sans-serif', fontSize: '24px', fontWeight: 700, color: '#191C1E' }}>October 24, 2023</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontFamily: 'Inter', fontSize: '14px', fontWeight: 500, color: '#424754', marginBottom: '4px' }}>Annual Allocation</div>
                  <div style={{ fontFamily: 'Manrope, Inter, sans-serif', fontSize: '24px', fontWeight: 700, color: '#2F80ED' }}>$12,450.00 <span style={{ fontFamily: 'Inter', fontSize: '14px', color: '#424754', fontWeight: 400 }}>/ yr</span></div>
                </div>
              </div>
            </div>

            {/* Primary Payment */}
            <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid rgba(194,198,214,0.15)', padding: '33px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ margin: 0, fontFamily: 'Manrope, Inter, sans-serif', fontSize: '18px', fontWeight: 700, color: '#191C1E' }}>Primary Payment</h3>
                <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Inter', fontSize: '14px', fontWeight: 600, color: '#2F80ED', padding: 0 }}>Update</button>
              </div>
              {/* Card mockup */}
              <div style={{ background: '#191C1E', borderRadius: '12px', padding: '24px', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: '32px' }}>
                <div style={{ position: 'absolute', width: '120px', height: '120px', borderRadius: '9999px', background: 'rgba(255,255,255,0.1)', top: '-30px', right: '-20px' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <svg width="25" height="20" viewBox="0 0 25 20" fill="none"><rect x="0.5" y="0.5" width="24" height="19" rx="3.5" stroke="rgba(255,255,255,0.4)"/><path d="M0.5 5h24" stroke="rgba(255,255,255,0.4)"/><rect x="2" y="8" width="5" height="3" rx="1" fill="rgba(255,255,255,0.4)"/></svg>
                  <span style={{ fontFamily: 'monospace', fontSize: '12px', color: 'white', letterSpacing: '1px' }}>VISA</span>
                </div>
                <div>
                  <div style={{ fontFamily: 'monospace', fontSize: '18px', color: 'white', letterSpacing: '1.8px', marginBottom: '4px' }}>•••• •••• ••••<br />8842</div>
                  <div style={{ fontFamily: 'Inter', fontSize: '12px', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>EXP: 12/26</div>
                </div>
              </div>
              <button style={{ background: '#B7DAF5', border: 'none', borderRadius: '8px', padding: '12px 24px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer', width: '100%' }}>
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><rect x="1" y="4" width="13" height="10" rx="2" stroke="#2F80ED" strokeWidth="1.4"/><path d="M4.5 4V3a3 3 0 0 1 6 0v1" stroke="#2F80ED" strokeWidth="1.4" strokeLinecap="round"/></svg>
                <span style={{ fontFamily: 'Inter', fontSize: '14px', fontWeight: 600, color: '#2F80ED' }}>Set up Bank Transfer</span>
              </button>
            </div>
          </div>

          {/* Upgrade or Adjust Plan */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <h2 style={{ margin: 0, fontFamily: 'Manrope, Inter, sans-serif', fontSize: '24px', fontWeight: 700, color: '#191C1E' }}>Upgrade or Adjust Plan</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>

              {/* Standard */}
              <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid rgba(194,198,214,0.15)', padding: '33px', display: 'flex', flexDirection: 'column', gap: '0' }}>
                <div style={{ marginBottom: '24px' }}>
                  <h4 style={{ margin: '0 0 4px', fontFamily: 'Inter', fontSize: '20px', fontWeight: 700, color: '#191C1E' }}>Standard</h4>
                  <p style={{ margin: 0, fontFamily: 'Inter', fontSize: '14px', color: '#424754' }}>Essential tools for small local fleets.</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', marginBottom: '32px' }}>
                  <span style={{ fontFamily: 'Manrope, Inter, sans-serif', fontSize: '30px', fontWeight: 700, color: '#191C1E' }}>$299</span>
                  <span style={{ fontFamily: 'Inter', fontSize: '16px', color: '#424754', marginBottom: '4px' }}>/ month</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '40px' }}>
                  {['Up to 15 vehicles', 'Basic route planning'].map(f => (
                    <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><circle cx="7.5" cy="7.5" r="7" stroke="#2F80ED" strokeWidth="1.2"/><path d="M4.5 7.5l2 2 4-4" stroke="#2F80ED" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      <span style={{ fontFamily: 'Inter', fontSize: '14px', color: '#191C1E' }}>{f}</span>
                    </div>
                  ))}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', opacity: 0.4 }}>
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><circle cx="7.5" cy="7.5" r="7" stroke="#424754" strokeWidth="1.2"/><path d="M5 7.5h5" stroke="#424754" strokeWidth="1.2" strokeLinecap="round"/></svg>
                    <span style={{ fontFamily: 'Inter', fontSize: '14px', color: '#191C1E' }}>Predictive maintenance</span>
                  </div>
                </div>
                <button style={{ border: '2px solid #A6D2F3', background: 'transparent', borderRadius: '8px', padding: '14px', fontFamily: 'Inter', fontSize: '14px', fontWeight: 700, color: '#191C1E', cursor: 'pointer', width: '100%' }}>Select Standard</button>
              </div>

              {/* Pro Enterprise (Current) */}
              <div style={{ background: '#fff', borderRadius: '12px', border: '2px solid #2F80ED', padding: '34px', display: 'flex', flexDirection: 'column', gap: '0', position: 'relative', boxShadow: '0 0 0 4px rgba(0,88,190,0.05)' }}>
                <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', background: '#2F80ED', borderRadius: '9999px', padding: '4px 16px' }}>
                  <span style={{ fontFamily: 'Inter', fontSize: '12px', fontWeight: 700, color: '#fff', letterSpacing: '1.2px', textTransform: 'uppercase' }}>Current Plan</span>
                </div>
                <div style={{ marginBottom: '24px' }}>
                  <h4 style={{ margin: '0 0 4px', fontFamily: 'Inter', fontSize: '20px', fontWeight: 700, color: '#191C1E' }}>Pro Enterprise</h4>
                  <p style={{ margin: 0, fontFamily: 'Inter', fontSize: '14px', color: '#424754' }}>Our most popular scale for growth.</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', marginBottom: '32px' }}>
                  <span style={{ fontFamily: 'Manrope, Inter, sans-serif', fontSize: '30px', fontWeight: 700, color: '#191C1E' }}>$950</span>
                  <span style={{ fontFamily: 'Inter', fontSize: '16px', color: '#424754', marginBottom: '4px' }}>/ month</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '40px' }}>
                  {['Unlimited vehicles', 'Advanced route optimization', 'Full telemetry API'].map(f => (
                    <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><circle cx="7.5" cy="7.5" r="7" stroke="#2F80ED" strokeWidth="1.2"/><path d="M4.5 7.5l2 2 4-4" stroke="#2F80ED" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      <span style={{ fontFamily: 'Inter', fontSize: '14px', color: '#191C1E' }}>{f}</span>
                    </div>
                  ))}
                </div>
                <button style={{ background: '#A6D2F3', border: 'none', borderRadius: '8px', padding: '12px', fontFamily: 'Inter', fontSize: '14px', fontWeight: 700, color: '#2F80ED', cursor: 'default', width: '100%' }}>Active</button>
              </div>

              {/* Global Logistics */}
              <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid rgba(194,198,214,0.15)', padding: '33px', display: 'flex', flexDirection: 'column', gap: '0' }}>
                <div style={{ marginBottom: '24px' }}>
                  <h4 style={{ margin: '0 0 4px', fontFamily: 'Inter', fontSize: '20px', fontWeight: 700, color: '#191C1E' }}>Global Logistics</h4>
                  <p style={{ margin: 0, fontFamily: 'Inter', fontSize: '14px', color: '#424754' }}>Custom solutions for massive networks.</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', marginBottom: '32px' }}>
                  <span style={{ fontFamily: 'Manrope, Inter, sans-serif', fontSize: '30px', fontWeight: 700, color: '#191C1E' }}>$2,400</span>
                  <span style={{ fontFamily: 'Inter', fontSize: '16px', color: '#424754', marginBottom: '4px' }}>/ month</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '40px' }}>
                  {['Multi-region support', 'Dedicated account manager', 'White-label client app'].map(f => (
                    <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><circle cx="7.5" cy="7.5" r="7" stroke="#2F80ED" strokeWidth="1.2"/><path d="M4.5 7.5l2 2 4-4" stroke="#2F80ED" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      <span style={{ fontFamily: 'Inter', fontSize: '14px', color: '#191C1E' }}>{f}</span>
                    </div>
                  ))}
                </div>
                <button style={{ background: '#2F80ED', border: 'none', borderRadius: '8px', padding: '12px', fontFamily: 'Inter', fontSize: '14px', fontWeight: 700, color: '#fff', cursor: 'pointer', width: '100%' }}>Upgrade to Global</button>
              </div>
            </div>
          </div>

          {/* Invoice rows (outside table) */}
          <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid rgba(194,198,214,0.15)', overflow: 'hidden' }}>
            {invoiceRows.map((row, i) => (
              <div key={row.id} style={{ display: 'flex', alignItems: 'center', padding: '24px', borderBottom: i < invoiceRows.length - 1 ? '1px solid #ECEEF0' : 'none', gap: '0' }}>
                <div style={{ width: '204px', fontFamily: 'Manrope, Inter, sans-serif', fontSize: '14px', fontWeight: 600, color: '#191C1E' }}>{row.id}</div>
                <div style={{ width: '205px', fontFamily: 'Inter', fontSize: '14px', color: '#424754' }}>{row.date}</div>
                <div style={{ width: '193px' }}>
                  <span style={{ background: '#A6D2F3', borderRadius: '9999px', padding: '3.5px 12px', fontFamily: 'Inter', fontSize: '12px', fontWeight: 700, color: row.plan === 'Standard' ? '#191C1E' : '#2F80ED' }}>{row.plan}</span>
                </div>
                <div style={{ width: '213px', fontFamily: 'Inter', fontSize: '14px', fontWeight: 700, color: '#191C1E' }}>{row.amount}</div>
                <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '8px', cursor: 'pointer', color: '#2F80ED' }}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 1v7M3 5l3 3 3-3M1 10h10" stroke="#2F80ED" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  <span style={{ fontFamily: 'Inter', fontSize: '14px', fontWeight: 600, color: '#2F80ED' }}>PDF</span>
                </div>
              </div>
            ))}
          </div>

          {/* Invoicing History full table */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ margin: 0, fontFamily: 'Manrope, Inter, sans-serif', fontSize: '24px', fontWeight: 700, color: '#191C1E' }}>Invoicing History</h2>
              <button style={{ background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: '#2F80ED', fontFamily: 'Inter', fontSize: '14px', fontWeight: 600, padding: 0 }}>
                <svg width="13" height="9" viewBox="0 0 13 9" fill="none"><path d="M1 1h11M3 4.5h7M5 8h3" stroke="#2F80ED" strokeWidth="1.3" strokeLinecap="round"/></svg>
                Filter by Year
              </button>
            </div>
            <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid rgba(194,198,214,0.15)', overflow: 'hidden' }}>
              <div style={{ background: '#F2F4F6', display: 'flex', alignItems: 'center', padding: '16px 24px', borderBottom: '1px solid rgba(194,198,214,0.1)' }}>
                {['Invoice ID', 'Billing Date', 'Plan Tier', 'Amount Paid', 'Action'].map((h, i) => (
                  <div key={h} style={{ flex: i === 4 ? '1' : '0 0 20%', textAlign: i === 4 ? 'right' : 'left', fontFamily: 'Inter', fontSize: '16px', fontWeight: 700, color: '#424754', textTransform: 'uppercase', letterSpacing: '0.8px' }}>{h}</div>
                ))}
              </div>
              <div style={{ background: '#F2F4F6', display: 'flex', justifyContent: 'center', padding: '16px 24px' }}>
                <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Inter', fontSize: '14px', fontWeight: 600, color: '#2F80ED' }}>View All 24 Records</button>
              </div>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}
