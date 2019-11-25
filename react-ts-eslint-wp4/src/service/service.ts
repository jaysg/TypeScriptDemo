import axiosDo from './../utils/request';
import { ResponseObj } from '@/interfaces/responseObj';
import { message } from 'antd';

export const login = (successCallback: Function) => {
  axiosDo(
    {
      url: '/api/v2/unsecure/login',
      method: 'post',
      data: {
        username: 'user2',
        password: 'ilabservice'
      }
    },
    (res: ResponseObj) => {
      console.log(res);
      const token = res.data.token;
      localStorage.setItem('token', token);
      if (successCallback) successCallback();
    }
  );
};

export const queryDeviceList = (successCallback: Function) => {
  axiosDo(
    {
      url: '/api/v2/secure/customer/monitor_target_lab_device?limit=12&offset=0'
    },
    (res: ResponseObj) => {
      if (res.code === 0 && successCallback) {
        if (successCallback) successCallback(res.data.list);
      } else {
        message.error(res.message);
      }
    }
  );
};
