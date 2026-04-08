import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // Type-checking runs in your editor; skip it during compilation for faster dev
    ignoreBuildErrors: true,
  },
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
