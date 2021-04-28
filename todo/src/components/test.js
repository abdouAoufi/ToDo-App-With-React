var arr = [];
arr[0] = "Jani";
arr[1] = "Hege";
arr[2] = "Stale";
arr[3] = "Kai Jim";
arr[4] = "Borge";

arr.splice(0, 0, "Lene");

let state = {
  info: {
    name: "abdou",
  },
};


let updateState = {...state.info , name : "aoufi"}

state = updateState
console.log(state)