import { defineStore } from 'pinia'

const CURRENT_SCHEMA_VERSION = 1

export const useSlapStore = defineStore('slap', {
  state: () => ({
    count: 0,
    userId: null as string | null,
    lastSubmittedCount: 0,
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
    getUnsentSlaps(): number {
      return this.count - this.lastSubmittedCount
    },
    markSubmitted() {
      this.lastSubmittedCount = this.count
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
      this.$reset() // resets to initial state
    },
  },

  persist: {
    key: 'slap',
    storage: localStorage, // optional, defaults to localStorage
  },
})
