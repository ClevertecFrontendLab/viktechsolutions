import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { API } from '../../../../shared/const/api.ts';
import { USER_LOCALSTORAGE_KEY } from '../../../../shared/const/localstorage.ts';
import { seeReviewsActions } from '../slice/seeReviewsSlice.ts';

interface ReviewScheme {
    email: string;
    password: string;
    remember?: boolean;
}

interface ErrorType {
    message: string;
    errorCode: number;
}

export const seeReviewsPost = createAsyncThunk<ReviewScheme, {
    rejectValue: ErrorType
}>(
  'reviews/post',
  async ({ message, rating },
    thunkAPI) => {
    const storedData = localStorage.getItem(USER_LOCALSTORAGE_KEY) || sessionStorage.getItem(USER_LOCALSTORAGE_KEY);
    const token = storedData ? JSON.parse(storedData).accessToken : null;

    if (!token) {
      return thunkAPI.rejectWithValue({
        message: 'Токен не найден',
        errorCode: 404,
      } as ErrorType);
    }

    try {
      const response = await axios.post(
        `${API.BASE}feedback`,
        {
          message,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        },
      );

      if (!response) {
        throw new Error('Нет ответа от сервера');
      } else {
        thunkAPI.dispatch(seeReviewsActions.setSeeReviews(response.data));
      }

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return thunkAPI.rejectWithValue({
          message: error.response.data.message,
          errorCode: error.response.status,
        } as ErrorType);
      } else {
        return thunkAPI.rejectWithValue({
          message: 'Неизвестная ошибка',
          errorCode: 500,
        });
      }
    }
  },
);
