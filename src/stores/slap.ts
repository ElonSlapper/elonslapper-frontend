import { defineStore } from 'pinia'

const CURRENT_SCHEMA_VERSION = 2

export const useSlapStore = defineStore('slap', {
  state: () => ({
    count: 0,
    userId: null as string | null,
    lastSyncedCount: 0,  // checkpoint of last sync
    globalSlaps: 0,
    rank: 0,
    totalUsers: 0,
    schemaVersion: CURRENT_SCHEMA_VERSION,
  }),

  actions: {
    slap() {
      this.count++
    },
    setUserId(userId: string) {
      this.userId = userId
    },
    // Number of new slaps since last sync
    getUnsyncedSlaps(): number {
      return this.count - this.lastSyncedCount
    },
    // Mark that we have successfully synced all slaps up to current count
    markSynced() {
      this.lastSyncedCount = this.count
    },
    setGlobalSlaps(count: number) {
      this.globalSlaps = count
    },
    setRank(rank: number) {
      this.rank = rank
    },
    setTotalUsers(total: number) {
      this.totalUsers = total
    },
    getUserId(): string | null {
      return this.userId
    },
    reset() {
      this.$reset()
    },
    getSchemaVersion(): number {
      return this.schemaVersion
    }
  },

  persist: {
    key: 'slap',
    storage: localStorage,
  },
})
