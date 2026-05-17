import type { AdminDriverRegistrationPayload, DriverDocument, DriverVehicle } from "@/types";

export interface DriverRegistrationFormState {
  fullName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  governmentId: string;
  residentialAddress: string;
  driversLicenseNumber: string;
  licenseClass: string;
  licenseExpiry: string;
  emergencyContactName: string;
  emergencyContactRelation: string;
  emergencyContactPhone: string;
  pdpaConsent: boolean;
  backgroundCheckConsent: boolean;
  noOffencesDeclared: boolean;
  vehicleType: DriverVehicle["type"];
  vehicleMake: string;
  vehicleModel: string;
  vehicleYear: string;
  licensePlate: string;
  vehicleColor: string;
  chassisNumber: string;
  engineNumber: string;
  vehicleOwnership: string;
  ownerName: string;
  roadTaxExpiry: string;
  insurerName: string;
  insurancePolicyNumber: string;
  insuranceExpiry: string;
  hasCommercialCover: boolean;
  documents: Array<{
    type: DriverDocument["type"];
    imageUrl: string;
    expiryDate: string;
  }>;
}

export function buildDriverRegistrationPayload(
  form: DriverRegistrationFormState
): AdminDriverRegistrationPayload {
  const payload = {
    name: form.fullName.trim(),
    email: form.email.trim().toLowerCase(),
    phone: form.phone.trim(),
    dateOfBirth: form.dateOfBirth.trim(),
    governmentId: form.governmentId.trim(),
    addressLine1: form.residentialAddress.trim(),
    driversLicenseNumber: form.driversLicenseNumber.trim(),
    licenseClass: form.licenseClass.trim(),
    licenseExpiry: form.licenseExpiry.trim(),
    emergencyContactName: form.emergencyContactName.trim(),
    emergencyContactRelation: form.emergencyContactRelation.trim(),
    emergencyContactPhone: form.emergencyContactPhone.trim(),
    pdpaConsent: form.pdpaConsent,
    backgroundCheckConsent: form.backgroundCheckConsent,
    noOffencesDeclared: form.noOffencesDeclared,
    vehicle: {
      type: form.vehicleType,
      make: form.vehicleMake.trim(),
      model: form.vehicleModel.trim(),
      year: Number(form.vehicleYear),
      licensePlate: form.licensePlate.trim(),
      color: form.vehicleColor.trim(),
      chassisNumber: form.chassisNumber.trim(),
      engineNumber: form.engineNumber.trim(),
      ownership: form.vehicleOwnership.trim(),
      ownerName: form.ownerName.trim(),
      roadTaxExpiry: form.roadTaxExpiry.trim(),
      insurerName: form.insurerName.trim(),
      insurancePolicyNumber: form.insurancePolicyNumber.trim(),
      insuranceExpiry: form.insuranceExpiry.trim(),
      hasCommercialCover: form.hasCommercialCover,
    },
    documents: form.documents
      .map((document) => ({
        type: document.type,
        imageUrl: document.imageUrl.trim(),
        expiryDate: document.expiryDate.trim(),
      }))
      .filter((document) => document.imageUrl.length > 0),
  };

  if (!payload.name) throw new Error("Full legal name is required.");
  if (!payload.email) throw new Error("Email is required.");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
    throw new Error("Enter a valid email address.");
  }
  if (payload.phone.length < 3) throw new Error("Contact phone is required.");
  if (!payload.driversLicenseNumber) throw new Error("Driver license number is required.");
  if (!payload.pdpaConsent || !payload.backgroundCheckConsent || !payload.noOffencesDeclared) {
    throw new Error("All driver declarations must be confirmed.");
  }
  if (!payload.vehicle.make || !payload.vehicle.model || !payload.vehicle.licensePlate) {
    throw new Error("Vehicle make, model, and license plate are required.");
  }
  if (!Number.isInteger(payload.vehicle.year) || payload.vehicle.year < 1980 || payload.vehicle.year > 2100) {
    throw new Error("Enter a valid vehicle year.");
  }
  const duplicateDocType = payload.documents.find((document, index) =>
    payload.documents.findIndex((other) => other.type === document.type) !== index
  );
  if (duplicateDocType) throw new Error(`Duplicate document type: ${duplicateDocType.type}.`);
  if (payload.documents.some((document) => document.imageUrl.startsWith("http"))) {
    throw new Error("Document references must be storage object paths, not public URLs.");
  }

  return payload;
}
