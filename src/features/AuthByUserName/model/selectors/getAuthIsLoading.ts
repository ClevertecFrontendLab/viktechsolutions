import { StateSchema } from '@redux/StateSchema.ts';

export const getAuthIsLoading = (state: StateSchema) => state.loginForm?.isLoading;
