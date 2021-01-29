import { api } from '../../api';
import { postData } from '../../utils';
import {
  REGISTER_BEGIN,
  REGISTER_FAILURE,
  REGISTER_SUCCESS,
  SIGN_IN_BEGIN,
  SIGN_IN_FAILURE,
  SIGN_IN_SUCCESS,
  SIGN_OUT,
} from './actionTypes';

const registerBegin = () => ({
  type: REGISTER_BEGIN,
});

const registerFailure = (registrationError) => ({
  type: REGISTER_FAILURE,
  payload: {
    registrationError,
  },
});

const registerSuccess = () => ({
  type: REGISTER_SUCCESS,
});

const signInBegin = () => ({
  type: SIGN_IN_BEGIN,
});

const signInFailure = (credentials, signInError) => ({
  type: SIGN_IN_FAILURE,
  payload: {
    credentials,
    signInError,
  },
});

const signInSuccess = (user, token, tokenExpiry) => ({
  type: SIGN_IN_SUCCESS,
  payload: {
    user,
    token,
    tokenExpiry,
  },
});

const signOut = () => ({
  type: SIGN_OUT,
});

const register = (email, password) => async (dispatch, getState) => {
  const {
    authentication: { registrationInProgress },
  } = getState();

  if (!(email && password)) {
    throw Error('Invalid credentials');
  }

  if (registrationInProgress) {
    throw Error('A registration is already in progress');
  }

  dispatch(registerBegin());

  try {
    const url = api.auth.register;
    const response = await postData(url, { email, password });
    dispatch(registerSuccess());

    return response;
  } catch (ex) {
    const message = ex.message || ex;
    dispatch(registerFailure(message));
    throw ex;
  }
};

const signIn = (email, password) => async (dispatch, getState) => {
  const {
    authentication: { signInInProgress },
  } = getState();

  if (!(email && password)) {
    throw Error('Invalid credentials');
  }

  if (signInInProgress) {
    throw Error('A sign-in is already in progrees');
  }

  dispatch(signInBegin());

  try {
    const url = api.auth.signIn;
    const response = await postData(url, { email, password });
    const { expires, token } = response;
    const user = { username: email, email };
    dispatch(signInSuccess(user, token, expires));

    return user;
  } catch (ex) {
    const message = ex.message || ex;
    dispatch(signInFailure({ email, password }, message));
    throw ex;
  }
};

export const actionCreators = { register, signIn, signOut };
