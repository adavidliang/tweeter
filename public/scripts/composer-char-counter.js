$(document).ready(() => {
  $('#tweet-text').keypress(function () {
    const input = $(this);
    const length = input.val().length;
    const reMain = 140 - length;
    $('.counter').text(reMain)
    
  })

})

// $("#btn").on('click', function() {
//   console.log(this); //The this keyword is a reference to the button
// });