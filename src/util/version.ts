// utils/util.ts
import pkg from '../../package.json' assert { type: 'json' }

export function getAppVersion(): string {
  return pkg.version || 'unknown'
}
