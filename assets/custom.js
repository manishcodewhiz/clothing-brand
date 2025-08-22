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


(function() {
  // Utility: replace Dawn cart drawer + bubble section and open it
  function refreshAndOpenCartDrawer() {
    const cartUrl = (window.routes && window.routes.cart_url) || '/cart';

    // Refresh drawer
    return fetch(`${cartUrl}?section_id=cart-drawer`)
      .then((r) => r.text())
      .then((htmlText) => {
        const html = new DOMParser().parseFromString(htmlText, 'text/html');
        const selectors = [
          '.cart-drawer',
          'cart-drawer-items',
          '.drawer__footer'
        ];

        selectors.forEach((sel) => {
          const target = document.querySelector(sel);
          const source = html.querySelector(sel);
          if (target && source) target.replaceWith(source);
        });

        // Open drawer (Dawn)
        const drawer = document.querySelector('cart-drawer') || document.querySelector('cart-drawer.drawer');
        if (drawer) {
          drawer.classList.remove('is-empty');
          drawer.classList.add('active');
        }
        document.querySelector('.drawer__inner-empty')?.remove();

        // ALSO refresh header cart bubble
        return fetch(`${cartUrl}?section_id=cart-icon-bubble`)
          .then(r => r.text())
          .then(htmlText => {
            const html = new DOMParser().parseFromString(htmlText, 'text/html');
            const source = html.querySelector('cart-icon-bubble');
            const target = document.querySelector('cart-icon-bubble');
            if (source && target) target.replaceWith(source);
          });
      });
  }

  // Intercept Rebuy add-to-cart buttons
  document.addEventListener('click', function(e) {
    const btn = e.target.closest('.rebuy-button[data-variant-id]');
    if (!btn) return;

    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();

    const id = parseInt(btn.dataset.variantId, 10);
    const qty = parseInt(btn.dataset.quantity || '1', 10);

    if (!id || Number.isNaN(id)) {
      console.error('Rebuy: No valid data-variant-id on button');
      return;
    }

    fetch('/cart/add.js', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ id, quantity: qty })
    })
    .then((res) => {
      if (!res.ok) throw new Error('Add to cart failed');
      return res.json();
    })
    .then(() => refreshAndOpenCartDrawer())
    .catch((err) => console.error(err));
  }, true);
})();


// Handle custom add-to-cart forms
document.addEventListener('submit', function(e) {
  const form = e.target.closest('form[name="customAddToCart"]');
  if (!form) return;

  e.preventDefault();

  const formData = new FormData(form);
  const id = formData.get('id');
  const qty = formData.get('quantity') || 1;

  fetch('/cart/add.js', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify({ id, quantity: qty })
  })
  .then(r => {
    if (!r.ok) throw new Error('Add to cart failed');
    return r.json();
  })
  .then(() => refreshAndOpenCartDrawer())
  .catch(err => console.error('Cart error:', err));
});

