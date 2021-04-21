import React from "react";
import { Container } from "react-bootstrap";
import DownloadCard from "../components/DownloadCard.js"
import { FirestoreCollection } from "@react-firebase/firestore";
import Spinner from "../components/Spinner.js";

const Downloads = () => {
    return (
        <>
            <Container>
                <FirestoreCollection path="/downloads/" orderBy={[{field: 'date', type: 'desc'}]}>
                    {
                        req => {
                            if (req.isLoading) {
                                return (<>
                                    <Spinner></Spinner>
                                </>)
                            } else {
                                let dlList = [];
                                for (let i = 0; i < req.ids.length; i++) {
                                    const download = req.value[i];
                                    
                                    dlList.push(
                                        <DownloadCard
                                            isFirst={i === 0 ? true : false}
                                            isDefense={download.version.startsWith("Defense") ? true : false}
                                            key={req.ids[i]}
                                            version={download.version}
                                            description={download.description}
                                            downloadLink={download.downloadLink}
                                            date={new Date(download.date.seconds * 1000).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}>
                                        </DownloadCard>
                                    )
                                }

                                return dlList;
                            }
                        }
                    }

                </FirestoreCollection>
            </Container>
        </>
    )
}

export default Downloads;