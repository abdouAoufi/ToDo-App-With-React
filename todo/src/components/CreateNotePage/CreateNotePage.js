import React, { Component } from "react";
import styled from "styled-components";
import Button from "../MaterialButton/Materialbutton";
import TextField from "@material-ui/core/TextField";
import pin from "../../assets/push-pin.png";
import CancelButton from "@material-ui/core/Button";
import axios from "axios";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import Loading from "../Loading/Loading";

class CreateNotePage extends Component {
  state = {
    TITLE: "",
    BODY: "",
    DATE: null,
    ID: null,
    note: null,
    display: false,
    saveNote: false,
  };

  getFullTime = () => {
    this.currentDate = new Date();
    let cDay = this.checkLength(this.currentDate.getDate());
    let cMonth = this.checkLength(this.currentDate.getMonth() + 1);
    let cYear = this.currentDate.getFullYear();
    let time =
      this.checkLength(this.currentDate.getHours()) +
      ":" +
      this.checkLength(this.currentDate.getMinutes());
    const fullTime = cDay + "-" + cMonth + "-" + cYear + " " + time;
    return fullTime;
  };

  componentDidMount() {
    if (this.props.targetNote) {
      this.setState({
        TITLE: this.props.targetNote.data.title,
        BODY: this.props.targetNote.data.body,
        display: true,
      });
    } else {
      console.log("that means create ");
    }
  }

  checkLength = (number) => {
    return number < 10 ? "0" + number : number;
  };

  getTitle = (event) => {
    this.setState({ TITLE: event.target.value });
  };
  getBody = (event) => {
    this.setState({ BODY: event.target.value });
  };

  getRandomData = () => {
    axios
      .request("https://jsonplaceholder.typicode.com/comments/")
      .then((response) => {
        const random = Math.floor(Math.random() * 100);
        const listBE = response.data.splice(random, 1);
        listBE.forEach((item) => {
          const singleItem = {
            TITLE: item.name,
            BODY: item.body,
            date: this.getFullTime(),
          };
          this.setState(singleItem);
        });
      })
      .catch((erro) => {
        console.log(erro);
      });
  };

  clickDone = (e) => {
    const date = this.getFullTime();
    e.preventDefault();
    const info = {
      title: this.state.TITLE,
      body: this.state.BODY,
      date: date,
    };
    this.props.onAddNote(info);
    this.setState({ TITLE: "", BODY: "", saveNote: true });
  };

  postNoteToServer = (note) => {
    axios
      .post("https://todo-1ecae-default-rtdb.firebaseio.com/notes.json", note)
      .then((response) => {})
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    this.title = (
      <Title
        value={this.state.TITLE}
        placeholder="Title"
        onChange={this.getTitle}
      />
    );
    let loading = null;
    let content = (
      <InnerContainer>
        <TopParent>
          {this.title}
          <Fixed src={pin} />
        </TopParent>
        <MiddleParent>
          <TextField
            style={{ width: "100%", fontSize: "1rem", border: "none" }}
            id="standard-multiline-static"
            label="Write your note here "
            multiline
            type="text"
            value={this.state.BODY}
            rows={16}
            onChange={this.getBody}
          />
        </MiddleParent>
        <BottomParent
          style={{ display: !this.state.display ? "flex" : "none" }}
        >
          <div>
            <CancelButton
              onClick={this.props.clickCancel}
              style={{ marginRight: "16px" }}
              variant="contained"
            >
              Cancel
            </CancelButton>

            <CancelButton
              onClick={this.getRandomData}
              style={{ marginRight: "16px" }}
              variant="contained"
            >
              Random
            </CancelButton>

            <Button
              click={this.clickDone}
              name="done"
              type="contained"
              color="primary"
            />
          </div>
        </BottomParent>
      </InnerContainer>
    );
    if (this.props.loading && this.state.saveNote) {
      loading = <Loading />;
      content = null ;
    } else if (this.state.saveNote){
      loading = null;
      this.props.history.push("/")
    }

    return (
      <Container
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {loading}
        {content}
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    targetNote: state.note.clickedNote,
    loading: state.note.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddNote: (note) => dispatch(actions.addNote(note)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateNotePage);

const Container = styled.div`
  box-sizing: border-box;
  margin-top: 50px;
  z-index: 300;
  width: auto;
  height: auto;
  padding : 1rem ;
  background-color: white;
  border-radius: 3px;
  z-index: 200;
  display : grid ;
  place-items : center;
`;

const InnerContainer = styled.div`
  margin: 25px;
  height: 90%;
  width : 430px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const TopParent = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Title = styled.input`
  border: none;
  height: 45px;
  width: 80%;
  font-size: 1.1rem;
  font-weight: 500;

  outline: none;
`;
const Fixed = styled.img`
  height: 25px;
  margin: 6px;
  cursor: pointer;
`;

const MiddleParent = styled.div`
  width: 100%;
`;

const BottomParent = styled.div`
  margin-top: 16px;
  width: auto;
  justify-content: flex-end;
`;
