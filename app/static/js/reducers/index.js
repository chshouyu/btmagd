import { combineReducers } from 'redux';
import { routerStateReducer } from 'redux-router';
import {
  GET_LUCK_WORD,
  SET_LIST,
  EMPTY_LIST,
  SET_LOADING_STATUS,
  SET_MAGNET_LINK,
  EMPTY_MAGNET_LINK,
  SET_ERROR_STATUS,
  SET_PAGER
} from '../actions';

function luckWord(state = '', action) {
  return action.type === GET_LUCK_WORD ? action.word : state;
}

function list(state = [], action) {
  switch (action.type) {
    case SET_LIST:
      return [...action.list];
    case EMPTY_LIST:
      return [];
    default:
      return state;
  }
}

function isLoading(state = false, action) {
  return action.type === SET_LOADING_STATUS ? action.status : state;
}

function magnetLinks(state = {}, action) {
  switch (action.type) {
    case EMPTY_MAGNET_LINK:
      return {};
    case SET_MAGNET_LINK:
      return Object.assign({}, state, {
        [`${action.index}`]: {
          link: action.magnetLink,
          isLoading: action.isLoading,
          isError: action.isError
        }
      });
    default:
      return state;
  }
}

function errorStatus(state = {}, action) {
  return action.type === SET_ERROR_STATUS ? Object.assign({}, state, {
    errType: action.errType,
    message: action.message
  }) : state;
}

function pager(state = [], action) {
  return action.type === SET_PAGER ? [...action.pager] : state;
}

const rootReducer = combineReducers({
  luckWord,
  list,
  isLoading,
  magnetLinks,
  errorStatus,
  pager,
  router: routerStateReducer
});

export default rootReducer;