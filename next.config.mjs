/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  // PREVIEW=1 builds with relative asset paths for static hosts that serve from a sub-path
  ...(process.env.PREVIEW ? { assetPrefix: "." } : {}),
};

export default nextConfig;
