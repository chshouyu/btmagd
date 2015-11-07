import { fetch, slice } from '../util';

export const GET_LUCK_WORD = 'GET_LUCK_WORD';
export const SET_LIST = 'SET_LIST';
export const SET_LOADING_STATUS = 'SET_LOADING_STATUS';
export const SET_MAGNET_LINK = 'SET_MAGNET_LINK';
export const SET_ERROR_STATUS = 'SET_ERROR_STATUS';
export const GET_PAGER = 'GET_PAGER';

export function setLoadingStatus(status) {
    return {
        type: SET_LOADING_STATUS,
        status
    };
}

function luckWord(word) {
    return {
        type: GET_LUCK_WORD,
        word
    };
}

function setList(list) {
    return {
        type: SET_LIST,
        list
    };
}

function processWordDocument(respDocument) {
    let words = slice(respDocument.querySelectorAll('.tags-box a'))
                    .map((aNode) => aNode.textContent.replace(/^\d+\./, ''))
                    .filter((text) => /^[A-Z]+\-\d+$/.test(text));
    let randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
}

function processRow(row) {
    let linkNode = row.querySelector('a');
    let link = linkNode.href;
    let title = linkNode.title;
    let size = row.querySelector('.size').textContent;
    let date = row.querySelector('.date').textContent;
    return {
        link,
        title,
        size,
        date
    };
}

function processListDocument(respDocument) {
    let list = slice(respDocument.querySelectorAll('.data-list .row'), 1)
                    .map((row) => processRow(row));
    return list;
}

function processPager(respDocument) {
    let paginationNode = respDocument.querySelector('.pagination');
    if (!paginationNode) {
        return [];
    }
    return slice(paginationNode.querySelectorAll('li a')).map((aNode) => aNode.textContent).filter((text) => /^\d+$/.test(text));
}

export function getLuckWord() {
    return (dispatch, getState) => {
        return fetch(`http://www.bt2mag.com/search`).then(function(resp) {
            let word = processWordDocument(resp);
            dispatch(luckWord(word));
            return word;
        });
    };
}

export function doSearch(keyword, page = 1) {
    return (dispatch, getState) => {
        dispatch(setLoadingStatus(true));
        dispatch(setList([]));
        dispatch(setMagnetLink(null, null, true, false));
        return fetch(`http://www.bt2mag.com/search/${encodeURIComponent(keyword)}/currentPage/${page}`).then(function(resp) {
            let list = processListDocument(resp);
            let pager = processPager(resp);
            dispatch(setList(list));
            dispatch(setPager(pager));
            dispatch(setLoadingStatus(false));
            dispatch(setErrorStatus({
                errType: ''
            }));
            return list;
        }, function(errorMsg) {
            if (errorMsg === 'timeout_error') {
                dispatch(setErrorStatus({
                    errType: errorMsg,
                    message: '请求超时'
                }));
            }
            dispatch(setPager([]));
            dispatch(setLoadingStatus(false));
        });
    };
}

function setMagnetLink(index, magnetLink, isEmpty, isLoading) {
    return {
        type: SET_MAGNET_LINK,
        index,
        magnetLink,
        isEmpty,
        isLoading
    };
}

export function getMagnetLink(index, link) {
    return (dispatch, getState) => {
        dispatch(setMagnetLink(index, null, false, true));
        return fetch(link).then(function(resp) {
            dispatch(setMagnetLink(index, resp.querySelector('#magnetLink').textContent, false, false));
        });
    };
}

export function setErrorStatus({errType, message}) {
    return {
        type: SET_ERROR_STATUS,
        errType,
        message
    };
}

function setPager(pager) {
    return {
        type: GET_PAGER,
        pager
    };
}
