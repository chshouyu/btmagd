
chrome.browserAction.onClicked.addListener(function(tab) {
    var appUrl = chrome.extension.getURL('../app/index.html');
    chrome.tabs.create({
        url: appUrl
    });
});