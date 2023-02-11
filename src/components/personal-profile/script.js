window.addEventListener('load', () => {
	$('.js-show-pass-panel').click(function () {
		$(this).addClass('hidden')
		$('.personal-password__inner').removeClass('hidden')
	})
})