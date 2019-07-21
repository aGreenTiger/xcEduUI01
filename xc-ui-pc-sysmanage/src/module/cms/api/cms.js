import http from './../../../base/api/public'
import querystring from 'querystring'
let sysConfig = require('@/../config/sysConfig')
let apiUrl = sysConfig.xcApiUrlPre;


//定义页面查询请求，请求服务端的查询接口
export const page_list = (page,size,params) =>{
  //将params拼装成key/value字符串，在url中进行传递，使用工具类，本身params是json对象
  let queryString = querystring.stringify(params)
  //请求服务端的接口
  return http.requestQuickGet(apiUrl + '/cms/page/list/'+page+'/'+size + '?' + queryString);
}
//站点查询
export const site_list = () =>{
  return http.requestQuickGet(apiUrl + '/cms/site/siteList')
}

