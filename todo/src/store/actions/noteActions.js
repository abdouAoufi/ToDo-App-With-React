import * as actions from "./actionTypes";

export const setTargetNote = (id) => {
  return (dispatch) => dispatch({ type: actions.SETTARGETNOTE  , id : id});
};


export const addNote = (note) => {
  return dispatch => dispatch({type : actions.ADDNOTE , note : note})
}