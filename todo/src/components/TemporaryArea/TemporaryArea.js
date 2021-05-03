import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import * as actions from "../../store/actions/index";
import Loading from "../UI/Loading/Loading";
import styled from "styled-components";
import NotificationDanger from "../UI/Notificaitons/NotificationDanger/NotificationDanger";
import NotificationInfo from "../UI/Notificaitons/NotificationInfo/NotificationInfo";

class TemporaryArea extends Component {
 

  componentDidMount() {
    this.getNotes();
  }

  getNotes = () => {
    this.props.displyaNot(
      actions.TYPE_NOTIFICATIONS.INFO,
      "Loading ...  please wait ",
      null,
      false
    );
    const alternative =
      "https://todo-1ecae-default-rtdb.firebaseio.com/notes.json";
    axios
      .get(alternative)
      .then((response) => {
        let notes = [];
        for (let key in response.data) {
          notes.push({ id: key, data: response.data[key] });
        }
        this.props.displyaNot(
          actions.TYPE_NOTIFICATIONS.INFO,
          "Loaded data seccessfuly ..! ",
          null,
          true
        );
        this.props.getNotes();
      })
      .catch((error) => {});
  };

  render() {
    if (this.props.notes) {
      if (this.props.notes.length > 0 && this.props.notificationInfoSuccess) {
        this.props.history.push("/home");
      }
    }
    let notification = null;
    if (this.props.displayNotification) {
      switch (this.props.typeNotification) {
        case actions.TYPE_NOTIFICATIONS.DANGER:
          notification = (
            <NotificationDanger
              WarTitle={this.props.titleNotification}
              WarBody={this.props.bodyNotification}
            />
          );
          break;
        case actions.TYPE_NOTIFICATIONS.INFO:
          notification = (
            <NotificationInfo
              InfoTitle={this.props.titleNotification}
              success={this.props.notificationInfoSuccess}
            />
          );
          break;
        default:
          notification = null;
      }
    }
    return (
      <Container>
        {/* {notification} */}
        <Loading style={{ margin: "auto" }} />
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.isAuth,
    notes: state.note.notesList,
    displayNotification: state.note.displayNotification,
    titleNotification: state.note.titleNotification,
    bodyNotification: state.note.bodyNotification,
    typeNotification: state.note.typeNotification,
    notificationInfoSuccess : state.note.notificationInfoSuccess
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getNotes: (userId, idToken) => dispatch(actions.getNotes(userId, idToken)),
    displyaNot: (type, title, body , success) =>
      dispatch(actions.displayNotification(type, title, body ,success )),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TemporaryArea);

const Container = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
`;
