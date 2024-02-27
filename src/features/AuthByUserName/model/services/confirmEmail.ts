import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { IUser } from '../../../../entities/User';
import { API } from '../../../../shared/const/api.ts';

interface ConfirmEmailSchema {
    email: string;
    password: string;
    remember: boolean;
    message: string;
}

export const confirmEmail = createAsyncThunk<IUser, ConfirmEmailSchema>(
  'login/confirmEmail',
  async (authData,
    thunkAPI) => {
    try {

      const response = await axios.post(
        `${API.BASE}auth/confirm-email`, authData,
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
