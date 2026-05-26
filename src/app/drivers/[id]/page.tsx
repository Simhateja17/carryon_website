"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getDriverDetail, revealDriverSensitiveField, reviewDocument, updateDriverVerification } from "@/lib/api";
import type { DriverDetail, DriverDocument, DriverSensitiveField } from "@/types";
import { DriverDocumentsReviewSection } from "./DriverDocumentsReviewSection";

const VERIFICATION_STYLES: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-800 border-yellow-200",
  IN_REVIEW: "bg-blue-100 text-blue-800 border-blue-200",
  APPROVED: "bg-green-100 text-green-800 border-green-200",
  REJECTED: "bg-red-100 text-red-800 border-red-200",
};

const VERIFICATION_LABELS: Record<string, string> = {
  PENDING: "Pending",
  IN_REVIEW: "In Review",
  APPROVED: "Approved",
  REJECTED: "Rejected",
};

const REQUIRED_DRIVER_ONBOARDING_DOCUMENT_TYPES: readonly DriverDocument["type"][] = [
  "MYKAD_FRONT",
  "MYKAD_BACK",
  "SELFIE",
  "DRIVERS_LICENSE",
  "DRIVERS_LICENSE_BACK",
  "VEHICLE_REGISTRATION",
  "VEHICLE_PHOTO_FRONT",
  "VEHICLE_PHOTO_BACK",
];

