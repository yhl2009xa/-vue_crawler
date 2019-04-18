import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

// 用来做索引
const Index = () =>
  import ('@/views/index');

const router = new Router({
  history: true,
  mode: 'history',
  routes:[{
    path:'/',
    name:'index',
    component:Index,
    meta: {
      title: "索引页"
    },
  }]
})

export default router;
