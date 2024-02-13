import { AndroidFilled, AppleFilled } from '@ant-design/icons';
import { Button, Card, Divider } from 'antd';
import React from 'react';

import './main-page.css';
import { Calendar } from '../../widgets/Icons/Calendar';
import { Heart } from '../../widgets/Icons/Heart';
import { ProfileIcon } from '../../widgets/Icons/ProfileIcon';

export const MainPage: React.FC = () => {

    return (
        <div className="main-page" >
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
                    <Button type="text" className="text bottom"><Heart className="svg"/> Тренировки</Button>
                </Card>
                <Card className="card">
                    <div className="text">Назначить календарь</div>
                    <Divider/>
                    <Button type="text" className="text bottom"><Calendar className="svg"/>Календарь</Button>
                </Card>
                <Card className="card">
                    <div className="text">Заполнить профиль</div>
                    <Divider/>
                    <Button type="text" className="text bottom"><ProfileIcon className="svg"/>Профиль</Button>
                </Card>
            </div>
            <div className="card-bottom">
                <Card className="card" style={{border: 'none'}}>
                    <div className="textBtn">
                        <Button type="text" className="btn">Смотреть отзывы</Button>
                    </div>
                    <div className="textBtns">
                        <Card className="card-bottom-text">
                            <div  className="text download">Скачать на телефон</div>
                            <div className="text pro">Доступно в PRO-тарифе</div>
                            <Divider/>
                            <div className="btnsAndroApple">
                                <Button type="text" className="text bottom"><AndroidFilled
                                    className="svg"/>Android OS</Button>
                                <Button type="text" className="text bottom"><AppleFilled
                                    className="svg"/>Apple iOS</Button>
                            </div>
                        </Card>
                    </div>
                </Card>
            </div>
        </div>
    );
};
