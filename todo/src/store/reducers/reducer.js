import * as actions from "../actions/actionTypes";

const initialState = {
  notesList: [],
  test: "test  value ",
  clickedNote: null,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.SETTARGETNOTE:
      return {
        ...state,
        clickedNote: action.id,
      };
    case actions.ADDNOTE : 
    return {
       ...state ,
       notesList : [...state.notesList].concat(action.note)
    }
    default:
      return state;
  }
};
