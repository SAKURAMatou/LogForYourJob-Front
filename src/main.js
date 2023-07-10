import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import SvgIcon from './components/icons/svgIcon.vue'


const app = createApp(App)

app.use(createPinia())
app.use(router)

//把图标注册为全局变量
app.component('SvgIcon', SvgIcon)


app.mount('#app')
