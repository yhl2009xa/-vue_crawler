import Request from '../fetch/request'
import api from '../utils/api'


/**
 * 获取新闻数据
 * @param ctx
 * @param obj
 **/
export const fetchNewsHomePage = (ctx, obj) => {
  Request({
    url: api.NEWS_LIST + '?page=' + obj.params.pagestart + "&count=" + obj.params.pagenum,
    body: {
      page: obj.params.pagestart || 1,
      count: obj.params.pagenum || 15
    },
    outsideApi: true,
    success: res => {
      obj.success && obj.success(res);
    },
  });
}

/***
 * 获取网易新闻数据
 */
export const fetchWYNewsHomePage = (ctx, obj) => {
  Request({
    url: api.WY_NEWS_LIST,
    body: {
      type: obj.params.type,
      page: (obj.params.pagestart || 0) * (obj.params.pagenum || 15),
      count: obj.params.pagenum || 15
    },

    success: res => {
      obj.success && obj.success(res);
    },
  });
}


/**
 * 获取段子列表
 * @param ctx
 * @param obj
 **/
export const fetchJokeListPage = (ctx, obj) => {
  Request({
    method: 'get',
    url: api.JOKE_LIST + '?type=' + (obj.params.type ? obj.params.type : 'text') + '&page=' + obj.params.pagestart + "&count=" + obj.params.pagenum,
    body: {
      page: obj.params.pagestart || 1,
      count: obj.params.pagenum || 15
    },
    outsideApi: true,
    success: res => {
      obj.success && obj.success(res);
    },
  });
}


/**
 * 获取首页数据
 * @param ctx
 * @param obj
 */
export const fetchHomePage = (ctx, obj) => {
  Request({
    url: api.HOME,
    body: {
      pagestart: obj.pagestart || 0,
      pagenum: obj.pagenum || 15
    },
    success: res => {
      obj.success && obj.success(res);
    },
  });
}


/************************获取彩票接口*****************************/
/**
 * 获取红袖万码
 * @param ctx
 * @param obj
 */
export const fetchCpHx = (ctx, obj) => {
  Request({
    url: api.CP_HX_LIST,
    success: res => {
      obj.success && obj.success(res);
    },
  });
}

/**
 * 获取琅琊万码
 * @param ctx
 * @param obj
 */
export const fetchCpLy = (ctx, obj) => {
  Request({
    url: api.CP_LY_LIST,
    success: res => {
      obj.success && obj.success(res);
    },
  });
}

/**
 * 获取乾坤万码
 * @param ctx
 * @param obj
 */
export const fetchCpQk = (ctx, obj) => {
  Request({
    url: api.CP_QK_LIST ,
    success: res => {
      obj.success && obj.success(res);
    },
  });
}

