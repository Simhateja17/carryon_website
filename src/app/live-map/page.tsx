'use client';

import { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import MapSurface from '@/components/MapSurface';
import AdminDataStatus from '@/components/AdminDataStatus';
import { getLiveMapDashboard } from '@/lib/api';
import type { LiveMapAlert, LiveMapDashboardSnapshot, LiveMapFeaturedDispatch } from '@/types';
import { useAdminPolling } from '@/lib/useAdminPolling';

function formatCount(value: number) {
  return value < 10 ? String(value).padStart(2, '0') : String(value);
}

function initials(name: string) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase() || 'DR';
}

function FleetStatusCard({ snapshot, stale }: { snapshot: LiveMapDashboardSnapshot | null; stale: boolean }) {
  const stats = snapshot?.stats;
  const rows = [
    { label: 'ACTIVE', value: formatCount(stats?.active ?? 0) },
    { label: 'DELAYED', value: formatCount(stats?.delayed ?? 0) },
    { label: 'IDLE', value: formatCount(stats?.idle ?? 0) },
    { label: 'EN ROUTE', value: formatCount(stats?.enRoute ?? 0) },
  ];

  return (
    <div style={{
      width: '288px',
      borderRadius: '16px',
      background: 'rgba(255,255,255,0.94)',
      border: '1px solid rgba(148,163,184,0.35)',
      boxShadow: '0 18px 36px rgba(15,23,42,0.12)',
      padding: '16px',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 4px' }}>
        <span style={{ fontFamily: 'Manrope, Inter, sans-serif', fontSize: '14px', fontWeight: 800, color: '#0F172A', lineHeight: '20px' }}>
          Fleet Status
        </span>
        <span style={{ fontFamily: 'Inter', fontSize: '10px', fontWeight: 700, color: stale ? '#D97706' : '#2563EB', lineHeight: '15px' }}>
          {stale ? 'STALE' : 'REAL-TIME'}
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
        {rows.map(({ label, value }) => (
          <div key={label} style={{
            display: 'flex',
            padding: '12px',
            flexDirection: 'column',
            borderRadius: '12px',
            background: '#F8FAFC',
            border: '1px solid #E2E8F0',
          }}>
            <div style={{ fontFamily: 'Inter', fontSize: '10px', fontWeight: 700, color: '#334155', lineHeight: '15px', textTransform: 'uppercase', marginBottom: '4px' }}>
              {label}
            </div>
            <div style={{ fontFamily: 'Manrope, Inter, sans-serif', fontSize: '24px', fontWeight: 800, color: '#2563EB', lineHeight: '32px' }}>
              {value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ActiveAlertsCard({ alerts }: { alerts: LiveMapAlert[] }) {
  const visibleAlerts = alerts.length ? alerts : [{
    id: 'no-open-alerts',
    type: 'NO OPEN ALERTS',
    severity: 'info',
    title: 'Fleet operating normally',
    detail: 'No route delay, deviation, or control-event alerts found',
    occurredAt: new Date().toISOString(),
    timeLabel: 'now',
    bookingId: '',
    driverId: null,
  }];

  return (
    <div style={{
      width: '288px',
      borderRadius: '16px',
      border: '1px solid rgba(148,163,184,0.35)',
      background: 'rgba(255,255,255,0.94)',
      boxShadow: '0 18px 36px rgba(15,23,42,0.12)',
      padding: '16px',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      boxSizing: 'border-box',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontFamily: 'Inter', fontSize: '14px', fontWeight: 800, color: '#0F172A' }}>
          Active Alerts
        </span>
        <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: alerts.length ? '#2563EB' : '#16A34A', display: 'inline-block' }} />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {visibleAlerts.slice(0, 3).map((alert, index) => {
          const isCritical = alert.severity === 'critical';
          return (
            <div key={alert.id} style={{
              display: 'flex',
              padding: '12px',
              flexDirection: 'column',
              gap: '4px',
              borderRadius: '12px',
              background: index === 0 && alerts.length ? 'rgba(37,99,235,0.08)' : '#F8FAFC',
              border: index === 0 && alerts.length ? '1px solid #2563EB' : '1px solid #E2E8F0',
              boxSizing: 'border-box',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '8px' }}>
                <span style={{ fontFamily: 'Inter', fontSize: '10px', fontWeight: 700, lineHeight: '15px', color: isCritical ? '#DC2626' : '#2563EB', textTransform: 'uppercase' }}>
                  {alert.type}
                </span>
                <span style={{ fontFamily: 'Inter', fontSize: '10px', fontWeight: 500, lineHeight: '15px', color: '#64748B', whiteSpace: 'nowrap' }}>
                  {alert.timeLabel || ''}
                </span>
              </div>
              <div style={{ fontFamily: 'Inter', fontSize: '12px', fontWeight: 700, color: '#0F172A', lineHeight: '16px' }}>
                {alert.title}
              </div>
              <div style={{ fontFamily: 'Inter', fontSize: '10px', fontWeight: 500, lineHeight: '15px', color: '#475569' }}>
                {alert.detail}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function DriverPopup({ dispatch, onMessage }: {
  dispatch: LiveMapFeaturedDispatch | null;
  onMessage: () => void;
}) {
  if (!dispatch) return null;
  const progress = Math.max(0, Math.min(100, Math.round(dispatch.routeProgressPercent)));

  return (
    <div style={{ position: 'absolute', top: '24px', right: '24px', display: 'flex', flexDirection: 'column', width: '320px', gap: '16px' }}>
      <div style={{
        borderRadius: '16px',
        background: 'rgba(255,255,255,0.94)',
        border: '1px solid rgba(148,163,184,0.35)',
        boxShadow: '0 18px 36px rgba(15,23,42,0.14)',
        padding: '20px',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '9999px',
            overflow: 'hidden',
            flexShrink: 0,
            border: '2px solid #FFFFFF',
            background: '#DBEAFE',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'Manrope, Inter, sans-serif',
            fontSize: '14px',
            fontWeight: 800,
            color: '#2563EB',
          }}>
            {dispatch.driver.photo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={dispatch.driver.photo} alt={dispatch.driver.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : initials(dispatch.driver.name)}
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: 'Manrope, Inter, sans-serif', fontSize: '14px', fontWeight: 800, lineHeight: '20px', color: '#191C1E', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {dispatch.driver.name}
            </div>
            <div style={{ fontFamily: 'Inter', fontSize: '12px', fontWeight: 500, color: '#64748B', lineHeight: '16px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {dispatch.orderCode || dispatch.bookingId}
            </div>
          </div>

          <div style={{ minWidth: '58px', height: '31px', padding: '0 10px', borderRadius: '6px', background: dispatch.driver.isOnline ? '#DBEAFE' : '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <span style={{ fontFamily: 'Inter', fontSize: '9px', fontWeight: 800, color: dispatch.driver.isOnline ? '#2563EB' : '#64748B', lineHeight: '11px', textAlign: 'center' }}>
              {dispatch.dutyLabel}
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontFamily: 'Inter', fontSize: '10px', fontWeight: 700, color: '#5F6B7A', textTransform: 'uppercase' }}>
              Route Progress
            </span>
            <span style={{ fontFamily: 'Inter', fontSize: '10px', fontWeight: 800, color: '#2563EB' }}>{progress}%</span>
          </div>
          <div style={{ height: '6px', borderRadius: '9999px', background: '#E2E8F0', overflow: 'hidden' }}>
            <div style={{ width: `${progress}%`, height: '100%', borderRadius: '9999px', background: '#2563EB' }} />
          </div>
        </div>

        <div style={{ height: '1px', background: '#E2E8F0' }} />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', columnGap: '16px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', minWidth: 0 }}>
            <span style={{ color: '#5F6B7A', fontFamily: 'Inter', fontSize: '10px', fontWeight: 700, lineHeight: '15px', textTransform: 'uppercase' }}>
              Vehicle
            </span>
            <span style={{ color: '#191C1E', fontFamily: 'Inter', fontSize: '12px', fontWeight: 700, lineHeight: '16px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {dispatch.vehicle.label}
            </span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', minWidth: 0 }}>
            <span style={{ color: '#5F6B7A', fontFamily: 'Inter', fontSize: '10px', fontWeight: 700, lineHeight: '15px', textTransform: 'uppercase' }}>
              Next Stop
            </span>
            <span style={{ color: '#191C1E', fontFamily: 'Inter', fontSize: '12px', fontWeight: 700, lineHeight: '16px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {dispatch.nextStop}
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px', marginTop: 'auto' }}>
          <button suppressHydrationWarning onClick={onMessage} style={{ flex: '1 0 0', height: '40px', borderRadius: '10px', background: '#2563EB', border: 'none', fontFamily: 'Inter', fontSize: '13px', fontWeight: 700, color: '#FFFFFF', cursor: 'pointer' }}>
            Message
          </button>
        </div>
      </div>
    </div>
  );
}

function MapControls() {
  return (
    <div style={{ position: 'absolute', bottom: '80px', left: '24px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
      {[
        { label: '+', title: 'Zoom in' },
        { label: '-', title: 'Zoom out' },
      ].map(({ label, title }) => (
        <button key={label} suppressHydrationWarning title={title} style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(255,255,255,0.94)', border: '1px solid #E2E8F0', fontFamily: 'Inter', fontSize: '18px', fontWeight: 500, color: '#374151', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.12)' }}>
          {label}
        </button>
      ))}
    </div>
  );
}

export default function LiveMapPage() {
  const router = useRouter();
  const dashboardState = useAdminPolling<LiveMapDashboardSnapshot>(
    async () => (await getLiveMapDashboard()).data,
    { intervalMs: 12_000 }
  );
  const snapshot = dashboardState.data;

  const routes = useMemo(() => (snapshot?.bookings || []).map((booking) => ({
    id: booking.bookingId,
    path: [booking.route.pickup, booking.route.dropoff].filter(Boolean) as Array<{ lat: number; lng: number }>,
    tone: 'planned' as const,
  })), [snapshot]);

  const markers = useMemo(() => (snapshot?.drivers || []).map((driver) => ({
    id: driver.id,
    position: driver.position,
    label: driver.name || 'D',
    tone: 'driver' as const,
  })), [snapshot]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minWidth: '1244px', minHeight: '1024px', width: '100vw', height: '100vh', overflow: 'auto', fontFamily: 'Inter, sans-serif', background: '#F7F9FB' }}>
      <Navbar />

      <div style={{ flex: 1, display: 'flex', overflow: 'hidden', minHeight: '960px' }}>
        <Sidebar />

        <div style={{ flex: 1, minWidth: '1024px', minHeight: '960px', position: 'relative', overflow: 'hidden', background: '#DDEAF6' }}>
          <div style={{ position: 'absolute', inset: 0 }}>
            <MapSurface
              theme="light"
              minHeight="100%"
              markers={markers}
              routes={routes}
              fallback={<div style={{ width: '100%', height: '100%', background: 'url(/blue_map.png) lightgray 0px 0px / cover no-repeat' }} />}
            />
          </div>

          <div style={{ position: 'absolute', top: '24px', left: '24px', display: 'inline-flex', flexDirection: 'column', alignItems: 'flex-start', gap: '8px', maxHeight: 'calc(100% - 48px)', overflowY: 'auto' }}>
            <FleetStatusCard snapshot={snapshot} stale={dashboardState.stale} />
            <ActiveAlertsCard alerts={snapshot?.activeAlerts || []} />
          </div>

          {(dashboardState.stale || dashboardState.error) && (
            <div style={{ position: 'absolute', top: '24px', left: '332px', width: '360px' }}>
              <AdminDataStatus error={dashboardState.error} stale={dashboardState.stale} lastUpdated={dashboardState.lastUpdated} />
            </div>
          )}

          <DriverPopup
            dispatch={snapshot?.featuredDispatch || null}
            onMessage={() => router.push('/fleet-messenger')}
          />

          <MapControls />

        </div>
      </div>
    </div>
  );
}
