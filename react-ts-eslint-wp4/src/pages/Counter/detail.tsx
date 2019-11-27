//引入接口
import { Routes } from '@/interfaces/router/Router';
//引入hooks
import React, { useState, useReducer } from 'react';
import { Button } from 'antd';
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

const CounterDetail: React.FC<Routes> = (routes: Routes) => {
  const [count, setCount] = useState<number>(0);
  const [state, dispatch] = useReducer(reducer, initialState);
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
      <div>current tab:{routes.location.pathname}</div>
    </div>
  );
};

export default CounterDetail;
