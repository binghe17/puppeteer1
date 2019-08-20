const path = require('path');
const safeJsonStringify = require('safe-json-stringify');

//GET   =>   html
exports.get = function (req, res, next) {
	res.sendFile(path.join(__dirname + '/../public/screenshot.html'));
	// console.log(req.query.url)
};


//POST   =>  json
exports.post = function (req, res, next) {
	var params = req.body || req.query;
	// console.log(params)
	// res.writeHead(200, { "Content-Type":"application/json" });
	// // data = [req, res, next]
	// // res.write(safeJsonStringify(data, null, '\t')); // '\t' or 4
	// res.end();

	let url = params.url || 'https://naver.com';
	let w = params.w || 1280;
	let h = params.h || 768;
	let timeout = 100000;
	let savePath = 'public/screenshot.png';
	// console.log(url, w, h )
	const puppeteer = require('puppeteer');

	(async () => {
		const browser = await puppeteer.launch({
			// headless: false,//不使用无头chrome模式
			// executablePath:'/opt/google/chrome/chrome',
			args: ['--no-sandbox', '--disable-setuid-sandbox']
		});
		const page = await browser.newPage();
		await page.setViewport({width: w, height: h}); 
		await page.goto(url, {waitUntil: 'networkidle2', timeout: timeout});
		await page.screenshot({path: savePath});
		await browser.close();

		// res.send('<img src="/screenshot.png" />');
		res.setHeader('Content-Type', 'application/json');
		res.end(JSON.stringify({status: 200, src: '/screenshot.png'})); // open console error 

	})();
};


