import http from './../../../base/api/public'
import querystring from 'querystring'
let sysConfig = require('@/../config/sysConfig')
let apiUrl = sysConfig.xcApiUrlPre;


//定义页面查询请求，请求服务端的查询接口
export const page_list = (page,size,params) =>{
  //请求服务端的接口
  return http.requestQuickGet(apiUrl + '/cms/page/list/'+page+'/'+size);
}

