const mongoose = require('mongoose');

const blogUserSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }

})


module.exports = mongoose.model('User', blogUserSchema);
