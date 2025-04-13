
import { createApp } from 'vue'
import App from './App.vue'

import router from './router' // ✅ 이거 추가했는지 확인!
import {createPinia} from 'pinia'

// createApp(App).use(router).mount('#app')
const app = createApp(App)

app.use(createPinia()) // Pinia 사용 등록
app.use(router)
app.mount('#app')
