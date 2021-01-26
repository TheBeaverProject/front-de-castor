import { Route, Switch, BrowserRouter, Redirect } from "react-router-dom";

import Home from "./views/Home";
import Contact from "./views/Contact";
import News from "./views/News"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/contact" exact component={Contact} />
          <Route path="/news" exact component={News} />
          <Route path="/support" />
          <Redirect from="*" to="/" />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;