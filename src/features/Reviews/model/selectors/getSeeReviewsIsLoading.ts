import { StateSchema } from '@redux/StateSchema.ts';

export const getSeeReviewsIsLoading = (state: StateSchema) => state.seeReviews?.isLoading || false;
