import { combineReducers } from 'redux';
import { routerStateReducer } from 'redux-router';
import {
    GET_LUCK_WORD,
    SET_LIST,
    SET_LOADING_STATUS
} from '../actions';

function luckWord(state = '', action) {
    return action.type === GET_LUCK_WORD ? action.word : state;
}

function list(state = [], action) {
    return action.type === SET_LIST ? [...action.list] : state;
}

function isLoading(state = false, action) {
    return action.type === SET_LOADING_STATUS ? action.status : state;
}

const rootReducer = combineReducers({
    luckWord,
    list,
    isLoading,
    router: routerStateReducer
});

export default rootReducer;