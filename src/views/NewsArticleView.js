import firebase from "firebase";
import {useEffect, useState} from "react";
import Page404 from "./404";
import NewsArticle from "../components/NewsArticle";

const NewsArticleView = (props) => {

    const [newsArticle, setNewsArticle] = useState();

    useEffect(() => {
        const newsRef = firebase.firestore().collection("news");
        newsRef.where("url", "==", props.match.params.newsURL).get()
            .then(function (querySnapshot) {
                if (querySnapshot.empty) {
                    setNewsArticle(
                        <Page404/>
                    )
                    return;
                }
                querySnapshot.forEach(function (doc) {
                    const documentData = doc.data();
                    console.log(documentData)
                    setNewsArticle(<NewsArticle data={documentData}/>
                    );
                });
            })
            .catch(function (error) {
                console.log("Error getting documents: ", error);
            });
    }, [props]);


    return (
        <>
            {newsArticle}
        </>);
}

export default NewsArticleView;