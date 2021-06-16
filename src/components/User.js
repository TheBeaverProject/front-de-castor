import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Container, Col, Jumbotron, Row } from "react-bootstrap";
import { TeamMatch, FFAMatch } from "./Match";
import Spinner from "./Spinner.js";
import { FirestoreDocument } from "@react-firebase/firestore";
import { FirebaseAuthConsumer } from "@react-firebase/auth";
import firebase from "firebase";
import { relativeTimeRounding } from "moment";



const User = (props) => {
    User.propTypes = {
        data: PropTypes.object.isRequired,
        id: PropTypes.string.isRequired
    };

    const data = props.data;

    const [userName, setUsername] = useState("");

    const [stats, setStats] = useState({
        matches: 0,
        win: 0,
        loss: 0,
        kills: 0,
        deaths: 0,
        assists: 0
    })

    const [matchEls, setMatchEls] = useState([])

    useEffect(() => {
        setMatchEls([<Spinner></Spinner>])

        async function getMatches() {
            let matches = []
            let tstats = {
                matches: 0,
                win: 0,
                loss: 0,
                kills: 0,
                deaths: 0,
                assists: 0
            }

            for (let i = 0; i < data.matchHistory.length; i++) {
                const matchId = data.matchHistory[i];

                const doc = await firebase.firestore().collection("matches").doc(matchId).get();

                if (!doc.exists) {
                    return;
                }

                const res = doc.data()

                switch (res.type) {
                    case "TeamDeathMatch":
                    case "QuickTeamDeathMatch":
                        matches.push(<TeamMatch key={i} focusedUsername={data.username} data={res}></TeamMatch>)
                        break;
                    case "FFADeathMatch":
                        matches.push(<FFAMatch key={i} focusedUsername={data.username} data={res}></FFAMatch>)
                        break;
                    default:
                        break;
                }

                tstats.matches++;
                let p = res.players.find(p => p.name === data.username)

                if (p) {
                    tstats.kills += p.kills;
                    tstats.deaths += p.deaths;
                    tstats.assists += p.assists;

                    if (p.team && p.team === res.winner) {
                        tstats.win++;
                    } else if (p.team) {
                        tstats.loss++;
                    } else if (data.username === res.winner) {
                        tstats.win++;
                    } else {
                        tstats.loss++;
                    }
                }
            }

            setStats(tstats)
            setMatchEls(matches.reverse())
        } getMatches();
    }, [data])

    matchEls.reverse();

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
                            <h6>Level</h6>
                            <h5>{data.level}</h5>
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
            <Jumbotron className="bg-c-info mb-0">
                <Container>
                    <h2>Statistics</h2>
                    <Row>
                        <Col>
                            <h6>Winrate</h6>
                            <h5>{stats.matches === 0 ? 0 : (stats.win / stats.matches) * 100}%</h5>
                        </Col>
                        <Col>
                            <h6>Matches</h6>
                            <h5>{stats.matches}</h5>
                        </Col>
                        <Col>
                            <h6>Win</h6>
                            <h5>{stats.win}</h5>
                        </Col>
                        <Col>
                            <h6>Loss</h6>
                            <h5>{stats.loss}</h5>
                        </Col>
                        <Col>
                            <h6>KDA</h6>
                            <h5>{stats.kills}/{stats.deaths}/{stats.assists}</h5>
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