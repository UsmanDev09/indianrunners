/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false };

    return config;
  },
  images: {
    domains: ["res.cloudinary.com"],
  },
  env: {
    SERVER_DOMAIN: process.env.SERVER_DOMAIN,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
    RAZOR_PAY_API_KEY: process.env.RAZOR_PAY_API_KEY,
    // CLIENT_URL: process.env.CLIENT_URL
  },
};

module.exports = nextConfig;
