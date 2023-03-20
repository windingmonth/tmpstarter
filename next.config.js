/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  images: {
    domains: ['fakeimg.pl', 'strapi.dev.fantasysz.com', '172.17.3.12', 'localhost'],
  },
  basePath: '/cmp/template',
}

module.exports = nextConfig
