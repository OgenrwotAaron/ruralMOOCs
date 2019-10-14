const mongoose=require('mongoose');

const inboxSchema=mongoose.Schema({
    fname:{
        type:String,
        trim:true,
        required:true
    },
    lname:{
        type:String,
        trim:true,
        required:true
    },
    subject:{
        type:String,
        trim:true,
        required:true
    },
    email:{
        type:String,
        trim:true,
        required:true
    },
    message:{
        type:String,
        trim:true,
        required:true
    }
},
{
    timestamp:true
})

const Inbox= mongoose.model('Inbox',inboxSchema);

module.exports={ Inbox };