import Vue from 'vue'
import VueRouter from 'vue-router'
import TextView from '../views/TextView.vue'
import FileView from '../views/FileView.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'text',
    component: TextView
  },
  {
    path: '/file',
    name: 'file',
    component: FileView
  },
]

const router = new VueRouter({
  routes
})

export default router
