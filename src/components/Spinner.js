import { Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

function Spinner(props) {
    return (<>
        <Container className="mt-5 d-flex justify-content-center align-items-center" style={{width: '100%', height: '100vh'}}>
            <FontAwesomeIcon icon={faSpinner} spin size="2x"></FontAwesomeIcon>
        </Container>
    </>)
}

export default Spinner;