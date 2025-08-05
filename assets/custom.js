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
  // Add 'active' class to the first menu item on page load for both menus
  $('.main-menu-block .first-level-desktop li, .main-menu-block .second-level-menu-list li').first().addClass('active');
  // Show the first menu content on page load for both menus
  $('.main-menu-block .first-level-menu_items, .main-menu-block .second-level-menu-list').first().addClass('show-menu');

  // Handle mouseenter for both menu levels
  $('.main-menu-block .first-level-desktop li, .main-menu-block .second-level-menu-list li').on('mouseenter', function () {
    var index = $(this).index();
    var $parent = $(this).closest('ul');
    $parent.children('li').removeClass('active');
    $(this).addClass('active');
    // Show corresponding menu content if needed
    if ($parent.hasClass('first-level-desktop')) {
      $('.main-menu-block .first-level-menu_items').removeClass('show-menu');
      $('.main-menu-block .first-level-menu_items').eq(index).addClass('show-menu');
    } else if ($parent.hasClass('second-level-menu-list')) {
      $('.main-menu-block .second-level-menu-list').removeClass('show-menu');
      $('.main-menu-block .second-level-menu-list').eq(index).addClass('show-menu');
    }
  });
});
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
//     });
//   });