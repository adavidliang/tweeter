/*
* Client-side JS logic goes here
* jQuery is already loaded
* Reminder: Use (and do all your DOM work in) jQuery's document ready function
*/
// $(document).ready(() => {}) old version to make the DOM ready
$(() => {
  renderTweets(data);

  $('#newtweetform').on('submit', function(event) {
    // stop the browser from atuo submiting the form
    event.preventDefault();
    const errDisplay = function(errorMessage) {
      $('.errorDisplay').text(errorMessage).css('color', 'red').css('display', 'block');
    };
    const datatext = $('#newtweetform').serialize();
    if (!$('#tweet-text').val()) {
      return errDisplay("Type something");
    }
    if ($('#tweet-text').val().length > 140) {
      return errDisplay('You type too much');
    }

    //Post Tweets with Ajax
    $.ajax({
      method: 'POST',
      url: '/tweets',
      data: datatext,
    }).then(function() {
      $('#tweet-text').val();
      loadTweets();
    })
      .catch((error) => {
        console.log('Error', error);
      });
  });
});


const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
];


const renderTweets = function(tweets) {
  $('.tweetcontainer').empty();
  // loops through tweets
  for (let tweet of tweets) {
    console.log(tweet);
    // calls createTweetElement for each tweet
    let returntweet = createTweetElement(tweet);
    // takes return value and appends it to the tweets container
    $('.tweetcontainer').prepend(returntweet);
  }
};

const createTweetElement = function(tweet) {
  const $tweet = $(`<article class="tweetarticle">
  <header1 class="username">
  <div class="userimage">
  <img src="${tweet.user.avatars}"/>
    <h3>${tweet.user.name}</h3>
    </div>
    <p>${tweet.user.handle}</p>
  </header1>
  <p class="posttext">${(tweet.content.text)}</p>
  <footer class="bottomfooter">
    <day>${timeago.format(tweet.created_at)}</day>
    <div class="icon">
      <i class="fa-regular fa-flag"></i>
      <i class="fa-sharp fa-solid fa-retweet"></i>
      <i class="fa-solid fa-heart"></i>
    </div>
  </footer>
</article>`);

  return $tweet;
};

const loadTweets = function() {
  $.get("/tweets")
    .done(data => {
      renderTweets(data);
    });
};


