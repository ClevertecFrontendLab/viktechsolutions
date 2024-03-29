import { Button } from 'antd';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import Forgot404 from '../../../shared/assets/icon/forgot404.png';
import { getEmailCheck } from '../../AuthByUserName/model/selectors/getEmailCheck.ts';
import { emailCheck } from '../../AuthByUserName/model/services/emailCheck.ts';
import './ErrorCheckEmail.scss';

export const ErrorCheckEmail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const email = useSelector(getEmailCheck);

  const handleRetry = useCallback(async () => {
    if (email) {
      try {
        console.log('check-email', email);
        await dispatch(emailCheck(email)).unwrap();
        navigate('/auth/confirm-email');
      } catch (error) {
        if (error?.status === 404 && error?.data?.message === 'Email не найден') {
          navigate('/result/error-check-email-no-exist', { state: { fromRequest: true }});
        } else if (error?.status) {
          navigate('/result/error-check-email', { state: { fromRequest: true }});
        }
      }
    }

    return () => {
      dispatch(emailCheck(email)).unwrap();
    };
  }, [dispatch, email, navigate]);

  return (
    <div className="error-check-email">
      <div className="error-check-email__img">
        <img
          src={Forgot404}
          alt="no ok icon"/>
      </div>
      <div className="error-check-email__text">
        <h3 className="error-check-email__title">
                    Что-то пошло не так
        </h3>
        <p className="error-check-email__subtitle">
                    Произошла ошибка, попробуйте отправить форму ещё раз.
        </p>
      </div>
      <Link
        to="/auth/login"
        style={{ width: '100%' }}> <Button
          data-test-id="check-back-button"
          type="primary"
          onClick={handleRetry}>Назад</Button></Link>
    </div>
  );
};
