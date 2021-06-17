//React components
import {BrowserRouter, Redirect, Switch} from "react-router-dom";
import firebase from 'firebase/app';
import 'firebase/firestore'

import {FirebaseAuthProvider} from "@react-firebase/auth";
import {firebaseConfig} from "./utils/FirebaseConfig";
import {FirestoreProvider} from "@react-firebase/firestore";


//Stylesheets
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-datetime/css/react-datetime.css";
import "./styles/layout.css"
import "./styles/cyberpunk.css"

//Views
import Home from "./views/Home";
import About from "./views/About";
import News from "./views/News"
import DefaultLayout from "./layouts/DefaultLayout";
import AppRoute from "./utils/AppRoute";
import Page404 from "./views/404"
import Register from "./views/Register";
import Login from "./views/Login";
import Downloads from "./views/Downloads";
import NewsArticleView from "./views/NewsArticleView";
import UserView from "./views/UserView";
import Leaderboard from "./views/Leaderboard";
import Ternier from "./views/Ternier";

require('firebase/auth')
require('firebase/firestore')

function App() {
    return (
            <div className="App">
            <FirebaseAuthProvider firebase={firebase} {...firebaseConfig}>
                <FirestoreProvider {...firebaseConfig} firebase={firebase}>
                    <BrowserRouter>
                        <Switch>
                            <AppRoute path="/" exact component={Home} layout={DefaultLayout}/>
                            <AppRoute path="/about" exact component={About} layout={DefaultLayout}/>
                            <AppRoute path="/news" exact component={News} layout={DefaultLayout}/>
                            <AppRoute path="/news/:newsURL" component={(props) => <NewsArticleView {...props} />} layout={DefaultLayout}/>
                            <AppRoute path="/404" exact component={Page404} layout={DefaultLayout}/>
                            <AppRoute path="/register" exact component={Register} layout={DefaultLayout}/>
                            <AppRoute path="/login" exact component={Login} layout={DefaultLayout}/>
                            <AppRoute path="/downloads" exact component={Downloads} layout={DefaultLayout}/>
                            <AppRoute path="/leaderboard" exact component={Leaderboard} layout={DefaultLayout}/>
                            <AppRoute path="/Ternier" component={Ternier} layout={DefaultLayout}/>
                            <AppRoute path="/user/:username" component={(props) => <UserView {...props}/>} layout={DefaultLayout}/>
                            <Redirect from="*" to="/404"/>
                        </Switch>
                    </BrowserRouter>
                </FirestoreProvider>
            </FirebaseAuthProvider>
        </div>
);
}

export default App;