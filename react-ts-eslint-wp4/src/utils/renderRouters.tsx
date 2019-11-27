import React from 'react';
import { Route, Redirect, Switch, withRouter } from 'react-router-dom';
import { beforeRouter } from '@/router';
function ChkRoute(route: any, i: number, authed: boolean, authPath = '/', extraProps = {}) {
  const routes: Array<any> = route.routes;
  if (routes && routes.length) {
    //定义一个子路由数组 注意：父路由不得设置exact 参考router.ts中counter
    let subRouteArr: any[] = [];
    routes.forEach((subRoute: any, idx: number) => {
      const subRoutes: Array<any> = subRoute.routes;
      subRouteArr.push(
        subRoutes && subRoutes.length ? (
          ChkRoute(subRoute, i, authed, authPath, extraProps)
        ) : (
          <Route
            key={`${subRoute.path}_${idx}`}
            exact={subRoute.exact}
            path={`${subRoute.path}`}
            component={withRouter(subRoute.component)}
          ></Route>
        )
      );
      //withRouter用于绑定组件
    });
    return (
      <Route
        key={`${route.path}_${i}`}
        path={route.path}
        render={props => {
          return (
            <route.component {...props} {...extraProps} route={route}>
              {subRouteArr}
            </route.component>
          );
        }}
      ></Route>
    );
  } else {
    let preProps: any = {};
    if (route.exact) preProps.exact = route.exact;
    return (
      <Route
        key={`${route.path}_${i}`}
        path={route.path}
        {...preProps}
        render={props => {
          beforeRouter(route);
          if (!route.requireAuth || authed || route.path === authPath) {
            return <route.component {...props} {...extraProps} route={route} />;
          }
          return <Redirect to={{ pathname: authPath, state: { from: props.location } }} />;
        }}
      ></Route>
    );
  }
}

const renderRoutes = (routes: any, authed: boolean, authPath = '/', extraProps = {}, switchProps = {}) =>
  routes ? (
    <Switch {...switchProps}>
      {routes.map((route: any, i: number) => {
        return ChkRoute(route, i, authed, authPath, extraProps);
      })
      // routes.map((route: any, i: number) => {
      //   let preProps: any = {};
      //   if (route.exact) preProps.exact = route.exact;
      //   return (
      //     <Route
      //       key={route.key || i}
      //       path={route.path}
      //       {...preProps}
      //       render={props => {
      //         document.title = route.title || 'react-app';
      //         beforeRouter(route);
      //         //这一步的用户校验细则还没应用
      //         if (!route.requireAuth || authed || route.path === authPath) {
      //           //定义一个子路由数组 注意：父路由不得设置exact 参考router.ts中counter
      //           let subRouteArr: any[] = [];
      //           //判断routes是否存在
      //           if (route.routes) {
      //             //遍历routes生成Route对象数组
      //             route.routes.forEach((subRoute: any, idx: number) => {
      //               //withRouter用于绑定组件
      //               subRouteArr.push(
      //                 <Route
      //                   key={`${i}_${idx}`}
      //                   exact={subRoute.exact}
      //                   strict={subRoute.strict}
      //                   path={`${subRoute.path}`}
      //                   component={withRouter(subRoute.component)}
      //                 ></Route>
      //               );
      //             });
      //           }
      //           //subRouteArr丢进去
      //           return (
      //             <route.component {...props} {...extraProps} route={route}>
      //               {subRouteArr}
      //             </route.component>
      //           );
      //         }
      //         // eslint-disable-next-line
      //         return <Redirect to={{ pathname: authPath, state: { from: props.location } }} />;
      //       }}
      //     />
      //   );
      // })
      }
    </Switch>
  ) : null;

export default renderRoutes;
