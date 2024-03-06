import { StateSchema } from '@redux/StateSchema.ts';

export const getLoginStateIsLoading = (state: StateSchema) => state.loginForm?.isLoading || false;
