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

			$('#crowd-feedback-cancel').click(function(){
				page_document.crowd_feedback('hide_feedback_form');
			});

		},
		show_feedback_form : function(){
			//disable scrollbars
			$('body').css('overflow', 'hidden');
			$('#lightbox').fadeIn();

			//prepare for for animation
			$('#crowd-feedback-container').css('left', ($(window).width() - $('#crowd-feedback-container').width()) / 2); 
			var form_top_pos = ($(window).height() - $('#crowd-feedback-container').height()) / 2 ;
			$('#crowd-feedback-container').css('top', $('#crowd-feedback-container').height() * -1 );
			$('#crowd-feedback-container').show();

			//animate entrance
			$('#crowd-feedback-container').animate({top:form_top_pos},{duration:1000});
		},
		hide_feedback_form : function(){
			$('body').css('overflow', 'auto');
			$('#lightbox').fadeOut();

			$('#crowd-feedback-container').fadeOut();
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