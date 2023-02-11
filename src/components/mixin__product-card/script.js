
window.addEventListener('load', function () {
	window.reinit.productItemCarousel = function () {


		let dots = $('.js-product-carousel');

		dots.on('mouseenter', '.product-card__carousel_control', function () {
			let _this = $(this),
				_thisIndex = _this.index(),
				_thisParent = _this.closest('.product-card__carousel-items');
			_thisParent.find('.product-card__img-carousel').removeClass('active');
			_thisParent.find('.product-card__img-carousel').eq(_thisIndex).addClass('active');
		});

	};

	window.reinit.productItemCarousel();

})