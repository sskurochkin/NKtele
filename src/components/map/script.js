window.addEventListener('load', function (event) {

	!window.reinit && (window.reinit = {});

	let isLibLoaded = false

	window.reinit.map = async (conf) => {

		return new Promise(async(res, rej) => {
			let map = undefined;

			const {
				container = 'map',
				baloonSizeWidth,
				baloonSizeHeight,
				zoom,
				coords
			} = conf;

			const [initLat, initLon] = coords[0];

			let isMapInited = false;
			if (!isMapInited) {
				isMapInited = true;
				await new Promise((resolve, reject) => {
					if(!isLibLoaded){
						$.getScript({
							url: 'https://api-maps.yandex.ru/2.1/?apikey=AQAAAABYwOCAVM1bfnx9nsHU_xs6Z_Sf_lK8k&lang=ru_RU',
							dataType: "script",
							success: () => {
								isLibLoaded = true;
								resolve();
							}
						})
					}else{
						resolve();
					}

				})

				const createPlacemark = (lat, lon) => {
					var myPlacemark = new ymaps.Placemark([lat, lon], {}, {
						balloonShadow: false,
						balloonPanelMaxMapArea: 0,
						balloonOffset: [0, -baloonSizeWidth],
						iconLayout: 'default#image',
						// Своё изображение иконки метки.
						iconImageHref: '/local/templates/html/images/map-mark.svg',
						// Размеры метки.
						iconImageSize: [baloonSizeWidth, baloonSizeHeight],
						// Смещение левого верхнего угла иконки относительно
						// её "ножки" (точки привязки).
						iconImageOffset: [-baloonSizeWidth / 2, -baloonSizeHeight]
					});

					return myPlacemark
				}

				function init() {
					// Создание карты.
					map = new ymaps.Map(container, {
						center: [initLat, initLon],
						// от 0 (весь мир) до 19.
						zoom: zoom
					});
					coords.forEach((x) => {
						const [lat, long] = x;
						map.geoObjects.add(createPlacemark(lat, long));
					})
					$('.js-map').removeClass('preloader');
					res(map);
				}

				await ymaps.ready(init)
			}
		})


	}
})