import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import globalAPI from '../globalAPI.js'
import highlightPlugin from "@highlightjs/vue-plugin";
import 'highlight.js'
import 'highlight.js/styles/idea.css';
import VueClipboard from 'vue-clipboard2'
import Component from './utils/index'
import "./assets/css/global.css"

Vue.use(Component)
Vue.use(ElementUI)
Vue.use(highlightPlugin);
Vue.use(VueClipboard)
Vue.config.productionTip = false
Vue.prototype.axios = axios
Vue.prototype.global = globalAPI

axios.defaults.baseURL = globalAPI.baseURL

axios.interceptors.request.use((config) => {
  if (localStorage.getItem('token')) {
    config.headers.token = localStorage.getItem('token')
  }
  return config;
})

axios.interceptors.response.use((res) => {
  if (res.status == 200 && res.data.detail) {
    ElementUI.Message({
      message: res.data.detail,
      type: 'success'
    })
  }
  return res;
}, (err) => {
  if (err.response.status == 401) {
    localStorage.removeItem('token')
    ElementUI.Message({
      message: err.response.data.detail,
      type: 'error'
    })
    router.push('/login')
  } else if (err.response.status == 400) {
    ElementUI.Message({
      message: err.response.data.detail,
      type: 'error'
    })
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
