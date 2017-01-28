console.log('comments');

var token = $.cookie("auth_token");
console.log(token);

var commentApiUrl = '/comments';

if($('.timeline')) {
  $.ajax({
    url: commentApiUrl,
    type: 'GET',
    data: {
      'since_id': 1
    }
  })
  .done(function(res) {
    console.log(res);
  })
  .fail(function(err, reason) {
    console.log('failed');
    console.log(reason);
  });
}
