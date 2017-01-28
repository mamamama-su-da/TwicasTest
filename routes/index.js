var express = require('express');
var router = express.Router();
var fetch = require('node-fetch');

/* GET home page. */
router.get('/', function(req, res, next) {

  res.redirect('/yu68315877');
});
router.get('/:userId', function(req, res, next) {
  const userId = req.params.userId;

  const url = `https://apiv2.twitcasting.tv/users/${userId}/current_live`;
  const accessToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImJjM2QyODEzNWNkNjVmNTZhM2MxNGZiODNjYzA3ZmM4OTg2ZTlmOTI0ZTYxMWU0OWExZTk0MTUyMDUxMWFmNDQzMzBjNThiNjNkNTRiMmQ2In0.eyJhdWQiOiJmMTEzMzMzOTc1MDExODA5Ny5mZWIyNmJhZGJmMzUzYTQxN2Y1OGFkYjhhZTE5OGQ1YTBkY2VmM2VlN2MzZmEzOGU3YWVkODUyNmFjZDEzMmU5IiwianRpIjoiYmMzZDI4MTM1Y2Q2NWY1NmEzYzE0ZmI4M2NjMDdmYzg5ODZlOWY5MjRlNjExZTQ5YTFlOTQxNTIwNTExYWY0NDMzMGM1OGI2M2Q1NGIyZDYiLCJpYXQiOjE0ODU1NzQ2NDAsIm5iZiI6MTQ4NTU3NDY0MCwiZXhwIjoxNTAxMTI2NjQwLCJzdWIiOiJmOjExMzMzMzk3NTAxMTgwOTciLCJzY29wZXMiOlsicmVhZCIsIndyaXRlIl19.IK8JXspn-uZIkyumv2uZvtFYnxYG5NJFsmHj4R3Xi5TEf4Xxn_T4Lyp8dhz9JdUWerTtWQIJmxEZt8KykVlmwX8uxmY6nsRSOZpnaL0s469NcinWswlKcGfGUAVN5Ejo3FCsg8-OCyr28Izo6D3D1sqeKYJ0aSpw5MJivvhBvy7ctoI89CwiuRhyhPRb79eqdfWyb0huFWp363x0GFETo0eWwgBXaTRNLaDOrDXr0BsVu4nt-QPBFRejRONTewNqQmm0qkTh_1cUthYom38tk77HV5enK7s3NQgQhnpCpVqU421xIoKeSxOQEGwBrmnL1Gdg4ze9w3G4fv2sVY3aYA';

  fetch(url, {
    headers: {
      'Accept': 'application/json',
      'X-Api-Version': '2.0',
      'Authorization': 'Bearer ' + accessToken
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

module.exports = router;
