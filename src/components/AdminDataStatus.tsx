'use client';

const inter = "'Inter', sans-serif";

export default function AdminDataStatus({
  error,
  stale,
  lastUpdated,
}: {
  error?: string;
  stale?: boolean;
  lastUpdated?: Date | null;
}) {
  if (!error && !stale) return null;

  return (
    <div style={{
      marginBottom: '12px',
      border: '1px solid #F59E0B',
      background: '#FFFBEB',
      color: '#92400E',
      borderRadius: '8px',
      padding: '10px 12px',
      fontFamily: inter,
      fontSize: '12px',
      fontWeight: 600,
      display: 'flex',
      justifyContent: 'space-between',
      gap: '12px',
    }}>
      <span>{error || 'Live data is stale. Showing last confirmed snapshot.'}</span>
      {lastUpdated && <span>Last update: {lastUpdated.toLocaleTimeString()}</span>}
    </div>
  );
}
