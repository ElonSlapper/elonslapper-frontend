import { defineStore } from 'pinia'

export const useSlapStore = defineStore('slap', {
  state: () => ({
    count: Number(localStorage.getItem('slapCount')) || 0,
  }),
  actions: {
    slap() {
      this.count++
      localStorage.setItem('slapCount', this.count.toString())
    },
  },
})
