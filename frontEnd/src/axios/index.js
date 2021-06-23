import axios from 'axios'
import Vue from 'vue';
import { Toast,} from 'vant';
Vue.use(Toast);

const service = axios.create({
  baseURL: process.env.VUE_APP_URL , // api 的 base_url
  timeout: 60000, // request timeout
  
})
 

// request interceptor
service.interceptors.request.use(
  config => {
    // config.withCredentials=true;
    // Do something before request is sent
    // if (store.getters.token) {
    //   // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
    //   config.headers['X-Token'] = getToken()
    // }
    // 增加时间戳防止浏览器请求缓存
    config.params = {
      // _t: Date.parse(new Date())/1000,
      ...config.params
    }
    // 取消options请求
    // config.headers['Content-Type'] = 'application/json';
    // config.headers['X-Requested-With'] = 'XMLHttpRequest';
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data;
    if(res.success){
      return res.data
    }else{
      Toast(res.message)
      return Promise.reject(res);
    }
    
  },
  
  error => {
    console.log('err:' + error) // for debug
    Toast('服务器连接失败');
    return Promise.reject(error)
  }
)
export default service
