// eslint-disable-next-line import/named
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { emailCheck } from '../services/emailCheck.ts';
import { LoginSchema } from '../types/loginSchema.ts';

const initialState: LoginSchema = {
  error: '',
  email: '',
  message: '',
  isLoading: false,
  password: '',
  remember: false,
};

export const emailCheckSlice = createSlice({
  name: 'login/emailCheck',
  initialState: initialState,
  reducers: {
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    setMessage: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(emailCheck.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(emailCheck.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(emailCheck.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { actions: emailCheckActions } = emailCheckSlice;
export const { reducer: emailCheckReducer } = emailCheckSlice;
