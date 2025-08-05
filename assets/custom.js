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
    var index = $(this).index();
    $('.main-menu-block .first-level-desktop li').removeClass('active');
    $('.main-menu-block .first-level-menu_items').removeClass('show-menu');
    $(this).addClass('active');
    $('.main-menu-block .first-level-menu_items').eq(index).addClass('show-menu');
  });
});