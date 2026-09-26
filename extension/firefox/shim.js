async function load(file) {
	let elm = document.createElement("script");
	elm.src = browser.runtime.getURL("/" + file);
	await document.body.appendChild(elm);
  console.debug(file);
  return;
};

load("index.js");

browser.storage.sync.get({
				calc: true,
				typechart: false,
}).then(async function(options) {
		if (options.calc) {
			await load("data.js");
			await load("calc.js");
			await load("instacalc.js");
		}
		if (options.typechart) await load("typechart.js");
});
