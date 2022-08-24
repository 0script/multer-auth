var express = require('express');
var router = express.Router();
var { check , validationResult }=require('express-validator');

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

/* GET REGISTER PAGE */
router.get('/', function(req, res, next) {
    
    res.render('register', { title: 'Create Account' });
});

let validationchain=[
    check('email','Email is not valid').isEmail().trim()
]

router.post('/',upload.single('profiles'),validationchain,(req, res, next)=>{

    const result=validationResult(req);
    if(!result.isEmpty()){
        console.log('error at')
        console.log(result.array());
    }else{
        console.log(result);
        console.log('no error');
    }
});

module.exports = router;