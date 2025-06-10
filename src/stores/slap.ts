import { defineStore } from 'pinia'

export const useSlapStore = defineStore('slap', {
  state: () => ({
    count: Number(localStorage.getItem('slapCount')) || 0,
    userId: localStorage.getItem('userId') || null,
    lastSubmittedCount: Number(localStorage.getItem('lastSubmittedCount')) || 0,
    globalSlaps: Number(localStorage.getItem('globalSlaps')) || 0
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
  }
})
