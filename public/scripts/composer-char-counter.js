$(document).ready(() => {
  $('#tweet-text').on('input', function() {
    const $input = $(this);
    const length = $input.val().length;
    const reMain = 140 - length;

    const $counter = $input.closest('form').find('.counter');

    $counter.text(reMain);

    if ($('.errorDisplay').css('display') === 'block') {
      $('.errorDisplay').text('');
    }

    // $counter.toggleClass("red", reMain < 0);
    if (reMain < 0) {
      $('.counter').css('color', 'red');
    } else {
      $('.counter').css('color', 'black');
    }
  });

});
