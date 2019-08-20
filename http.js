const http = require('http')
const path = require('path')
const safeJsonStringify = require('safe-json-stringify');
const express = require('express')
let app = express()

var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: false}))

var autoRoutes = require('express-auto-routes')(app); // you don't need `routes` folder any more
autoRoutes(path.join(__dirname, './controllers')); // auto mounting... done!
//-------controllers/hello/world.js      /// https://www.npmjs.com/package/express-auto-routes    /// controllers/a/b/c/d.js => localhost:8080/a/b/c/d
// exports.get = function (req, res, next) {
// 	 res.send('hello world');
// };
//--------------------------


app.set('env', process.env.NODE_ENV || 'production')// development
app.set('x-powered-by', false)
app.set('trust proxy', false)

app.get('/', (req,res,next)=>{
	res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.get('/other', (req,res,next)=>{
	res.status(200)
    // res.writeHead(200, { "Content-Type":"text/html;characterset=utf8" });
    // res.write(JSON.stringify(res, null, '\t'));  // '\t' or 4   //error
    data = {req, res, next}
	res.write(safeJsonStringify(data, null, '\t')); // '\t' or 4
	res.end()
});


// app.get('/screenshot', (req,res,next)=>{
// 	res.sendFile(path.join(__dirname + '/public/screenshot.html'));
// });
// app.post('/screenshot', (req,res,next)=>{
// 	console.log(req.body || req.query);
// });


// router = express.Router();
// router.route('/login').post(         //이 경로로 들어오는 것은 post 방식으로 처리

// );



app.use(express.static(__dirname + '/public')); //static dir

//----run server 
const PORT = 80
let httpServer = http.createServer(app)
httpServer.listen(PORT, function () {
	console.log('[Http] Started.', PORT)
})

