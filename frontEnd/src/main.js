import './utils/env'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store';
import 'amfe-flexible';
import '@assets/css/reset.css'
import VueWechatTitle from 'vue-wechat-title'
import '@/icons'
// import VueClipboard from 'vue-clipboard2'
// import VConsole from 'vconsole'
import eruda from 'eruda' // 引入工具包
if(location.host!='192.168.4.79:8089'&&location.host!='app.guokinghk.com'){
  eruda.init() // 初始化
}
// import { shareList } from "./utils/share";
// import { disableShare } from "./utils/disable-share";
// Vue.use(VueClipboard)
Vue.use(VueWechatTitle)
// Vue.prototype.shareList = shareList;
// Vue.prototype.disableShare = disableShare;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
