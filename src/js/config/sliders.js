export default {
    main: {
        slidesPerView: 1,
        loop: true,
        lazy: true,
        navigation: {
            nextEl: '.js-main-slider .js-next-btn',
            prevEl: '.js-main-slider .js-prev-btn',
            disabledClass: 'disabled',
        },
        pagination: {
            el: '.js-main-slider .swiper-pagination',
            type: 'bullets',
            clickable: true,
        }
    },
}