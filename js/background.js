var appUrl = chrome.extension.getURL('../app/dest/index.html');

var appTabId = null;

function doSearch(number) {
    var openUrl = appUrl + '#/' + encodeURIComponent(number);
    if (appTabId !== null) {
        chrome.tabs.update(appTabId, {
            url: openUrl,
            active: true
        });
    } else {
        chrome.tabs.create({
            url: openUrl
        }, function(tab) {
            appTabId = tab.id;
        });
    }
}

chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.create({
        url: appUrl
    }, function(tab) {
        appTabId = tab.id;
    });
});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
    if (info.menuItemId === 'btmagd') {
        doSearch(info.selectionText);
    }
});

chrome.tabs.onRemoved.addListener(function(tabId) {
    if (tabId === appTabId) {
        appTabId = null;
    }
});

chrome.contextMenus.create({
    "title": "使用btmagd搜索 \"%s\"",
    "contexts": ["selection"],
    "id": "btmagd"
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.number) {
        doSearch(request.number);
    }
});