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
    warTitle: "",
    warBody: "",
    error: false,
    success: false,
    loading: false,
    titleInfo: "Savig your note please wait ....",
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

  getRandomData = () => {
    this.setState({  note: { ...this.state.note, title: Math.floor(Math.random() * 10) , body : "body" } });
    this.postNoteToServer();
  };

  postNoteToServer = () => {
    this.displayNotification("info", "Saving your note ");
    const url = "https://todo-1ecae-default-rtdb.firebaseio.com/notes.json";
    axios
      .post(url, this.state.note)
      .then((response) => {
        this.displayNotification("infoSucess", "Note saved successfuly ");
      })
      .catch((error) => {
        this.displayNotification(
          "danger",
          "Error network",
          "Something baddly happend ... "
        );
      });
  };

  displayNotification = (type, title, body) => {
    if (type === "danger") {
      this.setState({
        error: !this.state.error,
        warTitle: title,
        warBody: body,
      });
      setTimeout(() => {
        this.setState({
          error: !this.state.error,
        });
      }, 2500);
    } else if (type === "infoSucess") {
      this.setState({
        loading: !this.state.loading,
        titleInfo: title,
        success: true,
      });
      setTimeout(() => {
        this.setState({
          loading: !this.state.loading,
          success: false,
          saved: true,
        });
      }, 3500);
    } else {
      this.setState({
        loading: !this.state.loading,
        titleInfo: title,
      });
      setTimeout(() => {
        this.setState({
          loading: !this.state.loading,
        });
      }, 2500);
    }
  };

  closeClickedHandler = () => {
    if (this.state.note.body && this.state.note.title) {
      console.log("we have data here  ");

      this.postNoteToServer();
    } else {
      this.displayNotification(
        "danger",
        "No text",
        "Please check your text ...."
      );
    }
  };

  render() {
    return (
      <div>
        {this.state.error ? (
          <Danger
            display={this.state.error}
            WarTitle={this.state.warTitle}
            WarBody={this.state.warBody}
          />
        ) : this.state.loading ? (
          <Info
            success={this.state.success}
            title={this.state.titleInfo}
            WarBody={this.state.warBody}
          />
        ) : null}
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
                <div >
                  <NotificationsNone className="mr-6 text-gray-400 cursor-pointer hover:text-gray-600  " />
                </div>
                <PersonAdd className="mr-6 text-gray-400  hover:text-gray-600  cursor-pointer" />
                <Palette className="mr-6 text-gray-400 hover:text-gray-600  cursor-pointer" />
                <Image className="mr-6 text-gray-400 hover:text-gray-600  cursor-pointer" />
                <SystemUpdateAlt className="mr-6 text-gray-400 hover:text-gray-600  cursor-pointer" />
                <MoreVert className="mr-6 text-gray-400 hover:text-gray-600  cursor-pointer" />
                <Undo className="mr-6 text-gray-400 hover:text-gray-600  cursor-pointer" />
                <Redo className="mr-6 text-gray-400 hover:text-gray-600  cursor-pointer lg:mr-32" />
              </div>
              <div
                className="font-normal text-lg  text-gray-600 px-6 rounded py-1  cursor-pointer float-right hover:bg-gray-100 "
                onClick={this.getRandomData}
              >
                RandomSave
              </div>
              <div
                className="font-normal text-lg  text-gray-600 px-6 rounded py-1  cursor-pointer float-right hover:bg-gray-100 "
                onClick={this.closeClickedHandler}
              >
                Close
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddNote: (note, userId) => dispatch(actions.addNote(note, userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateNotePage);
