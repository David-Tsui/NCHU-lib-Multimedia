$(document).ready(function() {
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
		buttons: false,
		// [true|false|'custom']
		// If true, Flipster will insert Previous / Next buttons with SVG arrows
		// If 'custom', Flipster will not insert the arrows and will instead use the values of `buttonPrev` and `buttonNext`

		buttonPrev: 'Previous',
		// [text|html]
		// Changes the text for the Previous button

		buttonNext: 'Next',
		// [text|html]
		// Changes the text for the Next button

		onItemSwitch: false
		// [function]
		// Callback function when items are switched
		// Arguments received: [currentItem, previousItem]
	});
	$flipster.flipster('jump', 0);

	$(".btn-nav").on("click tap", function() {
		$(this).toggleClass("animated");
	});

	$(".ui.dropdown").dropdown({
		on: 'hover',
		duration: 150
	});

	// $('#carousel > #inner').loopmovement({
	// 	'direction':'left', 	
	// 	'speed': 30
	// });
	var carousel_item_width = $("#carousel .item").width();
	var switch_items_num = 5;
	var adjust = 100;
	$('#carousel').scrollbox({
		direction: 'h',
	  switchItems: switch_items_num,
	  distance: carousel_item_width * switch_items_num + adjust,
	  delay: 4,
	  speed: 42,
	});
});