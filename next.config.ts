import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Turbopack (next dev) — @svgr/webpack is explicitly supported
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },

  // Webpack (next build)
  webpack(config) {
    // Find the existing rule that handles SVG as a static asset and
    // exclude our JS/TS imports from it so @svgr/webpack takes over.
    const fileLoaderRule = config.module.rules.find(
      (rule: { test?: RegExp }) => rule.test?.test?.('.svg')
    )
    if (fileLoaderRule) {
      fileLoaderRule.exclude = /\.svg$/i
    }

    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    })

    return config
  },
}

export default nextConfig
