import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Self-contained server build for the VPS: `node .next/standalone/server.js`
  output: "standalone",
};

export default nextConfig;
