import { EyeInvisibleOutlined, EyeOutlined, GooglePlusOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { useSelector } from 'react-redux';

import { getLoginStateIsLoading } from '../../model/selectors/getLoginStateIsLoading.ts';
import { LoginSchemaForm } from '../LoginForm.tsx';

interface RegisterProps {
    className?: string;
    onFinish: (value: LoginSchemaForm) => void;
    onFinishFailed: (errorInfo: { errorFields: any[]; }) => void;
    error: boolean;
    errorEmail: string;
    errorPassword: string;

}

export const Register = (props: RegisterProps) => {
  const { onFinish, onFinishFailed, error, errorEmail, errorPassword } = props;
  const isLoading = useSelector(getLoginStateIsLoading);

  return (
    <Form
      name="login"
      initialValues={{ remember: false }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="email:"
        name="email"
        rules={[{
          required: true,
          message: 'Пожалуйста, введите e-mail',
        },
        {
          pattern: new RegExp(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/),
          message: 'Пожалуйста, введите корректный адрес электронной почты',
        }]}
        validateTrigger="onChange"
        help={errorEmail}
      >
        <Input data-test-id="registration-email"/>
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Пароль не менее 8 символов, с заглавной буквой и цифрой',
          },
          {
            pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
            message: 'Пароль не менее 8 символов, с заглавной буквой и цифрой',
          },
        ]}
        help={errorPassword}
        validateStatus={error ? 'error' : undefined}
        className="input-password"
      >
        <Input.Password
          data-test-id="registration-password"
          placeholder="Пароль"
          iconRender={visible => (visible ? <EyeOutlined/> : <EyeInvisibleOutlined/>)}
        />
      </Form.Item>
      <Form.Item
        name="confirm"
        dependencies={['password']}
        hasFeedback
        className="input-password"
        rules={[
          {
            required: true,
            message: 'Пожалуйста, введите пароль',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }

              return Promise.reject(new Error('Пароли не совпадают'));
            },
          }),
        ]}
        style={{ marginBottom: '62px' }}
      >
        <Input.Password
          data-test-id="registration-confirm-password"
          placeholder="Повторите пароль"
          iconRender={visible => (visible ? <EyeOutlined/> : <EyeInvisibleOutlined/>)}
        />
      </Form.Item>
      <Form.Item className="btn">
        <Button
          data-test-id="registration-submit-button"
          type="primary"
          htmlType="submit"
          style={{ backgroundColor: 'var(--geekblue-light-6' }}
          disabled={isLoading}>Войти</Button>
      </Form.Item>
      <Form.Item className="ggl">
        <Button type="default">
          <GooglePlusOutlined/> Регистрация через Google
        </Button>
      </Form.Item>
    </Form>
  );
};
