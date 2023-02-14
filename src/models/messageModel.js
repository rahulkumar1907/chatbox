const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId


const messageSchema = new mongoose.Schema( {
    
    content:{
        type:String,
        required:true,
        trim:true
    },
   
    
    sender:{
        type: ObjectId,
        required : true,
        ref:"users"
    },
    chat:{
        type: ObjectId,
        required : true,
        ref:"chat"
    },
    
    },
{ timestamps: true });

module.exports = mongoose.model('message', messageSchema) 