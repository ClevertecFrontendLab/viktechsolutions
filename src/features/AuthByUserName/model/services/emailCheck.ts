import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { IUser } from '../../../../entities/User';
import { API } from '../../../../shared/const/api.ts';

interface RegisterFormSchema {
    email: string;
    password: string;
    remember: boolean;
    message: string;
}

export const emailCheck = createAsyncThunk<IUser, RegisterFormSchema>(
  'login/emailCheck',
  async (authData,
    thunkAPI) => {
    try {
      const response = await axios.post(
        `${API.BASE}auth/check-email`,
        { email: authData },
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
    } catch (e) {

      return thunkAPI.rejectWithValue(e?.response);
    }
  },
);
