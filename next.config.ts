import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ovkokjixdwygetaqvxug.supabase.co",
        pathname: "/**", // allow any file path
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**", // allow all Google profile images
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        pathname: "/**", // allow all Github avatars
      },
    ],
  },
};

export default nextConfig;
