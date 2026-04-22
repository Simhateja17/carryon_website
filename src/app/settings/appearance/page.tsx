'use client';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';

/* ── Theme mode option ───────────────────────────────────────── */
function ThemeOption({ mode, selected, onClick }: { mode: 'Light' | 'Dark' | 'System'; selected: boolean; onClick: () => void }) {
  return (
    <button suppressHydrationWarning onClick={onClick} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
      {/* Preview thumbnail */}
      <div style={{ width: '72px', height: '52px', borderRadius: '8px', border: selected ? '2px solid #2563EB' : '2px solid #E2E8F0', overflow: 'hidden', position: 'relative', background: mode === 'Dark' ? '#0F172A' : mode === 'System' ? 'linear-gradient(135deg, #fff 50%, #0F172A 50%)' : '#fff', flexShrink: 0 }}>
        {/* Inner chrome */}
        <div style={{ position: 'absolute', top: '6px', left: '6px', right: '6px', height: '8px', borderRadius: '3px', background: mode === 'Dark' ? '#1E293B' : '#F1F5F9' }} />
        <div style={{ position: 'absolute', top: '20px', left: '6px', width: '20px', bottom: '8px', borderRadius: '3px', background: mode === 'Dark' ? '#1E293B' : '#F1F5F9' }} />
        <div style={{ position: 'absolute', top: '20px', left: '30px', right: '6px', height: '8px', borderRadius: '3px', background: mode === 'Dark' ? '#334155' : '#E2E8F0' }} />
        <div style={{ position: 'absolute', top: '32px', left: '30px', right: '14px', height: '8px', borderRadius: '3px', background: mode === 'Dark' ? '#1E3A8A' : '#DBEAFE' }} />
        {/* Selected dot */}
        {selected && (
          <div style={{ position: 'absolute', top: '4px', right: '4px', width: '12px', height: '12px', borderRadius: '50%', background: '#2563EB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="7" height="7" viewBox="0 0 7 7" fill="none"><path d="M1 3.5L3 5.5L6 2" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
        )}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
        {/* Mode icon */}
        {mode === 'Light' && <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="2.5" fill="#F59E0B"/><path d="M6 1v1.5M6 9.5V11M1 6h1.5M9.5 6H11M2.64 2.64l1.06 1.06M8.3 8.3l1.06 1.06M2.64 9.36l1.06-1.06M8.3 3.7l1.06-1.06" stroke="#F59E0B" strokeWidth="1.2" strokeLinecap="round"/></svg>}
        {mode === 'Dark' && <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M10 7.5A5 5 0 0 1 4.5 2a5 5 0 1 0 5.5 5.5z" fill="#64748B"/></svg>}
        {mode === 'System' && <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><rect x="1" y="2" width="10" height="7" rx="1.5" stroke="#64748B" strokeWidth="1.2"/><path d="M4 11h4M6 9v2" stroke="#64748B" strokeWidth="1.2" strokeLinecap="round"/></svg>}
        <span style={{ fontFamily: 'Inter', fontSize: '11px', fontWeight: 600, color: selected ? '#2563EB' : '#64748B' }}>{mode}</span>
      </div>
    </button>
  );
}

/* ── Accent color swatch ─────────────────────────────────────── */
function ColorSwatch({ color, selected, onClick }: { color: string; selected: boolean; onClick: () => void }) {
  return (
    <button suppressHydrationWarning onClick={onClick} style={{ width: '36px', height: '36px', borderRadius: '50%', background: color, border: selected ? `3px solid ${color}` : '3px solid transparent', outline: selected ? '2px solid #fff' : 'none', cursor: 'pointer', padding: 0, boxShadow: selected ? `0 0 0 3px ${color}40` : 'none', transition: 'box-shadow 0.15s' }} />
  );
}

/* ── Typography option ───────────────────────────────────────── */
function TypographyOption({ name, sub, selected, onClick }: { name: string; sub: string; selected: boolean; onClick: () => void }) {
  return (
    <button suppressHydrationWarning onClick={onClick} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', padding: '12px 14px', borderRadius: '8px', border: selected ? '1.5px solid #2563EB' : '1.5px solid #E2E8F0', background: selected ? '#EFF6FF' : '#fff', cursor: 'pointer', textAlign: 'left', marginBottom: '8px' }}>
      <div>
        <div style={{ fontFamily: 'Inter', fontSize: '13px', fontWeight: 700, color: '#0F172A', marginBottom: '2px' }}>{name}</div>
        <div style={{ fontFamily: 'Inter', fontSize: '11px', color: selected ? '#2563EB' : '#94A3B8' }}>{sub}</div>
      </div>
      {/* Radio */}
      <div style={{ width: '18px', height: '18px', borderRadius: '50%', border: selected ? '2px solid #2563EB' : '2px solid #CBD5E1', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        {selected && <div style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#2563EB' }} />}
      </div>
    </button>
  );
}

/* ── Page ────────────────────────────────────────────────────── */
export default function AppearancePage() {
  const [theme, setTheme]   = useState<'Light' | 'Dark' | 'System'>('Light');
  const [accent, setAccent] = useState('#2563EB');
  const [hex, setHex]       = useState('9658be');
  const [font, setFont]     = useState('Manrope & Inter');

  const accentColors = ['#2563EB', '#16A34A', '#7C3AED', '#92400E', '#DC2626', '#0284C7'];

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: '#F8FAFC', fontFamily: 'Inter, sans-serif' }}>
      <Sidebar />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <Navbar />

        {/* Content */}
        <main style={{ flex: 1, padding: '24px 28px', overflowY: 'auto', boxSizing: 'border-box' }}>

          {/* Row 1: Theme Mode + Logo */}
          <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>

            {/* Theme Mode */}
            <div style={{ flex: 1, background: '#fff', borderRadius: '12px', border: '1px solid #E2E8F0', padding: '22px 24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                <div>
                  <div style={{ fontFamily: 'Inter', fontSize: '15px', fontWeight: 700, color: '#0F172A', marginBottom: '3px' }}>Theme Mode</div>
                  <div style={{ fontFamily: 'Inter', fontSize: '12px', color: '#64748B' }}>Choose how Carry On looks in your environment.</div>
                </div>
                {/* Gear icon */}
                <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="2.5" stroke="#2563EB" strokeWidth="1.3"/><path d="M8 1v1.5M8 13.5V15M1 8h1.5M13.5 8H15M2.93 2.93l1.06 1.06M12.01 12.01l1.06 1.06M2.93 13.07l1.06-1.06M12.01 3.99l1.06-1.06" stroke="#2563EB" strokeWidth="1.3" strokeLinecap="round"/></svg>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '28px', alignItems: 'flex-start' }}>
                {(['Light', 'Dark', 'System'] as const).map((m) => (
                  <ThemeOption key={m} mode={m} selected={theme === m} onClick={() => setTheme(m)} />
                ))}
              </div>
            </div>

            {/* Logo */}
            <div style={{ width: '200px', flexShrink: 0, background: '#fff', borderRadius: '12px', border: '1px solid #E2E8F0', padding: '22px 22px' }}>
              <div style={{ fontFamily: 'Inter', fontSize: '15px', fontWeight: 700, color: '#0F172A', marginBottom: '16px' }}>Logo</div>
              {/* Upload box */}
              <div style={{ border: '1.5px dashed #CBD5E1', borderRadius: '10px', background: '#F8FAFC', padding: '20px 14px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer', minHeight: '110px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 12V4M6 7l3-3 3 3" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M3 13.5v1A1.5 1.5 0 0 0 4.5 16h9a1.5 1.5 0 0 0 1.5-1.5v-1" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round"/></svg>
                </div>
                <span style={{ fontFamily: 'Inter', fontSize: '11px', fontWeight: 500, color: '#64748B', textAlign: 'center', lineHeight: '1.5' }}>Click to upload SVG<br />or PNG</span>
              </div>
              <div style={{ marginTop: '10px', fontFamily: 'Inter', fontSize: '10px', color: '#94A3B8', textAlign: 'center', lineHeight: '1.5' }}>
                RECOMMENDED SIZE<br />512 × 512px • Max 2MB
              </div>
            </div>

          </div>

          {/* Row 2: Brand Accent Color + Typography */}
          <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>

            {/* Brand Accent Color */}
            <div style={{ flex: 1, background: '#fff', borderRadius: '12px', border: '1px solid #E2E8F0', padding: '22px 24px' }}>
              <div style={{ fontFamily: 'Inter', fontSize: '15px', fontWeight: 700, color: '#0F172A', marginBottom: '3px' }}>Brand Accent Color</div>
              <div style={{ fontFamily: 'Inter', fontSize: '12px', color: '#2563EB', marginBottom: '18px' }}>Primary interface actions and highlights.</div>
              {/* Swatches */}
              <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
                {accentColors.map((c) => (
                  <ColorSwatch key={c} color={c} selected={accent === c} onClick={() => setAccent(c)} />
                ))}
              </div>
              {/* Custom hex */}
              <div>
                <div style={{ fontFamily: 'Inter', fontSize: '10px', fontWeight: 700, color: '#94A3B8', letterSpacing: '0.5px', marginBottom: '8px' }}>CUSTOM HEX CODE</div>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <div style={{ flex: 1, height: '38px', border: '1px solid #E2E8F0', borderRadius: '8px', background: '#F8FAFC', display: 'flex', alignItems: 'center', padding: '0 12px', gap: '6px' }}>
                    <span style={{ fontFamily: 'Inter', fontSize: '13px', color: '#94A3B8' }}>#</span>
                    <input
                      suppressHydrationWarning
                      value={hex}
                      onChange={(e) => setHex(e.target.value)}
                      style={{ flex: 1, border: 'none', background: 'transparent', fontFamily: 'Inter', fontSize: '13px', color: '#374151', outline: 'none' }}
                    />
                  </div>
                  <button suppressHydrationWarning style={{ height: '38px', padding: '0 20px', borderRadius: '8px', background: '#2563EB', border: 'none', cursor: 'pointer', fontFamily: 'Inter', fontSize: '13px', fontWeight: 600, color: '#fff', flexShrink: 0 }}>
                    Apply
                  </button>
                </div>
              </div>
            </div>

            {/* Typography */}
            <div style={{ width: '260px', flexShrink: 0, background: '#fff', borderRadius: '12px', border: '1px solid #E2E8F0', padding: '22px 22px' }}>
              <div style={{ fontFamily: 'Inter', fontSize: '15px', fontWeight: 700, color: '#0F172A', marginBottom: '16px' }}>Typography</div>
              <TypographyOption name="Manrope & Inter" sub="Modern Geometric • Highly Legible" selected={font === 'Manrope & Inter'} onClick={() => setFont('Manrope & Inter')} />
              <TypographyOption name="Publico & Inter"  sub="Editorial alia • Professional"       selected={font === 'Publico & Inter'}  onClick={() => setFont('Publico & Inter')} />
              <TypographyOption name="IBM Plex Mono"    sub="Technical • Utilitarian"              selected={font === 'IBM Plex Mono'}    onClick={() => setFont('IBM Plex Mono')} />
            </div>

          </div>

          {/* Live Preview */}
          <div style={{ position: 'relative', borderRadius: '14px', overflow: 'hidden', minHeight: '220px', background: '#0F172A' }}>
            {/* Background image overlay */}
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 40%, #1e3a5f 70%, #1e293b 100%)', opacity: 0.9 }} />
            {/* Warehouse-like vertical lines decoration */}
            <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', opacity: 0.15 }}>
              {[10, 22, 34, 46, 58, 70, 82].map((x) => (
                <div key={x} style={{ position: 'absolute', left: `${x}%`, top: 0, bottom: 0, width: '1px', background: '#60A5FA' }} />
              ))}
              {[20, 40, 60, 80].map((y) => (
                <div key={y} style={{ position: 'absolute', top: `${y}%`, left: 0, right: 0, height: '1px', background: '#60A5FA' }} />
              ))}
            </div>

            {/* Preview card */}
            <div style={{ position: 'relative', zIndex: 2, margin: '28px auto', maxWidth: '400px', background: 'rgba(255,255,255,0.96)', borderRadius: '14px', padding: '22px 24px', boxShadow: '0 12px 40px rgba(0,0,0,0.4)' }}>
              {/* Brand row */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <div style={{ width: '34px', height: '34px', borderRadius: '8px', background: accent, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="18" height="16" viewBox="0 0 18 16" fill="none"><rect x="0.5" y="2.5" width="10" height="8" rx="1.5" stroke="white" strokeWidth="1.4"/><path d="M10.5 5h3.5l2 3.5H10.5V5Z" stroke="white" strokeWidth="1.3" strokeLinejoin="round"/><circle cx="3.5" cy="12" r="1.5" fill="white"/><circle cx="12" cy="12" r="1.5" fill="white"/></svg>
                </div>
                <div>
                  <div style={{ fontFamily: 'Inter', fontSize: '14px', fontWeight: 800, color: '#0F172A', letterSpacing: '0.5px' }}>CARRY ON</div>
                  <div style={{ fontFamily: 'Inter', fontSize: '10px', color: '#64748B' }}>Logistics Operations Preview</div>
                </div>
              </div>
              {/* Stats */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '16px' }}>
                {[
                  { label: 'ACTIVE FLEET', value: '1,284', color: accent },
                  { label: 'ON-TIME RATE',  value: '98.2%', color: '#10B981' },
                  { label: 'INCIDENTS',     value: '02',    color: '#EF4444' },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div style={{ fontFamily: 'Inter', fontSize: '9px', fontWeight: 700, color: '#94A3B8', letterSpacing: '0.5px', marginBottom: '4px' }}>{stat.label}</div>
                    <div style={{ fontFamily: 'Inter', fontSize: '20px', fontWeight: 800, color: stat.color, lineHeight: 1 }}>{stat.value}</div>
                  </div>
                ))}
              </div>
              {/* Action buttons */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button suppressHydrationWarning style={{ height: '34px', padding: '0 16px', borderRadius: '7px', background: '#F1F5F9', border: 'none', cursor: 'pointer', fontFamily: 'Inter', fontSize: '12px', fontWeight: 600, color: '#374151' }}>
                  Discard Changes
                </button>
                <button suppressHydrationWarning style={{ height: '34px', padding: '0 18px', borderRadius: '7px', background: accent, border: 'none', cursor: 'pointer', fontFamily: 'Inter', fontSize: '12px', fontWeight: 700, color: '#fff' }}>
                  Save Configuration
                </button>
              </div>
            </div>

            {/* Bottom label */}
            <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', paddingBottom: '14px' }}>
              <span style={{ fontFamily: 'Inter', fontSize: '10px', fontWeight: 600, color: 'rgba(255,255,255,0.4)', letterSpacing: '1px' }}>
                LIVE PREVIEW ENGINE  •  V2.4.0-BETA
              </span>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}
