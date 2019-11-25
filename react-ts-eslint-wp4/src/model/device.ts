import { Device } from '@/interfaces/Device';
import DeviceAPI from '@/service/device';
export const getDeviceList = (callback: Function) => {
  const callDeviceList = (deviceList: Array<Device>) => {
    callback(deviceList);
  };
  DeviceAPI.getDeviceList(callDeviceList);
};
