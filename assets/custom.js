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


  // This is rebuy widget Add to cart redirect to cart drawer 

  $(document).on('click', '.rebuy-product-actions, .rebuy-bundle-builder__cta-container', function (e) {
	if ($(e.target).closest(".rebuy-bundle-builder__product-quantity").length) {
    return;
  }
	setTimeout(function () {
		fetch(`${routes.cart_url}`)
			.then((response) => response.text())
			.then((responseText) => {
				const html = new DOMParser().parseFromString(responseText, 'text/html');
				const selectors = ['.header__icon--cart', '.cart-drawer', 'cart-drawer-items', '.drawer__footer', '.item-count'];
				for (const selector of selectors) {
					const targetElement = document.querySelector(selector);
					const sourceElement = html.querySelector(selector);
					if (targetElement && sourceElement) {
						targetElement.replaceWith(sourceElement);
					}
				}
				$('.drawer__inner-empty').remove()
				$('cart-drawer.drawer').removeClass('is-empty')
				$('cart-drawer.drawer').addClass('active')
			})
			.catch((e) => {
				console.error(e);
			});
	}, 1200)
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





// function updateCartProgress(cart) {
//   const wrapper = document.querySelector('.cart-progress-wrapper');
//   if (!wrapper) return;

//   const goal = parseInt(wrapper.dataset.freeShipping) * 100;
//   const total = cart.total_price;

//   const text = wrapper.querySelector('.cart-progress-text');
//   const fill = wrapper.querySelector('.cart-progress-fill');

//   let progress = Math.min((total / goal) * 100, 100);
//   fill.style.width = progress + '%';

//   if (total >= goal) {
//     text.innerHTML = "🎉 You unlocked <strong>FREE Shipping</strong>";
//   } else {
//     let remaining = ((goal - total) / 100).toFixed(2);
//     text.innerHTML = `Add <strong>₹${remaining}</strong> more to get FREE Shipping 🚚`;
//   }
// }

// /* Fetch cart */
// function refreshCartProgress() {
//   fetch('/cart.js')
//     .then(res => res.json())
//     .then(cart => updateCartProgress(cart));
// }

// /* On page load */
// document.addEventListener('DOMContentLoaded', refreshCartProgress);

// /* After add to cart */
// document.addEventListener('cart:refresh', refreshCartProgress);
