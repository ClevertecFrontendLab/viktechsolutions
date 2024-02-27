import { ErrorPage } from '@pages/index';
import MainPage from '@pages/main-page/main-page.tsx';
// eslint-disable-next-line import/named
import { RouteProps } from 'react-router-dom';

export enum AppRoutes {
    MAIN = '/',
    NOT_FOUND = '/*',
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: '/',
  [AppRoutes.NOT_FOUND]: '/*',
};

export const routeConfig: Record<AppRoutes, RouteProps> = {
  [AppRoutes.MAIN]: {
    path: RoutePath[AppRoutes.MAIN],
    element: <MainPage/>,
  },
  [AppRoutes.NOT_FOUND]: {
    path: RoutePath[AppRoutes.NOT_FOUND],
    element: <ErrorPage/>,
  },
};
