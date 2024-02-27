import { StoreProvider } from '@redux/index';
import 'antd/dist/antd.css';
import { createBrowserHistory } from 'history';

import 'normalize.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { HistoryRouter } from 'redux-first-history/rr6';

import App from './app/App.tsx';
import './index.css';

const history = createBrowserHistory();

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

root.render(
  <React.StrictMode>
    <StoreProvider>
      <HistoryRouter history={history}>
        <App/>
      </HistoryRouter>
    </StoreProvider>
  </React.StrictMode>,
);
