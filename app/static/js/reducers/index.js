import { combineReducers } from 'redux';
import { routerStateReducer } from 'redux-router';
import {
    GET_LUCK_WORD,
    SET_LIST,
    SET_LOADING_STATUS,
    SET_MAGNET_LINK,
    SET_ERROR_STATUS
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

function magnetLinks(state = {}, action) {
    if (action.type === SET_MAGNET_LINK) {
        if (action.isEmpty) {
            return {};
        }
        return Object.assign({}, state, {
            [`${action.index}`]: {
                link: action.magnetLink,
                isLoading: action.isLoading
            }
        });
    }
    return state;
}

function errorStatus(state = {}, action) {
    return action.type === SET_ERROR_STATUS ? Object.assign({}, state, {
        errType: action.errType,
        message: action.message
    }) : state;
}

const rootReducer = combineReducers({
    luckWord,
    list,
    isLoading,
    magnetLinks,
    errorStatus,
    router: routerStateReducer
});

export default rootReducer;