const path = require("path")

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: { esmExternals: true },
  output: "standalone",
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')]
  }

}

module.exports = nextConfig
