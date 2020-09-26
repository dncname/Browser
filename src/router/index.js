import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'index',
    component: () => import('../views/index.vue')
  },
  {
    path: '/block/:id.html',
    name: 'block',
    component: () => import('../views/block.vue')
  },
  {
    path: '/tx/:id.html',
    name: 'tx',
    component: () => import('../views/transaction.vue')
  },
  {
    path: '/richList',
    name: 'richList',
    component: () => import('../views/richList.vue')
  }
]


const router = new VueRouter({
  // mode: "history",
  base: process.env.BASE_URL,
  routes
});
export default router
