import axiosDo from './../utils/request';
import { ResponseObj, NormalListData } from '@/interfaces/responseObj';
import { message } from 'antd';
import { Device } from '@/interfaces/device';
const DeviceAPI = {
  getDeviceList: (successCallback: Function) => {
    axiosDo(
      {
        url: '/api/v2/secure/customer/monitor_target_lab_device?limit=12&offset=0'
      },
      (res: ResponseObj<NormalListData<Device>>) => {
        if (res.code === 0 && successCallback) {
          if (successCallback) successCallback(res.data.list);
        } else {
          message.error(res.message);
        }
      }
    );
  }
};
export default DeviceAPI;
