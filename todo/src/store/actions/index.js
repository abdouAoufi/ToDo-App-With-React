export {
  setTargetNote,
  getNotes,
  addNote,
  gettingNoteSuccess,
  displayNotification,
} from "./noteActions";
export { auth, logOut, authSuccess } from "./authActions";
export const TYPE_NOTIFICATIONS = {
  DANGER: "DANGER",
  INFO: "INFO",
  SUCCESS: "SUCCESS",
};
