$(document).ready(function () {
  $('a.previews-items').click(function () {
    Slide(this);
  });

  $('.next-main').click(function (e) {
    let currentImage = $('a.previews-items.selected');
    currentImage.next().trigger("click");
  });

  $('.prev-main').click(function (e) {
    let currentImage = $('a.previews-items.selected');
    currentImage.prev().trigger("click");
  });

  function Slide(target) {
    var largeImage = $(target).attr('data-full');
    $('.selected').removeClass('selected');
    $(target).addClass('selected');

    $('.full img').hide();
    $('.full img').attr('src', largeImage);
    $('.full img').fadeIn();
  }
  var amount = 279;
  var initial = 0;
  $('.slider-prev').click(function () {
    let currentImage = $('a.previews-items.selected');
    if (currentImage.prev().length) {
      $('.prev-main').trigger("click");
      initial += amount;
      $('.inner-ul').css("transform", "translateY(" + initial + "px");
    }
  });
  $('.slider-next').click(function () {
    let currentImage = $('a.previews-items.selected');
    if (currentImage.next().length) {
      $('.next-main').trigger("click");
      initial -= amount;
      $('.inner-ul').css("transform", "translateY(" + initial + "px");
    }
  });
}); 