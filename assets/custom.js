   $(document).ready(function() {
      $('.list-menu > li').hover(
        function() {
          $(this).addClass('active');
        },
        function() {
          $(this).removeClass('active');
        }
      );
    });

$(function () {
	$('.main-menu-block .first-level-desktop li').on('mouseenter', function () {
		const $parent = $(this).closest('.megamenu-block-wrapper');
		const tabId = $(this).data('tabid');

		$parent.find('.first-level-desktop li').removeClass('active');
		$parent.find('.first-level-menu_items').removeClass('show-menu');

		$(this).addClass('active');
		$parent.find('.first-level-menu_items.' + tabId).addClass('show-menu');
	});
});