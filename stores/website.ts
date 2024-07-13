export const useWebsiteStore = defineStore('websiteStore', {
  state: () => ({
    status: '' as '' | 'OK'
  }),
  actions: {
    fetch() {
      this.status = 'OK'
    }
  }
})
