import { defineStore } from 'pinia'

const CURRENT_SCHEMA_VERSION = 4

interface SlapState {
  count: number
  schemaVersion: number
}

export const useSlapStore = defineStore('slap', {
  state: (): SlapState => ({
    count: 0,
    schemaVersion: CURRENT_SCHEMA_VERSION,
  }),

  actions: {
    slap() {
      this.count++
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
