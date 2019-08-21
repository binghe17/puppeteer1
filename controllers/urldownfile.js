const path = require('path');

//GET   =>   html
exports.get = function (req, res, next) {
	res.sendFile(path.join(__dirname + '/../public/urldownfile.html'));
	// console.log(req.query.url)
};


//POST   =>  json
exports.post = function (req, res, next) {
    var param = req.body || req.query;
    var data = JSON.parse(param.data);
    console.log(data)


    // const imageDownloader = require('node-image-downloader')
    const imageDownloader = require('../lib/image-downloader')
    imageDownloader({
        // imgs: [
        //     {
        //         uri: 'https://scontent-icn1-1.cdninstagram.com/vp/0e4a88416dfe24cdc5747f1be5768fea/5E100C2F/t51.2885-15/e35/66487376_379703322746665_707429400672456346_n.jpg?_nc_ht=scontent-icn1-1.cdninstagram.com',
        //         filename: 'insta.jpg'
        //     },
        //     {
        //         uri: 'https://naver.com',
        //         filename: 'naver'
        //     },
        //     {
        //         uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlHRWOSZqgG8_mrQ6BZUI0kFDhPAWFRYWrrdRAEYJ73-IAydKh',
        //         filename: 'image2'
        //     },
        //     {
        //         uri: 'https://noduslabs.com/wp-content/uploads/2015/07/connected-topics-clusters-text-network-analysis.jpg',
        //         filename: 'my-image-file-name'
        //     },
        //     {
        //         uri: 'https://svgsilh.com/svg/1299039.svg'
        //     },
        //     {
        //         uri: 'https://i.pinimg.com/originals/8f/a1/f1/8fa1f135870be89ce76c28f8bf9207d2.gif'
        //     }
        // ],
        imgs: data,
        dest: 'public/files', //destination folder
    })
    .then((info) => {
        console.log('all done', info)
        if(info.length > 0 ){
            for (let i = 0; i < info.length; i++) {
                // console.log(info[i].path)
                info[i].path = info[i].path.replace(/\\/g,'\/').replace('public/', '');
            }
        }
        res.setHeader('Content-Type', 'application/json');
		res.end(JSON.stringify({status: 200, datas: info })); // open console error 
    })
    .catch((error, response, body) => {
        console.log('something goes bad!', error)
        res.setHeader('Content-Type', 'application/json');
		res.end(JSON.stringify({error: true, msg:'something goes bad!' })); 
        
    })


};




