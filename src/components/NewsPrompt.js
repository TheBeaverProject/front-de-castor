import PropTypes from "prop-types";
import React, {useEffect, useState} from "react";
import {Button, Card, Col, Modal, Row} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart} from "@fortawesome/free-regular-svg-icons";
import {faHeart as filledHeart} from "@fortawesome/free-solid-svg-icons";
import firebase from 'firebase/app';
import {useHistory} from "react-router-dom";

const NewsPrompt = (props) => {

    const db = firebase.firestore();

    const [isUserLoggedIn, setUserLoggedIn] = useState(false);

    const history = useHistory();

    async function checkForLiked() {
        if (!firebase.auth().currentUser)
            return false;
        const data = await db.collection("/users/").doc(firebase.auth().currentUser.uid)
            .get();
        return data.data().likedNews.includes(props.documentId);
    }

    useEffect(() => {
        firebase.auth().onAuthStateChanged(function (user) {
            setUserLoggedIn(user !== null);
        })
        checkForLiked().then(r => {
            setLiked(r);
        })
    })

    const [isLiked, setLiked] = useState(false);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true);

    NewsPrompt.propTypes = {
        documentId: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired,
        publishDate: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        likes: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        imageURL: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
    };

    function handleLike() {
        if (isUserLoggedIn) {
            const newsDocument = db.collection("news").doc(props.documentId);
            const userProfile = db.collection("users").doc(firebase.auth().currentUser.uid);
            if (isLiked) {
                userProfile.update({likedNews: firebase.firestore.FieldValue.arrayRemove(...[props.documentId])}).then(r => console.log(r));
            } else {
                userProfile.update({likedNews: firebase.firestore.FieldValue.arrayUnion(...[props.documentId])}).then(r => console.log(r));
            }
            const increment = firebase.firestore.FieldValue.increment(isLiked ? -1 : 1);
            newsDocument.update({likes: increment}).then(r => setLiked(!isLiked));
        } else {
            handleShow();
        }
    }

    function getDate() {
        const date = new Date(props.publishDate * 1000);
        const month = date.toLocaleString('en', {month: 'long'});
        return date.getDate() + " " + month + " " + date.getFullYear();
    }

    return (
        <>
            <Card className="mt-5">
                <Row className="no-gutters">
                    <Col className="col-sm-auto">
                        <Card.Img src={props.imageURL}
                                  style={{borderTopLeftRadius: '10px', height: '20rem', width: 'auto'}}/>
                    </Col>
                    <Col>
                        <div className="card-body-overflow">
                            <div>
                                <Card.Title as="h2" style={{paddingBottom: "10px"}}>
                                    {props.title}
                                </Card.Title>
                                <Card.Subtitle className="text-muted" style={{
                                    display: 'flex',
                                    paddingBottom: "10px",
                                    justifyContent: "space-between"
                                }}>
                                    <div>
                                        {props.author}
                                    </div>
                                    <div>
                                        {getDate()}
                                    </div>
                                </Card.Subtitle>
                            </div>
                            <p style={{overflow: "hidden"}}>
                                {props.content}
                            </p>
                            <Button variant="outline-info" style={{width: "200px"}}
                                    onClick={() => history.push("/news/" + props.url)}>
                                Read more...
                            </Button>
                        </div>
                    </Col>
                </Row>
                <Card.Footer>
                    <div style={{fontSize: "14pt"}}>
                        <button style={{color: "transparent", backgroundColor: "transparent", border: "none"}}
                                onClick={handleLike}>
                            <FontAwesomeIcon icon={isLiked ? filledHeart : faHeart}
                                             style={{color: isLiked ? "red" : "black"}}/>
                        </button>
                        {props.likes}
                    </div>
                </Card.Footer>
            </Card>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>You are not connected!</Modal.Title>
                </Modal.Header>
                <Modal.Body>If you want to like a news article, jump to the login page with the button
                    below!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => history.push("/login")}>
                        Login
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default NewsPrompt;