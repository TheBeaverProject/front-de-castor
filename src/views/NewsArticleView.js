import firebase from "firebase";
import {useEffect, useState} from "react";
import Page404 from "./404";
import NewsArticle from "../components/NewsArticle";

const NewsArticleView = (props) => {

    const db = firebase.firestore();

    const [newsArticle, setNewsArticle] = useState();

    const newsRef = db.collection("news");

    useEffect(() => {
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
    }, []);


    return (
        <>
            {newsArticle}
        </>);
}

export default NewsArticleView;