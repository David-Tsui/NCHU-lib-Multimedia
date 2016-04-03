$(document).ready(function() {
	
	$(".btn-nav").on("click tap", function() {
		console.log("click");
	  $(".nav-container").toggleClass("showNav hideNav").removeClass("hidden");
    $(this).toggleClass("animated");
  });

	$(".ui.dropdown").dropdown({
		on: 'hover',
		duration: 150
	});

	var $c = $('#carousel'), $w = $(window);

	$c.carouFredSel({
		align: false,
		items: 8,
		scroll: {
			items: 1,
			duration: 5000,
			timeoutDuration: 0,
			easing: 'linear',
			// pauseOnHover: '10'
		}
	});

	
	// $w.bind('resize.example', function() {
	// 	var nw = $w.width();
	// 	if (nw < 990) {
	// 		nw = 990;
	// 	}

	// 	$c.width(nw * 3);
	// 	$c.parent().width(nw);

	// }).trigger('resize.example');

	// $('.owl-carousel').owlCarousel({
 //    loop:true,
 //    margin:5,
 //    responsive:{
 //        0:{
 //            items:1
 //        },
 //        600:{
 //            items:2
 //        },
 //        1000:{
 //            items:4
 //        }
 //    },
 //    autoplay: true,
	// 	autoplayTimeout: 2500,
	// 	autoplayHoverPause: true
	// })
});