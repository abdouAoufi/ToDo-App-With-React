import React, { Component } from "react";
import axios from "axios";
import Loading from "../Loading/Loading";
import './NoteDisplayer.css'
export default class NoteDisplayer extends Component {
  state = {
    title: "",
    body: "",
    getData : false ,
  };
  getSingleNote = (id) => {
    axios
      .request("https://jsonplaceholder.typicode.com/comments/" + id)
      .then((response) => {
        this.setState({ getData : true ,title: response.data.name, body: response.data.body });
      });
  };

  componentDidMount() {
    this.getSingleNote(this.props.match.params.id);
  }
  render() {
    console.log(this.state);
    return (
      <div className="noteContainer">
        {this.state.getData ? (
          <div className="noteContainer">
            {" "}
            <h1>{this.state.title}</h1>
            <p>{this.state.body}</p>
          </div>
        ) : (
          <Loading />
        )}
      </div>
    );
  }
}
