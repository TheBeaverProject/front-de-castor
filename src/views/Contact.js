import React from "react";
import {Container, Row} from "react-bootstrap";
import ContactCard from "../components/ContactCard";

const Contact = () => {

    return (
        <>
            <Container className="mt-3 mb-3">
                <Row className={"justify-content-around mt-3"}>
                    <ContactCard name={"Augustin Begue"} email={"augustin.begue@epita.fr"}
                                 gh_link={"https://github.com/Tagueo"}
                                 photo={"https://photos.cri.epita.fr/augustin.begue"}/>
                    <ContactCard name={"François Houssin"} email={"fransoishoussin@gmail.com"}
                                 gh_link={"https://github.com/Difrancium/"}
                                 photo={"https://avatars.githubusercontent.com/u/45126377"}/>
                </Row>
                <Row className={"justify-content-around mt-3"}>
                    <ContactCard name={"Baptiste Fontaine"} email={"baptiste.fontaine@epita.fr"}
                                 gh_link={"https://github.com/Tagueo"}
                                 photo={"https://photos.cri.epita.fr/baptiste.fontaine"}/>
                    <ContactCard name={"Paul Spielmann"} email={"paul.spielmann@epita.fr"}
                                 gh_link={"https://github.com/paul-spl"}
                                 photo={"https://i.ibb.co/TmtDx5f/Screenshot-2021-01-28-175643.png"}/>

                </Row>
            </Container>
        </>
        //This link for Paul's photo might expire one day, I don't know. In case you don't have picture look for
        //this first.
    );
};

export default Contact;
