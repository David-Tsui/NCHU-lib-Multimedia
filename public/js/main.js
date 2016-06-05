$(document).ready(function() {

	var currentLocation = window.location;
	setSectionHighlight(currentLocation.pathname);

	var list_flag = false;
	$('.scrollbar-inner').scrollbar();

	var $flipster = $(".coverflow")
	$flipster.flipster({
		itemContainer: 'ul',
		itemSelector: 'li',
		start: '0',
		loop: false,

		autoplay: false,
		pauseOnHover: true,

		style: 'coverflow',
		spacing: -0.6,
		// [number]
		// Space between items relative to each item's width. 0 for no spacing, negative values to overlap

		click: true,
		keyboard: true,
		scrollwheel: false,
		touch: true,

		nav: false,
		buttons: 'custom',
		// [true|false|'custom']
		// If true, Flipster will insert Previous / Next buttons with SVG arrows
		// If 'custom', Flipster will not insert the arrows and will instead use the values of `buttonPrev` and `buttonNext`

		buttonPrev: '<button class="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--accent"><i class="material-icons">navigate_before</i></button>',
		// [text|html]
		// Changes the text for the Previous button

		buttonNext: '<button class="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--accent"><i class="material-icons">navigate_next</i></button>',
		// [text|html]
		// Changes the text for the Next button

		onItemSwitch: false
		// [function]
		// Callback function when items are switched
		// Arguments received: [currentItem, previousItem]
	});
	$flipster.flipster('jump', 0);

	$(".movie-item").hover3d({
		selector: "img",
		// shine: true,
		sensitivity: 15,
	});

	$(".btn-nav").on("click tap", function() {
		$(this).toggleClass("animated");
	});

	$(".ui.dropdown").dropdown({
		on: 'hover',
		duration: 150
	});

	var carousel_item_width = $("#carousel .item").width() + 20 * 2;
	console.log("carousel_item_width: ", carousel_item_width);
	var switch_items_num = 3;
	var adjust = 0;
	$('#carousel').scrollbox({
		direction: 'h',
	  switchItems: switch_items_num,
	  distance: carousel_item_width * switch_items_num + adjust,
	  // delay: 0.5,
	  delay: 3,
	  speed: 65,
	});


	$("#show-list-news").click(function() {
		list_flag = !list_flag;
		$(".carousel-items, .list-items").toggle();
		(list_tag) ? $(this).text("列表式查看") : $(this).text("幻燈片查看");
	});

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
	console.log("ENTER");
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
	if (path == "/") {
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