import { extend } from 'umi-request';
import { message } from 'antd';
import { hashHistory } from 'react-router';

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '未登录或登录已过期，请重新登录。',
  403: '用户没有访问权限。',
  404: '发出的请求接口资源不存在。',
  405: '请求的方式不匹配。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  504: '网关超时。',
  610: '当前用户还没选择租户，请先选择租户。'
};

/**
 * 异常处理程序
 */
const errorHandler = error => {
  const { response = {} } = error;
  const errortext = codeMessage[response.status] || response.statusText;
  const { status, url } = response;
  message.destroy();
  if (status === 401) {
    message.error(errortext);
    // @HACK
    setTimeout(() => {
      location.href = CONTROLCONF.UIC_HOST + `/#/login`;
    }, 100);
    return message.error(errortext);
  }
  // environment should not be used
  if (status === 403) {
    hashHistory.push('/exception/403');
    return message.error(errortext);
  }

  if (status === 610) {
    // @HACK
    hashHistory.push('/tenantManage')
    return ;
  }
  message.error(errortext);
};

/**
 * 配置request请求时的默认参数
 */

const request = extend({
  errorHandler, // 默认错误处理
  credentials: 'include', // 默认请求是否带上cookie
  timeout: 20000
});

export default request;
