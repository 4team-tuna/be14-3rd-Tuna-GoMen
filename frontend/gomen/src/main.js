
import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // ✅ 이거 추가했는지 확인!

// createApp(App).use(router).mount('#app')
const app = createApp(App)
app.use(router)
app.mount('#app')
