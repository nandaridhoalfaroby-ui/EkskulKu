import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // JANGAN pake cacheComponents: true kalau masih pake dynamic / revalidate
  cacheComponents: false,
};

export default nextConfig;