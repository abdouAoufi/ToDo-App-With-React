import * as actions from "./actionTypes";
import axios from "axios";

export const setTargetNote = (id) => {
  return (dispatch) => dispatch({ type: actions.SETTARGETNOTE, id: id });
};

export const getNotes = (amount) => {
  return (dispatch) => {
    axios
      .request("https://todo-1ecae-default-rtdb.firebaseio.com/notes.json")
      .then((response) => {
        let data = [];
        for (let key in response.data) {
          data.push({id : key , data : response.data[key]});
        }
        dispatch(setNotes(data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const setNotes = (notes) => {
  return { type: actions.GETNOTES, notes: notes };
};
