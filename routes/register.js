var express = require('express');
var router = express.Router();

/* GET REGISTER PAGE */
router.get('/', function(req, res, next) {
    
    res.render('register', { title: 'Create Account' });
});

module.exports = router;