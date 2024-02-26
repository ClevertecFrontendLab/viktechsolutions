import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { getUserAuhData } from '../../entities/User';
import {
  getRegisterState,
} from '../../features/AuthByUserName/model/selectors/getRegisterState.ts';
import { Error } from '../../features/Result/Error/Error.tsx';
import {
  ErrorChangePassword,
} from '../../features/Result/ErrorChangePassword/ErrorChangePassword.tsx';
import { ErrorCheckEmail } from '../../features/Result/ErrorCheckEmail/ErrorCheckEmail.tsx';
import {
  ErrorCheckEmailNoExist,
} from '../../features/Result/ErrorCheckEmailNoExist/ErrorCheckEmailNoExist.tsx';
import { ErrorLogin } from '../../features/Result/ErrorLogin/ErrorLogin.tsx';
import { ErrorUserExist } from '../../features/Result/ErrorUserExist/ErrorUserExist.tsx';
import { Success } from '../../features/Result/Success/Success.tsx';
import {
  SuccessChangePassword,
} from '../../features/Result/SuccessChangePassword/SuccessChangePassword.tsx';
import Spinner from '../../shared/ui/Spinner/Spinner.tsx';

import './ResultPage.scss';

const ResultPage = () => {
  const { resultType } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoadingRegister } = useSelector(getRegisterState);

  const authData = useSelector(getUserAuhData);

  useEffect(() => {
    if (!authData && !location.state?.fromRequest) {
      navigate('/auth', { replace: true });
    }
  }, [navigate, location.state, authData]);

  // Отображение сообщения об ошибке на основе resultType
  const renderErrorMessage = () => {
    switch (resultType) {
    case 'error-login':
      return <ErrorLogin/>;
    case 'error-user-exist':
      return <ErrorUserExist/>;
    case 'success':
      return <Success/>;
    case 'error':
      return <Error/>;
    case 'error-check-email-no-exist':
      return <ErrorCheckEmailNoExist/>;
    case 'error-check-email':
      return <ErrorCheckEmail/>;
    case 'success-change-password':
      return <SuccessChangePassword/>;
    case 'error-change-password':
      return <ErrorChangePassword/>;
    default:
      return 'Произошла ошибка';
    }
  };

  if (isLoadingRegister) {
    return <Spinner/>;
  }

  return (
    <div className="result-page">
      <div className="result-page__blur">
        {renderErrorMessage()}
      </div>
    </div>
  );
};

export default ResultPage;
