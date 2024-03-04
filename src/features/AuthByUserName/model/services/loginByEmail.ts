import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { IUser, userActions } from '../../../../entities/User';
import { API } from '../../../../shared/const/api.ts';
import { USER_LOCALSTORAGE_KEY } from '../../../../shared/const/localstorage.ts';

interface LoginFormSchema {
    email: string;
    password: string;
    remember?: boolean;
}

interface ErrorType {
    message: string;
    errorCode: number;
}

export const loginByEmail = createAsyncThunk<IUser, LoginFormSchema, { rejectValue: ErrorType }>(
  'login/loginByEmail',
  async (authData,
    thunkAPI) => {
    const { email, password } = authData;

    try {
      const response = await axios.post(
        `${API.BASE}auth/login`,
        { email, password },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (!response) {
        throw new Error('Нет ответа от сервера');
      }

      if (authData.remember) {
        localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(response.data));
        thunkAPI.dispatch(userActions.setAuthData(response.data));
      } else {
        sessionStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(response.data));
        thunkAPI.dispatch(userActions.setAuthData(response.data));
      }

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {

        const errorInfo = {
          message: error.response.data.message || 'Произошла ошибка',
          errorCode: error.response.status,
        };

        return thunkAPI.rejectWithValue(errorInfo);
      } else {
        return thunkAPI.rejectWithValue({
          message: 'Неизвестная ошибка',
          errorCode: 500,
        });
      }
    }
  },
);
