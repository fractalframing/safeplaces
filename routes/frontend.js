const express = require("express");

const router = express.Router();


router.get('/', function (req, res) {
  res.render('index');
});

router.get('/location-scrubber', function(req, res) {
  res.render('location-scrubber');
})

router.get('/publisher', function(req, res) {
  res.render('publisher');
})

router.get('/portal', function(req, res) {
  res.render('portal');
})

module.exports = router;
