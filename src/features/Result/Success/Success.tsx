import { Button } from 'antd';
import { Link } from 'react-router-dom';

import OkIcon from '../../../shared/assets/icon/ok_icon.png';
import '../Result.scss';

export const Success = () => {

  return (
    <div className="result">
      <div className="result__img">
        <img
          src={OkIcon}
          alt="results"/>
      </div>
      <div className="result__text">
        <h3 className="result__title">
                    Регистрация успешна
        </h3>
        <p className="result__subtitle">
                    Регистрация прошла успешно. Зайдите в приложение, используя свои e-mail и
                    пароль.
        </p>
      </div>
      <Link
        to="/auth/login"
        style={{ width: '100%' }}> <Button
          data-test-id="registration-enter-button"
          type="primary">Войти</Button></Link>
    </div>
  );
};
