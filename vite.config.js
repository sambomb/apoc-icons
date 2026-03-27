
import { defineConfig } from 'vite'
import { resolve } from 'node:path'
import { readdirSync } from 'node:fs'

function htmlEntriesFrom(dir, prefix) {
  const absDir = resolve(__dirname, dir)
  return readdirSync(absDir)
    .filter((name) => name.endsWith('.html'))
    .reduce((acc, name) => {
      const key = `${prefix}_${name.replace('.html', '').replace(/[^a-zA-Z0-9_-]/g, '_')}`
      acc[key] = resolve(__dirname, `${dir}/${name}`)
      return acc
    }, {})
}

const GUIDE_INPUTS = {
  ...htmlEntriesFrom('ad', 'ad'),
  ...htmlEntriesFrom('fp', 'fp'),
  ...htmlEntriesFrom('missions', 'missions'),
  ...htmlEntriesFrom('items', 'items'),
  ...htmlEntriesFrom('systems', 'systems'),
  ...htmlEntriesFrom('enemies', 'enemies'),
  ...htmlEntriesFrom('heroes', 'heroes')
}

export default defineConfig({
  base: '/zcalendar/',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        ...GUIDE_INPUTS
      }
    }
  },
  server: {
    headers: {
      'X-Frame-Options': 'ALLOWALL',
      'Cross-Origin-Embedder-Policy': 'require-corp'
    }
  }
})
