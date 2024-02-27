import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { IUser } from '../../../../entities/User';
import { API } from '../../../../shared/const/api.ts';

interface RegisterFormSchema {
    email: string;
    password: string;
    remember: boolean;
}

export const registerByEmail = createAsyncThunk<IUser, RegisterFormSchema>(
  'login/registerByEmail',
  async (authData,
    thunkAPI) => {
    try {
      const response = await axios.post(
        `${API.BASE}auth/registration`,
        authData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (!response) {
        throw new Error('Нет ответа от сервера');
      }

      return response.data;
    } catch (error) {
      const errorResponse = error.response;

      if (!errorResponse) {
        throw error;
      }

      // Обратите внимание на структуру объекта ошибки, который вы возвращаете
      return thunkAPI.rejectWithValue({
        statusCode: errorResponse.status,
        ...errorResponse.data,
      });
    }
  },
);
