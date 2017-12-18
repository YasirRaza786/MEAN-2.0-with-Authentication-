var JwtStrategy=require('passport-jwt').Strategy;
var ExtractJwt =require('passport-jwt').ExtractJwt;
var User=require('../models/user');
var config= require('./database');

module.exports=function(passport){

    let opts={};
    opts.jwtFromRequest=ExtractJwt.fromAuthHeaderWithScheme('jwt');//;fromAuthHeaderWithScheme(Bearer);
    opts.secretOrKey=config.secret; // fromAuthHeaderAsBearerToken();
    passport.use(new JwtStrategy(opts,(jwt_payload,done)=>{

        console.log(jwt_payload);
    
        User.getUserById(jwt_payload._id,(err,user)=>{//._doc should be added as it comes from docs of colection but not withHeaderWithScheme('jwt')
            if(err){
                return done(err,false);//._id
            }

            if(user){
                return done(null,user);
            }
            else{
                return done(null,false);
            }

        });


    }));


}