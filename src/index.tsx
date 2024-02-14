import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';

import { store } from '@redux/configure-store';
import App from './app/App.tsx';

import 'normalize.css';
import './index.css';
import 'antd/dist/antd.css';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
          <App/>
      </HashRouter>
    </Provider>
  </React.StrictMode>,
);
