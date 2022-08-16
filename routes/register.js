const { application } = require('express');
var express = require('express');
var router = express.Router();
/* multer setting */
const multer=require('multer');
/* must store profile pic in apropriate dirrectory */
const upload=multer({dest:'../uploads/'});

/* GET REGISTER PAGE */
router.get('/', function(req, res, next) {
    
    res.render('register', { title: 'Create Account' });
});

/* multer exp*/
router.post('/',upload.single('profile'),(req,res,next)=>{

    console.log(req.file);
    console.log(req.body);
    //req.file contain file
    //req.body the text
});

module.exports = router;