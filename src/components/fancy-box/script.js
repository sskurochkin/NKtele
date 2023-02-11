window.addEventListener('load', function (event) {

	let fancybox = [];
	let gallery = [];

	window.vendorLoader({
		name: 'fancybox',
		path: 'js/vendor/fancybox.min.js',
		event: {
			scroll: true,
			click: true,
			mouseover: {
				trigger: '.js-fancy'
			}
		},
		callback: function () {

			window.reinit.fancyProduct = () => {

				if (fancybox.length) {
					fancybox.forEach(x => x.destroy());
					fancybox = [];
				}

				if(gallery.length){
					gallery = []
				}


				

				$('.js-slider-product-page .swiper-slide').each(function () {
					const source = $(this).find('.lazy-img-wrap').attr('href');
					gallery.push({
						src: source,
						thumb: source,
					})
				})

				$('.js-slider-product-page .swiper-slide').click(function (ev) {
					ev.preventDefault();
					fancybox.push(Fancybox.show(gallery, {
						dragToClose: false,
						Toolbar: false,
						closeButton: "top",
						Image: {
							zoom: false,
						},
					}))

				})
			}

			window.reinit.fancyProduct();

		}
	});
});
