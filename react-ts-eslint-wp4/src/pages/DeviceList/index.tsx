import './index.less';
import { Routes } from '@/interfaces/router/Router';
import { Device } from '@/interfaces/Device';
import React, { useState, useEffect } from 'react';
import { dologin, getDeviceList } from '@/model/device';

const DeviceList: React.FC<Routes> = (routes: Routes) => {
  const [deviceList, setDevices] = useState<Array<Device>>([]);
  const [count, setC] = useState<number>(0);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    dologin(() => {
      getDeviceList(setDevices);
      setIsLogin(true);
    });
  }, []);

  useEffect(() => {
    console.log(`You haved ${deviceList.length} devices`);
  }, [deviceList]);

  useEffect(() => {
    console.log(`isLogin=${isLogin}`);
  }, [isLogin]);

  return (
    <div>
      <div onClick={() => setC(count + 1)}>点击数：{count}</div>
      <div>{JSON.stringify(deviceList)}</div>
    </div>
  );
};

export default DeviceList;
