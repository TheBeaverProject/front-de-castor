import {Button, ButtonGroup, Container, Row} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGhost} from "@fortawesome/free-solid-svg-icons";
import {useHistory} from "react-router-dom";

const Page404 = () => {

    const history = useHistory();

    return (
        <>
            <div className="center-items">
                <Container>
                    <Row className="justify-content-center">
                        <div style={{fontSize: 120}}>
                            <FontAwesomeIcon icon={faGhost}/> 404
                        </div>
                    </Row>
                    <Row className="justify-content-center">
                        <div style={{fontSize: 50}}>
                            This page does not exists.
                        </div>
                    </Row>
                    <Row className="justify-content-center mt-5">
                        <ButtonGroup>
                            <Button variant="outline-primary" onClick={() => history.push("/")}>
                                Take me home
                            </Button>
                        </ButtonGroup>
                    </Row>
                </Container>
            </div>
        </>
    );
}


export default Page404;