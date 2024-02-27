// eslint-disable-next-line import/named
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { registerByEmail } from '../services/registerByEmail.ts';
import { RegisterSchema } from '../types/loginSchema.ts';

const initialState: RegisterSchema = {
  error: '',
  isLoading: false,
  password: '',
  email: '',
};

export const registerSlice = createSlice({
  name: 'register',
  initialState: initialState,
  reducers: {
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
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
      .addCase(registerByEmail.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(registerByEmail.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(registerByEmail.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { actions: registerActions } = registerSlice;
export const { reducer: registerReducer } = registerSlice;
