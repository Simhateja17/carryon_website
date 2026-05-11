import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { DriverDocumentsReviewSection } from "../app/drivers/[id]/DriverDocumentsReviewSection";
import type { DriverDocument } from "@/types";

function document(overrides: Partial<DriverDocument> = {}): DriverDocument {
  return {
    id: "doc-1",
    driverId: "driver-1",
    type: "MYKAD_FRONT",
    imageUrl: "https://signed.example/mykad-front.jpg",
    expiryDate: null,
    status: "PENDING",
    rejectionReason: null,
    uploadedAt: "2026-05-11T16:20:41.351Z",
    ...overrides,
  };
}

describe("DriverDocumentsReviewSection", () => {
  it("shows uploaded document count and review actions near the top-level section", () => {
    render(
      <DriverDocumentsReviewSection
        documents={[document(), document({ id: "doc-2", type: "SELFIE" })]}
        actionLoading={null}
        onApprove={vi.fn()}
        onRejectStart={vi.fn()}
        onPreview={vi.fn()}
      />
    );

    expect(screen.getByRole("heading", { name: "Uploaded Documents" })).toBeInTheDocument();
    expect(screen.getByText("2 uploaded documents, 2 pending review")).toBeInTheDocument();
    expect(screen.getByText("MyKad Front")).toBeInTheDocument();
    expect(screen.getByText("Selfie")).toBeInTheDocument();
    expect(screen.getAllByRole("button", { name: "Approve" })).toHaveLength(2);
  });

  it("shows a visible fallback when a signed document preview cannot load", () => {
    render(
      <DriverDocumentsReviewSection
        documents={[document()]}
        actionLoading={null}
        onApprove={vi.fn()}
        onRejectStart={vi.fn()}
        onPreview={vi.fn()}
      />
    );

    fireEvent.error(screen.getByAltText("MyKad Front"));

    expect(screen.getByText("Preview unavailable")).toBeInTheDocument();
    expect(screen.getByText(/document row exists/i)).toBeInTheDocument();
  });
});
