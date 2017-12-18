var express=require('express');
var passport= require('passport');
//var passport= require('../config/passport')(passport)
var router= express.Router();
var User=require('../models/user');
var config=require('../config/database');
 var jwt = require('jsonwebtoken');
// var jwt = require('passport-jwt');


//register
router.post('/register',(req,res)=>{
//res.send('Registe Route');
let newUser=new User({
    name:req.body.name,
    email:req.body.email,
    username:req.body.username,
    password:req.body.password
});

 User.addUser(newUser,(err,user)=>{
     if(err){
         res.json({success:false,msg:'Failed to register User'});
     }
     else{
        res.json({success:true,msg:'User Registered Successfully'});
     }

 });
});


//authenticate
router.post('/authenticate',(req,res)=>{
   
    const username= req.body.username;
    const password =req.body.password;

    User.getUserByUsername(username,(err,user)=>{
        if (err) throw err;
        if(!user){
            res.json({success:false,msg:'Username Not Correct'});
        }
      
        User.comparePassword(password,user.password,(err,isMatch)=>{
            if(err) throw err;
            if(isMatch){
                const token=jwt.sign(user.toJSON(),config.secret,{//user must be converted to json as it is an object
                    expiresIn:604800 //week 
                });

                res.json({
                    success:true,
                    token:'JWT '+token,
                    user:{
                        id:user.id,
                        name:user.name,
                        username:user.username,
                        email:user.email
                    }
                });
            }
            else{
                res.json({success:false,msg:'Wrong Password'});
            }
        })
    });


    });


    //profile
    router.get('/profile',passport.authenticate('jwt',{session:false}),(req,res)=>{
         res.json({'user':req.user});
        console.log('Authorized');
        });


module.exports=router;