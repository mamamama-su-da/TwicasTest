console.log('comments');

var token = $.cookie("auth_token");
console.log(token);

var commentApiUrl = '/comments';

$.ajax({
  url: commentApiUrl,
  type: 'GET',
  data: {
  }
})
.done(function(res) {
  console.log(res);
})
.fail(function(err, reason) {
  console.log('failed');
  console.log(reason);
});
