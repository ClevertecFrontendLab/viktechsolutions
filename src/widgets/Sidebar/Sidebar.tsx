import "./Sidebar.scss";
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import useWindowWidth from '@hooks/useWindowWidth.ts';
import { Button, Divider } from 'antd';
import { memo, useState } from 'react';

import { Link } from 'react-router-dom';
import LogoBig from "../../shared/assets/images/LogoBig.png";
import LogoSmall from "../../shared/assets/images/LogoSmall.png";
import Trophy from "../../shared/assets/icon/trophy.svg";
import Exit from "../../shared/assets/icon/exit.svg";
import { Calendar } from '../Icons/Calendar';
import { Heart } from '../Icons/Heart';
import { ProfileIcon } from '../Icons/ProfileIcon';

export const Sidebar =  memo(() =>{
  const [collapsed, setCollapsed] = useState(false);
    const width = useWindowWidth();

    const dataTestId = width >= 361 ? 'sider-switch' : 'sider-switch-mobile';
    const onToggle = () => {
        setCollapsed(prev => !prev); // Просто переключаем состояние
    };

  return (
    <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar__logo">
          {collapsed ?  <img src={LogoSmall} alt="Logo"/> :<img src={LogoBig} alt="Logo"/> }
      </div>
      <div className={`sidebar__toggle ${collapsed ? 'collapsed' : ''}` }>
        <Button type="text" data-test-id={dataTestId} onClick={onToggle} className="collapsedBtn">
          {collapsed ?  <MenuUnfoldOutlined/> :<MenuFoldOutlined/>}
        </Button>
      </div>
      <div className="sidebar__links">
        <Link to="/" className="link"><Calendar className="link__img"/>{!collapsed ? "Календарь" : ""}</Link>
        <Link to="/" className="link"><Heart className="link__img"/>{!collapsed ? "Тренировки" : ""}</Link>
        <Link to="/" className="link"><img src={Trophy} alt="Trophy" className="link__img"/>{!collapsed ? "Достижения" : ""}</Link>
        <Link to="/" className="link"><ProfileIcon className="link__img"/>{!collapsed ? "Профиль" : ""}</Link>
      </div>
      <div className="sidebar__exit">
        <Divider/>
        <Link to="/" className="link exit"><img src={Exit} alt="Exit" className="exit__img"/>{!collapsed ? "Выход" : ""}</Link>
      </div>
    </div>
  );
});


