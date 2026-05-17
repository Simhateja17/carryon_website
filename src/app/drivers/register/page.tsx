'use client';

import { createAdminDriverRegistration } from '@/lib/api';
import {
  buildDriverRegistrationPayload,
  type DriverRegistrationFormState,
} from '@/lib/driverRegistration';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import type { FormEvent } from 'react';

const manrope = "'Manrope', Inter, sans-serif";
const inter = 'Inter, sans-serif';

const VEHICLE_TYPES: DriverRegistrationFormState['vehicleType'][] = [
  'BIKE',
  'CAR',
  'PICKUP',
  'VAN_7FT',
  'VAN_9FT',
  'LORRY_10FT',
  'LORRY_14FT',
  'LORRY_17FT',
];

const DOCUMENT_TYPES: DriverRegistrationFormState['documents'][number]['type'][] = [
  'MYKAD_FRONT',
  'MYKAD_BACK',
  'SELFIE',
  'DRIVERS_LICENSE',
  'DRIVERS_LICENSE_BACK',
  'VEHICLE_REGISTRATION',
  'VEHICLE_PHOTO_FRONT',
  'VEHICLE_PHOTO_BACK',
  'INSURANCE',
  'ROAD_TAX',
  'GDL',
  'BANK_STATEMENT',
];

