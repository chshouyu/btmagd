import React, { Component } from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { Provider } from 'react-redux';
import { ReduxRouter, reduxReactRouter } from 'redux-router';
import { Route, IndexRoute } from 'react-router';
import createHistory from 'history/lib/createHashHistory';
import rootReducer from './reducers';
import App from './components/App';
import Search from './components/Search';
import Home from './components/Home';

const middlewares = [
    thunkMiddleware
];

if (DEBUG) {
    middlewares.push(createLogger());
}

const store = compose(
    applyMiddleware(...middlewares),
    reduxReactRouter({ createHistory })
)(createStore)(rootReducer);

const rootElement = document.getElementById('container');

render(
    <Provider store={store}>
        <ReduxRouter>
            <Route path="/" component={App}>
                <IndexRoute component={Home} />
                <Route path=":id" component={Search} />
            </Route>
        </ReduxRouter>
    </Provider>,
    rootElement
);