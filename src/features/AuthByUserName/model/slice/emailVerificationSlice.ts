import { createSlice } from '@reduxjs/toolkit';

export const emailVerificationSlice = createSlice({
  name: 'emailVerification',
  initialState: {
    isLoading: false,
    error: null,
  },
  reducers: {
    updateErrorState: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: {
    [confirmEmailCode.pending]: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    [confirmEmailCode.fulfilled]: (state) => {
      state.isLoading = false;
    },
    [confirmEmailCode.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { actions: emailVerificationActions } = emailVerificationSlice;
export const { reducer: emailVerificationReducer } = emailVerificationSlice;
