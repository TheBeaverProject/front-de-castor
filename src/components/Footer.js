import React from "react";
import {Nav, Navbar, NavDropdown} from "react-bootstrap";

const Footer = () => {
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" style={{position: "relative", bottom: 0}}>
            <Nav className="mr-auto">
                <Nav.Link href="#features">Features</Nav.Link>
                <Nav.Link href="#pricing">Pricing</Nav.Link>
            </Nav>
            <Nav>
                <Nav.Link href="#deets">More deets</Nav.Link>
                <Nav.Link eventKey={2} href="#memes">
                    Dank memes
                </Nav.Link>
            </Nav>
        </Navbar>
    )
};

export default Footer;
