import type { StorybookConfig } from '@storybook/nextjs-vite'
import svgr from 'vite-plugin-svgr'

const config: StorybookConfig = {
  stories: [
    '../src/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-vitest',
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
    '@storybook/addon-mcp',
  ],
  framework: '@storybook/nextjs-vite',
  staticDirs: ['../public'],

  async viteFinal(config) {
    config.plugins = config.plugins ?? []
    // Transform *.svg imports into React components (same as @svgr/webpack does for Next.js)
    config.plugins.push(
      svgr({
        include: '**/*.svg',
        svgrOptions: { exportType: 'default' },
      }),
    )
    return config
  },
}

export default config
