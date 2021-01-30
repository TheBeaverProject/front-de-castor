//React components
import {BrowserRouter, Redirect, Switch} from "react-router-dom";

//Stylesheets
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/layout.css'
import "react-datetime/css/react-datetime.css";

//Views
import Home from "./views/Home";
import Contact from "./views/Contact";
import News from "./views/News"
import DefaultLayout from "./layouts/DefaultLayout";
import AppRoute from "./utils/AppRoute";
import Page404 from "./views/404"
import Register from "./views/Register";
import Login from "./views/Login";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <AppRoute path="/" exact component={Home} layout={DefaultLayout}/>
          <AppRoute path="/contact" exact component={Contact} layout={DefaultLayout}/>
          <AppRoute path="/news" exact component={News} layout={DefaultLayout}/>
          <AppRoute path="/404" exact component={Page404} layout={DefaultLayout}/>
          <AppRoute path="/register" exact component={Register} layout={DefaultLayout}/>
          <AppRoute path="/login" exact component={Login} layout={DefaultLayout}/>
          <Redirect from="*" to="/404" />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;