'use client';

import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

const manrope = "'Manrope', Inter, sans-serif";

// ── Which section a pathname belongs to ────────────────────────────────────────
function getSectionForPath(p: string): string | null {
  if (p === '/command-center' || p === '/') return 'dashboard';
  if (p.startsWith('/incident-center')) return 'incident';
  if (p.startsWith('/analytics')) return 'analytics';
  if (p.startsWith('/live-map')) return 'live';
  if (p.startsWith('/orders')) return 'orders';
  if (p.startsWith('/drivers')) return 'drivers';
  if (p.startsWith('/customers')) return 'customers';
  if (p.startsWith('/settings') || p === '/revenue' || p.startsWith('/settings/pricing')) return 'settings';
  return null;
}

// ── Icons ──────────────────────────────────────────────────────────────────────
function IconDashboard({ active }: { active?: boolean }) {
  const c = active ? '#1E40AF' : '#475569';
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      {active ? (
        <>
          <rect x="2" y="2" width="6" height="6" rx="1" fill={c} />
          <rect x="10" y="2" width="6" height="6" rx="1" fill={c} />
          <rect x="2" y="10" width="6" height="6" rx="1" fill={c} />
          <rect x="10" y="10" width="6" height="6" rx="1" fill={c} />
        </>
      ) : (
        <>
          <rect x="2" y="2" width="6" height="6" rx="1" stroke={c} strokeWidth="1.4" />
          <rect x="10" y="2" width="6" height="6" rx="1" stroke={c} strokeWidth="1.4" />
          <rect x="2" y="10" width="6" height="6" rx="1" stroke={c} strokeWidth="1.4" />
          <rect x="10" y="10" width="6" height="6" rx="1" stroke={c} strokeWidth="1.4" />
        </>
      )}
    </svg>
  );
}

