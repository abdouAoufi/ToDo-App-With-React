import React, { Component } from "react";
import Danger from "../UI/Notificaitons/NotificationDanger/NotificationDanger";
import Info from "../UI/Notificaitons/NotificationInfo/NotificationInfo";
import axios from "axios";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import Loading from "../UI/Loading/Loading";
import NotificationsNone from "@material-ui/icons/NotificationsNone";
import PersonAdd from "@material-ui/icons/PersonAdd";
import Palette from "@material-ui/icons/Palette";
import Image from "@material-ui/icons/Image";
import SystemUpdateAlt from "@material-ui/icons/SystemUpdateAlt";
import MoreVert from "@material-ui/icons/MoreVert";
import Undo from "@material-ui/icons/Undo";
import Redo from "@material-ui/icons/Redo";
import { Redirect } from "react-router-dom";

class CreateNotePage extends Component {
  state = {
    note: {
      title: null,
      body: null,
    },
    saved: false,
    error: false,
    loading: false,
  };

  onValueChanged = (e, identifier) => {
    if (identifier === "title") {
      let updated = {
        ...this.state.note,
        title: e.target.value,
      };
      this.setState((prevState) => {
        return {
          note: updated,
        };
      });
    } else {
      let updated = {
        ...this.state.note,
        body: e.target.value,
      };
      this.setState((prevState) => {
        return {
          note: updated,
        };
      });
    }
  };

  closeClickedHandler = () => {
    if (this.state.note.title && this.state.note.body) {
      this.postNoteToServer();
    } else {
      this.props.displyaNot(
        actions.TYPE_NOTIFICATIONS.DANGER,
        "Error no text",
        "Please check your text ",
        false
      );
    }
  };

  getRandomData = () => {
    this.setState({
      note: {
        ...this.state.note,
        title: Math.floor(Math.random() * 10),
        body: "body",
      },
    });
    this.postNoteToServer();
  };

  postNoteToServer = () => {
    this.props.displyaNot(
      actions.TYPE_NOTIFICATIONS.INFO,
      "Saving ...  please wait ",
      null,
      false
    );
    const url = "https://todo-1ecae-default-rtdb.firebaseio.com/notes.json";
    axios
      .post(url, this.state.note)
      .then((response) => {
        this.props.displyaNot(
          actions.TYPE_NOTIFICATIONS.INFO,
          "Note saved successfuly ",
          null,
          true
        );
        this.setState({ saved: true });
      })

      .catch((error) => {
        this.props.displyaNot(
          actions.TYPE_NOTIFICATIONS.DANGER,
          "Error notwork",
          "Ohh something went wrong ",
          false
        );
      });
  };
  render() {
    return (
      <div>
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="  m-4 bg-white shadow-md   p-4 rounded-xl"
        >
          <div>
            <input
              onChange={(e) => this.onValueChanged(e, "title")}
              value={this.state.title}
              type="text"
              placeholder="Title"
              className=" outline-none text-gray-600 text-lg pl-2 font-semibold mb-8   w-full"
            />
            <input
              onChange={(e) => this.onValueChanged(e, "body")}
              value={this.state.body}
              type="text"
              placeholder="Take a note"
              className="outline-none text-gray-400 text-lg  pl-2 font-normal mb-12 w-full"
            />
            <div className="block justify-between items-center sm:flex">
              <div className="flex justify-between">
                <div className="mr-4 lg:mr-6">
                  <NotificationsNone className=" text-gray-400 cursor-pointer hover:text-gray-600  " />
                </div>

                <div className="mr-4 lg:mr-6">
                  {" "}
                  <PersonAdd className=" text-gray-400  hover:text-gray-600  cursor-pointer " />
                </div>
                <div className="mr-4 lg:mr-6 ">
                  <Palette className="  text-gray-400 hover:text-gray-600  cursor-pointer" />
                </div>
                <div className="mr-4 lg:mr-6">
                  <Image className="  text-gray-400 hover:text-gray-600  cursor-pointer" />
                </div>
                <div className="mr-4 lg:mr-6">
                  <SystemUpdateAlt className="  text-gray-400 hover:text-gray-600  cursor-pointer" />
                </div>
                <div className="mr-4 lg:mr-6">
                  <MoreVert className="  text-gray-400 hover:text-gray-600  cursor-pointer" />
                </div>
                <div className="mr-4 none lg:mr-6">
                  <Undo className="  text-gray-400 hover:text-gray-600  cursor-pointer" />
                </div>
                <div className="mr-4 none lg:mr-32">
                  <Redo className="  text-gray-400 hover:text-gray-600  cursor-pointer " />
                </div>
              </div>

              <div
                className="font-bold text-lg  text-gray-600 px-6 rounded py-1  cursor-pointer float-right hover:bg-gray-100 "
                onClick={this.closeClickedHandler}
              >
                Save
              </div>
            </div>
          </div>
        </div>
        {this.state.saved ? <Redirect to="/" /> : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    targetNote: state.note.clickedNote,
    loading: state.note.loading,
    userId: state.auth.idUser,
    displayNotification: state.note.displayNotification,
    titleNotification: state.note.titleNotification,
    bodyNotification: state.note.bodyNotification,
    typeNotification: state.note.typeNotification,
    notificationInfoSuccess: state.note.notificationInfoSuccess,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddNote: (note, userId) => dispatch(actions.addNote(note, userId)),
    displyaNot: (type, title, body, success) =>
      dispatch(actions.displayNotification(type, title, body, success)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateNotePage);
