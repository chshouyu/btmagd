
export function fetch(url) {
    return new Promise(function(resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.onload = function() {
            if (this.status === 200 || this.status === 304) {
                resolve(this.response);
            } else {
                reject('status_error');
            }
        };

        xhr.onerror = function() {
            reject('http_request_error');
        };

        xhr.ontimeout = function() {
            reject('timeout_error');
        };
        xhr.responseType = 'document';
        xhr.timeout = 3000;
        xhr.open('GET', url, true);
        xhr.send(null);
    });
}

export function slice(likeArray, length) {
    return Array.prototype.slice.call(likeArray, length);
}