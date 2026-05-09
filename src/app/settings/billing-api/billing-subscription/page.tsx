'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';

export default function BillingSubscriptionPage() {
  const router = useRouter();
  const [toast, setToast] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setToast(false), 3000);
    return () => clearTimeout(t);
  }, []);

  const cardBase: React.CSSProperties = {
    background: '#fff',
    borderRadius: '12px',
    border: '1px solid rgba(194,198,214,0.15)',
    boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
    padding: '24px',
  };

  const invoices = [
    { id: 'INV-2024-082', date: 'Aug 24, 2024', plan: 'Pro Enterprise', amount: '$4,250.00', status: 'PAID' },
    { id: 'INV-2024-079', date: 'Jul 24, 2024', plan: 'Pro Enterprise', amount: '$4,250.00', status: 'PAID' },
    { id: 'INV-2024-071', date: 'Jun 24, 2024', plan: 'Pro Enterprise', amount: '$4,250.00', status: 'PAID' },
    { id: 'INV-2024-065', date: 'May 24, 2024', plan: 'Pro Enterprise', amount: '$4,250.00', status: 'PAID' },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F7F9FB', fontFamily: 'Inter, sans-serif' }}>
      <Sidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowX: 'hidden' }}>
        <Navbar />
        <main style={{ flex: 1, overflowY: 'auto', padding: '32px 48px', position: 'relative' }}>
          {/* Toast */}
          {toast && (
            <div style={{
              position: 'fixed', bottom: '32px', right: '32px', zIndex: 1000,
              background: '#2d3133', color: '#fff', borderRadius: '10px',
              padding: '14px 22px', display: 'flex', alignItems: 'center', gap: '12px',
              boxShadow: '0 4px 16px rgba(0,0,0,0.18)', fontSize: '14px',
            }}>
              <span style={{ fontSize: '18px' }}>✓</span>
              <div>
                <div style={{ fontWeight: 600, fontSize: '14px' }}>Information Synced</div>
                <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)', marginTop: '2px' }}>Your billing profile is up to date.</div>
              </div>
            </div>
          )}

          {/* Back breadcrumb */}
          <button
            onClick={() => router.push('/settings/billing-api')}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#2F80ED', fontSize: '14px', fontWeight: 500, padding: '0 0 8px 0', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}
          >
            ← Back to Billing & API
          </button>

          {/* Page header */}
          <div style={{ marginBottom: '28px' }}>
            <h1 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '30px', color: '#191C1E', margin: 0 }}>Billing & Subscription</h1>
            <p style={{ color: '#6B7280', fontSize: '14px', marginTop: '6px' }}>Manage your subscription plan, payment methods, and billing history.</p>
          </div>

          {/* Row 1: Plan Summary + Upcoming Invoice */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px', marginBottom: '24px' }}>
            {/* Plan Summary */}
            <div style={{ ...cardBase }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <span style={{ background: 'rgba(47,128,237,0.12)', color: '#2F80ED', fontSize: '11px', fontWeight: 700, letterSpacing: '0.06em', padding: '4px 10px', borderRadius: '20px' }}>ACTIVE PLAN</span>
              </div>
              <h2 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '26px', color: '#2F80ED', margin: '0 0 4px 0' }}>Enterprise Tier</h2>
              <div style={{ fontSize: '28px', fontWeight: 700, color: '#191C1E', margin: '8px 0 2px 0' }}>$4,250.00</div>
              <div style={{ color: '#6B7280', fontSize: '13px', marginBottom: '20px' }}>Billed Annually</div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '24px' }}>
                {[
                  { label: 'Fleet Size', value: 'Up to 500 units' },
                  { label: 'Support', value: '24/7 Dedicated' },
                  { label: 'Data Retention', value: 'Unlimited' },
                ].map((item) => (
                  <div key={item.label} style={{ background: '#F7F9FB', borderRadius: '10px', padding: '14px 16px', border: '1px solid rgba(194,198,214,0.2)' }}>
                    <div style={{ color: '#9CA3AF', fontSize: '11px', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: '6px' }}>{item.label}</div>
                    <div style={{ color: '#191C1E', fontSize: '13px', fontWeight: 600 }}>{item.value}</div>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <button style={{ flex: 1, background: '#2F80ED', color: '#fff', border: 'none', borderRadius: '8px', padding: '12px', fontSize: '13px', fontWeight: 700, cursor: 'pointer', letterSpacing: '0.04em' }}>
                  UPGRADE PLAN
                </button>
                <button style={{ flex: 1, background: '#fff', color: '#2F80ED', border: '1.5px solid #2F80ED', borderRadius: '8px', padding: '12px', fontSize: '13px', fontWeight: 700, cursor: 'pointer', letterSpacing: '0.04em' }}>
                  MANAGE ADD-ONS
                </button>
              </div>
            </div>

            {/* Upcoming Invoice — glassmorphism */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(47,128,237,0.08) 0%, rgba(183,218,245,0.15) 100%)',
              borderRadius: '12px',
              border: '1px solid rgba(47,128,237,0.18)',
              boxShadow: '0 2px 12px rgba(47,128,237,0.08)',
              padding: '24px',
              backdropFilter: 'blur(6px)',
            }}>
              <div style={{ color: '#6B7280', fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '16px' }}>UPCOMING INVOICE</div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '16px' }}>
                {[
                  { label: 'Base Subscription', amount: '$3,800' },
                  { label: 'Overage Surcharge', amount: '$420' },
                  { label: 'API Usage', amount: '$30' },
                ].map((item) => (
                  <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: '#424754', fontSize: '13px' }}>{item.label}</span>
                    <span style={{ color: '#191C1E', fontSize: '13px', fontWeight: 600 }}>{item.amount}</span>
                  </div>
                ))}
              </div>

              <div style={{ borderTop: '1px solid rgba(47,128,237,0.2)', paddingTop: '14px', marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#191C1E', fontSize: '14px', fontWeight: 700 }}>Estimated Total</span>
                  <span style={{ color: '#2F80ED', fontSize: '18px', fontWeight: 800 }}>$4,250</span>
                </div>
              </div>

              <div style={{ background: 'rgba(47,128,237,0.10)', borderRadius: '8px', padding: '12px', marginBottom: '16px', border: '1px solid rgba(47,128,237,0.15)' }}>
                <div style={{ color: '#2F80ED', fontSize: '11px', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase' }}>AUTOMATIC PAYMENT SCHEDULED</div>
                <div style={{ color: '#424754', fontSize: '12px', marginTop: '4px' }}>September 24, 2024</div>
              </div>

              <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#2F80ED', fontSize: '13px', fontWeight: 600, padding: 0 }}>
                VIEW USAGE DETAILS →
              </button>
            </div>
          </div>

          {/* Row 2: Payment Methods */}
          <div style={{ background: '#F2F4F6', borderRadius: '12px', padding: '24px', marginBottom: '24px', border: '1px solid rgba(194,198,214,0.2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '17px', color: '#191C1E', margin: 0 }}>Payment Methods</h3>
              <button style={{ background: '#2F80ED', color: '#fff', border: 'none', borderRadius: '8px', padding: '9px 18px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>
                + Add New Method
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              {/* Visa DEFAULT */}
              <div style={{ ...cardBase, borderLeft: '4px solid #2F80ED', padding: '18px 20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                  <div>
                    <span style={{ background: 'rgba(47,128,237,0.12)', color: '#2F80ED', fontSize: '10px', fontWeight: 700, letterSpacing: '0.06em', padding: '3px 8px', borderRadius: '20px' }}>DEFAULT</span>
                  </div>
                  <span style={{ fontSize: '20px', color: '#1a1f71', fontWeight: 900, letterSpacing: '-1px' }}>VISA</span>
                </div>
                <div style={{ color: '#191C1E', fontSize: '15px', fontWeight: 600, letterSpacing: '1px', marginBottom: '4px' }}>•••• •••• •••• 8421</div>
                <div style={{ color: '#6B7280', fontSize: '12px' }}>Expires 12/26 · Primary Business Card</div>
                <div style={{ display: 'flex', gap: '12px', marginTop: '14px' }}>
                  <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#2F80ED', fontSize: '12px', fontWeight: 600, padding: 0 }}>Edit</button>
                  <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#EF4444', fontSize: '12px', fontWeight: 600, padding: 0 }}>Remove</button>
                </div>
              </div>

              {/* Chase */}
              <div style={{ ...cardBase, padding: '18px 20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                  <div style={{ width: '36px', height: '36px', background: '#003087', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ color: '#fff', fontWeight: 900, fontSize: '13px' }}>C</span>
                  </div>
                  <span style={{ color: '#6B7280', fontSize: '12px', fontWeight: 600 }}>BANK TRANSFER</span>
                </div>
                <div style={{ color: '#191C1E', fontSize: '15px', fontWeight: 600, letterSpacing: '1px', marginBottom: '4px' }}>Chase Business Checking</div>
                <div style={{ color: '#6B7280', fontSize: '12px' }}>ACH Enabled · Verified Account</div>
                <div style={{ display: 'flex', gap: '12px', marginTop: '14px' }}>
                  <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#2F80ED', fontSize: '12px', fontWeight: 600, padding: 0 }}>Set as Default</button>
                  <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#EF4444', fontSize: '12px', fontWeight: 600, padding: 0 }}>Remove</button>
                </div>
              </div>
            </div>
          </div>

          {/* Row 3: Invoicing History */}
          <div style={{ ...cardBase, padding: 0, overflow: 'hidden' }}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid #F2F4F6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '17px', color: '#191C1E', margin: 0 }}>Invoicing History</h3>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button style={{ background: '#F2F4F6', color: '#424754', border: '1px solid #E5E7EB', borderRadius: '8px', padding: '8px 14px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>
                  Filter ▾
                </button>
                <button style={{ background: '#F2F4F6', color: '#424754', border: '1px solid #E5E7EB', borderRadius: '8px', padding: '8px 14px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>
                  Export All
                </button>
              </div>
            </div>

            {/* Table header */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr 1fr 0.8fr 1fr', gap: '0', background: '#F9FAFB', padding: '12px 24px', borderBottom: '1px solid #F2F4F6' }}>
              {['INVOICE ID', 'DATE', 'PLAN', 'AMOUNT', 'STATUS', 'ACTIONS'].map((h) => (
                <div key={h} style={{ color: '#9CA3AF', fontSize: '11px', fontWeight: 700, letterSpacing: '0.06em' }}>{h}</div>
              ))}
            </div>

            {invoices.map((inv, i) => (
              <div key={inv.id} style={{
                display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr 1fr 0.8fr 1fr',
                gap: '0', padding: '16px 24px', alignItems: 'center',
                borderBottom: i < invoices.length - 1 ? '1px solid #F2F4F6' : 'none',
                background: '#fff',
              }}>
                <div style={{ color: '#191C1E', fontSize: '14px', fontWeight: 600 }}>{inv.id}</div>
                <div style={{ color: '#6B7280', fontSize: '13px' }}>{inv.date}</div>
                <div style={{ color: '#424754', fontSize: '13px' }}>{inv.plan}</div>
                <div style={{ color: '#191C1E', fontSize: '14px', fontWeight: 600 }}>{inv.amount}</div>
                <div>
                  <span style={{ background: 'rgba(16,185,129,0.1)', color: '#059669', fontSize: '11px', fontWeight: 700, padding: '4px 10px', borderRadius: '20px', letterSpacing: '0.04em' }}>
                    {inv.status}
                  </span>
                </div>
                <div>
                  <button style={{ background: 'none', border: '1px solid #E5E7EB', borderRadius: '6px', padding: '6px 12px', fontSize: '12px', fontWeight: 600, color: '#424754', cursor: 'pointer' }}>
                    Download PDF
                  </button>
                </div>
              </div>
            ))}

            {/* Pagination */}
            <div style={{ padding: '16px 24px', borderTop: '1px solid #F2F4F6', display: 'flex', justifyContent: 'center', gap: '8px' }}>
              {[1, 2, 3].map((n) => (
                <button key={n} style={{
                  width: '34px', height: '34px', borderRadius: '8px',
                  border: n === 1 ? 'none' : '1px solid #E5E7EB',
                  background: n === 1 ? '#2F80ED' : '#fff',
                  color: n === 1 ? '#fff' : '#424754',
                  fontSize: '14px', fontWeight: 600, cursor: 'pointer',
                }}>
                  {n}
                </button>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
