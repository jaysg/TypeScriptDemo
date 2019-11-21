import { login, queryDeviceList } from '@/service/service';

export const dologin = (callback: Function) => {
  login((res: any) => {
    console.log(res);
    if (callback) callback();
  });
};
export const getDeviceList = () => {
  queryDeviceList();
};
