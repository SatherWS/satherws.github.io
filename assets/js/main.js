// page load animation (is this necessary for static content?)
(function($) {
  "use strict";  
  $(window).on('load', function() {
    // Page Loader active
    $('#preloader').fadeOut();
  });      
}(jQuery));