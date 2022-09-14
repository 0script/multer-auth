const mongoose=require('mongoose');
const server='localhost:27017';
const database='multerAuthdb';

mongoose.connect(
    `mongodb://${server}/${database}`).then(()=>{
    console.log(`Connected to db :${database}`);
}).catch(err=>{
    console.log(`Failed to connect to ${database} error : ${err}`);
});

const userSchema=new mongoose.Schema({
    username:{type:String,required:true,unique:true},
    email:{type:String,required:true,unique:true},
    phone:{type:String,required:true},
    created:{type:Date,default:Date.now},
    password:{type:String,required:true},
    picture:{type:String,required:false}
});

/* mongoose model pluralise and lowercase the collection name */
const User=mongoose.model('User',userSchema);

module.exports={User};