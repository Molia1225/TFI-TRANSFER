/*
 * @Autor: XinWei
 * @Date: 2021-04-12 17:02:41
 * @LastEditors: XinWei
 * @LastEditTime: 2021-04-12 17:37:35
 * @Description: 获取app的userAgent
 */

window.env = {};
let userAgent = navigator.userAgent;
if( userAgent.indexOf('tfisec') < 0 ) {
  window.env.Browser = true;
} else {
  window.env.WebView = true;
}
let version=userAgent.substr(userAgent.indexOf('tfisec/')).split('/');
window.env.version=version[1]

