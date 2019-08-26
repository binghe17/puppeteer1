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
        console.log(gotoUrl)
        //const userAgent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1';
        const launchConf = {
            // headless: false, //false is show
            // executablePath:'/opt/google/chrome/chrome',
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        }

    
        const browser = await puppeteer.launch(launchConf);
        const page = await browser.newPage();
        //await page.setUserAgent(userAgent);
        await page.setViewport({ width:1280, height:768 });
        await page.goto(gotoUrl, { waitUntil: 'networkidle2' });


        page.on('console', msg => console.log('PAGE LOG:', msg.text()));

        //-----run in browser
        var result = await page.evaluate(async() => {
            let lastPageInfo =  $('#_review_paging a:last()').attr('onclick').match(/\d+/);
            var lastPageNum = Number(lastPageInfo[0]);
            var rs = [];
            rs.push(['brand','id','date']);
            if(lastPageNum >= 1){
                for (let m = 1; m <= lastPageNum; m++) {
                    console.log('======'+ m)
                    if(m > 1){
                        shop.detail.ReviewHandler.page(m, '_review_paging'); 
                        await awaitFor(380)
                    }
                    $('#_review_list > li').each(function(i, v){
                        let range1 = $(v).find('div.avg_area > span ');
                        let info = [
                            range1.find(':nth-child(1)').html(),
                            range1.find(':nth-child(2)').html(),
                            range1.find(':nth-child(3)').html()
                        ]
                        rs.push(info)
                    })
                }
                return rs;
            }

            //延时执行
            async function awaitFor(time=1000){
                await new Promise(resolve => { setTimeout(resolve, time); });
            }
            // await awaitFor(1000)
        }); 

        console.log('rs:', result )   //Dimensions: { width: 800, height: 600, deviceScaleFactor: 1 }
    


        //------------延迟执行
        // await page.waitFor(4000)
        // var result = await page.evaluate(async() => {
            // console.log('1111111')
            // await new Promise(function(resolve) { 
            //     setTimeout(resolve, 1000)
            //     console.log('222222')
            // });
            // console.log('33333333')
            // // awaitRun(()=>{
            // //     console.log('44444-----')
            // // }, 1000)
            // // await new Promise(function(resolve) { 
            // //     setTimeout(resolve, 1000)
            // //     console.log('444444')
            // // });
            // await awaitFor(1000)
            // console.log('4444444++++++')
            // await awaitFor(1000)
            // console.log('4444444++++++')
            // await awaitFor(1000)
            // console.log('4444444++++++')

            // console.log('55555555')
            // return '77777777'
        // }); 
    

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
        // await page.emulateMedia('screen')
        // await page.pdf({path: 'public/nshopreview.pdf'});
    


        res.setHeader('Content-Type', 'application/json');
		res.end(JSON.stringify({status: 200, datas: result })); // open console error 

    
        await browser.close();
        // console.log('-----------end')
    })();







};




