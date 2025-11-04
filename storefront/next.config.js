const checkEnvVariables = require("./check-env-variables")

checkEnvVariables()

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      new URL('http://localhost:9000/static/*'),
      {
        protocol: "https",
        hostname: "medusa-bailefun-fun.s3.eu-west-2.amazonaws.com",
      }
    ],
    qualities: [25, 50, 90],
    unoptimized: process.env.NODE_ENV === "development",
  },
}

module.exports = nextConfig
