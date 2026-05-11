'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';

export default function PaymentTaxPage() {
  const router = useRouter();
  const [businessName, setBusinessName] = useState('CarryOn Logistics Inc.');
  const [taxId, setTaxId] = useState('US-87-4392016');
  const [address, setAddress] = useState('1420 Harbor Blvd, Suite 300\nLong Beach, CA 90802\nUnited States');

  const cardBase: React.CSSProperties = {
    background: '#fff',
    borderRadius: '12px',
    border: '1px solid rgba(194,198,214,0.15)',
    boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
    padding: '24px',
  };

  const taxForms = [
    { name: 'W-9 Form', year: '2023', icon: '📄' },
    { name: 'VAT Registration Certificate', year: '', icon: '📋' },
    { name: 'Annual Tax Summary', year: '', icon: '📊' },
  ];

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
          <div style={{ marginBottom: '28px' }}>
            <h1 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '30px', color: '#191C1E', margin: 0 }}>Payment & Tax</h1>
            <p style={{ color: '#6B7280', fontSize: '14px', marginTop: '6px' }}>Manage payment methods, tax information, and download your tax documents.</p>
          </div>

          {/* Main grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
            {/* Left column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {/* Payment Methods */}
              <div style={{ ...cardBase, padding: 0, overflow: 'hidden' }}>
                <div style={{ padding: '20px 24px', borderBottom: '1px solid #F2F4F6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '17px', color: '#191C1E', margin: 0 }}>Payment Methods</h3>
                  <button style={{ background: '#2F80ED', color: '#fff', border: 'none', borderRadius: '8px', padding: '9px 16px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>
                    + Add New Method
                  </button>
                </div>

                {/* Visa 4242 DEFAULT */}
                <div style={{ padding: '18px 24px', borderBottom: '1px solid #F2F4F6', borderLeft: '4px solid #2F80ED', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <span style={{ color: '#1a1f71', fontWeight: 900, fontSize: '16px', letterSpacing: '-0.5px' }}>VISA</span>
                      <span style={{ background: 'rgba(47,128,237,0.12)', color: '#2F80ED', fontSize: '10px', fontWeight: 700, padding: '3px 8px', borderRadius: '20px', letterSpacing: '0.05em' }}>DEFAULT</span>
                    </div>
                    <div style={{ color: '#191C1E', fontSize: '14px', fontWeight: 600, letterSpacing: '1px', marginBottom: '2px' }}>•••• •••• •••• 4242</div>
                    <div style={{ color: '#9CA3AF', fontSize: '12px' }}>Expires 12/26 · Secondary Business Card</div>
                  </div>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#2F80ED', fontSize: '12px', fontWeight: 600, padding: 0 }}>Edit</button>
                    <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#EF4444', fontSize: '12px', fontWeight: 600, padding: 0 }}>Remove</button>
                  </div>
                </div>

                {/* Mastercard 8891 */}
                <div style={{ padding: '18px 24px', borderBottom: '1px solid #F2F4F6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <div style={{ display: 'flex', gap: '-4px' }}>
                        <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: '#EB001B', opacity: 0.9 }} />
                        <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: '#F79E1B', marginLeft: '-6px' }} />
                      </div>
                      <span style={{ color: '#424754', fontWeight: 700, fontSize: '13px' }}>Mastercard</span>
                    </div>
                    <div style={{ color: '#191C1E', fontSize: '14px', fontWeight: 600, letterSpacing: '1px', marginBottom: '2px' }}>•••• •••• •••• 8891</div>
                    <div style={{ color: '#9CA3AF', fontSize: '12px' }}>Expires 05/25 · Backup Method</div>
                  </div>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#2F80ED', fontSize: '12px', fontWeight: 600, padding: 0 }}>Set as Default</button>
                    <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#EF4444', fontSize: '12px', fontWeight: 600, padding: 0 }}>Remove</button>
                  </div>
                </div>

                {/* Chase 5520 */}
                <div style={{ padding: '18px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <div style={{ width: '28px', height: '28px', background: '#003087', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ color: '#fff', fontWeight: 900, fontSize: '11px' }}>C</span>
                      </div>
                      <span style={{ color: '#424754', fontWeight: 700, fontSize: '13px' }}>Chase Checking</span>
                    </div>
                    <div style={{ color: '#191C1E', fontSize: '14px', fontWeight: 600, letterSpacing: '1px', marginBottom: '2px' }}>•••• 5520</div>
                    <div style={{ color: '#9CA3AF', fontSize: '12px' }}>Verified Bank Account · ACH Enabled</div>
                  </div>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#2F80ED', fontSize: '12px', fontWeight: 600, padding: 0 }}>Set as Default</button>
                    <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#EF4444', fontSize: '12px', fontWeight: 600, padding: 0 }}>Remove</button>
                  </div>
                </div>
              </div>

              {/* Tax Information */}
              <div style={{ ...cardBase }}>
                <h3 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '17px', color: '#191C1E', margin: '0 0 20px 0' }}>Tax Information</h3>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                  <div>
                    <label style={{ display: 'block', color: '#6B7280', fontSize: '11px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '6px' }}>BUSINESS NAME</label>
                    <input
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      style={{ width: '100%', boxSizing: 'border-box', padding: '10px 12px', borderRadius: '8px', border: '1px solid #E5E7EB', fontSize: '13px', color: '#191C1E', outline: 'none', background: '#F9FAFB' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', color: '#6B7280', fontSize: '11px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '6px' }}>TAX ID / VAT NUMBER</label>
                    <input
                      value={taxId}
                      onChange={(e) => setTaxId(e.target.value)}
                      style={{ width: '100%', boxSizing: 'border-box', padding: '10px 12px', borderRadius: '8px', border: '1px solid #E5E7EB', fontSize: '13px', color: '#191C1E', outline: 'none', background: '#F9FAFB' }}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', color: '#6B7280', fontSize: '11px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '6px' }}>REGISTERED ADDRESS</label>
                  <textarea
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    rows={3}
                    style={{ width: '100%', boxSizing: 'border-box', padding: '10px 12px', borderRadius: '8px', border: '1px solid #E5E7EB', fontSize: '13px', color: '#191C1E', outline: 'none', background: '#F9FAFB', resize: 'vertical', fontFamily: 'Inter, sans-serif' }}
                  />
                </div>

                <button style={{ background: '#2F80ED', color: '#fff', border: 'none', borderRadius: '8px', padding: '12px 24px', fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}>
                  Update Tax Details
                </button>
              </div>
            </div>

            {/* Right column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Last Payment glassmorphism */}
              <div style={{
                background: 'linear-gradient(135deg, rgba(47,128,237,0.07) 0%, rgba(183,218,245,0.14) 100%)',
                borderRadius: '12px',
                border: '1px solid rgba(47,128,237,0.18)',
                boxShadow: '0 2px 12px rgba(47,128,237,0.08)',
                padding: '24px',
              }}>
                <div style={{ color: '#9CA3AF', fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '8px' }}>LAST PAYMENT</div>
                <div style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '32px', color: '#191C1E', marginBottom: '12px' }}>RM 12,450.00</div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '18px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#6B7280', fontSize: '12px' }}>Status</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#059669', fontSize: '12px', fontWeight: 700 }}>
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10B981', display: 'inline-block' }} />
                      SUCCESSFUL
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#6B7280', fontSize: '12px' }}>Date</span>
                    <span style={{ color: '#424754', fontSize: '12px', fontWeight: 500 }}>Oct 24, 2023</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#6B7280', fontSize: '12px' }}>Method</span>
                    <span style={{ color: '#424754', fontSize: '12px', fontWeight: 500 }}>Visa •••• 4242</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#6B7280', fontSize: '12px' }}>Auth Code</span>
                    <span style={{ color: '#424754', fontSize: '12px', fontWeight: 500, fontFamily: 'monospace' }}>AUTH-7X4K2</span>
                  </div>
                </div>

                <button style={{ width: '100%', background: '#2F80ED', color: '#fff', border: 'none', borderRadius: '8px', padding: '11px', fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}>
                  Download Invoice
                </button>
              </div>

              {/* Security Guarantee */}
              <div style={{ background: 'rgba(166,210,243,0.2)', borderRadius: '12px', border: '1px solid rgba(47,128,237,0.15)', padding: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                  <span style={{ fontSize: '22px' }}>🛡️</span>
                  <span style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '14px', color: '#191C1E' }}>Security Guarantee</span>
                </div>
                <p style={{ color: '#5A6270', fontSize: '12px', lineHeight: 1.55, margin: '0 0 10px 0' }}>
                  All payment data is encrypted using AES-256 and processed through PCI DSS Level 1 certified infrastructure. Your financial information is never stored on our servers.
                </p>
                <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#2F80ED', fontSize: '12px', fontWeight: 600, padding: 0 }}>
                  Learn more about security →
                </button>
              </div>

              {/* Download Tax Forms */}
              <div style={{ ...cardBase }}>
                <h3 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '15px', color: '#191C1E', margin: '0 0 16px 0' }}>Download Tax Forms</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {taxForms.map((form) => (
                    <div key={form.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 14px', background: '#F9FAFB', borderRadius: '8px', border: '1px solid #F2F4F6' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ fontSize: '18px' }}>{form.icon}</span>
                        <div>
                          <div style={{ color: '#191C1E', fontSize: '13px', fontWeight: 600 }}>{form.name}</div>
                          {form.year && <div style={{ color: '#9CA3AF', fontSize: '11px' }}>{form.year}</div>}
                        </div>
                      </div>
                      <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#2F80ED', fontSize: '18px', padding: '4px' }}>⬇</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
