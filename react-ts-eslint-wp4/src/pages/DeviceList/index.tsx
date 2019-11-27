//引入样式
import './index.less';
//引入接口
import { Routes } from '@/interfaces/router/Router';
import { Device } from '@/interfaces/device';
import { ColumnProps } from 'antd/es/table';
//引入hooks
import React, { useState, useEffect } from 'react';
//引入model
import { getDeviceList } from '@/model/device';
import { login } from '@/model/login';
import { Table } from 'antd'; //引入组件库

const DeviceList: React.FC<Routes> = (routes: Routes) => {
  const [deviceList, setDevices] = useState<Array<Device>>([]);

  //相当于 state={isLogin:false} setIsLogin是一个自定义函数，用于设置当前state
  //等价于 (loginState)=>{this.setState({isLogin:loginState}) }
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    login(() => {
      getDeviceList(setDevices);
      setIsLogin(true);
    });
  }, []); //空数组类似componentDidMount

  useEffect(() => {
    console.log(`You haved ${deviceList.length} devices`);
  }, [deviceList]); //监听deviceList变化

  useEffect(() => {
    console.log(`isLogin=${isLogin}`);
  }, [isLogin]); //监听isLogin state变化

  //这里声明个范例 实际下面使用的jsx风格的columns
  const columns: ColumnProps<Device>[] = [
    {
      title: '设备名称',
      dataIndex: 'name',
      render: (text: any, record: any) => {
        return text;
      }
    }
  ];

  return (
    <div>
      <Table<Device>
        rowKey="id"
        dataSource={deviceList}
        pagination={{
          pageSize: 3
        }}
      >
        <Table.Column<Device> key="name" title="设备名称" dataIndex="name" />
      </Table>
    </div>
  );
};

export default DeviceList;
