import {Card, Container, Row, Button} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGithub} from "@fortawesome/free-brands-svg-icons";
import {faEnvelope} from "@fortawesome/free-regular-svg-icons";
import React from "react";
import PropTypes from "prop-types";

function ContactCard(props) {

    ContactCard.propTypes = {
        photo: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        gh_link: PropTypes.string,
        email: PropTypes.string.isRequired,
    };

    return (
        <>
            <Card data-augmented-ui="tl-clip" className='bg-c-info' style={{width: '20rem', margin: '8px'}}>
                <Card.Img variant="top" style={{height: "20rem"}}
                          src={props.photo}/>
                <Card.Body>
                    <Card.Title>{props.name}</Card.Title>
                    <Card.Text>
                        <Container>
                            <Row className={"justify-content-around mt-4"}>
                                {props.gh_link && <Button
                                    className="bg-c-success"
                                    data-augmented-ui="tl-clip"
                                    onClick={() => window.open(props.gh_link, '_blank')}>
                                    <FontAwesomeIcon icon={faGithub} style={{fontSize: "24pt"}}/>
                                </Button>}
                                <Button
                                    className="bg-c-success"
                                    data-augmented-ui="tl-clip"
                                    onClick={() => window.open("mailto:" + props.email, '_blank')}>
                                    <FontAwesomeIcon icon={faEnvelope} style={{fontSize: "24pt"}}/>
                                </Button>
                            </Row>
                        </Container>
                    </Card.Text>
                </Card.Body>
            </Card>
        </>
    );
}

export default ContactCard;