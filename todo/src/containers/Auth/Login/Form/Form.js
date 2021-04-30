import React from "react";
import { FormInput } from "../../SignUp/Form/FormInput";
import { FormButton } from "../../SignUp/Form/FormButton";
import { Link } from "react-router-dom";
import axios from "axios";

class Form extends React.Component {
  state = {
    name: "",
    email: "",
    password: "",
    isValid: false,
    emailValid: false,
    nameValid: false,
    passwordlValid: false,
  };

  onChangeNameHandler = (event) => {
    this.setState({ name: event.target.value });
    if (event.target.value.length > 2) {
      this.setState({ nameValid: true });
    }
  };

  onChangeEmailHandler = (event) => {
    this.setState({ email: event.target.value });
    if (event.target.value.length > 5) {
      this.setState({ emailValid: true });
    }
  };

  onChangePasswordHandler = (event) => {
    this.setState({ password: event.target.value });
    if (event.target.value.length >= 7) {
      this.setState({ passwordlValid: true });
    }
  };

  clickDoneHandler = () => {
    this.props.clickDoneHandler(
      this.state.name,
      this.state.email,
      this.state.password
    );
  };

  checkProvider = () => {
    const url = "https://identitytoolkit.googleapis.com/v1/accounts:createAuthUri?key=AIzaSyA2KjPUfoHd5xbWs7VT-7vyc89dM1B1vI8";
    const data = {
      identifier : this.state.email ,
      continueUri : "http://localhost:8080/app"
    }
    axios
      .post(url, data)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <div>
        <p style={{margin : "auto"}}>test@test.com</p>
        <p style={{margin : "auto"}}>testtesttest</p>
        <FormInput
          description="Email"
          placeholder="Enter your email"
          type="email"
          value={this.state.email}
          change={(event) => this.onChangeEmailHandler(event)}
        />
        <FormInput
          description="Password"
          placeholder="Enter your password"
          type="password"
          value={this.state.password}
          change={(event) => this.onChangePasswordHandler(event)}
        />

        <FormButton
          click={this.clickDoneHandler}
          title="Log in"
          disabled={!(this.state.emailValid && this.state.passwordlValid)}
        />  

        <FormButton
          click={this.checkProvider}
          title="Check "
          disabled={false}
        />
        {/* </Link> */}
      </div>
    );
  }
}

export default Form;
