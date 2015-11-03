import { combineReducers } from 'redux';
import { routerStateReducer } from 'redux-router';
import {
    NAME
} from '../actions';

function name(state = 'heihei', action) {
    return action.type === NAME ? 'chen' : state;
}

const rootReducer = combineReducers({
    name,
    router: routerStateReducer
});

export default rootReducer;