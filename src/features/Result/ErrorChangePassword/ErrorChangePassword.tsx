import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

import NoOkIcon from '../../../shared/assets/icon/no_ok_icon.png';
import '../Result.scss';

export const ErrorChangePassword = () => {
  const navigate = useNavigate();

  const handleRetry = () => {
    navigate('/auth/change-password', { state: { fromRequest: true }});
  };

  return (
    <div className="result">
      <div className="result__img">
        <img
          src={NoOkIcon}
          alt="error login"/>
      </div>
      <div className="result__text">
        <h3 className="result__title">
                    Данные не сохранились
        </h3>
        <p className="result__subtitle">
                    Что-то пошло не так. Попробуйте ещё раз
        </p>
      </div>
      <Button
        data-test-id="change-retry-button"
        onClick={handleRetry}
        type="primary"> Повторить</Button>
    </div>
  );
};
