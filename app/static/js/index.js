import React, { Component } from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { Provider } from 'react-redux';
import rootReducer from './reducers';
import App from './components/App';

const middlewares = [
    thunkMiddleware
];

if (DEBUG) {
    middlewares.push(createLogger());
}

const createStoreWithMiddleware = applyMiddleware.apply(null, middlewares)(createStore);

const store = createStoreWithMiddleware(rootReducer);

const rootElement = document.getElementById('container');

render(
    <Provider store={store}>
        <App />
    </Provider>,
    rootElement
);