// eslint-disable-next-line import/named
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { changePassword } from '../services/changePassword.ts';
import { ChangePasswordSchema } from '../types/loginSchema.ts';

const initialState: ChangePasswordSchema = {
  error: '',
  isLoading: false,
  password: '',
  confirmPassword: '',
};

export const changePasswordSlice = createSlice({
  name: 'changePassword',
  initialState: initialState,
  reducers: {
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    setConfirmPassword: (state, action: PayloadAction<string>) => {
      state.confirmPassword = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },

  },
  extraReducers: (builder) => {
    builder
      .addCase(changePassword.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { actions: changePasswordActions } = changePasswordSlice;
export const { reducer: changePasswordReducer } = changePasswordSlice;
