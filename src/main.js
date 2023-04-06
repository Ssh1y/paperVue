import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIcons from '@element-plus/icons-vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'

const app = createApp(App)

for(const [key, component] of Object.entries(ElementPlusIcons)){
    app.component(key, component)
}

app.use(store)
app.use(router)
app.use(ElementPlus)
app.mount('#app')