import { Button } from 'antd';
import { Link } from 'react-router-dom';

import NoOkIcon from '../../../shared/assets/icon/no_ok_icon.png';
import '../Result.scss';

export const ErrorUserExist = () => {

  return (
    <div className="result">
      <div className="result__img">
        <img
          src={NoOkIcon}
          alt="no ok icon"/>
      </div>
      <div className="result__text">
        <h3 className="result__title">
                    Данные не сохранились
        </h3>
        <p className="result__subtitle">
                    Такой e-mail уже записан в системе. Попробуйте зарегистрироваться по другому
                    e-mail.
        </p>
      </div>
      <Link
        to="/auth/registration"
        style={{ width: '100%' }}> <Button
          data-test-id="registration-back-button"
          type="primary"> Повторить.</Button></Link>
    </div>
  );
};
