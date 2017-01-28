var express = require('express');
var router = express.Router();
var fetch = require('node-fetch');

/* GET home page. */
router.get('/demo', function(req, res, next) {
  res.redirect('/yu68315877');
});

router.get('/', function(req, res, next) {
  res.redirect('/mikesorae');
});

router.get('/:userId', function(req, res, next) {
  const userId = req.params.userId;
  const token = req.cookies['auth_token'];

  getUserInfo(userId, token)
  .then((info) => {
    console.log(info);
    getComments(info.movie.id, token)
    .then((json) => {
      console.log(json.comments);
      res.render('detail', { title: userId + 'さんの配信', userId, broadcaster: info.broadcaster, live: info, comments: json.comments});
    })
    .catch((err) => {
      res.render('error', {error: { status: 'コメントが取得できません' }});
    });
  })
  .catch((err) => {
    res.render('error', {error: { status: '配信中のライブがありません' }});
  });
});

const getUserInfo = function(userId, token) {
  const url = `https://apiv2.twitcasting.tv/users/${userId}/current_live`;

  return fetch(url, {
    headers: {
      'Accept': 'application/json',
      'X-Api-Version': '2.0',
      'Authorization': 'Bearer ' + token
    },
    method: 'GET'
  }).then((res) => {
    return res.json();
  })
};

const getComments = function(movieId, token) {
  const url = `https://apiv2.twitcasting.tv/movies/${movieId}/comments`;
  const body = {
  };

  return fetch(url, {
    method: 'get',
    body: body,
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  .then((res) => {
    return res.json();
  })
};

router.get('/comments', function(req, res, next) {
  console.log('comments api');
  const url = 'https://apiv2.twitcasting.tv/movies/189037369/comments';
  const token = req.cookies['auth_token'];
  const body = {
  };

  console.log(token);

  fetch(url, {
    method: 'get',
    body: body,
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  .then((res) => {
    console.log(res);
    return res.json();
  })
  .then((json) => {
    console.log(json);
    console.log(`json: ${json}`);
    res.send(JSON.stringify(json));
  })
  .catch((err) => {
    console.log(`error: ${err}`);
    res.send('error');
  });
});

module.exports = router;
