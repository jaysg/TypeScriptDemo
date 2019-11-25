//引入接口
import { Routes } from '@/interfaces/router/Router';
//引入hooks
import React, { useState, useEffect } from 'react';
import { Button } from 'antd';

const Counter: React.FC<Routes> = (routes: Routes) => {
  const [count, setCount] = useState<number>(0);

  return (
    <div>
      <span>{count}</span>
      <Button
        type="primary"
        onClick={() => {
          setCount(count + 1);
        }}
      >
        Add One
      </Button>
    </div>
  );
};

export default Counter;
