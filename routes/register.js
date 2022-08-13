var express = require('express');
var router = express.Router();

/* GET REGISTER PAGE */
router.get('/', function(req, res, next) {
    
    res.send('Register page');
});

module.exports = router;
  