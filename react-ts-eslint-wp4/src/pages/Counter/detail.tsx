//引入接口
import { Routes } from '@/interfaces/router/Router';
//引入hooks
import React from 'react';
import { Link } from 'react-router-dom';

const CounterDetail: React.FC<Routes> = (routes: Routes) => {
  return (
    <div>
      <Link to="/counter">Go Back</Link>
    </div>
  );
};

export default CounterDetail;
