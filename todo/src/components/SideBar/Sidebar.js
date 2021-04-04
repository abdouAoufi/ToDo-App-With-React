import React from "react";
import styled from "styled-components";
import Option from "./Option/Option";
import note from "../../assets/post-it.png";
import reminder from "../../assets/reminder.png";
import tag from "../../assets/tag.png";
import todo from "../../assets/to-do-list.png";
import trash from '../../assets/rubbish-bin.png'

const Sidebar = (props) => {
  const options = [
    { name: "note", icon: note },
    { name: "reminder", icon: reminder },
    { name: "tag", icon: tag },
    { name: "todo", icon: todo },
    { name: "trash", icon: trash },
  ].map((item) => <Option key={item.name} icon={item.icon} name={item.name} />);

  return (
    <Container  style={{transform : props.open ? "translateX(0%)" : "translateX(-100%)"}} >
      {options}
    </Container>
  );
};

export default Sidebar;
const Container = styled.div`
  width: 200px;
  height: 100%;
  background-color :#e2f3f5;
  transition : transform 250ms ease ;
  position: fixed;
  top: 50px;
  bottom: 0;
  left: 0;
  z-index :200;
`;