export default function DriverDetailPage() {
  const params = useParams();
  const router = useRouter();
  const driverId = params.id as string;

  const [driver, setDriver] = useState<DriverDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [rejectDocId, setRejectDocId] = useState<string | null>(null);
  const [rejectionReason, setRejectionReason] = useState("");
  const [rejectDriverOpen, setRejectDriverOpen] = useState(false);
  const [driverRejectionReason, setDriverRejectionReason] = useState("");
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [revealedFields, setRevealedFields] = useState<Partial<Record<DriverSensitiveField, string>>>({});

  async function loadDriver() {
    try {
      setLoading(true);
      const res = await getDriverDetail(driverId);
      setDriver(res.data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load driver");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadDriver();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [driverId]);

  async function handleApproveDoc(doc: DriverDocument) {
    setActionLoading(doc.id);
    setActionError(null);
    try {
      await reviewDocument(driverId, doc.id, "APPROVED");
      await loadDriver();
    } catch (err) {
      setActionError(err instanceof Error ? err.message : "Failed to approve document");
    } finally {
      setActionLoading(null);
    }
  }

  async function handleRejectDoc() {
    if (!rejectDocId || !rejectionReason.trim()) return;
    setActionLoading(rejectDocId);
    setActionError(null);
    try {
      await reviewDocument(driverId, rejectDocId, "REJECTED", rejectionReason.trim());
      setRejectDocId(null);
      setRejectionReason("");
      await loadDriver();
    } catch (err) {
      setActionError(err instanceof Error ? err.message : "Failed to reject document");
    } finally {
      setActionLoading(null);
    }
  }

  async function handleVerification(
    status: "PENDING" | "IN_REVIEW" | "APPROVED" | "REJECTED",
    reason?: string
  ) {
    setActionLoading(`verify-${status}`);
    setActionError(null);
    try {
      await updateDriverVerification(driverId, status, reason);
      await loadDriver();
    } catch (err) {
      setActionError(err instanceof Error ? err.message : "Failed to update verification");
    } finally {
      setActionLoading(null);
    }
  }

  async function handleRejectDriver() {
    if (!driverRejectionReason.trim()) return;
    await handleVerification("REJECTED", driverRejectionReason.trim());
    setRejectDriverOpen(false);
    setDriverRejectionReason("");
  }

  async function handleReveal(field: DriverSensitiveField) {
    setActionLoading(`reveal-${field}`);
    setActionError(null);
    try {
      const res = await revealDriverSensitiveField(driverId, field, "Driver onboarding review");
      setRevealedFields((current) => ({ ...current, [field]: res.data.value }));
      const ttl = Math.max(0, new Date(res.data.expiresAt).getTime() - Date.now());
      window.setTimeout(() => {
        setRevealedFields((current) => {
          const next = { ...current };
          delete next[field];
          return next;
        });
      }, ttl || 60_000);
    } catch (err) {
      setActionError(err instanceof Error ? err.message : "Failed to reveal field");
    } finally {
      setActionLoading(null);
    }
  }

  if (loading) {
    return (
      <main className="flex-1 overflow-y-auto p-8 box-border">
        <div className="flex items-center justify-center h-64 gap-3">
          <svg className="animate-spin h-5 w-5 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <span className="text-gray-500">Loading driver details...</span>
        </div>
      </main>
    );
  }

  if (error || !driver) {
    return (
      <main className="flex-1 overflow-y-auto p-8 box-border">
        <div className="flex flex-col items-center justify-center h-64 gap-4">
          <p className="text-red-500">{error || "Driver not found"}</p>
          <button
            onClick={() => router.push("/drivers")}
            className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
          >
            Back to Drivers
          </button>
        </div>
      </main>
    );
  }

  const pendingDocCount = driver.documents.filter((doc) => doc.status === "PENDING").length;
  const rejectedDocCount = driver.documents.filter((doc) => doc.status === "REJECTED").length;
  const approvedDocumentTypes = new Set(
    driver.documents
      .filter((doc) => doc.status === "APPROVED")
      .map((doc) => doc.type)
  );
  const missingApprovedRequiredDocTypes = REQUIRED_DRIVER_ONBOARDING_DOCUMENT_TYPES.filter(
    (type) => !approvedDocumentTypes.has(type)
  );
  const approvalBlockers = [
    !driver.vehicle ? "Vehicle details are missing." : "",
    missingApprovedRequiredDocTypes.length > 0
      ? `Required approved documents are missing: ${missingApprovedRequiredDocTypes.join(", ")}.`
      : "",
    pendingDocCount > 0 ? `${pendingDocCount} document${pendingDocCount === 1 ? " is" : "s are"} still pending.` : "",
    rejectedDocCount > 0 ? `${rejectedDocCount} rejected document${rejectedDocCount === 1 ? "" : "s"} must be corrected.` : "",
    !driver.profile?.pdpaConsent ? "PDPA consent is missing." : "",
    !driver.profile?.backgroundCheckConsent ? "Background check consent is missing." : "",
    !driver.profile?.noOffencesDeclared ? "No-offences declaration is missing." : "",
  ].filter(Boolean);
  const canApproveDriver = approvalBlockers.length === 0;

  return (
    <main className="flex-1 overflow-y-auto p-8 box-border">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => router.push("/drivers")}
          className="p-2 rounded-lg hover:bg-gray-200 transition-colors"
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {driver.name || <span className="text-gray-400 italic">No name</span>}
          </h1>
          <p className="text-sm text-gray-500">{driver.email}</p>
        </div>
        <span
          className={`ml-auto px-3 py-1 text-sm font-medium rounded-full border ${
            VERIFICATION_STYLES[driver.verificationStatus] || "bg-gray-100"
          }`}
        >
          {VERIFICATION_LABELS[driver.verificationStatus] || driver.verificationStatus}
        </span>
      </div>

      {/* Action error banner */}
      {actionError && (
        <div className="mb-4 flex items-center justify-between bg-red-50 border border-red-200 rounded-lg px-4 py-3">
          <p className="text-sm text-red-700">{actionError}</p>
          <button
            onClick={() => setActionError(null)}
            className="text-red-400 hover:text-red-600 text-sm font-medium ml-4"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Review decision */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 mb-6">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-1">Review Decision</h2>
            <p className="text-sm text-gray-500">
              Approving verifies the driver and allows them to accept deliveries. Rejecting keeps them out of the fleet until they correct the issue.
            </p>
            {driver.verificationRejectionReason && (
              <p className="mt-3 text-sm text-red-700 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                Rejection reason: {driver.verificationRejectionReason}
              </p>
            )}
          </div>
          <div className="flex flex-wrap gap-3">
            {driver.verificationStatus !== "IN_REVIEW" && driver.verificationStatus !== "APPROVED" && (
              <button
                onClick={() => handleVerification("IN_REVIEW")}
                disabled={actionLoading?.startsWith("verify")}
                className="px-4 py-2 text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 transition-colors"
              >
                {actionLoading === "verify-IN_REVIEW" ? "Marking..." : "Start Review"}
              </button>
            )}
            {driver.verificationStatus !== "APPROVED" && (
              <button
                onClick={() => handleVerification("APPROVED")}
                disabled={!canApproveDriver || actionLoading?.startsWith("verify")}
                className="px-4 py-2 text-sm font-medium rounded-lg bg-green-600 text-white hover:bg-green-700 disabled:opacity-50 transition-colors"
                title={!canApproveDriver ? approvalBlockers.join(" ") : "Approve driver"}
              >
                {actionLoading === "verify-APPROVED" ? "Approving..." : "Approve Driver"}
              </button>
            )}
            {driver.verificationStatus !== "REJECTED" && driver.verificationStatus !== "APPROVED" && (
              <button
                onClick={() => {
                  setRejectDriverOpen(true);
                  setDriverRejectionReason("");
                }}
                disabled={actionLoading?.startsWith("verify")}
                className="px-4 py-2 text-sm font-medium rounded-lg bg-red-600 text-white hover:bg-red-700 disabled:opacity-50 transition-colors"
              >
                Reject Driver
              </button>
            )}
          </div>
        </div>

        {driver.verificationStatus === "APPROVED" ? (
          <p className="mt-4 flex items-center gap-2 text-green-700 text-sm font-medium">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Driver is verified and can accept deliveries.
          </p>
        ) : canApproveDriver ? (
          <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-3">
            <p className="text-sm text-green-800">All required review checks are complete.</p>
          </div>
        ) : (
          <div className="mt-4 bg-amber-50 border border-amber-200 rounded-lg p-3">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-1">
              <p className="text-sm font-medium text-amber-900">Approval is blocked until:</p>
              {driver.documents.length > 0 && (
                <a
                  href="#uploaded-documents"
                  className="text-xs font-semibold text-amber-900 underline underline-offset-2"
                >
                  Review {driver.documents.length} uploaded documents
                </a>
              )}
            </div>
            <ul className="list-disc pl-5 text-sm text-amber-800 space-y-1">
              {approvalBlockers.map((blocker) => (
                <li key={blocker}>{blocker}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Driver Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <InfoCard label="Phone" value={driver.phone || "Not provided"} />
        <InfoCard label="Emergency Contact" value={driver.emergencyContact || "Not provided"} />
        <InfoCard label="Joined" value={new Date(driver.createdAt).toLocaleDateString()} />
        <InfoCard label="Rating" value={driver.rating > 0 ? driver.rating.toFixed(1) : "No ratings"} />
        <InfoCard label="Total Trips" value={String(driver.totalTrips)} />
        <InfoCard
          label="Online Status"
          value={driver.isOnline ? "Online" : "Offline"}
          valueClassName={driver.isOnline ? "text-green-600" : "text-gray-500"}
        />
        <InfoCard
          label="Onboarding Submitted"
          value={driver.onboardingSubmittedAt ? new Date(driver.onboardingSubmittedAt).toLocaleString() : "Not submitted"}
        />
        <InfoCard
          label="Agreement"
          value={driver.latestSubmission?.agreementVersion || driver.profile?.agreementVersion || "Not provided"}
        />
      </div>

      <DriverDocumentsReviewSection
        documents={driver.documents}
        actionLoading={actionLoading}
        onApprove={handleApproveDoc}
        onRejectStart={(docId) => {
          setRejectDocId(docId);
          setRejectionReason("");
        }}
        onPreview={setPreviewImage}
      />

      {/* Personal Identity */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Personal Identity</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <Detail label="Date of Birth" value={driver.profile?.dateOfBirth || ""} />
          <Detail label="Gender" value={driver.profile?.gender || ""} />
          <Detail label="Nationality" value={driver.profile?.nationality || ""} />
          <SensitiveDetail label="MyKad Number" field="mykadNumber" driver={driver} revealed={revealedFields.mykadNumber} loading={actionLoading === "reveal-mykadNumber"} onReveal={handleReveal} />
          <SensitiveDetail label="Passport Number" field="passportNumber" driver={driver} revealed={revealedFields.passportNumber} loading={actionLoading === "reveal-passportNumber"} onReveal={handleReveal} />
          <SensitiveDetail label="PLKS Number" field="plksNumber" driver={driver} revealed={revealedFields.plksNumber} loading={actionLoading === "reveal-plksNumber"} onReveal={handleReveal} />
        </div>
      </div>

      {/* Contact and Address */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Contact and Address</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <Detail label="Address Line 1" value={driver.profile?.addressLine1 || ""} />
          <Detail label="Address Line 2" value={driver.profile?.addressLine2 || ""} />
          <Detail label="City" value={driver.profile?.city || ""} />
          <Detail label="Postcode" value={driver.profile?.postcode || ""} />
          <Detail label="State" value={driver.profile?.state || ""} />
          <Detail label="Working States" value={(driver.profile?.workingStates || []).join(", ")} />
          <Detail label="Emergency Name" value={driver.profile?.emergencyContactName || ""} />
          <Detail label="Emergency Relation" value={driver.profile?.emergencyContactRelation || ""} />
          <Detail label="Emergency Phone" value={driver.profile?.emergencyContactPhone || ""} />
        </div>
      </div>

      {/* License and Banking */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">License and Banking</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <SensitiveDetail label="License Number" field="driversLicenseNumber" driver={driver} revealed={revealedFields.driversLicenseNumber} loading={actionLoading === "reveal-driversLicenseNumber"} onReveal={handleReveal} />
          <Detail label="License Class" value={driver.profile?.licenseClass || ""} />
          <Detail label="License Expiry" value={driver.profile?.licenseExpiry || ""} />
          <Detail label="Has GDL" value={driver.profile?.hasGDL ? "Yes" : "No"} />
          <Detail label="GDL Expiry" value={driver.profile?.gdlExpiry || ""} />
          <Detail label="Bank Name" value={driver.profile?.bankName || ""} />
          <Detail label="Account Holder" value={driver.profile?.bankAccountHolder || ""} />
          <SensitiveDetail label="Account Number" field="bankAccountNumber" driver={driver} revealed={revealedFields.bankAccountNumber} loading={actionLoading === "reveal-bankAccountNumber"} onReveal={handleReveal} />
          <SensitiveDetail label="DuitNow ID" field="duitNowId" driver={driver} revealed={revealedFields.duitNowId} loading={actionLoading === "reveal-duitNowId"} onReveal={handleReveal} />
          <SensitiveDetail label="TNG Wallet ID" field="tngEwalletId" driver={driver} revealed={revealedFields.tngEwalletId} loading={actionLoading === "reveal-tngEwalletId"} onReveal={handleReveal} />
          <SensitiveDetail label="LHDN Tax Number" field="lhdnTaxNumber" driver={driver} revealed={revealedFields.lhdnTaxNumber} loading={actionLoading === "reveal-lhdnTaxNumber"} onReveal={handleReveal} />
          <SensitiveDetail label="SST Number" field="sstNumber" driver={driver} revealed={revealedFields.sstNumber} loading={actionLoading === "reveal-sstNumber"} onReveal={handleReveal} />
        </div>
      </div>

      {/* Consent */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Consent and Declarations</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <Detail label="PDPA Consent" value={driver.profile?.pdpaConsent ? "Accepted" : "Missing"} />
          <Detail label="Background Check Consent" value={driver.profile?.backgroundCheckConsent ? "Accepted" : "Missing"} />
          <Detail label="No Offences Declared" value={driver.profile?.noOffencesDeclared ? "Declared" : "Missing"} />
        </div>
      </div>

      {/* Vehicle Info */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Vehicle Details</h2>
        {driver.vehicle ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <Detail label="Type" value={driver.vehicle.type} />
            <Detail label="Make" value={driver.vehicle.make} />
            <Detail label="Model" value={driver.vehicle.model} />
            <Detail label="Year" value={String(driver.vehicle.year)} />
            <Detail label="License Plate" value={driver.vehicle.licensePlate} />
            <Detail label="Color" value={driver.vehicle.color} />
            <Detail label="Chassis Number" value={driver.vehicle.chassisNumber || ""} />
            <Detail label="Engine Number" value={driver.vehicle.engineNumber || ""} />
            <Detail label="Ownership" value={driver.vehicle.ownership || ""} />
            <Detail label="Owner Name" value={driver.vehicle.ownerName || ""} />
            <Detail label="Road Tax Expiry" value={driver.vehicle.roadTaxExpiry || ""} />
            <Detail label="PUSPAKOM Expiry" value={driver.vehicle.puspakomExpiry || ""} />
            <Detail label="APAD Permit Number" value={driver.vehicle.apadPermitNumber || ""} />
            <Detail label="APAD Permit Expiry" value={driver.vehicle.apadPermitExpiry || ""} />
            <Detail label="Insurer" value={driver.vehicle.insurerName || ""} />
            <Detail label="Insurance Policy" value={driver.vehicle.insurancePolicyNumber || ""} />
            <Detail label="Coverage Type" value={driver.vehicle.insuranceCoverageType || ""} />
            <Detail label="Insurance Expiry" value={driver.vehicle.insuranceExpiry || ""} />
            <Detail label="Commercial Cover" value={driver.vehicle.hasCommercialCover ? "Yes" : "No"} />
          </div>
        ) : (
          <p className="text-gray-400 text-sm">No vehicle information submitted</p>
        )}
      </div>

      {/* Rejection Reason Modal */}
      {rejectDocId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Reject Document</h3>
            <p className="text-sm text-gray-500 mb-4">
              Please provide a reason for rejection. The driver will see this and can re-upload.
            </p>
            <textarea
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              placeholder="e.g., Image is blurry, document is expired..."
              className="w-full border border-gray-300 rounded-lg p-3 text-sm text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
              rows={3}
              autoFocus
            />
            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => {
                  setRejectDocId(null);
                  setRejectionReason("");
                }}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleRejectDoc}
                disabled={!rejectionReason.trim() || actionLoading === rejectDocId}
                className="px-4 py-2 text-sm font-medium rounded-lg bg-red-600 text-white hover:bg-red-700 disabled:opacity-50 transition-colors"
              >
                {actionLoading === rejectDocId ? "Rejecting..." : "Reject Document"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Driver Rejection Modal */}
      {rejectDriverOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Reject Driver</h3>
            <p className="text-sm text-gray-500 mb-4">
              Provide a clear reason so the driver knows what must be corrected before joining the fleet.
            </p>
            <textarea
              value={driverRejectionReason}
              onChange={(e) => setDriverRejectionReason(e.target.value)}
              placeholder="e.g., Missing commercial insurance, identity document does not match..."
              className="w-full border border-gray-300 rounded-lg p-3 text-sm text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
              rows={4}
              autoFocus
            />
            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => {
                  setRejectDriverOpen(false);
                  setDriverRejectionReason("");
                }}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleRejectDriver}
                disabled={driverRejectionReason.trim().length < 3 || actionLoading === "verify-REJECTED"}
                className="px-4 py-2 text-sm font-medium rounded-lg bg-red-600 text-white hover:bg-red-700 disabled:opacity-50 transition-colors"
              >
                {actionLoading === "verify-REJECTED" ? "Rejecting..." : "Reject Driver"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Image Preview Modal */}
      {previewImage && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 cursor-pointer"
          onClick={() => setPreviewImage(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh] mx-4">
            <button
              onClick={() => setPreviewImage(null)}
              className="absolute -top-10 right-0 text-white hover:text-gray-300 text-sm font-medium"
            >
              Close (ESC)
            </button>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={previewImage}
              alt="Document preview"
              className="max-w-full max-h-[85vh] rounded-lg object-contain"
              referrerPolicy="no-referrer"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </main>
  );
}

function InfoCard({
  label,
  value,
  valueClassName,
}: {
  label: string;
  value: string;
  valueClassName?: string;
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
      <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">{label}</p>
      <p className={`text-sm font-medium ${valueClassName || "text-gray-900"}`}>{value}</p>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-gray-500">{label}</p>
      <p className="text-sm font-medium text-gray-900">{value || "-"}</p>
    </div>
  );
}

function SensitiveDetail({
  label,
  field,
  driver,
  revealed,
  loading,
  onReveal,
}: {
  label: string;
  field: DriverSensitiveField;
  driver: DriverDetail;
  revealed?: string;
  loading: boolean;
  onReveal: (field: DriverSensitiveField) => void;
}) {
  const meta = driver.sensitive?.[field];
  const value = revealed ?? meta?.masked ?? "";
  return (
    <div>
      <p className="text-xs text-gray-500">{label}</p>
      <div className="flex items-center gap-2">
        <p className="text-sm font-medium text-gray-900">{value || "-"}</p>
        {meta?.hasValue && !revealed && (
          <button
            type="button"
            onClick={() => onReveal(field)}
            disabled={loading}
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 disabled:opacity-50"
          >
            {loading ? "..." : "Reveal"}
          </button>
        )}
      </div>
    </div>
  );
}
