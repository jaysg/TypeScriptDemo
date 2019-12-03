import axiosDo from './../utils/request';
import { ResponseObj } from '@/interfaces/responseObj';
import { message } from 'antd';
const LoginAPI = {
  login: (successCallback: Function) => {
    axiosDo(
      {
        url: '/api/v2/unsecure/login',
        method: 'post',
        data: {
          username: 'y@y',
          password: 'ilabservice'
        }
      },
      (res: ResponseObj<any>) => {
        const token = res.data.token;
        localStorage.setItem('token', token);
        if (successCallback) successCallback();
      }
    );
  }
};
export default LoginAPI;
