import * as actions from "./actionTypes";
import axios from "axios";

const authStart = () => {
  return {
    type: actions.AUTH_START,
  };
};

export const authSuccess = (idToken, idUser, email) => {
  return {
    type: actions.AUTH_SUCCESS,
    idToken: idToken,
    idUser: idUser,
    email: email,
  };
};

const authFail = (error) => {
  return {
    type: actions.AUTH_FAIL,
    error: error,
  };
};

export const logOut = () => {
  localStorage.removeItem("idToken");
  localStorage.removeItem("userId");
  localStorage.removeItem("email");
  localStorage.removeItem("expires");
  return {
    type: actions.LOG_OUT,
  };
};

export const checkLocalAuth = () => {};

export const auth = (name, email, password, isSignUp) => {
  return (dispatch) => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA2KjPUfoHd5xbWs7VT-7vyc89dM1B1vI8";
    if (!isSignUp) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA2KjPUfoHd5xbWs7VT-7vyc89dM1B1vI8";
    }
    axios
      .post(url, authData)
      .then((response) => {
        const idToken = response.data.idToken;
        const userId = response.data.localId;
        const expires = response.data.expiresIn;
        const email = response.data.email;
        const dateExpires = new Date(new Date().getTime() + expires * 1000);
        dispatch(authSuccess(idToken, userId, email));
        localStorage.setItem("idToken", idToken);
        localStorage.setItem("userId", userId);
        localStorage.setItem("email", email);
        localStorage.setItem("expires", dateExpires);
        if (isSignUp) {
          createProfileInDB(name, email, password, userId);
        }
        setTimeout(() => {
          dispatch(logOut());
        }, expires * 1000);
      })
      .catch((error) => {
        dispatch(authFail(error.response.data.error.message));
      });
  };
};

const createProfileInDB = (name, email, password, userId) => {
  const url =
    "https://todo-1ecae-default-rtdb.firebaseio.com/users/" + userId + "/info.json";
  const data = {
    name: name,
    email: email,
    password: password,
  };
  axios
    .post(url, data)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error.response.data.error);
    });
};
