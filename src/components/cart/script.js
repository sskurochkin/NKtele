window.addEventListener('load', function (event) {

	$('.radio-delivery input').change(function () {
		if ($(this).prop('checked')) {
			const id = $(this).attr("data-delivery-radio-id");
			$(`[data-delivery-content-id]`).removeClass('active');
			$(`[data-delivery-content-id="${id}"]`).addClass('active');
		}
	});


	$('.cart-form__select-mobile label').click(function () {
		$(this).closest('.cart-form__block').find('.cart-form__row').toggleClass('active');
		$(this).closest('.cart-form__block').find('.cart-form__select-mobile-trigger').toggleClass('active');
		$(this).closest('.cart-form__block').toggleClass('shadow')
	});

	$('.cart-checkout__promo').click(function () {
		$(this).addClass('hidden');
		$('.cart-checkout__promo-input').removeClass('hidden');
		$('.cart-checkout__promo-list').removeClass('hidden');
	});



		(() => {
			$('.cart-checkout__promo-input input').on('input', function () {
				if ($(this).val()) {
					$('.cart-checkout__promo-input .js-promo-submit').removeClass('disabled');
				} else {
					$('.cart-checkout__promo-input .js-promo-submit').addClass('disabled');
				}
			})
		})();

});