const mongoose = require('mongoose');

const userSchema = new mongoose.Schema( {
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
	title:{
        type:String,
        enum:['Mr', 'Mrs', 'Miss']
    }, 
	email:{
        type:String,
        required:true,
        unique : true,
    },
    phone:{
        type:String,
        required:true,
        unique : true,
    },
    password:{
        type:String,
        required:true
    }
}, { timestamps: true });

module.exports = mongoose.model('user', userSchema) 