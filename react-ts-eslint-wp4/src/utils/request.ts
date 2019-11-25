import _ from 'lodash';
import { message } from 'antd';
import { ResponseObj } from '@/interfaces/responseObj';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const token = localStorage.getItem('token');
const codeMessage = {
  '200': '请求成功。',
  '201': '操作成功。',
  '202': '一个请求已经进入后台排队（异步任务）。',
  '204': '删除成功。',
  '400': '服务请求失败，请联系技术人员。',
  '401': '用户权限校验失败，请重新登陆。',
  '403': '用户权限校验失败，请重新登陆。',
  '404': '请求的服务器地址不存在，请确认地址。',
  '406': '请求的格式不可得。',
  '410': '请求的资源被永久删除，且不会再得到的。',
  '422': '当创建一个对象时，发生一个验证错误。',
  '500': '服务器错误，请联系技术人员。',
  '502': '服务器异常，请稍后重试。',
  '503': '服务不可用，服务器暂时过载或维保。',
  '504': '网络错误，请检查确认网络是否正常。'
};

const checkStatus = (response: AxiosResponse) => {
  const successArr = [200, 201, 204];
  const errorArr = [400, 401, 403, 404, 500, 502, 503, 504];

  //调用错误处理
  if (errorArr.indexOf(response.status) != -1) {
    message.error(_.get(codeMessage, `[${response.status}]`));
    if (response.status === 401) {
      //跳转到登录页
    }

    return null;
  }

  //调用成功处理 默认200不提示
  if (successArr.indexOf(response.status) != -1) {
    if (response.status != 200) message.success(_.get(codeMessage, `[${response.status}]`));
    return response.data;
  }

  return null;
};

/**
 * 网络请求函数体
 * @param url 请求地址
 * @param options 配置信息
 */
const axiosDo = (options: AxiosRequestConfig, successCallBack?: Function, failedCallback?: Function) => {
  let newOptions: AxiosRequestConfig = {
    method: 'get',
    headers: { 'x-authorization': 'Bearer ' + token, 'x-language': 'chinese' },
    ...options
  };

  //如果传入的body不为空 并且类型是 FormData 自动补上对应ContentType
  //这里一点要注意的是axios没有body,data只在PUT,POST,PATCH,详情参考文档http://www.axios-js.com/docs/
  if (newOptions.data && newOptions.data instanceof FormData) {
    newOptions.headers['Content-Type'] = 'mulitipart/form-data';
  }

  axios({ ...newOptions })
    .then(response => {
      const resData: ResponseObj = checkStatus(response);
      if (successCallBack) successCallBack(resData);
    })
    .catch(function(error) {
      console.log(error);
      if (failedCallback) failedCallback(error);
    });
};

export default axiosDo;
