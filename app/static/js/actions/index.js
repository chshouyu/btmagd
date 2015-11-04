import { fetch } from '../util';

export const NAME = 'NAME';
export const GET_LUCK_WORD = 'GET_LUCK_WORD';

export function setName(name) {
    return {
        type: NAME,
        name
    };
}

function luckWord(word) {
    return {
        type: GET_LUCK_WORD,
        word
    };
}

function processWordDocument(respDocument) {
    let words = Array.prototype.slice.call(respDocument.querySelectorAll('.tags-box a'))
                    .map((aNode) => aNode.textContent.replace(/^\d+\./, ''))
                    .filter((text) => /^[A-Z]+\-\d+$/.test(text));
    let randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
}

export function getLuckWord() {
    return (dispatch, getState) => {
        return fetch('http://www.bt2mag.com/search').then(function(resp) {
            let word = processWordDocument(resp);
            dispatch(luckWord(word));
            return word;
        });
    };
}