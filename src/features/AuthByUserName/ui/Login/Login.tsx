import { EyeInvisibleOutlined, EyeOutlined, GooglePlusOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  DynamicModuleLoader,
} from '../../../../shared/components/DynamicModuleLoader/DynamicModuleLoader.tsx';
import { getLoginStateIsLoading } from '../../model/selectors/getLoginStateIsLoading.ts';
import { emailCheck } from '../../model/services/emailCheck.ts';
import { emailCheckActions, emailCheckReducer } from '../../model/slice/emailCheckSlice.ts';
import { loginActions } from '../../model/slice/loginSlice.ts';
import { LoginSchemaForm } from '../LoginForm.tsx';

interface LoginProps {
    className?: string;
    onFinish: (value: LoginSchemaForm) => void;
    onFinishFailed: (errorInfo: {
        errorFields: any[];
    }) => void;
    error: boolean;
    errorEmail: string;
    errorPassword: string;
}

interface Login {
    email: string;
    error: string;
}

export const Login = (props: LoginProps) => {
  const { onFinish, onFinishFailed, error, errorEmail, errorPassword } = props;
  const [form] = Form.useForm();
  const isLoading = useSelector(getLoginStateIsLoading);
  const [emailValid, setEmailValid] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRememberChange = e => {
    const checked = e.target.checked;

    dispatch(loginActions.setRememberMe(checked)); // Отправляет действие в Redux store, если необходимо
  };

  const onCheckEmail = useCallback(async () => {
    const values = form.getFieldsValue();
    const email = values.email;

    if (!email) {
      setEmailValid(false);
    } else {
      dispatch(loginActions.setEmail(email ?? ''));
      dispatch(emailCheckActions.setEmail(email));

      try {
        await dispatch(emailCheck(email)).unwrap();
        navigate('/auth/confirm-email');
      } catch (error) {
        if (error?.status === 404 && error?.data?.message === 'Email не найден') {
          navigate('/result/error-check-email-no-exist', { state: { fromRequest: true }});
        } else if (error?.status) {
          navigate('/result/error-check-email', { state: { fromRequest: true }});
        }
      }
    }

    return () => {
      dispatch(emailCheck(value));
    };
  }, [dispatch, navigate, form]);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    const emailValue = e.target.value;
    const isValid = new RegExp(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/).test(emailValue); // Проверка на валидность email

    if (emailValue) {
      setEmailValid(isValid);
    }
  };

  return (
    <DynamicModuleLoader
      reducers={emailCheckReducer}
      removeAfterUnmount={true}
      name="emailCheck">
      <Form
        name="login"
        initialValues={{ remember: false }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        form={form}
      >
        <Form.Item
          label="email:"
          name="email"
          rules={[{
            required: true,
            message: 'Пожалуйста, введите e-mail!',
          },
          {
            pattern: new RegExp(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/),
            message: 'Пожалуйста, введите корректный адрес электронной почты!',
          }]}
          validateTrigger="onChange"
          help={errorEmail}
          className="form-email"
        >
          <Input
            data-test-id="login-email"
            className="input-email"
            onChange={handleEmailChange}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{
            required: true,
            message: 'Пожалуйста, введите пароль!',
          }, {
            pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
            message: 'Пароль должен быть не менее 8 символов, содержать хотя бы одну заглавную букву и одну цифру.',
          },
          ]}
          help={errorPassword}
          validateStatus={error ? 'error' : 'success'}
          className="input-password"
        >
          <Input.Password
            data-test-id="login-password"
            placeholder="Пароль"
            disabled={false}
            iconRender={visible => (visible ? <EyeOutlined/> :
              <EyeInvisibleOutlined/>)}
          />
        </Form.Item>
        <Form.Item className="forgot">
          <Form.Item
            name="remember"
            valuePropName="checked"
            noStyle

          >
            <Checkbox
              checked={false}
              // onChange={handleRememberChange}
              data-test-id="login-remember">Запомнить
                            меня</Checkbox>
          </Form.Item>
          <Button
            data-test-id="login-forgot-button"
            type="link"
            className="link-forgot"
            onClick={onCheckEmail}
            disabled={!emailValid}
          >Забыли пароль?</Button>
        </Form.Item>
        <Form.Item className="btn">
          <Button
            data-test-id="login-submit-button"
            type="primary"
            htmlType="submit"
            style={{ backgroundColor: 'var(--geekblue-light-6' }}
            disabled={isLoading}
          >Войти</Button>
        </Form.Item>
        <Form.Item className="ggl">

          <Button
            type="default"
            onClick={() => (
              sessionStorage.setItem('isAuthenticating', 'true'),
              window.location.href = 'https://marathon-api.clevertec.ru/auth/google')}>
            <GooglePlusOutlined/> Войти через Google
          </Button>
        </Form.Item>
      </Form>
    </DynamicModuleLoader>
  );
};
