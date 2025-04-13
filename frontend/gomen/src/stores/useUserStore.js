// src/stores/useUserStore.js
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    isLogin: localStorage.getItem('isLogin') === 'true',
  }),
  actions: {
    setLogin(status) {
      this.isLogin = status
      localStorage.setItem('isLogin', status)
    },
    logout() {
      this.isLogin = false
      localStorage.removeItem('isLogin')
    }
  }
})
