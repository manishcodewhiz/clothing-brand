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
  /**
   * 1. Top-level menu toggle
   */
  const $firstLi = $('.first-level-desktop li').first();
  $firstLi.addClass('active');
  const firstTabId = $firstLi.data('tabid');
  $('.first-level-menu_items[data-tabid="' + firstTabId + '"]').addClass('show-menu');

  $('.first-level-desktop li').on('mouseenter', function () {
    const tabId = $(this).data('tabid');

    $('.first-level-desktop li').removeClass('active');
    $(this).addClass('active');

    $('.first-level-menu_items').removeClass('show-menu');
    $('.first-level-menu_items[data-tabid="' + tabId + '"]').addClass('show-menu');
  });

  /**
   * 2. Second-level menu toggle (inside each block)
   */
  $('.second-level-menu-list').each(function () {
    const $menu = $(this);

    // Default: first active
    $menu.find('li').first().addClass('active');
    $menu.closest('.first-level-menu_items')
         .find('.row').first().addClass('show-menu');

    // Hover switch
    $menu.on('mouseenter', 'li', function () {
      const index = $(this).index();

      $menu.find('li').removeClass('active');
      $(this).addClass('active');

      $menu.closest('.first-level-menu_items')
           .find('.row').removeClass('show-menu')
           .eq(index).addClass('show-menu');
    });
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

// $(document).ready(function () {
//   const $menuItems = $('.list-menu > li');
//   const $header = $('.header');
//   let hideTimeout;

//   $menuItems.on('mouseenter', function () {
//     clearTimeout(hideTimeout);
//     $menuItems.removeClass('active');
//     $(this).addClass('active');

//     if ($(this).find('.nav-menu-dropdown').length) {
//       $('body').addClass('menu-box');
//     }
//   });

//   $header.on('mouseleave', function () {
//     hideTimeout = setTimeout(function () {
//       $menuItems.removeClass('active');
//       $('body').removeClass('menu-box');
//     }, 200);
//   });

//   $header.on('mouseenter', function () {
//     clearTimeout(hideTimeout);
//   });

//   // Show first menu tab on load
//   const $firstTab = $('.first-level-desktop li').first();
//   $firstTab.addClass('active');
//   const tabId = $firstTab.data('tabid');
//   $('.first-level-menu_items').removeClass('show-menu');
//   $('.first-level-menu_items.' + tabId).addClass('show-menu');

//   // On hover, show corresponding menu content
//   $('.first-level-desktop li').on('mouseenter', function () {
//     const tabId = $(this).data('tabid');
//     $('.first-level-desktop li').removeClass('active');
//     $(this).addClass('active');
//     $('.first-level-menu_items').removeClass('show-menu');
//     $('.first-level-menu_items.' + tabId).addClass('show-menu');
//   });

//   // Submenu tab logic inside inner_menu (like brands)
//   $('.second-level-menu-list li').on('mouseenter', function () {
//     const $parentWrapper = $(this).closest('.logo-item');
//     const tabId = $(this).data('tabid');

//     $parentWrapper.find('.second-level-menu-list li').removeClass('active');
//     $(this).addClass('active');

//     $parentWrapper.find('.row').removeClass('show-menu');
//     $parentWrapper.find('.brands-products-' + tabId).addClass('show-menu');
//   });

//   // Show first subtab content in each brand group on load
//   $('.logo-item').each(function () {
//     const $firstSub = $(this).find('.second-level-menu-list li').first();
//     const tabId = $firstSub.data('tabid');
//     $firstSub.addClass('active');

//     $(this).find('.row').removeClass('show-menu');
//     $(this).find('.brands-products-' + tabId).addClass('show-menu');
//   });

//   // Mobile: Expand first-level links
//   $('.first-level-menu_mobile.first-level-mobile > li > a').on('click', function (e) {
//     e.preventDefault();
//     const $menuItem = $(this).closest('li');
//     const $submenu = $menuItem.find('.first-level-menu_items-mobile').first();

//     $('.first-level-menu_items-mobile').not($submenu).slideUp(200);
//     $('.first-level-menu_mobile.first-level-mobile > li').not($menuItem).removeClass('active');

//     $submenu.slideToggle(200);
//     $menuItem.toggleClass('active');
//   });

//   // Mobile drawer: Expand main menu
//   $('.menu-drawer .list-menu-item > a').on('click', function (e) {
//     e.preventDefault();
//     const $menuItem = $(this).closest('li');
//     const $submenu = $menuItem.find('.main-menu-block').first();

//     $('.main-menu-block').not($submenu).slideUp(200);
//     $('.menu-drawer .list-menu-item').not($menuItem).removeClass('active');

//     $submenu.slideToggle(200);
//     $menuItem.toggleClass('active');
//   });
// });
