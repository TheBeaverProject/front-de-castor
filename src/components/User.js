import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Container, Col, Jumbotron, Row, Form } from "react-bootstrap";
import { TeamMatch, FFAMatch } from "./Match";
import Spinner from "./Spinner.js";
import { FirebaseAuthConsumer } from "@react-firebase/auth";
import { FirestoreMutation } from "@react-firebase/firestore";
import firebase from "firebase";
import { Button, Modal } from 'react-bootstrap';


const User = (props) => {
    User.propTypes = {
        data: PropTypes.object.isRequired,
        id: PropTypes.string.isRequired
    };

    const data = props.data;
    data.iconUrl = data.iconUrl ? data.iconUrl : '/logo192.png';

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

        async function PublishStats(stats) {
            if (data?.stats?.matches === stats.matches) {
                return;
            }

            return await firebase.firestore()
                .collection("users")
                .doc(props.id)
                .set({
                    stats: stats
                }, { merge: true });
        }

        async function getMatchesAndStats() {
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
                    continue;
                }

                const res = doc.data()

                let valid = false;

                switch (res.type) {
                    case "CompetitiveMatch":
                    case "QuickTeamMatch":
                        matches.push(<TeamMatch key={i} focusedUsername={data.username} data={res}></TeamMatch>);
                        valid = true;
                        break;
                    case "DeathMatch":
                        matches.push(<FFAMatch key={i} focusedUsername={data.username} data={res}></FFAMatch>);
                        valid = true;
                        break;
                    default:
                        break;
                }

                if (valid) {
                    tstats.matches++;
                    let p = res.players.find(p => p.name === data.username)

                    if (p) {
                        tstats.kills += p.kills;
                        tstats.deaths += p.deaths;
                        tstats.assists += p.assists;

                        if (p.team && parseInt(p.team) === parseInt(res.winner)) {
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
            }

            setStats(tstats)
            PublishStats(tstats)
            setMatchEls(matches.reverse())
        } getMatchesAndStats();
    }, [data, props.id])

    async function getUserData(uid) {
        return (await firebase.firestore().collection("/users/").doc(uid).get()).data();
    }

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true);
    function updateProfilePicture() {
        console.log('showing pfp modal')
        handleShow()
        console.log(show)
    }

    return (<>
        <FirebaseAuthConsumer>
            {({ isSignedIn, user, providerId }) => {
                let email;
                let editImg;

                if (isSignedIn) {
                    getUserData(user.uid).then(userData => {
                        setUsername(userData.username);
                    })


                    if (userName === data.username) {
                        email = (<>
                            <h6>Email</h6>
                            <h5>{data.email}</h5>
                        </>);

                        editImg = (<>
                            <Button className="bg-c-info"
                                data-augmented-ui="bl-clip"
                                onClick={updateProfilePicture}>
                                Modify
                            </Button>
                        </>)
                    }
                }

                return (<>
                    <Jumbotron className="bg-c-dark" fluid>
                        <Container>
                            <Row>
                                <Col>
                                    <Row>
                                        <Col md="auto">
                                            <img src={data.iconUrl} alt="profile" style={{ maxWidth: '128px' }} />
                                            <div>
                                                {editImg}
                                            </div>
                                        </Col>
                                        <Col>
                                            <h4>Player</h4>
                                            <h1>{data.username}</h1>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col>
                                    <h6>Elo</h6>
                                    <h5>{data.elo}</h5>
                                    <h6>Level</h6>
                                    <h5>{data.level}</h5>
                                    {email}
                                </Col>
                            </Row>
                        </Container>
                    </Jumbotron>
                </>)

            }}
        </FirebaseAuthConsumer>
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
        <Modal data-augmented-ui="tr-clip" show={show} onHide={handleClose}>
            <FirestoreMutation type="update" path={`/users/${props.id}`}>
                {({ runMutation }) => {
                    function handleSubmit() {
                        console.log(data.iconUrl)
                        runMutation({
                            iconUrl: data.iconUrl
                        }).then(res => {
                            console.log("Ran mutation ", res);
                            handleClose()
                        })
                    }
                    return (
                        <>
                            <Modal.Header closeButton className='bg-c-info'>
                                <Modal.Title>Update your profile picture</Modal.Title>
                            </Modal.Header>
                            <Form onSubmit={handleSubmit}>
                                <Modal.Body className='bg-c-info'>
                                    <Form.Control type="input"
                                        placeholder="Profile Picture URL"
                                        autoComplete="photo"
                                        onChange={(e) => {
                                            data.iconUrl = e.target.value
                                        }} />
                                </Modal.Body>
                                <Modal.Footer className='bg-c-info'>
                                    <Button className='bg-c-primary' data-augmented-ui="tr-clip" onClick={handleSubmit}>
                                        Submit
                                    </Button>
                                    <Button className='bg-c-warning' data-augmented-ui="tr-clip" onClick={handleClose}>
                                        Close
                                    </Button>
                                </Modal.Footer>
                            </Form>

                        </>
                    );
                }}
            </FirestoreMutation>
        </Modal>
    </>
    );
}

export default User;