import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = withNextIntl({
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    optimizePackageImports: ['gsap'],
  },
  turbopack: {
    resolveAlias: { 'next-intl/config': './i18n/request.ts' },
  },
});

// next-intl 3 emits the old experimental.turbo key; Next 16 reads turbopack.
if (nextConfig.experimental?.turbo) {
  delete nextConfig.experimental.turbo;
}

export default nextConfig;
