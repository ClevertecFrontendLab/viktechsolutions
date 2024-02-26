import { StateSchema } from '@redux/StateSchema.ts';

export const getLoginEmailMessage = (state: StateSchema) => state.loginForm.message || '';
