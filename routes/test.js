var express = require('express');
var fetch = require('node-fetch');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {

  const apiKey = 'de0ba397a1c26c5e1614255fe0895311';
  const apiSecret = '7iGjcR69HvJv4aFFn835SJKPoxhgcBiE';
  const img = 'http://s3-ap-northeast-1.amazonaws.com/topicks/article_thumb/18970_original.jpg';

  const url = `https://apius.faceplusplus.com/detection/detect?api_key=${apiKey}&api_secret=${apiSecret}&url=${img}`;

  fetch(url).then((response) => {
    return response.json();
  }).then(function(json) {
    res.send(json);
  });
});

router.get('/oauth', function(req, res, next) {

  const url = `https://apiv2.twitcasting.tv/oauth2/access_token`;
  const params = {
    code: 'Wm90lkVZd52NDVcKVJM9Any%2FeoEv7N8R5ijmjc%2BW5VkSJ1sFhpFy0a76o9HlYF2I40iWQ0wvaKKxrb5HeOkBq9cRNACyYKjfx1R0bJ3FmnA3YULaFJNrhRs7v5tvi9LWoQVXlnN4CfqAH%2ByHjWBMm0BJpljg3b7qkmBH4d8V8KO5XEdnupWik4SKK5YUVSUceM9Xl6%2BLjVsHOM56CLFcBSId0f%2F3fefcKxNKh%2Bi1PINOqgvOx9DWH65w97RhHJUt6COzy0X9PHl3qwJH%2FeX80w9SgpQAYOr%2BhQolyUqmM16EPgqdAjJELw4FiSVvSTA5%2FtzmWjxtIhGiTcpze13PfCBC5lKwmKuTUXkZrljxTjEc0Wf831oQJgZDWINABKCJkuTLu%2B7QzxAk%2FOQjR7%2BAtIZrJ8xiSatTYL5ses4PHpjaQcW88ZKS9VeDu6olOW12aExRDseeSY2kaMn3%2Fl700z6rNcYElrASW44zH3buvIKcqF%2FnbGtqy7S%2B2U5vVziwjBsGf0OxtfoQc1%2FpdROhj0aZ0NlRKynGGrphDbgHHN0t9fEkUhD06keGZky1NsO%2FXWXaUI9mXX84mxCipLRgPrNKBOhb7RCyh5G3a8X9TXuR3bB0JJASRkncIU0kBWYHL%2FiiwgoZeaKsc23aPX0YsI9U7CPM3GWDnAn2lpE%2BCFs%3D',
    grant_type: 'authorization_code',
    client_id: 'f1133339750118097.feb26badbf353a417f58adb8ae198d5a0dcef3ee7c3fa38e7aed8526acd132e9',
    client_secret: '66dbd809b4c53ce6b98b545b74a458e5054952fa21e6e4c59a032548c3411a64',
    redirect_uri: 'https://example.com',
  };

  fetch(url, {
    method: 'POST',
    body: JSON.stringify(params)
  }).then((response) => {
    return response.json();
  }).then(function(json) {
    res.send(json);
  });
});

module.exports = router;
