import Vue from 'vue'
import ElementUI from 'element-ui';
import $ from 'jquery'
import 'bootstrap/dist/js/bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import 'popper.js'
import './assets/common/css/index.css'
import './assets/common/css/reset.css'

import App from './App.vue'
import store from './store/store'
import router from './router/router'
// import "./routerFilter/filter"
import './router/filter'
import "./axios/filter"
import ScreenFilter from "./components/grid/ScreenFilter"
import orgTree from "./components/orgTree/orgTree"
import '@/api/mainApi'
import '@/lib/common.js'
import '@/lib/util.js'
import VueQuillEditor from 'vue-quill-editor'
import 'font-awesome/less/font-awesome.less'
import './lib/dialogDrag'

// 引入echarts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts

Vue.config.productionTip = false
Vue.use(VueQuillEditor);
Vue.use(ElementUI);
Vue.component('screenFilter', ScreenFilter)
Vue.component('orgTree', orgTree)

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
