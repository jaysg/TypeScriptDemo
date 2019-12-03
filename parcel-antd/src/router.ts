import loadable from '@loadable/component';

export const routes = [
  {
    path: '/',
    name: 'basic',
    component: loadable(() => import('./layouts/BasicLayout')),
    routes: [
      {
        path: '/',
        exact: true,
        component: loadable(() => import('./pages/HelloWorldDemo/HelloWorldDemoPage')),
        name: 'home',
        title: 'HelloWorld'
      },
      {
        path: '/devicelist',
        exact: true,
        component: loadable(() => import('./pages/DeviceList')),
        name: 'devicelist',
        title: 'Device List'
      },
      {
        path: '/counter',
        component: loadable(() => import('./pages/Counter')),
        name: 'counter',
        title: 'Counter',
        routes: [
          {
            path: '/counter/detail',
            exact: true,
            component: loadable(() => import('./pages/Counter/detail')),
            name: 'counter detail',
            title: 'Counter Detail'
          },
          {
            path: '/counter/detail2',
            exact: true,
            component: loadable(() => import('./pages/Counter/detail')),
            name: 'counter detail',
            title: 'Counter Detail'
          }
        ]
      }
    ]
  },
  // 404 Not Found
  {
    path: '*',
    exact: true,
    component: loadable(() => import('./pages/Exception/404')),
    name: '404',
    title: '404'
  }
];