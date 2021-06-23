/*
 * @Autor: XinWei
 * @Date: 2020-11-25 13:41:43
 * @LastEditors: XinWei
 * @LastEditTime: 2021-04-22 16:44:46
 * @Description: jsbridge
 */
// import store from '@/store'
import Vue from 'vue';
import { Toast,} from 'vant';

Vue.use(Toast);
let u = window.navigator.userAgent;
let browsers={
  isIos: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
  // isMobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
  isAndroid: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, //android终端
  isWeiXin: u.indexOf('MicroMessenger') > -1, //是否微信
};
let nativeObj = {}
window.getUserInfoCallback=res=>{
  if(typeof res == 'string'){
    nativeObj['userInfo']=JSON.parse(res)
  }else{
    nativeObj['userInfo']=res
  }
}
export let jsBridge = {
  /* callHandler(api_url){
    let WVJBIframe = document.createElement('iframe');
    WVJBIframe.style.display = 'none';
    WVJBIframe.src = `tfisec://card/${api_url}`;
    document.documentElement.appendChild(WVJBIframe);
    setTimeout(function () {
      document.documentElement.removeChild(WVJBIframe);
    }, 0);
  },
  getLoginStatus(){
    jsBridge.callHandler(api.LOGIN_STATUS);
  },
  goToLogin(){
    jsBridge.callHandler(api.LOGIN_URL)
  },
  setTitle(title){
    let encodeTitle = encodeURIComponent(title);
    jsBridge.callHandler(api.SET_TITLE+encodeTitle)
  },
  closePage(){
    jsBridge.callHandler(api.CLOSE_PAGE)
  }, */
  /* getNativeFlag(){
    let req = new XMLHttpRequest();
    req.open('GET', document.location, false);
    req.send(null);
    let TFIFLAG = req.getResponseHeader('TFI-FLAG') ? req.getResponseHeader('TFI-FLAG') : '';
    console.log(req.getResponseHeader('TFI-FLAG'),'req.getResponseHeader')
    console.log(TFIFLAG,'获取TFIFLAG')
    return TFIFLAG;
  }, */
  handleNative(msgName,jsonStr=''){
    //msgName：事件名
    //jsonStr：调用参数，数据格式为Json json参数：url：xxxjson参数：url：xxx
    //openSecondWebpage 打开二级页面
    if(browsers.isAndroid){
      if(!window.nativeObject) return
      window.nativeObject.handleMsgWithParam(msgName,jsonStr)
    }
    if(browsers.isIos){
      if(window.webkit&&window.webkit.messageHandlers&&window.webkit.messageHandlers.nativeObject){
        window.webkit.messageHandlers.nativeObject.postMessage(msgName+'&&'+jsonStr)
      }
    }
    return new Promise(resulve=>{
      let nativeTimer=setInterval(() => {
        console.log('nativeObj')
        if(nativeObj.userInfo){
          clearInterval(nativeTimer);
          nativeTimer=null
          resulve(nativeObj)
        }
      }, 100);
      setTimeout(()=>{
        resulve(nativeObj)
        clearInterval(nativeTimer)
      },3000)
    })
  },
  openUrl({url,title}){
    let path = url.indexOf('/')==0?`${window.location.origin}${url}`:url
    if(window.env.Browser){
      if(path.indexOf('http')>-1){
        window.location.href=path;
      }else{
        Vue.$router.push(path)
      }
      return;
    }
    this.handleNative('openSecondWebpage',JSON.stringify({url:path,title}))
  },
  closePage(){
    if(window.env.Browser){
      Vue.$router.replace('/home');
      return;
    }
    this.handleNative('closeWebViewController', '')
  }
}