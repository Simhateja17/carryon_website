'use client';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';

const manrope = "'Manrope', sans-serif";
const inter = "'Inter', sans-serif";

// ── Shared Input ───────────────────────────────────────────────────────────────
function FormInput({ placeholder, type = 'text', area = false }: { placeholder: string; type?: string; area?: boolean }) {
  const baseStyle = {
    width: '100%',
    padding: '12px 14px',
    borderRadius: '8px',
    border: '1px solid #E2E8F0',
    background: '#FFFFFF',
    fontFamily: inter,
    fontSize: '13px',
    fontWeight: 500,
    color: '#0F172A',
    outline: 'none',
    boxSizing: 'border-box' as const,
    resize: 'none' as const,
  };
  if (area) {
    return <textarea suppressHydrationWarning placeholder={placeholder} rows={2} style={{ ...baseStyle, minHeight: '60px' }} />;
  }
  return <input suppressHydrationWarning type={type} placeholder={placeholder} style={baseStyle} />;
}

function FormSelect({ placeholder, options }: { placeholder: string; options: string[] }) {
  return (
    <div style={{ position: 'relative' }}>
      <select suppressHydrationWarning style={{
        width: '100%',
        padding: '12px 32px 12px 14px',
        borderRadius: '8px',
        border: '1px solid #E2E8F0',
        background: '#FFFFFF',
        fontFamily: inter,
        fontSize: '13px',
        fontWeight: 500,
        color: '#0F172A',
        outline: 'none',
        appearance: 'none',
        cursor: 'pointer',
        boxSizing: 'border-box' as const,
      }}>
        <option>{placeholder}</option>
        {options.map((o) => <option key={o}>{o}</option>)}
      </select>
      <svg width="10" height="6" viewBox="0 0 10 6" fill="none" style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
        <path d="M1 1l4 4 4-4" stroke="#94A3B8" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

// ── Toggle Switch ──────────────────────────────────────────────────────────────
function Toggle({ active }: { active?: boolean }) {
  return (
    <div style={{
      width: '36px',
      height: '20px',
      borderRadius: '9999px',
      background: active ? '#3B82F6' : '#CBD5E1',
      position: 'relative',
      cursor: 'pointer',
      transition: 'background 0.2s ease',
    }}>
      <div style={{
        width: '16px',
        height: '16px',
        borderRadius: '50%',
        background: '#FFFFFF',
        position: 'absolute',
        top: '2px',
        left: active ? '18px' : '2px',
        transition: 'left 0.2s ease',
        boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
      }} />
    </div>
  );
}

// ── Contact Entities ───────────────────────────────────────────────────────────
function ContactEntities() {
  return (
    <div style={{
      background: '#EFF6FF',
      borderRadius: '12px',
      padding: '24px',
      marginBottom: '16px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M9 1C6.239 1 4 3.239 4 6c0 4.5 5 11 5 11s5-6.5 5-11c0-2.761-2.239-5-5-5Z" stroke="#3B82F6" strokeWidth="1.5" />
          <circle cx="9" cy="6" r="2" fill="#3B82F6" />
        </svg>
        <span style={{ fontFamily: manrope, fontSize: '14px', fontWeight: 800, color: '#3B82F6' }}>Contact Entities</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {/* Origin */}
        <div>
          <div style={{
            fontFamily: inter,
            fontSize: '10px',
            fontWeight: 800,
            color: '#3B82F6',
            letterSpacing: '1px',
            textTransform: 'uppercase',
            marginBottom: '12px',
          }}>Origin (Sender)</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <FormInput placeholder="Sender Full Name" />
            <FormInput placeholder="Phone Number" type="tel" />
            <FormInput placeholder="Pickup Address (Line 1, Line 2, Zip, City)" area />
          </div>
        </div>

        {/* Destination */}
        <div>
          <div style={{
            fontFamily: inter,
            fontSize: '10px',
            fontWeight: 800,
            color: '#3B82F6',
            letterSpacing: '1px',
            textTransform: 'uppercase',
            marginBottom: '12px',
          }}>Destination (Recipient)</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <FormInput placeholder="Recipient Full Name" />
            <FormInput placeholder="Phone Number" type="tel" />
            <FormInput placeholder="Delivery Address (Line 1, Line 2, Zip, City)" area />
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Order Summary ──────────────────────────────────────────────────────────────
function OrderSummary() {
  return (
    <div style={{
      background: '#FFFFFF',
      borderRadius: '12px',
      padding: '24px',
      boxShadow: '0px 1px 2px rgba(0,0,0,0.05)',
      position: 'sticky',
      top: '20px',
    }}>
      <div style={{
        fontFamily: manrope,
        fontSize: '12px',
        fontWeight: 800,
        color: '#94A3B8',
        letterSpacing: '1.2px',
        textTransform: 'uppercase',
        marginBottom: '20px',
      }}>Order Summary</div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '20px' }}>
        {[
          { label: 'Base Fare', value: '$124.50', sign: '' },
          { label: 'Priority Surcharge', value: '$45.00', sign: '+' },
          { label: 'Insurance (1%)', value: '$18.20', sign: '+' },
          { label: 'Fuel Adjustment', value: '$4.15', sign: '+' },
        ].map((item) => (
          <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontFamily: inter, fontSize: '13px', fontWeight: 500, color: '#64748B' }}>{item.label}</span>
            <span style={{ fontFamily: inter, fontSize: '13px', fontWeight: 600, color: '#0F172A' }}>{item.sign}{item.value}</span>
          </div>
        ))}
      </div>

      <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: '16px', marginBottom: '20px' }}>
        <div style={{
          fontFamily: inter,
          fontSize: '10px',
          fontWeight: 800,
          color: '#94A3B8',
          letterSpacing: '1px',
          textTransform: 'uppercase',
          marginBottom: '4px',
        }}>Estimated Total</div>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
          <span style={{ fontFamily: manrope, fontSize: '32px', fontWeight: 800, color: '#0F172A' }}>$191.85</span>
          <span style={{
            background: '#DBEAFE',
            borderRadius: '4px',
            padding: '2px 8px',
            fontFamily: inter,
            fontSize: '10px',
            fontWeight: 700,
            color: '#3B82F6',
            letterSpacing: '0.5px',
            textTransform: 'uppercase',
          }}>USD</span>
        </div>
      </div>

      <button suppressHydrationWarning type="button" style={{
        width: '100%',
        padding: '14px',
        borderRadius: '10px',
        border: 'none',
        background: '#3B82F6',
        fontFamily: inter,
        fontSize: '13px',
        fontWeight: 700,
        color: '#FFFFFF',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        marginBottom: '10px',
        boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
      }}>
        Create Order
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M8 3l5 5-5 5" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </button>

      <button suppressHydrationWarning type="button" style={{
        width: '100%',
        padding: '14px',
        borderRadius: '10px',
        border: '1.5px solid #BFDBFE',
        background: '#BFDBFE',
        fontFamily: inter,
        fontSize: '13px',
        fontWeight: 700,
        color: '#3B82F6',
        cursor: 'pointer',
      }}>
        Save Draft
      </button>
    </div>
  );
}

