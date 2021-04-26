import * as actions from "../actions/actionTypes";
import axios from "axios";

const initialState = {
  notesList: [],
  test: "test  value ",
  clickedNote: null,
  error: false,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.SETTARGETNOTE:
      let clickedNote = null ;
      state.notesList.forEach(note =>{
        if(note.id === action.id) {
          clickedNote = note ;
        }
      })
      return {
        ...state,
        clickedNote: clickedNote
      };

    case actions.GETNOTES:
      return {
        ...state,
        notesList: action.notes,
        test: "getting notes",
      };

    default:
      return state;
  }
};
