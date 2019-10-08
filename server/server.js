const express = require('express');
const bodyParser = require('body-parser');
const mongoose=require('mongoose');
const cookieParser=require("cookie-parser");
const multer=require('multer');
const GridFsStorage=require('multer-gridfs-storage');
const Grid=require('gridfs-stream');
const methodOverride=require('method-override');
//const nodeMailer=require('nodemailer');
const path=require('path');

const app=express();

mongoose.Promise= global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/moocs');
const conn=mongoose.createConnection(process.env.MONGODB_URI || 'mongodb://localhost:27017/moocs');

const { User } = require('./models/user');
const { auth } = require('./middleware/auth');

app.use(bodyParser.json());
app.use(cookieParser());

//init gfs
let gfs;
conn.once('open',()=>{
    //initialise stream
    gfs= Grid(conn.db,mongoose.mongo);
    gfs.collection('course')
})

//create storage engine
const storage=new GridFsStorage({
    url:process.env.MONGODB_URI || 'mongodb://localhost:27017/moocs',
    file:(req,file)=>{
        return new Promise((resolve,reject)=>{
            let result='';
            const characters='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            const charLength=characters.length;
            for(let i=0;i<16;i++){
                result+=characters.charAt(Math.floor(Math.random()*charLength));
            }
            const filename=result+path.extname(file.originalname);
            const fileInfo={
                filename:filename,
                metadata:req.body,
                bucketName:'courses'
            };

            resolve(fileInfo);
        })
    }
})

const upload= multer({ storage });

app.post('/api/addCourse',upload.any(),(req,res)=>{
    //res.json({file:req.body});
    res.redirect('/')
})

app.post('/api/register',(req,res)=>{
    const user= new User(req.body);

    user.save((err,doc)=>{
        if(err) return res.json({success:false,error:err});
        res.status(200).json({
            success:true,
            user:doc
        });
    });
});

app.post('/api/login',(req,res)=>{
    User.findOne({'email':req.body.email},(err,user)=>{
        if(!user) return res.json({message:'User not found'});
        user.comparePasswords(req.body.password,(err,same)=>{
            if(!same) return res.json({message:'Wrong Password'});
            user.generateToken((err,user)=>{
                if(err) return res.send(err);
                res.cookie('auth',user.token).json({
                    same:true,
                    id:user._id,
                    email:user.email
                });
            });
        });
    });
});

app.get('/api/user',auth,(req,res)=>{
    res.json({
        isAuth:true,
        user:req.token
    })
});

const PORT = process.env.PORT || 5000;

app.listen(PORT,_=>{
    console.log(`App listening on port ${PORT}`);
    console.log('Press Ctrl+C to quit');
})