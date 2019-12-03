import React from 'react';
import { Routes } from '@/interfaces/router/Router';
import './HelloWorldDemoPage.less';
import banner from '../../assets/banner_bg.jpg';

import Logo from '../../../public/react-logo.svg';

const HelloWorldDemoPage: React.FC<Routes> = (routes: Routes) => {
  return (
    <div className="App">
      <header className="App-header">
        {/* <Logo className="App-logo" /> */}
        <img src={banner} style={{ height: 300, width: 400 }}></img>
      </header>
    </div>
  );
};

export default HelloWorldDemoPage;
