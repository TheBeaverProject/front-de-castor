import React from "react";
import { Link } from "react-router-dom";
import { Button, Jumbotron, Image, Col, Row, Container } from "react-bootstrap";

const Home = () => {
    return (
        <>
            <Jumbotron className="mb-0 bg-c-primary">
                <h1>The Beaver Project</h1>
                <p>
                    General and appealing description of the game.
                </p>
                <p>
                    <Link to="/downloads">
                        <Button size="lg" className="bg-c-dark" data-augmented-ui="br-clip">
                            Download Now !
                        </Button>
                    </Link>
                </p>
            </Jumbotron>
            <Image src='https://picsum.photos/3840/1080' width="100%"></Image>
            <Jumbotron className="mb-0 bg-c-success">
                <Row>
                    <Col>
                        <h1>First Ground Breaking Feature</h1>
                        <p>
                            Description of this feature and image just below
                            </p>
                    </Col>
                    <Col>
                        <h1>Second Ground Breaking Feature</h1>
                        <p>
                            Description of this feature and image just below
                            </p>
                    </Col>
                </Row>
            </Jumbotron>
            <Container fluid>
                <Row>
                    <Col className="p-3">
                        <Image src='https://picsum.photos/1920/1080' width="100%"></Image>
                    </Col>
                    <Col className="p-3">
                        <Image src='https://picsum.photos/1920/1080' width="100%"></Image>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Home;
