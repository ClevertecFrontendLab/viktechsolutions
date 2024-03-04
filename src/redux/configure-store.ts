import { configureStore, ReducersMapObject } from '@reduxjs/toolkit';

import { createReducerManager } from '@redux/reducerManager.ts';
import { StateSchema } from '@redux/StateSchema.ts';

// eslint-disable-next-line import/named
import { userReducer } from '../entities/User';
import { changePasswordReducer } from '../features/AuthByUserName/model/slice/changePasswordSlice.ts';
import { emailCheckReducer } from '../features/AuthByUserName/model/slice/emailCheckSlice.ts';
import { loginReducer } from '../features/AuthByUserName/model/slice/loginSlice.ts';
import { registerReducer } from '../features/AuthByUserName/model/slice/registerSlice.ts';
import { seeReviewsReducer } from '../features/Reviews/model/slice/seeReviewsSlice.ts';

export function createReduxStore(
  initialState?: StateSchema,
  asyncReducers?: ReducersMapObject<StateSchema>,
) {
  const rootReducers: ReducersMapObject<StateSchema> = {
    ...asyncReducers,
    user: userReducer,
    emailCheck: emailCheckReducer,
    registerForm: registerReducer,
    loginForm: loginReducer,
    changePassword: changePasswordReducer,
    seeReviews: seeReviewsReducer,
  };
  const reducerManager = createReducerManager(rootReducers);

  const store = configureStore<StateSchema>({
    reducer: reducerManager.reduce,
    devTools: true,
    preloadedState: initialState,
  });

  store.reducerManager = reducerManager;

  return store;
}

export type ApiDispatch = ReturnType<typeof createReduxStore>['dispatch'];
