import { FC, lazy } from 'react';

import { LoginSchemaForm } from './LoginForm.tsx';

export const LoginFormAsync = lazy<FC<LoginSchemaForm>>(() => import('./LoginForm'));
