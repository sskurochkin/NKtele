const pug = require('pug');
const {distPath} = require('../options');

module.exports = function (page, callback) {
	try {
		const render = pug.renderFile(`./src/pages/${page}/${page}.pug`, { pretty: true, distPath});
		callback(null, render);
	} catch (err) {
		console.log('ERROR =>>>>', err);
		callback(err, null);
	}

}