import { StateSchema } from '@redux/StateSchema.ts';

export const getLoginStateError = (state: StateSchema) => state.loginForm?.error || '';
