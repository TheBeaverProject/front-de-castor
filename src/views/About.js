import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBox } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { Jumbotron, Col, Container, Row, Image } from "react-bootstrap";
import ContactCard from "../components/ContactCard";

const Contact = () => {

    return (
        <>
            <Jumbotron className="bg-c-primary">
                <h1>About Us</h1>
            </Jumbotron>
            <Container className="mt-3 mb-3">
                <h2>History</h2>
                <p>
                    The idea of tackling this S2 project was very exciting for us. We highly anticipate
                    this project and are eager to work on it. During the making of our group,
                    we naturally went together because our group has a good chemistry and is pretty even.
                    We have similar levels in programming, while having different strong advantages.
                    When adding them up, our personalities and skills are balanced, making a good
                    recipe to the success of our project.
                    While discussing the project for the first time, we had a lot of ideas. We had
                    a hard time settling with one, but we are now happy about what we came up
                    with. Our main general goals were to make a game which looked professional
                    and was qualitative. The idea we decided to stuck with came to us when playing
                    in a custom game mode on CS:GO, it is therefore genuine and authentic and we
                    think that it is pretty special. We now have a very clear idea of how we want to
                    make our game, which gives us high confidence and a very good starting point
                    to achieve our goals.
                    The game we have in mind would be a First Person Shooter. It is the group's
                    favorite game type and we have great ideas which could refresh the genre. We
                    want a game which we can enjoy playing, and we want to be able to create a
                    clean codebase, which will allow us to maintain it in the future. We want to
                    give it the quality of a good Indie game, with a realistic economic scheme which
                    could ultimately generate earnings.
                </p>
            </Container>
            <Container className="mt-3 mb-3">
                <h2>Our Team</h2>
                <Row className={"justify-content-around mt-3"}>
                    <ContactCard name={"Augustin Begue"} email={"augustin.begue@epita.fr"}
                        gh_link={"https://github.com/Tagueo"}
                        photo={"https://photos.cri.epita.fr/augustin.begue"} />
                    <ContactCard name={"François Houssin"} email={"fransoishoussin@gmail.com"}
                        gh_link={"https://github.com/Difrancium/"}
                        photo={"https://avatars.githubusercontent.com/u/45126377"} />
                </Row>
                <Row className={"justify-content-around mt-3"}>
                    <ContactCard name={"Baptiste Fontaine"} email={"baptiste.fontaine@epita.fr"}
                        gh_link={"https://github.com/Tagueo"}
                        photo={"https://photos.cri.epita.fr/baptiste.fontaine"} />
                    <ContactCard name={"Paul Spielmann"} email={"paul.spielmann@epita.fr"}
                        gh_link={"https://github.com/paul-spl"}
                        photo={"https://i.ibb.co/TmtDx5f/Screenshot-2021-01-28-175643.png"} />
                </Row>
            </Container>
            <Container className="mt-3 mb-3">
                <h2>Ressources</h2>
                <Row>
                    <Col className="p-3">
                        <h4>
                            Game
                        </h4>
                        <ul className='assetList'>
                            <ol>
                                <Image className='icon' src='https://docs.microsoft.com/fr-fr/windows/images/csharp-logo.png'></Image>
                                <a href="https://docs.microsoft.com/en-us/dotnet/csharp/">C#</a>
                            </ol>
                            <ol>
                                <Image className='icon' src='https://unity3d.com/profiles/unity3d/themes/unity/images/pages/branding_trademarks/unity-tab-square-black.png'></Image>
                                <a href="https://unity.com/">Unity</a>
                            </ol>
                            <ol>
                                <Image className='icon' src='https://media-exp1.licdn.com/dms/image/C4D0BAQFgm5g8rrdzPg/company-logo_200_200/0/1580115614036?e=2159024400&v=beta&t=5N9qcv-_OxrjNfmwEpdvMrSbjCnVn5pnxLF4FIdrYNs'></Image>
                                <a href="https://assetstore.unity.com/packages/tools/network/pun-2-free-119922">Photon Unity Networking</a>
                            </ol>
                            <ol>
                                <FontAwesomeIcon icon={faBox} className='icon' style={{ fontSize: "36pt", verticalAlign: 'middle' }}></FontAwesomeIcon>
                                <a href="https://assetstore.unity.com/packages/tools/network/rest-client-for-unity-102501">Rest Client for Unity</a>
                            </ol>
                            <ol>
                                <FontAwesomeIcon icon={faBox} className='icon' style={{ fontSize: "36pt", verticalAlign: 'middle' }}></FontAwesomeIcon>
                                <a href="https://assetstore.unity.com/packages/3d/props/exterior/polygon-prototype-low-poly-3d-art-by-synty-137126">POLYGON Prototype Asset Pack</a>
                            </ol>
                            <ol>
                                <FontAwesomeIcon icon={faBox} className='icon' style={{ fontSize: "36pt", verticalAlign: 'middle' }}></FontAwesomeIcon>
                                <a href="https://assetstore.unity.com/packages/3d/characters/humanoids/low-poly-modern-soldiers-164028">Low Poly Modern Soldiers</a>
                            </ol>
                        </ul>
                    </Col>
                    <Col className="p-3">
                        <h4>
                            Website
                        </h4>
                        <ul className='assetList'>
                            <ol>
                                <Image className='icon' src='https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/480px-Unofficial_JavaScript_logo_2.svg.png'></Image>
                                <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript">JavaScript</a>
                            </ol>
                            <ol>
                                <Image className='icon' src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1280px-React-icon.svg.png'></Image>
                                <a href="https://reactjs.org/">ReactJs</a>
                            </ol>
                            <ol>
                                <Image className='icon' src='https://www.pngrepo.com/download/303670/firebase-1-logo.png'></Image>
                                <a href="https://firebase.google.com/">Firebase</a>
                            </ol>
                            <ol>
                                <Image className='icon' src='https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Bootstrap_logo.svg/langfr-220px-Bootstrap_logo.svg.png'></Image>
                                <a href="https://firebase.google.com/">Bootstrap</a>
                            </ol>
                        </ul>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Contact;
