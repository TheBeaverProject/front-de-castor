import { Route, Switch, BrowserRouter, Redirect } from "react-router-dom";
import { createBrowserHistory } from "history";

import Home from "./views/Home";

const history = createBrowserHistory();

function App() {
  return (
    <div className="App">
      <BrowserRouter history={history}>
        <Switch>
          <Route path="/" component={Home}>
            <Home />
          </Route>
          <Route path="/contact" component={Home}></Route>
          <Route path="/news"></Route>
          <Route path="/support"></Route>
          <Redirect from="*" to="/" />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
