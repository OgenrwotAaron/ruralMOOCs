const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const SALT_I=10;
const jwt=require('jsonwebtoken');

const userSchema = mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        minLength:8
    },
    fname:{
        type:String,
        maxlength:100
    },
    lname:{
        type:String,
        maxlength:100
    },
    role:{
        //0-normal users
        //1-instructor
        //2-admin
        type:Number,
        default:0
    },
    online:{
        type:Boolean,
        default:false
    },
    token:{
        type:String
    },
    phone:{
        type:String,
        default:'nil'
    },
    dob:{
        type:String
    },
    avatar:{
        type:String
    },
    courses:{
        type:Array
    }
},
{
    timestamp:{ createdAt: 'created_at' }
})

userSchema.pre('save',function(next){
    var user=this;

    if(user.isModified('password')){
        bcrypt.genSalt(SALT_I,function(err,salt){
            if(err) return next(err);
            bcrypt.hash(user.password,salt,function(err,hash){
                if(err) return next(err);
                user.password = hash;
                next();
            })
        })
    }else{
        next();
    }
});

userSchema.methods.comparePasswords=function(candidatePassword,cb){
    bcrypt.compare(candidatePassword,this.password,(err,same)=>{
        if(err) throw cb(err);
        cb(null,same);
    })
};

userSchema.methods.generateToken=function(cb){
    var user=this;
    var token=jwt.sign(user._id.toHexString(),'secretatmoocs');

    user.token=token;
    user.save((err,user)=>{
        if(err) return cb(err);
        cb(null,user);
    })
}

userSchema.statics.findByToken=function(token,cb){
    const user=this;

    jwt.verify(token,'secretatmoocs',function(err,decode){
        user.findOne({'_id':decode,'token':token},function(err,user){
            if(err) return cb(err);
            cb(null,user);
        });
    });
};

userSchema.methods.deleteToken=function(token,cb){
    var user=this;

    user.update({$unset:{token:1}},(err,user)=>{
        if(err) return cb(err);
        cb(null,user)
    })
}

const User= mongoose.model('User',userSchema);

module.exports = { User };