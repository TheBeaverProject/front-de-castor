import React, {useState} from "react";
import {Button, ButtonGroup, ButtonToolbar, Nav, Navbar} from "react-bootstrap";
import {Link, useHistory} from "react-router-dom";
import firebase from "firebase";
import {FirebaseAuthConsumer} from "@react-firebase/auth";
import {AsyncTypeahead} from "react-bootstrap-typeahead";


const Header = () => {

        const [userName, setUsername] = useState("");
        const [activeIndex, setActiveIndex] = useState(-1);
        const [isLoading, setIsLoading] = useState(false);
        const [options, setOptions] = useState([]);
        const [content, setContent] = useState("");
        const [selected, setSelected] = useState([]);


        const onKeyDown = (e) => {
            // Check whether the 'enter' key was pressed, and also make sure that
            // no menu items are highlighted.
            if (e.keyCode === 13 && activeIndex === -1) {
                if (selected && selected[0]) {
                    history.push("/user/" + selected[0].userName);
                } else {
                    history.push("/user/" + content)
                }

            }
        }

        const handleSearch = async (query) => {
            setIsLoading(true);
            setContent(query)
            var results = [];
            await firebase.firestore().collection("users").orderBy('username')
                .startAt(query)
                .endAt(query + "\uf8ff")
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        const userData = {
                            iconURL: doc.data().iconUrl ? doc.data().iconUrl : '/logo192.png',
                            userName: doc.data().username,
                        };
                        results.push(userData);
                    });
                })
                .catch((error) => {
                    console.log("Error getting documents: ", error);
                });
            if (results === [])
                setSelected([]);
            setOptions(results);
            setIsLoading(false);
        };

        const history = useHistory();

        async function getUserData(uid) {
            return (await firebase.firestore().collection("/users/").doc(uid).get()).data();
        }

        return (
            <>
                <Navbar collapseOnSelect expand="lg" bg="c-dark" variant="dark" sticky={"top"}>
                    <Navbar.Brand as={Link} to="/">
                        <img
                            src={process.env.PUBLIC_URL + '/logo192.png'}
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                            alt="The Beaver Project logo"
                        />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link as={Link} to="/">Home</Nav.Link>
                            <Nav.Link as={Link} to="/downloads">Downloads</Nav.Link>
                            <Nav.Link as={Link} to="/news">News</Nav.Link>
                            <Nav.Link as={Link} to="/about">About</Nav.Link>
                            <Nav.Link as={Link} to="/leaderboard">Leaderboard</Nav.Link>
                        </Nav>
                        <div className="mr-auto w-25">
                            <AsyncTypeahead
                                filterBy={() => true}
                                id="search-bar"
                                isLoading={isLoading}
                                labelKey="userName"
                                minLength={2}
                                onSearch={handleSearch}
                                options={options}
                                onChange={setSelected}
                                onKeyDown={onKeyDown}
                                placeholder="Search User"
                                renderMenuItemChildren={(option, props) => (
                                    <Link to={"/user/" + option.userName}>
                                        <div>
                                            <img
                                                alt={option.userName}
                                                src={option.iconURL}
                                                style={{
                                                    height: '24px',
                                                    marginRight: '10px',
                                                    width: '24px',
                                                }}
                                            />
                                            <span className="txt-c-dark">{option.userName}</span>
                                        </div>
                                    </Link>
                                )}>
                                {(state) => {
                                    // Passing a child render function to the component exposes partial
                                    // internal state, including the index of the highlighted menu item.
                                    setActiveIndex(state.activeIndex);
                                }}
                            </AsyncTypeahead>
                        </div>
                        <FirebaseAuthConsumer>
                            {({isSignedIn, user, providerId}) => {
                                if (!isSignedIn) {
                                    return (<>
                                        <ButtonToolbar>
                                            <ButtonGroup className="mr-4">
                                                <Button className="bg-c-primary" data-augmented-ui="br-clip"
                                                        onClick={() => history.push("/register")}>Register</Button>
                                            </ButtonGroup>
                                            <ButtonGroup>
                                                <Button className="bg-c-info" data-augmented-ui="br-clip"
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
                                                <Nav.Link as={Link} to={`/user/` + userName}>Logged in
                                                    as {userName}</Nav.Link>
                                                <Nav.Link onClick={() => {
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
