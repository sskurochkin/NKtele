window.addEventListener('load', function () {
    if (!window.reinit) {
        window.reinit = {};
    }
    if (!window.reinit.slider) {
        window.reinit.slider = {};
    }
    const options = {
        rootMargin: '0px',
        threshold: 0.25
    }


    window.reinit.slider.productSlider = function () {
        let productSlider = $('.js-slider-product');
        if (productSlider[0]){}
        let length = productSlider[0]?.querySelectorAll('.product-card-wrap').length;
        if (productSlider.length) {

            const initSlider = (el) => {
                window.slam_slider({
                    el: el,
                    args: {
                        autoHeight: false,
                        lazy: true,
                        spaceBetween: 20,
                        watchOverflow: true,
                        simulateTouch: true,
                        // slidesPerView: 1,
                        slidesPerView: 'auto',

                        slideClass: 'product-card-wrap',
                        pagination: {
                            el: $(el).find('.js-swiper-pagination'),
                            dynamicBullets: length > 10 ? true : false
                        },

                    }
                })
                $(el).addClass('inited');
            }
            if ($(window).width() < 768) {
                console.log('init')
                initSlider(productSlider);
            }

            productSlider.each(function (i, el) {
                console.log('here')
                const observer = new IntersectionObserver((entries, observer) => {
                    if (entries[0].isIntersecting && entries[0].target.classList.contains('inited') == false) {
                        if ($(window).width() < 768) {
                            console.log('init')
                            initSlider(el);
                        }

                    }
                }, options);
                observer.observe(el);
            });

        }
    };

    window.reinit.slider.productSlider();


    window.reinit.slider.productSliderMain = function () {
        let productSlider = $('.js-slider-product-main');
        let length = productSlider[0]?.querySelectorAll('.product-card-wrap').length;
        if (productSlider.length) {

            const initSlider = (el) => {
                window.slam_slider({
                    el: el,
                    args: {
                        autoHeight: false,
                        lazy: true,
                        spaceBetween: 20,
                        watchOverflow: true,
                        simulateTouch: true,
                        // slidesPerView: 1,
                        slidesPerView: 'auto',

                        slideClass: 'product-card-wrap',
                        pagination: {
                            el: $(el).find('.js-swiper-pagination'),
                            dynamicBullets: length > 10 ? true : false
                        },

                    }
                })
                $(el).addClass('inited');
            }


            initSlider(productSlider);

            // productSlider.each(function (i, el) {
            //     console.log('here')
            //     const observer = new IntersectionObserver((entries, observer) => {
            //         if (entries[0].isIntersecting && entries[0].target.classList.contains('inited') == false) {
            //                 initSlider(el);
            //
            //
            //         }
            //     }, options);
            //     observer.observe(el);
            // });

        }
    };

    window.reinit.slider.productSliderMain();
})