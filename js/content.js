
var host = window.location.host;

function openSearch(e) {
    e.preventDefault();
    chrome.runtime.sendMessage({
        number: this.textContent.trim()
    }, function(response) {});
}

var selector = /avmoo/.test(host) ? '.movie .info p span:nth-child(2)' : '#video_id tbody td:nth-child(2)';

var node = document.querySelector(selector);

node.style.cursor = 'pointer';
node.addEventListener('click', openSearch, false);