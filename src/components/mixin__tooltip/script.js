window.addEventListener('load', function (event) {

	let tooltip_close_timeout;
	let click_flag;

	let tooltip_close_setTimeout = function (e) {

		tooltip_close_timeout = setTimeout(function () {
			$('[data-toggle="tooltip"]').tooltip && $('[data-toggle="tooltip"]').tooltip('hide');
			clearTimeout(tooltip_close_timeout);
		}, 100)
	};

	let tooltip_close = function () {
		$('[data-toggle="tooltip"]').tooltip && $('[data-toggle="tooltip"]').tooltip('hide');
		// $('[role="tooltip"]').hide();
		$('[role="tooltip"]').remove();
		clearTimeout(tooltip_close_timeout);
	};
	let tooltip_close_clearTimeout = function (e) {
		let $this = $(this);


		if ($('[role="tooltip"]').length > 1) {
			// $('[data-toggle="tooltip"]').tooltip('hide');
			$('[role="tooltip"]').remove();
			$this.tooltip && $this.tooltip('show')
		}
		clearTimeout(tooltip_close_timeout);
	};

	$(document).on('mouseover click', '[role="tooltip"]', tooltip_close_clearTimeout);
	$(document).on('mouseover click', '[data-toggle="tooltip"]', tooltip_close_clearTimeout);
	$(document).on('mouseleave', '[data-toggle="tooltip"]', tooltip_close);

	$(document).on('mouseleave', '[role="tooltip"]', tooltip_close_setTimeout);
	$(document).on('mouseleave', '[data-toggle="tooltip"]', tooltip_close_setTimeout);
	$(document).on('click', '.tooltip-close', tooltip_close);
	$(document).on('inserted.bs.tooltip', '[data-toggle="tooltip"]', function () {
		let $trigger = $(this);
		let tooltip = {
			$el: $('.tooltip'),
			$inner: $('.tooltip-inner'),
			$arrow: $('.tooltip .arrow'),
			data: {
				bg: $trigger.attr('data-background'),
				hover: $trigger.attr('data-hover'),
			}
		};


		if (tooltip.data.bg) {
			tooltip.$inner.attr('style', 'background-color: ' + tooltip.data.bg);
			tooltip.$arrow.attr('style', 'background-color: ' + tooltip.data.bg);
		} else {
			tooltip.$inner.attr('style', '');
			tooltip.$arrow.attr('style', '');
		}

		if (tooltip.data.hover === 'false') {
			tooltip.$el.addClass('tooltip--hover-off')
		}
	});

	!window.reinit && (window.reinit = {});
	window.reinit.tooltip = function () {
		// $('[role="tooltip"]').hide();
		$('[role="tooltip"]').remove();
		$('[data-toggle="tooltip"]').tooltip && $('[data-toggle="tooltip"]').tooltip({
			template: '<div class="tooltip" role="tooltip">' +
				'<div class="arrow">' +
				'</div>' +
				'<div class="tooltip-inner"></div><span class="tooltip-close"></span></div>',
			delay: {
				show: 0,
				hide: 3000
			}
		});
		$('[data-toggle="tooltip"]').tooltip && $('[data-toggle="tooltip"]')
		if ($(window).width() < 768) {
			$('.js-product-thumb[data-toggle="tooltip"]').tooltip('disable')
		}
	};

	window.vendorLoader({
		name: 'tooltip',
		path: 'js/vendor/tooltip.min.js',
		event: {
			scroll: true,
			click: true,
			mouseover: {
				trigger: 'body'
			}
		},
		callback: () => window.reinit.tooltip()
	});
});
