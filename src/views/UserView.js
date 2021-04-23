import firebase from "firebase";
import { useEffect, useState } from "react";
import Page404 from "./404";
import User from "../components/User";

const UserView = (props) => {

    const [user, setUser] = useState();
    
    useEffect(() => {
        async function fetchUser() {
            let q = await firebase.firestore().collection("users")
                .where("username", "==", props.match.params.username)
                .limit(1)
                .get();
    
            if (q.empty) {
                setUser(<Page404 />);
                return;
            }
    
            q.forEach(function (doc) {
                setUser(<User data={doc.data()} />);
            });
        }

        fetchUser();
    }, [props])

    return (
        <>
            {user}
        </>
    )
}

export default UserView;