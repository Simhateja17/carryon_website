'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

/** Map texture from Figma MCP (`get_design_context` node 105:9466) — replace with a static asset if the URL expires. */
const MAP_PREVIEW =
  'https://www.figma.com/api/mcp/asset/508e6e6c-e26b-4299-90ed-5274437b00e3';

const manrope = "'Manrope', Inter, sans-serif";

function IconPersonPlus() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden>
      <rect width="40" height="40" rx="10" fill="#DBEAFE" />
      <circle cx="16" cy="17" r="4" stroke="#2F80ED" strokeWidth="1.5" />
      <path
        d="M9 28c0-3.866 3.134-7 7-7M25 19v6M22 22h6"
        stroke="#2F80ED"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
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
          <span
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.5px',
              textTransform: 'uppercase',
              color: '#2F80ED',
            }}
          >
            Fleet Expansion
          </span>
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
                borderTop: '4px solid #2F80ED',
                padding: '28px 24px 24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
              }}
            >
              <div style={{ textAlign: 'center' }}>
                <div
                  style={{
                    width: '96px',
                    height: '96px',
                    margin: '0 auto 12px',
                    borderRadius: '9999px',
                    background: '#E6E8EA',
                    border: '4px solid #fff',
                    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <svg width="32" height="28" viewBox="0 0 24 20" fill="none" aria-hidden>
                    <path
                      d="M12 15a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
                      stroke="#94A3B8"
                      strokeWidth="1.5"
                    />
                    <path d="M4 18h16" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
                <div style={{ fontFamily: manrope, fontSize: '18px', fontWeight: 700, color: '#191C1E', lineHeight: '28px' }}>
                  Unsaved Profile
                </div>
                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#424754', lineHeight: '16px', marginTop: '4px' }}>
                  Draft registration in progress
                </div>
              </div>
              <div style={{ borderTop: '1px solid #ECEEF0', paddingTop: '17px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '10px',
                      fontWeight: 600,
                      letterSpacing: '1px',
                      textTransform: 'uppercase',
                      color: '#424754',
                    }}
                  >
                    Verification Status
                  </span>
                  <span
                    style={{
                      background: '#A6D2F3',
                      color: '#2F80ED',
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '9px',
                      fontWeight: 600,
                      letterSpacing: '-0.45px',
                      textTransform: 'uppercase',
                      padding: '2px 8px',
                      borderRadius: '4px',
                      lineHeight: '13.5px',
                    }}
                  >
                    Drafting
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '10px',
                      fontWeight: 600,
                      letterSpacing: '1px',
                      textTransform: 'uppercase',
                      color: '#424754',
                    }}
                  >
                    Background Check
                  </span>
                  <span
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '10px',
                      fontWeight: 600,
                      fontStyle: 'italic',
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
                background: '#2F80ED',
                borderRadius: '12px',
                padding: '24px',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
                  <path d="M9 1.5L3 4v4.5c0 4.15 2.57 8.04 6 9 3.43-.96 6-4.85 6-9V4l-6-2.5Z" stroke="#FEFCFF" strokeWidth="1.4" strokeLinejoin="round" />
                </svg>
                <span style={{ fontFamily: manrope, fontSize: '14px', fontWeight: 700, color: '#FEFCFF', lineHeight: '20px' }}>
                  Compliance Requirements
                </span>
              </div>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[
                  'All applicants must be 21+ years of age for interstate commerce.',
                  'SSN is required for immediate background screening.',
                  'CDL Class A/B must be verified against DMV database.',
                ].map((text, i) => (
                  <li key={text} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    {i < 2 ? (
                      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" style={{ flexShrink: 0, marginTop: '2px' }} aria-hidden>
                        <circle cx="7.5" cy="7.5" r="7" fill="#4EDEA3" />
                        <path d="M4.5 7.5l2 2 4-4" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    ) : (
                      <span
                        style={{
                          width: '15px',
                          height: '15px',
                          borderRadius: '9999px',
                          border: '2px solid rgba(254,252,255,0.5)',
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
                        color: '#FEFCFF',
                        opacity: i < 2 ? 0.9 : 0.7,
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
