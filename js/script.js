/*set all columns height to the highest one*/
$(document).ready(function(){
	$('.adjust-height').each(function(){
		var max_height = 0;
		$(this).children().each(function(){
			max_height = ( $(this).height() > max_height ) ? $(this).height() : max_height;
		});
		$(this).children().height(max_height);
	});
});
