//粗略的写了一下，有待优化空间
import { login, queryDeviceList } from '@/service/service';
import { Device } from '@/interfaces/Device';

export const dologin = (callback: Function) => {
  login((res: any) => {
    if (callback) callback();
  });
};
export const getDeviceList = (callback: Function) => {
  const callDeviceList = (deviceList: Array<Device>) => {
    console.log(deviceList);
    callback(deviceList);
  };
  queryDeviceList(callDeviceList);
};
