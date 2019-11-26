import loadable from '@loadable/component';

export const basename = '';

export const routes = [
  {
    path: '/',
    exact: true,
    component: loadable(() => import('@/pages/HelloWorldDemo/HelloWorldDemoPage')),
    name: 'home',
    title: 'react-home'
  },
  {
    path: '/home',
    exact: true,
    component: loadable(() => import('@/pages/HelloWorldDemo/HelloWorldDemoPage')),
    name: 'home',
    title: 'HelloWorld'
  },
  {
    path: '/devicelist',
    exact: true,
    component: loadable(() => import('@/pages/DeviceList')),
    name: 'devicelist',
    title: 'Device List'
  },
  {
    path: '/counter',
    component: loadable(() => import('@/pages/Counter')),
    name: 'counter',
    title: 'Counter',
    routes: [
      {
        path: '/counter/detail',
        exact: true,
        component: loadable(() => import('@/pages/Counter/detail')),
        name: 'counter detail',
        title: 'Counter Detail'
      }
    ]
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
