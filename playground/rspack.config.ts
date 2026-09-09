import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from '@rspack/cli'
import { rspack } from '@rspack/core'

const playgroundDirectory = dirname(fileURLToPath(import.meta.url))
const rootDirectory = resolve(playgroundDirectory, '..')

export default defineConfig({
  context: playgroundDirectory,
  entry: './src/main.tsx',
  output: {
    clean: true,
    path: resolve(playgroundDirectory, 'dist'),
  },
  resolve: {
    alias: {
      '@': resolve(rootDirectory, 'src'),
      'spapi-listing-builder': resolve(rootDirectory, 'src/index.ts'),
    },
    extensions: ['...', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'builtin:swc-loader',
          options: {
            jsc: {
              parser: {
                syntax: 'typescript',
                tsx: true,
              },
              transform: {
                react: {
                  runtime: 'automatic',
                },
              },
            },
          },
        },
      },
      {
        test: /\.css$/,
        type: 'css',
      },
    ],
  },
  experiments: {
    css: true,
  },
  plugins: [
    new rspack.HtmlRspackPlugin({
      template: './index.html',
    }),
  ],
  devServer: {
    historyApiFallback: true,
    port: 3001,
  },
})
