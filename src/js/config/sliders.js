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

    projects: {
        slidesPerView: 1,
        spaceBetween: 20,
        navigation: {
            nextEl: '.js-projects-slider .js-next-btn',
            prevEl: '.js-projects-slider .js-prev-btn',
            disabledClass: 'disabled',
        },
        breakpoints: {
            768: {
                slidesPerView: 2,
            },
            992: {
                slidesPerView: 3,
            }
        }
    },
}