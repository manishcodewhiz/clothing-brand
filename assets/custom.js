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


(function () {
  // ---- Helpers ----
  function openCartDrawer() {
    // Dawn v8+ cart drawer
    var drawer = document.querySelector('cart-drawer');
    if (drawer && typeof drawer.open === 'function') {
      drawer.open();
      return;
    }

    // Older Dawn: try global event some themes listen for
    document.body.dispatchEvent(new CustomEvent('cart:open', { bubbles: true }));

    // Fallback: click the cart icon (update selector if your header differs)
    var toggle = document.querySelector('[data-cart-toggle], .header__icon--cart, a[href$="/cart"]');
    if (toggle) toggle.click();
  }

  // Prevent any direct navigations to /cart right after an add
  function blockCartPageOnce(e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    openCartDrawer();
  }

  // ---- 1) Intercept Rebuy add-to-cart form submits to force AJAX + drawer ----
  // Many Rebuy widgets render forms that post to /cart/add. We convert them to AJAX and open drawer.
  $(document).on('submit', '.rebuy-widget form[action^="/cart/add"]', function (e) {
    e.preventDefault();
    e.stopImmediatePropagation();

    var $form = $(this);
    $.ajax({
      type: 'POST',
      url: '/cart/add.js',
      data: $form.serialize(),
      dataType: 'json'
    }).always(function () {
      openCartDrawer();
    });
    return false;
  });

  // ---- 2) If Rebuy does its own AJAX, catch completion to open the drawer ----
  // This fires after ANY jQuery AJAX call on the page that hits /cart/add
  $(document).ajaxComplete(function (_evt, _xhr, settings) {
    try {
      if (settings && settings.url && settings.url.indexOf('/cart/add') !== -1) {
        openCartDrawer();
      }
    } catch (err) {}
  });

  // ---- 3) Safety net: if anything tries to send the user to /cart, block it and open the drawer ----
  // Links
  $(document).on('click', 'a[href^="/cart"]', blockCartPageOnce);
  // Buttons with formaction or data-href to /cart (rare, but covered)
  $(document).on('click', 'button, [role="button"]', function (e) {
    var el = e.currentTarget;
    var href = el.getAttribute('data-href') || el.getAttribute('formaction') || '';
    if (href && href.indexOf('/cart') === 0) blockCartPageOnce(e);
  });

  // ---- 4) Bonus: If your theme emits a "cart:updated" event, open the drawer on that too ----
  document.addEventListener('cart:updated', function () {
    openCartDrawer();
  }, true);
})();