import { createSlice } from '@reduxjs/toolkit';

import { seeReviewsPost } from '../services/seeReviewsPost.ts';
import { ReviewScheme } from '../types/reviewSchema.ts';

const initialState: ReviewScheme = {
  reviews: [],
  isLoading: false,
  error: null,
};

const seeReviewsPostSlice = createSlice({
  name: 'reviews/post',
  initialState,
  reducers: {
    addReview: (state, action) => {
      state.reviews.push(action.payload);
    },
    removeReview: (state, action) => {
      state.reviews = state.reviews.filter((_, index) => index !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(seeReviewsPost.pending, (state) => {
      state.isLoading = true;
    })
      .addCase(seeReviewsPost.fulfilled, (state, action) => {
        state.reviews.push(action.payload);
        state.isLoading = false;
      })
      .addCase(seeReviewsPost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string || 'Ошибка при отправке отзыва';
      });

  },
});

export const { actions: seeReviewsPostActions } = seeReviewsPostSlice;
export const { reducer: seeReviewsPostReducer } = seeReviewsPostSlice;
