import {FirestoreCollection} from "@react-firebase/firestore";
import NewsPrompt from "../components/NewsPrompt";
import Spinner from "../components/Spinner.js";
import {Container} from "react-bootstrap";

const News = () => {

    return (
        <>
            <Container>
                <FirestoreCollection path="/news/">
                    {
                        d => {
                            if (d.isLoading) {
                                return (<>
                                    <Spinner></Spinner>
                                </>)
                            } else {
                                let newsList = [];
                                for (let i = 0; i < d.ids.length; i++) {
                                    const article = d.value[i];
                                    console.log(article)
                                    newsList.push(
                                        <NewsPrompt key={d.ids[i]} author={article.author} content={article.content}
                                                    likes={article.likes}
                                                    title={article.title} imageURL={article.previewImage}
                                                    url={article.url} publishDate={article.publishDate.seconds}
                                                    documentId={d.ids[i]}/>
                                    );
                                }
                                return newsList;
                            }
                        }
                    }
                </FirestoreCollection>
            </Container>
        </>
    );
};

export default News;
