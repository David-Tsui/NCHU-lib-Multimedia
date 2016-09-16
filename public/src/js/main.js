$(document).ready(function() {
	var currentLocation = window.location;
	setSectionHighlight(currentLocation.pathname);

	var list_flag = false;
	$('.scrollbar-inner').scrollbar();

	var $flipster = $(".flat-flipster");
	$flipster.flipster({
		itemContainer: 'ul',
		itemSelector : 'li',
		start        : '0',
		loop         : false,
		// autoplay    : false,
		// pauseOnHover: true,
		style        : 'flat',
		spacing      : -0.3,

		click        : true,
		keyboard     : true,
		scrollwheel  : false,
		touch        : true,

		nav    : false,
		buttons: 'custom',
		buttonPrev: '<button class="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--accent"><i class="material-icons">navigate_before</i></button>',
		buttonNext: '<button class="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--accent"><i class="material-icons">navigate_next</i></button>',
		onItemSwitch: function(curr, prev) {
			$(".item.slide-link").removeClass("active");
			var switch_to = $(curr).attr("data-slide");
			$('.item[data-slide="' + switch_to + '"]').addClass("active");
		}
		// [function]
		// Callback function when items are switched
		// Arguments received: [currentItem, previousItem]
	});
	$flipster.flipster('jump', 0);
	$(".item.slide-link:first-child").addClass('active');


	$(".movie-item").hover3d({
		selector: "img",
		// shine: true,
		sensitivity: 15,
	});

	// semantic dropdown
	$(".ui.dropdown").dropdown({
		on: 'hover',
		duration: 150
	});

	// var carousel_item_width = $("#carousel .item").width() + 20 * 2;
	// // console.log("carousel_item_width: ", carousel_item_width);
	// var switch_items_num = 3;
	// var adjust = 0;
	// if ($("body").width() < 1024) {
	// 	$("#carousel .item").css("width", "calc(100% / 3 - 12px * 2");
	// 	carousel_item_width = $("#carousel .item").width() + 16 * 2;
	// 	adjust = 24;
	// }
	// $('#carousel').scrollbox({
	// 	direction: 'h',
	//   switchItems: switch_items_num,
	//   distance: carousel_item_width * switch_items_num + adjust,
	//   // delay: 0.5,
	//   delay: 4,
	//   speed: 50,
	// });


	// $('#carousel').resize(function() {
	// 	console.log("resize");
	// 	var carousel_item_width = $("#carousel .item").width() + 20 * 2;
	// 	// console.log("carousel_item_width: ", carousel_item_width);
	// 	var switch_items_num = 3;
	// 	var adjust = 0;
	// 	if ($("body").width() < 1024) {
	// 		$("#carousel .item").css("width", "calc(100% / 3 - 12px * 2");
	// 		carousel_item_width = $("#carousel .item").width() + 16 * 2;
	// 		adjust = 24;
	// 	}
	// 	$('#carousel').scrollbox({
	// 		direction: 'h',
	// 	  switchItems: switch_items_num,
	// 	  distance: carousel_item_width * switch_items_num + adjust,
	// 	  // delay: 0.5,
	// 	  delay: 4,
	// 	  speed: 50,
	// 	  queue: null
	// 	});
	// });
	
	$('.owl-carousel').owlCarousel({
		items            : 3, 
		itemsDesktop     : [1600,2], 
		itemsDesktopSmall: [980,1], 
		itemsTablet      : [600,1],
		lazyLoad         : true,
		slideSpeed			 : 800,
		// autoPlay         : 6000,
		navigation       : true,
		navigationText   : ['<i class="material-icons">chevron_left</i>', '<i class="material-icons">chevron_right</i>'],
		// paginationNumbers: true
	});

	$(".owl-buttons > *").addClass('mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--accent');

	// switch the slide by left list item
	$(".item.slide-link").click(function(e) {
		$(".item.slide-link").removeClass("active");
		var switch_to = $(e.target).parents(".item").attr("data-slide");
		if (switch_to === undefined) return;
		$('.item[data-slide="' + switch_to + '"]').addClass("active");
		$flipster.flipster('jump', $('li[data-slide="' + switch_to + '"]'));
	})

	// control buttons of the news slide
	$("#ctrl-slide-prev").click(function() {
		$flipster.flipster("prev");
	});
	$("#ctrl-slide-next").click(function() {
		$flipster.flipster("next");
	});

	// svg button transition effect
	$(".svg-item").mouseenter(function(e) {
		// console.log("e.target: ", $(e.target));
		var prev_siblings = $(e.target).prev();
		if (prev_siblings.hasClass('svg-bg')) {
			var svg = prev_siblings.find("svg");
			var id  = svg.attr('id');
			changeSvgFill(id, "mouseenter");
		}
	}).mouseleave(function(e) {
		var prev_siblings = $(e.target).prev();
		if (prev_siblings.hasClass('svg-bg')) {
			var svg = prev_siblings.find("svg");
			var id  = svg.attr('id');
			changeSvgFill(id, "mouseleave");
		}
	});
});

function changeSvgFill(id, cond) {
	if (cond == "mouseenter") {
		var polygon = $("#" + id).find("polygon");
		polygon.addClass("active");
	}	else if (cond == "mouseleave") {
		$("#" + id).find("polygon").removeClass("active");
	} 
}

function setSectionHighlight(path) {
	console.log("path: ", path);
	if (path == "/" || !(path.search("/news/posts/") < 0)) {
		$("svg#index polygon").addClass('selected');
	} else if (!(path.search("/about/") < 0)) {
		$("svg#about polygon").addClass('selected');
	} else if (!(path.search("/makers/") < 0)) {
		$("svg#makers polygon").addClass('selected');
	} else if (!(path.search("/resources/") < 0)) {
		$("svg#resources polygon").addClass('selected');
	} else if (!(path.search("/movies/") < 0)) {
		$("svg#movies polygon").addClass('selected');
	} else if (!(path.search("/ideas/") < 0)) {
		$("svg#ideas polygon").addClass('selected');
	}
}

function detectIE() {
	var ua = window.navigator.userAgent;

	// Test values; Uncomment to check result …

	// IE 10
	// ua = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)';
	
	// IE 11
	// ua = 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko';
	
	// Edge 12 (Spartan)
	// ua = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0';
	
	// Edge 13
	// ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Safari/537.36 Edge/13.10586';

	var msie = ua.indexOf('MSIE ');
	if (msie > 0) {
		// IE 10 or older => return version number
		return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
	}

	var trident = ua.indexOf('Trident/');
	if (trident > 0) {
		// IE 11 => return version number
		var rv = ua.indexOf('rv:');
		return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
	}

	var edge = ua.indexOf('Edge/');
	if (edge > 0) {
		// Edge (IE 12+) => return version number
		return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
	}

	// other browser
	return false;
}