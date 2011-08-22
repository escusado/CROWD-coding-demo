/*FEEDBACK BUTTON IMPLEMENTATION*/
(function( $ ){

	var methods = {
		init : function( options ) {
			
			var page_document = $(this);
			
			//trigger hover animation
			$('#crowd-feedback-trigger').hover(
				function(){
					$(this).animate({left:-10});
				},
				function(){
					$(this).animate({left:-20});
				}
			);

			$('#crowd-feedback-trigger').click(function(){
				page_document.crowd_feedback('show_feedback_form');
			});

		},
		show_feedback_form : function(){
			$('body').css('overflow', 'hidden');
			$('#lightbox').fadeIn();
		}
	};

  $.fn.crowd_feedback = function( method ) {
    if ( methods[method] ) {
      return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' +  method + 'error' );
    }    
  
  };

})( jQuery );