import { defineStore } from 'pinia'

const CURRENT_SCHEMA_VERSION = 3

interface SlapState {
  count: number
  userId: string | null
  lastSyncedCount: number
  globalSlaps: number
  rank: number,
  banned: boolean,
  totalUsers: number
  nextClosestCount: number | null
  schemaVersion: number
}

export const useSlapStore = defineStore('slap', {
  state: (): SlapState => ({
    count: 0,
    userId: null,
    lastSyncedCount: 0,  // checkpoint of last sync
    globalSlaps: 0,
    rank: 0,
    banned: false,
    totalUsers: 0,
    nextClosestCount: null,
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
    setNextClosestCount(count: number | null) {
      this.nextClosestCount = count
    },
    getUserId(): string | null {
      return this.userId
    },
    reset() {
      this.$reset()
    },
    getSchemaVersion(): number {
      return this.schemaVersion
    },
    setBanned(banned: boolean) {
      this.banned = banned
    }
  },

  persist: {
    key: 'slap',
    storage: localStorage,
  },
})
