import $ from "jquery";
import 'slick-carousel'; 
let slick = ((e) => { 
    $(".slider-nav").on("init", function (event, slick, currentSlide) {
        document.querySelector('.for_counter .total_slides').innerHTML = slick.slideCount;          
    });
     
    $('.slider-for').slick({
        slidesToShow: 1,         
        arrows: false,
        infinite: false,
        asNavFor: '.slider-nav',
        centerMode: false,
        focusOnSelect: true,
        responsive: [
            {
                breakpoint: 660,
                settings: {                                       
                    arrows: true,
                    appendArrows: $('.wrap_slider_for')
                     
                }
            },
        ]
    });
    $('.slider-nav').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: false,
        arrows: true,
        asNavFor: '.slider-for',         
        centerMode: false,         
        focusOnSelect: true,       
        responsive: [
            {
                breakpoint: 660,
                settings: {
                    slidesToShow: 1,                                       
                    arrows: false,
                    centerMode: true,                     
                    variableWidth: true                     
                }
            },
        ]
    });

    let prev = document.querySelector('.slick-prev');
    let next = document.querySelector('.slick-next');
    document.addEventListener('mouseover', (e)=>{                     
        if (e.target.classList.contains('slick-next') && !e.target.classList.contains('slick-disabled')) {
            prev.classList.add('slick-prev--border_right');
        } else {
            prev.classList.remove('slick-prev--border_right');
        }
        if (e.target.classList.contains('slick-prev') && !e.target.classList.contains('slick-disabled')) {
            next.classList.add('slick-next--border_left');
        } else {
            next.classList.remove('slick-next--border_left');
        }         
    })
      
    let arr = document.querySelectorAll('.slider-nav .slick-slide');     
    $('.slider-nav').on('beforeChange', function (event, slick, currentSlide, nextSlide) {        
        // стилизация активного слайда slider-nav               
        arr[currentSlide].classList.remove('slider-nav-slide--active');
        arr[nextSlide].classList.add('slider-nav-slide--active');         
        // счетчик слайдов
        document.querySelector('.for_counter .slide_current').innerHTML = nextSlide+1;        
    });
    
    // стилизация активного слайда при первом заходе на страницу
    let current = $('.slider-nav').slick('slickCurrentSlide');
    arr[current].classList.add('slider-nav-slide--active');
        
})();

export default slick;