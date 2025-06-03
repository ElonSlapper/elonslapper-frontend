import { defineStore } from 'pinia'

function getOrCreateUserId(): string {
  let id = localStorage.getItem('userId')
  if (!id) {
    id = crypto.randomUUID()
    localStorage.setItem('userId', id)
  }
  return id
}

export const useSlapStore = defineStore('slap', {
  state: () => ({
    count: Number(localStorage.getItem('slapCount')) || 0,
    lastSubmittedCount: Number(localStorage.getItem('lastSubmittedCount')) || 0,
    userId: getOrCreateUserId(),
  }),
  actions: {
    slap() {
      this.count++
      localStorage.setItem('slapCount', this.count.toString())
    },
    markSubmitted() {
      this.lastSubmittedCount = this.count
      localStorage.setItem('lastSubmittedCount', this.lastSubmittedCount.toString())
    },
    getUnsentSlaps(): number {
      return this.count - this.lastSubmittedCount
    },
  },
})
