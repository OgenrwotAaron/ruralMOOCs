const mongoose=require('mongoose');

const topicSchema=mongoose.Schema({
    title:{
        type:String,
        trim:true
    },
    description:{
        type:String
    },
    duration:{
        type:Number
    },
    course:{
        type:String
    },
    video:{
        type:String,
        unique:true
    },
    poster:{
        type:String
    }
},{ timestamps: { createdAt: 'created_at' } })

const Topic=mongoose.model('Topic',topicSchema);

module.exports={ Topic }