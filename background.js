let apiCalls = [];

chrome.webRequest.onBeforeRequest.addListener(
  (details) => {
    if (details.type === 'xmlhttprequest') {
      apiCalls.push({
        url: details.url,
        method: details.method,
        timestamp: new Date().toISOString(),
        requestBody: details.requestBody
      });
    }
  },
  { urls: ["<all_urls>"] },
  ["requestBody"]
);

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getApiCalls") {
    sendResponse({ apiCalls: apiCalls });
  } else if (request.action === "clearApiCalls") {
    apiCalls = [];
    sendResponse({ message: "API calls cleared" });
  }
});