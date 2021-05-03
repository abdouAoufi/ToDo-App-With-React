import * as actions from "./actionTypes";
import axios from "axios";

export const setTargetNote = (id) => {
  return (dispatch) => dispatch({ type: actions.SETTARGETNOTE, id: id });
};

export const startAddingNote = () => {
  return (dispatch) => dispatch({ type: actions.START_ADDING_NOTE });
};

export const addingNoteSuccess = (note) => {
  return (dispatch) => dispatch({ type: actions.ADD_NOTE_SUCCESS, note: note });
};

export const addingNoteFail = (error) => {
  return (dispatch) =>
    dispatch({ type: actions.ADDING_NOTE_FAIL, error: error });
};

export const startGettingNotes = () => {
  return (dispatch) => dispatch({ type: actions.START_GETTING_NOTE });
};

export const gettingNoteSuccess = (notes) => {
  return (dispatch) =>
    dispatch({ type: actions.GETNOTES_SUCCESS, notes: notes });
};

export const gettingNoteFail = (error) => {
  return (dispatch) =>
    dispatch({ type: actions.GETTING_NOTE_FAIL, error: error });
};
export const getNotes = (userId, idToken) => {
  console.log("start getting note");
  return (dispatch) => {
    dispatch(startGettingNotes());
    const url =
      "https://todo-1ecae-default-rtdb.firebaseio.com/users/" +
      userId +
      "/notes/.json";
    const alternative =
      "https://todo-1ecae-default-rtdb.firebaseio.com/notes.json";
    axios
      .get(alternative)
      .then((response) => {
        let notes = [];
        for (let key in response.data) {
          notes.push({ id: key, data: response.data[key] });
        }
        dispatch(gettingNoteSuccess(notes));
      })
      .catch((error) => {
        dispatch(gettingNoteFail(error));
      });
  };
};

export const addNote = (note, userId) => {
  return (dispatch) => {
    dispatch(startAddingNote());
    const url =
      "https://todo-1ecae-default-rtdb.firebaseio.com/users/" +
      userId +
      "/notes/.json";
    axios
      .post(url, note)
      .then((response) => {
        console.log(response.data);
        dispatch(addingNoteSuccess(note));
      })
      .catch((error) => {
        dispatch(addingNoteFail(error));
      });
  };
};

export const displayNotification = (type, title, body , success) => {
  return (dispatch) => {
    dispatch({
      type: actions.DISPLAY_NOTIFICATION,
      typeNotification: type,
      titleNotification: title,
      bodyNotification: body,
      notificationInfoSuccess : success
    });
    setTimeout(() => {
      dispatch(hideNotification());
    }, 2000);
  };
};

export const hideNotification = () => {
  return (dispatch) =>
    dispatch({
      type: actions.HIDE_NOTIFICATION,
    });
};
