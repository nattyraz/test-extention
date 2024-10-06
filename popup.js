function updateApiList() {
  chrome.runtime.sendMessage({ action: "getApiCalls" }, (response) => {
    const apiList = document.getElementById('apiList');
    apiList.innerHTML = '';
    response.apiCalls.forEach(call => {
      const li = document.createElement('li');
      li.innerHTML = `
        <span class="method">${call.method}</span>
        <span class="url">${call.url}</span>
        <br>
        <small>${new Date(call.timestamp).toLocaleString()}</small>
      `;
      apiList.appendChild(li);
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  updateApiList();

  document.getElementById('clearButton').addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: "clearApiCalls" }, (response) => {
      if (response.message === "API calls cleared") {
        updateApiList();
      }
    });
  });
});