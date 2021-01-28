import { Switch, BrowserRouter, Redirect } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';

import Home from "./views/Home";
import Contact from "./views/Contact";
import News from "./views/News"
import DefaultLayout from "./layouts/DefaultLayout";
import AppRoute from "./utils/AppRoute";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <AppRoute path="/" exact component={Home} layout={DefaultLayout}/>
          <AppRoute path="/contact" exact component={Contact} layout={DefaultLayout}/>
          <AppRoute path="/news" exact component={News} layout={DefaultLayout}/>
          <AppRoute path="/support" />
          <Redirect from="*" to="/" />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;