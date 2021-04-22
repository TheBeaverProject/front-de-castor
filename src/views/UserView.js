import firebase from "firebase";
import {useEffect, useState} from "react";
import Page404 from "./404";
import User from "../components/User";

const UserView = (props) => {

    const [user, setUser] = useState();

    useEffect(() => {
        const userCol = firebase.firestore().collection("users");

        userCol.where("username", "==", props.match.params.username).get()
            .then(function (q) {
                if (q.empty) {
                    setUser(<Page404/>);
                    return;
                }

                q.forEach(function (doc) {
                    const documentData = doc.data();
                    console.log(documentData)
                    setUser(<User data={documentData}/>
                    );
                });
                
                return;
            })
            .catch(function (error) {
                console.log("Error getting documents: ", error);
            });
    }, [props])

    return (
        <>
            {user}
        </>
    )
}

export default UserView;