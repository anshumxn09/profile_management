const mongoose = require('mongoose')
const crypto = require('bcryptjs');

const userSchema = new mongoose.Schema({
    email : {
        type : String,
        unique : true,
        required : true,
        trim : true
    },
    password : {
        type : String,
        required : true,
        trim : true,
    },
    name : {
        type : String,
        required : true,
        trim : true
    },
    isTeam : {
        type : Boolean,
        required : true,
    }  
}, {
    timestamps : true
})

// for hashing the password
userSchema.pre('save', async function(next){
    if(this.isModified('password')){
        this.password = await crypto.hash(this.password, 12);
    }
    next();
}) 

module.exports = mongoose.model('User', userSchema);