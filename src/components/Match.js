import PropTypes from "prop-types";
import { Card } from "react-bootstrap";
import firebase from "firebase";

const Match = (props) => {
    Match.propTypes = {
        data: PropTypes.object.isRequired,
    };

    const data = props.data;

    let Fdate = new firebase.firestore.Timestamp(data?.endDate.seconds, data?.endDate.nanoseconds);
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };;

    return (
        <Card>
            <Card.Body>
                <Card.Title>
                    {data?.type}
                </Card.Title>
                <Card.Text>

                </Card.Text>
            </Card.Body>
            <Card.Footer>
                {Fdate.toDate().toLocaleDateString("fr-FR", options)}
            </Card.Footer>
        </Card>
    )
}

export default Match;