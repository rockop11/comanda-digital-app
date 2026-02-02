// Injected content via Sentry wizard
import { withSentryConfig } from "@sentry/nextjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.public.blob.vercel-storage.com',
        pathname: '/restaurants/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
  },
  experimental: {
    webpackBuildWorker: true
  }
};

// Exportar con Sentry config
export default withSentryConfig(nextConfig, {
  org: "comanda-digital",
  project: "comanda-digital-app",

  authToken: process.env.SENTRY_AUTH_TOKEN,

  silent: !process.env.CI,
  widenClientFileUpload: true,
  tunnelRoute: "/monitoring",
  telemetry: false,

  webpack: {
    treeshake: {
      removeDebugLogging: true
    }
  }
});