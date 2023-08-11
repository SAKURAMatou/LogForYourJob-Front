// import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

import SvgIcon from './components/icons/svgIcon.vue'

const app = createApp(App)

app.use(createPinia())
app.use(router)
//使用element
app.use(ElementPlus)

app.use(ElementPlus, {
    locale: zhCn
})
//把图标注册为全局变量
app.component('SvgIcon', SvgIcon)

//添加自定义指令，没有传入指令的生命周期钩子则在mounted 和 updated都实现
//noMoreClick实现按钮防抖动，点击之后添加禁用属性，给定时间之后再可用
app.directive('noMoreClick', (el, binding) => {
    // console.log('noMoreClick', el)
    el.addEventListener('click', (e) => {
        el.classList.add('is-disabled')
        el.disabled = true
        setTimeout(() => {
            el.disabled = false
            el.classList.remove('is-disabled')
        }, 2000) //我这里设置的是2000毫秒也就是2秒
    })
})

app.mount('#app')

// console.log("env",import.meta.env)