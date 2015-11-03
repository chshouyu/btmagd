import { combineReducers } from 'redux';
import {
    NAME
} from '../actions';

function name(state = 'heihei', action) {
    return action.type === NAME ? 'chen' : state;
}

const rootReducer = combineReducers({
    name
});

export default rootReducer;