import { StateSchema } from '@redux/StateSchema.ts';

export const getLoginRemember = (state: StateSchema) => state.loginForm.remember || false;
