$(document).ready(function () {

  $('.card-slider').slick({
    dots: false,
    arrows: false,
    infinite: false,
    speed: 250,
    slidesToShow: 1.3,
    slidesToScroll: 1,
    mobileFirst: true,
    focusOnSelect: true,
    touchThreshold: 50,
    responsive: [{
      breakpoint: 639,
      settings: {
        slidesToShow: 3,
      },
    }],
  });

  // TODO: don't allow to slide to the last slide. This code only triggers when swiping to the right again
  // $('.card-slider').on('afterChange', function () {
  //   let currentSlide = $('.card-slider').slick('slickCurrentSlide');
  //   if (currentSlide == 3) {
  //     console.log('swipe left programmatically');
  //     $('.card-slider').slick('slickPrev');
  //   } else {
  //     console.log('chilling');
  //   }
  // });

});

/*
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
*/