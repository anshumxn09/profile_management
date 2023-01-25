const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        trim  : true
    },
    email : {
        type : String,
        required : true,
        trim : true,
    },
    address : {
        type : String,
        required : true,
        trim : true
    },
    sports : {
        type : String,
        required : true,
        trim : true,
    },
    skilllevel : {
        type : Number,
        required : true,
        default : 1
    }
}, {
    timestamps : true
})

module.exports = mongoose.model('Profile', ProfileSchema);