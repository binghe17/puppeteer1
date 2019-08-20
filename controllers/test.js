const path = require('path');

exports.get = function (req, res, next) {
	res.sendFile(path.join(__dirname + '/../public/test.html'));
};