'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

/** Map texture from Figma MCP (`get_design_context` node 105:9466) — replace with a static asset if the URL expires. */
const MAP_PREVIEW = '/map-preview-route-assignment.png';

const manrope = "'Manrope', Inter, sans-serif";

function IconPersonPlus() {
  return (
    <img
      src="/register-personnel-icon.png"
      alt=""
      aria-hidden
      width={32}
      height={32}
      style={{ width: '32px', height: '32px', display: 'block' }}
    />
  );
}

function LockOverlay({ subtitle }: { subtitle?: string }) {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(25, 28, 30, 0.05)',
        backdropFilter: 'blur(1px)',
        borderRadius: '12px',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M7 11V8a5 5 0 0 1 10 0v3M6 11h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1Z"
            stroke="#191C1E"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
        {subtitle ? (
          <span
            style={{
              fontFamily: manrope,
              fontSize: '12px',
              fontWeight: 700,
              color: '#191C1E',
              lineHeight: '16px',
            }}
          >
            {subtitle}
          </span>
        ) : null}
      </div>
    </div>
  );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ paddingLeft: '4px' }}>
      <span
        style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '10px',
          fontWeight: 600,
          letterSpacing: '1px',
          textTransform: 'uppercase',
          color: '#191C1E',
          lineHeight: '15px',
        }}
      >
        {children}
      </span>
    </div>
  );
}

