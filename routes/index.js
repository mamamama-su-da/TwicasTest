var express = require('express');
var router = express.Router();
var fetch = require('node-fetch');

/* GET home page. */
router.get('/demo', function(req, res, next) {
  res.redirect('/yu68315877');
});

router.get('/:userId', function(req, res, next) {
  const userId = req.params.userId;
  const token = req.cookies['auth_token'];
  const url = `https://apiv2.twitcasting.tv/users/${userId}/current_live`;

  fetch(url, {
    headers: {
      'Accept': 'application/json',
      'X-Api-Version': '2.0',
      'Authorization': 'Bearer ' + token
    },
    method: 'GET'
  }).then((response) => {
    return response.json();
  }).then(function(json) {
    console.log(json);
    res.render('detail', { title: userId + 'さんの配信', userId, live: json });
  });

  // res.render('detail', { title: userId + 'さんの配信', userId });
});

router.get('/', function(req, res, next) {
  const token = req.cookies['auth_token'];

  comments = getComments(189037369, token)
  .then((json) => {
    res.render('index', { title: 'Express', comments: json['comments'] });
  })
  .catch((err) => {
    res.render('index', { title: 'Express' });
  });
});

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
