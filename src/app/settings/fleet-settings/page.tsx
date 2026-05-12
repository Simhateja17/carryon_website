'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';
import { getFleetSettings, updateFleetSettings, geocodeCity } from '@/lib/api';
import { formatMoney, ADMIN_DISTANCE_UNIT } from '@/lib/format';
import type { AdminFleetSettingsSnapshot, AdminFleetSettingsUpdatePayload, AdminFleetVehicleClass, AdminFleetRegion } from '@/types';

const inter = "'Inter', sans-serif";

type VehicleIconType = 'bike' | 'car' | 'van' | 'truck';

function iconType(type: string): VehicleIconType {
  if (type === 'BIKE') return 'bike';
  if (type === 'CAR') return 'car';
  if (type.includes('VAN')) return 'van';
  return 'truck';
}

function VehicleIcon({ type }: { type: VehicleIconType }) {
  const icons: Record<VehicleIconType, React.ReactNode> = {
    bike: (
      <svg width="22" height="20" viewBox="0 0 22 20" fill="none">
        <circle cx="4.5" cy="15" r="3.5" stroke="#2563EB" strokeWidth="1.5"/>
        <circle cx="17.5" cy="15" r="3.5" stroke="#2563EB" strokeWidth="1.5"/>
        <path d="M4.5 15L9 6h4l4 9" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 6h5" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="11" cy="5" r="1.5" fill="#2563EB"/>
      </svg>
    ),
    car: (
      <svg width="22" height="16" viewBox="0 0 22 16" fill="none">
        <rect x="1" y="6" width="20" height="7" rx="2" stroke="#2563EB" strokeWidth="1.5"/>
        <path d="M4 6l2.5-4h9l2.5 4" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="5.5" cy="13.5" r="2" fill="#2563EB"/>
        <circle cx="16.5" cy="13.5" r="2" fill="#2563EB"/>
      </svg>
    ),
    van: (
      <svg width="22" height="16" viewBox="0 0 22 16" fill="none">
        <rect x="1" y="4" width="14" height="9" rx="1.5" stroke="#2563EB" strokeWidth="1.5"/>
        <path d="M15 6.5h4l2 4H15V6.5Z" stroke="#2563EB" strokeWidth="1.5" strokeLinejoin="round"/>
        <circle cx="5" cy="14" r="1.8" fill="#2563EB"/>
        <circle cx="14" cy="14" r="1.8" fill="#2563EB"/>
        <circle cx="19" cy="14" r="1.8" fill="#2563EB"/>
      </svg>
    ),
    truck: (
      <svg width="22" height="16" viewBox="0 0 22 16" fill="none">
        <rect x="1" y="3" width="12" height="10" rx="1.5" stroke="#2563EB" strokeWidth="1.5"/>
        <path d="M13 5.5h5l3 5H13V5.5Z" stroke="#2563EB" strokeWidth="1.5" strokeLinejoin="round"/>
        <circle cx="4.5" cy="14" r="1.8" fill="#2563EB"/>
        <circle cx="10.5" cy="14" r="1.8" fill="#2563EB"/>
        <circle cx="18" cy="14" r="1.8" fill="#2563EB"/>
      </svg>
    ),
  };
  return <div style={{ width: 42, height: 42, borderRadius: 10, background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{icons[type]}</div>;
}

function Toggle({ on, onChange, disabled }: { on: boolean; onChange: (v: boolean) => void; disabled?: boolean }) {
  return (
    <button suppressHydrationWarning type="button" disabled={disabled} onClick={() => onChange(!on)} style={{ width: 44, height: 24, borderRadius: 12, background: on ? '#337ADF' : '#CBD5E1', border: 'none', cursor: disabled ? 'not-allowed' : 'pointer', position: 'relative', padding: 0, flexShrink: 0, opacity: disabled ? 0.6 : 1 }}>
      <div style={{ position: 'absolute', top: 3, left: on ? 23 : 3, width: 18, height: 18, borderRadius: '50%', background: '#F1F5F9', boxShadow: '0 1px 2px rgba(15, 23, 42, 0.18)', transition: 'left 0.15s' }} />
    </button>
  );
}

const fallbackSettings: AdminFleetSettingsUpdatePayload = {
  payout: { baseRatePerKm: 1.45, peakMultiplier: 1.5 },
  maintenance: {
    mileageThresholdEnabled: true,
    mileageThresholdKm: 5000,
    emissionCheckEnabled: true,
    telematicsFaultsEnabled: false,
    criticalNotification: 'Fleet Sync Pending',
  },
  regions: [
    { id: 'klang-valley', name: 'Klang Valley', hubCount: 42, zone: 'Greater Kuala Lumpur', enabled: true, latitude: 3.139, longitude: 101.6869, radiusKm: 40 },
    { id: 'penang', name: 'Penang', hubCount: 15, zone: 'Island and Mainland', enabled: true, latitude: 5.4164, longitude: 100.3327, radiusKm: 25 },
  ],
  vehicleClasses: [
    { type: 'BIKE', label: 'Bikes', description: 'Bike routes. Max payload 25kg.', enabled: true, active: 0 },
    { type: 'CAR', label: 'Cars', description: 'Car routes. Max payload 400kg.', enabled: true, active: 0 },
    { type: 'PICKUP', label: 'Pickups', description: 'Pickup routes. Max payload 800kg.', enabled: true, active: 0 },
    { type: 'VAN_7FT', label: '7ft Vans', description: 'Van 7ft routes. Max payload 1,200kg.', enabled: true, active: 0 },
    { type: 'VAN_9FT', label: '9ft Vans', description: 'Van 9ft routes. Max payload 1,600kg.', enabled: true, active: 0 },
    { type: 'LORRY_10FT', label: '10ft Lorries', description: 'Lorry 10ft routes. Max payload 3,000kg.', enabled: true, active: 0 },
    { type: 'LORRY_14FT', label: '14ft Lorries', description: 'Lorry 14ft routes. Max payload 5,000kg.', enabled: true, active: 0 },
    { type: 'LORRY_17FT', label: '17ft Lorries', description: 'Lorry 17ft routes. Max payload 8,000kg.', enabled: true, active: 0 },
  ],
};

export default function FleetSettingsPage() {
  const [snapshot, setSnapshot] = useState<AdminFleetSettingsSnapshot | null>(null);
  const [settings, setSettings] = useState<AdminFleetSettingsUpdatePayload>(fallbackSettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  async function loadFleetSettings() {
    setLoading(true);
    setError('');
    try {
      const res = await getFleetSettings();
      setSnapshot(res.data);
      setSettings(res.data.settings);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load fleet settings');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadFleetSettings();
  }, []);

  async function saveFleetSettings() {
    setSaving(true);
    setError('');
    setStatus('');
    try {
      const res = await updateFleetSettings(settings);
      setSettings(res.data);
      setStatus('Fleet settings saved.');
      await loadFleetSettings();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save fleet settings');
    } finally {
      setSaving(false);
    }
  }

  const enabledRegions = useMemo(() => settings.regions.filter((region) => region.enabled), [settings.regions]);

  function setPayout(key: keyof AdminFleetSettingsUpdatePayload['payout'], value: string) {
    const next = Number(value);
    setSettings((prev) => ({ ...prev, payout: { ...prev.payout, [key]: Number.isFinite(next) ? next : 0 } }));
  }

  function setMaintenance(key: keyof AdminFleetSettingsUpdatePayload['maintenance'], value: boolean | number | string) {
    setSettings((prev) => ({ ...prev, maintenance: { ...prev.maintenance, [key]: value } }));
  }

  function setVehicleClass(index: number, patch: Partial<AdminFleetVehicleClass>) {
    setSettings((prev) => ({
      ...prev,
      vehicleClasses: prev.vehicleClasses.map((entry, i) => i === index ? { ...entry, ...patch } : entry),
    }));
  }

  function updateRegion(index: number, patch: Partial<AdminFleetRegion>) {
    setSettings((prev) => ({
      ...prev,
      regions: prev.regions.map((r, i) => i === index ? { ...r, ...patch } : r),
    }));
  }

  function addRegion() {
    setSettings((prev) => ({
      ...prev,
      regions: [
        ...prev.regions,
        { id: `region-${Date.now()}`, name: '', hubCount: 0, zone: '', enabled: true, latitude: null, longitude: null, radiusKm: 30 },
      ],
    }));
  }

  function deleteRegion(index: number) {
    setSettings((prev) => ({
      ...prev,
      regions: prev.regions.filter((_, i) => i !== index),
    }));
  }

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: '#F8FAFC', fontFamily: inter }}>
      <Sidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minWidth: 0 }}>
        <Navbar />
        <main style={{ flex: 1, padding: '28px', overflowY: 'auto', boxSizing: 'border-box' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, alignItems: 'flex-start', marginBottom: 24 }}>
            <div>
              <h1 style={{ margin: '0 0 6px', fontSize: 26, fontWeight: 800, color: '#0F172A', letterSpacing: '-0.3px' }}>Fleet Infrastructure</h1>
              <p style={{ margin: 0, fontSize: 13, color: '#64748B', lineHeight: 1.6, maxWidth: 620 }}>
                Configure live CarryOn fleet classes, payout policy, maintenance automation, and operating regions. Admin policy is fixed to MYR and {ADMIN_DISTANCE_UNIT}.
              </p>
            </div>
            <button suppressHydrationWarning type="button" onClick={saveFleetSettings} disabled={saving || loading} style={{ minWidth: 148, height: 42, borderRadius: 10, background: '#2563EB', border: 'none', color: '#fff', fontSize: 13, fontWeight: 800, cursor: saving || loading ? 'not-allowed' : 'pointer', opacity: saving || loading ? 0.65 : 1 }}>
              {saving ? 'Saving...' : 'Save Settings'}
            </button>
          </div>

          {(loading || error || status) && (
            <div style={{ marginBottom: 16, padding: '12px 14px', borderRadius: 10, border: `1px solid ${error ? '#FCA5A5' : '#BFDBFE'}`, background: error ? '#FEF2F2' : '#EFF6FF', color: error ? '#B91C1C' : '#1D4ED8', fontSize: 13, fontWeight: 700 }}>
              {loading ? 'Loading fleet settings...' : error || status}
            </div>
          )}

          <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
            <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
              <section style={cardStyle}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
                  <span style={sectionTitleStyle}>Vehicle Categories</span>
                  <span style={{ fontSize: 11, fontWeight: 800, color: '#2563EB', letterSpacing: 0.5 }}>CANONICAL CATALOG</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: 12 }}>
                  {settings.vehicleClasses.map((v, index) => (
                    <div key={v.type} style={{ background: '#F8FAFC', borderRadius: 10, border: '1px solid #E2E8F0', padding: 16 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                        <VehicleIcon type={iconType(v.type)} />
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <span style={{ display: 'inline-flex', alignItems: 'center', padding: '2px 10px', borderRadius: 999, background: '#DBEAFE', fontSize: 11, fontWeight: 800, color: '#1D4ED8' }}>
                            {v.active ?? 0} Active
                          </span>
                          <Toggle on={v.enabled} onChange={(enabled) => setVehicleClass(index, { enabled })} disabled={saving} />
                        </div>
                      </div>
                      <input suppressHydrationWarning value={v.label} onChange={(e) => setVehicleClass(index, { label: e.target.value })} style={textInputStyle} />
                      <textarea suppressHydrationWarning value={v.description} onChange={(e) => setVehicleClass(index, { description: e.target.value })} style={{ ...textInputStyle, height: 58, resize: 'vertical', marginTop: 8, color: '#2563EB', fontSize: 11, lineHeight: 1.45 }} />
                    </div>
                  ))}
                </div>
              </section>

              <section style={cardStyle}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                  <span style={sectionTitleStyle}>Operational Regions</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: '#64748B' }}>{enabledRegions.length} enabled</span>
                    <button type="button" onClick={addRegion} disabled={saving || settings.regions.length >= 50} style={{ padding: '6px 14px', borderRadius: 8, background: '#EFF6FF', border: '1px solid #BFDBFE', fontSize: 12, fontWeight: 800, color: '#2563EB', cursor: 'pointer' }}>
                      + Add Region
                    </button>
                  </div>
                </div>
                {settings.regions.map((region, index) => (
                  <RegionRow
                    key={`${region.id}-${index}`}
                    region={region}
                    index={index}
                    total={settings.regions.length}
                    saving={saving}
                    onUpdate={(patch) => updateRegion(index, patch)}
                    onDelete={() => deleteRegion(index)}
                  />
                ))}
                {settings.regions.length === 0 && (
                  <div style={{ padding: '24px 0', textAlign: 'center', fontSize: 13, color: '#94A3B8' }}>
                    No regions configured. Add a region to define your service area.
                  </div>
                )}
              </section>
            </div>

            <div style={{ width: 320, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
              <section style={cardStyle}>
                <div style={sectionTitleStyle}>Payout Rates</div>
                <label style={labelStyle}>BASE RATE / {ADMIN_DISTANCE_UNIT.toUpperCase()}</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, height: 44, padding: '0 14px', background: '#DBEAFE', border: '1.5px solid #BFDBFE', borderRadius: 8, margin: '8px 0 16px' }}>
                  <span style={{ fontSize: 13, fontWeight: 800, color: '#2563EB' }}>MYR</span>
                  <input suppressHydrationWarning type="number" step="0.01" value={settings.payout.baseRatePerKm} onChange={(e) => setPayout('baseRatePerKm', e.target.value)} style={{ flex: 1, border: 'none', background: 'transparent', fontSize: 18, fontWeight: 800, color: '#0F172A', outline: 'none', minWidth: 0 }} />
                </div>
                <label style={labelStyle}>PEAK MULTIPLIER</label>
                <input suppressHydrationWarning type="number" step="0.01" value={settings.payout.peakMultiplier} onChange={(e) => setPayout('peakMultiplier', e.target.value)} style={{ ...textInputStyle, fontSize: 22, fontWeight: 800, color: '#2563EB', textAlign: 'right', margin: '8px 0 14px' }} />
                <div style={{ fontSize: 12, color: '#64748B', lineHeight: 1.5 }}>Current base payout: <strong>{formatMoney(settings.payout.baseRatePerKm)}</strong> per {ADMIN_DISTANCE_UNIT}.</div>
              </section>

              <section style={{ ...cardStyle, borderRadius: 14, padding: 28 }}>
                <div style={{ fontSize: 31, fontWeight: 800, color: '#0F172A', marginBottom: 26, lineHeight: 1.08, letterSpacing: '-0.4px' }}>Maintenance Logic</div>
                {[
                  { key: 'mileageThresholdEnabled' as const, label: 'Mileage Threshold', sub: `Auto-alert every ${settings.maintenance.mileageThresholdKm.toLocaleString('en-MY')} km`, on: settings.maintenance.mileageThresholdEnabled },
                  { key: 'emissionCheckEnabled' as const, label: 'Emission Check', sub: 'Annual regulatory alert', on: settings.maintenance.emissionCheckEnabled },
                  { key: 'telematicsFaultsEnabled' as const, label: 'Telematics Faults', sub: 'Real-time engine alerts', on: settings.maintenance.telematicsFaultsEnabled },
                ].map((item, index) => (
                  <div key={item.key} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, paddingBottom: index < 2 ? 20 : 0, marginBottom: index < 2 ? 20 : 0, borderBottom: index < 2 ? '1px solid #EFF3F8' : 'none' }}>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 800, color: '#0F172A', marginBottom: 4, lineHeight: 1.18 }}>{item.label}</div>
                      <div style={{ fontSize: 12, color: '#2E74D7', lineHeight: 1.2 }}>{item.sub}</div>
                    </div>
                    <Toggle on={item.on} onChange={(value) => setMaintenance(item.key, value)} disabled={saving} />
                  </div>
                ))}
                <label style={{ ...labelStyle, marginTop: 22 }}>THRESHOLD KM</label>
                <input suppressHydrationWarning type="number" value={settings.maintenance.mileageThresholdKm} onChange={(e) => setMaintenance('mileageThresholdKm', Number(e.target.value))} style={{ ...textInputStyle, marginTop: 8 }} />

                <div style={{ marginTop: 28, paddingTop: 24, borderTop: '2px solid #ECEFF4' }}>
                  <label style={labelStyle}>CRITICAL NOTIFICATION</label>
                  <input suppressHydrationWarning value={settings.maintenance.criticalNotification} onChange={(e) => setMaintenance('criticalNotification', e.target.value)} style={{ ...textInputStyle, marginTop: 10 }} />
                  <div style={{ marginTop: 14, background: '#DBEAFE', borderRadius: 14, padding: 18, display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                    <svg width="28" height="28" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: 2 }}><path d="M8 2L14.5 13H1.5L8 2Z" stroke="#2C79DE" strokeWidth="1.4" strokeLinejoin="round"/><path d="M8 6.5v3M8 11v.5" stroke="#2C79DE" strokeWidth="1.4" strokeLinecap="round"/></svg>
                    <div>
                      <div style={{ fontSize: 15, fontWeight: 800, color: '#2C79DE', marginBottom: 4, lineHeight: 1.15 }}>{settings.maintenance.criticalNotification}</div>
                      <div style={{ fontSize: 12, color: '#2C79DE', lineHeight: 1.35 }}>Latest policy will be persisted to AdminSetting and audited.</div>
                    </div>
                  </div>
                </div>
              </section>

              <section style={cardStyle}>
                <div style={sectionTitleStyle}>Recent Fleet Audits</div>
                {(snapshot?.auditItems.length ? snapshot.auditItems : [{ icon: 'edit' as const, text: 'No fleet settings updates yet', time: 'Now' }]).map((item, index) => (
                  <div key={`${item.text}-${index}`} style={{ padding: '12px 0', borderBottom: index === 0 ? '1px solid #F1F5F9' : 'none', fontSize: 12, color: '#64748B' }}>
                    <strong style={{ display: 'block', color: '#0F172A', fontSize: 13 }}>{item.text}</strong>
                    {item.time}
                  </div>
                ))}
              </section>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function RegionRow({
  region,
  index,
  total,
  saving,
  onUpdate,
  onDelete,
}: {
  region: AdminFleetRegion;
  index: number;
  total: number;
  saving: boolean;
  onUpdate: (patch: Partial<AdminFleetRegion>) => void;
  onDelete: () => void;
}) {
  const [searching, setSearching] = useState(false);
  const [searchError, setSearchError] = useState('');
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const hasGeo = region.latitude != null && region.longitude != null;

  function handleNameChange(value: string) {
    const id = value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || region.id;
    onUpdate({ name: value, id });

    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (value.trim().length < 2) return;

    debounceRef.current = setTimeout(async () => {
      setSearching(true);
      setSearchError('');
      try {
        const res = await geocodeCity(value.trim());
        onUpdate({
          name: value,
          id,
          latitude: res.data.latitude,
          longitude: res.data.longitude,
          zone: res.data.region || res.data.country || region.zone,
        });
      } catch {
        setSearchError('Could not resolve location');
      } finally {
        setSearching(false);
      }
    }, 800);
  }

  return (
    <div style={{ padding: '16px 0', borderTop: index === 0 ? '1px solid #F1F5F9' : 'none', borderBottom: index < total - 1 ? '1px solid #F1F5F9' : 'none' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '38px 1fr 100px 56px 32px', alignItems: 'center', gap: 12 }}>
        <div style={{ width: 38, height: 38, borderRadius: 10, background: hasGeo ? '#DCFCE7' : '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 1C6.239 1 4 3.239 4 6c0 4.5 5 11 5 11s5-6.5 5-11c0-2.761-2.239-5-5-5Z" stroke={hasGeo ? '#16A34A' : '#2563EB'} strokeWidth="1.5"/><circle cx="9" cy="6" r="2" fill={hasGeo ? '#16A34A' : '#2563EB'}/></svg>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <input
            suppressHydrationWarning
            value={region.name}
            onChange={(e) => handleNameChange(e.target.value)}
            placeholder="Type a city name..."
            style={textInputStyle}
          />
          {searching && <span style={{ fontSize: 11, color: '#64748B' }}>Resolving location...</span>}
          {searchError && <span style={{ fontSize: 11, color: '#EF4444' }}>{searchError}</span>}
        </div>
        <input
          suppressHydrationWarning
          type="number"
          min={1}
          max={200}
          value={region.radiusKm ?? 30}
          onChange={(e) => onUpdate({ radiusKm: Number(e.target.value) || 30 })}
          title="Radius in km"
          style={{ ...textInputStyle, textAlign: 'center' }}
        />
        <Toggle on={region.enabled} onChange={(enabled) => onUpdate({ enabled })} disabled={saving} />
        <button
          type="button"
          onClick={onDelete}
          disabled={saving}
          title="Remove region"
          style={{ width: 28, height: 28, borderRadius: 6, border: '1px solid #FCA5A5', background: '#FEF2F2', color: '#DC2626', fontSize: 16, fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0 }}
        >
          x
        </button>
      </div>
      {hasGeo && (
        <div style={{ marginTop: 8, marginLeft: 50, display: 'flex', gap: 16, fontSize: 11, color: '#64748B' }}>
          <span>{region.latitude!.toFixed(4)}, {region.longitude!.toFixed(4)}</span>
          <span>{region.radiusKm ?? 30} km radius</span>
          {region.zone && <span>{region.zone}</span>}
        </div>
      )}
      {!hasGeo && region.name && (
        <div style={{ marginTop: 6, marginLeft: 50, fontSize: 11, color: '#F59E0B', fontWeight: 700 }}>
          No coordinates — type a city name to auto-resolve
        </div>
      )}
    </div>
  );
}

const cardStyle: React.CSSProperties = {
  background: '#fff',
  borderRadius: 12,
  border: '1px solid #E2E8F0',
  padding: '22px 24px',
};

const sectionTitleStyle: React.CSSProperties = {
  fontSize: 15,
  fontWeight: 800,
  color: '#0F172A',
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: 10,
  fontWeight: 800,
  color: '#94A3B8',
  letterSpacing: 0.6,
};

const textInputStyle: React.CSSProperties = {
  width: '100%',
  minWidth: 0,
  boxSizing: 'border-box',
  padding: '8px 10px',
  borderRadius: 8,
  border: '1px solid #E2E8F0',
  background: '#FFFFFF',
  fontFamily: inter,
  fontSize: 13,
  fontWeight: 700,
  color: '#0F172A',
  outline: 'none',
};
