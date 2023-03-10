const { distPath } = require('../options');
const imagemin = require('imagemin');
const imageminJpegtran = require('imagemin-jpegtran');
const imageminPngquant = require('imagemin-pngquant');


(async function() {
    const files = await imagemin(['../src/assets/images/*.{jpg,png}'], {
        destination: '..'+distPath+'images/opt/',
        plugins: [
            imageminJpegtran(),
            imageminPngquant({
                quality: [0.6, 0.8]
            })
        ]
    });
    console.log(files);
})();