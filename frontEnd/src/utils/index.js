export function timeToDate(timestamps,isTime=false){
  var time = new Date(timestamps);
  var y = time.getFullYear();
  var m = time.getMonth()+1;
  var d = time.getDate();
  var h = time.getHours();
  var mm = time.getMinutes();
  var s = time.getSeconds();
  if(isTime){
    return y+'-'+add0(m)+'-'+add0(d)+' '+add0(h)+':'+add0(mm)+':'+add0(s);
  }else{
    return y+'-'+add0(m)+'-'+add0(d);
    
  }
}
function add0(m){return m<10?'0'+m:m }

export function formatMoney(s, n) {
	n = n > 0 && n <= 20 ? n : 2;
	s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
	var l = s.split(".")[0].split("").reverse(), r = s.split(".")[1];
	var t = "";
	for (let i = 0; i < l.length; i++) {
		t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
	}
	return t.split("").reverse().join("") + "." + r;
}

export const wxApi = {
  appid:process.env.VUE_APP_APPID,
  urlencode: function(url){
    url = (url + '').toString();
    return encodeURIComponent(url).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').  
    replace(/\)/g, '%29').replace(/\*/g, '%2A').replace(/%20/g, '+');  
  },
  author: function(redirect_uri,redirectUrl){
    redirect_uri = this.urlencode(redirect_uri)
    redirectUrl = this.urlencode(redirectUrl)
    var url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + this.appid + "&redirect_uri=" + redirect_uri + "&response_type=code"  + "&scope=snsapi_userinfo" + "&state="+redirectUrl+'#wechat_redirect';
    window.location.href = url;
  },
  getUrlParams: function(){
    var url = location.search; //获取url携带的参数
    var urlParams = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        var strs = str.split("&");
        for(var i = 0; i < strs.length; i ++) {
            urlParams[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
        }
    }
    return urlParams;
  }
}

/**
 * 是否在Ios中
 * @type {boolean}
 */
export const isIos = /(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent.toLowerCase());
/**
 * 是否在app中
 * @type {boolean}
 */
export const isApp = /uphybridsdk/i.test(navigator.userAgent.toLowerCase());

/**
 * 是否在iphoneX中
 * @type {boolean}
 */
export const isIphoneX = isIos && ((window.screen.height === 812 && window.screen.width === 375) ||
  (window.screen.height === 896 && window.screen.width === 414));

  // 参数字符串化，post使用
export const stringify = function(data) {
  if (!data) return ''
  let keys = Object.keys(data)
  let argsStr = keys.reduce((prev, next) => prev + '&' + next + '=' + data[next], '')
  return argsStr.substr(1)
}