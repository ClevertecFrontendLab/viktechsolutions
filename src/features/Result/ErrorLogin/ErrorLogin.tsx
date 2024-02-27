import { Button } from 'antd';
import { Link } from 'react-router-dom';

import SuggestedIcon from '../../../shared/assets/icon/suggested_icon.png';
import '../Result.scss';

export const ErrorLogin = () => {

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
                    Что-то пошло не так. Попробуйте еще раз
        </p>
      </div>
      <Link
        to="/auth/login"
        style={{ width: '100%' }}> <Button
          data-test-id="login-retry-button"
          type="primary"> Повторить</Button></Link>
    </div>
  );
};
