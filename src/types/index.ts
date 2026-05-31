// ── Shared TypeScript interfaces ─────────────────────────────
// Single source of truth for all domain types.
// api.ts re-exports these for backward compatibility.

export interface Stats {
  totalDrivers: number;
  onlineDrivers: number;
  totalBookings: number;
  activeBookings: number;
  totalNotifications: number;
}

export interface Driver {
  id: string;
  name: string;
  email: string;
  phone: string;
  isOnline: boolean;
  isVerified: boolean;
  verificationStatus: "PENDING" | "IN_REVIEW" | "APPROVED" | "REJECTED";
  totalTrips: number;
  rating: number;
  hasFcmToken: boolean;
  createdAt: string;
}

export type DriverReadinessStatus =
  | "READY_TO_GO_ONLINE"
  | "ADMIN_REVIEW_REQUIRED"
  | "DOCUMENTS_EXPIRED"
  | "DOCUMENTS_REQUIRED"
  | "PAYOUT_SETUP_REQUIRED"
  | "NOT_READY";

export type DriverReadinessBlockerCode =
  | "ADMIN_APPROVAL_REQUIRED"
  | "REQUIRED_DOCUMENT_MISSING"
  | "REQUIRED_DOCUMENT_EXPIRED"
  | "STRIPE_PAYOUTS_DISABLED";

export interface DriverReadinessBlocker {
  code: DriverReadinessBlockerCode;
  message: string;
  documentType?: DriverDocument["type"];
}

export interface DriverOnlineReadiness {
  canGoOnline: boolean;
  status: DriverReadinessStatus;
  label: string;
  blockers: DriverReadinessBlocker[];
  primaryBlocker: DriverReadinessBlocker | null;
  missingRequiredDocuments: DriverDocument["type"][];
  expiredDocuments: DriverDocument["type"][];
  payoutRequirements: {
    stripeAccountId: string | null;
    detailsSubmitted: boolean;
    payoutsEnabled: boolean;
    requirements: unknown;
  };
}

export interface DriverListItem {
  id: string;
  name: string;
  email: string;
  phone: string;
  photo: string | null;
  isOnline: boolean;
  hasFcmToken?: boolean;
  isVerified: boolean;
  verificationStatus: "PENDING" | "IN_REVIEW" | "APPROVED" | "REJECTED";
  verificationRejectionReason?: string | null;
  verificationReviewedAt?: string | null;
  verificationReviewedByAdminId?: string | null;
  rating: number;
  totalTrips: number;
  emergencyContact: string;
  createdAt: string;
  onboardingSubmittedAt?: string | null;
  documentsCount: number;
  documentsApproved: number;
  documentsPending?: number;
  hasVehicle: boolean;
  vehicleSummary: string | null;
  reviewSource?: "SUBMITTED_ONBOARDING" | "LEGACY_UNVERIFIED";
  onlineReadiness?: DriverOnlineReadiness;
}

export interface AdminDriverRegistrationPayload {
  name: string;
  email: string;
  phone: string;
  dateOfBirth?: string;
  governmentId?: string;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  postcode?: string;
  state?: string;
  driversLicenseNumber?: string;
  licenseClass?: string;
  licenseExpiry?: string;
  emergencyContactName?: string;
  emergencyContactRelation?: string;
  emergencyContactPhone?: string;
  pdpaConsent?: boolean;
  backgroundCheckConsent?: boolean;
  noOffencesDeclared?: boolean;
  vehicle?: {
    type: DriverVehicle["type"];
    make?: string;
    model?: string;
    year: number;
    licensePlate?: string;
    color?: string;
    chassisNumber?: string;
    engineNumber?: string;
    ownership?: string;
    ownerName?: string;
    roadTaxExpiry?: string;
    insurerName?: string;
    insurancePolicyNumber?: string;
    insuranceExpiry?: string;
    hasCommercialCover?: boolean;
  };
  documents?: Array<{
    type: DriverDocument["type"];
    imageUrl: string;
    expiryDate?: string;
  }>;
}

