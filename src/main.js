import Vue from 'vue'
import App from './App.vue'
import './plugins/vant.js'
//import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import Routes from './routes.js'
import axios from 'axios'
import store from './store'

Vue.use(VueRouter);
Vue.config.productionTip = false;

const router=new VueRouter({
	routes:Routes,
});
const _axios = axios.create({
  baseURL:'http://3.1.39.240:4000'
});
Vue.prototype.$http = _axios;

new Vue({
  render: h => h(App),
  router:router,
  store:store
}).$mount('#app')
