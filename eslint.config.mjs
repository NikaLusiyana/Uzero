import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'
import pluginNext from '@next/eslint-plugin-next'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

export default [
  // Konfigurasi dari Next.js
  ...compat.extends('next/core-web-vitals', 'next/typescript'),

  // Plugin manual dari CommonJS
  {
    plugins: {
      next: pluginNext,
    },
    rules: {
      ...pluginNext.configs.recommended.rules, // kamu bisa pakai ini sebagai dasar
    },
  },

  // Ignored folders
  {
    ignores: ['node_modules', '.next', 'dist', 'src/generated'],
  },
]
