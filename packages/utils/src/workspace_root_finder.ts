import { findUp, findUpSync } from 'find-up'
import { dirname, relative } from 'node:path'
import { cwd } from 'node:process'

export const getWorkspaceRoot = async () => {
  const ref = await findUp('pnpm-workspace.yaml')

  if (ref) {
    const value = dirname(ref)
    return {
      value,
      relative() {
        return relative('..', value)
      },
    }
  }
}

console.log((await getWorkspaceRoot())?.relative())

export const getWorkspaceRootSync = () => {
  const ref = findUpSync('pnpm-workspace.yaml')

  if (ref) {
    const value = dirname(ref)
    return {
      value,
      relative() {
        return relative('..', value)
      },
    }
  }
}
