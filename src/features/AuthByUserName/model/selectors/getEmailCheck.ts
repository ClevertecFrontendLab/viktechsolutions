import { StateSchema } from '@redux/StateSchema.ts';

export const getEmailCheck = (state: StateSchema) => state.emailCheck.email || '';
