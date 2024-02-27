import { FC, lazy } from 'react';

import { TabType } from './LoginForm.tsx';

export const LoginFormAsync = lazy<FC<TabType>>(() => import('./LoginForm'));
