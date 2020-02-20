const mongoose=require('mongoose');

const messageSchema=mongoose.Schema({
    sender:{
        type:String,
        required:true
    },
    receiver:{
        type:String,
        required:true
    },
    body:{
        type:String
    },
    read:{
        type:Boolean,
        required:true
    },
    senderIP:{
        type:String,
        required:true
    },
    senderMAC:{
        type:String,
        required:true
    }
},{timestamps:{createdAt:'sentAt'}})

const Message=mongoose.model('Message',messageSchema);

module.exports={ Message };