import React from 'react';
import { Routes } from '@/interfaces/router/Router';

import Logo from './react-logo.svg';

// import Button from 'antd/es/button';
import { Button } from 'antd';

import './HelloWorldDemoPage.less';
import { Link } from 'react-router-dom';

const HelloWorldDemoPage: React.FC<Routes> = (routes: Routes) => {
  return (
    <div className="App">
      <header className="App-header">
        <Logo className="App-logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
        <div>
          <Button type="primary">
            <Link to="/device">Go Device List</Link>
          </Button>
        </div>
      </header>
    </div>
  );
};

export default HelloWorldDemoPage;
