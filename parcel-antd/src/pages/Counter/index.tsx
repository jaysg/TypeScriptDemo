//引入接口
import { Routes } from '../../interfaces/router/Router';
//引入hooks
import React from 'react';
import { Link } from 'react-router-dom';
import get from 'lodash/get';

const Counter: React.FC<Routes> = (routes: Routes) => {
  //子组件
  const children = get(routes, 'children');

  //路由控制仿tab子组件路由 ps：路由跳转不保留组件状态 如果要保留子组件状态，请使用antd/Tabs组件
  return (
    <div>
      <Link to="/counter/detail">Show Detail</Link>
      <br />
      <Link to="/counter/detail2">Show Detail2</Link>
      {children}
    </div>
  );
};

export default Counter;
