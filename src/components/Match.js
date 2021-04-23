import PropTypes from "prop-types";
import { Card, Col, Row } from "react-bootstrap";
import firebase from "firebase";
import { Link } from "react-router-dom";

function parseDate(timpestamp) {
    let Fdate = new firebase.firestore.Timestamp(timpestamp.seconds, timpestamp.nanoseconds);
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return Fdate.toDate().toLocaleDateString("fr-FR", options);
}

const FFAMatch = (props) => {
    FFAMatch.propTypes = {
        focusedUsername: PropTypes.string.isRequired,
        data: PropTypes.object.isRequired,
    };

    const data = props.data;
    let endDate = parseDate(data?.endDate)

    props.data?.players.sort((p1, p2) => p2.points - p1.points)

    let playersList = []
    props.data?.players.forEach(player => {
        playersList.push(<Player
            key={player.name}
            highlight={player.name === props.focusedUsername}
            data={player}></Player>)
    });

    return (
        <Card data-augmented-ui="br-clip" className="mb-4">
            <Card.Body className="bg-c-dark">
                <Card.Title>
                    <span className={data?.winner === props.focusedUsername ? "txt-c-success font-weight-bold" : "txt-c-warning font-weight-bold"}>
                        {data?.winner === props.focusedUsername ? "Win" : "Loss"}
                    </span> - {data?.type}
                </Card.Title>
                <Row className="font-weight-light">
                    <Col>
                        Name
                    </Col>
                    <Col>
                        Kills
                    </Col>
                    <Col>
                        Deaths
                    </Col>
                    <Col>
                        Assists
                    </Col>
                    <Col>
                        Points
                    </Col>
                </Row>
                {playersList}
            </Card.Body>
            <Card.Footer className="bg-c-dark">
                {endDate}
            </Card.Footer>
        </Card>
    )
}

const TeamMatch = (props) => {
    TeamMatch.propTypes = {
        focusedUsername: PropTypes.string.isRequired,
        data: PropTypes.object.isRequired,
    };

    const data = props.data;
    let endDate = parseDate(data?.endDate)

    let t1PlayersList = []
    let t2PlayersList = []
    let focusedUsernameTeam = 0;

    props.data?.players.sort((p1, p2) => p2.points - p1.points)

    props.data?.players.forEach(player => {
        let list;

        if (player.team === 1) {
            list = t1PlayersList;
        } else {
            list = t2PlayersList;
        }

        if (player.name === props.focusedUsername) {
            focusedUsernameTeam = player.team;
        }

        list.push(<Player
            key={player.name}
            highlight={player.name === props.focusedUsername}
            data={player}></Player>)
    });

    return (
        <Card data-augmented-ui="br-clip" className="mb-4">
            <Card.Body className="bg-c-dark">
                <Card.Title>
                    <span className={parseInt(data?.winner) === focusedUsernameTeam ? "txt-c-success font-weight-bold" : "txt-c-warning font-weight-bold"}>
                        {parseInt(data?.winner) === focusedUsernameTeam ? "Win" : "Loss"}
                    </span> - {data?.type}
                </Card.Title>
                <Card.Subtitle className={data?.winner === "1" ? "txt-c-success font-weight-bold" : "txt-c-warning font-weight-bold"}>Beavers</Card.Subtitle>
                <Row className="font-weight-light">
                    <Col>
                        Name
                    </Col>
                    <Col>
                        Kills
                    </Col>
                    <Col>
                        Deaths
                    </Col>
                    <Col>
                        Assists
                    </Col>
                    <Col>
                        Points
                    </Col>
                </Row>
                {t1PlayersList}
                <hr></hr>
                <Card.Subtitle className={data?.winner === "2" ? "txt-c-success font-weight-bold" : "txt-c-warning font-weight-bold"}>Sharks</Card.Subtitle>
                <Row className="font-weight-light">
                    <Col>
                        Name
                    </Col>
                    <Col>
                        Kills
                    </Col>
                    <Col>
                        Deaths
                    </Col>
                    <Col>
                        Assists
                    </Col>
                    <Col>
                        Points
                    </Col>
                </Row>
                {t2PlayersList}
            </Card.Body>
            <Card.Footer className="bg-c-dark">
                {endDate}
            </Card.Footer>
        </Card>
    )
}

const Player = (props) => {
    Player.propTypes = {
        highlight: PropTypes.bool.isRequired,
        data: PropTypes.object.isRequired,
    }

    return (
        <Row className={props.highlight ? "txt-c-primary font-weight-bold" : ""}>
            <Col>
                <Link to={"/user/" + props.data.name}>
                    {props.data.name}</Link>
            </Col>
            <Col>
                {props.data.kills}
            </Col>
            <Col>
                {props.data.deaths}
            </Col>
            <Col>
                {props.data.assists}
            </Col>
            <Col>
                {props.data.points}
            </Col>
        </Row>
    )
}

export { Player, FFAMatch, TeamMatch };