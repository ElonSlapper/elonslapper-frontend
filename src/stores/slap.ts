import { defineStore } from 'pinia'

export const useSlapStore = defineStore('slap', {
  state: () => ({
    count: Number(localStorage.getItem('slapCount')) || 0,
    userId: localStorage.getItem('userId') || null,
    lastSubmittedCount: Number(localStorage.getItem('lastSubmittedCount')) || 0,
    globalSlaps: Number(localStorage.getItem('globalSlaps')) || 0,
    rank: Number(localStorage.getItem('rank')) || 0,
    totalUsers: Number(localStorage.getItem('totalUsers')) || 0,
  }),
  actions: {
    slap() {
      this.count++
      localStorage.setItem('slapCount', this.count.toString())
    },
    setUserId(userId: string) {
      this.userId = userId
      localStorage.setItem('userId', userId)
    },
    getUnsentSlaps(): number {
      return this.count - this.lastSubmittedCount
    },
    markSubmitted() {
      this.lastSubmittedCount = this.count
      localStorage.setItem('lastSubmittedCount', this.lastSubmittedCount.toString())
    },
    setGlobalSlaps(count: number) {
      this.globalSlaps = count
      localStorage.setItem('globalSlaps', count.toString())
    },
    setRank(rank: number) {
      this.rank = rank
      localStorage.setItem('rank', rank.toString())
    },
    setTotalUsers(total: number) {
      this.totalUsers = total
      localStorage.setItem('totalUsers', total.toString())
    },
    getUserId(): string | null {
      return this.userId
    },
    reset() {
      this.count = 0
      this.userId = null
      this.lastSubmittedCount = 0
      this.globalSlaps = 0
      this.rank = 0
      this.totalUsers = 0
      localStorage.clear()
    }
  }
})
