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
    code: 'FfiW62KB%2BZRpH9ZFOBzxt9n3N8WQKvOQ7De%2FF%2Fw8pyQSnQbSj3wxoHCsZ8BIWmXQmsZM8ECOvgcLeO6zebX1BetkT3AJbhp7NL%2B8uBY8VVkhceMcitpLYtF7UvnsAs8P8yAGcAHhB0MyT4A0vHhpV%2FvzcSdva8MoxUaddGQddyUvk7PbXNCfbLCBqOFv6MMUfu9GsFUuS60%2F%2FRQ3wwq4HDoYmabhCh%2F0zi%2BUNe0VXMSAFMzs6ZkVfEDL58hMqvo%2B501pc9TrhTITEXER1pkx94CPUHIR9NdFGunnOVGruloYvl98A%2Fqu%2B%2BSxccgwv3yl1XdPUIPBLHYGWnREbiYckbxKEoT4eyvbkbBujqiIK74xx%2FRdIj1Ku%2FpbQYWmg6oMeHc0CjSeDiPDPNfZmgBz8vUTEjU24%2FMwJqikJ%2FawdOfAICeCEblzxcPniNld%2BSxRf%2F%2FYGiqXHpWGiyydJj0IIx%2F%2B1eKfTcLEMenxXJvscAEIMdF9trlu7lUwtYe%2FoWKKBnpXIaeW0TXLUK8t2DYM0LfjoBOJh8rd2mAtSlf6BE%2BA5KiRmBHA5QUGmoLHm%2FpeEwWT4WaYFozft%2FASTDsBkCKXEdPPTYdJYnqLpzmMUi0svAMTz7SAFoRpTYM0XpDcb9FxxDIyvftdyHKba%2FHbZkka0IccREGlihKiBG%2Fx4DE%3D',
    grant_type: 'authorization_code',
    client_id: 'f1133339750118097.feb26badbf353a417f58adb8ae198d5a0dcef3ee7c3fa38e7aed8526acd132e9',
    client_secret: '66dbd809b4c53ce6b98b545b74a458e5054952fa21e6e4c59a032548c3411a64',
    redirect_uri: 'https://example.com',
  };

  fetch(url, {
    method: 'POST',
    body: toForm(params)
  }).then((response) => {
    return response.json();
  }).then(function(json) {
    res.send(json);
  });
});
router.get('/cast', function(req, res, next) {

  const userId = 'mikesorae';

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
    res.send(json);
  });
});

function toForm(params) {
  const form = new FormData();
  Object.keys(params).forEach(function (key) {
    form(key, params[key]);
  });
  return form;
}


router.get('/video/:userId', function(req, res, next) {
  const userId = req.params.userId;
  res.render('video', { title: 'Video', userId });
});





module.exports = router;
