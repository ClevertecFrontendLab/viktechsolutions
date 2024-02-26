import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

import { getUserAuhData } from '../../entities/User';
import Spinner from '../../shared/ui/Spinner/Spinner.tsx';
import { getAuthIsLoading } from '../AuthByUserName/model/selectors/getAuthIsLoading.ts';

const ProtectedRoute = () => {
  const authData = useSelector(getUserAuhData);
  const isLoading = useSelector(getAuthIsLoading);

  if (isLoading) {
    return <Spinner data-test-id="loader"/>;
  }

  return authData ? <Outlet/> : <Navigate
    to="/auth/login"
    replace/>;
};

export default ProtectedRoute;
