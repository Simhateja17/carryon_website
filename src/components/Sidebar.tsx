'use client';

import { useRouter, usePathname } from 'next/navigation';

type NavItem = {
  label: string;
  href: string;
  imgSrc: string;
};

const navItems: NavItem[] = [
  { label: 'Command Center', href: '/command-center', imgSrc: '/icon-command.png'   },
  { label: 'Live Map',       href: '/live-map',       imgSrc: '/icon-livemap.png'   },
  { label: 'Orders',         href: '/orders',         imgSrc: '/icon-orders.png'    },
  { label: 'Drivers',        href: '/drivers',        imgSrc: '/icon-drivers.png'   },
  { label: 'Customers',      href: '/customers',      imgSrc: '/icon-customers.png' },
  { label: 'Revenue',        href: '/revenue',        imgSrc: '/icon-revenue.png'   },
];

export default function Sidebar() {
  const router   = useRouter();
  const pathname = usePathname();

  return (
    <aside
      style={{
        width: '220px',
        height: '100vh',
        background: '#fff',
        borderRight: '1px solid #E2E8F0',
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
        overflow: 'hidden',
      }}
    >
      {/* Logo */}
      <div style={{ padding: '20px 20px 16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
        {/* Blue rounded-square truck icon */}
        <div style={{
          width: '44px', height: '44px', borderRadius: '10px',
          background: '#2563EB', flexShrink: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="24" height="18" viewBox="0 0 24 18" fill="none">
            <rect x="0.75" y="3.5" width="13.5" height="10" rx="1.75" stroke="white" strokeWidth="1.6" />
            <path d="M14.25 6.5h4.5l2.75 4.5H14.25V6.5Z" stroke="white" strokeWidth="1.6" strokeLinejoin="round" />
            <circle cx="4.5" cy="15.25" r="1.75" fill="white" />
            <circle cx="14.75" cy="15.25" r="1.75" fill="white" />
          </svg>
        </div>

        {/* Text */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
          <div style={{
            fontFamily: 'Inter', fontSize: '18px', fontWeight: 700,
            color: '#2563EB', lineHeight: '22px', whiteSpace: 'nowrap',
          }}>
            Carry On
          </div>
          <div style={{
            fontFamily: 'Inter', fontSize: '10px', fontWeight: 700,
            color: '#191C1E', letterSpacing: '0.8px', lineHeight: '14px',
            textTransform: 'uppercase', whiteSpace: 'nowrap',
          }}>
            Fleet Management
          </div>
        </div>
      </div>

      {/* Nav items */}
      <div style={{ flex: 1, padding: '8px 12px', display: 'flex', flexDirection: 'column', gap: '2px', overflowY: 'auto' }}>
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <button
              suppressHydrationWarning
              key={item.label}
              onClick={() => router.push(item.href)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '9px 12px',
                width: '100%',
                background: isActive ? 'rgba(37,99,235,0.08)' : 'transparent',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                textAlign: 'left',
              }}
            >
              {/* Icon */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.imgSrc}
                alt={item.label}
                style={{
                  width: '18px',
                  height: '18px',
                  objectFit: 'contain',
                  flexShrink: 0,
                  opacity: isActive ? 1 : 0.55,
                }}
              />

              <span
                style={{
                  fontFamily: 'Inter',
                  fontSize: '14px',
                  fontWeight: isActive ? 600 : 400,
                  lineHeight: '20px',
                  color: isActive ? '#2563EB' : '#374151',
                }}
              >
                {item.label}
              </span>

              {isActive && (
                <span style={{ marginLeft: 'auto', width: '3px', height: '20px', background: '#2563EB', borderRadius: '2px' }} />
              )}
            </button>
          );
        })}
      </div>

      {/* Bottom section */}
      <div style={{ padding: '12px 12px 20px', borderTop: '1px solid #F1F5F9', display: 'flex', flexDirection: 'column', gap: '4px' }}>

        {/* New Dispatch */}
        <button
          suppressHydrationWarning
          style={{
            width: '100%',
            height: '40px',
            borderRadius: '8px',
            background: '#2563EB',
            border: 'none',
            cursor: 'pointer',
            fontFamily: 'Inter',
            fontSize: '13px',
            fontWeight: 700,
            color: '#fff',
            marginBottom: '6px',
          }}
        >
          + New Dispatch
        </button>

        {/* User profile */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 4px' }}>
          <div style={{
            width: '32px', height: '32px', borderRadius: '50%',
            background: '#DBEAFE', overflow: 'hidden', flexShrink: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/nav-user-profile.png" alt="Alex Sterling" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: 'Inter', fontSize: '13px', fontWeight: 600, color: '#0F172A', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              Alex Sterling
            </div>
            <div style={{ fontFamily: 'Inter', fontSize: '11px', color: '#64748B', whiteSpace: 'nowrap' }}>
              Fleet Controller
            </div>
          </div>
        </div>

      </div>
    </aside>
  );
}
