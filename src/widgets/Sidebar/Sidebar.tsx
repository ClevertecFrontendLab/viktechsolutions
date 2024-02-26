import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import useWindowWidth from '@hooks/useWindowWidth.ts';
import { Button, Divider } from 'antd';
import { memo, useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { userActions } from '../../entities/User';
import Exit from '../../shared/assets/icon/Exit.svg';
import Trophy from '../../shared/assets/icon/trophy.svg';
import LogoBig from '../../shared/assets/images/LogoBig.png';
import LogoSmall from '../../shared/assets/images/LogoSmall.png';
import { Calendar } from '../Icons/Calendar';
import { Heart } from '../Icons/Heart';
import { ProfileIcon } from '../Icons/ProfileIcon';
import './Sidebar.scss';

export const Sidebar = memo(() => {
  const [collapsed, setCollapsed] = useState(false);
  const dispatch = useDispatch();
  const width = useWindowWidth();

  const dataTestId = width >= 361 ? 'sider-switch' : 'sider-switch-mobile';
  const onToggle = () => {
    setCollapsed(prev => !prev);
  };

  const logout = useCallback(() => {
    dispatch(userActions.logout());

  }, [dispatch]);

  return (
    <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar__logo">
        {collapsed ? <img
          src={LogoSmall}
          alt="Logo"/> : <img
          src={LogoBig}
          alt="Logo"/>}
      </div>
      <div className={`sidebar__toggle ${collapsed ? 'collapsed' : ''}`}>
        <Button
          type="text"
          data-test-id={dataTestId}
          onClick={onToggle}
          className="collapsedBtn">
          {collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
        </Button>
      </div>
      <div className="sidebar__links">
        <Link
          to="/"
          className="link"><Calendar
            className="link__img"/>{!collapsed ? 'Календарь' : ''}</Link>
        <Link
          to="/"
          className="link"><Heart
            className="link__img"/>{!collapsed ? 'Тренировки' : ''}</Link>
        <Link
          to="/"
          className="link"><img
            src={Trophy}
            alt="Trophy"
            className="link__img"/>{!collapsed ? 'Достижения' : ''}
        </Link>
        <Link
          to="/"
          className="link"><ProfileIcon
            className="link__img"/>{!collapsed ? 'Профиль' : ''}</Link>
      </div>
      <div className="sidebar__exit">
        <Divider/>
        <Button
          type="text"
          onClick={logout}><Link
            to="/"
            className="link exit"><img
              src={Exit}
              alt="Exit"
              className="exit__img"/>{!collapsed ? 'Выход' : ''}
          </Link></Button>
      </div>
    </div>
  );
});

Sidebar.displayName = 'Sidebar';
