const path = require('path');
const os = require('os');
// const safeJsonStringify = require('safe-json-stringify');

	//------path
	// console.log(__dirname, __filename, os.platform(), process.cwd());
	//# /public/files/screenshot.png    C:\public\files\screenshot.png
	//# public/files/screenshot.png     C:\Users\user\Desktop\tttt\puppeteer1\public\files\screenshot.png
	//# __dirname + '/../public/files/screenshot.png'   C:\Users\user\Desktop\tttt\puppeteer1\controllers/../public/files/screenshot.png
	//# process.cwd() + '/public/files/screenshot.png'  C:\Users\user\Desktop\tttt\puppeteer1/public/files/screenshot.png
	//-----url  is  public/*.*  


	if(process.cwd()  == '/') process.chdir('/usr/local/html'); //linux path is /   (win path is ok)
	puInfo = { args: ['--no-sandbox', '--disable-setuid-sandbox'] }
	osname = os.platform();
	if(osname == 'linux'){
		puInfo.executablePath ='/opt/google/chrome/chrome';
	}else if(osname == 'win32'){
		puInfo.headless = false; //(不使用无头chrome模式) 显示执行效果
	}



//GET   =>   html
exports.get = function (req, res, next) {

	res.sendFile(process.cwd() + '/public/screenshot.html');
	console.log(req.query.url, process.cwd() )
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
	let timeout = 20000;
	let savePath =  process.cwd() + '/public/files/screenshot.png';
	// console.log(url, w, h )


	const puppeteer = require('puppeteer');
	(async () => {

		const browser = await puppeteer.launch(puInfo);
		const page = await browser.newPage();
		await page.setViewport({width: w, height: h}); 
		await page.goto(url, {waitUntil: 'networkidle2', timeout: timeout});
		await page.screenshot({path: savePath, fullPage: true});
		await browser.close();

		// res.send('<img src="/screenshot.png" />');
		res.setHeader('Content-Type', 'application/json');
		res.end(JSON.stringify({status: 200, src: '/files/screenshot.png'})); // open console error 

	})();

};


