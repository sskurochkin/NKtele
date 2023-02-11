window.addEventListener('load', function() {

    let scrollTop = 0;
    let headerTopHeight = $('.js-header-top').height() || 0;

    document.documentElement.style.setProperty('--headerStickyHeight', $('.header-sticky__inner').height() + 'px');

    //hide notification and recalculate headerTopHeight for sticky header
    $(document).on('click', '.js-header-notification-close', function() {
        setCoockie('isHeaderNotificationShowed', '1', 86400);
        $(this).closest('.header-notification').slideUp(100);
        setTimeout(() => {
            headerTopHeight = $('.js-header-top').height();
        }, 100)
    })

    const scrollHandler = () => {
        if ($(window).scrollTop() > scrollTop && $(window).scrollTop() > headerTopHeight) {
            document.querySelector(".js-header-sticky").classList.add("header-sticky--sticky");
            document.querySelector(".header-sticky").classList.add("header-min");
        } else {
            document.querySelector(".header-sticky").classList.remove("header-min");
        }
        if ($(window).scrollTop() <= headerTopHeight) {
            document.querySelector(".js-header-sticky").classList.remove("header-sticky--sticky");
        }
        scrollTop = $(window).scrollTop();
    };

    window.addEventListener('scroll', scrollHandler);


    $('.js-show-more-tags').click(function() {
        $(this).closest('.search-results-tags').toggleClass('active');
    })

    $('.header-mobile-search').click(function() {
        $('.header-mid__search').toggleClass('active');
    })

    $('.header-search__input .form-control')[0].addEventListener('focus', function() {
        $('.search-results').addClass('active');
        $('body').addClass('search-active')

        window.reinit.closeCatalog()

    })

    $('.search-results__close').on('click', function(){
        window.reinit.closeSearch()
    })


    $(document).on('click keydown', function (ev) {
        if (ev.key === 'Escape') {
            window.reinit.closeSearch()
            return
        }
        if (
            $(ev.target).hasClass('search-results__inner')
            || $(ev.target).hasClass('header-mid__search')
            || $(ev.target).hasClass('header-mobile-search')
            || $(ev.target).closest('.search-results__inner').length
            || $(ev.target).closest('.header-mid__search').length
            || $(ev.target).closest('.header-mobile-search').length
            || $(ev.target).closest('.cookie-notification').length

        ) return;

        window.reinit.closeSearch()

    })


    window.reinit.closeSearch = function ()  {
        $('.search-results').removeClass('active');
        $('.header-mid__search').removeClass('active');
        $('body').removeClass('search-active');
    }

    window.reinit.closeCatalog = function ()  {
        $('.burger-icon').removeClass('active');
        $('body').removeClass('slam-menu-active');
        $('.js-popup-catalog').removeClass('active');
        $('.header-catalog').removeClass('active');
        $('.header-catalog').removeClass('bg-on');
    }




})