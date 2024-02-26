// eslint-disable-next-line import/named
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { loginByEmail } from '../services/loginByEmail.ts';
import { LoginSchema } from '../types/loginSchema.ts';

const initialState: LoginSchema = {
  error: '',
  isLoading: false,
  password: '',
  email: '',
  remember: false,
  message: '',
};

export const loginSlice = createSlice({
  name: 'login',
  initialState: initialState,
  reducers: {
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    setRememberMe: (state, action: PayloadAction<boolean>) => {
      state.remember = action.payload;
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
      .addCase(loginByEmail.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(loginByEmail.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(loginByEmail.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { actions: loginActions } = loginSlice;
export const { reducer: loginReducer } = loginSlice;
