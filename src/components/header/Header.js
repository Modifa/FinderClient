import React from "react";
import {
  Navbar,
  Collapse,
  Nav,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Dropdown,
} from "reactstrap";
import styled from "styled-components";

function Header() {
  const Signout = () => {
    // Cookies.remove('developerProfile')
    localStorage.removeItem("developerProfile");
  };
  const User = localStorage.getItem("developerProfile");
  const UserObject = JSON.parse(User);
  const [isOpen, setIsOpen] = React.useState(false);

  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  return (
    <HeaderContainer>
      <Navbar color="primary" dark expand="md">
        <Collapse navbar isOpen={isOpen}>
          <Nav className="me-auto" navbar>  
</Nav>
          <Dropdown isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle color="transparent">
              <img
                src={UserObject.Image}
                alt="profile"
                className="rounded-circle"
                width="50"
                height="50"
              ></img>
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem
                          href="/profile"

              >My Profile</DropdownItem>
              <DropdownItem divider />
              <DropdownItem onClick={Signout}>Logout</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </Collapse>
      </Navbar>
    </HeaderContainer>
  );
}

export default Header;

const HeaderContainer = styled.div`
  /* flex:1;
    opacity: 1;
    border-radius: 1px;
    text-align: center; */
  /* display: 0 50px; */
  /* border: 1px gray solid; */
  /* flex:1;
    opacity: 1 */
  /* display: 0 50px;
    
    justify-content: space-between;
    align-items: center;
     height: 20vh;
  */
  -ms-flex: 1;
  flex: 1;
  display: 0 50px;
`;
