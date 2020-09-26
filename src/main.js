import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {
  Tabs,
  TabPane,
  Message,
  Pagination
} from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
import '../static/css/reset.css'
import instance from "./http/mhttp";
Vue.config.productionTip = false
Vue.prototype.$http = instance;
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Pagination)
// Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

