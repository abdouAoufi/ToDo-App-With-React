import React from "react";
import styled from "styled-components";
import logo from "../../assets/logo.png";
import menu from "../../assets/menu.png";
import SearchIcon from "@material-ui/icons/Search";
import Headroom from "react-headroom";

const Navbar = ({ clickToggle }) => {
  return (
      <Container>
        <InnerContainer>
          <div>
            <Element href="">
              <Logo src={menu} onClick={clickToggle} />
            </Element>
            <Link href="/">
              <Logo src={logo} />
            </Link>
          </div>
          <SearchContainer>
            <SearchInpuBar
              type="text"
              placeholder="Search for notes to-do's ..."
            />
            <IconHolder>
              <SearchIcon />
            </IconHolder>
          </SearchContainer>
          <LinkHolder>
            <Link href="/">Get started</Link>
            <Link href="/"> features</Link>
            <Link href="/">More</Link>
          </LinkHolder>
        </InnerContainer>
      </Container>
  );
};

export default Navbar;

const Container = styled.nav`
  width: 100%;
  height: 50px;
  position : fixed;
  background-color : white;
  right : 0 ;
  left : 0; 
  top : 0 ;
  display: flex;
  justify-content: center;
  align-items: center;
  place-items: center;
  border-bottom: 1.5px solid #c4c4c4;
  z-index: 500;
`;

const InnerContainer = styled.div`
  width: 95%;
  height: 100%;
  display: flex;
  align-items: center;
  place-items: center;
  justify-content: space-between;
`;

const Logo = styled.img`
  height: 30px;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  width: 400px;
  height: 30px;
  background-color: #e2f3f5;
`;

const SearchInpuBar = styled.input`
  border: none;
  background-color: inherit;
  flex: 0.9;
  padding-left: 8px;
  font-size: 1rem;
  outline: none;
  :selection {
    outline: none;
  }
`;

const IconHolder = styled.div`
  flex: 0.1;
  display: grid;
  place-items: center;
  height: 100%;
  :hover {
    background-color: #eee;
  }
`;

const LinkHolder = styled.div``;

const Link = styled.a`
  text-decoration: none;
  color: black;
  margin-right: 1rem;
  font-weight: 500;
`;

const Element = styled.div`
  display: inline;
  cursor: pointer;
  margin-right: 1rem;
`;