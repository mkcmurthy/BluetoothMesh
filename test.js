var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/discover',function(req, res, next){
  var test = req.param('value');
  res.redirect('http://localhost:3000/Discover.html');
// res.send("this is dummy->"+test);
}
);

module.exports = router;
