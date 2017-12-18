var mongoose = require('mongoose');
var bcrypt =require('bcryptjs');
var passport= require('passport');
var jwt = require('jsonwebtoken');
var config=require('../config/database');

//var connection='mongodb://localhost:27017/meanapp';
var userSchema=mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    username:{type:String,required:true},
    password:{type:String,required:true}
},{collection:'users'});

var User=module.exports=mongoose.model('User',userSchema);

module.exports.getUserById=function(id,callback){
   User.findById(id,callback);
}

module.exports.getUserByUsername=function(username,callback){
    var query= {username:username};
    User.findOne(query,callback);
 }

 module.exports.addUser=function(newUser,callback){
     bcrypt.genSalt(10,(err,salt)=>{
         bcrypt.hash(newUser.password,salt,(err, hash)=>{
             if(err) throw err;
            newUser.password=hash;
            newUser.save(callback);
         })
     })
 }


 module.exports.comparePassword=function(candidatePassword,hash,callback){
    bcrypt.compare(candidatePassword,hash,(err,isMatch)=>{
        if(err) throw err;
        
        callback(null,isMatch);
    });
 }


