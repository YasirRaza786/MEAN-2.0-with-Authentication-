var express =require('express');
var path = require('path');
var mongoose= require('mongoose');
var bodyParser=require('body-parser');
var passport= require('passport');
mongoose.Promise = global.Promise;
var cors= require('cors');
var config=require('./config/database');
var users= require('./routes/users');

var port = 8989;

var app=express();

//Mongoose Connection
mongoose.connect(config.db,{useMongoClient:true})

.on('Connected',()=>{
    
     console.log('Connection Established ' , config.db);
     })

     .on('Error',(err)=>{
             console.log('Error' + err);
         });

// mongoose.connection.on('Connected',()=>{

// console.log('Connection Established ' + config.db);
// });

// mongoose.connection.on('Error',(err)=>{
//     console.log('Error' + err);
// });


//Access Allow Origin Control
app.use(cors());


//Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));


//set Static Folder
app.use(express.static(path.join(__dirname,'public')));

app.use('/users',users);

// Middleware for Passport
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.get('/',(req,res)=>{
    res.send('Wellcome To Node js ');

});

app.listen(port,()=>{
    console.log('Server startrd at port ' + port);
});