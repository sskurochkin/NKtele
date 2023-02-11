window.addEventListener('load', () => {
	const vigetWrap = $('.pages-viget');
	const vigetBtn = $('.pages-viget__btn');
	const buildAll = $('.pages-viget__build-all');

	vigetBtn.on('click', function() {
		vigetWrap.toggleClass('open');
	});

	if(___browserSync___){
		buildAll.removeClass('hidden')
		buildAll.on('click', function() {
			___browserSync___.socket.emit('build_all')
		});
	}



	$(document).on('click', function(e) {
		if (!$(e.target).closest(vigetWrap).length) {
			vigetWrap.removeClass('open');
		}
		e.stopPropagation();
	});


})