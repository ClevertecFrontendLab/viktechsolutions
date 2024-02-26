import { StateSchema } from '@redux/StateSchema.ts';

export const getRegisterState = (state: StateSchema) => state.registerForm || {};
