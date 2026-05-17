'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';
import MapSurface from '@/components/MapSurface';
import { getFleetCitySuggestions, getFleetSettings, updateFleetSettings } from '@/lib/api';
import { getFleetCoverageCenter, getFleetSettingsDraftError, isResolvedFleetRegion, normalizeFleetSettingsDraft, regionIdFromName, toFleetRegionCoverage, toFleetSettingsSavePayload } from '@/lib/fleetSettings';
import { REGION_RADIUS_KM_MAX, REGION_RADIUS_KM_MIN } from '@/lib/fleetSettingsContract';
import { ADMIN_DISTANCE_UNIT } from '@/lib/format';
import type { MapSurfaceCircle } from '@/components/MapSurface';
import type { AdminFleetSettingsSnapshot, AdminFleetSettingsUpdatePayload, AdminFleetVehicleClass, AdminFleetRegion } from '@/types';

const inter = "'Inter', sans-serif";

interface PlacePrediction {
  placeId: string;
  description: string;
  mainText: string;
  latitude: number;
  longitude: number;
  zone: string;
}

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
  regions: [
    { id: 'klang-valley', name: 'Klang Valley', hubCount: 42, zone: 'Greater Kuala Lumpur', enabled: true, latitude: 3.139, longitude: 101.6869, radiusKm: 40 },
    { id: 'penang', name: 'Penang', hubCount: 15, zone: 'Island and Mainland', enabled: true, latitude: 5.4164, longitude: 100.3327, radiusKm: 25 },
  ],
  vehicleClasses: [
    { type: 'BIKE', label: 'Bikes', description: 'Bike routes. Max payload 25kg.', enabled: true, pricePerKm: 0.90, active: 0 },
    { type: 'CAR', label: 'Cars', description: 'Car routes. Max payload 400kg.', enabled: true, pricePerKm: 1.17, active: 0 },
    { type: 'PICKUP', label: 'Pickups', description: 'Pickup routes. Max payload 800kg.', enabled: true, pricePerKm: 3.40, active: 0 },
    { type: 'VAN_7FT', label: '7ft Vans', description: 'Van 7ft routes. Max payload 1,200kg.', enabled: true, pricePerKm: 5.40, active: 0 },
    { type: 'VAN_9FT', label: '9ft Vans', description: 'Van 9ft routes. Max payload 1,600kg.', enabled: true, pricePerKm: 6.40, active: 0 },
    { type: 'LORRY_10FT', label: '10ft Lorries', description: 'Lorry 10ft routes. Max payload 3,000kg.', enabled: true, pricePerKm: 8.23, active: 0 },
    { type: 'LORRY_14FT', label: '14ft Lorries', description: 'Lorry 14ft routes. Max payload 5,000kg.', enabled: true, pricePerKm: 11.60, active: 0 },
    { type: 'LORRY_17FT', label: '17ft Lorries', description: 'Lorry 17ft routes. Max payload 8,000kg.', enabled: true, pricePerKm: 15.60, active: 0 },
  ],
};

