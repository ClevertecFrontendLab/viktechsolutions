import { Button } from 'antd';
import { Link } from 'react-router-dom';

import OkIcon from '../../../shared/assets/icon/ok_icon.png';
import '../Result.scss';

export const SuccessChangePassword = () => {

  return (
    <div className="result">
      <div className="result__img">
        <img
          src={OkIcon}
          alt="ok icon"/>
      </div>
      <div className="result__text">
        <h3 className="result__title">
                    Пароль успешно изменен
        </h3>
        <p className="result__subtitle">
                    Теперь можно войти в аккаунт, используя свой логин и новый пароль
        </p>
      </div>
      <Link
        to="/auth/login"
        style={{ width: '100%' }}> <Button
          data-test-id="change-entry-button"
          type="primary">Вход</Button></Link>
    </div>
  );
};
