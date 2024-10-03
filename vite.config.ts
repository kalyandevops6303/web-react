import fs from 'fs';
import * as path from 'path';
import { defineConfig, Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import nodePolyFills from 'rollup-plugin-node-polyfills';
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
import babel from 'vite-plugin-babel';
import postCssRtl from 'postcss-rtl';
// import Checker from 'vite-plugin-checker';
import sassDts from 'vite-plugin-sass-dts';

const loadJsFilesAsJsx = (): Plugin => ({
  name: 'load-js-files-as-jsx',
  enforce: 'pre',
  async transform(code, id) {
    if (id.endsWith('.js') || id.endsWith('.jsx')) {
      return {
        code,
        map: null,
      };
    }
  },
});

export default defineConfig({
  plugins: [
    react({
      include: '**/*.{jsx,tsx}',
    }),
    babel({
      babelConfig: {
        plugins: ['@emotion'],
      },
    }),
    loadJsFilesAsJsx(),
    // Checker({ typescript: true }), TODO: To uncomment this checker to check type errors strictly
    sassDts(),
  ],
  mode: process.env.VITE_ENV_MODE || 'test',
  define: {
    'process.env': {},
    global: 'globalThis',
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'https://pixinvent.com/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
    cors: {
      origin: ['https://pixinvent.com/', 'http://localhost:3000'],
      methods: ['GET', 'PATCH', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        includePaths: ['node_modules', './src/assets'],
      },
    },
    postcss: {
      plugins: [postCssRtl()],
    },
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src'),
      '@src': path.resolve(__dirname, 'src'),
      '@store': path.resolve(__dirname, 'src/redux'),
      '@configs': path.resolve(__dirname, 'src/configs'),
      '@styles': path.resolve(__dirname, 'src/@core/scss'),
      '@utils': path.resolve(__dirname, 'src/utility/Utils'),
      '@hooks': path.resolve(__dirname, 'src/utility/hooks'),
      '@assets': path.resolve(__dirname, 'src/@core/assets'),
      '@layouts': path.resolve(__dirname, 'src/@core/layouts'),
      '@components': path.resolve(__dirname, 'src/@core/components'),
      '@lib': path.resolve(__dirname, 'src/lib'),
      stream: 'rollup-plugin-node-polyfills/polyfills/stream',
      crypto: 'crypto-browserify',
      util: 'rollup-plugin-node-polyfills/polyfills/util',
      zlib: 'rollup-plugin-node-polyfills/polyfills/zlib',
      assert: 'rollup-plugin-node-polyfills/polyfills/assert',
      buffer: 'rollup-plugin-node-polyfills/polyfills/buffer-es6',
      process: 'rollup-plugin-node-polyfills/polyfills/process-es6',
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis',
      },
      plugins: [
        NodeGlobalsPolyfillPlugin({
          process: true,
          buffer: true,
        }) as any,
        {
          name: 'load-js-files-as-jsx',
          setup(build) {
            build.onLoad({ filter: /src\/.*\.js$/ }, async (args) => ({
              loader: 'jsx',
              contents: await fs.promises.readFile(args.path, 'utf8'),
            }));
          },
        },
      ],
    },
  },
  esbuild: {
    loader: 'tsx',
    include: /src\/.*\.(ts|tsx|js|jsx)$/,
    exclude: [],
  },
  build: {
    target: 'es2020',
    rollupOptions: {
      plugins: [nodePolyFills()],
    },
  },
});
