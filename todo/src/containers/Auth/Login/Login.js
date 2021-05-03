import React from "react";
import NotificatoinDanger from "../../../components/UI/Notificaitons/NotificationDanger/NotificationDanger";
import NotificatoinInfo from "../../../components/UI/Notificaitons/NotificationInfo/NotificationInfo";
import Form from "./Form/Form";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/index";
import Loading from "../../../components/UI/Loading/Loading";
import { Redirect } from "react-router-dom";

const TYPE_NOTIFICATIONS = {
  DANGER: "DANGER",
  INFO: "INFO",
  SUCCESS: "SUCCESS",
};

class LoginForm extends React.Component {
  state = {
    
    error: false,
    loading: false,
    loadingSuccess: false,
    logged: false,
  };
  clickDoneHandler = (name, email, password) => {
    this.props.displyaNot(
      actions.TYPE_NOTIFICATIONS.INFO,
      "Plese wait",
      null,
      false
    );
    this.props.onAuth(name, email, password, false);
    if (this.props.authFail) {
      this.props.displyaNot(
        actions.TYPE_NOTIFICATIONS.DANGER,
        "Error loggin",
        this.props.message,
        false
      );
    } else if (this.props.isAuth) {
      this.props.displyaNot(
        actions.TYPE_NOTIFICATIONS.DANGER,
        "Loggin succesfully",
         null ,
        true
      );
    }
  };

  
    
  render() {
    let home = null;
    if (this.props.isAuth) {
      home = <Redirect to="/" />;
    }
    let content = (
      <div id="signupform">
        <h2 id="headerTitleSignUp">Login</h2>
        {home}
        <Form
          click={this.props.click}
          clickDoneHandler={this.clickDoneHandler}
        />
      </div>
    );

    return (
      <div id="holder">
        {content}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.isAuth,
    message: state.auth.error,
    authFail: state.auth.authFail,
    loading: state.auth.authStart,
    displayNotification: state.note.displayNotification,
    titleNotification: state.note.titleNotification,
    bodyNotification: state.note.bodyNotification,
    typeNotification: state.note.typeNotification,
    notificationInfoSuccess: state.note.notificationInfoSuccess,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (name, email, password, isSignUp) =>
      dispatch(actions.auth(name, email, password, isSignUp)),
      displyaNot: (type, title, body, success) =>
      dispatch(actions.displayNotification(type, title, body, success)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
