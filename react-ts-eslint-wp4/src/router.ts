import loadable from '@loadable/component';

export const basename = '';

export const routes = [
  {
    path: '/',
    exact: true,
    component: loadable(() => import('@/pages/demo/HelloWorldDemo/HelloWorldDemoPage')),
    name: 'home',
    title: 'react-home'
  },
  {
    path: '/home',
    exact: true,
    component: loadable(() => import('@/pages/demo/HelloWorldDemo/HelloWorldDemoPage')),
    name: 'home',
    title: 'HelloWorld'
  },
  {
    path: '/device',
    exact: true,
    component: loadable(() => import('@/pages/DeviceList')),
    name: 'device',
    title: 'Device List'
  },
  {
    path: '/counter',
    exact: true,
    component: loadable(() => import('@/pages/Counter')),
    name: 'counter',
    title: 'Counter'
  },
  // 404 Not Found
  {
    path: '*',
    exact: true,
    component: loadable(() => import('@/pages/Exception/404')),
    name: '404',
    title: '404'
  }
];

export function beforeRouter(route: any) {
  /* do something... */
}
