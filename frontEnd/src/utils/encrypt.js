/*
 * @Autor: XinWei
 * @Date: 2020-11-17 10:40:19
 * @LastEditors: XinWei
 * @LastEditTime: 2020-11-17 11:26:26
 * @Description: 加密和解密
 */
const CryptoJS  = require('crypto-js')
const ENCRYPT_WORD = process.env.VUE_APP_CRYPTO_KEY
/**
 * 加密
 * @param word
 * @returns {*}
 */
export function encrypt(word){
  var key = CryptoJS.enc.Utf8.parse(ENCRYPT_WORD);
  var srcs = CryptoJS.enc.Utf8.parse(word);
  var encrypted = CryptoJS.AES.encrypt(srcs, key, {mode:CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7});
  return encrypted.toString();
}

/**
* 解密
* @param word
* @returns {*}
*/
export function decrypt(word){
  var key = CryptoJS.enc.Utf8.parse(ENCRYPT_WORD);
  var decrypt = CryptoJS.AES.decrypt(word, key, {mode:CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7});
  return CryptoJS.enc.Utf8.stringify(decrypt).toString();
}
