function changeSvgFill(e,t){if("mouseenter"==t){var s=$("#"+e).find("polygon");s.addClass("active")}else"mouseleave"==t&&$("#"+e).find("polygon").removeClass("active")}function setSectionHighlight(e){"/"!=e&&e.search("/news/posts/")<0?e.search("/about/")<0?e.search("/makers/")<0?e.search("/resources/")<0?e.search("/movies/")<0?e.search("/ideas/")<0||$("svg#ideas polygon").addClass("selected"):$("svg#movies polygon").addClass("selected"):$("svg#resources polygon").addClass("selected"):$("svg#makers polygon").addClass("selected"):$("svg#about polygon").addClass("selected"):$("svg#index polygon").addClass("selected")}$(document).ready(function(){var e=window.location;setSectionHighlight(e.pathname);$(".scrollbar-inner").scrollbar();var t=$(".flat-flipster");t.flipster({itemContainer:"ul",itemSelector:"li",start:"0",loop:!1,autoplay:!1,pauseOnHover:!0,style:"flat",spacing:-.3,click:!0,keyboard:!0,scrollwheel:!0,touch:!0,nav:!1,buttons:"custom",buttonPrev:'<button class="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--accent"><i class="material-icons">navigate_before</i></button>',buttonNext:'<button class="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--accent"><i class="material-icons">navigate_next</i></button>',onItemSwitch:function(e,t){$(".item.slide-link").removeClass("active");var s=$(e).attr("data-slide");$('.item[data-slide="'+s+'"]').addClass("active")}}),t.flipster("jump",0),$(".item.slide-link:first-child").addClass("active"),$(".movie-item").hover3d({selector:"img",sensitivity:15}),$(".ui.dropdown").dropdown({on:"hover",duration:150});var s=$("#carousel .item").width()+40,a=3,i=0;$("body").width()<1024&&($("#carousel .item").css("width","calc(100% / 3 - 12px * 2"),s=$("#carousel .item").width()+32,i=24),$("#carousel").scrollbox({direction:"h",switchItems:a,distance:s*a+i,delay:4,speed:50}),$(".item.slide-link").click(function(e){$(".item.slide-link").removeClass("active");var s=$(e.target).parents(".item").attr("data-slide");void 0!=s&&($('.item[data-slide="'+s+'"]').addClass("active"),t.flipster("jump",$('li[data-slide="'+s+'"]')))}),$("#ctrl-slide-prev").click(function(){t.flipster("prev")}),$("#ctrl-slide-next").click(function(){t.flipster("next")}),$(".svg-item").mouseenter(function(e){var t=$(e.target).prev();if(t.hasClass("svg-bg")){var s=t.find("svg"),a=s.attr("id");changeSvgFill(a,"mouseenter")}}).mouseleave(function(e){var t=$(e.target).prev();if(t.hasClass("svg-bg")){var s=t.find("svg"),a=s.attr("id");changeSvgFill(a,"mouseleave")}})});