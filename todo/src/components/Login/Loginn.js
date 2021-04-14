import React from "react";
import "./Login.css";
import { Link } from "react-router-dom";

class LoginForm extends React.Component {
  render() {
    return (
      <div id="holder">
        <div id="loginform">
          <FormHeader title="Login" />
          <Form click={this.props.click} />
          <OtherMethods />
        </div>
      </div>
    );
  }
}

const FormHeader = (props) => <h2 id="headerTitle">{props.title}</h2>;

const Form = (props) => (
  <div>
    <FormInput
      description="Username"
      placeholder="Enter your username"
      type="text"
    />
    <FormInput
      description="Password"
      placeholder="Enter your password"
      type="password"
    />
    <Link to="/">
      <FormButton click={props.click} title="Log in" />
    </Link>
  </div>
);

const FormButton = (props) => (
  <div id="button" class="row">
    <button onClick={props.click}>{props.title}</button>
  </div>
);

const FormInput = (props) => (
  <div class="row">
    <label>{props.description}</label>
    <input type={props.type} placeholder={props.placeholder} />
  </div>
);

const OtherMethods = (props) => (
  <div id="alternativeLogin">
    <label>Or sign in with:</label>
    <div id="iconGroup">
      <Facebook />
      <Twitter />
      <Google />
    </div>
  </div>
);

const Facebook = (props) => <a href="/" id="facebookIcon"></a>;

const Twitter = (props) => <a href="/" id="twitterIcon"></a>;

const Google = (props) => <a href="/" id="googleIcon"></a>;

export default LoginForm;
