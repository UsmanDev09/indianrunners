/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['res.cloudinary.com'],
  },
  env:{
    SERVER_DOMAIN: process.env.SERVER_DOMAIN
  }
}

module.exports = nextConfig
