/**
 *   @Project:   微信分享封装
 *   @Author:    Zi_Jun
 *   @Email:     zijun2030@gmail.com
 *   @Date:      2019/12/10 15:51
 *   @Note:
 */


import {getWxJsSDK} from '@api/weixin';
let wx = require("weixin-js-sdk");

export const wxSign = (router)=>{
  // wx 用的是vux中的WechatPlugin
  const jsApiList = ['onMenuShareTimeline', 'onMenuShareAppMessage','onMenuShareQQ','onMenuShareQZone','hideMenuItems'];
  router.afterEach(function (to) {
    if (!sessionStorage.getItem('initLink')) {
      sessionStorage.setItem('initLink',document.URL)
    }
    let url = window.location.origin + to.fullPath
    // 非ios设备，切换路由时候进行重新签名
    if (window.__wxjs_is_wkwebview !== true) {
      setTimeout(()=>{
        getWxJsSDK({
          url,
        }).then(res=>{
          let signInfo = res.data.sign;
          signInfo.jsApiList = jsApiList;
          wx.config(signInfo);
        })
        /* http.get('/api/wechat/getSign?url=' + encodeURIComponent(_url)).then(res => {
          let signInfo = res.data.sign;
          signInfo.jsApiList = jsApiList;
          wx.config(signInfo);
        }); */
      },400);
    }
    // ios 设备进入页面则进行js-sdk签名
    if (window.__wxjs_is_wkwebview === true) {
      let url = window.location.href.split('#')[0];
      setTimeout(()=>{
        getWxJsSDK({
          url:sessionStorage.getItem('initLink')||url
        }).then(res=>{
          let signInfo = res.data.sign;
          signInfo.jsApiList = jsApiList;
          wx.config(signInfo);
        })
        /* http.get('/api/wechat/getSign?url=' + encodeURIComponent(sessionStorage.getItem('initLink'))).then(function (res) {
          let signInfo = res.data.sign;
          signInfo.jsApiList = jsApiList;
          wx.config(signInfo);
        }) */
      },400)
    }
  })
}

export const shareList = (title, imgUrl, desc, link, success) => {
    const url = location.href.split('#')[0];
    // 先获取localStorage中的微信配置，如果没有，再接口获取
    const WX_CONFIG = localStorage.wxConfig && JSON.parse(localStorage.wxConfig);
    if (WX_CONFIG && WX_CONFIG.url === url) {
      handleWXShare(WX_CONFIG)
    } else {
      getWxJsSDK({
        url
      }).then((res) => {
        // 将微信配置保存到localstorage中
        localStorage.setItem('wxConfig', JSON.stringify(res.wx_config));
        handleWXShare(res.wx_config);
      });
    }
  getWxJsSDK({
    url
  }).then((res) => {
    // 将微信配置保存到localstorage中
    localStorage.setItem('wxConfig', JSON.stringify(res.wx_config));
    handleWXShare(res.wx_config);
  });

    /**
     * 处理微信分享配置
     * @param configOption {Object} 微信分享配置
     */
    function handleWXShare (configOption) {
      const WXConfig = configOption;
      wx.config({
        debug: false, // true:调试时候弹窗
        appId: WXConfig.appId, // 微信appid
        timestamp: WXConfig.timestamp, // 时间戳
        nonceStr: WXConfig.nonceStr, // 随机字符串
        signature: WXConfig.signature, // 签名
        jsApiList: [
          // 所有要调用的 API 都要加到这个列表中
          'onMenuShareTimeline', // 分享到朋友圈接口
          'onMenuShareAppMessage', //  分享到朋友接口
          'updateAppMessageShareData',
          'updateTimelineShareData',
          'showAllNonBaseMenuItem', // 展示基础菜单栏
          'hideAllNonBaseMenuItem', // 隐藏基础菜单栏
          'showMenuItems', // 显示功能按钮
          'hideMenuItems', // 隐藏功能按钮
        ]
      });

      wx.checkJsApi({
        jsApiList: [
          // 所有要调用的 API 都要加到这个列表中
          'onMenuShareTimeline', // 分享到朋友圈接口
          'onMenuShareAppMessage', //  分享到朋友接口
          'updateAppMessageShareData',
          'updateTimelineShareData',
          'showAllNonBaseMenuItem', // 展示基础菜单栏
          'hideAllNonBaseMenuItem', // 隐藏基础菜单栏
          'showMenuItems', // 显示功能按钮
          'hideMenuItems' // 隐藏功能按钮
        ]
      });

      wx.ready(function () {
        if (success) {
          // wx.showAllNonBaseMenuItem();
          // 显示分享到朋友和空间按钮
          wx.showMenuItems({
            menuList: [
              'menuItem:share:appMessage',
              'menuItem:share:timeline',
              'menuItem:favorite'
            ]
          });
          // 隐藏其他第三方分享平台
          wx.hideMenuItems({
            menuList: [
              'menuItem:share:qq',
              'menuItem:share:weiboApp',
              'menuItem:share:facebook',
              'menuItem:share:QZone'
            ]
          });
        } else {
          wx.hideAllNonBaseMenuItem();
        }

        // 微信分享的数据
        const shareData = {
          imgUrl: imgUrl || '', // 分享显示的缩略图地址
          link: link || '', // 分享地址
          desc: desc || '', // 分享描述
          title: title || '', // 分享标题
          success: function () {
            // 分享成功可以做相应的数据处理
            if (success) {
              setTimeout(() => {
                success();
              }, 500)
            }
          },
          fail: function () {
            console.log('调用失败')
          },
          complete: function () {
            console.log('调用结束')
          }
        };

        wx.onMenuShareTimeline(shareData);
        wx.onMenuShareAppMessage(shareData);
        // wx.updateAppMessageShareData(shareData);
        // wx.updateTimelineShareData(shareData);
      });

      wx.error(function () {
        // config信息验证失败会执行error函数，如签名过期导致验证失败，
        // 具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，
        // 对于SPA可以在这里更新签名。
        console.log('config信息验证失败');
      })
    }
  }

