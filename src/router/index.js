import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);


//父容器页面
const RouterView = () =>
  import ('@/views/router_view');
// 用来做主页
const Index = () =>
  import ('@/views/index');
const User = () =>
  import ('@/views/user/home');
const Book = ()=>
  import ('@/views/user/book')
const News = () =>
  import ('@/views/news/home');
const Finance = () =>
  import ('@/views/finance/home');

const router = new Router({
  history: true,
  mode: 'history',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {x: 0, y: 0}
    }

  },
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index,
      meta: {
        title: "索引页",
        menu: true,
      },
    },
    {
      path: '/user',
      name: 'user',
      component: RouterView,
      redirect: {
        name: 'user_home'
      },
      children: [
        // 项目首页
        {
          path: 'index',
          name: 'user_home',
          component: User,
          meta: {
            menu: true,
            title: "用户中心"
          },
        },{
         //电子书阅读器
          path:'book',
          name:'user_book',
          component:Book,
          meta: {
            menu: false,
            title: "畅想阅读"
          },
        }]
    },
    {
      path: '/news',
      name: 'news',
      component: RouterView,
      redirect: {
        name: 'news_home'
      },
      children: [
        // 项目首页
        {
          path: 'index',
          name: 'news_home',
          component: News,
          meta: {
            menu: true,
            title: "新闻中心"
          },
        }]
    },
    {
      path: '/finance',
      name: 'finance',
      component: RouterView,
      redirect: {
        name: 'finance_home'
      },
      children: [
        // 项目首页
        {
          path: 'index',
          name: 'finance_home',
          component: Finance,
          meta: {
            menu: true,
            title: "金融"
          },
        }]
    }]

})

// router.afterEach((to, from, next) => {
//   if(to.fullPath == "/"){
//
//   }
// }

export default router;
