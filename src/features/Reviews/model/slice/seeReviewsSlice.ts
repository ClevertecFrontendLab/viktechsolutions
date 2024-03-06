import { createSlice } from '@reduxjs/toolkit';

import { seeReviews } from '../services/seeReviews.ts';
import { ReviewScheme } from '../types/reviewSchema.ts';

const initialState: ReviewScheme = {
  reviews: [],
  isLoading: false,
  error: null,
};

const seeReviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    setSeeReviews: (state, action) => {
      state.reviews = state.reviews.map((review, index) =>
        index === action.payload.index ? action.payload.review : review,
      );

      return state;
    },
    addReview: (state, action) => {
      state.reviews.push(action.payload);
    },
    removeReview: (state, action) => {
      state.reviews = state.reviews.filter((_, index) => index !== action.payload.index);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(seeReviews.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
      .addCase(seeReviews.fulfilled, (state, action) => {
        state.reviews = action.payload;
        state.isLoading = false;
      })
      .addCase(seeReviews.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ? action.payload.message : 'Неизвестная ошибка';
      });

  },
});

export const { actions: seeReviewsActions } = seeReviewsSlice;
export const { reducer: seeReviewsReducer } = seeReviewsSlice;
