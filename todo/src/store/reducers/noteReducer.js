import * as actions from "../actions/actionTypes";
import updateObject from "./utility";

const initialState = {
  notesList: null,
  test: "test  value ",
  clickedNote: null,
  error: null,
  loading: null,
  startAdding: false,
  startGetting: false,
  displayNotification: false,
  typeNotification: null,
  titleNotification: "",
  bodyNotification: "",
  notificationInfoSuccess: false,
};

const startAddingNote = (state) => {
  return updateObject(state, { startAdding: true });
};

const addingNoteSuccess = (state) => {
  return updateObject(state, { startAdding: false });
};

const addingNoteFail = (state, action) => {
  return updateObject(state, { startAdding: false, error: action.error });
};

const startGettingNote = (state) => {
  return updateObject(state, { startGetting: true });
};

const gettingNoteSuccess = (state, action) => {
  return updateObject(state, { notesList: action.notes, startGetting: false });
};

const gettingNotesFail = (state, action) => {
  return updateObject(state, { startGetting: false, error: action.error });
};

const displayNotification = (state, action) => {
  return updateObject(state, {
    displayNotification: true,
    titleNotification: action.titleNotification,
    bodyNotification: action.bodyNotification,
    typeNotification: action.typeNotification,
    notificationInfoSuccess: action.notificationInfoSuccess,
  });
};

const hideNotification = (state, action) => {
  return updateObject(state, {
    displayNotification: false,
  });
};
const noteReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.START_GETTING_NOTE:
      return startGettingNote(state);

    case actions.GETNOTES_SUCCESS:
      return gettingNoteSuccess(state, action);

    case actions.GETTING_NOTE_FAIL:
      return gettingNotesFail(state, action);

    case actions.SETTARGETNOTE:
      let clickedNote = null;
      state.notesList.forEach((note) => {
        if (note.id === action.id) {
          clickedNote = note;
        }
      });
      return {
        ...state,
        clickedNote: clickedNote,
      };
    case actions.START_ADDING_NOTE:
      return startAddingNote(state, action);

    case actions.ADD_NOTE_SUCCESS:
      return addingNoteSuccess(state, action);

    case actions.ADDING_NOTE_FAIL:
      return addingNoteFail(state, action);

    case actions.DISPLAY_NOTIFICATION:
      return displayNotification(state, action);

    case actions.HIDE_NOTIFICATION:
      return hideNotification(state, action);

    default:
      return state;
  }
};

export default noteReducer;
