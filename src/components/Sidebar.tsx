'use client';

import type { ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

/** Settings links — aligned with app routes under /settings */
const settingsSubItems: { label: string; href: string; match: (p: string) => boolean }[] = [
  { label: 'FLEET MANAGEMENT', href: '/settings/fleet-settings', match: (p) => p.startsWith('/settings/fleet-settings') },
  { label: 'PAYMENTS & EARNINGS', href: '/revenue', match: (p) => p === '/revenue' },
  { label: 'REPORTS & ANALYTICS', href: '/analytics', match: (p) => p.startsWith('/analytics') },
  { label: 'SAFETY & FRAUD', href: '/settings', match: (p) => p === '/settings' },
  { label: 'NOTIFICATIONS', href: '/settings/notifications', match: (p) => p.startsWith('/settings/notifications') },
  { label: 'ADMIN & ROLES', href: '/settings/user-management', match: (p) => p.startsWith('/settings/user-management') },
  { label: 'ZONES & LOCATIONS', href: '/live-map', match: (p) => p.startsWith('/live-map') },
  { label: 'BILLING & API', href: '/settings/billing-api', match: (p) => p.startsWith('/settings/billing-api') },
];

const manrope = "'Manrope', Inter, sans-serif";
const inter = "'Inter', sans-serif";

function IconDashboard({ active }: { active?: boolean }) {
  const c = active ? '#1E40AF' : '#475569';
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <rect x="2" y="2" width="6" height="6" rx="1" stroke={c} strokeWidth="1.4" />
      <rect x="10" y="2" width="6" height="6" rx="1" stroke={c} strokeWidth="1.4" />
      <rect x="2" y="10" width="6" height="6" rx="1" stroke={c} strokeWidth="1.4" />
      <rect x="10" y="10" width="6" height="6" rx="1" stroke={c} strokeWidth="1.4" />
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
      <path
        d="M3 14c2-4 4-6 7-7 2-.7 3-2 3-4"
        stroke={c}
        strokeWidth="1.4"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="3" cy="14" r="1.8" fill={c} />
      <circle cx="13" cy="3" r="1.8" fill={c} />
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
      <rect x="3" y="2" width="12" height="14" rx="2" stroke={c} strokeWidth="1.3" />
      <circle cx="9" cy="7" r="2.2" stroke={c} strokeWidth="1.3" />
      <path d="M5.5 14c0-2 1.6-3.5 3.5-3.5s3.5 1.5 3.5 3.5" stroke={c} strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

function IconCustomers({ active }: { active?: boolean }) {
  const c = active ? '#1E40AF' : '#475569';
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <circle cx="5.5" cy="6" r="2.2" stroke={c} strokeWidth="1.3" />
      <path d="M1 15c0-2.2 1.8-4 4-4" stroke={c} strokeWidth="1.3" strokeLinecap="round" />
      <circle cx="12.5" cy="5.5" r="2" stroke={c} strokeWidth="1.3" />
      <path d="M17 14.5c0-1.9-1.6-3.5-3.5-3.5" stroke={c} strokeWidth="1.3" strokeLinecap="round" />
      <path d="M14.5 2.5v3M13 4h3" stroke={c} strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

function IconSettingsGear({ strokeColor = '#475569' }: { strokeColor?: string }) {
  const c = strokeColor;
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
        stroke={c}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"
        stroke={c}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconLogout() {
  const c = '#434654';
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <path d="M7 16H3a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h4" stroke={c} strokeWidth="1.4" strokeLinecap="round" />
      <path d="M12 13l3-4-3-4M15 9H6" stroke={c} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

type MainRowProps = {
  active?: boolean;
  icon: ReactNode;
  label: string;
  onClick: () => void;
};

function MainNavRow({ active, icon, label, onClick }: MainRowProps) {
  return (
    <button
      suppressHydrationWarning
      type="button"
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        width: '239px',
        padding: active ? '16px 16px 12px' : '12px 16px',
        borderRadius: '4px',
        border: 'none',
        cursor: 'pointer',
        textAlign: 'left',
        background: active ? 'rgba(219, 234, 254, 0.5)' : 'transparent',
        boxSizing: 'border-box',
        transition: 'background 0.15s ease',
      }}
    >
      <span style={{ display: 'flex', width: '34px', justifyContent: 'flex-start', flexShrink: 0 }}>{icon}</span>
      <span
        style={{
          fontFamily: manrope,
          fontSize: '14px',
          fontWeight: 500,
          lineHeight: '20px',
          letterSpacing: '0.35px',
          color: active ? '#1E40AF' : '#475569',
          textTransform: 'uppercase',
        }}
      >
        {label}
      </span>
    </button>
  );
}

function SubLink({ label, onClick, active }: { label: string; onClick: () => void; active?: boolean }) {
  return (
    <button
      suppressHydrationWarning
      type="button"
      onClick={onClick}
      style={{
        display: 'block',
        width: '100%',
        padding: 0,
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        textAlign: 'left',
      }}
    >
      <span
        style={{
          fontFamily: manrope,
          fontSize: '12px',
          fontWeight: 700,
          lineHeight: '16px',
          letterSpacing: '0.6px',
          color: active ? '#2563EB' : '#64748B',
          textTransform: 'uppercase',
        }}
      >
        {label}
      </span>
    </button>
  );
}

function SettingsSubLink({
  label,
  active,
  onClick,
  first,
  variant,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  first?: boolean;
  /** `light` = settings dropdown panel spacing */
  variant?: 'light';
}) {
  const gap = first ? 0 : variant === 'light' ? '10px' : '12px';
  const activeColor = variant === 'light' ? '#2563EB' : '#1E40AF';
  return (
    <div style={{ paddingTop: gap }}>
      <button
        suppressHydrationWarning
        type="button"
        onClick={onClick}
        style={{
          display: 'block',
          width: '100%',
          padding: 0,
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
        }}
      >
        <span
          style={{
            fontFamily: manrope,
            fontSize: '10px',
            fontWeight: 800,
            lineHeight: '12.5px',
            letterSpacing: '1px',
            color: active ? activeColor : '#94A3B8',
            textTransform: 'uppercase',
          }}
        >
          {label}
        </span>
      </button>
    </div>
  );
}

function isSettingsRelatedRoute(pathname: string): boolean {
  if (pathname.startsWith('/settings')) return true;
  if (pathname === '/revenue') return true;
  if (pathname.startsWith('/analytics')) return true;
  return false;
}

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const settingsAnchorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isSettingsRelatedRoute(pathname)) {
      setSettingsOpen(true);
    }
  }, [pathname]);

  useEffect(() => {
    if (settingsOpen && settingsAnchorRef.current) {
      settingsAnchorRef.current.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  }, [settingsOpen]);

  const dashActive = pathname === '/command-center' || pathname === '/';
  const incidentActive = pathname.startsWith('/analytics');
  const liveActive = pathname.startsWith('/live-map');
  const ordersActive = pathname.startsWith('/orders');
  const driversActive = pathname.startsWith('/drivers');
  const customersActive = pathname.startsWith('/customers');
  return (
    <aside
      style={{
        width: '288px',
        height: '100vh',
        minHeight: '1047px',
        flexShrink: 0,
        background: '#F1F4F9',
        borderRight: '1px solid #E2E8F0',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        boxSizing: 'border-box',
      }}
    >
      {/* Nav — Figma Aside 332:2835 + embedded Nav 353:4026 */}
      <div
        style={{
          flex: 1,
          minHeight: 0,
          overflowY: 'auto',
          overflowX: 'hidden',
          width: '100%',
          paddingLeft: '13px',
          paddingRight: '20px',
          boxSizing: 'border-box',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px',
            paddingTop: '32px',
            paddingBottom: '24px',
            width: '100%',
            boxSizing: 'border-box',
          }}
        >
        <div
          style={{
            width: '100%',
            paddingLeft: '24px',
            paddingRight: '24px',
            boxSizing: 'border-box',
            flexShrink: 0,
          }}
        >
          <div
            style={{
              fontFamily: manrope,
              fontSize: '10px',
              fontWeight: 700,
              lineHeight: '15px',
              letterSpacing: '1px',
              color: '#94A3B8',
              textTransform: 'uppercase',
            }}
          >
            MAIN MENU
          </div>
        </div>

        <MainNavRow
          active={dashActive}
          icon={<IconDashboard active={dashActive} />}
          label="DASHBOARD"
          onClick={() => router.push('/command-center')}
        />

        <MainNavRow
          active={incidentActive}
          icon={<IconIncident active={incidentActive} />}
          label="INCIDENT CENTER"
          onClick={() => router.push('/analytics')}
        />

        {/* LIVE ROUTING + subs — Figma h ~100px */}
        <div style={{ width: '100%', minHeight: '100px', flexShrink: 0, position: 'relative' }}>
          <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <MainNavRow
              active={liveActive}
              icon={<IconLiveRouting active={liveActive} />}
              label="LIVE ROUTING"
              onClick={() => router.push('/live-map')}
            />
          </div>
          <div
            style={{
              paddingLeft: '48px',
              paddingRight: '16px',
              paddingBottom: '8px',
              marginTop: '4px',
            }}
          >
            <SubLink label="NEW DISPATCHES" onClick={() => router.push('/orders')} />
            <div style={{ marginTop: '8px' }}>
              <SubLink label="OPTIMIZE ALL ROUTES" onClick={() => router.push('/live-map')} />
            </div>
          </div>
        </div>

        {/* ORDERS — Figma h 76px */}
        <div style={{ width: '100%', minHeight: '76px', flexShrink: 0, position: 'relative' }}>
          <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <MainNavRow
              active={ordersActive}
              icon={<IconOrders active={ordersActive} />}
              label="ORDERS"
              onClick={() => router.push('/orders')}
            />
          </div>
          <div style={{ paddingLeft: '48px', paddingRight: '16px', marginTop: '4px' }}>
            <SubLink label="CREATE NEW ORDERS" onClick={() => router.push('/orders/create')} />
          </div>
        </div>

        {/* DRIVERS */}
        <div style={{ width: '100%', minHeight: '76px', flexShrink: 0, position: 'relative' }}>
          <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <MainNavRow
              active={driversActive}
              icon={<IconDrivers active={driversActive} />}
              label="DRIVERS"
              onClick={() => router.push('/drivers')}
            />
          </div>
          <div style={{ paddingLeft: '48px', paddingRight: '16px', marginTop: '4px' }}>
            <SubLink
              label="REGISTER DRIVER"
              active={pathname === '/drivers/register'}
              onClick={() => router.push('/drivers/register')}
            />
          </div>
        </div>

        {/* CUSTOMERS */}
        <div style={{ width: '100%', minHeight: '76px', flexShrink: 0, position: 'relative' }}>
          <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <MainNavRow
              active={customersActive}
              icon={<IconCustomers active={customersActive} />}
              label="CUSTOMERS"
              onClick={() => router.push('/customers')}
            />
          </div>
          <div style={{ paddingLeft: '48px', paddingRight: '16px', marginTop: '4px' }}>
            <SubLink label="ADD NEW CUSTOMER" onClick={() => router.push('/customers')} />
          </div>
        </div>

        {/* SETTINGS — closed: trigger; open: 273px light panel (visible on #F1F4F9) */}
        <div
          ref={settingsAnchorRef}
          style={{
            width: '100%',
            alignSelf: 'stretch',
            flexShrink: 0,
            borderTop: '1px solid #E2E8F0',
            marginTop: '4px',
            boxSizing: 'border-box',
            ...(settingsOpen
              ? {
                  height: '273px',
                  maxHeight: '273px',
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden',
                  padding: '8px 10px',
                }
              : {
                  paddingTop: '12px',
                  paddingBottom: '8px',
                }),
          }}
        >
          {!settingsOpen && (
            <div
              style={{
                flexShrink: 0,
                display: 'flex',
                justifyContent: 'center',
                width: '100%',
              }}
            >
              <button
                suppressHydrationWarning
                type="button"
                aria-expanded={false}
                aria-controls="sidebar-settings-menu"
                aria-label="Open settings menu"
                title="Settings menu"
                onClick={() => setSettingsOpen(true)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  width: '239px',
                  padding: '10px 12px 10px 14px',
                  borderRadius: '8px',
                  border: '1px solid #E2E8F0',
                  cursor: 'pointer',
                  textAlign: 'left',
                  background: 'rgba(255, 255, 255, 0.72)',
                  boxSizing: 'border-box',
                  transition: 'background 0.15s ease',
                }}
              >
                <span style={{ display: 'flex', width: '34px', justifyContent: 'flex-start', flexShrink: 0 }}>
                  <IconSettingsGear />
                </span>
                <span
                  style={{
                    fontFamily: manrope,
                    fontSize: '14px',
                    fontWeight: 500,
                    lineHeight: '20px',
                    letterSpacing: '0.35px',
                    color: '#475569',
                    textTransform: 'uppercase',
                    flex: 1,
                  }}
                >
                  SETTINGS
                </span>
                <span
                  aria-hidden
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '28px',
                    height: '28px',
                    borderRadius: '6px',
                    flexShrink: 0,
                    background: '#E2E8F0',
                  }}
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2.5 4.5L6 8l3.5-3.5" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </button>
            </div>
          )}

          {settingsOpen && (
            <div
              style={{
                height: '257px',
                minHeight: '257px',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                background: '#FFFFFF',
                border: '1px solid #E2E8F0',
                borderRadius: '10px',
                boxShadow: '0 1px 3px rgba(15, 23, 42, 0.08)',
                overflow: 'hidden',
                boxSizing: 'border-box',
              }}
            >
              <div style={{ flexShrink: 0, width: '100%', paddingLeft: '4px', paddingRight: '4px', boxSizing: 'border-box' }}>
                <button
                  suppressHydrationWarning
                  type="button"
                  aria-expanded
                  aria-controls="sidebar-settings-menu"
                  aria-label="Close settings menu"
                  onClick={() => setSettingsOpen(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    width: '100%',
                    padding: '14px 12px 10px',
                    border: 'none',
                    borderRadius: '0',
                    cursor: 'pointer',
                    textAlign: 'left',
                    background: 'transparent',
                    boxSizing: 'border-box',
                  }}
                >
                  <span style={{ display: 'flex', width: '34px', justifyContent: 'flex-start', flexShrink: 0 }}>
                    <IconSettingsGear strokeColor="#1E293B" />
                  </span>
                  <span
                    style={{
                      fontFamily: manrope,
                      fontSize: '14px',
                      fontWeight: 700,
                      lineHeight: '20px',
                      letterSpacing: '0.35px',
                      color: '#1E293B',
                      textTransform: 'uppercase',
                      flex: 1,
                    }}
                  >
                    SETTINGS
                  </span>
                  <span
                    aria-hidden
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '28px',
                      height: '28px',
                      borderRadius: '6px',
                      flexShrink: 0,
                      background: '#EEF2F6',
                    }}
                  >
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      style={{ transform: 'rotate(180deg)', transition: 'transform 0.2s ease' }}
                    >
                      <path d="M2.5 4.5L6 8l3.5-3.5" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </button>
              </div>

              <nav
                id="sidebar-settings-menu"
                aria-label="Settings"
                style={{
                  flex: 1,
                  minHeight: 0,
                  overflowY: 'auto',
                  paddingLeft: '48px',
                  paddingRight: '14px',
                  paddingTop: '2px',
                  paddingBottom: '12px',
                }}
              >
                {settingsSubItems.map((sub, idx) => (
                  <SettingsSubLink
                    key={sub.label}
                    label={sub.label}
                    active={sub.match(pathname)}
                    first={idx === 0}
                    variant="light"
                    onClick={() => router.push(sub.href)}
                  />
                ))}
              </nav>
            </div>
          )}
        </div>
        </div>
      </div>

      {/* Footer — Figma 332:2905 profile + 332:2912 logout */}
      <div
        style={{
          flexShrink: 0,
          width: '100%',
          padding: '16px 40px 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '0',
          alignItems: 'center',
          background: '#F1F4F9',
          boxSizing: 'border-box',
        }}
      >
        <div
          style={{
            width: '208px',
            height: '56px',
            borderRadius: '12px',
            background: '#B7DAF5',
            padding: '0 8px 0 8px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            boxSizing: 'border-box',
          }}
        >
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '9999px',
              overflow: 'hidden',
              flexShrink: 0,
              background: '#E2E8F0',
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/nav-user-profile.png" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div style={{ minWidth: 0, flex: 1 }}>
            <div
              style={{
                fontFamily: inter,
                fontSize: '12px',
                fontWeight: 600,
                lineHeight: '16px',
                color: '#191C1E',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              Alex Chen
            </div>
            <div
              style={{
                fontFamily: inter,
                fontSize: '10px',
                fontWeight: 500,
                lineHeight: '20px',
                color: '#64748B',
              }}
            >
              Fleet Director
            </div>
          </div>
        </div>

        <div
          style={{
            width: '100%',
            maxWidth: '246px',
            marginTop: '24px',
            borderTop: '1px solid rgba(195, 198, 214, 0.1)',
            paddingTop: '24px',
            boxSizing: 'border-box',
          }}
        >
          <button
            suppressHydrationWarning
            type="button"
            onClick={() => {
              /* Stub: wire to auth sign-out when available */
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              width: '100%',
              padding: '12px 24px',
              background: 'transparent',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              textAlign: 'left',
              boxSizing: 'border-box',
            }}
          >
            <IconLogout />
            <span
              style={{
                fontFamily: manrope,
                fontSize: '10px',
                fontWeight: 700,
                lineHeight: '15px',
                letterSpacing: '0.5px',
                color: '#434654',
                textTransform: 'uppercase',
              }}
            >
              LOGOUT
            </span>
          </button>
        </div>
      </div>
    </aside>
  );
}
