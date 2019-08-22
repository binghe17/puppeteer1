const path = require('path');

//GET   =>   html
exports.get = function (req, res, next) {
	res.sendFile(path.join(__dirname + '/../public/nshopreview.html'));
	// console.log(req.query.url)
};


//POST   =>  json
exports.post = function (req, res, next) {
    var param = req.body || req.query;
    console.log(param)





    const puppeteer = require('puppeteer');
    
    (async () => {
        // console.log('-----------start')
    
        const gotoUrl = param.url || 'https://papago.naver.com/';
        const userAgent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1';
        const launchConf = {
            // headless: false, //false is show
            // executablePath:'/opt/google/chrome/chrome',
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        }

    
        const browser = await puppeteer.launch(launchConf);
        const page = await browser.newPage();
        await page.setUserAgent(userAgent);
        await page.setViewport({ width:1280, height:768 });
        await page.goto(gotoUrl, { waitUntil: 'networkidle2' });
        // await page.waitFor(2000); //delay time    //(시간을 잘못 조절하면 결과도 달라진다)
        // await page.type('#txtSource','Hello World', {delay: 100} );
        // await page.waitFor(2000);
    
        //-----run in browser
        // const dimensions = await page.evaluate(() => {
        //     return {
        //       width: document.documentElement.clientWidth,
        //       height: document.documentElement.clientHeight,
        //       deviceScaleFactor: window.devicePixelRatio
        //     };
        //   });
        // console.log('Dimensions:', dimensions )   //Dimensions: { width: 800, height: 600, deviceScaleFactor: 1 }
    
    
        //----
        // let outhtml = await page.$eval('body', e => e.outerHTML);
        // console.log(outhtml)
    
        // const result = await page.content(); //all response data
        // console.log(result)
    
        // let rs = await page.$eval('#txtTarget', e => e.innerHTML);
        // console.log(rs);
    
    
    
    
    
    
        //----keyboard
        // await page.keyboard.type('Hello World!');
        // await page.keyboard.press('ArrowLeft');
        // await page.keyboard.down('Shift');
        // for (let i = 0; i < ' World'.length; i++) await page.keyboard.press('ArrowLeft');
        // await page.keyboard.up('Shift');
        // await page.keyboard.press('Backspace'); // 结果字符串最终为 'Hello!'
    
        // await page.keyboard.down('Shift');
        // await page.keyboard.press('KeyA');
        // await page.keyboard.up('Shift'); // A 
    
    
        //----mouse
        // await page.mouse.click(0, 0);
        // await page.mouse.move(0, 0);
        // await page.mouse.down();
        // await page.mouse.up();
    
    
    
    

        //------save pdf
        await page.emulateMedia('screen')
        await page.pdf({path: 'public/nshopreview.pdf'});
    


        res.setHeader('Content-Type', 'application/json');
		res.end(JSON.stringify({status: 200, datas: rs })); // open console error 

    
        await browser.close();
        // console.log('-----------end')
    })();







};




