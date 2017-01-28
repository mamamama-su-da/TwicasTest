var express = require('express');
var router = express.Router();
var fetch = require('node-fetch');

console.log(process.env.NODE_ENV);
var config = process.env.NODE_ENV === 'production' ? require('../config/config.prod.js') : require('../config/config.dev.js');

router.get('/',  function(req, res, next) {
  res.render('login');
});

router.get('/authenticate',  function(req, res, next) {
  const csrf = 'test';
  res.redirect(302, `https://apiv2.twitcasting.tv/oauth2/authorize?client_id=${config.clientId}&response_type=code&{csrf}`);
});

router.get('/callback',  function(req, res, next) {
  const code = req.query['code'];
  console.log('code:' + code);

  const body = `code=${encodeURIComponent(code)}&\
grant_type=authorization_code&\
client_id=${encodeURIComponent(config.clientId)}&\
client_secret=${encodeURIComponent(config.clientSecret)}&\
redirect_uri=${encodeURIComponent(config.redirectUrl)}`;
  
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
    res.cookie('auth_token', json.access_token, {maxAge:600000, httpOnly:false});
    res.redirect(302, '/');
  })
  .catch((err) => {
    console.log(err)
    res.clearCookie('auth_token');
    res.redirect(400, '/login');
  });
});

module.exports = router;
