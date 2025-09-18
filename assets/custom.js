  $(document).ready(function () {
    // var $menuItems = $('.list-menu > li');
    // var $header = $('.header');
    // var hideTimeout;

    // $menuItems.on('mouseenter', function () {
    //   clearTimeout(hideTimeout);
    //   $menuItems.removeClass('active');
    //   $(this).addClass('active');

    //   if ($(this).find('.nav-menu-dropdown').length) {
    //     $('body').addClass('menu-box');
    //   }
    // });

    // $header.on('mouseleave', function () {
    //   hideTimeout = setTimeout(function () {
    //     $menuItems.removeClass('active');
    //     $('body').removeClass('menu-box');
    //   }, 200);
    // });

    // $header.on('mouseenter', function () {
    //   clearTimeout(hideTimeout);
    // });
    
      $(".list-menu > li").mouseenter(function(){
        $(".list-menu > li").removeClass("active");
        $(this).addClass("active");
      });
      $(".list-menu > li").mouseleave(function(){
        $(this).removeClass("active");
      })

  });

  $(function () {
      const $firstLi = $('.first-level-desktop li').first();
      $firstLi.addClass('active');
      const tabId = $firstLi.data('tabid');
      $('.first-level-menu_items').removeClass('show-menu');
      $( '#' + tabId).addClass('show-menu');
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



document.addEventListener("DOMContentLoaded", function () {
  const productForms = document.querySelectorAll('[data-type="add-to-cart-form"]');

  productForms.forEach((form) => {
    const hiddenInput = form.querySelector('input[name="id"]');
    const buttons = form.querySelectorAll(".variant-button");

    // Handle variant button selection
    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        buttons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        hiddenInput.value = btn.dataset.variantId;
      });
    });

    // Handle quantity controls
    const qtyInput = form.querySelector(".qty-input");
    const minus = form.querySelector(".qty-btn.minus");
    const plus = form.querySelector(".qty-btn.plus");

    minus.addEventListener("click", () => {
      let val = parseInt(qtyInput.value) || 1;
      if (val > 1) qtyInput.value = val - 1;
    });

    plus.addEventListener("click", () => {
      let val = parseInt(qtyInput.value) || 1;
      qtyInput.value = val + 1;
    });

    // Ajax add to cart
    form.addEventListener("submit", function (e) {
      e.preventDefault();   // ✅ stop page reload
      e.stopImmediatePropagation(); // ✅ stop Shopify’s built-in handler

      const variantId = hiddenInput.value;
      const quantity = parseInt(qtyInput.value);

      fetch("/cart/add.js", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: variantId,
          quantity: quantity
        }),
      })
      .then(res => res.json())
      .then(data => {
        console.log("Added to cart:", data);

        // ✅ Refresh & open cart drawer
        const cartDrawer = document.querySelector("cart-drawer");
        if (cartDrawer) {
          cartDrawer.dispatchEvent(new CustomEvent("cart:refresh", { bubbles: true }));
          cartDrawer.classList.add("active");
        }
      })
      .catch(err => console.error("Error adding to cart:", err));
    });
  });
});
