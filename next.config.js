/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Warning: this allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig 