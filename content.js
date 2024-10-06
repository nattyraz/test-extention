console.log("API Analyzer extension is active on this page");

// Écoute les requêtes fetch
const originalFetch = window.fetch;
window.fetch = function(...args) {
  const [resource, config] = args;
  
  // Envoie les détails de la requête au script de fond
  chrome.runtime.sendMessage({
    action: "logApiCall",
    details: {
      url: (typeof resource === 'string') ? resource : resource.url,
      method: (config && config.method) ? config.method : 'GET',
      timestamp: new Date().toISOString(),
      requestBody: (config && config.body) ? config.body : null
    }
  });

  return originalFetch.apply(this, args);
};

// Écoute les requêtes XMLHttpRequest
const originalXhrOpen = XMLHttpRequest.prototype.open;
XMLHttpRequest.prototype.open = function(...args) {
  const [method, url] = args;
  
  this.addEventListener('load', () => {
    chrome.runtime.sendMessage({
      action: "logApiCall",
      details: {
        url: url,
        method: method,
        timestamp: new Date().toISOString(),
        requestBody: this.requestBody
      }
    });
  });

  return originalXhrOpen.apply(this, args);
};