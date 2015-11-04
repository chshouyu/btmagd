import { combineReducers } from 'redux';
import { routerStateReducer } from 'redux-router';
import {
    NAME,
    GET_LUCK_WORD
} from '../actions';

function name(state = 'heihei', action) {
    return action.type === NAME ? 'chen' : state;
}

function luckWord(state = '', action) {
    return action.type === GET_LUCK_WORD ? action.word : state;
}

const rootReducer = combineReducers({
    name,
    luckWord,
    router: routerStateReducer
});

export default rootReducer;