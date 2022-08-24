var express = require('express');
var router = express.Router();

/* multer setting */
const multer=require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log('set path');
        cb(null, './uploads/profile-pics');
    },
    filename: function (req, file, cb) {
        
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix);
        console.log('saved');
    }
});
const upload=multer({storage:storage});
// const upload=multer({dest:'uploads/'});

/* GET REGISTER PAGE */
router.get('/', function(req, res, next) {
    
    res.render('register', { title: 'Create Account' });
});

router.post('/',upload.single('profiles'),(req, res, next)=>{
    console.log(req.files);
    console.log(req.body);
});

module.exports = router;