$(document).ready(function() {

  var mobileMenuIsShow = false;
  
  $( ".toggleMobileMenu" ).click(function(){
    if( mobileMenuIsShow == false ){
      // $( ".non-mobile-nav" ).css('display','inline-block');
      $( ".non-mobile-nav" ).slideDown();
      mobileMenuIsShow = true;
    }else{
      $( ".non-mobile-nav" ).slideUp();
      mobileMenuIsShow = false;
    }
  });

  $("body").click(function(e){
    if ($(e.target).parents(".non-mobile-nav").length === 0 && $(e.target).parents(".mobile-nav").length === 0) {
      $( ".non-mobile-nav" ).slideUp();
      mobileMenuIsShow = false;
    }

  });

  $('a').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 500);
        return false;
      }
    }
  });

});