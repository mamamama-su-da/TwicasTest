var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/*', function(req, res, next) {
  const path = req.path;
  const url = 'http://twitcasting.tv' + path + '?video=1';

  res.redirect(url);
});

module.exports = router;
