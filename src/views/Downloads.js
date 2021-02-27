import React from "react";
import { Container } from "react-bootstrap";
import DownloadCard from "../components/DownloadCard.js"

const Downloads = () => {
    return (
        <>
            <Container>
                <DownloadCard
                    version="v0.0.1"
                    description="Version of the first Defense"
                    downloadLink="http://box.begue.cc:8256/share/0eFlqV7zlu_qi6HZ/25-02-2021.rar">
                </DownloadCard>
            </Container>
        </>
    )
}

export default Downloads;