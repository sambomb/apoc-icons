
import { defineConfig } from 'vite'
import { resolve } from 'node:path'
import { readdirSync } from 'node:fs'

function htmlEntriesFrom(dir, prefix) {
  const absDir = resolve(__dirname, dir)

  function walk(currentAbs, currentRel = '') {
    return readdirSync(currentAbs, { withFileTypes: true }).reduce((acc, entry) => {
      const relPath = currentRel ? `${currentRel}/${entry.name}` : entry.name
      const absPath = resolve(currentAbs, entry.name)

      if (entry.isDirectory()) {
        return { ...acc, ...walk(absPath, relPath) }
      }

      if (entry.isFile() && entry.name.endsWith('.html')) {
        const key = `${prefix}_${relPath.replace('.html', '').replace(/[^a-zA-Z0-9_-]/g, '_')}`
        acc[key] = absPath
      }

      return acc
    }, {})
  }

  return walk(absDir)
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
        guidesHub: resolve(__dirname, 'guides.html'),
        notFound: resolve(__dirname, '404.html'),
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
