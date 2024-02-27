import useNavbarHeight from '@hooks/useNavbarHeight.ts';
import { lazy, Suspense, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { userActions } from '../entities/User';
import Spinner from '../shared/ui/Spinner/Spinner.tsx';
import { Navbar } from '../widgets/Navbar';
import { Sidebar } from '../widgets/Sidebar';

import './styles/index.scss';

const AppRouter = lazy(() => import('./providers/router/AppRouter.tsx'));
const App = () => {
  const location = useLocation();
  const showLayout = !location.pathname.startsWith('/auth') && !location.pathname.startsWith('/result');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userActions.initAuthData());

    return () => {
      dispatch(userActions.initAuthData());
    };
  }, [dispatch]);

  useNavbarHeight();

  return (
    <div
      className="app">
      <Suspense fallback={<Spinner data-test-id="loader"/>}>
        {showLayout && <Sidebar/>}
        <div className="content-page">
          {showLayout && <Navbar className="header"/>}
          <AppRouter className="page"/>
        </div>
      </Suspense>
    </div>
  );
};

export default App;
