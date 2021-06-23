import React from "react";
import {Nav, Navbar} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGithub} from "@fortawesome/free-brands-svg-icons";
import {faHeart} from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
    return (
        <Navbar collapseOnSelect expand="lg" bg="c-dark" variant="dark" style={{position: "relative", bottom: 0}}>
            <Nav>
                <Navbar.Text>
                    Made with <FontAwesomeIcon icon={faHeart} style={{color: "red"}}/> by <a
                    href="https://github.com/TheBeaverProject/">The Beaver Project</a> © 2021
                </Navbar.Text>
            </Nav>
            <Navbar.Collapse className="justify-content-end">
                <Nav.Link href="https://github.com/TheBeaverProject/"><FontAwesomeIcon icon={faGithub}/></Nav.Link>
            </Navbar.Collapse>
        </Navbar>
    )
};

export default Footer;
