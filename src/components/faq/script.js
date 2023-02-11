window.addEventListener('load', function () {

	$('.js-faq-item').click(function(){
		$(this).hasClass('active') ? $(this).find('.faq__slider').slideUp() : $(this).find('.faq__slider').slideDown();
		$(this).toggleClass('active');
	})
})