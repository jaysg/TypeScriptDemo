import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
const axiosDo = (config: AxiosRequestConfig, callback: Function) => {
  axios(config)
    .then(function(response) {
      callback(response);
    })
    .catch(function(error) {
      // handle error
      console.log(error);
    });
};

export const login = (successCallbak: Function) => {
  axiosDo(
    {
      method: 'post',
      url: '/api/v2/unsecure/login',
      data: {
        username: 'user2',
        password: 'ilabservice'
      }
    },
    (res: AxiosResponse) => {
      if (res && res.status === 200) {
        const token = res.data.data.token;
        localStorage.setItem('token', `Bearer ${token}`);
        // axios.defaults.headers = ['X-Authorization', `Bearer ${token}`];
        axios.defaults.headers.common['X-Authorization'] = `Bearer ${token}`;
        successCallbak(res.data);
      }
    }
  );
};
export const queryDeviceList = () => {
  axiosDo(
    {
      method: 'get',
      url: '/api/v2/secure/customer/monitor_target_lab_device?limit=12&offset=0'
    },
    (res: AxiosResponse) => {
      if (res && res.status === 200) {
        const _res = res.data;
        if (_res.code === 0) {
          console.log(_res.data);
        }
      }
    }
  );
};
