export function migrateLegacySlapStore() {
  const CURRENT_SCHEMA_VERSION = 1
  const hasNewStore = localStorage.getItem('slap')
  console.log('Checking for legacy slap data migration...')
  if (!hasNewStore) {
    const legacyCount = Number(localStorage.getItem('slapCount') || 0)
    const legacyUserId = localStorage.getItem('userId')
    const legacyLastSubmittedCount = Number(localStorage.getItem('lastSubmittedCount') || 0)
    const legacyGlobalSlaps = Number(localStorage.getItem('globalSlaps') || 0)
    const legacyRank = Number(localStorage.getItem('rank') || 0)
    const legacyTotalUsers = Number(localStorage.getItem('totalUsers') || 0)

    const migratedState = {
      count: legacyCount,
      userId: legacyUserId,
      lastSubmittedCount: legacyLastSubmittedCount,
      globalSlaps: legacyGlobalSlaps,
      rank: legacyRank,
      totalUsers: legacyTotalUsers,
      schemaVersion: CURRENT_SCHEMA_VERSION,
    }

    localStorage.setItem('slap', JSON.stringify(migratedState))

    // Optional: clean up old keys
    localStorage.removeItem('slapCount')
    localStorage.removeItem('userId')
    localStorage.removeItem('lastSubmittedCount')
    localStorage.removeItem('globalSlaps')
    localStorage.removeItem('rank')
    localStorage.removeItem('totalUsers')

    console.log('✅ Migrated legacy slap data to Pinia persist format.')
  }
}
