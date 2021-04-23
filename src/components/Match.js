import PropTypes from "prop-types";
import { Card, Col, Row } from "react-bootstrap";
import firebase from "firebase";
import { Link } from "react-router-dom";

const Match = (props) => {
    Match.propTypes = {
        focusedUsername: PropTypes.string.isRequired,
        data: PropTypes.object.isRequired,
    };

    const data = props.data;

    let Fdate = new firebase.firestore.Timestamp(data?.endDate.seconds, data?.endDate.nanoseconds);
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    let endDate = Fdate.toDate().toLocaleDateString("fr-FR", options);

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
            <Card.Body className="bg-c-info">
                <Card.Title>
                    <span className={data?.winner === props.focusedUsername ? "txt-c-success font-weight-bold" : "txt-c-warning font-weight-bold"}>
                        {data?.winner === props.focusedUsername ? "Win" : "Loss"}
                    </span> - {data?.type}
                </Card.Title>
                { playersList }
            </Card.Body>
            <Card.Footer className="bg-c-info">
                { endDate }
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
                    { props.data.name }</Link>
            </Col>
            <Col>
                { props.data.kills }
            </Col>
            <Col>
                { props.data.deaths }
            </Col>
            <Col>
                { props.data.assists }
            </Col>
            <Col>
                { props.data.points }
            </Col>
        </Row>
    )
}

export default Match;