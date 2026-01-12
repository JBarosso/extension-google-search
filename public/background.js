// Service Worker - Background Script
// Opens the side panel when the extension icon is clicked

chrome.action.onClicked.addListener((tab) => {
    if (tab.id) {
        chrome.sidePanel.open({ tabId: tab.id });
    }
});

// Set side panel behavior to open on action click
chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });
