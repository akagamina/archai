/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/architectai",
  assetPrefix: "/architectai",
  images: {
    loader: "akamai",
    path: "",
  },
};

export default nextConfig;
