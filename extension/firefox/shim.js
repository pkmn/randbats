var script = document.createElement('script');
script.src = browser.runtime.getURL('/index.js');
document.body.appendChild(script);