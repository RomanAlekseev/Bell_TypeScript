import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import createHistory from 'history/createBrowserHistory';
import {Router} from 'react-router-dom';
import {AppContainer} from "./containers/AppContainer";
import thunkMiddleware from 'redux-thunk';
import {createStore, applyMiddleware, compose} from 'redux';
import reducer from "./reducers/rootReducer";

const history = createHistory();
const middleware = [thunkMiddleware];

declare global {
    interface Window { __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any; }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(applyMiddleware(...middleware)));

const rootElement = document.getElementById("root");

ReactDOM.render(
  <Provider store={store}>
      <Router history={history}>
          <AppContainer/>
      </Router>
  </Provider>,
  rootElement
);
