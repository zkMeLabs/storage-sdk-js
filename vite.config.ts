import { resolve } from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, 'lib/index.ts'),
        storage: resolve(__dirname, 'lib/storage/index.ts')
      },
      name: 'zkMeChainStorage',
    },
    // sourcemap: true,
    minify: false,
  },
  plugins: [
    dts({
      insertTypesEntry: true,
      copyDtsFiles: true,
      include: ['lib']
    })
  ]
})
