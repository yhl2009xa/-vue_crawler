import Request from '../fetch/request'
import api from '../utils/api'
/**
 * 获取首页数据
 * @param ctx
 * @param obj
 */
export const fetcHomePage = (ctx,obj) =>{
  Request({
    url:api.HOME,
    success: res => {
      obj.success && obj.success(res);
    },
  });
}
