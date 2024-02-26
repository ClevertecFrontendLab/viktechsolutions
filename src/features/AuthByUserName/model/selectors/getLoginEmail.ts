import { StateSchema } from '@redux/StateSchema.ts';

export const getLoginEmail = (state: StateSchema) => state.loginForm.email || '';
