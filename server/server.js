const express = require('express');
const bodyParser = require('body-parser');
const mongoose=require('mongoose');
const cookieParser=require("cookie-parser");
const multer=require('multer');
const GridFsStorage=require('multer-gridfs-storage');
const Grid=require('gridfs-stream');
const methodOverride=require('method-override');
const { createServer }=require('http');
const ObjectId=require('mongodb').ObjectId;
const TransloaditClient=require('transloadit');
//const nodeMailer=require('nodemailer');
const path=require('path');

const app=express();
const transloadit= new TransloaditClient({
    authKey:'c330851cae3e4bbc83328eb89b2926fe',
    authSecret:'0eeaeac9bbb1594b9f1e3c0017ecf8f74989c74c'
});

mongoose.Promise= global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/moocs');
const conn=mongoose.createConnection(process.env.MONGODB_URI || 'mongodb://localhost:27017/moocs');

const { User } = require('./models/user');
const { Inbox } = require('./models/inbox');
const { Topic } = require('./models/topic')
const { auth } = require('./middleware/auth');

app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.resolve(__dirname,'..','client','build')))

//init gfs
let gfs;
conn.once('open',()=>{
    //initialise stream
    gfs= Grid(conn.db,mongoose.mongo);
    gfs.collection('courses');
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
    //res.json({file:req.files});
    res.redirect(`/course/${req.files[0].id}`)
})

app.post('/api/addtopic',(req,res)=>{
    const topic= new Topic(req.body);
    topic.save((err,doc)=>{
        if(err) return res.json({success:false,error:err});
        res.json({success:true,doc:doc})
    })
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

app.post('/api/message',(req,res)=>{
    const inbox= new Inbox(req.body);

    inbox.save((err,doc)=>{
        if(err) return res.json({success:false,error:err})

        res.status(200).json({
            success:true,
            inbox:doc
        })
    })
})

app.post('/api/login',(req,res)=>{
    User.findOne({'email':req.body.email},(err,user)=>{
        if(err) return res.json({error:err});
        if(!user) return res.json({message:'User not found'});
        user.comparePasswords(req.body.password,(err,same)=>{
            if(err) return res.json({error:err});
            if(!same) return res.json({message:'Wrong Password'});
            user.generateToken((err,user)=>{
                if(err) return res.send(err);
                res.cookie('auth',user.token).json({
                    same:true,
                    id:user._id,
                    email:user.email
                });
                //res.redirect('/dashboard');
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

app.get('/api/courses',(req,res)=>{
    gfs.files.find().toArray((err,files)=>{
        if(!files || files.length === 0){
            return res.status(404).json({error:'No files exist'});
        }
        return res.json(files);
    });
});

app.get('/api/image/:filename',(req,res)=>{
    gfs.files.findOne({filename:req.params.filename},(err,file)=>{
        if(!file || file.length === 0){
            return res.status(404).json({error:'No such file exists'})
        }

        if(file.contentType==='image/jpeg' || file.contentType==='image/png'){
            const readStream=gfs.createReadStream(file.filename);
            readStream.pipe(res)
        }else{
            res.status(404).json({error:'Not an image'})
        }
    })
})

app.get('/api/course/:id',(req,res)=>{
    gfs.files.findOne({ _id:ObjectId(req.params.id)},(err,file)=>{
        if(err) return res.json({error:err})
        if(!file || file.length === 0){
            return res.status(404).json({error:'No files exists'});
        }
        return res.json(file);
    })
})

app.get('/api/topics/:course',(req,res)=>{
    Topic.find({course:req.params.course},(err,files)=>{
        if(err) return res.json({error:err})
        if(!files || files.length === 0){
            return res.json({error:'No files exist'});
        }
        return res.json(files);
    });
})

app.get('/api/topic/:id',(req,res)=>{
    Topic.findOne({_id:ObjectId(req.params.id)},(err,topic)=>{
        if(err) return res.json({error:err})
        if(!topic || topic.length === 0){
            return res.status(404).json({error:'No files exist'});
        }
        return res.json(topic);
    })
})

app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'..','client','build','index.html'));
})


const PORT = process.env.PORT || 5000;

const server=createServer(app);

server.listen(PORT,_=>{
    console.log(`App listening on port ${PORT}`);
    console.log('Press Ctrl+C to quit');
})
