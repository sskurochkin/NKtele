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


    window.reinit.slider.customersSlider = function () {
        let customersSlider = $('.js-slider-customers');
        let length = customersSlider[0].querySelectorAll('.customers-card-wrap').length;
        if (customersSlider.length) {

            const initSlider = (el) => {
                window.slam_slider({
                    el: el,
                    args: {
                        autoHeight: false,
                        lazy: true,
                        spaceBetween: 30,
                        watchOverflow: true,
                        simulateTouch: true,
                        // slidesPerView: 1,
                        slidesPerView: 'auto',

                        slideClass: 'customers-card-wrap',
                        pagination: {
                            el: $(el).find('.js-swiper-pagination'),
                            dynamicBullets: length > 10 ? true : false
                        },

                    }
                })
                $(el).addClass('inited');
            }

            customersSlider.each(function (i, el) {
                console.log('here')
                const observer = new IntersectionObserver((entries, observer) => {
                    if (entries[0].isIntersecting && entries[0].target.classList.contains('inited') == false) {

                            initSlider(el);


                    }
                }, options);
                observer.observe(el);
            });

        }
    };

    window.reinit.slider.customersSlider();
})