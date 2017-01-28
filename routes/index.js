var express = require('express');
var router = express.Router();
var fetch = require('node-fetch');

const CLIENT_ID = '170960297.acb267ba481ac03100971914d5c0e825eeb20a10daedf0ee2e986fd69f834c4f';
const CLIENT_SECRET = 'd43d0f6cb416bc673dd46e3b525787ff283bba85b1c2a05a8d830c78330ee204';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login',  function(req, res, next) {
  const csrf = 'test';
  res.redirect(302, `https://apiv2.twitcasting.tv/oauth2/authorize?client_id=${CLIENT_ID}&response_type=code&{csrf}`);
});

router.get('/auth',  function(req, res, next) {
  const code = req.query['code'];
  console.log('code:' + code);

  const body = `code=${encodeURIComponent(code)}&\
grant_type=authorization_code&\
client_id=${encodeURIComponent(CLIENT_ID)}&\
client_secret=${encodeURIComponent(CLIENT_SECRET)}&\
redirect_uri=${encodeURIComponent('http://localhost:3000/auth')}`;
  
  console.log(`body: ${body}`);

  const url = `https://apiv2.twitcasting.tv/oauth2/access_token`;
  return fetch(url, {
    method: 'post',
    body: body,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    }
  })
  .then((res) => res.json())
  .then((json) => {
    console.log(json)
    res.cookie('auth_token', json.access_token, {maxAge:60000, httpOnly:false});
    res.redirect(302, '/');
  })
  .catch((err) => {
    console.log(err)
    res.clearCookie('auth_token');
    res.redirect(400, '/login');
  });
});

module.exports = router;
