import { createApp } from 'vue'
import App from '@/App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// @ts-ignore
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
// svg插件需要配置代码
import 'virtual:svg-icons-register'
import SvgIcon from '@/components/SvgIcon/index.vue'
// 引入自定义插件对象：注册整个项目全局组件
import globalComponent from '@/components'
// 引入模板的全局的样式
import '@/styles/index.scss'
// 引入路由
import router from './router'
// 引入仓库
import pinia from './store'
// 引入路由鉴权文件
import './permission'

const app = createApp(App)

app.use(ElementPlus, {
  locale: zhCn,
})
app.component('SvgIcon', SvgIcon)
app.use(globalComponent)
app.use(router)
app.use(pinia)

app.mount('#app')
