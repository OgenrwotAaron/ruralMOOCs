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
const nodeMailer=require('nodemailer');
const path=require('path');
require('dotenv').config()

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

//add a Course
app.post('/api/addCourse',upload.any(),(req,res)=>{
    //res.json({file:req.files});
    res.redirect(`/course/${req.files[0].id}`)
})

//Add a topic to a course
app.post('/api/addtopic',(req,res)=>{
    const topic= new Topic(req.body);
    topic.save((err,doc)=>{
        if(err) return res.json({success:false,error:err});
        res.json({success:true,doc:doc})
    })
})

//Create new user account or SignUp
app.post('/api/register',(req,res)=>{

    User.findOne({'email':req.body.email},(err,user)=>{
        if(err) return res.json({error:err});
        if(!user){
            const user= new User(req.body);
            user.save((err,doc)=>{
                if(err) return res.json({success:false,error:err});
                res.status(200).json({
                    success:true,
                    user:doc
                });
            });
        }
        res.json({message:"User Already exist"});
    })
});

//Create new Instructor account
app.post('/api/addInstructor',(req,res)=>{
    User.findOne({'email':req.body.email},(err,instructor)=>{
        if(err) return res.json({error:err})
        if(!instructor){
            const instructor=new User(req.body);
            
            //Change the role to 1:- Instructor
            instructor.role=1;

            //generate a random password for the added instructor
            let result=''
            const characters='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            const charLength=characters.length;
            for(let i=0;i<8;i++){
                result+=characters.charAt(Math.floor(Math.random()*charLength));
            }
            instructor.password=result

            instructor.save((err,doc)=>{
                if(err) return res.json({success:false,error:err});

                //Send an email to the instructor with a link to login with a password
                let transporter=nodeMailer.createTransport({
                    host:process.env.MAILGUN_HOST,
                    port:587,
                    secure:false,
                    auth:{
                        user:process.env.MAILGUN_USER,
                        pass:process.env.MAILGUN_PASS
                    }
                });

                transporter.sendMail({
                    from:'RuralMOOCs <no-reply@ruralmoocs.com>',
                    to:doc.email,
                    subject:"Instructor Account details",
                    text:`Hello ${doc.fname}, your Instructor account has been created on RuralMoocs https://ruralmoocs.herokuapp.com; here's your password "${result}", you can login here https://ruralmoocs.herokuapp.com/login `,
                    html:`<p>Hello ${doc.fname}, your Instructor account has been created on <a href="https://ruralmoocs.herokuapp.com">RuralMoocs</a>;</p> <p>here's your password "${result}", you can login <a href="https://ruralmoocs.herokuapp.com/login">here</a></p> `
                },(error,info)=>{
                    if(error) return res.json({error:error})
                    return res.status(200).json({
                        success:true,
                        message:`Account added successfully, check ${doc.email} for the password to your account`
                    });
                })
            })
        }
        if(instructor){
            return res.json({message:'Instructor already exists'})
        }
    })
})

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
                res.cookie('auth',user.token,{maxAge:31*Math.pow(10,9),httpOnly:true}).json({
                    same:true,
                    id:user._id,
                    email:user.email,
                    role:user.role
                });
            });
        });
    });
});

app.get('/api/logout',auth,(req,res)=>{
    req.user.deleteToken(req.user.token,(err,user)=>{
        if(err) return res.status(400).send(err);
        res.status(200).send('logged-out')
    })
})

app.get('/api/inbox',(req,res)=>{
    Inbox.find((err,doc)=>{
        if(err) return res.json(err);
        return res.json(doc)
    })
})

app.get('/api/inbox/:id',(req,res)=>{
    Inbox.findById(req.params.id,(err,doc)=>{
        if(err) return res.json(err)
        return res.json(doc)
    })
})

app.get('/api/user',auth,(req,res)=>{
    res.json({
        isAuth:true,
        user:req.user
    })
});

app.get('/api/users',(req,res)=>{
    User.find((err,doc)=>{
        if(err) return res.json({error:err})
        let data=[];
        doc.forEach((i,key)=>{
            data[key]={id:i._id,role:i.role,email:i.email,fname:i.fname,lname:i.lname}
        })
        return res.json(data)
    })
})

app.get('/api/users/:role',(req,res)=>{
    User.find({role:req.params.role},(err,doc)=>{
        if(err) return res.json(err);
        let data=[];
        doc.forEach((i,key)=>{
            data[key]={id:i._id,role:i.role,email:i.email,fname:i.fname,lname:i.lname}
        })
        return res.json(data)
    })
})

app.get('/api/user/:id',(req,res)=>{
    User.find({_id:ObjectId(req.params.id)},(err,doc)=>{
        if(err) return res.json(err);
        let data=[];
        doc.forEach((i,key)=>{
            data[key]={id:i._id,role:i.role,email:i.email,fname:i.fname,lname:i.lname}
        })
        return res.json(data)
    })
})


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

app.delete('/api/message/:id',(req,res)=>{
    Inbox.findOneAndDelete({_id:ObjectId(req.params.id)},(err,doc)=>{
        if(err) return res.json(err)
        if(!doc){
            return res.status(404).json({message:'Message doesnt exist'})
        }
        return res.json(doc)
    })
})

app.delete('/api/user/:id',(req,res)=>{
    User.findOneAndDelete({_id:ObjectId(req.params.id)},(err,doc)=>{
        if(err) return res.json(err)
        if(!doc){
            return res.status(404).json({message:'Specified user not found'})
        }
        return res.json({message:`user ${doc.email} removed successfully`})
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
