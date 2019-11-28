import React from 'react';
import { Routes } from '@/interfaces/router/Router';

import Logo from './react-logo.svg';

import './HelloWorldDemoPage.less';

const HelloWorldDemoPage: React.FC<Routes> = (routes: Routes) => {
  console.log(routes);
  return (
    <div className="App">
      <header className="App-header">
        <Logo className="App-logo" />
      </header>
    </div>
  );
};

export default HelloWorldDemoPage;