export interface DriverDocument {
  id: string;
  driverId: string;
  type:
    | "DRIVERS_LICENSE"
    | "DRIVERS_LICENSE_BACK"
    | "GDL"
    | "VEHICLE_REGISTRATION"
    | "ROAD_TAX"
    | "PUSPAKOM"
    | "APAD_PERMIT"
    | "VEHICLE_PHOTO_FRONT"
    | "VEHICLE_PHOTO_BACK"
    | "VEHICLE_PHOTO_LEFT"
    | "VEHICLE_PHOTO_RIGHT"
    | "VEHICLE_PHOTO_INTERIOR"
    | "BANK_STATEMENT"
    | "POLICE_CLEARANCE"
    | "INSURANCE"
    | "PROFILE_PHOTO"
    | "ID_PROOF"
    | "MYKAD_FRONT"
    | "MYKAD_BACK"
    | "SELFIE"
    | "PASSPORT"
    | "WORK_PERMIT_PLKS";
  imageUrl: string;
  expiryDate?: string | null;
  status: "PENDING" | "APPROVED" | "REJECTED";
  rejectionReason: string | null;
  uploadedAt: string;
}

export interface DriverVehicle {
  id: string;
  driverId: string;
  type:
    | "BIKE"
    | "CAR"
    | "PICKUP"
    | "VAN_7FT"
    | "VAN_9FT"
    | "LORRY_10FT"
    | "LORRY_14FT"
    | "LORRY_17FT";
  make: string;
  model: string;
  year: number;
  licensePlate: string;
  color: string;
  chassisNumber?: string;
  engineNumber?: string;
  ownership?: string;
  ownerName?: string;
  roadTaxExpiry?: string | null;
  puspakomExpiry?: string | null;
  apadPermitNumber?: string;
  apadPermitExpiry?: string | null;
  insurerName?: string;
  insurancePolicyNumber?: string;
  insuranceCoverageType?: string;
  insuranceExpiry?: string | null;
  hasCommercialCover?: boolean;
  createdAt: string;
}

export interface SensitiveField {
  masked: string;
  hasValue: boolean;
}

export type DriverSensitiveField =
  | "mykadNumber"
  | "passportNumber"
  | "plksNumber"
  | "driversLicenseNumber"
  | "bankAccountNumber"
  | "duitNowId"
  | "tngEwalletId"
  | "lhdnTaxNumber"
  | "sstNumber";

export interface DriverDetail {
  id: string;
  name: string;
  email: string;
  phone: string;
  photo: string | null;
  rating: number;
  totalTrips: number;
  isOnline: boolean;
  isVerified: boolean;
  verificationStatus: "PENDING" | "IN_REVIEW" | "APPROVED" | "REJECTED";
  verificationRejectionReason?: string | null;
  verificationReviewedAt?: string | null;
  verificationReviewedByAdminId?: string | null;
  emergencyContact: string;
  createdAt: string;
  onboardingSubmittedAt?: string | null;
  reviewSource?: "SUBMITTED_ONBOARDING" | "LEGACY_UNVERIFIED";
  onlineReadiness?: DriverOnlineReadiness;
  payout?: DriverOnlineReadiness["payoutRequirements"];
  profile?: {
    dateOfBirth?: string;
    gender?: string;
    language?: string;
    nationality?: string;
    licenseClass?: string;
    licenseExpiry?: string | null;
    hasGDL?: boolean;
    gdlExpiry?: string | null;
    addressLine1?: string;
    addressLine2?: string;
    city?: string;
    postcode?: string;
    state?: string;
    workingStates?: string[];
    emergencyContactName?: string;
    emergencyContactRelation?: string;
    emergencyContactPhone?: string;
    bankName?: string;
    bankAccountHolder?: string;
    pdpaConsent?: boolean;
    backgroundCheckConsent?: boolean;
    agreementVersion?: string;
    noOffencesDeclared?: boolean;
  };
  sensitive?: Record<DriverSensitiveField, SensitiveField>;
  latestSubmission?: {
    id: string;
    submittedAt: string;
    agreementVersion: string;
  } | null;
  documents: DriverDocument[];
  vehicle: DriverVehicle | null;
}

export interface Notification {
  id: string;
  driverId: string;
  title: string;
  message: string;
  type: string;
  isRead: boolean;
  createdAt: string;
  driver?: { id: string; name: string; email: string };
}

export interface SendNotificationPayload {
  title: string;
  message: string;
  type: string;
  audience: "all" | "online";
}

export interface DriverRef {
  id: string;
  name: string;
  email: string;
}

export interface PushResult {
  attempted: number;
  delivered: number;
  failed: number;
  driversWithoutToken: number;
  deliveredDrivers: DriverRef[];
  failedDrivers: DriverRef[];
  noTokenDrivers: DriverRef[];
}

export interface SendNotificationResult {
  sent: number;
  audience: string;
  driversCount: number;
  push?: PushResult;
}

