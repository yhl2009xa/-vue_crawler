import Vue from 'vue'
import store from '../store'
import {BASE_URL} from './host'
import Axios from 'axios';
import {isEmpty,
  isObject,
  resExpHtml,
  removeAllLineBreak,
  isFun,
  replaceAllLineBreakWithBr,
  removeBr
} from "../utils/common";

const vue = new Vue({
  store
});

/**
 * *********************************************************************************
 *
 * params 说明：
 * constant_key               可选          异步请求的固定参数：'json_user_register'
 * url                        可选          异步请求地址
 * body                       可选          异步请求参数
 * method                     可选          异步请求方式(默认：POST)
 * config                     可选          异步请求配置项
 * success(res, extra)        可选          异步请求成功回调
 * error(code, desc, extra)   可选          异步请求接口成功，获取数据失败回调
 * code_xxx                   可选          覆盖全局对code=xxx的处理，需要同时给error回调
 * pending                    可选          请求是否在发送中
 * loading                    可选          是否显示转菊花（加载状态）
 * optional                   可选          可选项
 * access                      可选            兼容APP第三方调接口时accessToken
 *
 * **/

export default params => {
  // 参数 不为空 和 必须为对象格式
  if (isEmpty(params) || !isObject(params)) {
    console.log('参数错误，值为：' + params);
    return
  }

  // if (params.pending) {
  // vue.$store.commit("fetchPending");
  // }

  if (params.loading) {
    vue.$store.dispatch('showLoading')
  }

  // @url 支持自定义请求地址
  // 默认取 BASEURL
  isEmpty(params.url) && (params.url = BASE_URL);

  // 默认给 body
  isEmpty(params.body) && (params.body = {});

  // 为 body 统一加字段
  // @b   版本号
  // @c   pc/mobile
  // @os  'web'
  // @s   浏览器信息（内核+版本）
  params.body.os = 'web';
  params.body.c = 'mobile';
  params.body.ua = navigator.userAgent;


  // 解析以字符串形式传固定参数结构
  // @constant_key: 'json_user_register'
  if (!(isEmpty(params.constant_key))) {
    const ck_array = params.constant_key.split('_');
    const constant_key_val = {
      app: ck_array[0],
      mod: ck_array[1],
      act: ck_array[2]
    };

    // 合并body
    params.body = Object.assign({}, constant_key_val, params.body)
  }
  // 接口约定 如果参数传递了uid 和 webtoken 就优先使用
  // 接口约定 默认传 uid 和 webtoken 字段，
  // 如果 用户已经登录，传有效uid和webtoken值
  // 如果没有登录，传递 空值，接口自行判断，需要登录返回201，统一处理
  // if (!params.body.uid && !params.body.webtoken) {
  //   const userInfo = getUserInfo();
  //   if (userInfo) {
  //     params.body.uid = userInfo.uid;
  //     params.body.web_token = userInfo.webtoken
  //   }
  // }

  /**
   * 如果有 userInfo
   *  看有没有手机号码
   *    有     就走流程
   *    没有   就跳登录
   *
   * **/

  // @method 支持自定义 请求方法（GET,POST），其余转为POST（除了jsonp）
  // @body，@config 参考axios - config说明
  // https://github.com/axios/axios
  if (isEmpty(params.method) || params.method.toLowerCase() === 'post') {
    Axios.post(params.url, params.body && params.body, params.config && params.config).then(s => successCallback(s, params)).catch(e => {
      errorCallback(e)
    })
  } else if (params.method.toLowerCase() === 'get') {
    // vue.$store.dispatch('showLoading');
    Axios.get(params.url, params.config && params.config).then(s => successCallback(s, params)).catch(e => {
      errorCallback(e)
    })
  }
}

function successCallback(res, params) {
  // vue.$store.commit("fetchPendingSuccess");
  // vue.$store.dispatch('hideLoading');
  // 兼容富媒体文件格式处理，
  // 如果含有标签
  //  去除 \n 保留 <br/>
  // 否则
  //  去除多余的<br/>，替换换行符\n为<br/>
  let data = JSON.stringify(res.data);
  data = resExpHtml(data) ?
    JSON.parse(removeAllLineBreak(data)) :
    JSON.parse(replaceAllLineBreakWithBr(removeBr(data)));

  const code = data.errorcode;
  // @s_cb 成功回调 默认传成功时数据和extra数据
  if (!Number(code)) {
    if (params.success !== undefined) {
      if (isFun(params.success)) {
        params.success(data.data, data.extra);
        return
      }
      throw new Error('成功回调函数(success)格式错误，值为：' + params.success + ', 应该为：Function')
    }
  } else {

  }
}

function errorCallback(e_response) {
  // vue.$store.commit("fetchPendingSuccess");
  // vue.$store.dispatch('hideLoading');
  // vue.$store.dispatch('showTooltip', {
  //   msg: '网络不给力，请稍后重试'
  // });
  console.log(e_response.message);
  // const error = new Error(e_response.statusText);
  // error.response = e_response;
  // throw error;
}






