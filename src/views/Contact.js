import React from "react";
import {Card, Col, Container, Image, Row} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faGithub} from "@fortawesome/free-brands-svg-icons";
import {faMailBulk} from "@fortawesome/free-solid-svg-icons";

const Contact = () => {
    return (
        <>
            <Container className="mt-3">
                <Row className={"justify-content-around mt-3"}>
                    <Card style={{width: '20rem'}}>
                        <Card.Img variant="top" style={{height: "20rem"}}
                                  src="https://photos.cri.epita.fr/augustin.begue"/>
                        <Card.Body>
                            <Card.Title>Augustin Begue</Card.Title>
                            <Card.Text>
                                <p>augustin.begue@epita.fr</p>
                                <p>github.com/Tagueo</p>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card style={{width: '20rem'}}>
                        <Card.Img variant="top" style={{height: "20rem"}}
                                  src="https://avatars.githubusercontent.com/u/45126377"/>
                        <Card.Body>
                            <Card.Title>François Houssin</Card.Title>
                            <Card.Text>
                                <FontAwesomeIcon icon={faGithub} size={20}/>
                                <FontAwesomeIcon icon={faMailBulk}/>
                                <p>fransoishoussin@gmail.com</p>
                                <p>github.com/Difrancium/</p>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Row>
                <Row className={"justify-content-around mt-3"}>
                    <Card style={{width: '20rem'}}>
                    <Card.Img variant="top" style={{height: "20rem"}}
                              src="https://photos.cri.epita.fr/baptiste.fontaine"/>
                    <Card.Body>
                        <Card.Title>Baptiste Fontaine</Card.Title>
                        <Card.Text>
                            <p>baptiste.fontaine@epita.fr</p>
                            <p>github.com/Hypaxba</p>
                        </Card.Text>
                    </Card.Body>
                </Card>
                    <Card style={{width: '20rem'}}>
                        <Card.Img variant="top" style={{height: "20rem"}}
                                  src="https://i.ibb.co/TmtDx5f/Screenshot-2021-01-28-175643.png"/>
                        <Card.Body>
                            <Card.Title>Paul Spielmann</Card.Title>
                            <Card.Text>
                                <p>paul.spielmann@epita.fr</p>
                                <p>github.com/paul-spl</p>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Row>
            </Container>
        </>
    );
};

export default Contact;