export interface RideLocationPayload {
  address: string;
  latitude: number;
  longitude: number;
  contactName?: string;
  contactPhone?: string;
  contactEmail?: string;
  landmark?: string;
}

export interface CreateRideRequestPayload {
  from: RideLocationPayload;
  to: RideLocationPayload;
  price: number;
  vehicleType:
    | "BIKE"
    | "CAR"
    | "PICKUP"
    | "VAN_7FT"
    | "VAN_9FT"
    | "LORRY_10FT"
    | "LORRY_14FT"
    | "LORRY_17FT";
  paymentMethod?: "CASH" | "UPI" | "CARD" | "WALLET";
  driverIds?: string[];
}

export interface CreateRideRequestResult {
  bookingId: string;
  status: string;
  vehicleType: string;
  estimatedPrice: number;
  distance: number;
  duration: number;
  targetedDrivers: DriverRef[];
  targetingMode?: "selected_drivers" | "nearby_online_drivers";
  push: PushResult;
}

export interface AdminRecipientOtpRecord {
  bookingId: string;
  orderCode: string;
  bookingStatus: string;
  dispatchSource: string;
  recipientName: string;
  recipientEmail: string;
  deliveryOtp: string;
  otpSentAt: string | null;
  otpVerifiedAt: string | null;
  createdAt: string | null;
  driver: { id: string; name: string; email: string } | null;
}

export interface BookingExtraChargeRecord {
  id: string;
  bookingId: string;
  driverId: string;
  type: "TOLL" | "PARKING";
  amount: number;
  proofUrl: string;
  note: string | null;
  status: "PENDING" | "APPROVED" | "REJECTED";
  createdAt: string;
  reviewedAt: string | null;
  booking?: {
    id: string;
    orderCode: string | null;
    status: string;
    pickupAddress?: { address?: string; label?: string };
    deliveryAddress?: { address?: string; label?: string };
  };
  driver?: { id: string; name: string; phone: string };
}

export interface CommandCenterSnapshot {
  generatedAt?: string;
  timezone?: string;
  stats: Array<{ label: string; value: string; trend: string; up: boolean }>;
  weeklyOrders: Array<{ day: string; count: number }>;
  breakdown: Array<{ status: string; count: number; pct: number }>;
  demandHeatmap?: {
    rows: string[];
    columns: string[];
    max: number;
    cells: Array<Array<{ count: number; intensity: number }>>;
  };
  fleet: {
    inTransit: number;
    delivering: number;
    idle: number;
    pins: Array<{ id: string; vehicleType: string; top: number; left: number }>;
  };
  alerts: Array<{ severity: string; label: string; title: string; detail: string }>;
  recentOrders: Array<{
    id: string;
    customer: string;
    route: string;
    driver: string;
    status: string;
    etd: string;
  }>;
  systemLogs: Array<{ title: string; desc: string; badge: string }>;
  notificationHealth: { deliveredLast24h: number };
}

export interface NotificationAlertSetting {
  type: "delay" | "order" | "offline" | "fuel";
  label: string;
  sub: string;
  sms: boolean;
  push: boolean;
  email: boolean;
}

export interface NotificationSettingsSnapshot {
  settings: { alerts: NotificationAlertSetting[] };
  groups: Array<{ type: "admin" | "dispatch" | "driver"; label: string; badge: string; sub: string }>;
  health: { deliveryRate: number; deliveredLast24h: number };
  auditItems: Array<{ icon: "edit" | "plus" | "warning"; text: string; time: string }>;
}

export interface AdminPricingVehicle {
  id: string | null;
  type: string;
  name: string;
  basePrice: number;
  pricePerKm: number;
  minimumFare: number;
  isAvailable: boolean;
}

export interface AdminPricingSnapshot {
  vehicles: AdminPricingVehicle[];
  commissionRate: number;
  coupons: Array<{ id: string; code: string; desc: string; status: string; expires: string; usage: string }>;
  history: Array<{ time: string; user: string; action: string; status: string }>;
}

export interface VehicleCatalogEntry {
  type: "BIKE" | "CAR" | "PICKUP" | "VAN_7FT" | "VAN_9FT" | "LORRY_10FT" | "LORRY_14FT" | "LORRY_17FT";
  label: string;
  icon?: "bike" | "car" | "pickup" | "van" | "truck" | string;
  defaultPayloadKg?: number;
}

export interface AdminFleetVehicleClass {
  type: VehicleCatalogEntry["type"];
  label: string;
  description: string;
  enabled: boolean;
  active?: number;
}

