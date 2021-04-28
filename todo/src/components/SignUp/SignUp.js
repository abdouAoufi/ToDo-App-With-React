import React from "react";
import "./SignUp.css";
import Form from "./Form/Form";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import Loading from "../Loading/Loading";
import { Redirect } from "react-router-dom";

class LoginForm extends React.Component {
  clickDoneHandler = (name , email, password) => {
    console.log(email, password);
    this.props.onAuth(name,email, password, true);
  };

  render() {
    let home = <Redirect to="/" />;
    console.log(this.props.isAuth);
    let content = (
      <div id="signupform">
        <h2 id="headerTitleSignUp">Sign up</h2>
        {this.props.authFail ? (
          <h3 style={{ color: "red", textAlign: "center" }}>
            {this.props.message}
          </h3>
        ) : null}
        <Form
          click={this.props.click}
          clickDoneHandler={this.clickDoneHandler}
        />
      </div>
    );
    if (this.props.loading) {
      content = <Loading />;
    }
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (name , email, password, isSignUp) =>
      dispatch(actions.auth(name ,email, password, isSignUp , )),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