export default function FleetSettingsPage() {
  const [snapshot, setSnapshot] = useState<AdminFleetSettingsSnapshot | null>(null);
  const [settings, setSettings] = useState<AdminFleetSettingsUpdatePayload>(fallbackSettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [selectedRegionId, setSelectedRegionId] = useState<string | null>(null);

  async function loadFleetSettings() {
    setLoading(true);
    setError('');
    try {
      const res = await getFleetSettings();
      setSnapshot(res.data);
      setSettings(normalizeFleetSettingsDraft(res.data.settings));
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
    const draftError = getFleetSettingsDraftError(settings);
    if (draftError) {
      setError(draftError);
      setSaving(false);
      return;
    }
    try {
      const res = await updateFleetSettings(toFleetSettingsSavePayload(settings));
      setSettings(normalizeFleetSettingsDraft(res.data));
      setStatus('Fleet settings saved.');
      await loadFleetSettings();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save fleet settings');
    } finally {
      setSaving(false);
    }
  }

  const enabledRegions = useMemo(() => settings.regions.filter((region) => region.enabled), [settings.regions]);
  const regionCoverages = useMemo(() => toFleetRegionCoverage(settings.regions), [settings.regions]);
  const coverageCenter = useMemo(() => getFleetCoverageCenter(regionCoverages), [regionCoverages]);
  const coverageCircles = useMemo<MapSurfaceCircle[]>(() => regionCoverages.map((coverage) => ({
    id: coverage.id,
    center: coverage.center,
    radiusMeters: coverage.radiusMeters,
    label: coverage.label,
    detail: coverage.detail,
    tone: 'coverage',
  })), [regionCoverages]);

  function setVehicleClass(index: number, patch: Partial<AdminFleetVehicleClass>) {
    setSettings((prev) => ({
      ...prev,
      vehicleClasses: prev.vehicleClasses.map((entry, i) => i === index ? { ...entry, ...patch } : entry),
    }));
  }

  function updateRegion(index: number, patch: Partial<AdminFleetRegion>) {
    const currentRegion = settings.regions[index];
    if (patch.id && currentRegion?.id === selectedRegionId) {
      setSelectedRegionId(patch.id);
    }
    setSettings((prev) => ({
      ...prev,
      regions: prev.regions.map((r, i) => i === index ? { ...r, ...patch } : r),
    }));
  }

  function addRegion() {
    const id = `region-${Date.now()}`;
    setSelectedRegionId(id);
    setSettings((prev) => ({
      ...prev,
      regions: [
        ...prev.regions,
        { id, name: '', hubCount: 0, zone: '', enabled: true, latitude: null, longitude: null, radiusKm: 30 },
      ],
    }));
  }

  function deleteRegion(index: number) {
    const currentRegion = settings.regions[index];
    if (currentRegion?.id === selectedRegionId) {
      setSelectedRegionId(null);
    }
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
                Configure live CarryOn fleet classes, per-vehicle pricing, and operating regions. Admin policy is fixed to MYR and {ADMIN_DISTANCE_UNIT}.
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
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 10, padding: '6px 10px', background: '#DBEAFE', border: '1px solid #BFDBFE', borderRadius: 8 }}>
                        <span style={{ fontSize: 11, fontWeight: 800, color: '#2563EB', whiteSpace: 'nowrap' }}>RM</span>
                        <input
                          suppressHydrationWarning
                          type="number"
                          step="0.01"
                          min={0.10}
                          max={50}
                          value={Number.isFinite(v.pricePerKm) ? v.pricePerKm : ''}
                          onChange={(e) => {
                            const val = Number(e.target.value);
                            if (Number.isFinite(val)) setVehicleClass(index, { pricePerKm: val });
                          }}
                          disabled={saving}
                          style={{ flex: 1, border: 'none', background: 'transparent', fontSize: 15, fontWeight: 800, color: '#0F172A', outline: 'none', minWidth: 0, textAlign: 'right' }}
                        />
                        <span style={{ fontSize: 10, fontWeight: 700, color: '#64748B', whiteSpace: 'nowrap' }}>/ {ADMIN_DISTANCE_UNIT}</span>
                      </div>
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
                <OperationalCoverageMap
                  circles={coverageCircles}
                  center={coverageCenter}
                  selectedRegionId={selectedRegionId}
                  coverages={regionCoverages}
                />
                {settings.regions.map((region, index) => (
                  <RegionRow
                    key={region.id}
                    region={region}
                    index={index}
                    total={settings.regions.length}
                    saving={saving}
                    selected={selectedRegionId === region.id}
                    onSelect={() => setSelectedRegionId(region.id)}
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

function OperationalCoverageMap({
  circles,
  center,
  selectedRegionId,
  coverages,
}: {
  circles: MapSurfaceCircle[];
  center: { lat: number; lng: number } | null;
  selectedRegionId: string | null;
  coverages: ReturnType<typeof toFleetRegionCoverage>;
}) {
  if (circles.length === 0) {
    return (
      <div style={coverageShellStyle}>
        <div style={{ padding: 18 }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: '#0F172A', marginBottom: 4 }}>No active coverage areas</div>
          <div style={{ fontSize: 12, fontWeight: 600, color: '#64748B' }}>Enable a resolved region to visualize service coverage.</div>
        </div>
      </div>
    );
  }

  return (
    <div style={coverageShellStyle}>
      <div style={{ height: 300, position: 'relative', overflow: 'hidden', borderRadius: 8, background: '#DDEAF6' }}>
        <MapSurface
          circles={circles}
          highlightedCircleId={selectedRegionId}
          center={center}
          zoom={8}
          height="100%"
          minHeight={300}
          fallback={<CoverageFallback coverages={coverages} />}
        />
        <div style={{ position: 'absolute', left: 14, top: 14, display: 'flex', alignItems: 'center', gap: 8, padding: '8px 10px', borderRadius: 8, background: 'rgba(255,255,255,0.92)', border: '1px solid rgba(226,232,240,0.9)', boxShadow: '0 8px 20px rgba(15,23,42,0.08)' }}>
          <span style={{ width: 9, height: 9, borderRadius: 99, background: '#2563EB', display: 'inline-block' }} />
          <span style={{ fontSize: 12, fontWeight: 800, color: '#0F172A' }}>{circles.length} coverage {circles.length === 1 ? 'area' : 'areas'}</span>
        </div>
      </div>
    </div>
  );
}

function CoverageFallback({ coverages }: { coverages: ReturnType<typeof toFleetRegionCoverage> }) {
  return (
    <div style={{ height: '100%', minHeight: 300, background: 'linear-gradient(135deg, #EAF2FF, #F8FAFC)', padding: 16, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div style={{ fontSize: 12, fontWeight: 800, color: '#B45309', padding: '8px 10px', borderRadius: 8, background: '#FEF3C7', border: '1px solid #FDE68A' }}>
        Google Maps unavailable. Set a referrer-restricted NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to enable live coverage circles.
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: 10, overflowY: 'auto' }}>
        {coverages.map((coverage) => (
          <div key={coverage.id} style={{ border: '1px solid #E2E8F0', borderRadius: 8, background: '#FFFFFF', padding: 12 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: '#0F172A', marginBottom: 4 }}>{coverage.label}</div>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#64748B' }}>{coverage.detail}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function RegionRow({
  region,
  index,
  total,
  saving,
  selected,
  onSelect,
  onUpdate,
  onDelete,
}: {
  region: AdminFleetRegion;
  index: number;
  total: number;
  saving: boolean;
  selected: boolean;
  onSelect: () => void;
  onUpdate: (patch: Partial<AdminFleetRegion>) => void;
  onDelete: () => void;
}) {
  const [predictions, setPredictions] = useState<PlacePrediction[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const latestQueryRef = useRef('');
  const containerRef = useRef<HTMLDivElement>(null);

  const hasGeo = isResolvedFleetRegion(region);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  function handleNameChange(value: string) {
    const query = value.trim();
    latestQueryRef.current = query;
    onUpdate({ name: value, latitude: null, longitude: null, zone: '' });

    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (query.length < 2) {
      setPredictions([]);
      setShowDropdown(false);
      return;
    }

    debounceRef.current = setTimeout(async () => {
      try {
        const res = await getFleetCitySuggestions(query);
        if (latestQueryRef.current !== query) return;
        setPredictions(res.data);
        setShowDropdown(res.data.length > 0);
      } catch (err) {
        if (latestQueryRef.current !== query) return;
        console.error('[RegionRow] City suggestions failed:', err);
        setPredictions([]);
      }
    }, 300);
  }

  async function selectPlace(prediction: PlacePrediction) {
    setShowDropdown(false);
    setPredictions([]);
    setLoading(true);
    latestQueryRef.current = prediction.mainText;

    const id = regionIdFromName(prediction.mainText, region.id);
    onUpdate({
      name: prediction.mainText,
      id,
      latitude: prediction.latitude,
      longitude: prediction.longitude,
      zone: prediction.zone,
    });
    setLoading(false);
  }

  return (
    <div onClick={onSelect} style={{ padding: '16px 0', borderTop: index === 0 ? '1px solid #F1F5F9' : 'none', borderBottom: index < total - 1 ? '1px solid #F1F5F9' : 'none', background: selected ? '#F8FAFC' : 'transparent', borderRadius: selected ? 8 : 0 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '38px 1fr 100px 56px 32px', alignItems: 'center', gap: 12 }}>
        <div style={{ width: 38, height: 38, borderRadius: 10, background: selected ? '#DBEAFE' : hasGeo ? '#DCFCE7' : '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 1C6.239 1 4 3.239 4 6c0 4.5 5 11 5 11s5-6.5 5-11c0-2.761-2.239-5-5-5Z" stroke={hasGeo ? '#16A34A' : '#2563EB'} strokeWidth="1.5"/><circle cx="9" cy="6" r="2" fill={hasGeo ? '#16A34A' : '#2563EB'}/></svg>
        </div>
        <div ref={containerRef} style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 4 }}>
          <input
            suppressHydrationWarning
            value={region.name}
            onChange={(e) => handleNameChange(e.target.value)}
            onFocus={() => predictions.length > 0 && setShowDropdown(true)}
            placeholder="Search for a city..."
            style={textInputStyle}
          />
          {loading && <span style={{ fontSize: 11, color: '#64748B' }}>Resolving coordinates...</span>}
          {showDropdown && predictions.length > 0 && (
            <div style={{
              position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 50,
              background: '#fff', border: '1px solid #E2E8F0', borderRadius: 10,
              boxShadow: '0 8px 24px rgba(15,23,42,0.12)', marginTop: 4,
              maxHeight: 240, overflowY: 'auto',
            }}>
              {predictions.map((p) => (
                <button
                  key={p.placeId}
                  type="button"
                  onClick={() => selectPlace(p)}
                  style={{
                    width: '100%', textAlign: 'left', padding: '10px 14px',
                    border: 'none', background: 'transparent', cursor: 'pointer',
                    fontFamily: inter, fontSize: 13, color: '#0F172A',
                    borderBottom: '1px solid #F1F5F9',
                    display: 'flex', alignItems: 'center', gap: 10,
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = '#EFF6FF'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
                >
                  <svg width="14" height="14" viewBox="0 0 18 18" fill="none" style={{ flexShrink: 0 }}>
                    <path d="M9 1C6.239 1 4 3.239 4 6c0 4.5 5 11 5 11s5-6.5 5-11c0-2.761-2.239-5-5-5Z" stroke="#94A3B8" strokeWidth="1.5"/>
                    <circle cx="9" cy="6" r="2" fill="#94A3B8"/>
                  </svg>
                  <div>
                    <div style={{ fontWeight: 700 }}>{p.mainText}</div>
                    <div style={{ fontSize: 11, color: '#94A3B8', marginTop: 1 }}>{p.description}</div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
        <input
          suppressHydrationWarning
          type="number"
          min={REGION_RADIUS_KM_MIN}
          max={REGION_RADIUS_KM_MAX}
          value={region.radiusKm ?? 30}
          onChange={(e) => onUpdate({ radiusKm: Number(e.target.value) || 30 })}
          title={`Radius in km (max ${REGION_RADIUS_KM_MAX})`}
          style={{ ...textInputStyle, textAlign: 'center' }}
        />
        <Toggle on={region.enabled} onChange={(enabled) => onUpdate({ enabled })} disabled={saving} />
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
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
          <span>max {REGION_RADIUS_KM_MAX} km</span>
          {region.zone && <span>{region.zone}</span>}
        </div>
      )}
      {!hasGeo && region.name && !loading && (
        <div style={{ marginTop: 6, marginLeft: 50, fontSize: 11, color: '#F59E0B', fontWeight: 700 }}>
          No coordinates — search and select a city from suggestions
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

const coverageShellStyle: React.CSSProperties = {
  marginBottom: 10,
  borderRadius: 8,
  border: '1px solid #E2E8F0',
  background: '#F8FAFC',
  overflow: 'hidden',
};

const sectionTitleStyle: React.CSSProperties = {
  fontSize: 15,
  fontWeight: 800,
  color: '#0F172A',
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
