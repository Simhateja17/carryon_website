"use client";

import { useState, useEffect } from "react";
import { getPricingConfig } from "@/lib/api";
import type { AdminPricingVehicle } from "@/types";

export function usePricing() {
  const [vehicles, setVehicles] = useState<AdminPricingVehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    setError(null);

    getPricingConfig()
      .then((res) => {
        if (!alive) return;
        setVehicles(res.data.vehicles);
      })
      .catch((err: Error) => {
        if (!alive) return;
        setError(err.message);
      })
      .finally(() => {
        if (alive) setLoading(false);
      });

    return () => {
      alive = false;
    };
  }, []);

  function getVehiclePrice(vehicleType: string): AdminPricingVehicle | null {
    return vehicles.find((v) => v.type === vehicleType) ?? null;
  }

  return { vehicles, loading, error, getVehiclePrice };
}
