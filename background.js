let activeTab = null;
let startTime = null;
let timeData = {};

chrome.tabs.onActivated.addListener(async (activeInfo) => {
    if (activeTab) {
        const spent = Date.now() - startTime;
        const domain = new URL(activeTab.url).hostname;
        timeData[domain] = (timeData[domain] || 0) + spent;
        chrome.storage.local.set({ timeData });
    }
    const tab = await chrome.tabs.get(activeInfo.tabId);
    activeTab = tab;
    startTime = Date.now();
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (tab.active && changeInfo.url) {
        const spent = Date.now() - startTime;
        const domain = new URL(activeTab.url).hostname;
        timeData[domain] = (timeData[domain] || 0) + spent;
        chrome.storage.local.set({ timeData });
        activeTab = tab;
        startTime = Date.now();
    }
});
