import React from "react";
import {Button, ButtonGroup, ButtonToolbar, Nav, Navbar} from "react-bootstrap";
import {Link, useHistory} from "react-router-dom";


const Header = () => {

    const history = useHistory();

    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky={"top"}>
                <Navbar.Brand as={Link} to="/">Beaver</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                    <Nav.Link as={Link} to="/">Home</Nav.Link>
                    <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
                    <Nav.Link as={Link} to="/news">News</Nav.Link>
                    <Nav.Link as={Link} to="/support">Support Us!</Nav.Link>
                </Nav>
                <ButtonToolbar inline>
                    <ButtonGroup className="mr-4">
                        <Button variant="primary" onClick={() => history.push("/register")}>Register</Button>
                    </ButtonGroup>
                    <ButtonGroup>
                        <Button variant="outline-info" onClick={() => history.push("/login")}>Login</Button>
                    </ButtonGroup>
                </ButtonToolbar>
                </Navbar.Collapse>
            </Navbar>
        </>
    )
};

export default Header;
