import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { IUser } from '../../../../entities/User';
import { API } from '../../../../shared/const/api.ts';

interface ChangePasswordSchema {
    error: string;
    password: string;
    message: string;
}

export const changePassword = createAsyncThunk<IUser, ChangePasswordSchema>(
  'login/changePassword',
  async (authData,
    thunkAPI) => {
    try {
      const response = await axios.post(
        `${API.BASE}auth/change-password`,
        authData,
        {
          headers: {
            'Content-Type': 'application/json',

          },
          withCredentials: true,

        },
      );

      if (!response) {
        throw new Error('Нет ответа от сервера');
      }

      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e?.response?.data);
    }
  },
);
