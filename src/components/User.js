import PropTypes from "prop-types";
import { useState } from "react";
import { Container, Col, Jumbotron, Row } from "react-bootstrap";
import { TeamMatch, FFAMatch } from "./Match";
import Spinner from "./Spinner.js";
import { FirestoreDocument } from "@react-firebase/firestore";
import { FirebaseAuthConsumer } from "@react-firebase/auth";
import firebase from "firebase";



const User = (props) => {
    User.propTypes = {
        data: PropTypes.object.isRequired,
    };

    const data = props.data;

    let matchEls = [];

    data.matchHistory.forEach(async (matchId) => {
        matchEls.push(
            <FirestoreDocument key={matchId} path={`/matches/${matchId}`} >
                {r => {
                    if (r.isLoading) {
                        return (<Spinner></Spinner>)
                    } else if (r.value !== undefined) {
                        switch (r.value.type) {
                            case "TeamDeathMatch":
                                return <TeamMatch key={r.value.endDate.seconds} focusedUsername={data.username} data={r.value}></TeamMatch>
                            case "FFADeathMatch":
                                return <FFAMatch key={r.value.endDate.seconds} focusedUsername={data.username} data={r.value}></FFAMatch>
                            default:
                                break;
                        }

                    }
                }}
            </FirestoreDocument>
        )
    })

    matchEls.reverse();

    const [userName, setUsername] = useState("");
    async function getUserData(uid) {
        return (await firebase.firestore().collection("/users/").doc(uid).get()).data();
    }

    return (
        <>
            <Jumbotron className="bg-c-dark" fluid>
                <Container>
                    <Row>
                        <Col>
                            <h4>Player</h4>
                            <h1>{data.username}</h1>
                        </Col>
                        <Col>
                            <h6>Elo</h6>
                            <h5>{data.elo}</h5>
                            <FirebaseAuthConsumer>
                                {({ isSignedIn, user, providerId }) => {
                                    if (isSignedIn) {
                                        getUserData(user.uid).then(userData => {
                                            setUsername(userData.username);
                                        })

                                        if (userName === data.username) {
                                            return (
                                                <>
                                                    <h6>Email</h6>
                                                    <h5>{data.email}</h5>
                                                </>
                                            )
                                        }
                                    }
                                }}
                            </FirebaseAuthConsumer>
                        </Col>
                    </Row>
                </Container>
            </Jumbotron>
            <Jumbotron className="bg-c-primary" fluid>
                <Container>
                    <h2>Match History:</h2>
                    {matchEls}
                </Container>
            </Jumbotron>
        </>
    );
}

export default User;