import PropTypes from "prop-types";
import { Container } from "react-bootstrap";

const User = (props) => {
    User.propTypes = {
        data: PropTypes.object.isRequired,
    };

    const data = props.data;

    return (
        <>
            <Container className="container-sm">
                <p>{ data.username }</p>
                <p>{ data.elo }</p>
                <p>{ data.email }</p>
                <p>{ data.username }</p>
            </Container>
        </>
    );
}

export default User;