import React from 'react';
import { Routes } from '@/interfaces/router/Router';

import Logo from './react-logo.svg';

import './HelloWorldDemoPage.less';
import banner from '@/assets/banner_bg.jpg';

const HelloWorldDemoPage: React.FC<Routes> = (routes: Routes) => {
  console.log(routes);
  return (
    <div className="App">
      <header className="App-header">
        <Logo className="App-logo" />
        <div className="ColumnSection__grid">
          <div>
            <img src={banner} style={{ width: '100%' }}></img>
          </div>
          <div>
            <img src={banner} style={{ width: '100%' }}></img>
          </div>
          <div>
            <img src={banner} style={{ width: '100%' }}></img>
          </div>
        </div>
        <div className="OffsetSection__grid">
          <div>
            <img src={banner} style={{ width: '100%' }}></img>
          </div>
          <div>
            <img src={banner} style={{ width: '100%' }}></img>
          </div>
        </div>
        <div className="NestingSection__grid">
          <div>
            <img src={banner} style={{ width: '100%' }}></img>
          </div>
          <div>
            <img src={banner} style={{ width: '100%' }}></img>
          </div>
          <div>
            <div>
              <img src={banner} style={{ width: '100%' }}></img>
            </div>
            <div>
              <img src={banner} style={{ width: '100%' }}></img>
            </div>
          </div>
        </div>
        <div className="AlignmentSection__grid">
          <div style={{ width: 200 }}>
            <img src={banner} style={{ width: '100%' }}></img>
          </div>
        </div>
      </header>
    </div>
  );
};

export default HelloWorldDemoPage;
