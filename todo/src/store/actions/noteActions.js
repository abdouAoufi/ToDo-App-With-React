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
    dispatch({ type: actions.ADDING_NOTE_FAIL, error: error });
};
export const getNotes = () => {
  return (dispatch) => {
    dispatch(startGettingNotes());
    axios
      .request("https://todo-1ecae-default-rtdb.firebaseio.com/notes.json")
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


export const addNote = (note) => {
  return dispatch => {
    dispatch(startAddingNote());
    axios
      .post("https://todo-1ecae-default-rtdb.firebaseio.com/notes.json", note)
      .then((response) => {
        dispatch(addingNoteSuccess(note))
      })
      .catch((error) => {
        dispatch(addingNoteFail(error))
      });
  }
}