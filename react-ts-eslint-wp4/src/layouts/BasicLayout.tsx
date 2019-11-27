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
    <Layout className="bg">
      <Header>
        <Link to="/devicelist" className="margin">
          Device
        </Link>
        <Link to="/counter">Counter</Link>
      </Header>
      <Layout>
        <Sider></Sider>
        {/* <Sider collapsible={true}>Sider</Sider> */}
        <Content>{children}</Content>
      </Layout>
      {/* <Footer>Footer</Footer> */}
    </Layout>
  );
};

export default BasicLayout;
