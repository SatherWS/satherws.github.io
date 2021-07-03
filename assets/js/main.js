(function($) {
  
  "use strict";  

  $(window).on('load', function() {

  /*Page Loader active
  ========================================================*/
  // Not necessary until we have dynamic content
  //$('#preloader').fadeOut();

  // Sticky Nav [not in use, since nav isn't sticky]
    $(window).on('scroll', function() {
        if ($(window).scrollTop() > 100) {
            $('.scrolling-navbar').addClass('top-nav-collapse');
        } else {
            $('.scrolling-navbar').removeClass('top-nav-collapse');
        }
    });

    /* Auto Close Responsive Navbar on Click
    ========================================================*/
    function close_toggle() {
        if ($(window).width() <= 768) {
            $('.navbar-collapse a').on('click', function () {
                $('.navbar-collapse').collapse('hide');
            });
        }
        else {
            $('.navbar .navbar-inverse a').off('click');
        }
    }
    close_toggle();
    $(window).resize(close_toggle);

    // one page navigation 
    $('.navbar-nav').onePageNav({
      currentClass: 'active'
    });
  });      

}(jQuery));