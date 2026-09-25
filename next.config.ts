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
        source: '/studio',
        destination: '/admin/studio',
        permanent: false,
      },
      {
        source: '/studio/:path*',
        destination: '/admin/studio/:path*',
        permanent: false,
      },
      {
        source: '/sanity',
        destination: '/admin/studio',
        permanent: false,
      },
      {
        source: '/sanity/:path*',
        destination: '/admin/studio/:path*',
        permanent: false,
      },
      {
        source: '/cms',
        destination: '/admin/studio',
        permanent: false,
      },
      {
        source: '/cms/:path*',
        destination: '/admin/studio/:path*',
        permanent: false,
      },
      {
        source: '/sanity-studio',
        destination: '/admin/studio',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;