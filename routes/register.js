var express = require('express');
var router = express.Router();
var { check , validationResult }=require('express-validator');

const usermodel=require('./usermodel');

/* multer setting */
const multer=require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/profile-pics');
    },
    filename: function (req, file, cb) {
        
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix);
    }
});
const upload=multer({storage:storage});

/* GET REGISTER PAGE */
router.get('/', function(req, res, next) {
    
    res.render('register', { title: 'Create Account' });
});

let validationchain=[
    check('name','Name must be 5 characters at least !').not().isEmpty().isLength({min:5}),
    check('email','Email is not valid !').isEmail().normalizeEmail(),
    check('phone','Error valid rwandan phone number have at least  10 digits !').isNumeric().isLength({min:10}),
    check('password','Error password must be at least 8 characters !').isLength({min:8}),
    check('password2','Error password do not match !').custom((value,{req})=>{
        if(value!=req.body.password)
            return false;
        return true;
    }).withMessage('Error password do not match !')
];

router.post('/',upload.single('profiles'),validationchain,(req, res, next)=>{

    const results=validationResult(req);
    let jsontext='';

    if(!results.isEmpty()){
        
        /* construction de l'object json revoies les erreurs*/
        jsontext='{"errors":[';

        results.array().forEach( (result,index) => {
            if(index!=results.array().length-1)
                jsontext+=`{"${result.param}":"${result.msg}"},`;
            else
                jsontext+=`{"${result.param}":"${result.msg}"}`
        });
        jsontext+=']}';
        const jsonobj=JSON.parse(jsontext);
        res.end(JSON.stringify(jsonobj));
    }else{
        jsontext='{"formstatus":"valid","errors":[]}';
        const jsonobj=JSON.parse(jsontext);

        const newuser=new usermodel.User({
            username: req.body.name,
            email:req.body.email,
            phone:req.body.phone,
            password:req.body.password,
            picture:'nopic'
        });

        newuser.save()
            .then(newuser=>{
                console.log(newuser)
            }).catch(err=>{
                console.log('Error while saving object : '+err);
            });

        res.end(JSON.stringify(jsonobj));
    }
});

module.exports = router;