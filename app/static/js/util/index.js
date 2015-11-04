
export function fetch(url) {
    return new Promise(function(resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.onload = function() {
            if (this.status === 200 || this.status === 304) {
                resolve(this.response);
            } else {
                reject('status error');
            }
        };

        xhr.onerror = function() {
            reject('http request error');
        };
        xhr.responseType = 'document';
        xhr.open('GET', url, true);
        xhr.send(null);
    });
}

export function slice(likeArray, length) {
    return Array.prototype.slice.call(likeArray, length);
}