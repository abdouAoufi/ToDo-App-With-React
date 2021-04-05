import React, { Component } from "react";
import styled from "styled-components";
import Button from "../MaterialButton/Materialbutton";
import TextField from "@material-ui/core/TextField";
import pin from "../../assets/push-pin.png";
import CancelButton from "@material-ui/core/Button";
import axios from "axios";

export default class CreateNotePage extends Component {
  state = {
    TITLE: "",
    BODY: "",
  };

  componentDidMount() {
    // this.getRandomData();
  }

  TitleValue = "";
  BodyValue = "";
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
          };
          this.setState(singleItem);
        });
      })
      .catch((erro) => {
        console.log(erro);
      });
  };
  clickDone = (e) => {
    e.preventDefault();
    const info = { title: this.state.TITLE, body: this.state.BODY };
    this.props.clickDone(info);
    this.setState({ TITLE: "", BODY: "" });
  };
  render() {
    return (
      <Container
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <form>
          <InnerContainer>
            <TopParent>
              <Title
                value={this.state.TITLE}
                placeholder="Title"
                onChange={this.getTitle}
              />
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
                labelWidth={30}
                onChange={this.getBody}
              />
            </MiddleParent>
            <BottomParent>
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
        </form>
      </Container>
    );
  }
}

const Container = styled.div`
  box-sizing: border-box;
  margin-top: 50px;
  z-index: 300;
  width: 450px;
  height: 500px;
  background-color: white;
  border-radius: 3px;
  z-index: 200;
`;

const InnerContainer = styled.div`
  margin: 25px;
  height: 90%;
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
  display: flex;
  justify-content: flex-end;
`;