const blankForm: DriverRegistrationFormState = {
  fullName: '',
  email: '',
  phone: '',
  dateOfBirth: '',
  governmentId: '',
  residentialAddress: '',
  driversLicenseNumber: '',
  licenseClass: '',
  licenseExpiry: '',
  emergencyContactName: '',
  emergencyContactRelation: '',
  emergencyContactPhone: '',
  pdpaConsent: false,
  backgroundCheckConsent: false,
  noOffencesDeclared: false,
  vehicleType: 'CAR',
  vehicleMake: '',
  vehicleModel: '',
  vehicleYear: '',
  licensePlate: '',
  vehicleColor: '',
  chassisNumber: '',
  engineNumber: '',
  vehicleOwnership: 'DRIVER_OWNED',
  ownerName: '',
  roadTaxExpiry: '',
  insurerName: '',
  insurancePolicyNumber: '',
  insuranceExpiry: '',
  hasCommercialCover: false,
  documents: [
    { type: 'MYKAD_FRONT', imageUrl: '', expiryDate: '' },
    { type: 'DRIVERS_LICENSE', imageUrl: '', expiryDate: '' },
    { type: 'VEHICLE_REGISTRATION', imageUrl: '', expiryDate: '' },
  ],
};

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <span style={{ fontFamily: inter, fontSize: '10px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: '#191C1E' }}>{children}</span>;
}

function StepHeader({ title, badge }: { title: string; badge: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
      <h2 style={{ margin: 0, fontFamily: manrope, fontSize: '20px', fontWeight: 800, color: '#2F80ED' }}>{title}</h2>
      <span style={{ background: '#B7DAF5', color: '#2F80ED', fontFamily: inter, fontSize: '10px', fontWeight: 800, letterSpacing: '.8px', textTransform: 'uppercase', padding: '4px 12px', borderRadius: '999px' }}>
        {badge}
      </span>
    </div>
  );
}

export default function DriverRegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<DriverRegistrationFormState>(blankForm);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const completedDocs = useMemo(
    () => form.documents.filter((document) => document.imageUrl.trim()).length,
    [form.documents]
  );

  const inputStyle: React.CSSProperties = {
    width: '100%',
    boxSizing: 'border-box',
    border: '1px solid #E5E7EB',
    outline: 'none',
    background: '#F8FAFC',
    borderRadius: '8px',
    padding: '12px',
    fontFamily: inter,
    fontSize: '14px',
    color: '#191C1E',
  };

  function setField<K extends keyof DriverRegistrationFormState>(key: K, value: DriverRegistrationFormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function updateDocument(index: number, patch: Partial<DriverRegistrationFormState['documents'][number]>) {
    setForm((current) => ({
      ...current,
      documents: current.documents.map((document, i) => i === index ? { ...document, ...patch } : document),
    }));
  }

  function addDocument() {
    setForm((current) => ({
      ...current,
      documents: [...current.documents, { type: 'INSURANCE', imageUrl: '', expiryDate: '' }],
    }));
  }

  function removeDocument(index: number) {
    setForm((current) => ({
      ...current,
      documents: current.documents.filter((_, i) => i !== index),
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitError('');
    setSubmitting(true);
    try {
      const payload = buildDriverRegistrationPayload(form);
      const res = await createAdminDriverRegistration(payload);
      router.push(`/drivers/${res.data.id}`);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Failed to register driver.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main style={{ flex: 1, minHeight: 0, overflowY: 'auto', background: '#F7F9FB' }}>
      <form onSubmit={handleSubmit} style={{ maxWidth: '1152px', margin: '0 auto', padding: '40px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
        <header style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
          <Image src="/register-personnel-icon.png" alt="" aria-hidden width={32} height={32} />
          <div>
            <h1 style={{ margin: 0, fontFamily: manrope, fontSize: '36px', fontWeight: 800, letterSpacing: '-0.9px', color: '#191C1E', lineHeight: '40px' }}>Register New Personnel</h1>
            <p style={{ margin: '8px 0 0', maxWidth: '760px', fontFamily: inter, fontSize: '16px', color: '#424754', lineHeight: '24px' }}>
              Create a real pending driver record with identity, document references, and vehicle details for admin review.
            </p>
          </div>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '24px' }}>
          {[
            { n: 1, label: 'Personal Info' },
            { n: 2, label: 'Documentation' },
            { n: 3, label: 'Vehicle Assignment' },
          ].map((item) => (
            <button key={item.n} type="button" onClick={() => setStep(item.n)} style={{ textAlign: 'left', border: 0, background: 'transparent', padding: 0, cursor: 'pointer' }}>
              <div style={{ height: '6px', borderRadius: '999px', background: step === item.n ? '#0058BE' : item.n < step ? '#6FB38A' : '#E6E8EA', marginBottom: '12px' }} />
              <span style={{ fontFamily: manrope, fontSize: '14px', fontWeight: 800, color: step === item.n ? '#0058BE' : '#424754' }}>{item.n}. {item.label}</span>
            </button>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.65fr) minmax(280px, 1fr)', gap: '32px', alignItems: 'start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {step === 1 && (
              <section style={sectionStyle}>
                <StepHeader title="1. Personal Information" badge="Driver Identity" />
                <div style={gridStyle}>
                  <TextField label="Full Legal Name" value={form.fullName} onChange={(value) => setField('fullName', value)} inputStyle={inputStyle} placeholder="e.g. Nur Aisyah Binti Ahmad" />
                  <TextField label="Email" type="email" value={form.email} onChange={(value) => setField('email', value)} inputStyle={inputStyle} placeholder="driver@example.com" />
                  <TextField label="Contact Phone" value={form.phone} onChange={(value) => setField('phone', value)} inputStyle={inputStyle} placeholder="+60123456789" />
                  <TextField label="Date of Birth" type="date" value={form.dateOfBirth} onChange={(value) => setField('dateOfBirth', value)} inputStyle={inputStyle} />
                  <TextField label="MyKad / Passport / PLKS" value={form.governmentId} onChange={(value) => setField('governmentId', value)} inputStyle={inputStyle} placeholder="900101-01-1234" />
                  <TextField label="Driver License Number" value={form.driversLicenseNumber} onChange={(value) => setField('driversLicenseNumber', value)} inputStyle={inputStyle} placeholder="D1234567" />
                  <TextField label="License Class" value={form.licenseClass} onChange={(value) => setField('licenseClass', value)} inputStyle={inputStyle} placeholder="D / GDL / E" />
                  <TextField label="License Expiry" type="date" value={form.licenseExpiry} onChange={(value) => setField('licenseExpiry', value)} inputStyle={inputStyle} />
                  <div style={{ gridColumn: '1 / -1' }}>
                    <TextField label="Residential Address" area value={form.residentialAddress} onChange={(value) => setField('residentialAddress', value)} inputStyle={inputStyle} placeholder="Street address, city, postcode, state" />
                  </div>
                  <TextField label="Emergency Contact Name" value={form.emergencyContactName} onChange={(value) => setField('emergencyContactName', value)} inputStyle={inputStyle} />
                  <TextField label="Emergency Relation" value={form.emergencyContactRelation} onChange={(value) => setField('emergencyContactRelation', value)} inputStyle={inputStyle} />
                  <TextField label="Emergency Phone" value={form.emergencyContactPhone} onChange={(value) => setField('emergencyContactPhone', value)} inputStyle={inputStyle} />
                </div>
                <Declaration checked={form.pdpaConsent} onChange={(value) => setField('pdpaConsent', value)} label="PDPA consent captured" />
                <Declaration checked={form.backgroundCheckConsent} onChange={(value) => setField('backgroundCheckConsent', value)} label="Background check consent captured" />
                <Declaration checked={form.noOffencesDeclared} onChange={(value) => setField('noOffencesDeclared', value)} label="No-offences declaration confirmed" />
              </section>
            )}

            {step === 2 && (
              <section style={sectionStyle}>
                <StepHeader title="2. Documentation" badge={`${completedDocs}/${form.documents.length} Provided`} />
                <p style={hintStyle}>Paste Supabase storage object paths only, for example <code>driver-documents/drivers/&lt;driverId&gt;/MYKAD_FRONT.jpg</code>. Public URLs are rejected by the proxy and backend.</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {form.documents.map((document, index) => (
                    <div key={`${document.type}-${index}`} style={{ display: 'grid', gridTemplateColumns: '180px minmax(0, 1fr) 160px 40px', gap: '12px', alignItems: 'end' }}>
                      <div>
                        <FieldLabel>Type</FieldLabel>
                        <select value={document.type} onChange={(e) => updateDocument(index, { type: e.target.value as typeof document.type })} style={inputStyle}>
                          {DOCUMENT_TYPES.map((type) => <option key={type} value={type}>{type.replaceAll('_', ' ')}</option>)}
                        </select>
                      </div>
                      <TextField label="Storage Object Path" value={document.imageUrl} onChange={(value) => updateDocument(index, { imageUrl: value })} inputStyle={inputStyle} placeholder="driver-documents/..." />
                      <TextField label="Expiry" type="date" value={document.expiryDate} onChange={(value) => updateDocument(index, { expiryDate: value })} inputStyle={inputStyle} />
                      <button type="button" onClick={() => removeDocument(index)} style={iconButtonStyle} aria-label="Remove document">×</button>
                    </div>
                  ))}
                </div>
                <button type="button" onClick={addDocument} style={secondaryButtonStyle}>Add Document</button>
              </section>
            )}

            {step === 3 && (
              <section style={sectionStyle}>
                <StepHeader title="3. Vehicle Assignment" badge="Fleet Profile" />
                <div style={gridStyle}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <FieldLabel>Vehicle Type</FieldLabel>
                    <select value={form.vehicleType} onChange={(e) => setField('vehicleType', e.target.value as DriverRegistrationFormState['vehicleType'])} style={inputStyle}>
                      {VEHICLE_TYPES.map((type) => <option key={type} value={type}>{type.replaceAll('_', ' ')}</option>)}
                    </select>
                  </div>
                  <TextField label="Make" value={form.vehicleMake} onChange={(value) => setField('vehicleMake', value)} inputStyle={inputStyle} placeholder="Toyota" />
                  <TextField label="Model" value={form.vehicleModel} onChange={(value) => setField('vehicleModel', value)} inputStyle={inputStyle} placeholder="HiAce" />
                  <TextField label="Year" type="number" value={form.vehicleYear} onChange={(value) => setField('vehicleYear', value)} inputStyle={inputStyle} placeholder="2022" />
                  <TextField label="License Plate" value={form.licensePlate} onChange={(value) => setField('licensePlate', value)} inputStyle={inputStyle} placeholder="VAB1234" />
                  <TextField label="Color" value={form.vehicleColor} onChange={(value) => setField('vehicleColor', value)} inputStyle={inputStyle} />
                  <TextField label="Chassis Number" value={form.chassisNumber} onChange={(value) => setField('chassisNumber', value)} inputStyle={inputStyle} />
                  <TextField label="Engine Number" value={form.engineNumber} onChange={(value) => setField('engineNumber', value)} inputStyle={inputStyle} />
                  <TextField label="Ownership" value={form.vehicleOwnership} onChange={(value) => setField('vehicleOwnership', value)} inputStyle={inputStyle} />
                  <TextField label="Owner Name" value={form.ownerName} onChange={(value) => setField('ownerName', value)} inputStyle={inputStyle} />
                  <TextField label="Road Tax Expiry" type="date" value={form.roadTaxExpiry} onChange={(value) => setField('roadTaxExpiry', value)} inputStyle={inputStyle} />
                  <TextField label="Insurer" value={form.insurerName} onChange={(value) => setField('insurerName', value)} inputStyle={inputStyle} />
                  <TextField label="Insurance Policy" value={form.insurancePolicyNumber} onChange={(value) => setField('insurancePolicyNumber', value)} inputStyle={inputStyle} />
                  <TextField label="Insurance Expiry" type="date" value={form.insuranceExpiry} onChange={(value) => setField('insuranceExpiry', value)} inputStyle={inputStyle} />
                </div>
                <Declaration checked={form.hasCommercialCover} onChange={(value) => setField('hasCommercialCover', value)} label="Commercial insurance cover confirmed" />
              </section>
            )}

            {submitError ? <div role="alert" style={errorStyle}>{submitError}</div> : null}

            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px' }}>
              <button type="button" onClick={() => step === 1 ? router.push('/drivers') : setStep(step - 1)} disabled={submitting} style={secondaryButtonStyle}>
                {step === 1 ? 'Discard Draft' : 'Back'}
              </button>
              {step < 3 ? (
                <button type="button" onClick={() => setStep(step + 1)} style={primaryButtonStyle}>Continue</button>
              ) : (
                <button type="submit" disabled={submitting} style={{ ...primaryButtonStyle, opacity: submitting ? 0.7 : 1 }}>
                  {submitting ? 'Creating Driver...' : 'Create Driver'}
                </button>
              )}
            </div>
          </div>

          <aside style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div style={summaryCardStyle}>
              <div style={{ fontFamily: manrope, fontSize: '18px', fontWeight: 800, color: '#191C1E' }}>{form.fullName || 'Unsaved Profile'}</div>
              <div style={{ fontFamily: inter, fontSize: '12px', color: '#5A6270', marginTop: '4px' }}>{form.email || 'Driver identity pending'}</div>
              <SummaryRow label="Phone" value={form.phone || '--'} />
              <SummaryRow label="Documents" value={`${completedDocs}/${form.documents.length}`} />
              <SummaryRow label="Vehicle" value={form.vehicleMake && form.vehicleModel ? `${form.vehicleMake} ${form.vehicleModel}` : form.vehicleType} />
              <SummaryRow label="Status" value="Pending Review" />
            </div>
            <div style={{ ...summaryCardStyle, background: '#3B82E0', color: '#FEFCFF' }}>
              <div style={{ fontFamily: manrope, fontSize: '14px', fontWeight: 800, marginBottom: '12px' }}>Compliance Requirements</div>
              <ul style={{ margin: 0, paddingLeft: '18px', fontFamily: inter, fontSize: '12px', lineHeight: '20px' }}>
                <li>Driver identity, license, declarations, and vehicle are stored in the real driver review model.</li>
                <li>Document references create pending review rows for admin approval.</li>
                <li>Approval remains blocked until required documents are reviewed.</li>
              </ul>
            </div>
          </aside>
        </div>
      </form>
    </main>
  );
}

function TextField({
  label,
  value,
  onChange,
  inputStyle,
  placeholder,
  type = 'text',
  area = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  inputStyle: React.CSSProperties;
  placeholder?: string;
  type?: string;
  area?: boolean;
}) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <FieldLabel>{label}</FieldLabel>
      {area ? (
        <textarea value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} rows={4} style={{ ...inputStyle, resize: 'vertical', minHeight: '100px' }} />
      ) : (
        <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} style={inputStyle} />
      )}
    </label>
  );
}

function Declaration({ checked, onChange, label }: { checked: boolean; onChange: (value: boolean) => void; label: string }) {
  return (
    <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontFamily: inter, fontSize: '13px', fontWeight: 700, color: '#334155' }}>
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      {label}
    </label>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '14px', borderTop: '1px solid #ECEEF0', paddingTop: '12px', marginTop: '12px' }}>
      <span style={{ fontFamily: inter, fontSize: '11px', fontWeight: 800, letterSpacing: '.8px', textTransform: 'uppercase', color: '#64748B' }}>{label}</span>
      <span style={{ fontFamily: inter, fontSize: '12px', fontWeight: 800, color: '#191C1E', textAlign: 'right' }}>{value}</span>
    </div>
  );
}

