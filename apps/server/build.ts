import { rm } from 'node:fs/promises'

await rm('./dist/', { recursive: true, force: true })

await Bun.build({
  entrypoints: ['./src/main.ts', './src/setup.ts'],
  outdir: './dist/',
  target: 'bun',
  env: 'inline',
  minify: true,
  splitting: true,
  sourcemap: 'external',
})
