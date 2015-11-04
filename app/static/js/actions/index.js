import { fetch, slice } from '../util';

export const NAME = 'NAME';
export const GET_LUCK_WORD = 'GET_LUCK_WORD';
export const SET_LIST = 'SET_LIST';
export const SET_LOADING_STATUS = 'SET_LOADING_STATUS';

export function setName(name) {
    return {
        type: NAME,
        name
    };
}

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

export function getLuckWord() {
    return (dispatch, getState) => {
        return fetch(`http://www.bt2mag.com/search`).then(function(resp) {
            let word = processWordDocument(resp);
            dispatch(luckWord(word));
            return word;
        });
    };
}

export function doSearch(keyword) {
    return (dispatch, getState) => {
        dispatch(setLoadingStatus(true));
        dispatch(setList([]));
        return fetch(`http://www.bt2mag.com/search/${encodeURIComponent(keyword)}`).then(function(resp) {
            let list = processListDocument(resp);
            dispatch(setList(list));
            dispatch(setLoadingStatus(false));
            return list;
        }, function(error) {
            dispatch(setLoadingStatus(false));
        });
    };
}



