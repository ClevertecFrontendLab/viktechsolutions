import { StateSchema } from '@redux/StateSchema.ts';

export const getUserAuhData = (state: StateSchema) => state.user.authData;