// ── Cargo Specifications ───────────────────────────────────────────────────────
function CargoSpecifications() {
  return (
    <div style={{
      background: '#EFF6FF',
      borderRadius: '12px',
      padding: '24px',
      marginBottom: '16px',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <rect x="2" y="2" width="14" height="14" rx="2" stroke="#3B82F6" strokeWidth="1.4" />
            <path d="M2 6h14M6 2v4M12 2v4" stroke="#3B82F6" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
          <span style={{ fontFamily: manrope, fontSize: '14px', fontWeight: 800, color: '#3B82F6' }}>Cargo Specifications</span>
        </div>
        <span style={{
          background: '#DBEAFE',
          borderRadius: '6px',
          padding: '4px 10px',
          fontFamily: inter,
          fontSize: '10px',
          fontWeight: 700,
          color: '#3B82F6',
          letterSpacing: '0.5px',
          textTransform: 'uppercase',
        }}>Metric Units (cm/kg)</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1.5fr', gap: '12px', marginBottom: '12px' }}>
        <div>
          <label style={{ display: 'block', fontFamily: inter, fontSize: '11px', fontWeight: 700, color: '#94A3B8', letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: '6px' }}>Quantity</label>
          <FormInput placeholder="1" type="number" />
        </div>
        <div>
          <label style={{ display: 'block', fontFamily: inter, fontSize: '11px', fontWeight: 700, color: '#94A3B8', letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: '6px' }}>Total Weight</label>
          <div style={{ position: 'relative' }}>
            <FormInput placeholder="0.00" type="number" />
            <span style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', fontFamily: inter, fontSize: '12px', fontWeight: 600, color: '#94A3B8' }}>kg</span>
          </div>
        </div>
        <div>
          <label style={{ display: 'block', fontFamily: inter, fontSize: '11px', fontWeight: 700, color: '#94A3B8', letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: '6px' }}>Category</label>
          <FormSelect placeholder="Electronics & Hardware" options={['Fragile', 'Perishable', 'Oversized', 'Hazardous']} />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
        <div>
          <label style={{ display: 'block', fontFamily: inter, fontSize: '11px', fontWeight: 700, color: '#94A3B8', letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: '6px' }}>Length</label>
          <div style={{ position: 'relative' }}>
            <FormInput placeholder="0" type="number" />
            <span style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', fontFamily: inter, fontSize: '12px', fontWeight: 600, color: '#94A3B8' }}>cm</span>
          </div>
        </div>
        <div>
          <label style={{ display: 'block', fontFamily: inter, fontSize: '11px', fontWeight: 700, color: '#94A3B8', letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: '6px' }}>Width</label>
          <div style={{ position: 'relative' }}>
            <FormInput placeholder="0" type="number" />
            <span style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', fontFamily: inter, fontSize: '12px', fontWeight: 600, color: '#94A3B8' }}>cm</span>
          </div>
        </div>
        <div>
          <label style={{ display: 'block', fontFamily: inter, fontSize: '11px', fontWeight: 700, color: '#94A3B8', letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: '6px' }}>Height</label>
          <div style={{ position: 'relative' }}>
            <FormInput placeholder="0" type="number" />
            <span style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', fontFamily: inter, fontSize: '12px', fontWeight: 600, color: '#94A3B8' }}>cm</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Route Distance Card ────────────────────────────────────────────────────────
function RouteDistanceCard() {
  return (
    <div style={{
      background: 'linear-gradient(135deg, #0F766E 0%, #134E4A 50%, #115E59 100%)',
      borderRadius: '12px',
      padding: '24px',
      position: 'relative',
      overflow: 'hidden',
      minHeight: '160px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    }}>
      {/* Decorative dashed route line */}
      <svg width="100%" height="100%" viewBox="0 0 300 100" style={{ position: 'absolute', top: 0, left: 0, opacity: 0.15 }}>
        <path d="M20 80 C60 20, 120 20, 150 50 C180 80, 220 40, 280 30" stroke="#FFFFFF" strokeWidth="2" strokeDasharray="6 4" fill="none" />
        <circle cx="20" cy="80" r="6" fill="#FFFFFF" />
        <circle cx="280" cy="30" r="6" fill="#10B981" />
      </svg>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{
          fontFamily: inter,
          fontSize: '10px',
          fontWeight: 800,
          color: 'rgba(255,255,255,0.6)',
          letterSpacing: '1px',
          textTransform: 'uppercase',
          marginBottom: '4px',
        }}>ROUTE DISTANCE</div>
        <div style={{
          fontFamily: manrope,
          fontSize: '28px',
          fontWeight: 800,
          color: '#FFFFFF',
        }}>1,145 km</div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', position: 'relative', zIndex: 1 }}>
        <button suppressHydrationWarning type="button" style={{
          padding: '8px 14px',
          borderRadius: '8px',
          border: 'none',
          background: 'rgba(255,255,255,0.15)',
          backdropFilter: 'blur(8px)',
          fontFamily: inter,
          fontSize: '11px',
          fontWeight: 700,
          color: '#FFFFFF',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
        }}>
          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10B981' }} />
          Live Pricing
        </button>
      </div>
    </div>
  );
}

// ── Pickup / Delivery Cards ────────────────────────────────────────────────────
function PickupDeliveryCards() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
      {/* Pickup Window */}
      <div style={{
        background: '#EFF6FF',
        borderRadius: '12px',
        padding: '24px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <circle cx="9" cy="9" r="7" stroke="#3B82F6" strokeWidth="1.5" />
            <path d="M9 5v4l3 2" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span style={{ fontFamily: manrope, fontSize: '14px', fontWeight: 800, color: '#3B82F6' }}>Pickup Window</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <FormInput placeholder="mm/dd/yyyy" type="date" />
          <FormSelect placeholder="Morning (08:00 - 12:00)" options={['Afternoon (12:00 - 17:00)', 'Evening (17:00 - 21:00)']} />
        </div>
      </div>

      {/* Expected Delivery */}
      <div style={{
        background: '#EFF6FF',
        borderRadius: '12px',
        padding: '24px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <circle cx="9" cy="9" r="7" stroke="#3B82F6" strokeWidth="1.5" />
            <path d="M6 9l2 2 4-4" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span style={{ fontFamily: manrope, fontSize: '14px', fontWeight: 800, color: '#3B82F6' }}>Expected Delivery</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <FormInput placeholder="mm/dd/yyyy" type="date" />
          <div style={{
            background: '#DBEAFE',
            borderRadius: '8px',
            padding: '12px 14px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <circle cx="7" cy="7" r="6" stroke="#3B82F6" strokeWidth="1.2" />
              <path d="M7 4v3l2 1.5" stroke="#3B82F6" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span style={{ fontFamily: inter, fontSize: '12px', fontWeight: 500, color: '#3B82F6' }}>Standard Transit: 2-3 Business Days</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Service Level Agreement ────────────────────────────────────────────────────
function ServiceLevelAgreement() {
  const [selected, setSelected] = useState(0);
  const tiers = [
    {
      name: 'Same-Day Priority',
      price: '+$45.00',
      desc: 'Delivered within 6 hours of pickup. Direct courier dispatch.',
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M10 2L12 8H18L13 12L15 18L10 14L5 18L7 12L2 8H8L10 2Z" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      name: 'Express Transit',
      price: '+$12.00',
      desc: 'Next-day delivery guaranteed. Priority warehouse sorting.',
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <rect x="2" y="5" width="16" height="10" rx="2" stroke="#3B82F6" strokeWidth="1.5" />
          <path d="M6 10h8M10 7v6" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      name: 'Standard Ground',
      price: 'Included',
      desc: 'Economic 3-5 day transit. Reliable and cost-effective.',
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <circle cx="10" cy="10" r="7" stroke="#3B82F6" strokeWidth="1.5" />
          <path d="M10 6v4l3 2" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
  ];

  return (
    <div style={{
      background: '#EFF6FF',
      borderRadius: '12px',
      padding: '24px',
      marginBottom: '16px',
    }}>
      <div style={{
        fontFamily: manrope,
        fontSize: '14px',
        fontWeight: 800,
        color: '#3B82F6',
        marginBottom: '16px',
      }}>Service Level Agreement</div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
        {tiers.map((tier, i) => (
          <button
            key={i}
            suppressHydrationWarning
            type="button"
            onClick={() => setSelected(i)}
            style={{
              background: selected === i ? '#FFFFFF' : 'rgba(255,255,255,0.5)',
              border: selected === i ? '2px solid #3B82F6' : '2px solid transparent',
              borderRadius: '12px',
              padding: '16px',
              cursor: 'pointer',
              textAlign: 'left',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              transition: 'all 0.2s ease',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {tier.icon}
              <span style={{ fontFamily: inter, fontSize: '12px', fontWeight: 700, color: '#3B82F6' }}>{tier.price}</span>
            </div>
            <span style={{ fontFamily: manrope, fontSize: '14px', fontWeight: 800, color: '#0F172A' }}>{tier.name}</span>
            <span style={{ fontFamily: inter, fontSize: '11px', fontWeight: 500, color: '#64748B', lineHeight: '16px' }}>{tier.desc}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// ── Specialized Handling ───────────────────────────────────────────────────────
function SpecializedHandling() {
  return (
    <div style={{
      background: '#EFF6FF',
      borderRadius: '12px',
      padding: '24px',
      marginBottom: '16px',
    }}>
      <div style={{
        fontFamily: manrope,
        fontSize: '14px',
        fontWeight: 800,
        color: '#3B82F6',
        marginBottom: '16px',
      }}>Specialized Handling</div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '20px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {/* Handle with Care */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: '#FFFFFF',
            borderRadius: '10px',
            padding: '12px 14px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 2C4 2 2 5 2 7c0 3 3 7 6 7s6-4 6-7c0-2-2-5-6-5Z" stroke="#3B82F6" strokeWidth="1.3" />
                <path d="M6 6l2 2 2-2" stroke="#3B82F6" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span style={{ fontFamily: inter, fontSize: '13px', fontWeight: 600, color: '#0F172A' }}>Handle with Care</span>
            </div>
            <Toggle active />
          </div>

          {/* Full Insurance */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: '#FFFFFF',
            borderRadius: '10px',
            padding: '12px 14px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 1.5S3 3 3 7.5c0 2.5 1.5 5.5 5 6.5 3.5-1 5-4 5-6.5C13 3 8 1.5 8 1.5Z" stroke="#3B82F6" strokeWidth="1.3" strokeLinejoin="round" />
                <path d="M6 8l2 2 3-3" stroke="#3B82F6" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span style={{ fontFamily: inter, fontSize: '13px', fontWeight: 600, color: '#0F172A' }}>Full Insurance coverage</span>
            </div>
            <Toggle active />
          </div>
        </div>

        {/* Handling Instructions */}
        <div>
          <label style={{
            display: 'block',
            fontFamily: inter,
            fontSize: '11px',
            fontWeight: 700,
            color: '#94A3B8',
            letterSpacing: '0.5px',
            textTransform: 'uppercase',
            marginBottom: '6px',
          }}>Handling Instructions</label>
          <FormInput placeholder="e.g. Do not stack, keep upright, requires tail-lift vehicle..." area />
        </div>
      </div>
    </div>
  );
}

// ── Need Assistance ────────────────────────────────────────────────────────────
function NeedAssistance() {
  return (
    <div style={{
      background: '#FFFFFF',
      borderRadius: '12px',
      padding: '16px 20px',
      display: 'flex',
      alignItems: 'flex-start',
      gap: '12px',
      boxShadow: '0px 1px 2px rgba(0,0,0,0.05)',
      marginBottom: '16px',
    }}>
      <div style={{
        width: '36px',
        height: '36px',
        borderRadius: '8px',
        background: '#EFF6FF',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <circle cx="9" cy="9" r="7" stroke="#3B82F6" strokeWidth="1.4" />
          <path d="M9 12.5v.01M9 5.5v4" stroke="#3B82F6" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      </div>
      <div>
        <div style={{ fontFamily: inter, fontSize: '13px', fontWeight: 700, color: '#0F172A', marginBottom: '2px' }}>Need assistance?</div>
        <div style={{ fontFamily: inter, fontSize: '11px', fontWeight: 500, color: '#64748B' }}>Our dispatchers are online 24/7</div>
      </div>
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────────
export default function CreateOrderPage() {
  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: '#F6F8FA' }}>
      <Sidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minWidth: 0 }}>
        <Navbar />
        <main style={{ flex: 1, overflowY: 'auto', padding: '24px 24px', background: '#F6F8FA', boxSizing: 'border-box' }}>

          {/* Page Header */}
          <div style={{ marginBottom: '24px' }}>
            <h1 style={{
              fontFamily: manrope,
              fontSize: '28px',
              fontWeight: 800,
              color: '#0F172A',
              margin: 0,
              marginBottom: '6px',
            }}>New Logistics Order</h1>
            <p style={{
              fontFamily: inter,
              fontSize: '13px',
              fontWeight: 500,
              color: '#64748B',
              margin: 0,
              maxWidth: '500px',
              lineHeight: '20px',
            }}>Complete the details below to generate a new shipping manifest and dispatch a courier.</p>
          </div>

          {/* Main 2-column layout */}
          <div style={{ display: 'flex', gap: '24px' }}>
            {/* Left: Form */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <ContactEntities />
              <CargoSpecifications />

              <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '16px' }}>
                <div>
                  <PickupDeliveryCards />
                  <ServiceLevelAgreement />
                  <SpecializedHandling />
                </div>
                <div>
                  <RouteDistanceCard />
                  <NeedAssistance />
                </div>
              </div>
            </div>

            {/* Right: Order Summary */}
            <div style={{ width: '300px', flexShrink: 0 }}>
              <OrderSummary />
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}
