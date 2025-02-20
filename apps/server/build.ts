import { rm } from 'node:fs/promises'

await rm('./dist/', { recursive: true, force: true })

await Bun.build({
  entrypoints: ['./src/main.ts'],
  outdir: './dist/',
  target: 'bun',
  env: 'disable',
  bytecode: true,
})
