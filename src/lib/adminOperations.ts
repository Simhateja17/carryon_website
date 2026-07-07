import type {
  ActualPathPoint,
  AdminOrder,
  BookingStatus,
  IncidentMapSnapshot,
  LiveOverviewSnapshot,
  MapCoordinate,
} from '@/types';

export interface IncidentQueueItem {
  id: string;
  type: string;
  typeColor: string;
  vehicle: string;
  description: string;
  driver: string;
  driverInitials: string;
  driverBg: string;
  time: string;
}

export interface IncidentLogItem {
  time: string;
  title: string;
  desc: string;
  highlight: boolean;
}

export interface IncidentOperationsView {
  snapshot: IncidentMapSnapshot;
  queue: IncidentQueueItem[];
  log: IncidentLogItem[];
  activeIncidentId: string | null;
  urgentCount: number;
}

export interface LiveOverviewOperationsView {
  snapshot: LiveOverviewSnapshot;
  fleetStatus: Array<{ label: string; value: string }>;
  alerts: Array<{ type: string; title: string; sub: string; time: string }>;
}

export function adminOpsReadModelEnabled() {
  return process.env.NEXT_PUBLIC_ADMIN_OPS_READ_MODEL !== 'legacy';
}

export function toIncidentOperationsView(snapshot: IncidentMapSnapshot): IncidentOperationsView {
  const queue = snapshot.incidents.map((incident) => {
    const vehicle = incident.booking.driver?.vehicle;
    const plate = vehicle?.licensePlate || incident.booking.orderCode || incident.booking.bookingId.slice(0, 8);
    const driver = incident.booking.driver?.name || 'Unassigned driver';
    return {
      id: incident.id,
      type: incident.type.replaceAll('_', ' '),
      typeColor: colorForIncident(incident.type, incident.severity),
      vehicle: `${formatVehicleType(incident.booking.vehicleType)} #${plate}`,
      description: incidentDescription(incident),
      driver,
      driverInitials: initials(driver),
      driverBg: colorFromString(driver),
      time: relativeTime(incident.booking.updatedAt),
    };
  });

  const activeIncident = snapshot.incidents[0] || null;
  return {
    snapshot,
    queue,
    log: activeIncident ? incidentLogFor(activeIncident) : [],
    activeIncidentId: activeIncident?.id || null,
    urgentCount: snapshot.incidents.filter((incident) => incident.severity === 'critical').length,
  };
}

export function toLiveOverviewOperationsView(snapshot: LiveOverviewSnapshot): LiveOverviewOperationsView {
  return {
    snapshot,
    fleetStatus: [
      { label: 'ACTIVE', value: String(snapshot.stats.active) },
      { label: 'DELAYED', value: String(snapshot.stats.delayed) },
      { label: 'IDLE', value: String(snapshot.stats.idle) },
      { label: 'EN ROUTE', value: String(snapshot.stats.enRoute) },
    ],
    alerts: snapshot.bookings
      .filter((booking) => isDelayed(booking.updatedAt))
      .slice(0, 3)
      .map((booking) => ({
        type: 'ROUTE WATCH',
        title: `${booking.orderCode || booking.bookingId} has stale movement`,
        sub: `${booking.driver?.name || 'Unassigned'} - ${booking.route.pickupLabel}`,
        time: relativeTime(booking.updatedAt),
      })),
  };
}

export function latestCoordinate(points: ActualPathPoint[], fallback?: MapCoordinate | null) {
  return points[points.length - 1]?.position || fallback || null;
}

function incidentDescription(incident: IncidentMapSnapshot['incidents'][number]) {
  if (incident.deviation.status === 'OFF_ROUTE' && incident.deviation.distanceFromPlannedMeters != null) {
    return `Off-route by ${Math.round(incident.deviation.distanceFromPlannedMeters / 1000)} km: ${incident.booking.route.pickupLabel}`;
  }
  if (incident.deviation.stale) return `Stale update: ${incident.booking.route.pickupLabel}`;
  return `${incident.booking.status.replaceAll('_', ' ')}: ${incident.booking.route.pickupLabel}`;
}

