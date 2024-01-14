/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['res.cloudinary.com'],
  },
  env:{
    JWT_SECRET_KEY:process.env.JWT_SECRET_KEY
  }
}

module.exports = nextConfig
