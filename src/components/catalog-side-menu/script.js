window.addEventListener('load', function (event) {

	$('.js-mobile-filter').click(function () {
		$('.sidebar-filter').addClass('active');
		$('body').addClass('menu-opened');
	})

	$('.sidebar-filter__close .icon').click(function () {
		$('.sidebar-filter').removeClass('active');
		$('body').removeClass('menu-opened');
	});


    (() => {
        console.log(1)
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
        document.documentElement.style.setProperty('--headerHeight', `${$('header').height()}px`);
    })();


    $(document).on('click keydown', function (ev) {
        if (ev.key === 'Escape') {
            $('.sidebar-filter').removeClass('active');
            $('body').removeClass('menu-opened');
            return
        }
        if (
            $(ev.target).hasClass('sidebar-filter')
            || $(ev.target).closest('.sidebar-filter').length
            || $(ev.target).closest('.mobile-filter-button').length
            || $(ev.target).hasClass('.js-mobile-filter')
            || $(ev.target).closest('.cookie-notification').length

        ) return;
        $('.sidebar-filter').removeClass('active');
        $('body').removeClass('menu-opened');
    })



	$(document).on('click', '.sidebar-filter__item.expanded .sidebar-filter__head', function () {
		$(this).closest('.sidebar-filter__item').toggleClass('active');
	})
});