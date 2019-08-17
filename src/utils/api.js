let BASE_URL = 'http://192.168.0.105:8089';
let BASE_OUTER_API_URL = 'https://api.apiopen.top';


/**
 * 区分线上环境(build)/开发环境(dev)/测试环境(test)
 * **/
export const isBuild = /(https|http):\/\/(www.ffxworld.cn)/i.test(location.href.toLowerCase());
// export const isDev = /https:\/\/(devmobile\.comein\.cn|devserver\.comein\.cn)/i.test(location.href.toLowerCase());
// export const isTest = /https:\/\/(testmobile\.comein\.cn|testserver\.comein\.cn)/i.test(location.href.toLowerCase());

if(isBuild){
  BASE_URL = "http://47.94.1.78";
}

export default {
  //获取主页数据
  HOME:BASE_URL + '/getMainPage',
  //获取新闻列表
  NEWS_LIST:BASE_OUTER_API_URL + "/getWangYiNews",
  //获取段子列表
  JOKE_LIST:BASE_OUTER_API_URL + "/getJoke",
  //获取网易新闻api
  WY_NEWS_LIST:BASE_URL + "/getWYNews"


}
