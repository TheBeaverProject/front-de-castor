import {FirestoreCollection} from "@react-firebase/firestore";

const News = () => {

    return (
        <>
            <FirestoreCollection path="/news/">
                {
                    d => {
                        if (d.isLoading) {
                            return "Loading"
                        } else {
                            let newsList = [];
                            for (let i = 0; i < d.ids.length; i++) {
                                newsList.push(<p key={d.ids[i]}>{d.value[i].content}</p>)
                            }
                            return newsList;
                        }
                    }
                }
            </FirestoreCollection>
        </>
    );

};

export default News;
