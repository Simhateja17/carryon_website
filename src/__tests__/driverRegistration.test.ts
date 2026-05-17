import { describe, expect, it } from "vitest";
import {
  buildDriverRegistrationPayload,
  type DriverRegistrationFormState,
} from "@/lib/driverRegistration";

describe("buildDriverRegistrationPayload", () => {
  const form: DriverRegistrationFormState = {
    fullName: " Nur Aisyah ",
    email: " Driver@Example.com ",
    phone: " +60123456789 ",
    dateOfBirth: "1990-01-01",
    governmentId: " 900101-01-1234 ",
    residentialAddress: " 12 Jalan Ampang ",
    driversLicenseNumber: " D1234567 ",
    licenseClass: "D",
    licenseExpiry: "2028-01-01",
    emergencyContactName: "Ahmad",
    emergencyContactRelation: "Brother",
    emergencyContactPhone: "+60122222222",
    pdpaConsent: true,
    backgroundCheckConsent: true,
    noOffencesDeclared: true,
    vehicleType: "CAR",
    vehicleMake: " Toyota ",
    vehicleModel: " Vios ",
    vehicleYear: "2022",
    licensePlate: " VAB1234 ",
    vehicleColor: "White",
    chassisNumber: "CH123",
    engineNumber: "EN123",
    vehicleOwnership: "DRIVER_OWNED",
    ownerName: "Nur Aisyah",
    roadTaxExpiry: "2027-01-01",
    insurerName: "Etiqa",
    insurancePolicyNumber: "POL123",
    insuranceExpiry: "2027-01-01",
    hasCommercialCover: true,
    documents: [
      {
        type: "DRIVERS_LICENSE",
        imageUrl: " driver-documents/drivers/driver-1/DRIVERS_LICENSE.jpg ",
        expiryDate: "2028-01-01",
      },
    ],
  };

  it("trims and normalizes admin driver registration form data", () => {
    expect(buildDriverRegistrationPayload(form)).toEqual({
      name: "Nur Aisyah",
      email: "driver@example.com",
      phone: "+60123456789",
      dateOfBirth: "1990-01-01",
      governmentId: "900101-01-1234",
      addressLine1: "12 Jalan Ampang",
      driversLicenseNumber: "D1234567",
      licenseClass: "D",
      licenseExpiry: "2028-01-01",
      emergencyContactName: "Ahmad",
      emergencyContactRelation: "Brother",
      emergencyContactPhone: "+60122222222",
      pdpaConsent: true,
      backgroundCheckConsent: true,
      noOffencesDeclared: true,
      vehicle: {
        type: "CAR",
        make: "Toyota",
        model: "Vios",
        year: 2022,
        licensePlate: "VAB1234",
        color: "White",
        chassisNumber: "CH123",
        engineNumber: "EN123",
        ownership: "DRIVER_OWNED",
        ownerName: "Nur Aisyah",
        roadTaxExpiry: "2027-01-01",
        insurerName: "Etiqa",
        insurancePolicyNumber: "POL123",
        insuranceExpiry: "2027-01-01",
        hasCommercialCover: true,
      },
      documents: [{
        type: "DRIVERS_LICENSE",
        imageUrl: "driver-documents/drivers/driver-1/DRIVERS_LICENSE.jpg",
        expiryDate: "2028-01-01",
      }],
    });
  });

  it("rejects missing required registration identity fields", () => {
    expect(() => buildDriverRegistrationPayload({ ...form, fullName: "" })).toThrow("Full legal name");
    expect(() => buildDriverRegistrationPayload({ ...form, email: "bad" })).toThrow("valid email");
    expect(() => buildDriverRegistrationPayload({ ...form, phone: "" })).toThrow("Contact phone");
    expect(() => buildDriverRegistrationPayload({ ...form, driversLicenseNumber: "" })).toThrow("license number");
    expect(() => buildDriverRegistrationPayload({ ...form, pdpaConsent: false })).toThrow("declarations");
  });
});
