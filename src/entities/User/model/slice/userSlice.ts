import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { USER_LOCALSTORAGE_KEY } from '../../../../shared/const/localstorage.ts';
import { IUser, UserSchema } from '../types/userSchema.ts';

const initialState: UserSchema = {};

export const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setAuthData: (state, action: PayloadAction<IUser>) => {
      state.authData = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    initAuthData: (state) => {
      state.authData = undefined;

      const user = localStorage.getItem(USER_LOCALSTORAGE_KEY) || sessionStorage.getItem(USER_LOCALSTORAGE_KEY);

      if (user) {
        try {
          const tokenObject = JSON.parse(user);

          if (tokenObject.accessToken) {
            state.authData = { accessToken: tokenObject.accessToken };

          }
        } catch (error) {
          console.log(error);
        }
      }

    },
    logout: (state) => {
      state.authData = undefined;
      localStorage.removeItem(USER_LOCALSTORAGE_KEY);
    },
  },

});

export const { actions: userActions } = userSlice;

export const { reducer: userReducer } = userSlice;
