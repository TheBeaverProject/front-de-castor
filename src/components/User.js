import PropTypes from "prop-types";
import { Container } from "react-bootstrap";
import Match from "./Match";
import Spinner from "./Spinner.js";
import { FirestoreDocument } from "@react-firebase/firestore";


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
                        return (
                            <Match key={r.value.endDate.seconds} focusedUsername={data.username} data={r.value}></Match>
                        )
                    }
                }}
            </FirestoreDocument>
        )
    })

    return (
        <>
            <Container>
                <p>{data.username}</p>
                <p>{data.elo}</p>
                <p>{data.email}</p>
            </Container>
            <Container className="container-sm" fluid>
                <h3>Match History:</h3>
                {matchEls}
            </Container>
        </>
    );
}

export default User;