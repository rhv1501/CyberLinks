/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [];
  },
  experimental: {
    serverActions: true,
  },
};

export default nextConfig;
