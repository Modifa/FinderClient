import { Button, Nav, NavItem } from "reactstrap";
import { Link, useLocation } from "react-router-dom";
import probg from "../../assets/images/bg/download.jpg";
import React from "react";
import styled from "styled-components";

let Navigation = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: "bi bi-speedometer2",
  },

  {
    title: "Saved Jobs",
    href: "/jobs",
    icon: "bi bi-briefcase",
  },
  {
    title: "Profile",
    href: "/profile",
    icon: "bi bi-person",
  },
  {
    title: "Resume",
    href: "/resume",
    icon: "bi bi-book",
  },
];
const Sidebar = () => {
  const User = localStorage.getItem("developerProfile");
  const UserObject = JSON.parse(User);
  console.log("Side Bar User Profile", JSON.parse(User));

  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };
  let location = useLocation();

  return (
    <SidebarContainer>
      <div className=" align-items-center"></div>
      <div
        className="profilebg"
        style={{ background: `url(${probg}) no-repeat` }}
      >
        <div className="p-3 d-flex">
          <img
            src={UserObject.Image}
            alt="user"
            width="50"
            height="50"
            className="rounded-circle"
          />
          <Button
            color="white"
            className="ms-auto text-white d-lg-none"
            onClick={() => showMobilemenu()}
          >
            <i className="bi bi-x"></i>
          </Button>
        </div>
        <div className="bg-dark text-white p-2 opacity-75">
          {UserObject.FirstName + " " + UserObject.LastName}
        </div>
      </div>
      <div className="p-3 mt-2">
        <Nav vertical className="sidebarNav">
          {Navigation.map((navi, index) => (
            <NavItem key={index} className="sidenav-bg">
              <Link
                to={navi.href}
                className={
                  location.pathname === navi.href
                    ? "active nav-link py-3"
                    : "nav-link text-secondary py-3"
                }
              >
                <i className={navi.icon}></i>
                <span className="ms-3 d-inline-block">{navi.title}</span>
              </Link>
            </NavItem>
          ))}
          <Button
            color="danger"
            tag="a"
            target="_blank"
            className="mt-3"
            href="https://wrappixel.com/templates/materialpro-react-admin/?ref=33"
          >
            Download Resume
          </Button>
        </Nav>
      </div>
    </SidebarContainer>
  );
};

export default Sidebar;

const SidebarContainer = styled.div`
  flex: -0.3;
  border-top: 1px solid;
  max-width: 225px;
  background-color: white;
`;
