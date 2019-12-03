import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import renderRoutes from './utils/renderRouters';
import { routes } from './router';
import './index.less';
const authed = false;
const authPath = '/login';

const App: React.FC = () => {
  return <BrowserRouter basename=''>
    {renderRoutes(routes, authed, authPath)}
  </BrowserRouter>;
};
ReactDOM.render(<App />, document.getElementById('mountNode'));
