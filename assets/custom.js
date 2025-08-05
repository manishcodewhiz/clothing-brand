// $('.list-menu > li').on('mouseenter', function () {
//     // Remove the class from all li and body first
//     $('.list-menu > li').removeClass('active');
//     $('body').removeClass('menu-box');

//     // Add class to the hovered li
//     $(this).addClass('active');

//     // Add the menu-box class to body
//     $('body').addClass('menu-box');
// });

// $('.list-menu > li').on('mouseleave', function () {
//     // Optional: remove menu-box class when leaving the item
//     $(this).removeClass('active');
//     $('body').removeClass('menu-box');
// });

  $(document).ready(function () {
	var $menuItems = $(".list-menu > li");
	var $header = $(".header");
	var hideTimeout;

	$menuItems.on("mouseenter", function () {
		clearTimeout(hideTimeout);
		$menuItems.removeClass("active");
		$(this).addClass("active");

		if ($(this).find(".nav-menu-dropdown").length) {
			$("body").addClass("menu-box");
		}
	});

	$header.on("mouseleave", function () {
		hideTimeout = setTimeout(function () {
			$menuItems.removeClass("active-menu");
			$("body").removeClass("menu-box");
		}, 200);
	});

	$header.on("mouseenter", function () {
		clearTimeout(hideTimeout);
	});
});

$(function () {
  // Add 'active' class to the first menu item on page load
  $('.main-menu-block .first-level-desktop li').first().addClass('active');
  // Show the first menu content on page load
  $('.main-menu-block .first-level-menu_items').first().addClass('show-menu');

  $('.main-menu-block .first-level-desktop li').on('mouseenter', function () {
    var index = $(this).index();
    $('.main-menu-block .first-level-desktop li').removeClass('active');
    $('.main-menu-block .first-level-menu_items').removeClass('show-menu');
    $(this).addClass('active');
    $('.main-menu-block .first-level-menu_items').eq(index).addClass('show-menu');
  });
});