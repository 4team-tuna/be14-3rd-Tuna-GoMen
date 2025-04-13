// src/api.js
import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3001', // 백엔드 API 주소
})

// 매 요청마다 토큰 자동으로 넣어주기
api.interceptors.request.use(config => {
  localStorage.setItem('token', 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJtajIyNiIsInVzZXJJZCI6IjU0IiwibG9naW5JZCI6Im1qMjI2IiwiYXV0aCI6WyJST0xFX1VTRVIiXSwiZXhwIjoxNzQ0NDAwNTM0fQ.eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJtajIyNiIsInVzZXJJZCI6IjU0IiwibG9naW5JZCI6Im1qMjI2IiwiYXV0aCI6WyJST0xFX1VTRVIiXSwiZXhwIjoxNzQ0NDA0MDc2fQ.Yk6OXqC1rlndKJ6Rxtqp17oxbKSqE0-PvWdJ-htECpG01SazuVuFnC5W0d-fPMkObX1p_nHJXEhQSw8o6a258Q');
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api
