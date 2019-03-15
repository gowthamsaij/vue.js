// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import jquery from 'jquery'

import BootstrapVue from "bootstrap-vue"
// import App from './App'
import Master from './components/Layouts/Master'
import store  from './store/store'

import router from './router'
//normal bs class
import 'bootstrap/dist/css/bootstrap.min.css'

import 'bootstrap-vue/dist/bootstrap-vue.css'

import axios from 'axios'
import VueAxios from 'vue-axios'
//fontawesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

//added sidebar
import VueSidebarMenu from 'vue-sidebar-menu'
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'
import JsonExcel from 'vue-json-excel'
import VueSweetalert2 from 'vue-sweetalert2';
import Datetime from 'vue-datetime'
// You need a specific loader for CSS files
import 'vue-datetime/dist/vue-datetime.css'

Vue.use(Datetime)

Vue.component('downloadExcel', JsonExcel)
Vue.use(VueSidebarMenu)
//
library.add(faCoffee)

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(VueAxios, axios)
Vue.use(BootstrapVue)

Vue.config.productionTip = false

const options = {
  confirmButtonColor: '#41b882',
  cancelButtonColor: '#ff7674'
}

Vue.use(VueSweetalert2, options)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<Master/>',
  components: { Master }

})


export default store

