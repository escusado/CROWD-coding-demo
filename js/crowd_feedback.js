/*FEEDBACK BUTTON IMPLEMENTATION*/
(function( $ ){

	var methods = {
		init : function( options ) {
			
			var page_document = $(this);
			
			//trigger hover animation
			//a wierd bug is going on with this animation, sometimes it messes with the slideshow animation timer :\
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

			$('#submit').click(function(){
				page_document.crowd_feedback('submit');
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
		},
		submit : function(){
			var page_document = $(this);

			//try to submit form
			//here we will do everything to make sure the
			//form is correct, client side validation with jQuery validate (of course he!)
			//ajax call to a server side script that validates and sends the mail or whatever the
			//script does and returns an "OK" beacon so we can trigger the necesary procedure
			//I know how to do all of that http://code.chirango.com/2011/05/ajax-contact-form/ :)

			//so if the mail was succesfully sent...

			$('#crowd-feedback-envelope-front, #crowd-feedback-envelope-back').css('left', ($(window).width() - $('#crowd-feedback-envelope-front').width()) / 2); 
			var envelope_top_pos = ($(window).height() - $('#crowd-feedback-envelope-front').height()) / 2 ;
			$('#crowd-feedback-envelope-front').css('bottom', $('#crowd-feedback-envelope-front').height() * -1 );
			$('#crowd-feedback-envelope-back').css('bottom', $('#crowd-feedback-envelope-back').height() * -1 );

			$('#crowd-feedback-envelope-front, #crowd-feedback-envelope-back').show();

			//position fine tuned and hardcoded for now :(
			envelope_top_pos = 110;

			//animate entrance
			$('#crowd-feedback-envelope-front, #crowd-feedback-envelope-back').animate({bottom:envelope_top_pos},{duration:1000});
			
			//and of you go!
			$('#crowd-feedback-envelope-front, #crowd-feedback-envelope-back').animate({left:2000},{duration:1000});
			$('#crowd-feedback-container').delay(1000).animate({left:2000},1000,function(){
				page_document.crowd_feedback('hide_feedback_form');
			});
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