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
//新增
export const page_add = params =>{
  return http.requestPost(apiUrl + '/cms/page/add',params)
}

//cms页面修改
export const page_edit = (pageId,pageForm) =>{
  return http.requestPut(apiUrl + '/cms/page/edit/' + pageId,pageForm)
}

//根据主键查询页面信息
export const page_get = pageId =>{
  return http.requestQuickGet(apiUrl + '/cms/page/get/' + pageId)
}

//删除页面
export const page_del = pageId =>{
  return http.requestDelete(apiUrl + '/cms/page/delete/' + pageId)
}

//站点查询
export const site_list = () =>{
  return http.requestQuickGet(apiUrl + '/cms/site/siteList')
}

//模板查询
export const template_list = () =>{
  return http.requestQuickGet(apiUrl + '/cms/template/list')
}


