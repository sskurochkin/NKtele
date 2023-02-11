window.addEventListener('load', function (event) {


	$('.js-show-more').click(function () {
		$(this).toggleClass('active')
		$('.js-paragraph').toggleClass('active');
		if ($(this).hasClass('active') && $(this).find('span').text() === 'Развернуть') {
			$(this).find('span').text('Свернуть')
		} else if($(this).find('span').text() === 'Свернуть'){
			$(this).find('span').text('Развернуть')
		}
	})

});

