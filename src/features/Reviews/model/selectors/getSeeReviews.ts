import { StateSchema } from '@redux/StateSchema.ts';

export const getSeeReviews = (state: StateSchema) => state.seeReviews?.reviews || [];
