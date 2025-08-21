  $(document).ready(function () {
    var $menuItems = $('.list-menu > li');
    var $header = $('.header');
    var hideTimeout;

    $menuItems.on('mouseenter', function () {
      clearTimeout(hideTimeout);
      $menuItems.removeClass('active');
      $(this).addClass('active');

      if ($(this).find('.nav-menu-dropdown').length) {
        $('body').addClass('menu-box');
      }
    });

    $header.on('mouseleave', function () {
      hideTimeout = setTimeout(function () {
        $menuItems.removeClass('active');
        $('body').removeClass('menu-box');
      }, 200);
    });

    $header.on('mouseenter', function () {
      clearTimeout(hideTimeout);
    });
  });

  $(function () {
      const $firstLi = $('.first-level-desktop li').first();
      $firstLi.addClass('active');
      const tabId = $firstLi.data('tabid');
      $('.first-level-menu_items').removeClass('show-menu');
      $('.first-level-menu_items.' + tabId).addClass('show-menu');
      $('.first-level-menu_items').first().addClass('show-menu');

    $(' .first-level-desktop li').on('mouseenter', function () {
      var index = $(this).index();
      $('.first-level-desktop li').removeClass('active');
      $('.first-level-menu_items').removeClass('show-menu');
      $(this).addClass('active');
      $('.first-level-menu_items').eq(index).addClass('show-menu');
    });
  });

  $(function () {
    $('.second-level-menu-list li').first().addClass('active');
    $('.first-level-menu_items .row').first().addClass('show-menu');

    $('.second-level-menu-list li').on('mouseenter', function () {
      var index = $(this).index();
      $('.second-level-menu-list li').removeClass('active');
      $('.first-level-menu_items .row').removeClass('show-menu');
      $(this).addClass('active');
      $('.first-level-menu_items .row').eq(index).addClass('show-menu');
    });
  });

  // Mobile menu
 $(function () {
    $('.first-level-menu_mobile.first-level-mobile > li > a').on('click', function (e) {
      e.preventDefault();
      var $menuItem = $(this).closest('li');
      var $submenu = $menuItem.find('.first-level-menu_items-mobile').first();

      // Optionally close other open submenus and remove active class
      $('.first-level-menu_items-mobile').not($submenu).slideUp(200);
      $('.first-level-menu_mobile.first-level-mobile > li').not($menuItem).removeClass('active');

      $submenu.slideToggle(200);
      $menuItem.toggleClass('active');
    });
  });
 $(function () {
    $('.menu-drawer .list-menu-item > a').on('click', function (e) {
      e.preventDefault();
      var $menuItem = $(this).closest('li');
      var $submenu = $menuItem.find('.main-menu-block').first();

      // Optionally close other open submenus and remove active class
      $('.main-menu-block').not($submenu).slideUp(200);
      $('.menu-drawer .list-menu-item > a').not($menuItem).removeClass('active');

      $submenu.slideToggle(200);
      $menuItem.toggleClass('active');
    });
  });

  document.addEventListener('DOMContentLoaded', function () {
	// Function to reinitialize Rebuy
	function reinitializeRebuy() {
		if (typeof Rebuy !== 'undefined' && Rebuy.init) {
			Rebuy.init(); // Adjust this based on Rebuy’s actual API method
		}
	}

	setInterval(() => {
		reinitializeRebuy();
	}, 1000);
});
