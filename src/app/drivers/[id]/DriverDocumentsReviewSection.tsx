"use client";

import { useState } from "react";
import type { DriverDocument } from "@/types";

const DOC_TYPE_LABELS: Record<string, string> = {
  DRIVERS_LICENSE: "Driver's License",
  DRIVERS_LICENSE_BACK: "Driver's License Back",
  GDL: "GDL",
  VEHICLE_REGISTRATION: "Vehicle Registration",
  ROAD_TAX: "Road Tax",
  PUSPAKOM: "PUSPAKOM",
  APAD_PERMIT: "APAD / LPKP Permit",
  VEHICLE_PHOTO_FRONT: "Vehicle Front Photo",
  VEHICLE_PHOTO_BACK: "Vehicle Back Photo",
  VEHICLE_PHOTO_LEFT: "Vehicle Left Photo",
  VEHICLE_PHOTO_RIGHT: "Vehicle Right Photo",
  VEHICLE_PHOTO_INTERIOR: "Vehicle Interior Photo",
  BANK_STATEMENT: "Bank Statement",
  POLICE_CLEARANCE: "Police Clearance",
  INSURANCE: "Insurance Certificate",
  PROFILE_PHOTO: "Profile Photo",
  ID_PROOF: "Government ID",
  MYKAD_FRONT: "MyKad Front",
  MYKAD_BACK: "MyKad Back",
  SELFIE: "Selfie",
  PASSPORT: "Passport",
  WORK_PERMIT_PLKS: "Work Permit / PLKS",
};

const DOC_STATUS_STYLES: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-700",
  APPROVED: "bg-green-100 text-green-700",
  REJECTED: "bg-red-100 text-red-700",
};

type DriverDocumentsReviewSectionProps = {
  documents: DriverDocument[];
  actionLoading: string | null;
  onApprove: (doc: DriverDocument) => void;
  onRejectStart: (docId: string) => void;
  onPreview: (imageUrl: string) => void;
};

export function DriverDocumentsReviewSection({
  documents,
  actionLoading,
  onApprove,
  onRejectStart,
  onPreview,
}: DriverDocumentsReviewSectionProps) {
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());
  const pendingCount = documents.filter((doc) => doc.status === "PENDING").length;

  return (
    <section id="uploaded-documents" className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 mb-6 scroll-mt-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Uploaded Documents</h2>
          <p className="text-sm text-gray-500">
            {documents.length} uploaded document{documents.length === 1 ? "" : "s"}
            {pendingCount > 0 ? `, ${pendingCount} pending review` : ""}
          </p>
        </div>
      </div>

      {documents.length === 0 ? (
        <p className="text-gray-400 text-sm">No documents uploaded yet</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {documents.map((doc) => {
            const imageFailed = failedImages.has(doc.id);
            const label = DOC_TYPE_LABELS[doc.type] || doc.type;

            return (
              <article key={doc.id} className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  type="button"
                  className="relative h-48 w-full bg-gray-100 group text-left disabled:cursor-not-allowed"
                  onClick={() => !imageFailed && onPreview(doc.imageUrl)}
                  disabled={imageFailed}
                  aria-label={imageFailed ? `${label} preview unavailable` : `Preview ${label}`}
                >
                  {imageFailed ? (
                    <div className="h-full w-full flex flex-col items-center justify-center p-4 text-center">
                      <p className="text-sm font-semibold text-gray-700">Preview unavailable</p>
                      <p className="text-xs text-gray-500 mt-1">
                        The document row exists, but the signed image URL could not be loaded.
                      </p>
                    </div>
                  ) : (
                    <>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={doc.imageUrl}
                        alt={label}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                        onError={() => {
                          setFailedImages((current) => new Set(current).add(doc.id));
                        }}
                      />
                      <span className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                        <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity text-sm font-medium">
                          Click to enlarge
                        </span>
                      </span>
                    </>
                  )}
                </button>

                <div className="p-3">
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <p className="text-sm font-medium text-gray-900">{label}</p>
                    <span
                      className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                        DOC_STATUS_STYLES[doc.status] || "bg-gray-100"
                      }`}
                    >
                      {doc.status}
                    </span>
                  </div>

                  <p className="text-xs text-gray-400 mb-3">
                    Uploaded {new Date(doc.uploadedAt).toLocaleDateString()}
                  </p>

                  {doc.expiryDate && (
                    <p className="text-xs text-gray-500 mb-3">
                      Expires {new Date(doc.expiryDate).toLocaleDateString()}
                    </p>
                  )}

                  {doc.rejectionReason && (
                    <p className="text-xs text-red-600 bg-red-50 rounded p-2 mb-3">
                      Rejection reason: {doc.rejectionReason}
                    </p>
                  )}

                  {doc.status === "PENDING" && (
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => onApprove(doc)}
                        disabled={actionLoading === doc.id}
                        className="flex-1 px-3 py-1.5 text-xs font-medium rounded-lg bg-green-600 text-white hover:bg-green-700 disabled:opacity-50 transition-colors"
                      >
                        {actionLoading === doc.id ? "..." : "Approve"}
                      </button>
                      <button
                        type="button"
                        onClick={() => onRejectStart(doc.id)}
                        disabled={actionLoading === doc.id}
                        className="flex-1 px-3 py-1.5 text-xs font-medium rounded-lg bg-red-600 text-white hover:bg-red-700 disabled:opacity-50 transition-colors"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
