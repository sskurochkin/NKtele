window.addEventListener('load', function () {
    let price = 149.49

    let period = calcPeriod()

    function calc() {
        switch (period) {
            case 1:
                $('.product-card__price-total span:first-child').text(price)
                $('.product-card__price-sale').text(`Save 0%`)
                $('.product-card__price-price').text('$' + price)
                break;

            case 3:
                $('.product-card__price-total span:first-child').text('$' + (price * period * 0.97).toFixed(2))
                $('.product-card__price-sale').text(`Save 3%`)
                $('.product-card__price-price').text('$' + (price * 0.97).toFixed(2))

                break;
            case 6:
                $('.product-card__price-total span:first-child').text('$' + (price * period * 0.95).toFixed(2))
                $('.product-card__price-sale').text(`Save 5%`)
                $('.product-card__price-price').text('$' + (price * 0.95).toFixed(2))

                break;
            case 12:
                $('.product-card__price-total span:first-child').text('$' + (price * period * 0.9).toFixed(2))
                $('.product-card__price-sale').text(`Save 10%`)
                $('.product-card__price-price').text('$' + (price * 0.9).toFixed(2))

                break;


        }

        $('.product-card__price-total span:last-child').text(`${period} month`)

    }
    function calcPeriod(){
        return $('.form-control').val().includes('1 month')
            ? 1
            : $('.form-control').val().includes('3 month')
                ? 3
                : $('.form-control').val().includes('6 month')
                    ? 6
                    : 12
    }
    calc()


    $('.a-select__list-item').on('click', function (e) {
        setTimeout(() => {

            period = calcPeriod()

            calc()


        })

    })


})

