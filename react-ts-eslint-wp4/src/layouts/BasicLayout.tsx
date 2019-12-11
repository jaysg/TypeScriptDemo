//引入接口
import { Routes } from '@/interfaces/router/Router';
//引入hooks
import React from 'react';
import { Layout } from 'antd';
import { Link } from 'react-router-dom';
import get from 'lodash/get';
import './BasicLayout.less';

const { Header, Footer, Sider, Content } = Layout;

const BasicLayout: React.FC<Routes> = (routes: Routes) => {
  //子组件
  const children = get(routes, 'children');

  return (
    <Layout className="layoutBg">
      <Header className="cus-header">
        <Link to="/devicelist">Device</Link>
        <Link to="/counter">Counter</Link>
      </Header>
      <Layout className="cus-layout">
        <Content className="cus-content">{children}</Content>
      </Layout>
      <Footer className="cus-footer">Footer</Footer>
    </Layout>
  );
};

export default BasicLayout;
