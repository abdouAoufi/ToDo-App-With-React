import * as actions from "../actions/actionTypes";
import updateObject from "./utility";

const initialState = {
  notesList: [],
  test: "test  value ",
  clickedNote: null,
  error: null,
  loading: null,
};

const startAddingNote = (state) => {
  return updateObject(state, { loading: true });
};

const addingNoteSuccess = (state) => {
  return updateObject(state, { loading: false });
};

const addingNoteFail = (state, action) => {
  return updateObject(state, { loading: false, error: action.error });
};

const startGettingNote = (state) => {
  return updateObject(state, { loading: true });
};

const gettingNoteSuccess = (state, action) => {
  return updateObject(state, { notesList: action.notes , loading : false});
};

const gettingNotesFail = (state, action) => {
  return updateObject(state, { loading: false, error: action.error });
};

export const reducer = (state = initialState, action) => {
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

    default:
      return state;
  }
};
