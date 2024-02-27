import type { AnyAction, EnhancedStore, ReducersMapObject } from '@reduxjs/toolkit';
import type { AxiosInstance } from 'axios';
import { Reducer } from 'react';
import type { NavigateOptions, To } from 'react-router-dom';

import { UserSchema } from '../entities/User';
import { LoginSchema } from '../features/AuthByUserName';

export interface StateSchema {
    user: UserSchema;
    loginForm: LoginSchema;
    registerForm?: LoginSchema;
    emailCheck?: LoginSchema;
    changePassword?: LoginSchema;
    // profile?: ProfileSchema;
}

export type StateSchemaKey = keyof StateSchema

export interface ReducerManager {
    getReducerMap: () => ReducersMapObject<StateSchema>;
    reduce: (state: StateSchema, action: AnyAction) => StateSchema;
    add: (key: StateSchemaKey, reducer: Reducer<any, any>) => void;
    remove: (key: StateSchemaKey) => void;
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
    reducerManager: ReducerManager;
}

export interface ThunkExtraArg {
    api: AxiosInstance;
    navigate?: (to: To, options?: NavigateOptions) => void;
}

export interface ThunkConfig<T> {
    rejectValue: T;
    extra: ThunkExtraArg;
}
