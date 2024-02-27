import { StateSchema } from '@redux/StateSchema.ts';

export const getChangePasswordAndConfirm = (state: StateSchema) => {
 
  return state.changePassword || { password: '', confirmPassword: '' };
};
