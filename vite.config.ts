import react from '@vitejs/plugin-react';
import ssr from 'vite-plugin-ssr/plugin';
import { type UserConfig } from 'vite';
import eslint from 'vite-plugin-eslint';

const devPlugins = [ { ...react(), enforce: 'default' }, ssr() ];
const prodPlugins = [ { ...react(), enforce: 'default' }, ssr(), eslint() ];

const config: UserConfig = {
  plugins: process.env.NODE_ENV === 'production' ? prodPlugins : devPlugins,
  build: {
    minify: process.env.NODE_ENV === 'production' ? 'esbuild' : false,
    rollupOptions: {
      onwarn(warning, warn) {
        if (
          warning.code === "MODULE_LEVEL_DIRECTIVE" && warning.message.includes("'use client'")
        ) {
          return;
        }
        warn(warning);
      }
    }
  }
};

export default config;