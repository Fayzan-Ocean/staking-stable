/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: config => {
      config.externals.push('pino-pretty', 'lokijs', 'encoding')
      return config
    },
    typescript: {
 
      ignoreBuildErrors: true,
    },
    images: {
      domains: ['via.placeholder.com','placeholder.com'],
      remotePatterns: [
        {
          protocol: 'https',
          hostname: '**.placeholder.com',
          port: '',
          pathname: '/',
        },
      ],
    },
  }

module.exports = nextConfig
