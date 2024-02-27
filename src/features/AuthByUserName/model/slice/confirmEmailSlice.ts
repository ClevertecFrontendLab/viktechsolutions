// eslint-disable-next-line import/named
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type  ConfirmEmailState = {
    isLoading: boolean;
    error: string | null;
    success: boolean;
}

const initialState: ConfirmEmailState = {
  isLoading: false,
  error: null,
  success: false,
};

export const confirmEmailSlice = createSlice({
  name: 'confirmEmail',
  initialState,
  reducers: {
    updateErrorState(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

export const { actions: confirmEmailAction } = confirmEmailSlice;

export const { reducer: confirmEmailReducer } = confirmEmailSlice;
