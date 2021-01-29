import React, {useState, useEffect} from "react";
import Footer from "../components/Footer";

import NavBar from "../components/NavBar";
import {Button, Container, Jumbotron, Row} from "react-bootstrap";

const Home = () => {
    const [news, setNews] = useState([]);
    /**
     * After component first render
     * fetch all news then change component news state
     * this will update component and render news
     */
    useEffect(() => {
        fetch("http://151.80.152.11:8080/news/summaries")
            .then((res) => {
                if (!res.ok) throw res.error();
                res
                    .json()
                    .then((data) => {
                        if (!data.success) throw data.error;
                        setNews(data.newsSummaries);
                    })
                    .catch((err) =>
                        console.error(`Error while parsing data fetched: ${err}`)
                    );
            })
            .catch((err) => console.error(`Error while fetching data: ${err}`));
    }, []);

    return (
        <>
            <Jumbotron className="flex-fill">
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
