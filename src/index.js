import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

import reducer from "./Reducers";
import CreateNewPost from "./Components/CreateNewPost";
import PostDetails from "./Components/PostDetails";
import Main from "./Components/Main";
import Category from "./Components/Category";

const logger = store => next => action => {
  console.group(action.type);
  console.info("dispatching", action);
  let result = next(action);
  console.log("next state", store.getState());
  console.groupEnd(action.type);
  return result;
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(thunk, logger))
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Switch>
          <Route exact path="/post/post_new" component={CreateNewPost} />
          <Route exact path="/post/:id" component={PostDetails} />
          <Route exact path="/" component={Main} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider> ,
  document.getElementById("root")
);
registerServiceWorker();
