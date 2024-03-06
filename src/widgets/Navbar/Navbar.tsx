import { SettingOutlined } from '@ant-design/icons';
import { Button, PageHeader } from 'antd';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Navbar.scss';

interface NavbarProps {
    className?: string;
}

export const Navbar = ({ className }: NavbarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    const baseRoute = [{
      path: '/main',
      breadcrumbName: 'Главная',
    }];

    if (location.pathname.includes('/main/feedbacks')) {
      const feedbackRoute = {
        path: '/main/feedbacks',
        breadcrumbName: 'Отзывы пользователей',
      };

      setRoutes([...baseRoute, feedbackRoute]);
    } else {

      setRoutes(baseRoute);
    }
  }, [location]);

  const itemRender = (route, params, routes, paths) => {
    const last = routes.indexOf(route) === routes.length - 1;

    return last ? (
      <span>{route.breadcrumbName}</span>
    ) : (
      <a
        onClick={(e) => {
          e.preventDefault();
          navigate(route.path);
        }}>{route.breadcrumbName}</a>
    );
  };

  const textSetting = (
    <Button
      type="text"
      className="navbar__setting-button">
      <span className="navbar__setting-circle"><SettingOutlined/> </span>
      <span className="navbar__setting-text">Настройки</span>
    </Button>
  );

  const title =
        (
          <span>Приветствуем тебя в CleverFit — приложении,<br/>которое поможет тебе добиться своей мечты! </span>);

  return (
    <div className={`navbar  ${className}`}>
      {location.pathname.includes('/main/feedbacks') ? <PageHeader
        breadcrumb={{ routes, itemRender }}
        className="site-page-header"></PageHeader> : <PageHeader
        title={title}
        breadcrumb={{ routes, itemRender }}
        className="site-page-header"
        extra={textSetting}>
      </PageHeader>}
    </div>
  );
};
