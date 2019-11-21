import './index.less';
import { Routes } from '@/interfaces/router/Router';
import { Device } from '@/interfaces/device';
import React, { useState, useEffect } from 'react';
import { dologin, getDeviceList } from '@/model/device';

const DeviceList: React.FC<Routes> = (routes: Routes) => {
  const [isLogin, setIsLogin] = useState<boolean>(localStorage.getItem('token') != null);
  const [count, setCount] = useState<number>(0);
  const [deviceList] = useState<Array<Device>>([]);

  useEffect(() => {
    dologin(getDeviceList);
    // if (!isLogin) {
    //   console.log('未登录');
    //   dologin();
    // } else {
    //   console.log('已登录');
    // }
  }, [isLogin]);

  useEffect(() => {
    console.log('限制count的useEffect');
    document.title = `You clicked ${count} times`;
  }, [count]);

  useEffect(() => {
    if (isLogin) {
      // getDeviceList();
    }
    console.log(`You haved ${deviceList.length} items`);
  }, [deviceList]);

  return (
    <div>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        +
      </button>
      {count}
      <button
        onClick={() => {
          setCount(count - 1);
        }}
      >
        -
      </button>
    </div>
  );
};

export default DeviceList;
