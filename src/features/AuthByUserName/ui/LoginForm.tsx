import { Layout, Tabs } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import LogoLoginForm from '../../../shared/assets/images/LogoLoginForm.png';
import Spinner from '../../../shared/ui/Spinner/Spinner.tsx';
import { getLoginState } from '../model/selectors/getLoginState.ts';
import { getRegisterState } from '../model/selectors/getRegisterState.ts';
import { loginByEmail } from '../model/services/loginByEmail.ts';
import { registerByEmail } from '../model/services/registerByEmail.ts';
import { loginActions } from '../model/slice/loginSlice.ts';
import { registerActions } from '../model/slice/registerSlice.ts';

import { Login } from './Login/Login.tsx';

import './LoginForm.scss';
import { Register } from './Register/Register.tsx';

interface LoginFormProps {
    tab?: 'login' | 'registration';
}

export interface LoginSchemaForm {
    email?: string;
    password?: string;
    remember?: boolean;
}

const LoginForm = ({ tab }: LoginFormProps) => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('1');
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const dispatch = useDispatch();
  const { error, isLoading } = useSelector(getLoginState);
  const { errorRegister, isLoadingRegister } = useSelector(getRegisterState);
  const navigate = useNavigate();

  useEffect(() => {
    if (tab) {
      setActiveTab(tab === 'registration' ? '2' : '1');
    } else {
      setActiveTab(location.pathname.includes('/auth/registration') ? '2' : '1');
    }
  }, [location, tab]);

  const onFinish = useCallback(async (value: LoginSchemaForm) => {
    dispatch(loginActions.setIsLoading(true));
    dispatch(loginActions.setEmail(value.email ?? ''));
    dispatch(loginActions.setPassword(value.password ?? ''));

    try {
      dispatch(loginActions.setIsLoading(true));
      await dispatch(loginByEmail(value)).unwrap();

      navigate('/main');
      dispatch(loginActions.setIsLoading(false));
    } catch (error) {
      if (error) {
        navigate('/result/error-login', { state: { fromRequest: true }});
        dispatch(loginActions.setIsLoading(false));
      }
    }

    return () => {
      dispatch(loginActions.setEmail(''));
      dispatch(loginActions.setPassword(''));
      dispatch(loginActions.setRememberMe(false));
      dispatch(loginActions.setIsLoading(false));
      dispatch(loginActions.setError(''));
      dispatch(loginByEmail({ email: '', password: '' }));
    };
  }, [dispatch, navigate]);

  const onRegisterFinish = useCallback(async (value: LoginSchemaForm) => {
    dispatch((registerActions.setIsLoading(true)));
    dispatch((registerActions.setEmail(value.email ?? '')));
    dispatch((registerActions.setPassword(value.password ?? '')));

    try {
      await dispatch(registerByEmail(value)).unwrap();

      navigate('/result/success', { state: { fromRequest: true }});
    } catch (error) {
      dispatch(registerActions.setIsLoading(false));
      if (error?.statusCode === 409) {
        navigate('/result/error-user-exist', { state: { fromRequest: true }});
      } else if (error) {
        navigate('/result/error', { state: { fromRequest: true }});
      }
    }

    return () => {
      dispatch(registerActions.setEmail(''));
      dispatch(registerActions.setPassword(''));
      dispatch(registerActions.setIsLoading(false));

      dispatch(registerActions.setError(''));
      dispatch(registerByEmail({ email: '', password: '' }));
    };
  }, [dispatch, navigate]);

  const onFinishFailed = (errorInfo: { errorFields: any[]; }) => {
    const emailError = errorInfo.errorFields.find(field => field.name[0] === 'email');

    if (emailError) {
      setErrorEmail(emailError.errors[0]);
    }

    const passwordError = errorInfo.errorFields.find(field => field.name[0] === 'password');

    if (passwordError) {
      setErrorPassword(passwordError.errors[0]);
    }
  };

  const handleTabChange = (key: string) => {
    setActiveTab(key);
    if (key === '2') {
      navigate('/auth/registration');
    } else {
      navigate('/auth/login');
    }
  };

  const tabItems = [
    {
      label: 'Вход',
      key: '1',
      children: (<Login
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        error={error}
        errorEmail={errorEmail}
        errorPassword={errorPassword}/>
      ),
    },
    {
      label: 'Регистрация',
      key: '2',
      children: (
        <Register
          onFinish={onRegisterFinish}
          onFinishFailed={onFinishFailed}
          error={errorRegister}
          errorEmail={errorEmail}
          errorPassword={errorPassword}
        />
      ),
    },
  ];

  return (
    <div className="login-form">
      <div className="login-form__blur">
        {isLoading ? <Spinner data-test-id="loader"/> :

          <Layout className="login-form__form">
            <div className="logo">
              <img
                src={LogoLoginForm}
                alt="logo"/>
            </div>
            <Tabs
              onChange={handleTabChange}
              activeKey={activeTab}
              defaultActiveKey="1"
              centered
              items={tabItems}
              className="login-form__tabs"
              style={{ width: '100%' }}/>
          </Layout>
        }
      </div>
    </div>
  );
};

LoginForm.displayName = 'LoginForm';

export default LoginForm;
