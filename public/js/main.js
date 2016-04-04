$(document).ready(function() {
	$('.scrollbar-inner').scrollbar();
	$(".btn-nav").on("click tap", function() {
    $(this).toggleClass("animated");
  });

	$(".ui.dropdown").dropdown({
		on: 'hover',
		duration: 150
	});

	$('#carousel > #inner').loopmovement({
		'direction':'left', 	
		'speed': 15
	});
	// carousel
	// var $carousel = $('#carousel-list');
 //  var items = $carousel.children().length;
 //  var itemsWidth = (items * 220); // width for each item 
 //  $carousel.css('width', itemsWidth);
  
 //  var rotating = true;
 //  var speed = 0;
 //  var playCarousel = setInterval(rotateCarousel, speed);
  
 //  $("#carousel li a").mouseenter(function() {
 //  	rotating = false; // turn off rotation when hovering
 //  }).mouseleave(function(event) {
 //  	rotating = true;
 //  });
  
 //  function rotateCarousel() {
 //  	var $first = $('#carousel-list li:first');
 //    if (rotating) {
 //      $first.animate({ 'margin-left': '-260px'}, 5000, "linear",function() {
 //        $first.remove().css({ 'margin-left': '0px' });
 //        $('#carousel-list li:last').after($first);
 //      });
 //    } else {
 //    	$first.stop();
 //    }
 //  }
});