import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";

function Navigation() {
  return (
    <div>
      <Navbar bg="dark" expand="lg" className="shadow-sm">
        <Container>
          {/* Brand/Logo */}
          <Navbar.Brand href="#home" className="fw-bold" style={{ color: "white" }}>
            Library
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {/* Custom Links */}
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/" className="me-3" style={{ color: "white" }}>
                Polls
              </Nav.Link>
              <Nav.Link as={Link} to="/add_poll" className="me-3" style={{ color: "white" }}>
                Add Poll
              </Nav.Link>
              <Nav.Link as={Link} to="/member" className="me-3" style={{ color: "white" }}>
                Members
              </Nav.Link>
              <Nav.Link as={Link} to="/add_member" className="me-3" style={{ color: "white" }}>
                Add Member
              </Nav.Link>
              <Nav.Link as={Link} to="/signup" className="me-3" style={{ color: "white" }}>
                SignUp
              </Nav.Link>
              <Nav.Link as={Link} to="/login" className="me-3" style={{ color: "white" }}>
                Login
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div style={{ paddingTop: "20px" }}></div>
    </div>
  );
}

export default Navigation;
