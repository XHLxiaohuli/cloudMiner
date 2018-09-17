// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import md5 from 'js-md5'
import axios from 'axios'
import VueAwesomeSwiper from 'vue-awesome-swiper'
Vue.use(VueAwesomeSwiper)
import  VueResource  from 'vue-resource'
Vue.use(VueResource) 
require('swiper/dist/css/swiper.css')

import store from './store'
Vue.config.productionTip = false
import { Datetime, Group } from 'vux'  
Vue.component(Datetime.name, Datetime);  
Vue.component(Group.name, Group); 
Vue.prototype.axios = 'axios'
Vue.config.productionTip = false

let util = {

};

util.title = function (title){
  title = title || 'iView admin';
  window.document.title = title;
};

// const ajaxUrl ='http://192.168.3.56:8089/boss/';//本地
// const ajaxUrl ='http://120.77.177.230:8082/boss/';//线上
// const ajaxUrl ='http://192.168.3.211:8089/boss/';
// const ajaxUrl ='http://yunkuang.cn.test/';
// const ajaxUrl ='http://120.77.177.230/';
const ajaxUrl ='https://www.yunminer.cn/';
util.ajax = axios.create({
  baseURL : ajaxUrl,
  timeout : 30000
})

//自动返回首页顶部
router.afterEach((to,from,next) => {

  window.scrollTo(0, 0);
  document.documentElement.scrollTop = document.body.scrollTop = 0;
  })



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  data :{
    eventHub: new Vue()
  },
  components: { App },
  template: '<App/>'
});