function incidentLogFor(incident: IncidentMapSnapshot['incidents'][number]): IncidentLogItem[] {
  const actualPath = incident.actualPath.slice(-4).reverse();
  if (actualPath.length === 0) {
    return [{
      time: timeOfDay(incident.booking.updatedAt),
      title: `${incident.type.replaceAll('_', ' ')} detected`,
      desc: incidentDescription(incident),
      highlight: incident.severity === 'critical',
    }];
  }
  return actualPath.map((point) => ({
    time: timeOfDay(point.capturedAt),
    title: point.command.replaceAll('_', ' '),
    desc: eventDistanceDescription(point.distanceToExpectedMeters),
    highlight: point.distanceToExpectedMeters != null && point.distanceToExpectedMeters > 1000,
  }));
}

function eventDistanceDescription(distance: number | null) {
  if (distance == null) return 'Location update captured';
  if (distance < 1000) return `${distance} m from expected route`;
  return `${(distance / 1000).toFixed(1)} km from expected route`;
}

function colorForIncident(type: string, severity: string) {
  if (severity === 'critical') return '#DC2626';
  if (type === 'DELAY') return '#F59E0B';
  return '#2563EB';
}

function formatVehicleType(type: string) {
  return type.replaceAll('_', ' ').replace(/\b\w/g, (char) => char.toUpperCase());
}

function initials(name: string) {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]?.toUpperCase()).join('') || 'AD';
}

function colorFromString(value: string) {
  const colors = ['#1E40AF', '#7C3AED', '#059669', '#B45309', '#0F766E'];
  const index = Array.from(value).reduce((sum, char) => sum + char.charCodeAt(0), 0) % colors.length;
  return colors[index];
}

function relativeTime(value: string) {
  const minutes = Math.max(0, Math.round((Date.now() - new Date(value).getTime()) / 60000));
  if (minutes < 1) return 'now';
  if (minutes < 60) return `${minutes}m ago`;
  return `${Math.round(minutes / 60)}h ago`;
}

function timeOfDay(value: string) {
  return new Intl.DateTimeFormat('en', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).format(new Date(value));
}

function isDelayed(value: string) {
  return Date.now() - new Date(value).getTime() > 30 * 60 * 1000;
}

// ── Order view model ─────────────────────────────────────────────────────────

export interface OrderViewModel {
  id: string;
  customer: string;
  customerType: string;
  destination: string;
  driverName: string;
  driverInitials: string;
  driverBg: string;
  displayStatus: string;
  statusBg: string;
  statusTextColor: string;
  rawStatus: BookingStatus;
  createdAt: string;
  pickupProofUrl: string | null;
  deliveryProofUrl: string | null;
}

const STATUS_DISPLAY: Record<BookingStatus, { label: string; bg: string; text: string }> = {
  PENDING:          { label: 'PENDING',    bg: '#2F80ED', text: '#fff' },
  SEARCHING_DRIVER: { label: 'PENDING',    bg: '#2F80ED', text: '#fff' },
  DRIVER_ASSIGNED:  { label: 'IN-TRANSIT', bg: '#2F80ED', text: '#fff' },
  DRIVER_ARRIVED:   { label: 'IN-TRANSIT', bg: '#2F80ED', text: '#fff' },
  PICKUP_DONE:      { label: 'IN-TRANSIT', bg: '#2F80ED', text: '#fff' },
  IN_TRANSIT:       { label: 'IN-TRANSIT', bg: '#2F80ED', text: '#fff' },
  ARRIVED_AT_DROP:  { label: 'IN-TRANSIT', bg: '#2F80ED', text: '#fff' },
  DELIVERED:        { label: 'DELIVERED',  bg: '#B7DAF5', text: '#2F80ED' },
  CANCELLED:        { label: 'CANCELLED',  bg: '#F1F5F9', text: '#64748B' },
};

export function toOrderViewModel(booking: AdminOrder): OrderViewModel {
  const display = STATUS_DISPLAY[booking.status] ?? { label: booking.status, bg: '#F1F5F9', text: '#64748B' };
  const customerName = booking.user?.name || booking.user?.email || 'Unknown Customer';
  const driverName = booking.driver?.name ?? 'Unassigned';
  return {
    id: `#${booking.orderCode}`,
    customer: customerName,
    customerType: formatVehicleType(booking.vehicleType),
    destination: booking.deliveryAddress?.address ?? '—',
    driverName,
    driverInitials: initials(driverName),
    driverBg: booking.driver ? colorFromString(driverName) : '#E2E8F0',
    displayStatus: display.label,
    statusBg: display.bg,
    statusTextColor: display.text,
    rawStatus: booking.status,
    createdAt: booking.createdAt,
    pickupProofUrl: booking.pickupProofUrl,
    deliveryProofUrl: booking.deliveryProofUrl,
  };
}
