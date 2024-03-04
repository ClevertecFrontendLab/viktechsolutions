import { StateSchema } from '@redux/StateSchema.ts';

export const getRegisterStateError = (state: StateSchema) => state.registerForm?.error || '';
