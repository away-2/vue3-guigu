// 引入项目中全局组件
import SvgIcon from './SvgIcon/index.vue'
import Pagination from './Pagination/index.vue'
import Category from './Category/index.vue'
// 引入element-plus提供的所有组件
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// 全局对象
const allGlobalComponent = { SvgIcon, Pagination, Category }
// 对外暴露插件对象
export default {
    install(app: any) {
        // 注册项目全部的的全局组件
        Object.keys(allGlobalComponent).forEach(key => {
            // 注册为全局组件 
            // @ts-ignore
            app.component(key, allGlobalComponent[key]);
        })
        //将element-plus提供图标注册为全局组件
        for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
            app.component(key, component)
          }
    }
}