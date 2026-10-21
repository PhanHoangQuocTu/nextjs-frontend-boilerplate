import type { StorybookConfig } from '@storybook/nextjs-vite';

const config: StorybookConfig = {
  framework: '@storybook/nextjs-vite',
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-docs', '@storybook/addon-a11y', '@storybook/addon-themes'],
  staticDirs: ['../public'],
  // `react-docgen-typescript` needs the TypeScript JS API, which TypeScript 7 (native) does not expose.
  typescript: { reactDocgen: 'react-docgen' },
  core: { disableTelemetry: true },
  viteFinal: (config) => ({
    ...config,
    build: {
      ...config.build,
      // Storybook ships every story in one bundle; the default 500 kB limit only produces noise here.
      chunkSizeWarningLimit: 4000,
      rolldownOptions: {
        ...config.build?.rolldownOptions,
        // Radix / Base UI ship `'use client'` directives; they are meaningless in a plain Vite bundle.
        onLog(level, log, defaultHandler) {
          if (log.code === 'MODULE_LEVEL_DIRECTIVE') return;
          defaultHandler(level, log);
        },
      },
    },
  }),
};

export default config;
