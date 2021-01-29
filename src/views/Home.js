import React, {useState, useEffect} from "react";
import Footer from "../components/Footer";

import NavBar from "../components/NavBar";
import {Button, Container, Jumbotron, Row} from "react-bootstrap";

const Home = () => {
    return (
        <>
            <Jumbotron >
                <h1>Hello, world!</h1>
                <p>
                    This is a simple hero unit, a simple jumbotron-style component for calling
                    extra attention to featured content or information.
                </p>
                <p>
                    <Button variant="primary">Learn more</Button>
                </p>
            </Jumbotron>
        </>
    );
};

export default Home;
