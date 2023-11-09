/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['tsx'],
  compiler: {
    styledComponents: {
      ssr: true,
    },
  },
  images: {
    domains: ['ui-avatars.com']
  }
};

module.exports = nextConfig;
