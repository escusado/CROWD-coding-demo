/*CONFIG*/
var hotspot = 68; //more slides less hotspot width

(function( $ ){

	var methods = {
		init : function() {
			var slideshow_obj = $(this);

			//set slides into correct position
			slideshow_obj.find('.slide').each(function(){
				$(this).css('left',$(this).crowd_slide('left_pos'));
			});

			//show slides
			slideshow_obj.find('.slide').delay(500).fadeIn('slow');

			//set click action to slides
			slideshow_obj.find('.slide').click(function(){
				var slide_index = $(this).attr('id').replace('slide-','');
				slideshow_obj.crowd_slideshow('switch_to_slide',{slide:slide_index});
			});
		},
		switch_to_slide : function ( options ){
			log(options.slide);
		}
	};

  $.fn.crowd_slideshow = function( method ) {
    
    if ( methods[method] ) {
      return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' +  method + 'error' );
    }    
  
  };

})( jQuery );

/*SLIDE POSITION*/
(function( $ ){

	var methods = {
		//assign each slide its left and right position based on the hotspot area and the width of the slideshow container

		left_pos : function() {
			var slide_index = $(this).attr('id').replace('slide-','');
			return (hotspot * slide_index)+'px';
		},
		right_pos : function() {
			//refactor into less operations
			var slideshow_width = $(this).parent().width();
			var number_of_slides = $(this).parent().find('.slide').length;		
			var right_margin = slideshow_width - (number_of_slides * hotspot);
			var slide_index = $(this).attr('id').replace('slide-','');

			return (hotspot * slide_index + right_margin)+'px';
		}
	};

  $.fn.crowd_slide = function( method ) {
    
    if ( methods[method] ) {
      return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' +  method + 'error' );
    }    
  
  };

})( jQuery );
