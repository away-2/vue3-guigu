// 路由鉴权，鉴权，项目中路由能不能被访问的权限设置
import router from '@/router'
import setting from './setting'
import nprogress from 'nprogress'
// 引入进度条样式
import "nprogress/nprogress.css"
// 获取仓库中token数据，去判断用户是否登录
import useUserStore from './store/modules/user'
import pinia from './store'
let userStore =useUserStore(pinia)
// 取消进度条加载动画
nprogress.configure({ showSpinner: false })


// 全局守卫：项目中任意路由切换都会触发的钩子
// 全局前置守卫
router.beforeEach(async(to: any, from: any, next: any)=> {
    document.title = `${setting.title} - ${to.meta.title}`
    // to: 你将要访问的路由
    // from: 你从哪个路由而来
    // next: 路由的方向函数
    // 访问某个路由之前守卫
    nprogress.start()
    // 获取token，去判断用户登录还是未登录
    let token = userStore.token
    // 获取用户名字
    let username = userStore.username
    // 用户登录判断
    if (token) {
        // 登录成功，访问login，不能访问，指向首页
        if (to.path == '/login') {
            next({ path: '/' })
        } else {
            // 登录成功可以访问其他路由
            // 有用户信息
            if (username) {
                // 放行
                next()
            } else {
                // 如果没有用户信息，在守卫这里发请求获取到了用户信息再放行
               try{
                // 获取用户信息
                await userStore.userInfo() 
                next()
               } catch(error) {
                // token过期：获取不到用户信息
                // 用户手动修改本地存储token
                // 退出登录
                await userStore.userLogout()
                next({ path: '/login', query: { redirect: to.path}})
               }
                
            }
        }
    } else {
        // 用户未登录判断
        if (to.path == '/login') {
            next()
        } else {
            next({ path: '/login', query: {redirect: to.path} })
        }
    }

})
// 全局后置守卫
router.afterEach((to: any, from: any)=> {
    nprogress.done()
})

// 第一个问题：任意路由切换实现进度条业务 ---nprogress
// 第二个问题：路由鉴权
// 全部路由组件：登录|404|...

// 用户未登录：可以访问login，其余皆不可访问
// 用户登录成功：不可访问login，其余皆可访问