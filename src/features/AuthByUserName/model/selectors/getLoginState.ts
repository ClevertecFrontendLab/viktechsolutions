import { StateSchema } from '@redux/StateSchema.ts';

export const getLoginState = (state: StateSchema) => state.loginForm || {};
