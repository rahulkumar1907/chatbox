const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId


const chatSchema = new mongoose.Schema( {
    
    chatName:{
        type:String,
        required:true,
        trim:true
    },
    users:{
        type: ObjectId,
        required : true,
        ref:"users"
    },
    logInUserId :{
        type:String,
        trim:true
    },
    messageId:{
        type: ObjectId,
        ref:"message"
    },
    message:{
        type: Object
    },
   
    },
{ timestamps: true });

module.exports = mongoose.model('chat', chatSchema) 