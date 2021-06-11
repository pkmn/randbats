var script = document.createElement('script');
script.src = chrome.runtime.getURL('/index.js');
document.body.appendChild(script);