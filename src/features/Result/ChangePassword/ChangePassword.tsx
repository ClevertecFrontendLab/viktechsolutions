import { Button, Form, Input } from 'antd';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  getChangePasswordAndConfirm,
} from '../../AuthByUserName/model/selectors/getChangePasswordAndConfirm.ts';
import { changePassword } from '../../AuthByUserName/model/services/changePassword.ts';
import { changePasswordActions } from '../../AuthByUserName/model/slice/changePasswordSlice.ts';

import './ChangePassword.scss';

export const ChangePassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { password, confirmPassword } = useSelector(getChangePasswordAndConfirm);

  useEffect(() => {

    if (password && confirmPassword) {
      const submitForm = async () => {
        try {
          await dispatch(changePassword({
            password: password,
            confirmPassword: confirmPassword,
          })).unwrap();

          navigate('/result/success-change-password', { state: { fromRequest: true }});
        } catch (error) {
          navigate('/result/error-change-password', { state: { fromRequest: true }});
        }
      };

      submitForm();
    }
  }, [dispatch, navigate, password, confirmPassword]);

  const onFinish = useCallback(async (values) => {
    dispatch(changePasswordActions.setPassword(values.newPassword));
    dispatch(changePasswordActions.setConfirmPassword(values.confirmPassword));
    if (values) {
      try {
        await dispatch(changePassword({
          password: values.newPassword,
          confirmPassword: values.confirmPassword,
        })).unwrap();

        navigate('/result/success-change-password', { state: { fromRequest: true }});
      } catch (error) {
        navigate('/result/error-change-password', { state: { fromRequest: true }});
      }
    }

  }, [dispatch, navigate]);

  return (
    <div className="change-password__box">
      <div className="change-password__form">
        <Form
          name="changePassword"
          onFinish={onFinish}
          className="change-password-form"
        >
          <h3 className="change-password__title">Восстановление аккаунта</h3>
          <Form.Item
            name="newPassword"
            rules={[
              { required: true, message: 'Введите новый пароль!' },
              {
                min: 8,
                message: 'Пароль не менее 8 символов, с заглавной буквой и цифрой',
              },
              {
                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                message: 'Пароль не менее 8 символов, с заглавной буквой и цифрой',
              },
            ]}
            hasFeedback
          >
            <Input.Password
              data-test-id="change-password"
              placeholder="Новый пароль"/>
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            dependencies={['newPassword']}
            hasFeedback
            rules={[
              { required: true, message: 'Подтвердите ваш новый пароль!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve();
                  }

                  return Promise.reject(new Error('Пароли не совпадают!'));
                },
              }),
            ]}
          >
            <Input.Password
              data-test-id="change-confirm-password"
              placeholder="Повторите пароль"/>
          </Form.Item>
          <Form.Item>
            <Button
              data-test-id="change-submit-button"
              type="primary"
              htmlType="submit"
              className="change-password-form__button">
                            Сохранить
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
