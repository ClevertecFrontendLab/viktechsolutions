import { SettingOutlined } from '@ant-design/icons';
import { Button, PageHeader } from 'antd';
import './Navbar.scss';

interface NavbarProps {
    className?: string;
}

export const Navbar = ({ className }: NavbarProps) => {

  const routes = [
    {
      path: '/',
      breadcrumbName: 'Главная',
    },
  ];

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
      <PageHeader
        title={title}
        breadcrumb={{ routes }}
        className="site-page-header"
        extra={textSetting}>
      </PageHeader>
    </div>
  );
};