export default function DriverRegisterPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState('');
  const [ssn, setSsn] = useState('');
  const [address, setAddress] = useState('');

  const inputBase: React.CSSProperties = {
    width: '100%',
    boxSizing: 'border-box',
    border: 'none',
    outline: 'none',
    background: '#F8FAFC',
    borderRadius: '8px',
    padding: '13px 12px',
    fontFamily: 'Inter, sans-serif',
    fontSize: '14px',
    color: '#191C1E',
  };

  return (
    <main
      style={{
        flex: 1,
        minHeight: 0,
        overflowY: 'auto',
        background: '#F7F9FB',
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          maxWidth: '1152px',
          margin: '0 auto',
          padding: '40px',
          display: 'flex',
          flexDirection: 'column',
          gap: '40px',
        }}
      >
        {/* Header — Figma 105:9488–105:9498 */}
        <header style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <IconPersonPlus />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <h1
                style={{
                  margin: 0,
                  fontFamily: manrope,
                  fontSize: '36px',
                  fontWeight: 800,
                  letterSpacing: '-0.9px',
                  color: '#191C1E',
                  lineHeight: '40px',
                }}
              >
                Register New Personnel
              </h1>
              <p
                style={{
                  margin: 0,
                  maxWidth: '672px',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '16px',
                  fontWeight: 400,
                  color: '#424754',
                  lineHeight: '24px',
                }}
              >
                Complete the three-phase onboarding process to integrate a new driver into the FleetCommand
                ecosystem. Ensure all legal documentation is verified.
              </p>
            </div>
          </div>
        </header>

        {/* Stepper — Figma 105:9499 */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '24px',
            width: '100%',
          }}
        >
          {[
            { n: 1, label: 'Personal Info', active: true },
            { n: 2, label: 'Documentation', active: false },
            { n: 3, label: 'Vehicle Assignment', active: false },
          ].map((step) => (
            <div key={step.n} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div
                style={{
                  height: '6px',
                  borderRadius: '9999px',
                  background: step.active ? '#0058BE' : '#E6E8EA',
                  alignSelf: 'stretch',
                }}
              />
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  opacity: step.active ? 1 : 0.5,
                }}
              >
                <div
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '9999px',
                    background: step.active ? '#0058BE' : '#E0E3E5',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '10px',
                      fontWeight: 600,
                      color: step.active ? '#fff' : '#424754',
                      lineHeight: '15px',
                    }}
                  >
                    {step.n}
                  </span>
                </div>
                <span
                  style={{
                    fontFamily: manrope,
                    fontSize: '14px',
                    fontWeight: 700,
                    lineHeight: '20px',
                    color: step.active ? '#0058BE' : '#424754',
                  }}
                >
                  {step.label}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Main grid: form + right rail */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.65fr) minmax(280px, 1fr)',
            gap: '32px',
            alignItems: 'start',
          }}
        >
          {/* Left column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {/* 1. Personal Information — Figma 105:9523 */}
            <section
              style={{
                background: '#FFF',
                borderRadius: '12px',
                boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                padding: '32px',
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <h2
                  style={{
                    margin: 0,
                    fontFamily: manrope,
                    fontSize: '20px',
                    fontWeight: 700,
                    color: '#2F80ED',
                    lineHeight: '28px',
                  }}
                >
                  1. Personal Information
                </h2>
                <span
                  style={{
                    background: '#B7DAF5',
                    color: '#2F80ED',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '10px',
                    fontWeight: 600,
                    letterSpacing: '-0.5px',
                    textTransform: 'uppercase',
                    padding: '4px 12px',
                    borderRadius: '9999px',
                    lineHeight: '15px',
                  }}
                >
                  Current Phase
                </span>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '24px',
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <FieldLabel>Full Legal Name</FieldLabel>
                  <input
                    suppressHydrationWarning
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Jonathan D. Arbuckle"
                    style={inputBase}
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <FieldLabel>Contact Phone</FieldLabel>
                  <input
                    suppressHydrationWarning
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    style={inputBase}
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <FieldLabel>Date of Birth</FieldLabel>
                  <input
                    suppressHydrationWarning
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    placeholder="mm/dd/yyyy"
                    style={inputBase}
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <FieldLabel>Social Security / ID</FieldLabel>
                  <input
                    suppressHydrationWarning
                    value={ssn}
                    onChange={(e) => setSsn(e.target.value)}
                    placeholder="XXX-XX-XXXX"
                    style={inputBase}
                  />
                </div>
                <div style={{ gridColumn: '1 / -1', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <FieldLabel>Residential Address</FieldLabel>
                  <textarea
                    suppressHydrationWarning
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Street Address, City, State, ZIP Code"
                    rows={4}
                    style={{
                      ...inputBase,
                      resize: 'vertical',
                      minHeight: '107px',
                      paddingTop: '12px',
                    }}
                  />
                </div>
              </div>
            </section>

            {/* 2. Documentation locked — Figma 105:9574 */}
            <section
              style={{
                position: 'relative',
                background: '#F2F4F6',
                borderRadius: '12px',
                padding: '32px',
                opacity: 0.6,
                overflow: 'hidden',
              }}
            >
              <h2
                style={{
                  margin: '0 0 24px',
                  fontFamily: manrope,
                  fontSize: '20px',
                  fontWeight: 700,
                  color: '#191C1E',
                  lineHeight: '28px',
                }}
              >
                2. Documentation
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                <div style={{ height: '40px', borderRadius: '8px', background: '#E6E8EA' }} />
                <div style={{ height: '40px', borderRadius: '8px', background: '#E6E8EA' }} />
                <div
                  style={{
                    gridColumn: '1 / -1',
                    height: '128px',
                    borderRadius: '8px',
                    border: '2px dashed #C2C6D6',
                    background: '#E6E8EA',
                  }}
                />
              </div>
              <LockOverlay subtitle="Pending Completion of Step 1" />
            </section>

            {/* 3. Vehicle Assignment locked — Figma 105:9589 */}
            <section
              style={{
                position: 'relative',
                background: '#F2F4F6',
                borderRadius: '12px',
                padding: '32px',
                opacity: 0.6,
                overflow: 'hidden',
              }}
            >
              <h2
                style={{
                  margin: '0 0 24px',
                  fontFamily: manrope,
                  fontSize: '20px',
                  fontWeight: 700,
                  color: '#191C1E',
                  lineHeight: '28px',
                }}
              >
                3. Vehicle Assignment
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                <div style={{ height: '40px', borderRadius: '8px', background: '#A6D2F3' }} />
                <div style={{ height: '40px', borderRadius: '8px', background: '#A6D2F3' }} />
              </div>
              <LockOverlay />
            </section>

            {/* Actions — Figma 105:9598 */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '16px', paddingTop: '8px' }}>
              <button
                suppressHydrationWarning
                type="button"
                onClick={() => router.push('/drivers')}
                style={{
                  background: '#B7DAF5',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '12px 32px',
                  cursor: 'pointer',
                  fontFamily: manrope,
                  fontSize: '12px',
                  fontWeight: 700,
                  letterSpacing: '1.2px',
                  textTransform: 'uppercase',
                  color: '#2F80ED',
                  lineHeight: '16px',
                }}
              >
                Discard Draft
              </button>
              <button
                suppressHydrationWarning
                type="button"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: '#2F80ED',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '12px 40px',
                  cursor: 'pointer',
                  fontFamily: manrope,
                  fontSize: '12px',
                  fontWeight: 700,
                  letterSpacing: '1.2px',
                  textTransform: 'uppercase',
                  color: '#fff',
                  lineHeight: '16px',
                  boxShadow: '0 10px 15px -3px rgba(0, 88, 190, 0.2), 0 4px 6px -4px rgba(0, 88, 190, 0.2)',
                }}
              >
                Proceed to Documentation
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
                  <path d="M1 5h6M5 1l4 4-4 4" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>

          {/* Right column — Figma 105:9607 */}
          <aside style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div
              style={{
                background: '#FFF',
                borderRadius: '12px',
                boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                padding: '22px 24px 20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '18px',
              }}
            >
              <div style={{ textAlign: 'center' }}>
                <div
                  style={{
                    width: '84px',
                    height: '84px',
                    margin: '0 auto 10px',
                    borderRadius: '9999px',
                    background: '#DADDE1',
                    border: '2px solid #ECEEF0',
                    boxShadow: '0 2px 0 rgba(255,255,255,0.85) inset, 0 1px 2px rgba(0,0,0,0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <svg width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden>
                    <path
                      d="M10.4 11.2h2.2l1-1.8h2.8l1 1.8h2.2c1 0 1.8.8 1.8 1.8v7.2c0 1-.8 1.8-1.8 1.8H10.4c-1 0-1.8-.8-1.8-1.8V13c0-1 .8-1.8 1.8-1.8Z"
                      stroke="#6B7280"
                      strokeWidth="1.8"
                      strokeLinejoin="round"
                    />
                    <circle cx="15" cy="16.6" r="3" stroke="#6B7280" strokeWidth="1.8" />
                    <path d="M21.8 7.8v4.4M19.6 10h4.4" stroke="#6B7280" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                </div>
                <div style={{ fontFamily: manrope, fontSize: '18px', fontWeight: 700, color: '#191C1E', lineHeight: '28px' }}>
                  Unsaved Profile
                </div>
                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#5A6270', lineHeight: '16px', marginTop: '2px' }}>
                  Draft registration in progress
                </div>
              </div>
              <div style={{ borderTop: '1px solid #ECEEF0', paddingTop: '14px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '11px',
                      fontWeight: 700,
                      letterSpacing: '1.1px',
                      textTransform: 'uppercase',
                      color: '#4B5563',
                    }}
                  >
                    Verification Status
                  </span>
                  <span
                    style={{
                      background: '#A7D3F6',
                      color: '#2F80ED',
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '10px',
                      fontWeight: 700,
                      letterSpacing: '0.2px',
                      textTransform: 'uppercase',
                      padding: '2px 9px',
                      borderRadius: '4px',
                      lineHeight: '15px',
                    }}
                  >
                    Drafting
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '11px',
                      fontWeight: 700,
                      letterSpacing: '1.1px',
                      textTransform: 'uppercase',
                      color: '#4B5563',
                    }}
                  >
                    Background Check
                  </span>
                  <span
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '12px',
                      fontWeight: 700,
                      color: '#191C1E',
                    }}
                  >
                    Not Initiated
                  </span>
                </div>
              </div>
            </div>

            {/* Compliance — Figma 105:9628 */}
            <div
              style={{
                position: 'relative',
                background: '#3B82E0',
                borderRadius: '20px',
                padding: '34px 34px 36px',
                boxShadow: '0 16px 28px rgba(0, 0, 0, 0.14)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '22px' }}>
                <svg width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden>
                  <path d="M15 4.5 6.5 8v6.4c0 5.88 3.64 11.4 8.5 12.76 4.86-1.36 8.5-6.88 8.5-12.76V8L15 4.5Z" stroke="#BFD9F8" strokeWidth="2.2" strokeLinejoin="round" />
                  <path d="m11.6 14.8 2.5 2.5 4.9-4.9" stroke="#BFD9F8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span style={{ fontFamily: manrope, fontSize: '14px', fontWeight: 700, color: '#FEFCFF', lineHeight: '20px' }}>
                  Compliance Requirements
                </span>
              </div>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {[
                  'All applicants must be 21+ years of age for interstate commerce.',
                  'SSN is required for immediate background screening.',
                  'CDL Class A/B must be verified against DMV database.',
                ].map((text, i) => (
                  <li key={text} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                    {i < 2 ? (
                      <svg width="26" height="26" viewBox="0 0 26 26" fill="none" style={{ flexShrink: 0, marginTop: '2px' }} aria-hidden>
                        <circle cx="13" cy="13" r="11.5" stroke="#BCD7F8" strokeWidth="3" />
                        <path d="m8.6 13.4 2.8 2.8 6-6" stroke="#BCD7F8" strokeWidth="2.7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    ) : (
                      <span
                        style={{
                          width: '26px',
                          height: '26px',
                          borderRadius: '9999px',
                          border: '3px solid rgba(191,217,248,0.9)',
                          flexShrink: 0,
                          marginTop: '2px',
                        }}
                      />
                    )}
                    <span
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '12px',
                        lineHeight: '19.5px',
                        color: i < 2 ? '#EAF3FF' : '#B5CCEA',
                        fontWeight: 400,
                        maxWidth: '420px',
                      }}
                    >
                      {text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Route assignment — Figma 105:9651 */}
            <div
              style={{
                position: 'relative',
                height: '192px',
                borderRadius: '12px',
                overflow: 'hidden',
                background: '#fff',
                boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  opacity: 0.5,
                  backgroundImage: `linear-gradient(0deg, #fff 0%, #fff 100%), url(${MAP_PREVIEW})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center -20%',
                  backgroundBlendMode: 'saturation, normal',
                }}
              />
              <div
                style={{
                  position: 'relative',
                  margin: '16px',
                  padding: '17px',
                  borderRadius: '8px',
                  background: 'rgba(255,255,255,0.7)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.2)',
                }}
              >
                <div
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '10px',
                    fontWeight: 600,
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    color: '#2F80ED',
                    lineHeight: '15px',
                    marginBottom: '4px',
                  }}
                >
                  Route Assignment
                </div>
                <p style={{ margin: 0, fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#191C1E', lineHeight: '16px' }}>
                  Assignment will be based on local zoning once residential address is saved.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
