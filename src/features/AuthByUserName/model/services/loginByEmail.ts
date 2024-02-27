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

export const loginByEmail = createAsyncThunk<IUser, LoginFormSchema>(
  'login/loginByEmail',
  async (authData,
    thunkAPI) => {
    const { email, password, remember } = authData;

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
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e);
    }
  },
);
