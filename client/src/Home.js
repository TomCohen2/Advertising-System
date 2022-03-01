import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import {
  Container,
  Navbar,
  Nav,
  NavItem,
  NavDropdown,
  MenuItem,
  Image,
} from "react-bootstrap";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";

import logo from "./assets/logo.png";

import "./App.css";
import { useNavigate } from "react-router-dom";

function Home(props) {
  let location = useLocation();
  localStorage.getItem("isAuthenticated");
  const navigate = useNavigate();

  function handleLogout() {
    let auth = localStorage.getItem("isAuthenticated");
    let finalAuth = auth.toString().includes("true");

    localStorage.setItem("isAuthenticated", "false");
    console.log(localStorage.getItem("isAuthenticated"));
    navigate("/sign-in");
  }

  let auth = localStorage.getItem("isAuthenticated");
  let finalAuth = auth.toString().includes("true");
  let logoutBtn = !finalAuth;
  if (
    location.pathname == "/screen=0" ||
    location.pathname == "/allads" ||
    location.pathname == "/create-ad" ||
    location.pathname.includes("/edit-ad") ||
    location.pathname == "/sign-in"
  ) {
    return (
      <>
        <Navbar sticky="top" bg="#FCD4D4" className="nav">
          <Container>
            <Navbar.Brand href="/screen=0">
              <div className="logo__div">
                <h1>FULL-STACK #130</h1>
              </div>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/create-ad">Create new Ad</Nav.Link>
                <Nav.Link href="/allads">All Ads</Nav.Link>

                <NavDropdown title="Screens" id="basic-nav-dropdown">
                  <NavDropdown.Item href="/screen=1">Screen 1</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/screen=2">Screen 2</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/screen=3">Screen 3</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
          {!logoutBtn && (
            <Button
              size="small"
              variant="outlined"
              color="error"
              sx={{
                ":hover": {
                  bgcolor: "red", // theme.palette.primary.main
                  color: "white",
                },
              }}
              style={{
                marginLeft: "auto",
                marginRight: "10px",
                width: "100px",
                height: "fit-content",
              }}
              onClick={handleLogout}
            >
              Logout
            </Button>
          )}
          {!logoutBtn && (
            <Button
              size="small"
              variant="outlined"
              color="primary"
              style={{
                marginRight: "10px",
                wrap: "wrap-content",
                width: "fit-content",
                height: "50px",
              }}
              sx={{
                ":hover": {
                  bgcolor: "primary.main", // theme.palette.primary.main
                  color: "white",
                },
              }}
              onClick={handleLogout}
            >
              Change Password
            </Button>
          )}
        </Navbar>
        <Divider />
      </>
    );
  } else {
    return null;
  }
}

export default Home;