export interface AdminFleetRegion {
  id: string;
  name: string;
  hubCount: number;
  zone: string;
  enabled: boolean;
  latitude?: number | null;
  longitude?: number | null;
  radiusKm?: number | null;
}

export interface AdminFleetSettingsUpdatePayload {
  payout: {
    baseRatePerKm: number;
    peakMultiplier: number;
  };
  maintenance: {
    mileageThresholdEnabled: boolean;
    mileageThresholdKm: number;
    emissionCheckEnabled: boolean;
    telematicsFaultsEnabled: boolean;
    criticalNotification: string;
  };
  regions: AdminFleetRegion[];
  vehicleClasses: AdminFleetVehicleClass[];
}

export interface AdminFleetSettingsSnapshot {
  settings: AdminFleetSettingsUpdatePayload;
  currency: "MYR";
  distanceUnit: "km";
  auditItems: Array<{ icon: "edit" | "plus" | "warning"; text: string; time: string }>;
}

export interface MapCoordinate {
  lat: number;
  lng: number;
}

export interface AdminMapDriver {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  photo?: string | null;
  isOnline?: boolean;
  vehicle?: { type?: string; licensePlate?: string; make?: string; model?: string; year?: number } | null;
  position: MapCoordinate | null;
}

export interface AdminMapBookingSummary {
  bookingId: string;
  orderCode: string;
  status: string;
  vehicleType: string;
  driver: AdminMapDriver | null;
  route: {
    pickup: MapCoordinate | null;
    dropoff: MapCoordinate | null;
    pickupLabel: string;
    dropoffLabel: string;
  };
  etaMinutes: number | null;
  updatedAt: string;
}

export interface PlannedRouteSnapshot {
  geometry: MapCoordinate[];
  distanceMeters: number;
  durationSeconds: number;
  source: string;
  expiresAt?: string;
  routePhase?: RoutePhase;
  activeRouteWindow?: ActiveRouteWindow;
}

export interface ActualPathPoint {
  position: MapCoordinate;
  command: string;
  success: boolean;
  capturedAt: string;
  distanceToExpectedMeters: number | null;
}

export interface RouteDeviationSnapshot {
  distanceFromPlannedMeters: number | null;
  status: "UNKNOWN" | "ON_ROUTE" | "WATCH" | "OFF_ROUTE";
  stale: boolean;
}

export interface LiveOverviewSnapshot {
  generatedAt: string;
  precision: "overview_bucketed";
  stats: {
    active: number;
    onlineDrivers: number;
    delayed: number;
    idle: number;
    enRoute: number;
  };
  bookings: AdminMapBookingSummary[];
  drivers: AdminMapDriver[];
}

export interface LiveMapAlert {
  id: string;
  type: string;
  severity: "critical" | "warning" | "info" | string;
  title: string;
  detail: string;
  occurredAt: string;
  timeLabel: string | null;
  bookingId: string;
  driverId: string | null;
}

export interface LiveMapFeaturedDispatch {
  bookingId: string;
  orderCode: string;
  driver: {
    id: string;
    name: string;
    email?: string;
    phone?: string;
    photo?: string | null;
    isOnline: boolean;
  };
  status: string;
  dutyLabel: string;
  routeProgressPercent: number;
  vehicle: {
    label: string;
    type?: string;
    licensePlate?: string | null;
  };
  nextStop: string;
  updatedAt: string;
}

export interface LiveMapDashboardSnapshot extends LiveOverviewSnapshot {
  source: "database" | string;
  stale: boolean;
  activeAlerts: LiveMapAlert[];
  featuredDispatch: LiveMapFeaturedDispatch | null;
}

export interface IncidentMapSnapshot {
  generatedAt: string;
  precision: "detail_exact";
  incidents: Array<{
    id: string;
    type: string;
    severity: string;
    booking: AdminMapBookingSummary;
    plannedRoute: PlannedRouteSnapshot;
    actualPath: ActualPathPoint[];
    deviation: RouteDeviationSnapshot;
  }>;
}

export interface DispatchMapSnapshot {
  generatedAt: string;
  precision: "detail_exact";
  booking: AdminMapBookingSummary;
  routePhase: RoutePhase;
  activeRouteWindow: ActiveRouteWindow;
  plannedRoute: PlannedRouteSnapshot;
  actualPath: ActualPathPoint[];
  deviation: RouteDeviationSnapshot;
  events: Array<{
    id: string;
    command: string;
    success: boolean;
    message: string;
    position: MapCoordinate | null;
    distanceToExpectedMeters: number | null;
    createdAt: string;
  }>;
}

