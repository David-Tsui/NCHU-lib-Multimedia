$(document).ready(function() {

	var currentLocation = window.location;
	setSectionHighlight(currentLocation.pathname);

	var list_flag = false;
	$('.scrollbar-inner').scrollbar();

	var $flipster = $(".flat-flipster");
	$flipster.flipster({
		itemContainer: 'ul',
		itemSelector: 'li',
		start: '0',
		loop: false,

		autoplay: false,
		pauseOnHover: true,

		style: 'flat',
		spacing: -0.3,

		click: true,
		keyboard: true,
		scrollwheel: false,
		touch: true,

		nav: false,
		buttons: 'custom',
		buttonPrev: '<button class="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--accent"><i class="material-icons">navigate_before</i></button>',
		buttonNext: '<button class="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--accent"><i class="material-icons">navigate_next</i></button>',
		onItemSwitch: false
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

	var carousel_item_width = $("#carousel .item").width() + 20 * 2;
	// console.log("carousel_item_width: ", carousel_item_width);
	var switch_items_num = 3;
	var adjust = 0;
	$('#carousel').scrollbox({
		direction: 'h',
	  switchItems: switch_items_num,
	  distance: carousel_item_width * switch_items_num + adjust,
	  // delay: 0.5,
	  delay: 4,
	  speed: 50,
	});

	// switch the slide by left list item
	$(".item.slide-link").click(function(e) {
		$(".item.slide-link").removeClass("active");
		var switch_to = $(e.target).parents(".item").attr("data-slide");
		if (switch_to == undefined) return;
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
			var id = svg.attr('id');
			changeSvgFill(id, "mouseenter");
		}
	}).mouseleave(function(e) {
		var prev_siblings = $(e.target).prev();
		if (prev_siblings.hasClass('svg-bg')) {
			var svg = prev_siblings.find("svg");
			var id = svg.attr('id');
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