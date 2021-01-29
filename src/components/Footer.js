import React from "react";
import {Nav, Navbar} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faInstagram, faTwitter} from "@fortawesome/free-brands-svg-icons";
import {Link} from "react-router-dom";
import {faHeart} from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" style={{position: "relative", bottom: 0}}>
            <Nav>
                <Navbar.Text>
                    Made with <FontAwesomeIcon icon={faHeart} style={{color: "red"}}/> by <a
                    href="https://github.com/TheBeaverProject/">The Beaver Project</a>
                </Navbar.Text>
            </Nav>
            <Navbar.Collapse className="justify-content-end">
                <Nav.Link href="https://twitter.com"><FontAwesomeIcon icon={faTwitter}/></Nav.Link>
                <Nav.Link href="https://twitter.com"><FontAwesomeIcon icon={faInstagram}/></Nav.Link>
            </Navbar.Collapse>
        </Navbar>
    )
};

export default Footer;
