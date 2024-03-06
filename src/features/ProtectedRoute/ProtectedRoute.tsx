import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

import { getUserAuhData } from '../../entities/User';
import { USER_LOCALSTORAGE_KEY } from '../../shared/const/localstorage.ts';
import Spinner from '../../shared/ui/Spinner/Spinner.tsx';
import { getAuthIsLoading } from '../AuthByUserName/model/selectors/getAuthIsLoading.ts';

const ProtectedRoute = () => {

  const authData = useSelector(getUserAuhData);
  const isLoading = useSelector(getAuthIsLoading);
  const token = sessionStorage.getItem(USER_LOCALSTORAGE_KEY) || localStorage.getItem(USER_LOCALSTORAGE_KEY);

  if (isLoading) {
    return <Spinner data-test-id="loader"/>;
  }

  if (!token) {
    return <Navigate
      to="/auth"
      replace/>;
  }

  return <Outlet/>;
};

export default ProtectedRoute;
