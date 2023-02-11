window.addEventListener('load', function (event) {

	window.reinit.selectTrigger = function () {
		let selTrig = $('.js-select-trigger');
		if (selTrig.length && !selTrig.hasClass('init')) {
			selTrig.each(function () {
				let _this = $(this),
					select = _this.closest('.select'),
					selList = select.find('.select-list'),
					selOption = select.find('.radio-option'),
					radioInt = selList.find('.js-radio-input'),
					title = select.find('.select-head__title');

				_this.on('click', function () {
					if (!select.hasClass('active')) {
						select.addClass('active');
					} else {
						select.removeClass('active');
					}
				});

				$(document).on('click', function (e) {
					if (!select.is(e.target) && select.has(e.target).length === 0) {
						select.removeClass('active');
					}
				});

				radioInt.each(function () {
					let _this = $(this);
					radioInt.on('change', function () {
						if (_this.is(':checked')) {
							// console.log('input changed')
							_this.closest(selOption).addClass('selected');
							_this.siblings(selOption).removeClass('selected');
							let dataVal = _this.data('val');
							title.text(dataVal);
							select.removeClass('active');
							return false;
						} else {
							_this.closest(selOption).removeClass('selected');
						}
					});
				});
			});
			selTrig.addClass('init')
		}

	};

	window.reinit.selectTrigger();



	$('.custom-select').each(function () {
		const select = $(this);
		const form = $(this).closest('.bv-form');

		select.click(function (ev) {
			ev.stopPropagation();
			$('.custom-select').each(function(){
				if($(this)[0] == select[0]) return;
				$(this).removeClass('active');
			})
			$(this).toggleClass('active');
		})
		const selectInput = select.find('.custom-select__input');
		select.find('.custom-select__list-item').click(function (ev) {
			ev.stopPropagation();
			select.removeClass('active');
			select.find('.custom-select__list-item').removeClass('selected');
			$(this).addClass('selected');
			const value = $(this).attr('data-value');
			const text = $(this).text();
			selectInput.val(value);
			select.find('.custom-select__selected').text(text);
			selectInput[0].dispatchEvent(new Event('change', { bubbles: true }));
			if(form.length){
				form.data('bootstrapValidator').revalidateField(selectInput);
			}

		})
	})

	$(document).click(function () {
		$('.custom-select').removeClass('active');
	})


	$('.js-show-pass').each(function () {
		let isHide = false;
		$(this).click(function () {
			if (!isHide) {
				$(this).closest('.password-wrap').find('.form-control').attr('type', 'text');

			} else {
				$(this).closest('.password-wrap').find('.form-control').attr('type', 'password');
			}
			$(this).closest('.password-wrap').find('.password-wrap__show-pass-icon').toggleClass('hidden');
			isHide = !isHide
		})
	})
});