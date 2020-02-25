const mongoose=require('mongoose');

const commentSchema=mongoose.Schema({
    sender:{
        type:Object,
        required:true
    },
    topic:{
        type:String,
        required:true
    },
    body:{
        type:String
    },
    type:{
        type:String
    },
    upVotes:{
        type:Number,
        default:0
    },
    downVotes:{
        type:Number,
        default:0
    }
},{timestamps:{createdAt:'sentAt'}})

const Comment=mongoose.model('comment',commentSchema);

module.exports={ Comment }

