/**
 *   @Project:   微信分享封装
 *   @Author:    Zi_Jun
 *   @Email:     zijun2030@gmail.com
 *   @Date:      2019/12/10 15:51
 *   @Note:
 */


import {getWxJsSDK} from '@api/weixin';
let wx = require("weixin-js-sdk");

export const disableShare = () => {
    const url = location.href.split('#')[0];
    // 先获取localStorage中的微信配置，如果没有，再接口获取
    const WX_CONFIG = localStorage.wxConfig && JSON.parse(localStorage.wxConfig);
    console.log('禁用分享函数调用')
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
          'hideOptionMenu'
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
          'hideMenuItems', // 隐藏功能按钮
          'hideOptionMenu'
        ]
      });

      wx.ready(function () {
        wx.hideOptionMenu();
      });

      wx.error(function () {
        // config信息验证失败会执行error函数，如签名过期导致验证失败，
        // 具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，
        // 对于SPA可以在这里更新签名。
        console.log('config信息验证失败');
      })
    }
  }

