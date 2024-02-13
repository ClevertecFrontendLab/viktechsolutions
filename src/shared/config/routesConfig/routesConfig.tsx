import { MainPage } from '@pages/main-page';
import { RouteProps } from 'react-router-dom';

export enum AppRoutes {
  MAIN = '/',
  NOT_FOUND = '/not-found',
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: '/',
  [AppRoutes.NOT_FOUND]: '/not-found',
};

export const routeConfig: Record<AppRoutes, RouteProps> = {

  [AppRoutes.MAIN]: {
    path: RoutePath[AppRoutes.MAIN],
    element: <MainPage/>
  },
  [AppRoutes.NOT_FOUND]: {
    path: RoutePath[AppRoutes.NOT_FOUND],
    element: <div>Page not found</div>
  }
};

export const breadcrumbName = {
  "/" : 'Главная',
  "error" : 'Страница не найдена'
}
