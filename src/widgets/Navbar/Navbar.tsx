import { SettingOutlined } from '@ant-design/icons';
import { Button, PageHeader } from 'antd';

import { AppRoutes, RoutePath } from '../../shared/config/routesConfig/routesConfig.tsx';
import "./Navbar.scss";
interface NavbarProps{
    className?: string;
}
export const Navbar = ({className}: NavbarProps) => {

  const routes = [
    {
      path: RoutePath[AppRoutes.MAIN],
      breadcrumbName: "Главная"
    },
  ];

  const textSetting = (
    <div className="navbar__setting">
      <Button type="text" className="navbar__setting-text"> <SettingOutlined/>Настройки</Button>
    </div>
  );

  const title =
    (
      <span>Приветствуем тебя в CleverFit — приложении,<br/>которое поможет тебе добиться своей мечты! </span>);

  return (
    <div className={className}>
        <div className="navbar">
            <PageHeader
                title={title}
                breadcrumb={{routes}}
                className="site-page-header"
                extra={textSetting}>
            </PageHeader>
        </div>
    </div>
  );
};