const sectionStyle: React.CSSProperties = {
  background: '#FFF',
  borderRadius: '12px',
  boxShadow: '0 1px 2px rgba(0,0,0,.05)',
  padding: '32px',
  display: 'flex',
  flexDirection: 'column',
  gap: '22px',
};

const gridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  gap: '18px 22px',
};

const summaryCardStyle: React.CSSProperties = {
  background: '#FFF',
  borderRadius: '12px',
  boxShadow: '0 1px 2px rgba(0,0,0,.05)',
  padding: '22px',
};

const primaryButtonStyle: React.CSSProperties = {
  border: 0,
  borderRadius: '8px',
  background: '#2F80ED',
  color: '#FFF',
  padding: '12px 28px',
  cursor: 'pointer',
  fontFamily: manrope,
  fontSize: '12px',
  fontWeight: 800,
  letterSpacing: '1px',
  textTransform: 'uppercase',
};

const secondaryButtonStyle: React.CSSProperties = {
  border: 0,
  borderRadius: '8px',
  background: '#B7DAF5',
  color: '#2F80ED',
  padding: '12px 22px',
  cursor: 'pointer',
  fontFamily: manrope,
  fontSize: '12px',
  fontWeight: 800,
  letterSpacing: '1px',
  textTransform: 'uppercase',
};

const iconButtonStyle: React.CSSProperties = {
  ...secondaryButtonStyle,
  width: '40px',
  padding: '12px 0',
  fontSize: '18px',
  lineHeight: '16px',
};

const hintStyle: React.CSSProperties = {
  margin: 0,
  fontFamily: inter,
  fontSize: '13px',
  lineHeight: '20px',
  color: '#64748B',
};

const errorStyle: React.CSSProperties = {
  background: '#FEF2F2',
  border: '1px solid #FECACA',
  borderRadius: '8px',
  color: '#B91C1C',
  fontFamily: inter,
  fontSize: '13px',
  fontWeight: 700,
  padding: '12px 14px',
};
