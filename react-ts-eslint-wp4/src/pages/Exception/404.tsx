//引入接口
import { Routes } from '@/interfaces/router/Router';
//引入hooks
import React from 'react';

const Exception404: React.FC<Routes> = () => {
  return (
    <div>
      <h1>404</h1>
    </div>
  );
};

export default Exception404;
