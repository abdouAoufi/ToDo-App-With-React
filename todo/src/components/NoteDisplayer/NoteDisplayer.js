import React, { Component } from "react";
import axios from 'axios'
export default class NoteDisplayer extends Component {

  getSingleNote = (id) => {
    axios
    .request("https://jsonplaceholder.typicode.com/comments/")
    .then((response) => {
  }
  render() {
    console.log(this.props.match.params.id);
    return (
      <div style={{ marginTop: 100, textAlign: "center" }}>
        {this.props.match.params.id}
      </div>
    );
  }
}
