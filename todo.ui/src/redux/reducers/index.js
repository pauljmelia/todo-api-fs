import { authenticationReducer, authenticationState } from '../authentication';

export const reducers = {
  authentication: authenticationReducer,
};

export const defaultState = {
  authentication: authenticationState,
};
