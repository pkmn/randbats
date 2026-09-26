async function load(file) {
	let elm = document.createElement("script");
	elm.src = chrome.runtime.getURL("/" + file);
	await document.body.appendChild(elm);
  console.debug(file);
  return;
};

load("index.js");

chrome.storage.sync.get({
				calc: true,
				typechart: false,
}, async function(options) {
		if (options.calc) {
			await load("data.js");
			await load("calc.js");
			await load("instacalc.js");
		}
		if (options.typechart) await load("typechart.js");
});
