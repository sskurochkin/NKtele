window.addEventListener('load', function (event) {

	const [initLat, initLon] = $('.js-map').first().attr('data-geo').split(',');

	window.reinit.map({
		baloonSizeWidth: 48,
		baloonSizeHeight: 64,
		zoom: 17,
		coords: [
			[
				initLat, initLon
			]
		]
	})
})  