/*
 * @Autor: XinWei
 * @Date: 2021-03-15 14:02:05
 * @LastEditors: XinWei
 * @LastEditTime: 2021-03-24 14:23:05
 * @Description: 资金转账信息
 */
import request from "@/axios";

export function getWithdrawableCash (params) {
  return request({
    url: "/ibfund/api/fund/getWithdrawableCash",
    params:params,
    method: "get",
  });
}
export function getInstructionId (params) {
  return request({
    url: "/ibfund/api/transfer/getInstructionId",
    params:params,
    method: "get",
  });
}
export function getIBAccount (params) {
  return request({
    url: "/ibaccount/api/ib/account/getIBAccount",
    params:params,
    method: "get",
  });
}
export function getFundInfo (params) {
  return request({
    url: "/ibfund/api/fund/getFund",
    params:params,
    method: "get",
  });
}
export function getTransferLog (params) {
  return request({
    url: "/ibfund/api/transfer/getTransferLog",
    params:params,
    method: "get",
  });
}
export function transferToIB (params) {
  return request({
    url: '/ibfund/api/transfer/input',
    method: 'post',
    data: params
  })
}
export function transferToHk (params) {
  return request({
    url: '/ibfund/api/transfer/output',
    method: 'post',
    data: params
  })
}