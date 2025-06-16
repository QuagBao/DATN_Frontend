import withBundleAnalyzer from '@next/bundle-analyzer'

/** @type {import('next').NextConfig} */
const nextConfig = {
  productionBrowserSourceMaps: true,
  experimental: {
    // optimizeCss: true
  },
  // Bật chế độ strict mode để phát hiện sớm lỗi trong React
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
        port: '',
        pathname: '/wikipedia/commons/**'
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
        pathname: '/**'
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'example.com',
        port: '',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'img.vietqr.io',
        port: '',
        pathname: '/**'
      }
    ]
  },
  i18n: {
    locales: ['en', 'vi', 'ja'],
    defaultLocale: 'en',
    localeDetection: false
  },
  env: {
    ENCRYPTION_SECRET: process.env.ENCRYPTION_SECRET
  },
  eslint: {
    // Bật kiểm tra ESLint khi build
    ignoreDuringBuilds: false
  },
  typescript: {
    // Không cho phép build thành công nếu có lỗi TypeScript
    ignoreBuildErrors: false
  },
  webpack(config) {
    // Lấy rule xử lý file SVG hiện có
    const fileLoaderRule = config.module.rules.find((rule) => rule.test?.test?.('.svg'))

    config.module.rules.push(
      // Áp dụng lại rule hiện có, nhưng chỉ cho các file SVG có query ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/ // *.svg?url
      },
      // Chuyển các file SVG khác thành React component
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // loại trừ nếu *.svg?url
        use: ['@svgr/webpack']
      }
    )

    // Điều chỉnh rule file loader để bỏ qua *.svg vì đã được xử lý riêng
    fileLoaderRule.exclude = /\.svg$/i

    return config
  }
}

export default withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true'
})(nextConfig)
