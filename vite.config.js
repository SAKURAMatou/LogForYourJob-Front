import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
//自定义svg图标配置
import { svgBuilder } from './src/plugins/svgBuilder.js'

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        proxy: {
            '/dmlapi': {
                target: 'http://192.168.233.5:8000,http://127.0.0.1:8000',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/dmlapi/, '')
            },
            '/api': {
                target: 'http://127.0.0.1:8000',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, '')
            }
        }
    },
    plugins: [vue(), svgBuilder('./src/components/icons/svg/')],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    }
})
