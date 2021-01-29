import {
  REGISTER_BEGIN,
  REGISTER_FAILURE,
  REGISTER_SUCCESS,
  SIGN_IN_BEGIN,
  SIGN_IN_FAILURE,
  SIGN_IN_SUCCESS,
  SIGN_OUT,
} from './actionTypes';

export const defaultState = {
  registrationInProgress: false,
  registrationError: null,
  registrationSuccessful: false,
  credentials: null,
  signInError: null,
  signInInProgress: false,
  user: null,
  token: null,
  tokenExpiry: null,
};

export const reducer = (state = defaultState, action) => {
  if (!action?.type) {
    return { ...state };
  }

  switch (action.type) {
    case REGISTER_BEGIN: {
      return {
        ...state,
        registrationInProgress: true,
        registrationError: null,
        registrationSuccessful: false,
      };
    }
    case REGISTER_FAILURE: {
      const { registrationError } = action.payload;

      return {
        ...state,
        registrationInProgress: false,
        registrationError,
        registrationSuccessful: false,
      };
    }
    case REGISTER_SUCCESS: {
      return {
        ...state,
        registrationInProgress: false,
        registrationError: null,
        registrationSuccessful: true,
      };
    }
    case SIGN_IN_BEGIN: {
      return {
        ...state,
        credentials: null,
        signInError: null,
        signInInProgress: true,
        registrationError: null,
        user: null,
        token: null,
        tokenExpiry: null,
      };
    }
    case SIGN_IN_FAILURE: {
      const { credentials, signInError } = action.payload;

      return {
        ...state,
        signInError,
        credentials,
        signInInProgress: false,
        registrationError: null,
        user: null,
        token: null,
        tokenExpiry: null,
      };
    }

    case SIGN_IN_SUCCESS: {
      const { user, token, tokenExpiry } = action.payload;

      return {
        ...state,
        signInError: null,
        signInInProgress: false,
        credentials: null,
        registrationError: null,
        user,
        token,
        tokenExpiry,
      };
    }

    case SIGN_OUT: {
      return {
        ...state,
        user: null,
        token: null,
        tokenExpiry: null,
      };
    }
    default:
      return { ...state };
  }
};
