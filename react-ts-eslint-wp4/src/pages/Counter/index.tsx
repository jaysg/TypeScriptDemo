//引入接口
import { Routes } from '@/interfaces/router/Router';
//引入hooks
import React, { useState, useReducer } from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import _ from 'lodash';

const initialState = { count: 0 };
function reducer(state: any, action: any) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    case 'reset':
      return { count: 0 };
    default:
      throw new Error();
  }
}

const Counter: React.FC<Routes> = (routes: Routes) => {
  const [count, setCount] = useState<number>(0);
  const [state, dispatch] = useReducer(reducer, initialState);

  //子组件
  const children = _.get(routes, 'children');

  return (
    <div>
      <p>
        <Button
          type="primary"
          onClick={() => {
            setCount(count + 1);
          }}
        >
          + Current：{count}
        </Button>
      </p>
      <p>
        <Button type="primary" onClick={() => dispatch({ type: 'increment' })}>
          +
        </Button>
        <Button type="primary" onClick={() => dispatch({ type: 'decrement' })}>
          -
        </Button>
        <Button type="primary" onClick={() => dispatch({ type: 'reset' })}>
          C
        </Button>
        <span>{state.count}</span>
      </p>
      <Link to="/counter/detail">Go Detail</Link>
      {children}
    </div>
  );
};

export default Counter;
