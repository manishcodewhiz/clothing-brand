$(document).ready(function () {
  const $menuItems = $('.list-menu > li');
  const $body = $('body');
  const $header = $('.header');
  let hideTimeout;

  // Handle top-level hover behavior
  $menuItems.on('mouseenter', function () {
    clearTimeout(hideTimeout);
    const tabId = $(this).data('tabid');

    // Set active state
    $menuItems.removeClass('active');
    $(this).addClass('active');

    // Show relevant .main-menu block
    $('.main-menu').removeClass('show-menu');
    $('.main-menu.' + tabId).addClass('show-menu');

    // Add body class to trigger visibility
    $body.addClass('menu-box');
  });

  // Reset menu on mouse leave
  $header.on('mouseleave', function () {
    hideTimeout = setTimeout(() => {
      $menuItems.removeClass('active');
      $('.main-menu').removeClass('show-menu');
      $body.removeClass('menu-box');
    }, 200);
  });

  $header.on('mouseenter', function () {
    clearTimeout(hideTimeout);
  });

  // ===== Second-level menu (Brand logos) interaction =====
  $(document).on('mouseenter', '.second-level-menu-list a', function () {
    const tabId = $(this).data('tabid');

    // Highlight selected brand logo
    $(this).addClass('active').siblings().removeClass('active');

    // Show associated product grid
    const $parentBox = $(this).closest('.first-level-menu_items');
    $parentBox.find('.brands-product-list').removeClass('show-menu');
    $parentBox.find('.brands-products-' + tabId).addClass('show-menu');
  });

  // ===== Default on page load =====
  const $firstMenuItem = $('.list-menu > li').first();
  const firstTabId = $firstMenuItem.data('tabid');

  $firstMenuItem.addClass('active');
  $('.main-menu.' + firstTabId).addClass('show-menu');

  // Also show first product tab under brand
  $('.second-level-menu-list a').first().addClass('active');
  $('.brands-product-list').first().addClass('show-menu');
});
