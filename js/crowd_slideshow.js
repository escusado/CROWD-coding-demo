/*CONFIG*/
var hotspot = 53; //more slides less hotspot width
var slideshow_timer = 2000;

(function( $ ){

	var auto_slide_timer = 0;

	var methods = {
		init : function() {
			var slideshow_obj = $(this);

			//set slides into left position
			slideshow_obj.find('.slide').each(function(){
				$(this).css('left',$(this).crowd_slide('left_pos'));
			});

			//set welcome page first
			slideshow_obj.crowd_slideshow('switch_to_slide',{slide:0});

			//show slides
			slideshow_obj.find('.slide').delay(500).fadeIn('slow');

			//set click action to slides
			slideshow_obj.find('.slide').click(function(){
				var slide_index = $(this).attr('id').replace('slide-','');
				slideshow_obj.crowd_slideshow('switch_to_slide',{slide:slide_index});
			});

			//set auto slideshow
			auto_slide_timer = setInterval(function(){ slideshow_obj.crowd_slideshow('auto_switch_slides'); },slideshow_timer);

			//stop slideshow if mouse over slides, continue when mouse leave
			slideshow_obj.hover(
				function(){
					clearInterval(auto_slide_timer);
				},
				function(){
					auto_slide_timer = setInterval(function(){ slideshow_obj.crowd_slideshow('auto_switch_slides'); },slideshow_timer);
				}
			);

		},
		switch_to_slide : function ( options ){
			//set animation args
			var animation_args = {queue:false,duration:500};

			//log(options.slide);
			var slideshow_obj = $(this);

			//get slide
			var selected_slide = slideshow_obj.find('#slide-'+options.slide);

			//move all next slides to right position
			selected_slide.nextAll('.slide').each(function(){
				$(this).animate({left:$(this).crowd_slide('right_pos')},animation_args);
			});

			//move all previous slides to left position
			selected_slide.prevAll('.slide').each(function(){
				$(this).animate({left:$(this).crowd_slide('left_pos')},animation_args);
			});

			//activate slide
			$(this).find('.slide').removeClass('active');
			selected_slide.addClass('active');
			selected_slide.animate({left:selected_slide.crowd_slide('left_pos')},animation_args);
		},
		auto_switch_slides : function(){
			var slideshow_obj = $(this);

			//check which slide is active
			var active_slide_index = slideshow_obj.find('.active').attr('id').replace('slide-','');
			var number_of_slides = slideshow_obj.find('.slide').length - 1;

			//check if last
			var next_slide = ( active_slide_index == number_of_slides) ? 0 : parseInt(active_slide_index) + 1;

			//make the switch
			slideshow_obj.crowd_slideshow('switch_to_slide',{slide:next_slide});
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
			//todo: refactor into less operations
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
