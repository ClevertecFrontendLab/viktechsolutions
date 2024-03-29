import { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { ErrorPage, MainPage } from '@pages/index.ts';
import ResultPage from '@pages/ResultPage/ResultPage.tsx';

import { LoginFormAsync } from '../../../features/AuthByUserName';
import ProtectedRoute from '../../../features/ProtectedRoute/ProtectedRoute.tsx';
import { ChangePassword } from '../../../features/Result/ChangePassword/ChangePassword.tsx';
import { ConfirmEmail } from '../../../features/Result/ConfirmEmail/ConfirmEmail.tsx';
import { Reviews } from '../../../features/Reviews/index.ts';
import Spinner from '../../../shared/ui/Spinner/Spinner.tsx';

type AppRouterProps = {
    className?: string;
}

const AppRouter = ({ className }: AppRouterProps) => {

  return (
    <div className={className}>
      <Suspense fallback={<Spinner data-test-id="loader"/>}>
        <Routes>
          <Route
            path="/"
            element={<Navigate
              replace
              to="/main"/>}/>
          <Route
            path="/main"
            element={<ProtectedRoute/>}>
            <Route
              index
              element={<MainPage/>}/>
            <Route
              path="feedbacks"
              element={<Reviews/>}/>
          </Route>
          <Route
            path="auth"
            element={<LoginFormAsync tab="login"/>}/>
          <Route
            path="auth/registration"
            element={<LoginFormAsync
              tab="registration"/>}/>
          <Route
            path="auth/change-password"
            element={<ChangePassword/>}/>
          <Route
            path="auth/confirm-email"
            element={<ConfirmEmail/>}/>
          <Route
            path="result/:resultType"
            element={<ResultPage/>}/>
          <Route
            path="*"
            element={<ErrorPage/>}/>
        </Routes>
      </Suspense>
    </div>
  );
};

export default AppRouter;
