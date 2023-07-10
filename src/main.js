import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import SvgIcon from './components/icons/svgIcon.vue'


const app = createApp(App)

app.use(createPinia())
app.use(router)
//使用element
app.use(ElementPlus)
//把图标注册为全局变量
app.component('SvgIcon', SvgIcon)


app.mount('#app')
