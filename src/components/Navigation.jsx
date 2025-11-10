import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/auth";

const Navigation = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const handleLogout = () => {
    logout();
  };

  // Don't show navigation on login/register pages
  if (location.pathname === "/login" || location.pathname === "/register") {
    return null;
  }

  if (!user) {
    return null; // Don't show navigation when not logged in
  }

  return (
    <Navbar bg="primary" variant="dark" expand="lg" className="navbar">
      <Container fluid>
        {/* Left: Brand */}
        <Navbar.Brand as={Link} to="/dashboard">
          Event Manager
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar" className="w-100">
          <div className="navbar-inner d-flex align-items-center w-100">
            {/* Center: Primary nav */}
            <Nav className="nav-center grow justify-content-center text-center">
              <Nav.Link
                as={Link}
                to="/dashboard"
                active={location.pathname === "/dashboard"}
              >
                Dashboard
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/add-event"
                active={location.pathname === "/add-event"}
              >
                Add Event
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/help"
                active={location.pathname === "/help"}
              >
                Help
              </Nav.Link>
            </Nav>

            {/* Right: User + Logout */}
            <div className="nav-right ms-auto d-flex align-items-center">
              <div className="nav-divider" aria-hidden="true" />
              <Navbar.Text className="me-3 m-0">
                Welcome, {user.name}!
              </Navbar.Text>
              <Button variant="outline-light" size="sm" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
