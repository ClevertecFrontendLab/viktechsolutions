import { Button } from 'antd';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import SuggestedIcon from '../../../shared/assets/icon/suggested_icon.png';
import { getRegisterState } from '../../AuthByUserName/model/selectors/getRegisterState.ts';
import { registerByEmail } from '../../AuthByUserName/model/services/registerByEmail.ts';
import { registerActions } from '../../AuthByUserName/model/slice/registerSlice.ts';
import '../Result.scss';

export const Error = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { email, password } = useSelector(getRegisterState);

  const handleRetry = useCallback(async () => {

    if (email && password) {
      try {
        await dispatch(registerByEmail(email, password)).unwrap();

        navigate('/result/success', { state: { fromRequest: true }});
      } catch (error) {
        dispatch(registerActions.setIsLoading(false));
        if (error?.statusCode === 409) {
          navigate('/result/error-user-exist', { state: { fromRequest: true }});
        } else if (error) {
          navigate('/result/error', { state: { fromRequest: true }});
        }
      }
    }

    return () => {
      dispatch(registerByEmail(email, password)).unwrap();
    };
  }, [dispatch, email, navigate, password]);

  return (
    <div className="result">
      <div className="result__img">
        <img
          src={SuggestedIcon}
          alt="error login"/>
      </div>
      <div className="result__text">
        <h3 className="result__title">
                    Вход не выполнен
        </h3>
        <p className="result__subtitle">
                    Что-то пошло не так и ваша регистрация не завершилась. Попробуйте ещё раз.
        </p>
      </div>
      <Link
        to="/auth/registration"
        style={{ width: '100%' }}> <Button
          data-test-id="registration-retry-button"
          type="primary"
          onClick={handleRetry}>Повторить.</Button></Link>
    </div>
  );
};
