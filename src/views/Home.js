import React from "react";
import { Link } from "react-router-dom";
import { Button, Jumbotron, Image, Col, Row, Container  } from "react-bootstrap";

const Home = () => {
    return (
        <>
            <Jumbotron className="mb-0 bg-c-primary">
                <h1>The Beaver Project</h1>
                <p>
                    A brand new FPS that will bring fun with a skill based experience to your life.
                    Built on an original story, with modern features and strategic gameplay.
                </p>
                <p>
                    <Link to="/downloads">
                        <Button size="lg" className="bg-c-dark" data-augmented-ui="br-clip">
                            Download Now !
                        </Button>
                    </Link>
                </p>
            </Jumbotron>
            <video style={{height: '70vh'}} 
                src="https://firebasestorage.googleapis.com/v0/b/beaver-ea0ea.appspot.com/o/media%2FTrailer_1.mp4?alt=media&token=e61077d9-9fb8-4971-87f3-37ab32506914"
                controls={true}
                autoPlay={true}
                muted={true}></video>
            <Jumbotron className="mb-0 bg-c-success">
                <Row>
                    <Col>
                        <h1>Rich map and graphics</h1>
                        <p>
                            Allows for a great skilled and strategic experience.
                        </p>
                    </Col>
                    <Col>
                        <h1>Fun & Competitive Gamemodes</h1>
                        <p>
                            With a great set of weapons, meaning a long lasting game with diverse things to enjoy.
                        </p>
                    </Col>
                </Row>
            </Jumbotron>
            <Container fluid>
                <Row>
                    <Col className="p-3">
                        <Image src='https://i.imgur.com/CwbL1R5.jpeg' width="100%"></Image>
                    </Col>
                    <Col className="p-3">
                        <Image src='https://i.imgur.com/Tf8X6eL.jpeg' width="100%"></Image>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Home;
