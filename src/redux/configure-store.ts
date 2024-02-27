import { StateSchema } from '@redux/StateSchema.ts';
// eslint-disable-next-line import/named
import { configureStore, ReducersMapObject } from '@reduxjs/toolkit';

import { userReducer } from '../entities/User';
import { loginReducer } from '../features/AuthByUserName';
import {
  changePasswordReducer,
} from '../features/AuthByUserName/model/slice/changePasswordSlice.ts';
import { emailCheckReducer } from '../features/AuthByUserName/model/slice/emailCheckSlice.ts';
import { registerReducer } from '../features/AuthByUserName/model/slice/registerSlice.ts';

export function createReduxStore(initialState?: StateSchema) {
  const rootReducers: ReducersMapObject<StateSchema> = {
    user: userReducer,
    loginForm: loginReducer,
    registerForm: registerReducer,
    emailCheck: emailCheckReducer,
    changePassword: changePasswordReducer,
  };

  return configureStore<StateSchema>({
    reducer: rootReducers,
    devTools: true,
    preloadedState: initialState,
  });
}

// export type AppDispatch = typeof store.dispatch;
