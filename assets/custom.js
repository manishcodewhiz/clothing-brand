//   $(document).ready(function () {
//     var $menuItems = $('.list-menu > li');
//     var $header = $('.header');
//     var hideTimeout;

//     $menuItems.on('mouseenter', function () {
//       clearTimeout(hideTimeout);
//       $menuItems.removeClass('active');
//       $(this).addClass('active');

//       if ($(this).find('.nav-menu-dropdown').length) {
//         $('body').addClass('menu-box');
//       }
//     });

//     $header.on('mouseleave', function () {
//       hideTimeout = setTimeout(function () {
//         $menuItems.removeClass('active');
//         $('body').removeClass('menu-box');
//       }, 200);
//     });

//     $header.on('mouseenter', function () {
//       clearTimeout(hideTimeout);
//     });
//   });

//   $(function () {
//     // Add 'active' class to the first menu item on page load
//     $('.first-level-desktop li').first().addClass('active');
//     // Show the first menu content on page load
//     $('.first-level-menu_items').first().addClass('show-menu');

//     $(' .first-level-desktop li').on('mouseenter', function () {
//       var index = $(this).index();
//       $('.first-level-desktop li').removeClass('active');
//       $('.first-level-menu_items').removeClass('show-menu');
//       $(this).addClass('active');
//       $('.first-level-menu_items').eq(index).addClass('show-menu');
//       // $(this).addClass('active');
//       // $parent.find('.first-level-menu_items.' + tabId).addClass('show-menu');
//     });
//   });

//   $(function () {
//     // Add 'active' class to the first menu item on page load
//     $('.first-level-menu_items .second-level-menu-list li').first().addClass('active');
//     // Show the first menu content on page load
//     $('.first-level-menu_items .row').first().addClass('show-menu');

//     $('.first-level-menu_items .second-level-menu-list li').on('mouseenter', function () {
//       var index = $(this).index();
//       $('.first-level-menu_items .second-level-menu-list li').removeClass('active');
//       $('.first-level-menu_items .row').removeClass('show-menu');
//       $(this).addClass('active');
//       $('.first-level-menu_items .row').eq(index).addClass('show-menu');
//       // $(this).addClass('active');
//       // $parent.find('.first-level-menu_items .row.' + tabId).addClass('show-menu');
//     });
//   });

//   // Mobile menu
//  $(function () {
//     $('.first-level-menu_mobile.first-level-mobile > li > a').on('click', function (e) {
//       e.preventDefault();
//       var $menuItem = $(this).closest('li');
//       var $submenu = $menuItem.find('.first-level-menu_items-mobile').first();

//       // Optionally close other open submenus and remove active class
//       $('.first-level-menu_items-mobile').not($submenu).slideUp(200);
//       $('.first-level-menu_mobile.first-level-mobile > li').not($menuItem).removeClass('active');

//       $submenu.slideToggle(200);
//       $menuItem.toggleClass('active');
//     });
//   });
//  $(function () {
//     $('.menu-drawer .list-menu-item > a').on('click', function (e) {
//       e.preventDefault();
//       var $menuItem = $(this).closest('li');
//       var $submenu = $menuItem.find('.main-menu-block').first();

//       // Optionally close other open submenus and remove active class
//       $('.main-menu-block').not($submenu).slideUp(200);
//       $('.menu-drawer .list-menu-item > a').not($menuItem).removeClass('active');

//       $submenu.slideToggle(200);
//       $menuItem.toggleClass('active');
//     });
//   });


//Dropdown menu
$(document).ready(function () {
	var $menuItems = $(".desktop-menu-block .list-menu .list-menu-item");
	var $header = $(".header");
	var hideTimeout;

	$menuItems.on("mouseenter", function () {
		clearTimeout(hideTimeout);
		$menuItems.removeClass("active-menu");
		$(this).addClass("active-menu");

		if ($(this).find(".header-megamenu-block-main").length) {
			$("body").addClass("menu-main");
		}
	});

	$header.on("mouseleave", function () {
		hideTimeout = setTimeout(function () {
			$menuItems.removeClass("active-menu");
			$("body").removeClass("menu-main");
		}, 200);
	});

	$header.on("mouseenter", function () {
		clearTimeout(hideTimeout);
	});
});

//Dropdown Sub menu
$(function () {
	$('.desktop-menu-block .megamenu-sub-menu li').on('mouseenter', function () {
		const $parent = $(this).closest('.megamenu-block-wrapper');
		const tabId = $(this).data('tabid');

		$parent.find('.megamenu-sub-menu li').removeClass('active');
		$parent.find('.menu-wrapper').removeClass('show-menu');

		$(this).addClass('active');
		$parent.find('.menu-wrapper.' + tabId).addClass('show-menu');
	});
});

$(".mobile-menu-block .menu-drawer .list-menu-item.has-children").on("click", function (e) {
  // Ignore clicks inside submenu
  if ($(e.target).closest(".megamenu-sub-menu").length) {
    return;
  }

  e.preventDefault();

  // Remove active/show-menu from all submenu items
  $(".megamenu-sub-menu li").removeClass("active");
  $(".megamenu-sub-menu li .menu-wrapper").removeClass("show-menu");

  // Toggle main menu active state
  $(this).toggleClass("active-menu");
});

$(".mobile-menu-block .menu-drawer .list-menu-item.has-children .megamenu-block-wrapper .megamenu-sub-menu li.has-sub-children").on("click", function (e) {
	 if ($(e.target).closest(".menu-wrapper").length) {
    return;
  }
  e.preventDefault();

  $(this).toggleClass("active");
  $(this).find(".menu-wrapper").toggleClass("show-menu");
});

$(function () {
  $('.brand-list a').on('mouseenter', function () {
    const $parent = $(this).closest('.brand-product-wrapper');
    const tabId = $(this).data('tabid');

    $parent.find('.brand-list a').removeClass('active');
    $(this).addClass('active');

    $parent.find(".brands-product-list").hide();
    $parent.find(".brands-products-" + tabId).css("display", "flex");
  });

  $('.brand-product-wrapper').each(function () {
    const $firstLink = $(this).find('.brand-list a').first();
    const tabId = $firstLink.data('tabid');
    
    $firstLink.addClass('active');

    $(this).find(".brands-product-list").hide();
    $(this).find(".brands-products-" + tabId).css("display", "flex");
  });
});