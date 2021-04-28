import * as actions from "../actions/actionTypes";

const initialState = {
  isAuth: false,
  idToken: null,
  idUser: null,
  authSuccess: false,
  error: null,
  authFail: false,
  authStart: false,
  eamil: null,
};
const authStart = (state, action) => {
  return {
    ...state,
    authStart: true,
  };
};

const authSuccess = (state, action) => {
  return {
    ...state,
    isAuth: true,
    idToken: action.idToken,
    idUser: action.idUser,
    eamil: action.email,
    error: null,
    authFail: false,
    authStart: false,
  };
};

const authFail = (state, action) => {
  return {
    ...state,
    authFail: true,
    authStart: false,
    error: action.error,
  };
};

const logOut = (state, action) => {
  return initialState;
};
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.AUTH_START:
      return authStart(state, action);
    case actions.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actions.AUTH_FAIL:
      return authFail(state, action);
    case actions.LOG_OUT:
      return logOut(state, action);
    default:
      return state;
  }
};

export default authReducer;
