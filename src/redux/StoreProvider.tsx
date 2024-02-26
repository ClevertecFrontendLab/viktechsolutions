import { createReduxStore } from '@redux/configure-store.ts';
import { StateSchema } from '@redux/StateSchema.ts';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';

interface StoreProviderProps {
    children?: ReactNode;
    initialState?: StateSchema;
}

export const StoreProvider = ({ children, initialState }: StoreProviderProps) => {
  // const navigate = useNavigate();
  const store = createReduxStore(initialState);

  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
};
