(function() {
  const originalFetch = window.fetch;
  const originalXHR = window.XMLHttpRequest.prototype.open;

  window.fetch = async function(...args) {
    const [url, options] = args;
    const response = await originalFetch.apply(this, args);
    
    window.postMessage({
      type: 'apiCall',
      call: {
        url,
        method: options?.method || 'GET',
        type: 'fetch',
        headers: options?.headers,
        body: options?.body
      }
    }, '*');

    return response;
  };

  window.XMLHttpRequest.prototype.open = function(...args) {
    const [method, url] = args;
    
    this.addEventListener('load', function() {
      window.postMessage({
        type: 'apiCall',
        call: {
          url,
          method,
          type: 'xhr',
          headers: this.getAllResponseHeaders(),
          body: this.responseText
        }
      }, '*');
    });

    return originalXHR.apply(this, args);
  };
})();