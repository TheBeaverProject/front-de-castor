import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Container, Spinner, Col, Row, Jumbotron } from "react-bootstrap";
import firebase from "firebase";
import { Alert } from "bootstrap";
import { Link } from "react-router-dom";

const Leaderboard = () => {

    const [userList, setUserList] = useState([]);

    useEffect(() => {
        setUserList([<Spinner key="1"></Spinner>])

        async function GetUserList() {
            let userL = []

            let res = await firebase.firestore().collection("users")
                .orderBy("elo", "desc")
                .limit(20)
                .get();

            if (res.empty) {
                setUserList([<Alert key="1" variant={'danger'}>
                    Error While retrieving data from the server.
                </Alert>])
                return;
            }

            for (let i = 0; i < res.docs.length; i++) {
                const user = res.docs[i].data();
                user.id = res.docs[i].id;

                userL.push(<LeaderboardCard key={i} rank={i + 1} user={user}></LeaderboardCard>)
            }

            setUserList(userL)
        } GetUserList();
    }, [])

    return (<>
        <Jumbotron className="bg-c-info" fluid>
            <Container>
                <h1>Leaderboard</h1>
                <h4>Top 20</h4>
            </Container>
        </Jumbotron>
        <Jumbotron className="bg-c-dark" fluid>
            <Container className="bg-c-primary">
                <div className="leaderboard-container">
                    <Row className="leaderboard-row">
                        <Col xs={1} className="leaderboard-col leaderboard-header">
                            Rank
                        </Col>
                        <Col className="leaderboard-col leaderboard-header">
                            Player
                        </Col>
                        <Col className="leaderboard-col leaderboard-header">
                            Elo
                        </Col>
                        <Col className="leaderboard-col leaderboard-header">
                            Win Rate
                        </Col>
                    </Row>
                    {userList}
                </div>
            </Container>
        </Jumbotron>
    </>)
}

const LeaderboardCard = (props) => {
    LeaderboardCard.propTypes = {
        rank: PropTypes.number.isRequired,
        user: PropTypes.object.isRequired,
    };

    const user = props.user;

    const [stats, setStats] = useState({
        matches: 0,
        win: 0,
        loss: 0,
        kills: 0,
        deaths: 0,
        assists: 0
    })

    useEffect(() => {
        const getAndPublishStats = async (userData) => {
            if (userData?.stats) {
                setStats(userData.stats)
                return;
            }

            let tstats = {
                matches: 0,
                win: 0,
                loss: 0,
                kills: 0,
                deaths: 0,
                assists: 0
            }

            for (let i = 0; i < userData.matchHistory.length; i++) {
                const matchId = userData.matchHistory[i];

                const doc = await firebase.firestore().collection("matches").doc(matchId).get();

                if (!doc.exists) {
                    continue;
                }

                const res = doc.data()

                tstats.matches++;

                let p = res.players.find(p => p.name === userData.username)

                if (p) {
                    tstats.kills += p.kills;
                    tstats.deaths += p.deaths;
                    tstats.assists += p.assists;

                    if (p.team && p.team === res.winner) {
                        tstats.win++;
                    } else if (p.team) {
                        tstats.loss++;
                    } else if (userData.username === res.winner) {
                        tstats.win++;
                    } else {
                        tstats.loss++;
                    }
                }
            }

            console.log(`Publishing stats for ${userData.username}:`, tstats)

            try {
                await firebase.firestore()
                    .collection("users")
                    .doc(userData.id)
                    .set({
                        stats: tstats
                    }, { merge: true })
            } catch (error) {
                console.error(error)
            }

            setStats(tstats);
        }; getAndPublishStats(user);
    }, [user])

    const getWinRate = (matches, win) => matches === 0 ? 0 : (win / matches) * 100;

    const isEven = props.rank % 2 === 0;

    return (
        <Row className={"leaderboard-row" + (isEven ? "" : " leaderboard-row-uneven")} data-augmented-ui={isEven ? "" : "bl-clip"}>
            <Col xs={1} className="leaderboard-col">
                {props.rank}
            </Col>
            <Col className="leaderboard-col" as={Link} to={'/user/' + user.username} >
                <div className="leaderboard-player">
                    <img
                        src={user.iconUrl ? user.iconUrl : '/logo192.png'}
                        alt={user.username}
                        className="leaderboard-icon" data-augmented-ui={"bl-clip"} />
                    <div>{user.username}</div>
                </div>
            </Col>
            <Col className="leaderboard-col">
                {user.elo}
            </Col>
            <Col className="leaderboard-col leaderboard-winrate">
                <div>{getWinRate(stats.matches, stats.win)}% {stats.win}W {stats.loss}L</div>
                <div className="leaderboard-progress" data-augmented-ui={"bl-clip"}>
                    <div className="leaderboard-progress-bar" style={{ width: getWinRate(stats.matches, stats.win) + '%' }}></div>
                </div>
            </Col>
        </Row>
    )
}

export default Leaderboard;