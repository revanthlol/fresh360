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
      {
        source: '/admin',
        destination: '/studio',
        permanent: false,
      },
      {
        source: '/admin/:path*',
        destination: '/studio/:path*',
        permanent: false,
      },
      {
        source: '/sanity',
        destination: '/studio',
        permanent: false,
      },
      {
        source: '/sanity/:path*',
        destination: '/studio/:path*',
        permanent: false,
      },
      {
        source: '/cms',
        destination: '/studio',
        permanent: false,
      },
      {
        source: '/cms/:path*',
        destination: '/studio/:path*',
        permanent: false,
      },
      {
        source: '/sanity-studio',
        destination: '/studio',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;