window.addEventListener('load', function (event) {
	// console.log('datepicker-load')
	window.vendorLoader({
		name: 'datepicker',
		path: 'js/vendor/datepicker.min.js',
		event: {
			mouseover: {
				trigger: '.js-form-control--datepicker'
			},
			click: {
				trigger: '.js-form-control--datepicker'
			},
		},
		callback: function () {


			// $.datepicker.regional['ru'] = {
			// 	closeText: 'Закрыть',
			// 	prevText: 'Предыдущий',
			// 	nextText: 'Следующий',
			// 	currentText: 'Сегодня',
			// 	monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
			// 	monthNamesShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
			// 	dayNames: ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'],
			// 	dayNamesShort: ['вск', 'пнд', 'втр', 'срд', 'чтв', 'птн', 'сбт'],
			// 	dayNamesMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
			// 	weekHeader: 'Не',
			// 	dateFormat: 'dd.mm.yy',
			// 	firstDay: 1,
			// 	isRTL: false,
			// 	showMonthAfterYear: false,
			// 	yearSuffix: ''
			// };
			// $.datepicker.setDefaults($.datepicker.regional['ru']);

			window.reinit.reinitDatepicker();
		}
	});
	window.reinit.reinitDatepicker = function () {

		$('.js-form-control--datepicker').each(function (i, el) {

			let initDate = $(el).attr('value');
			let $control = $(el);
			let args = {};

			// if ($control.attr('data-max') === 'now') {
			// 	args.maxDate = new Date();
			// } else {
			// 	args.minDate = new Date();
			// }
			$control.datepicker && $control.datepicker({
				...args,
				defaultDate: +2,
				dateFormat: 'dd.mm.yyyy',
				onSelect: function (a, b, c) {
					let $el = c.$el;
					let $form = $el.closest('.bv-form');

					try {
						$form.data('bootstrapValidator').revalidateField($el);
					} catch (e) {

					}
				},
				onRenderCell: function (date, cellType) {

					let _date = new Date(date);
					let isDisabled = false;
					let date_arr = [
						_date.getDate(),
						_date.getMonth(),
						_date.getFullYear(),
					];


					if (this.disabledDate) {
						$.each(this.disabledDate.split(','), function (i, el) {


							let _dis_date = new Date(`${el.split('.')[1]}.${el.split('.')[0]}.${el.split('.')[2]}`);


							let dis_date_arr = [
								_dis_date.getDate(),
								_dis_date.getMonth(),
								_dis_date.getFullYear(),
							];

							if (dis_date_arr.toString() === date_arr.toString()) {
								isDisabled = true
							}
						});
					}

					return {
						disabled: isDisabled
					}
				}
			});
			if(initDate){
				initDate = initDate.split('.')
				initDate = initDate[1]+'.'+initDate[0]+'.'+initDate[2]
				$control.datepicker().data('datepicker').selectDate(new Date(initDate))
			}
		})


		// console.log('datepicker-init')
		// $('.js-form-control--datepicker').each(function () {



			// const minDate = () => {
			// 	let date = $(this).attr('date-min');
			// 	if (date) {
			// 		date = date.split('.').reverse().join(',');
			// 		return new Date(date)
			// 	}
			// 	return null;
			// }

			// function noSundays(date) {
			// 	return [date.getDay() != 0, ''];
			// }

			// setTimeout(() => {
			// 	const _this = $(this);
			// 	$(this).datepicker({
			// 		minDate: minDate(),
			// 		clearButton: true,
			// 		defaultDate: new Date(),
			// 		dateFormat: 'dd/mm/yy',
			// 		autoClose: true,
			// 		// beforeShowDay: noSundays,
			// 		onSelect: function (a, b, c) {
			// 			$('body').trigger('datapicker-onselect', $(this));
			// 			let $form = _this.closest('.bv-form');
			// 			$form.data('bootstrapValidator').revalidateField($(this));
			// 		}
			// 	})
			// }, 500)


		// });

		// $('.datepicker-input-wrap').click(function () { $(this).find('.form-control--datepicker').focus() })
	}
});