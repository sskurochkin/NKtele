
window.addEventListener('load', function () {

    $('.nav--personal a').on('click touch', function (e) {
        e.preventDefault()
        let $this = $(this),
            sectionId = $this.attr('href'),
            headerHeight = $('header').innerHeight(),
            topDot = Number($(sectionId).offset().top) - headerHeight;
        $('.nav--personal .nav-item').removeClass('active')
        $($this.closest('.nav-item')).addClass('active')

        $('html,body').stop().animate({scrollTop: topDot}, 'slow', 'linear');
    })
})

