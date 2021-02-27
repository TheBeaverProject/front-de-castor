import {Card, Container, Row} from "react-bootstrap";
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
            <Card style={{width: '20rem'}}>
                <Card.Img variant="top" style={{height: "20rem"}}
                          src={props.photo}/>
                <Card.Body>
                    <Card.Title>{props.name}</Card.Title>
                    <Card.Text>
                        <Container>
                            <Row className={"justify-content-around mt-4"}>
                                {props.gh_link && <a href={props.gh_link}>
                                    <FontAwesomeIcon icon={faGithub} style={{fontSize: "24pt"}}/>
                                </a>}
                                <a href={"mailto:" + props.email}>
                                    <FontAwesomeIcon icon={faEnvelope} style={{fontSize: "24pt"}}/>
                                </a>
                            </Row>
                        </Container>
                    </Card.Text>
                </Card.Body>
            </Card>
        </>
    );
}

export default ContactCard;