export type RoutePhase = "TO_PICKUP" | "TO_DROPOFF" | "UNAVAILABLE";

export interface ActiveRouteWindow {
  phase: RoutePhase;
  origin: MapCoordinate | null;
  originLabel: string;
  destination: MapCoordinate | null;
  destinationLabel: string;
}

export interface OptimizeQueueSnapshot {
  generatedAt: string;
  waypointCap: number;
  selectedCount: number;
  queue: Array<{
    priority: number;
    booking: AdminMapBookingSummary;
    status: "CALCULATING" | "PENDING" | "OPTIMIZED";
    savingsPct: number;
  }>;
}

export interface OptimizeRunResult {
  generatedAt: string;
  status: "COMPLETED" | "FALLBACK" | "SKIPPED";
  reason?: string;
  queue: OptimizeQueueSnapshot;
  optimizedRoute?: {
    origin: MapCoordinate;
    destination: MapCoordinate;
    waypoints: Array<{ position: MapCoordinate; originalIndex: number }>;
    distanceMeters: number;
    durationSeconds: number;
  };
}

// ── New types for orders + customers listing ─────────────────

export interface AdminOrder {
  id: string;
  orderCode: string;
  status: string;
  pickupAddress: string | { address: string; contactName?: string; [key: string]: unknown };
  deliveryAddress: string | { address: string; contactName?: string; [key: string]: unknown };
  customerName: string;
  driverName: string | null;
  vehicleType: string;
  createdAt: string;
}

export interface AdminOrdersParams {
  page?: number;
  limit?: number;
  status?: string;
  vehicleType?: string;
  search?: string;
  dateFrom?: string;
  dateTo?: string;
}

export interface AdminOrdersResponse {
  success: boolean;
  data: AdminOrder[];
  total: number;
  totalPages: number;
  page: number;
  limit: number;
}

export interface AdminCustomer {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  isVerified: boolean;
  totalOrders: number;
  activeOrders: number;
  totalSpent: number;
  createdAt: string;
  lastOrderAt: string | null;
}

export interface AdminCustomersPage {
  customers: AdminCustomer[];
  total: number;
  page: number;
  limit: number;
}

export interface AdminCustomerStats {
  totalUsers: number;
  verifiedUsers: number;
  activeUsers: number;
  totalRevenue: number;
}

export interface RouteDistanceResult {
  distanceMeters: number;
  durationSeconds: number;
  distanceKm: number;
  durationMinutes: number;
}

export type SupportRequesterType = "CUSTOMER" | "DRIVER";
export type SupportTicketStatus = "OPEN" | "IN_PROGRESS" | "RESOLVED" | "CLOSED";
export type SupportTicketPriority = "LOW" | "MEDIUM" | "HIGH" | "URGENT";

export interface AdminSupportAttachment {
  id?: string;
  ticketId?: string;
  messageId?: string;
  fileUrl: string;
  storagePath: string;
  mimeType: string;
  fileSize: number;
  createdAt?: string;
}

export interface AdminSupportMessage {
  id: string;
  ticketId: string;
  rawTicketId: string;
  senderId: string;
  isStaff: boolean;
  messageType: "USER_MESSAGE" | "STAFF_MESSAGE" | "INTERNAL_NOTE" | "SYSTEM_EVENT";
  isCustomerVisible: boolean;
  message: string;
  imageUrl?: string | null;
  attachments: AdminSupportAttachment[];
  createdAt: string;
}

export interface AdminSupportRequester {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export interface AdminSupportBooking {
  id: string;
  orderCode: string;
  status: string;
  vehicleType: string;
}

export interface AdminSupportTicket {
  id: string;
  rawId: string;
  requesterType: SupportRequesterType;
  requester: AdminSupportRequester | null;
  booking: AdminSupportBooking | null;
  subject: string;
  category: string;
  status: SupportTicketStatus;
  priority: SupportTicketPriority;
  source: string;
  intakePath?: Array<{ id: string; label: string }> | null;
  intakeAnswers?: unknown;
  assignedAdminId?: string | null;
  assignedAdminEmail?: string | null;
  assignedAt?: string | null;
  resolvedAt?: string | null;
  closedAt?: string | null;
  createdAt: string;
  updatedAt: string;
  lastMessage?: AdminSupportMessage | null;
  messages?: AdminSupportMessage[];
}
