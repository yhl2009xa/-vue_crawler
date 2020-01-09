/**
 * 变量
 *
 * @param  { var } key
 * @return { Boolean }
 * **/
export const isEmpty = key => !key || typeof (key) === 'undefined' || key === null;

/**
 * 判断数据类型
 *
 * @param  arr/obj/fn
 * @return { Boolean }
 * **/
export const isArray = arr => Object.prototype.toString.call(arr) === '[object Array]';
export const isObject = obj => Object.prototype.toString.call(obj) === '[object Object]';
export const isFun = fn => Object.prototype.toString.call(fn) === '[object Function]';

/**
 * 匹配html(以 p | div | a | span为例)
 * **/
export const resExpHtml = str => {
  const reg = new RegExp(/(<p|a|div|span).*(?=>)(.|\n)*?<\\?\/(p|a|div|span)>/g);
  return reg.test(str);
};


/**
 * 清除 内容中 \n | \\n
 * * **/
export const removeAllLineBreak = str => {
  const reg = new RegExp(/\\+n/g);
  return reg.test(str) ? str.replace(reg, '') : str;
};


/**
 * 替换文本中所有换行(\n)为<br/>
 *
 * @param  { String } str
 * @return { String }
 * **/
export const replaceAllLineBreakWithBr = str => {
  const reg = new RegExp(/\\+n/g);
  return reg.test(str) ? str.replace(reg, '<br/>') : str;
};

/**
 * 去除字符串中 <br/>
 *
 * @param { String } str
 * **/
export const removeBr = str => {
  const reg = new RegExp(/<br\s*\\?\/?>/gi);
  return reg.test(str) ? str.replace(reg, '') : str;
};

/**
 * 转义str字符
 * @param str
 * @returns {string|*}
 */
export const escapeXmlChars=(str)=> {
  if (typeof(str) == "string")
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
  else
    return str;
}
