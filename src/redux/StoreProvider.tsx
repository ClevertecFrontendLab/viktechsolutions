
import { ReducersMapObject } from '@reduxjs/toolkit';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';

import { StateSchema } from '@redux/StateSchema.ts';
import { createReduxStore } from '@redux/configure-store.ts';

interface StoreProviderProps {
    children?: ReactNode;
    initialState?: StateSchema;
    asyncReducers?: ReducersMapObject<StateSchema>;
}

export const StoreProvider = ({ children, initialState, asyncReducers }: StoreProviderProps) => {
  // const navigate = useNavigate();
  const store = createReduxStore(
        initialState as StateSchema,
        asyncReducers as ReducersMapObject<StateSchema>,
  );

  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
};
