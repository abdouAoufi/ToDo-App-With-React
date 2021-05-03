import React from "react";
import "./SignUp.css";
import Form from "./Form/Form";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/index";
import Loading from "../../../components/UI/Loading/Loading";
import { Redirect } from "react-router-dom";

class LoginForm extends React.Component {
  clickDoneHandler = (name, email, password) => {
    this.props.displyaNot(
      actions.TYPE_NOTIFICATIONS.INFO,
      "Signing please wait ...",
      null,
      false
    );
    this.props.onAuth(name, email, password, true);

    if (this.props.authFail) {
      this.props.displyaNot(
        actions.TYPE_NOTIFICATIONS.DANGER,
        "Sign up failed",
        this.props.message,
        false
      );
    }
  };

  render() {
    let home = <Redirect to="/" />;
    let content = (
      <div id="signupform">
        <h2 id="headerTitleSignUp">Sign up</h2>
      
        <Form
          click={this.props.click}
          clickDoneHandler={this.clickDoneHandler}
        />
      </div>
    );

    return (
      <div id="holder">
        {this.props.isAuth ? home : null}
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