function IconIncident({ active }: { active?: boolean }) {
  const c = active ? '#1E40AF' : '#475569';
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <path d="M9 2.5L15.5 14H2.5L9 2.5Z" stroke={c} strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M9 7v3.5M9 12.2v.1" stroke={c} strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function IconLiveRouting({ active }: { active?: boolean }) {
  const c = active ? '#1E40AF' : '#475569';
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <circle cx="4" cy="13" r="2" stroke={c} strokeWidth="1.3" />
      <circle cx="14" cy="5" r="2" stroke={c} strokeWidth="1.3" />
      <path d="M6 13c2 0 3-1 4-3s2-3 4-3" stroke={c} strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

function IconOrders({ active }: { active?: boolean }) {
  const c = active ? '#1E40AF' : '#475569';
  return (
    <svg width="18" height="16" viewBox="0 0 18 16" fill="none" aria-hidden>
      <rect x="1" y="3" width="12" height="9" rx="1.5" stroke={c} strokeWidth="1.3" />
      <path d="M13 5.5h3l2 3.5H13V5.5Z" stroke={c} strokeWidth="1.3" strokeLinejoin="round" />
      <circle cx="4.5" cy="13.5" r="1.5" fill={c} />
      <circle cx="12.5" cy="13.5" r="1.5" fill={c} />
    </svg>
  );
}

function IconDrivers({ active }: { active?: boolean }) {
  const c = active ? '#1E40AF' : '#475569';
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <rect x="2.5" y="1.5" width="13" height="15" rx="2" stroke={c} strokeWidth="1.3" />
      <circle cx="9" cy="7.5" r="2.5" stroke={c} strokeWidth="1.3" />
      <path d="M5 14.5c0-2.2 1.8-4 4-4s4 1.8 4 4" stroke={c} strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

function IconCustomers({ active }: { active?: boolean }) {
  const c = active ? '#1E40AF' : '#475569';
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <circle cx="6.5" cy="6" r="2.5" stroke={c} strokeWidth="1.3" />
      <path d="M1 15c0-2.5 2.5-4.5 5.5-4.5S12 12.5 12 15" stroke={c} strokeWidth="1.3" strokeLinecap="round" />
      <circle cx="13" cy="5.5" r="2" stroke={c} strokeWidth="1.3" />
      <path d="M16 14.5c0-1.8-1.3-3.3-3-4" stroke={c} strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

function IconSettingsGear({ strokeColor = '#475569' }: { strokeColor?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconLogout() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <path d="M7 16H3a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h4" stroke="#434654" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M12 13l3-4-3-4M15 9H6" stroke="#434654" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ── Chevron ────────────────────────────────────────────────────────────────────
function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden
      style={{ flexShrink: 0, transition: 'transform 0.2s ease', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
    >
      <path d="M2 4l4 4 4-4" stroke="#94A3B8" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ── Section header row (expandable nav item) ───────────────────────────────────
function SectionRow({
  active, icon, label, open, onClick,
}: {
  active?: boolean; icon: ReactNode; label: string; open: boolean; onClick: () => void;
}) {
  return (
    <button
      suppressHydrationWarning
      type="button"
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        width: '239px',
        padding: active ? '20px 16px 16px' : '16px',
        borderRadius: '4px',
        border: 'none',
        cursor: 'pointer',
        textAlign: 'left',
        background: active ? 'rgba(219, 234, 254, 0.5)' : 'transparent',
        boxSizing: 'border-box',
      }}
    >
      <span style={{ display: 'flex', width: '34px', justifyContent: 'flex-start', flexShrink: 0 }}>{icon}</span>
      <span style={{ flex: 1, fontFamily: manrope, fontSize: '14px', fontWeight: 500, lineHeight: '20px', letterSpacing: '0.35px', color: active ? '#1E40AF' : '#475569', textTransform: 'uppercase' }}>
        {label}
      </span>
      <Chevron open={open} />
    </button>
  );
}

// ── Sub-link ───────────────────────────────────────────────────────────────────
function SubLink({ label, onClick, active }: { label: string; onClick: () => void; active?: boolean }) {
  return (
    <button
      suppressHydrationWarning
      type="button"
      onClick={onClick}
      style={{ display: 'block', width: '100%', padding: '16px 0', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}
    >
      <span style={{ fontFamily: manrope, fontSize: '12px', fontWeight: 700, lineHeight: '16px', letterSpacing: '0.6px', color: active ? '#2563EB' : '#64748B', textTransform: 'uppercase' }}>
        {label}
      </span>
    </button>
  );
}

// ── Settings sub-link ──────────────────────────────────────────────────────────
function SettingsSubLink({ label, active, onClick, first }: { label: string; active: boolean; onClick: () => void; first?: boolean }) {
  return (
    <div style={{ paddingTop: first ? 8 : 16 }}>
      <button
        suppressHydrationWarning
        type="button"
        onClick={onClick}
        style={{ display: 'block', width: '100%', padding: '16px 0', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}
      >
        <span style={{ fontFamily: manrope, fontSize: '10px', fontWeight: 800, lineHeight: '12.5px', letterSpacing: '1px', color: active ? '#2563EB' : '#94A3B8', textTransform: 'uppercase' }}>
          {label}
        </span>
      </button>
    </div>
  );
}

// ── Settings sub-items data ────────────────────────────────────────────────────
const settingsSubItems = [
  { label: 'FLEET MANAGEMENT', href: '/settings/fleet-settings', match: (p: string) => p.startsWith('/settings/fleet-settings') },
  { label: 'PAYMENTS & EARNINGS', href: '/revenue', match: (p: string) => p === '/revenue' },
  { label: 'REPORTS & ANALYTICS', href: '/analytics', match: (p: string) => p.startsWith('/analytics') },
  { label: 'SAFETY & FRAUD', href: '/settings', match: (p: string) => p === '/settings' },
  { label: 'NOTIFICATIONS', href: '/settings/notifications', match: (p: string) => p.startsWith('/settings/notifications') },
  { label: 'ADMIN & ROLES', href: '/settings/user-management', match: (p: string) => p.startsWith('/settings/user-management') },
  { label: 'PRICING AND FARE MANAGEMENT', href: '/settings/pricing', match: (p: string) => p.startsWith('/settings/pricing') },
  { label: 'BILLING & API', href: '/settings/billing-api', match: (p: string) => p.startsWith('/settings/billing-api') },
];

// ── Sidebar ────────────────────────────────────────────────────────────────────
export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  // Which section is expanded (null = all collapsed)
  const [openSection, setOpenSection] = useState<string | null>(() => getSectionForPath(pathname));

  // Auto-expand the correct section when the route changes
  useEffect(() => {
    const section = getSectionForPath(pathname);
    if (section) setOpenSection(section);
  }, [pathname]);

  function toggle(section: string, href?: string) {
    if (openSection === section) {
      setOpenSection(null);           // collapse
    } else {
      setOpenSection(section);        // expand
      if (href) router.push(href);    // navigate to section root
    }
  }

  const dashActive = pathname === '/command-center' || pathname === '/';
  const incidentActive = pathname.startsWith('/incident-center');
  const analyticsActive = pathname.startsWith('/analytics');
  const liveActive = pathname.startsWith('/live-map');
  const ordersActive = pathname.startsWith('/orders');
  const driversActive = pathname.startsWith('/drivers');
  const customersActive = pathname.startsWith('/customers');

  return (
    <aside style={{ width: '255px', height: '100vh', minHeight: '1047px', flexShrink: 0, background: '#F1F4F9', borderRight: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', overflow: 'hidden', boxSizing: 'border-box' }}>

      {/* Scrollable nav area */}
      <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', overflowX: 'hidden', width: '100%', paddingLeft: '8px', paddingRight: '8px', boxSizing: 'border-box' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', gap: '4px', paddingTop: '8px', paddingBottom: '24px' }}>

          {/* Logo */}
          <button
            suppressHydrationWarning
            type="button"
            onClick={() => router.push('/command-center')}
            style={{ display: 'flex', alignItems: 'center', padding: '0 8px 0 16px', border: 'none', background: 'transparent', cursor: 'pointer', width: 'fit-content' }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/carryon-logo.svg" alt="CarryOn" style={{ height: '32px', width: 'auto', objectFit: 'contain', display: 'block' }} />
          </button>

          {/* MAIN MENU label */}
          <div style={{ width: '100%', paddingLeft: '24px', paddingRight: '24px', marginTop: '2px', boxSizing: 'border-box' }}>
            <div style={{ fontFamily: manrope, fontSize: '10px', fontWeight: 700, lineHeight: '15px', letterSpacing: '1px', color: '#94A3B8', textTransform: 'uppercase' }}>
              MAIN MENU
            </div>
          </div>

          {/* ── DASHBOARD (expandable) ── */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <SectionRow
              active={dashActive}
              icon={<IconDashboard active={dashActive} />}
              label="DASHBOARD"
              open={openSection === 'dashboard'}
              onClick={() => toggle('dashboard', '/command-center')}
            />
          </div>

          {/* ── INCIDENT CENTER (simple link) ── */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button
              suppressHydrationWarning
              type="button"
              onClick={() => router.push('/incident-center')}
              style={{
                display: 'flex',
                alignItems: 'center',
                width: '239px',
                padding: incidentActive ? '20px 16px 16px' : '16px',
                borderRadius: '4px',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
                background: incidentActive ? 'rgba(219, 234, 254, 0.5)' : 'transparent',
                boxSizing: 'border-box',
              }}
            >
              <span style={{ display: 'flex', width: '34px', justifyContent: 'flex-start', flexShrink: 0 }}>
                <IconIncident active={incidentActive} />
              </span>
              <span style={{ flex: 1, fontFamily: manrope, fontSize: '14px', fontWeight: 500, lineHeight: '20px', letterSpacing: '0.35px', color: incidentActive ? '#1E40AF' : '#475569', textTransform: 'uppercase' }}>
                INCIDENT CENTER
              </span>
            </button>
          </div>

          {/* ── LIVE ROUTING (expandable) ── */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <SectionRow
              active={liveActive}
              icon={<IconLiveRouting active={liveActive} />}
              label="LIVE ROUTING"
              open={openSection === 'live'}
              onClick={() => toggle('live', '/live-map')}
            />
          </div>
          {openSection === 'live' && (
            <div style={{ paddingLeft: '48px', paddingRight: '16px' }}>
              <SubLink label="NEW DISPATCHES" onClick={() => router.push('/live-map/dispatches')} active={liveActive && pathname.startsWith('/live-map/dispatches')} />
              <SubLink label="OPTIMIZE ALL ROUTES" onClick={() => router.push('/live-map/optimize')} active={liveActive && pathname === '/live-map/optimize'} />
            </div>
          )}

          {/* ── ORDERS (expandable) ── */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <SectionRow
              active={ordersActive}
              icon={<IconOrders active={ordersActive} />}
              label="ORDERS"
              open={openSection === 'orders'}
              onClick={() => toggle('orders', '/orders')}
            />
          </div>
          {openSection === 'orders' && (
            <div style={{ paddingLeft: '48px', paddingRight: '16px' }}>
              <SubLink label="CREATE NEW ORDERS" onClick={() => router.push('/orders/create')} active={pathname.startsWith('/orders/create')} />
            </div>
          )}

          {/* ── DRIVERS (expandable) ── */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <SectionRow
              active={driversActive}
              icon={<IconDrivers active={driversActive} />}
              label="DRIVERS"
              open={openSection === 'drivers'}
              onClick={() => toggle('drivers', '/drivers')}
            />
          </div>
          {openSection === 'drivers' && (
            <div style={{ paddingLeft: '48px', paddingRight: '16px' }}>
              <SubLink label="REGISTER DRIVER" onClick={() => router.push('/drivers/register')} active={pathname === '/drivers/register'} />
            </div>
          )}

          {/* ── CUSTOMERS (expandable) ── */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <SectionRow
              active={customersActive}
              icon={<IconCustomers active={customersActive} />}
              label="CUSTOMERS"
              open={openSection === 'customers'}
              onClick={() => toggle('customers', '/customers')}
            />
          </div>
          {openSection === 'customers' && (
            <div style={{ paddingLeft: '48px', paddingRight: '16px' }}>
              <SubLink label="ADD NEW CUSTOMER" onClick={() => router.push('/customers')} />
            </div>
          )}

          {/* ── SETTINGS (expandable) ── */}
          <div style={{ borderTop: '1px solid #E2E8F0', marginTop: '4px', paddingTop: '16px', paddingBottom: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <button
                suppressHydrationWarning
                type="button"
                onClick={() => toggle('settings')}
                style={{ display: 'flex', alignItems: 'center', width: '239px', padding: '16px', borderRadius: '4px', border: 'none', cursor: 'pointer', textAlign: 'left', background: 'transparent', boxSizing: 'border-box' }}
              >
                <span style={{ display: 'flex', width: '34px', justifyContent: 'flex-start', flexShrink: 0 }}>
                  <IconSettingsGear strokeColor="#475569" />
                </span>
                <span style={{ flex: 1, fontFamily: manrope, fontSize: '14px', fontWeight: 500, lineHeight: '20px', letterSpacing: '0.35px', color: '#475569', textTransform: 'uppercase' }}>
                  SETTINGS
                </span>
                <Chevron open={openSection === 'settings'} />
              </button>
            </div>
            {openSection === 'settings' && (
              <nav aria-label="Settings" style={{ paddingLeft: '48px', paddingRight: '16px', paddingBottom: '16px' }}>
                {settingsSubItems.map((sub, idx) => (
                  <SettingsSubLink key={sub.label} label={sub.label} active={sub.match(pathname)} first={idx === 0} onClick={() => router.push(sub.href)} />
                ))}
              </nav>
            )}
          </div>

        </div>
      </div>

      {/* User card + logout (fixed bottom) */}
      <div style={{ flexShrink: 0, width: '100%', padding: '16px 23px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', background: '#F1F4F9', boxSizing: 'border-box' }}>
        <div style={{ width: '208px', height: '56px', borderRadius: '12px', background: '#B7DAF5', padding: '0 8px', display: 'flex', alignItems: 'center', gap: '12px', boxSizing: 'border-box' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '9999px', overflow: 'hidden', background: '#E2E8F0' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/nav-user-profile.png" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div style={{ minWidth: 0, flex: 1 }}>
            <div style={{ fontFamily: manrope, fontSize: '12px', fontWeight: 700, lineHeight: '16px', color: '#191C1E' }}>Alex Chen</div>
            <div style={{ fontFamily: manrope, fontSize: '10px', fontWeight: 700, lineHeight: '12.5px', letterSpacing: '0.6px', color: '#64748B', textTransform: 'uppercase' }}>Fleet Director</div>
          </div>
        </div>

        <div style={{ width: '100%', marginTop: '24px', borderTop: '1px solid rgba(195, 198, 214, 0.35)', paddingTop: '18px' }}>
          <button
            suppressHydrationWarning
            type="button"
            style={{ display: 'flex', alignItems: 'center', gap: '16px', width: '100%', padding: '8px 2px', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left' }}
          >
            <IconLogout />
            <span style={{ fontFamily: manrope, fontSize: '10px', fontWeight: 700, lineHeight: '15px', letterSpacing: '0.5px', color: '#434654', textTransform: 'uppercase' }}>
              LOGOUT
            </span>
          </button>
        </div>
      </div>
    </aside>
  );
}
