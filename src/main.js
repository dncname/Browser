import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {
  Table,
  TableColumn,
  Tabs,
  TabPane
} from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
import '../static/css/reset.css'
import instance from "./http/mhttp";
Vue.config.productionTip = false
Vue.prototype.$http = instance;
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Tabs)
Vue.use(TabPane)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

