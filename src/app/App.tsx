import { lazy, Suspense, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

import useNavbarHeight from '@hooks/useNavbarHeight.ts';

import { userActions } from '../entities/User';
import Blur from '../shared/assets/images/blure.png';
import MainPageBackground from '../shared/assets/images/Main_page_light.png';
import Spinner from '../shared/ui/Spinner/Spinner.tsx';
import { Navbar } from '../widgets/Navbar';
import { Sidebar } from '../widgets/Sidebar';
import './styles/index.scss';

const AppRouter = lazy(() => import('./providers/router/AppRouter.tsx'));
const App = () => {
  const location = useLocation();
  const showLayout = !location.pathname.startsWith('/auth') && !location.pathname.startsWith('/result');
  const dispatch = useDispatch();
  const [background, setBackground] = useState({});

  useEffect(() => {
    dispatch(userActions.initAuthData());

    return () => {
      dispatch(userActions.initAuthData());
    };
  }, [dispatch]);

  useNavbarHeight();

  useEffect(() => {
    if (location.pathname.includes('/auth')) {
      setBackground({ background: `url(${Blur}) no-repeat center center / cover` });
    } else {
      setBackground({ background: `url(${MainPageBackground}) no-repeat center center / cover` });
    }
  }, [location.pathname]);

  return (
    <div
      className="app"
      style={background}>
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
