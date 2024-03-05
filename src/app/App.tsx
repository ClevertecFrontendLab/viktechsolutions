import { lazy, Suspense, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import useNavbarHeight from '@hooks/useNavbarHeight.ts';

import { userActions } from '../entities/User';
import { getLoginRemember } from '../features/AuthByUserName/model/selectors/getLoginRemember.ts';
import Blur from '../shared/assets/images/blure.png';
import MainPageBackground from '../shared/assets/images/Main_page_light.png';
import { USER_LOCALSTORAGE_KEY } from '../shared/const/localstorage.ts';
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
  const navigate = useNavigate();
  const remember = useSelector(getLoginRemember);
  // const token = sessionStorage.getItem(USER_LOCALSTORAGE_KEY) || localStorage.getItem(USER_LOCALSTORAGE_KEY);
  const handleLoad = () => {
    if (sessionStorage.getItem('isAuthenticating') === 'false') {
      sessionStorage.removeItem('accessToken');

      dispatch(userActions.initAuthData());
      navigate('/auth');
    }
  };

  useEffect(() => {
    const checkAuthentication = () => {
      const token = sessionStorage.getItem(USER_LOCALSTORAGE_KEY) || localStorage.getItem(USER_LOCALSTORAGE_KEY);

      if (!token) {
        navigate('/auth');
      }
    };

    checkAuthentication();
    window.addEventListener('load', handleLoad);

    const queryParams = new URLSearchParams(window.location.search).get('accessToken');

    if (queryParams) {
      const tokenObject = { accessToken: queryParams };
      const tokenString = JSON.stringify(tokenObject);

      if (queryParams) {
        if (remember) {
          localStorage.setItem(USER_LOCALSTORAGE_KEY, tokenString);
        } else {
          sessionStorage.setItem(USER_LOCALSTORAGE_KEY, tokenString);
        }

        navigate('/main');
      }
    }

    dispatch(userActions.initAuthData());

    return () => {
      dispatch(userActions.initAuthData());
      window.removeEventListener('load', handleLoad);

    };
  }, [dispatch, navigate, remember]);

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
