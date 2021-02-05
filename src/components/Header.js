import React, {useState} from "react";
import {Button, ButtonGroup, ButtonToolbar, Nav, Navbar} from "react-bootstrap";
import {Link, useHistory} from "react-router-dom";
import firebase from "firebase";
import {FirebaseAuthConsumer} from "@react-firebase/auth";


const Header = () => {

        const [userName, setUsername] = useState("");

        const history = useHistory();

        async function getUserData(uid) {
            return (await firebase.firestore().collection("/users/").doc(uid).get()).data();
        }

        return (
            <>
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky={"top"}>
                    <Navbar.Brand as={Link} to="/">Beaver</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link as={Link} to="/">Home</Nav.Link>
                            <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
                            <Nav.Link as={Link} to="/news">News</Nav.Link>
                            <Nav.Link as={Link} to="/support">Support Us!</Nav.Link>
                        </Nav>
                        <FirebaseAuthConsumer>
                            {({isSignedIn, user, providerId}) => {
                                if (!isSignedIn) {
                                    return (<>
                                        <ButtonToolbar>
                                            <ButtonGroup className="mr-4">
                                                <Button variant="primary"
                                                        onClick={() => history.push("/register")}>Register</Button>
                                            </ButtonGroup>
                                            <ButtonGroup>
                                                <Button variant="outline-info"
                                                        onClick={() => history.push("/login")}>Login</Button>
                                            </ButtonGroup>
                                        </ButtonToolbar>
                                    </>)
                                } else {
                                    getUserData(user.uid).then(userData => {
                                        setUsername(userData.username);
                                    })
                                    return (
                                        <>
                                            <Nav className="mr-4">
                                                <Nav.Link as={Link} to="/user/SDA">Logged in
                                                    as {userName}</Nav.Link>
                                                <Nav.Link as={Link} onClick={() => {
                                                    firebase.auth().signOut().then(r => history.push("/"))
                                                }}>
                                                    Logout
                                                </Nav.Link>
                                            </Nav>
                                        </>)
                                }
                            }
                            }
                        </FirebaseAuthConsumer>
                    </Navbar.Collapse>
                </Navbar>
            </>
        )
    }
;

export default Header;
