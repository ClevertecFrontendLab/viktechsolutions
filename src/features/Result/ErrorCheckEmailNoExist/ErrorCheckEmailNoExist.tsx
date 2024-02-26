import { Button } from 'antd';
import { Link } from 'react-router-dom';

import NoOkIcon from '../../../shared/assets/icon/no_ok_icon.png';
import './ErrorCheckEmailNoExist.scss';

export const ErrorCheckEmailNoExist = () => {

  return (
    <div
      className="result">
      <div className="result__img">
        <img
          src={NoOkIcon}
          alt="no ok icon"/>
      </div>
      <div className="result__text">
        <h3 className="result__title">Такой e-mail не зарегистрирован
        </h3>
        <p
          className="result__subtitle">
                    Мы не нашли в базе вашего e-mail. Попробуйте войти с другим e-mail.
        </p>
      </div>
      <Link
        to="/auth/login"
        style={{ width: '100%' }}> <Button
          data-test-id="check-retry-button"
          type="primary"> Повторить</Button></Link>
    </div>
  );
};
