import { persistReducer } from 'redux-persist';
import localStorage from 'redux-persist/es/storage';
import sessionStorage from 'redux-persist/es/storage/session';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { authenticationReducer, authenticationState } from '../authentication';
import { todosReducer, todosState } from '../todos';

const authPersistConfig = {
  key: 'auth',
  storage: sessionStorage,
  blacklist: ['registrationInProgress', 'fetchingUser', 'credentials', 'signInInProgress'],
  stateReconciler: autoMergeLevel2,
};

const todosPersistConfig = {
  key: 'todos',
  storage: localStorage,
  blacklist: ['adding', 'deleting', 'updating', 'fetching', 'toggling'],
  stateReconciler: autoMergeLevel2,
};

export const reducers = {
  authentication: persistReducer(authPersistConfig, authenticationReducer),
  todos: persistReducer(todosPersistConfig, todosReducer),
};

export const defaultState = {
  authentication: authenticationState,
  todos: todosState,
};
