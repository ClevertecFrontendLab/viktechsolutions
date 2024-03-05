import { AndroidFilled, AppleFilled } from '@ant-design/icons';
import { Button, Card, Divider } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { ModalErrorReview } from '../../features/Reviews';
import { getSeeReviewsIsLoading } from '../../features/Reviews/model/selectors/getSeeReviewsIsLoading.ts';
import { USER_LOCALSTORAGE_KEY } from '../../shared/const/localstorage.ts';
import Spinner from '../../shared/ui/Spinner/Spinner.tsx';
import { Calendar } from '../../widgets/Icons/Calendar';
import { Heart } from '../../widgets/Icons/Heart';
import { ProfileIcon } from '../../widgets/Icons/ProfileIcon';

import './main-page.css';

const MainPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem(USER_LOCALSTORAGE_KEY) || sessionStorage.getItem(USER_LOCALSTORAGE_KEY);

  const [open, setOpen] = useState(false);
  const isLoadingReview = useSelector(getSeeReviewsIsLoading);

  useEffect(() => {
    sessionStorage.setItem('isAuthenticating', 'false');
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  const handleGetReview = useCallback(
    async () => {
      navigate('/main/feedbacks');
      // try {
      //   await dispatch(seeReviews()).unwrap();
      //
      // } catch (error) {
      //   if (error?.errorCode === 403) {
      //     localStorage.removeItem(USER_LOCALSTORAGE_KEY);
      //     sessionStorage.removeItem(USER_LOCALSTORAGE_KEY);
      //     navigate('/auth');
      //   }
      //   else if (token && error?.errorCode) {
      //     setOpen(true);
      //   }
      // }

      return (() => {
        // dispatch(seeReviews());
      });
    }, [navigate],
  );

  if (isLoading || isLoadingReview) {
    return <Spinner data-test-id="loader"/>;
  }

  return (
    <div className="main-page">
      <Card className="cardBig">
        <p className="text">С CleverFit ты сможешь:<br/>
                    — планировать свои тренировки на календаре, выбирая тип и уровень нагрузки;<br/>
                    — отслеживать свои достижения в разделе статистики, сравнивая свои результаты с
                    нормами и рекордами;<br/>
                    — создавать свой профиль, где ты можешь загружать свои фото, видео и отзывы о
                    тренировках;<br/>
                    — выполнять расписанные тренировки для разных частей тела, следуя подробным
                    инструкциям и советам
                    профессиональных тренеров.
        </p>
      </Card>
      <Card className="cardBig">
        <h4 className="text2">CleverFit — это не просто приложение, а твой личный помощник в
                    мире фитнеса. Не откладывай
                    на завтра — начни
                    тренироваться уже сегодня!</h4>
      </Card>
      <div className="card-box">
        <Card className="card">
          <div className="text">Расписать тренировки</div>
          <Divider/>
          <Button
            type="text"
            className="text bottom"><Heart className="svg"/> Тренировки</Button>
        </Card>
        <Card className="card">
          <div className="text">Назначить календарь</div>
          <Divider/>
          <Button
            type="text"
            className="text bottom"><Calendar className="svg"/>Календарь</Button>
        </Card>
        <Card className="card">
          <div className="text">Заполнить профиль</div>
          <Divider/>
          <Button
            type="text"
            className="text bottom"><ProfileIcon className="svg"/>Профиль</Button>
        </Card>
      </div>
      <div className="card-bottom">
        <Card
          className="card"
          style={{ border: 'none' }}>
          <div className="textBtn">
            <Button
              data-test-id="see-reviews"
              type="text"
              className="btn"
              onClick={handleGetReview}
            >Смотреть отзывы</Button>
          </div>
          <div className="textBtns">
            <Card className="card-bottom-text">
              <div className="text download">Скачать на телефон</div>
              <div className="text pro">Доступно в PRO-тарифе</div>
              <Divider/>
              <div className="btnsAndroApple">
                <Button
                  type="text"
                  className="text bottom"><AndroidFilled
                    className="svg"/>Android OS</Button>
                <Button
                  type="text"
                  className="text bottom"><AppleFilled
                    className="svg"/>Apple iOS</Button>
              </div>
            </Card>
          </div>
        </Card>
      </div>
      <ModalErrorReview
        setOpen={setOpen}
        open={open}/>
    </div>
  );
};

export default MainPage;
