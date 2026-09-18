import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "i.pravatar.cc", // ✅ added correctly
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/brands/fuzzy',
        destination: '/brands/fruizy',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;