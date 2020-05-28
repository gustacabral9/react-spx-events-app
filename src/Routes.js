import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
/* View */
import notfoundPage from "./view/notfoundPage";
import Home from "./view/home";
import Signin from "./view/signin";
import Signup from "./view/signup";
import PublishEvent from "./view/user/publish_event";
import UserEvents from "./view/user/user_events";
/**/

function Routes() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/signin" component={Signin} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/user/publish" component={PublishEvent} />
            <Route exact path="/user/events" component={UserEvents} />
            <Route path="/user/">
              <Redirect to="/user/events"></Redirect>
            </Route>
            <Route path="/" component={notfoundPage} />
          </Switch>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default Routes;
