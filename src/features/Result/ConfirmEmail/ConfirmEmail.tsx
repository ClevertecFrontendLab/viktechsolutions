import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import VerificationInput from 'react-verification-input';

import ExclamPoint from '../../../shared/assets/icon/exclamation_point.png';
import { getEmailCheck } from '../../AuthByUserName/model/selectors/getEmailCheck.ts';
import { confirmEmail } from '../../AuthByUserName/model/services/confirmEmail.ts';
import './ConfirmEmail.scss';

export const ConfirmEmail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const email = useSelector(getEmailCheck);
  const [code, setCode] = useState('');
  const [error, setError] = useState(false);

  const handleComplete = useCallback(async (value) => {
    setCode(value);
    if (value.length === 6) {
      dispatch(confirmEmail({ email, code: value }))
        .unwrap()
        .then(() => navigate('/auth/change-password'))
        .catch((error) => {
          setError(true);
          // Тут должен быть вызов экшена, который обновляет состояние ошибки в слайсе
          dispatch(updateErrorState(error.response.data));
        });
    }
  }, [dispatch, setCode, email, navigate]);

  const errorStyle = {
    border: error ? '1px solid red' : '',
  };

  return (
    <div className="confirm-email">
      <div className="confirm-email__box">
        <div className="confirm-email__img">
          <img
            src={ExclamPoint}
            alt="exclamation point"/>
        </div>
        <h3 className="confirm-email__title">
                    Введите код <br/> для восстановления аккаунта
        </h3>
        <p className="confirm-email__description">
                    Мы отправили вам на e-mail <strong>{email}</strong> шестизначный код.
                    Введите его в поле ниже.
        </p>
        <div
          className={`confirm-email__input ${error ? 'error' : ''}`}
        >
          <div data-test-id="verification-input">
            <VerificationInput
              data-test-id="verification-input"
              length={6}
              placeholder=""
              validChars="0-9"
              onChange={setCode}
              onComplete={handleComplete}
            />
          </div>

        </div>
        <p className="confirm-email__note">
                    Не пришло письмо? Проверьте папку Спам.
        </p>
      </div>
    </div>
  );
};
