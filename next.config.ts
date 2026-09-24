import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Next 16 blocks optimizing images from local/private IPs; the dev API runs on localhost.
    dangerouslyAllowLocalIP: process.env.NODE_ENV === "development",
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000", // or your backend port
      },
    ],
  },
};

export default nextConfig;
